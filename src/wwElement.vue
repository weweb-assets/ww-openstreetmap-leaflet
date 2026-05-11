<template>
  <div class="ww-leaflet" :class="{ editing: isEditing }">
    <div
      class="ww-leaflet__map"
      :style="mapContainerStyle"
      ref="mapContainer"
    ></div>
  </div>
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

const TILE_TYPE = "tileLayer";
const CONTROL_TYPES = new Set(["scaleControl", "layersControl"]);

function buildTile(descriptor) {
  const d = deepToRaw(descriptor) || {};
  const opts = d.options || {};
  if (d.provider) return L.tileLayer.provider(d.provider, opts);
  if (d.url) return L.tileLayer(d.url, opts);
  return L.tileLayer.provider("OpenStreetMap.Mapnik");
}

function passesFilter(feature, filter) {
  if (!filter || !filter.property) return true;
  const v = feature?.properties?.[filter.property];
  switch (filter.operator || "eq") {
    case "eq": return v === filter.value;
    case "neq": return v !== filter.value;
    case "gt": return v > filter.value;
    case "lt": return v < filter.value;
    default: return true;
  }
}

function buildGeoJson(d, attachClickHandler) {
  if (!d || !d.data) return null;
  const popupProp = d.popupProperty || "name";
  const opts = {};
  if (d.style) opts.style = d.style;
  if (d.swapCoords) opts.coordsToLatLng = ([lng, lat]) => L.latLng(lat, lng);
  if (d.pointToLayer === "circleMarker") {
    opts.pointToLayer = (_, latlng) => L.circleMarker(latlng, d.style || {});
  } else if (d.pointToLayer === "marker") {
    opts.pointToLayer = (_, latlng) => L.marker(latlng);
  }
  if (d.onEachFeature === "bindPopup" || d.onEachFeature === "bindTooltip") {
    opts.onEachFeature = (feature, layer) => {
      const text = feature?.properties?.[popupProp];
      if (text == null) return;
      if (d.onEachFeature === "bindPopup") layer.bindPopup(String(text));
      else layer.bindTooltip(String(text));
    };
  }
  if (d.filter && d.filter.property) opts.filter = (f) => passesFilter(f, d.filter);

  const layer = L.geoJSON(d.data, opts);
  if (attachClickHandler) {
    layer.eachLayer((sub) => {
      sub.on("click", (e) => {
        attachClickHandler({
          id: sub.feature?.id ?? d.id ?? null,
          type: "geoJSON",
          latlng: e.latlng ? { lat: e.latlng.lat, lng: e.latlng.lng } : null,
          properties: sub.feature?.properties || {},
        });
      });
    });
  }
  return layer;
}

function buildOverlay(descriptor, attachClickHandler) {
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
    case "geoJSON":
      return buildGeoJson(d, attachClickHandler);
    case "markerClusterGroup": {
      const group = L.markerClusterGroup(opts);
      const children = Array.isArray(d.children) ? d.children : [];
      for (const child of children) {
        const childLayer = buildOverlay(child, attachClickHandler);
        if (childLayer) group.addLayer(childLayer);
      }
      return group;
    }
    default:
      return null;
  }
  if (d.popup) layer.bindPopup(String(d.popup));
  if (d.tooltip) layer.bindTooltip(String(d.tooltip));
  if (attachClickHandler) {
    layer.on("click", (e) => {
      attachClickHandler({
        id: d.id ?? null,
        type: d.type,
        latlng: e.latlng ? { lat: e.latlng.lat, lng: e.latlng.lng } : null,
        properties: d.properties || {},
      });
    });
  }
  return layer;
}

