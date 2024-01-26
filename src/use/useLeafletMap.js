import { ref, watch } from "vue";
import L from "leaflet";
import "leaflet-providers";

export default function useLeafletMap(mapContainer, content) {
  let map = null;
  const markerLayers = ref([]);
  const circleLayers = ref([]);
  const geoJsonLayers = ref([]);
  const polylineLayers = ref([]);
  const polygonLayers = ref([]);
  const rectangleLayers = ref([]);

  const initializeMap = () => {
    if (map) {
      map.remove();
    }

    map = L.map(mapContainer, {
      preferCanvas: true,
      center: [46.603354, 1.888334],
      zoom: 4,
      zoomControl: true,
      markerZoomAnimation: true,
    });

    L.tileLayer.provider(content.tileLayer).addTo(map);

    addMarkers();
    addGeoJSONLayers();
    addCircles();
    addPolylines();
    addPolygons();
    addRectangles();
  };

  const addMarkers = () => {
    clearLayers(markerLayers);

    if (!Array.isArray(content.marker) || !content.marker.length) return;

    content.marker.forEach((markerData) => {
      if (!markerData || !markerData.data) return;

      const { data, customIcon, iconUrl, iconWidth, iconHeight } = markerData;

      let icon;
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
      } else {
        icon = L.Icon.Default.prototype;
      }

      let markerInstance = L.marker(data, { icon }).addTo(map);
      markerLayers.value.push(markerInstance);
    });
  };

  const addGeoJSONLayers = () => {
    clearLayers(geoJsonLayers);

    if (!Array.isArray(content.geoJSON) || !content.geoJSON.length) return;

    content.geoJSON.forEach((geoJSON) => {
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

  const addPolylines = () => {
    clearLayers(polylineLayers);

    if (!Array.isArray(content.polyline) || !content.polyline.length) return;

    content.polyline.forEach((polylineData) => {
      if (!polylineData || !polylineData.data) return;

      const { data, ...styles } = polylineData;
      if (!data || !data.length) return;

      let polylineInstance = L.polyline(data, { ...styles }).addTo(map);

      map.fitBounds(polylineInstance.getBounds());

      console.log(polylineInstance, data, styles);

      polylineLayers.value.push(polylineInstance);
    });
  };

  const addCircles = () => {
    clearLayers(circleLayers);

    if (!Array.isArray(content.circles) || !content.circles.length) return;

    content.circles.forEach((circle) => {
      const { x, y, radius, tooltip, strokeWeight, strokeColor, fillColor } =
        circle;
      if (!x || !y) return;

      let circleInstance = L.circle([x, y], {
        stroke: true,
        weight: strokeWeight,
        color: strokeColor,
        fillColor: fillColor,
        radius: radius,
      }).addTo(map);

      circleInstance.bindTooltip(tooltip, { permanent: false, sticky: true });

      circleLayers.value.push(circleInstance);
    });
  };

  const addPolygons = () => {
    clearLayers(polygonLayers);

    if (!Array.isArray(content.polygons) || !content.polygons.length) return;

    content.polygons.forEach((polygonData) => {
      const { data, ...styles } = polygonData;
      if (!data || !data.length) return;

      let polygonInstance = L.polygon(data, { ...styles }).addTo(map);

      polygonLayers.value.push(polygonInstance);
    });
  };

  const addRectangles = () => {
    clearLayers(rectangleLayers);

    if (!Array.isArray(content.rectangles) || !content.rectangles.length)
      return;

    content.rectangles.forEach((rectangleData) => {
      const { data, ...styles } = rectangleData;
      if (!data || data.length !== 2) return;

      let rectangleInstance = L.rectangle(data, { ...styles }).addTo(map);

      rectangleLayers.value.push(rectangleInstance);
    });
  };

  const clearLayers = (layersRef) => {
    layersRef.value.forEach((layer) => map.removeLayer(layer));
    layersRef.value = [];
  };

  watch(() => content.tileLayer, initializeMap, { deep: true });
  watch(() => content.marker, addMarkers, { deep: true });
  watch(() => content.circles, addCircles, { deep: true });
  watch(() => content.geoJSON, addGeoJSONLayers, { deep: true });
  watch(() => content.polyline, addPolylines, { deep: true });
  watch(() => content.polygon, addPolygons, { deep: true });
  watch(() => content.rectangle, addRectangles, { deep: true });

  watch(
    () => mapContainer,
    (value) => {
      if (value) initializeMap();
    },
    { immediate: true }
  );

  return { map };
}
