import { ref, watch } from "vue";
import L from "../leaflet";
import _L from "leaflet";
import "leaflet-providers";

import default_iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import default_iconUrl from "leaflet/dist/images/marker-icon.png";
import default_shadowUrl from "leaflet/dist/images/marker-shadow.png";

import {
  markerFields,
  circleFields,
  polygonFields,
  polylineFields,
  rectangleFields,
  geoJSONFields,
} from "./fields.js";

const generateVectorStyles = (fields, vector) => {
  return {
    stroke: fields[`${vector}_strokeField`],
    color: fields[`${vector}_colorField`],
    weight: fields[`${vector}_weightField`],
    opacity: fields[`${vector}_opacityField`],
    lineCap: fields[`${vector}_lineCapField`],
    lineJoin: fields[`${vector}_lineJoinField`],
    dashArray: fields[`${vector}_dashArrayField`],
    dashOffset: fields[`${vector}_dashOffsetField`],
    fill: fields[`${vector}_fillField`],
    fillColor: fields[`${vector}_fillColorField`],
    fillOpacity: fields[`${vector}_fillOpacityField`],
    fillRule: fields[`${vector}_fillRuleField`],
  };
};

export default function useLeafletMap(mapContainer, content, boundStates) {
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
      if (!markerData) return;

      const fields = markerFields(content, markerData);

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
      } =
        boundStates && boundStates.markers.value
          ? {
              data: fields.markerDataField,
              customIcon:
                typeof fields.markerIconUrlField === "string" &&
                fields.markerIconUrlField.length,
              iconUrl: fields.markerIconUrlField,
              iconWidth: fields.markerIconWidthField,
              iconHeight: fields.markerIconHeightField,
              tooltip:
                typeof fields.markers_tooltipContentField === "string" &&
                fields.markers_tooltipContentField.length,
              tooltipContent: fields.markers_tooltipContentField,
              tooptipDirection: fields.markers_tooltipDirectionField,
              tooltipPermanent: fields.markers_tooltipPermanentField,
            }
          : markerData;

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
      if (!circleData) return;

      const fields = circleFields(content, circleData);

      const {
        data,
        radius,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } =
        boundStates && boundStates.circles.value
          ? {
              data: fields.circleDataField,
              radius: fields.circleRadiusField,
              tooltip:
                typeof fields.circles_tooltipContentField === "string" &&
                fields.circles_tooltipContentField.length,
              tooltipContent: fields.circles_tooltipContentField,
              tooptipDirection: fields.circles_tooltipDirectionField,
              tooltipPermanent: fields.circles_tooltipPermanentField,
              ...generateVectorStyles(fields, "circles"),
            }
          : circleData;

      if (!data || !data.length) return;

      let circleInstance = L.circle(data, { ...styles, radius }).addTo(map);

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
      if (!polygonData) return;

      const fields = polygonFields(content, polygonData);

      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } =
        boundStates && boundStates.polygons.value
          ? {
              data: fields.circleDataField,
              tooltip:
                typeof fields.circles_tooltipContentField === "string" &&
                fields.circles_tooltipContentField.length,
              tooltipContent: fields.circles_tooltipContentField,
              tooptipDirection: fields.circles_tooltipDirectionField,
              tooltipPermanent: fields.circles_tooltipPermanentField,
              ...generateVectorStyles(fields, "polygons"),
            }
          : polygonData;

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
      if (!rectangleData) return;

      const fields = rectangleFields(content, rectangleData);

      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } =
        boundStates && boundStates.rectangles.value
          ? {
              data: fields.rectangleDataField,
              tooltip:
                typeof fields.rectangles_tooltipContentField === "string" &&
                fields.rectangles_tooltipContentField.length,
              tooltipContent: fields.rectangles_tooltipContentField,
              tooptipDirection: fields.rectangles_tooltipDirectionField,
              tooltipPermanent: fields.rectangles_tooltipPermanentField,
              ...generateVectorStyles(fields, "rectangles"),
            }
          : rectangleData;

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
      if (!polylineData) return;

      const fields = polylineFields(content, polylineData);

      const {
        data,
        smoothFactorField,
        noClipField,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } =
        boundStates && boundStates.polylines.value
          ? {
              data: fields.polylineDataField,
              tooltip:
                typeof fields.polylines_tooltipContentField === "string" &&
                fields.polylines_tooltipContentField.length,
              tooltipContent: fields.polylines_tooltipContentField,
              tooptipDirection: fields.polylines_tooltipDirectionField,
              tooltipPermanent: fields.polylines_tooltipPermanentField,
              ...generateVectorStyles(fields, "polylines"),
            }
          : polylineData;

      if (!data || !data.length) return;

      let polylineInstance = L.polyline(data, {
        ...styles,
        smoothFactorField,
        noClipField,
      }).addTo(map);

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
      if (!geoJSON) return;

      const fields = geoJSONFields(content, geoJSON);

      const {
        data,
        tooltip,
        tooltipContent,
        tooptipDirection,
        tooltipPermanent,
        ...styles
      } =
        boundStates && boundStates.polylines.value
          ? {
              data: fields.geoJSONsDataField,
              tooltip:
                typeof fields.geoJSONs_tooltipContentField === "string" &&
                fields.geoJSONs_tooltipContentField.length,
              tooltipContent: fields.geoJSONs_tooltipContentField,
              tooptipDirection: fields.geoJSONs_tooltipDirectionField,
              tooltipPermanent: fields.geoJSONs_tooltipPermanentField,
              ...generateVectorStyles(fields, "geoJSONs"),
            }
          : geoJSON;

      if (data) {
        const layer = L.geoJson(data, {
          style: () => ({ ...styles }),
        }).addTo(map);

        if (
          tooltip &&
          typeof tooltipContent === "string" &&
          tooltipContent.length
        ) {
          layer.bindTooltip(tooltipContent, {
            permanent: tooltipPermanent,
            direction: tooptipDirection,
          });
        }

        geoJsonLayers.value.push(layer);
      }
    });
  };

  const clearLayers = (layersRef) => {
    layersRef.value.forEach((layer) => map.removeLayer(layer));
    layersRef.value = [];
  };

  watch(() => content, initializeMap, { deep: true });

  watch(
    () => mapContainer,
    (value) => {
      if (value) initializeMap();
    },
    { immediate: true }
  );

  return { map };
}
