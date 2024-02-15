import { ref, watch } from "vue";
import L from "../leaflet";
import _L, { tooltip } from "leaflet";
import "leaflet-providers";

import default_iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import default_iconUrl from "leaflet/dist/images/marker-icon.png";
import default_shadowUrl from "leaflet/dist/images/marker-shadow.png";

export default function useLeafletMap(mapContainer, content) {
  let map = null;
  const markerLayers = ref([]);
  const circleLayers = ref([]);
  const polygonLayers = ref([]);
  const rectangleLayers = ref([]);
  const polylineLayers = ref([]);
  const geoJsonLayers = ref([]);

  const initializeMap = () => {
    if (map) {
      map.remove();
    }

    const lat = parseFloat(content.lat);
    const lng = parseFloat(content.lng);
    const zoom = parseInt(content.zoom);

    if (isNaN(lat) || isNaN(lng) || isNaN(zoom)) return;

    map = L.map(mapContainer, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: content.zoomControl,
      markerZoomAnimation: true,
      attributionControl: content.attributionControl,
    });

    _L.tileLayer.provider(content.tileLayer).addTo(map); // This function work only with the original leaflet code ???

    addMarkers();
    addCircles();
    addPolygons();
    addRectangles();
    addPolylines();
    addGeoJSONLayers();
  };

  const addMarkers = () => {
    clearLayers(markerLayers);

    if (!Array.isArray(content.markers) || !content.markers.length) return;

    content.markers.forEach((markerData) => {
      if (!markerData || !markerData.data) return;

      const {
        data,
        customIcon,
        iconUrl,
        iconWidth,
        iconHeight,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
      } = markerData;

      if (!data || data.length !== 2) return;

      let markerInstance, icon;
      if (
        customIcon &&
        iconUrl &&
        typeof iconUrl === "string" &&
        iconUrl.length
      ) {
        icon = new L.Icon({
          iconUrl: iconUrl.startsWith("designs/")
            ? `${wwLib.wwUtils.getCdnPrefix()}${iconUrl}`
            : iconUrl,
          iconSize: [
            wwLib.wwUtils.getLengthUnit(iconWidth)[0],
            wwLib.wwUtils.getLengthUnit(iconHeight)[0],
          ],
        });

        markerInstance = L.marker(data, { icon }).addTo(map);
      } else {
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
          iconRetinaUrl: default_iconRetinaUrl,
          iconUrl: default_iconUrl,
          shadowUrl: default_shadowUrl,
        });

        markerInstance = L.marker(data).addTo(map);
      }

      if (
        tooltip &&
        typeof tooltipContent === "string" &&
        tooltipContent.length
      ) {
        markerInstance.bindTooltip(tooltipContent, {
          permanent: tooltipPermanent,
          direction: tooptipDirection,
        });
      }

      markerLayers.value.push(markerInstance);
    });
  };

  const addCircles = () => {
    clearLayers(circleLayers);
    if (!Array.isArray(content.circles) || !content.circles.length) return;

    content.circles.forEach((circleData) => {
      if (!circleData || !circleData.data) return;

      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } = circleData;

      if (!data || !data.length || typeof styles.radius !== "number") return;

      let circleInstance = L.circle(data, { ...styles }).addTo(map);

      if (
        tooltip &&
        typeof tooltipContent === "string" &&
        tooltipContent.length
      ) {
        circleInstance.bindTooltip(tooltipContent, {
          permanent: tooltipPermanent,
          direction: tooptipDirection,
        });
      }

      circleLayers.value.push(circleInstance);
    });
  };

  const addPolygons = () => {
    clearLayers(polygonLayers);

    if (!Array.isArray(content.polygons) || !content.polygons.length) return;

    content.polygons.forEach((polygonData) => {
      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } = polygonData;

      if (!data || !data.length) return;

      let polygonInstance = L.polygon(data, { ...styles }).addTo(map);

      if (
        tooltip &&
        typeof tooltipContent === "string" &&
        tooltipContent.length
      ) {
        polygonInstance.bindTooltip(tooltipContent, {
          permanent: tooltipPermanent,
          direction: tooptipDirection,
        });
      }

      polygonLayers.value.push(polygonInstance);
    });
  };

  const addRectangles = () => {
    clearLayers(rectangleLayers);

    if (!Array.isArray(content.rectangles) || !content.rectangles.length)
      return;

    content.rectangles.forEach((rectangleData) => {
      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } = rectangleData;
      if (!data || data.length !== 2) return;

      let rectangleInstance = L.rectangle(data, { ...styles }).addTo(map);

      if (
        tooltip &&
        typeof tooltipContent === "string" &&
        tooltipContent.length
      ) {
        rectangleInstance.bindTooltip(tooltipContent, {
          permanent: tooltipPermanent,
          direction: tooptipDirection,
        });
      }

      rectangleLayers.value.push(rectangleInstance);
    });
  };

  const addPolylines = () => {
    clearLayers(polylineLayers);

    if (!Array.isArray(content.polylines) || !content.polylines.length) return;

    content.polylines.forEach((polylineData) => {
      if (!polylineData || !polylineData.data) return;

      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } = polylineData;
      if (!data || !data.length) return;

      let polylineInstance = L.polyline(data, { ...styles }).addTo(map);

      if (
        tooltip &&
        typeof tooltipContent === "string" &&
        tooltipContent.length
      ) {
        polylineInstance.bindTooltip(tooltipContent, {
          permanent: tooltipPermanent,
          direction: tooptipDirection,
        });
      }

      polylineLayers.value.push(polylineInstance);
    });
  };

  const addGeoJSONLayers = () => {
    clearLayers(geoJsonLayers);

    if (!Array.isArray(content.geoJSONs) || !content.geoJSONs.length) return;

    content.geoJSONs.forEach((geoJSON) => {
      if (!geoJSON || !geoJSON.data) return;

      const { data, ...styles } = geoJSON;

      if (data) {
        const layer = L.geoJson(data, {
          style: () => ({ ...styles }),
        }).addTo(map);

        geoJsonLayers.value.push(layer);
      }
    });
  };

  const clearLayers = (layersRef) => {
    layersRef.value.forEach((layer) => map.removeLayer(layer));
    layersRef.value = [];
  };

  watch(() => content, initializeMap, { deep: true });
  // watch(() => content.tileLayer, initializeMap, { deep: true });
  // watch(() => content.markers, addMarkers, { deep: true });
  // watch(() => content.circles, addCircles, { deep: true });
  // watch(() => content.polygons, addPolygons, { deep: true });
  // watch(() => content.rectangles, addRectangles, { deep: true });
  // watch(() => content.polylines, addPolylines, { deep: true });
  // watch(() => content.geoJSONs, addGeoJSONLayers, { deep: true });

  watch(
    () => mapContainer,
    (value) => {
      if (value) initializeMap();
    },
    { immediate: true }
  );

  return { map };
}