function buildControl(d) {
  if (!d || !d.type) return null;
  switch (d.type) {
    case "scaleControl":
      return L.control.scale({
        position: d.position || "bottomleft",
        metric: d.metric !== false,
        imperial: !!d.imperial,
        maxWidth: d.maxWidth || 100,
      });
    case "layersControl": {
      const baseLayers = {};
      const overlays = {};
      for (const [label, desc] of Object.entries(d.baseLayers || {})) {
        baseLayers[label] = buildTile(desc);
      }
      for (const [label, desc] of Object.entries(d.overlays || {})) {
        const built = buildOverlay(desc);
        if (built) overlays[label] = built;
      }
      return L.control.layers(baseLayers, overlays, {
        position: d.position || "topright",
        collapsed: d.collapsed !== false,
      });
    }
    default:
      return null;
  }
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
    let resizeObserver = null;
    // entry: { layer, signature, kind: 'tile' | 'overlay' | 'control' }
    const entries = new Map();

    const currentCenter = ref({ lat: 0, lng: 0 });
    const currentZoom = ref(0);
    const currentBounds = ref({ north: 0, south: 0, east: 0, west: 0 });
    const isReady = ref(false);

    const containerHeight = computed(() => {
      const h = props.content?.map?.height;
      return typeof h === "string" && h.length ? h : "500px";
    });

    const mapContainerStyle = computed(() => ({
      height: containerHeight.value,
      minHeight: containerHeight.value,
      width: "100%",
    }));

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

    function onLayerClick(payload) {
      fire("layer:click", payload);
    }

    function entryKind(type) {
      if (type === TILE_TYPE) return "tile";
      if (CONTROL_TYPES.has(type)) return "control";
      return "overlay";
    }

    function buildEntry(desc) {
      const kind = entryKind(desc.type);
      let layer = null;
      if (kind === "tile") layer = buildTile(desc);
      else if (kind === "control") layer = buildControl(desc);
      else layer = buildOverlay(desc, onLayerClick);
      return layer ? { layer, kind } : null;
    }

    function attachEntry(entry) {
      if (entry.kind === "control") entry.layer.addTo(mapInstance);
      else entry.layer.addTo(mapInstance);
    }

    function detachEntry(entry) {
      if (entry.kind === "control") mapInstance.removeControl(entry.layer);
      else mapInstance.removeLayer(entry.layer);
    }

    function applyLayers() {
      const list = Array.isArray(props.content.layers)
        ? deepToRaw(props.content.layers)
        : [];
      const nextById = new Map();
      for (const desc of list) {
        if (desc && desc.id) nextById.set(desc.id, desc);
      }

      // Remove entries gone or whose serialized shape changed.
      for (const [id, entry] of entries) {
        const newDesc = nextById.get(id);
        if (!newDesc || JSON.stringify(newDesc) !== entry.signature) {
          detachEntry(entry);
          entries.delete(id);
        }
      }

      // Add new or updated entries.
      for (const [id, desc] of nextById) {
        if (entries.has(id)) continue;
        const built = buildEntry(desc);
        if (!built) continue;
        attachEntry(built);
        built.signature = JSON.stringify(desc);
        entries.set(id, built);
      }
    }

    function emitMoveEnd() {
      const c = mapInstance.getCenter();
      const z = mapInstance.getZoom();
      const b = boundsToObject(mapInstance.getBounds());
      currentCenter.value = { lat: c.lat, lng: c.lng };
      currentZoom.value = z;
      currentBounds.value = b;
      fire("map:moveend", {
        center: { lat: c.lat, lng: c.lng },
        zoom: z,
        bounds: b,
      });
    }

    function buildMapOptions() {
      const opts = deepToRaw(props.content.map) || {};
      // `height` is wrapper-only — strip before forwarding to Leaflet.
      const { height, ...leafletOpts } = opts;
      return leafletOpts;
    }

    function initMap() {
      if (mapInstance) return;
      mapInstance = L.map(mapContainer.value, buildMapOptions());

      applyLayers();

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
      entries.clear();
    });

    // Map view watchers — center/zoom apply via setView (no full recreate).
    watch(
      () => [props.content.map?.center, props.content.map?.zoom],
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
      () => props.content.layers,
      () => { if (mapInstance) applyLayers(); },
      { deep: true }
    );

    // Methods exposed as WeWeb actions.
    function setView(lat, lng, zoom) {
      if (!mapInstance) return;
      mapInstance.setView([lat, lng], zoom);
    }
    function flyTo(lat, lng, zoom, duration) {
      if (!mapInstance) return;
      // `duration` is accepted in milliseconds (web convention); Leaflet wants seconds.
      const opts =
        typeof duration === "number" && duration > 0
          ? { duration: duration / 1000 }
          : undefined;
      mapInstance.flyTo([lat, lng], zoom, opts);
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
      containerHeight,
      mapContainerStyle,
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
  display: block;
  width: 100%;
  /* wwEditor:start */
  &.editing {
    pointer-events: none;
  }
  /* wwEditor:end */
}
.ww-leaflet__map {
  display: block;
  width: 100%;
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
