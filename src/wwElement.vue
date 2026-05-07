<template>
  <div
    class="ww-leaflet"
    :class="{ editing: isEditing }"
    :style="{ height: content.height || '400px' }"
    ref="mapContainer"
  ></div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, watch, toRaw, isRef, isReactive, isProxy } from "vue";
import L from "leaflet";
import "leaflet-providers";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

function deepToRaw(value) {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(deepToRaw);
  if (isRef(value)) return deepToRaw(value.value);
  if (isProxy(value) || isReactive(value)) return deepToRaw(toRaw(value));
  if (typeof value === "object") {
    const out = {};
    for (const k of Object.keys(value)) out[k] = deepToRaw(value[k]);
    return out;
  }
  return value;
}

function buildTileLayer(config) {
  const cfg = deepToRaw(config) || {};
  const options = cfg.options || {};
  if (cfg.provider) {
    return L.tileLayer.provider(cfg.provider, options);
  }
  if (cfg.url) {
    return L.tileLayer(cfg.url, options);
  }
  return L.tileLayer.provider("OpenStreetMap.Mapnik");
}

function buildLayer(descriptor) {
  const d = deepToRaw(descriptor);
  if (!d || !d.type) return null;
  const opts = d.options || {};
  let layer = null;
  switch (d.type) {
    case "marker":
      if (!Array.isArray(d.latlng)) return null;
      layer = L.marker(d.latlng, opts);
      break;
    case "circleMarker":
      if (!Array.isArray(d.latlng)) return null;
      layer = L.circleMarker(d.latlng, opts);
      break;
    case "circle":
      if (!Array.isArray(d.latlng)) return null;
      layer = L.circle(d.latlng, opts);
      break;
    case "polygon":
      if (!Array.isArray(d.latlngs)) return null;
      layer = L.polygon(d.latlngs, opts);
      break;
    case "polyline":
      if (!Array.isArray(d.latlngs)) return null;
      layer = L.polyline(d.latlngs, opts);
      break;
    case "rectangle":
      if (!Array.isArray(d.bounds)) return null;
      layer = L.rectangle(d.bounds, opts);
      break;
    case "imageOverlay":
      if (!d.url || !Array.isArray(d.bounds)) return null;
      layer = L.imageOverlay(d.url, d.bounds, opts);
      break;
    default:
      return null;
  }
  if (d.popup) layer.bindPopup(String(d.popup));
  if (d.tooltip) layer.bindTooltip(String(d.tooltip));
  return layer;
}

function passesFilter(feature, filter) {
  if (!filter || !filter.property) return true;
  const val = feature?.properties?.[filter.property];
  const op = filter.operator || "eq";
  switch (op) {
    case "eq": return val === filter.value;
    case "neq": return val !== filter.value;
    case "gt": return val > filter.value;
    case "lt": return val < filter.value;
    default: return true;
  }
}

function buildGeoJsonLayer(config) {
  const cfg = deepToRaw(config);
  if (!cfg || !cfg.data) return null;
  const popupProp = cfg.popupProperty || "name";
  const opts = {};
  if (cfg.style) opts.style = cfg.style;
  if (cfg.swapCoords) {
    opts.coordsToLatLng = ([lng, lat]) => L.latLng(lat, lng);
  }
  if (cfg.pointToLayer === "circleMarker") {
    opts.pointToLayer = (feature, latlng) => L.circleMarker(latlng, cfg.style || {});
  } else if (cfg.pointToLayer === "marker") {
    opts.pointToLayer = (feature, latlng) => L.marker(latlng);
  }
  if (cfg.onEachFeature === "bindPopup" || cfg.onEachFeature === "bindTooltip") {
    opts.onEachFeature = (feature, layer) => {
      const text = feature?.properties?.[popupProp];
      if (text == null) return;
      if (cfg.onEachFeature === "bindPopup") layer.bindPopup(String(text));
      else layer.bindTooltip(String(text));
    };
  }
  if (cfg.filter && cfg.filter.property) {
    opts.filter = (feature) => passesFilter(feature, cfg.filter);
  }
  return L.geoJSON(cfg.data, opts);
}

function pointFeatureCount(geoJson) {
  const data = geoJson?.data;
  if (!data) return 0;
  const features = data.type === "FeatureCollection" ? data.features : [data];
  return (features || []).filter(
    (f) => f?.geometry?.type === "Point" || f?.geometry?.type === "MultiPoint"
  ).length;
}

function boundsToObject(b) {
  return {
    north: b.getNorth(),
    south: b.getSouth(),
    east: b.getEast(),
    west: b.getWest(),
  };
}

export default {
  name: "OpenStreetMap",
  props: {
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
    content: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  emits: ["trigger-event"],
  setup(props, { emit }) {
    const mapContainer = ref(null);
    let mapInstance = null;
    let baseTileLayer = null;
    let layerGroup = null;
    let clusterGroup = null;
    let geoJsonLayer = null;
    const layerById = new Map();
    let activeControls = {};
    let resizeObserver = null;
    let lastTileSignature = "";

    const currentCenter = ref({ lat: 0, lng: 0 });
    const currentZoom = ref(0);
    const currentBounds = ref({ north: 0, south: 0, east: 0, west: 0 });
    const isReady = ref(false);

    const isEditing = computed(() => {
      /* wwEditor:start */
      return (
        props.wwEditorState?.editMode ===
        wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    function fire(name, event) {
      emit("trigger-event", { name, event });
    }

    function tileSignature(cfg) {
      const c = deepToRaw(cfg) || {};
      return JSON.stringify({ provider: c.provider, url: c.url, options: c.options || {} });
    }

    function applyTileLayer() {
      const sig = tileSignature(props.content.tileLayer);
      if (sig === lastTileSignature && baseTileLayer) return;
      if (baseTileLayer) {
        mapInstance.removeLayer(baseTileLayer);
        baseTileLayer = null;
      }
      try {
        baseTileLayer = buildTileLayer(props.content.tileLayer);
        baseTileLayer.addTo(mapInstance);
        lastTileSignature = sig;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("[ww-openstreetmap-leaflet] tile layer error:", err);
        baseTileLayer = L.tileLayer.provider("OpenStreetMap.Mapnik").addTo(mapInstance);
        lastTileSignature = "";
      }
    }

    function getMarkerHost() {
      return props.content.enableMarkerCluster ? clusterGroup : layerGroup;
    }

    function isMarkerLike(type) {
      return type === "marker" || type === "circleMarker";
    }

    function attachLayerEvents(descriptor, layer) {
      layer.on("click", (e) => {
        fire("layer:click", {
          id: descriptor.id,
          type: descriptor.type,
          latlng: e.latlng ? { lat: e.latlng.lat, lng: e.latlng.lng } : null,
          properties: descriptor.properties || {},
        });
      });
    }

    function applyLayers() {
      const next = Array.isArray(props.content.layers)
        ? props.content.layers
        : [];
      const nextById = new Map();
      for (const desc of next) {
        const raw = deepToRaw(desc);
        if (raw && raw.id) nextById.set(raw.id, raw);
      }

      // Remove layers that are gone or whose serialized shape changed.
      for (const [id, entry] of layerById) {
        const newDesc = nextById.get(id);
        if (!newDesc || JSON.stringify(newDesc) !== entry.signature) {
          const host = entry.isMarker && clusterGroup && entry.fromCluster
            ? clusterGroup
            : layerGroup;
          host.removeLayer(entry.layer);
          layerById.delete(id);
        }
      }

      // Add new or updated layers.
      for (const [id, desc] of nextById) {
        if (layerById.has(id)) continue;
        const layer = buildLayer(desc);
        if (!layer) continue;
        attachLayerEvents(desc, layer);
        const isMarker = isMarkerLike(desc.type);
        const host = isMarker ? getMarkerHost() : layerGroup;
        host.addLayer(layer);
        layerById.set(id, {
          layer,
          isMarker,
          fromCluster: isMarker && !!props.content.enableMarkerCluster,
          signature: JSON.stringify(desc),
        });
      }
    }

    function applyGeoJson() {
      if (geoJsonLayer) {
        mapInstance.removeLayer(geoJsonLayer);
        geoJsonLayer = null;
      }
      const cfg = props.content.geoJSON;
      if (!cfg || !cfg.data) return;

      // If clustering is on AND the geoJSON points should go to a cluster,
      // we still render via L.geoJSON but parented to clusterGroup for points.
      const useClusterForPoints =
        props.content.enableMarkerCluster &&
        cfg.pointToLayer === "marker" &&
        pointFeatureCount(cfg) > 0;

      const built = buildGeoJsonLayer(cfg);
      if (!built) return;

      built.eachLayer((subLayer) => {
        subLayer.on("click", (e) => {
          fire("layer:click", {
            id: subLayer.feature?.id ?? null,
            type: "geoJSON",
            latlng: e.latlng ? { lat: e.latlng.lat, lng: e.latlng.lng } : null,
            properties: subLayer.feature?.properties || {},
          });
        });
      });

      if (useClusterForPoints) {
        clusterGroup.addLayer(built);
        geoJsonLayer = built;
      } else {
        built.addTo(mapInstance);
        geoJsonLayer = built;
      }
    }

    function applyControls() {
      const cfg = deepToRaw(props.content.controls) || {};

      // Zoom
      if (activeControls.zoom) {
        mapInstance.removeControl(activeControls.zoom);
        activeControls.zoom = null;
      }
      if (cfg.zoom?.enabled !== false) {
        activeControls.zoom = L.control
          .zoom({ position: cfg.zoom?.position || "topleft" })
          .addTo(mapInstance);
      }

      // Attribution
      if (activeControls.attribution) {
        mapInstance.removeControl(activeControls.attribution);
        activeControls.attribution = null;
      }
      if (cfg.attribution?.enabled !== false) {
        activeControls.attribution = L.control
          .attribution({ prefix: cfg.attribution?.prefix })
          .addTo(mapInstance);
      }

      // Scale
      if (activeControls.scale) {
        mapInstance.removeControl(activeControls.scale);
        activeControls.scale = null;
      }
      if (cfg.scale?.enabled) {
        activeControls.scale = L.control
          .scale({
            position: cfg.scale.position || "bottomleft",
            metric: cfg.scale.metric !== false,
            imperial: !!cfg.scale.imperial,
            maxWidth: cfg.scale.maxWidth || 100,
          })
          .addTo(mapInstance);
      }

      // Layers control
      if (activeControls.layers) {
        mapInstance.removeControl(activeControls.layers);
        activeControls.layers = null;
      }
      if (cfg.layers?.enabled) {
        const baseLayers = {};
        const overlays = {};
        for (const [label, desc] of Object.entries(cfg.layers.baseLayers || {})) {
          baseLayers[label] = buildTileLayer(desc);
        }
        for (const [label, desc] of Object.entries(cfg.layers.overlays || {})) {
          const built = buildLayer(desc);
          if (built) overlays[label] = built;
        }
        activeControls.layers = L.control
          .layers(baseLayers, overlays, {
            position: cfg.layers.position || "topright",
            collapsed: cfg.layers.collapsed !== false,
          })
          .addTo(mapInstance);
      }
    }

    function rebuildClustering() {
      // Detach all marker-like layers, recreate the cluster/layerGroup pair, reattach.
      if (clusterGroup) {
        mapInstance.removeLayer(clusterGroup);
        clusterGroup = null;
      }
      if (props.content.enableMarkerCluster) {
        clusterGroup = L.markerClusterGroup();
        clusterGroup.addTo(mapInstance);
      }
      // Move existing marker-like layers into the new host.
      for (const [, entry] of layerById) {
        if (!entry.isMarker) continue;
        const host = props.content.enableMarkerCluster ? clusterGroup : layerGroup;
        // Layer might already be attached via the previous host.
        try { layerGroup.removeLayer(entry.layer); } catch (e) { /* noop */ }
        if (clusterGroup) { try { clusterGroup.removeLayer(entry.layer); } catch (e) { /* noop */ } }
        host.addLayer(entry.layer);
        entry.fromCluster = !!props.content.enableMarkerCluster;
      }
      // Re-render geoJSON to pick up the new clustering setting.
      applyGeoJson();
    }

    function emitMoveEnd() {
      const c = mapInstance.getCenter();
      const z = mapInstance.getZoom();
      const b = boundsToObject(mapInstance.getBounds());
      currentCenter.value = { lat: c.lat, lng: c.lng };
      currentZoom.value = z;
      currentBounds.value = b;
      fire("map:moveend", { center: { lat: c.lat, lng: c.lng }, zoom: z, bounds: b });
    }

    function initMap() {
      if (mapInstance) return;
      const opts = deepToRaw(props.content.mapOptions) || {};
      // Disable Leaflet's default zoomControl — we handle it via `controls`.
      mapInstance = L.map(mapContainer.value, { ...opts, zoomControl: false, attributionControl: false });

      layerGroup = L.layerGroup().addTo(mapInstance);
      if (props.content.enableMarkerCluster) {
        clusterGroup = L.markerClusterGroup();
        clusterGroup.addTo(mapInstance);
      }

      applyTileLayer();
      applyControls();
      applyLayers();
      applyGeoJson();

      mapInstance.on("click", (e) => {
        fire("map:click", {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          containerPoint: { x: e.containerPoint.x, y: e.containerPoint.y },
        });
      });
      mapInstance.on("moveend", emitMoveEnd);

      mapInstance.whenReady(() => {
        emitMoveEnd();
        isReady.value = true;
        fire("map:ready", {});
      });
    }

    onMounted(() => {
      initMap();
      resizeObserver = new ResizeObserver(() => {
        if (mapInstance) mapInstance.invalidateSize();
      });
      if (mapContainer.value) resizeObserver.observe(mapContainer.value);
    });

    onBeforeUnmount(() => {
      if (resizeObserver && mapContainer.value) resizeObserver.unobserve(mapContainer.value);
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
      layerById.clear();
    });

    // Watchers — avoid `mapOptions.center/zoom` triggering full recreate.
    watch(
      () => [props.content.mapOptions?.center, props.content.mapOptions?.zoom],
      ([center, zoom]) => {
        if (!mapInstance) return;
        if (Array.isArray(center) && center.length === 2 && typeof zoom === "number") {
          mapInstance.setView(center, zoom, { animate: false });
        } else if (Array.isArray(center) && center.length === 2) {
          mapInstance.panTo(center, { animate: false });
        } else if (typeof zoom === "number") {
          mapInstance.setZoom(zoom);
        }
      },
      { deep: true }
    );

    watch(
      () => props.content.tileLayer,
      () => { if (mapInstance) applyTileLayer(); },
      { deep: true }
    );

    watch(
      () => props.content.layers,
      () => { if (mapInstance) applyLayers(); },
      { deep: true }
    );

    watch(
      () => props.content.geoJSON,
      () => { if (mapInstance) applyGeoJson(); },
      { deep: true }
    );

    watch(
      () => props.content.controls,
      () => { if (mapInstance) applyControls(); },
      { deep: true }
    );

    watch(
      () => props.content.enableMarkerCluster,
      () => { if (mapInstance) rebuildClustering(); }
    );

    // Methods exposed as WeWeb actions.
    function setView(lat, lng, zoom) {
      if (!mapInstance) return;
      mapInstance.setView([lat, lng], zoom);
    }
    function flyTo(lat, lng, zoom, duration) {
      if (!mapInstance) return;
      mapInstance.flyTo([lat, lng], zoom, duration ? { duration } : undefined);
    }
    function panTo(lat, lng) {
      if (!mapInstance) return;
      mapInstance.panTo([lat, lng]);
    }
    function setZoom(zoom) {
      if (!mapInstance) return;
      mapInstance.setZoom(zoom);
    }
    function fitBounds(north, south, east, west, padding) {
      if (!mapInstance) return;
      const opts = padding ? { padding: [padding, padding] } : undefined;
      mapInstance.fitBounds([[south, west], [north, east]], opts);
    }
    function locate(enableHighAccuracy, timeout) {
      if (!mapInstance) return;
      mapInstance.locate({
        setView: true,
        enableHighAccuracy: !!enableHighAccuracy,
        timeout: typeof timeout === "number" ? timeout : 10000,
      });
    }
    function invalidateSize() {
      if (!mapInstance) return;
      mapInstance.invalidateSize();
    }

    return {
      mapContainer,
      isEditing,
      currentCenter,
      currentZoom,
      currentBounds,
      isReady,
      setView,
      flyTo,
      panTo,
      setZoom,
      fitBounds,
      locate,
      invalidateSize,
    };
  },
};
</script>

<style lang="scss" scoped>
.ww-leaflet {
  width: 100%;
  overflow: hidden;
  /* wwEditor:start */
  &.editing {
    pointer-events: none;
  }
  /* wwEditor:end */
}
</style>

<style lang="scss">
.leaflet-control-attribution {
  display: flex;
}
.leaflet-control-attribution > * {
  margin: 0px 4px;
}
</style>
