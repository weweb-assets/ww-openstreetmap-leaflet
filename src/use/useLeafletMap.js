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

export default function useLeafletMap(
  mapContainer,
  content,
  boundStates,
  emit
) {
  let map = null;
  const markerLayers = ref([]);
  const circleLayers = ref([]);
  const polygonLayers = ref([]);
  const rectangleLayers = ref([]);
  const polylineLayers = ref([]);
  const geoJsonLayers = ref([]);

  const clearLayers = (layersRef) => {
    try {
      layersRef.value.forEach((layer) => map.removeLayer(layer));
      layersRef.value = [];
    } catch (error) {
      console.error("Error clearing layers:", error);
    }
  };

  const initializeMap = () => {
    try {
      if (map) {
        map.remove();
      }

      const lat = parseFloat(content.lat);
      const lng = parseFloat(content.lng);
      const zoom = parseInt(content.zoom);

      if (isNaN(lat) || isNaN(lng) || isNaN(zoom)) {
        throw new Error("Invalid coordinates or zoom level");
      }

      map = L.map(mapContainer, {
        center: [lat, lng],
        zoom: zoom,
        zoomControl: content.zoomControl,
        markerZoomAnimation: true,
        attributionControl: content.attributionControl,
        scrollWheelZoom: content.scrollZoom,
      });

      const tileLayer = _L.tileLayer.provider(content.tileLayer);

      tileLayer.on("tileerror", (error) => {
        console.error("Tile loading error:", error);
      });

      tileLayer.addTo(map);

      // Add map event listeners
      map.on("click", (e) =>
        fireEvent("map:click", {
          latlng: e.latlng,
          originalEvent: e.originalEvent,
        })
      );
      map.on("zoomend", () => fireEvent("map:zoom", { zoom: map.getZoom() }));
      map.on("moveend", () =>
        fireEvent("map:move", {
          center: map.getCenter(),
          bounds: map.getBounds(),
        })
      );
      map.on("dragstart", () =>
        fireEvent("map:dragstart", { center: map.getCenter() })
      );
      map.on("dragend", () =>
        fireEvent("map:dragend", { center: map.getCenter() })
      );

      addMarkers();
      addCircles();
      addPolygons();
      addRectangles();
      addPolylines();
      addGeoJSONLayers();
    } catch (error) {
      console.error("Map initialization error:", error);
      throw error;
    }
  };

  const addMarkers = () => {
    try {
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
          tooltipDirection,
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
                tooltipDirection: fields.markers_tooltipDirectionField,
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
            direction: tooltipDirection,
          });
        }

        markerLayers.value.push(markerInstance);

        // Add event listeners
        markerInstance.on("click", (e) =>
          fireEvent("marker:click", {
            marker: markerData,
            latlng: e.latlng,
            originalEvent: e,
          })
        );
        markerInstance.on("dragstart", (e) =>
          fireEvent("marker:dragstart", {
            marker: markerData,
            latlng: e.latlng,
          })
        );
        markerInstance.on("drag", (e) =>
          fireEvent("marker:drag", { marker: markerData, latlng: e.latlng })
        );
        markerInstance.on("dragend", (e) =>
          fireEvent("marker:dragend", { marker: markerData, latlng: e.latlng })
        );
      });
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  };

  const addCircles = () => {
    try {
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
          tooltipDirection,
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
                tooltipDirection: fields.circles_tooltipDirectionField,
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
            direction: tooltipDirection,
          });
        }

        circleLayers.value.push(circleInstance);

        // Add event listeners
        circleInstance.on("click", (e) =>
          fireEvent("shape:click", {
            type: "circle",
            shape: circleData,
            latlng: e.latlng,
          })
        );
        if (content.editableShapes) {
          circleInstance.on("edit", (e) =>
            fireEvent("shape:edit", {
              type: "circle",
              shape: circleData,
              latlng: e.latlng,
            })
          );
        }
      });
    } catch (error) {
      console.error("Error adding circles:", error);
    }
  };

  const addPolygons = () => {
    try {
      clearLayers(polygonLayers);

      if (!Array.isArray(content.polygons) || !content.polygons.length) return;

      content.polygons.forEach((polygonData) => {
        if (!polygonData) return;

        const fields = polygonFields(content, polygonData);

        const {
          data,
          tooltip,
          tooltipContent,
          tooltipDirection,
          tooltipPermanent,
          ...styles
        } =
          boundStates && boundStates.polygons.value
            ? {
                data: fields.polygonDataField,
                tooltip:
                  typeof fields.polygons_tooltipContentField === "string" &&
                  fields.polygons_tooltipContentField.length,
                tooltipContent: fields.polygons_tooltipContentField,
                tooltipDirection: fields.polygons_tooltipDirectionField,
                tooltipPermanent: fields.polygons_tooltipPermanentField,
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
            direction: tooltipDirection,
          });
        }

        polygonLayers.value.push(polygonInstance);

        // Add event listeners
        polygonInstance.on("click", (e) =>
          fireEvent("shape:click", {
            type: "polygon",
            shape: polygonData,
            latlng: e.latlng,
          })
        );
        if (content.editableShapes) {
          polygonInstance.on("edit", (e) =>
            fireEvent("shape:edit", {
              type: "polygon",
              shape: polygonData,
              latlng: e.latlng,
            })
          );
        }
      });
    } catch (error) {
      console.error("Error adding polygons:", error);
    }
  };

  const addRectangles = () => {
    try {
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
          tooltipDirection,
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
                tooltipDirection: fields.rectangles_tooltipDirectionField,
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
            direction: tooltipDirection,
          });
        }

        rectangleLayers.value.push(rectangleInstance);

        // Add event listeners
        rectangleInstance.on("click", (e) =>
          fireEvent("shape:click", {
            type: "rectangle",
            shape: rectangleData,
            latlng: e.latlng,
          })
        );
        if (content.editableShapes) {
          rectangleInstance.on("edit", (e) =>
            fireEvent("shape:edit", {
              type: "rectangle",
              shape: rectangleData,
              latlng: e.latlng,
            })
          );
        }
      });
    } catch (error) {
      console.error("Error adding rectangles:", error);
    }
  };

  const addPolylines = () => {
    try {
      clearLayers(polylineLayers);

      if (!Array.isArray(content.polylines) || !content.polylines.length)
        return;

      content.polylines.forEach((polylineData) => {
        if (!polylineData) return;

        const fields = polylineFields(content, polylineData);

        const {
          data,
          smoothFactor,
          noClip,
          tooltip,
          tooltipContent,
          tooltipDirection,
          tooltipPermanent,
          ...styles
        } =
          boundStates && boundStates.polylines.value
            ? {
                data: fields.polylineDataField,
                smoothFactor: fields.smoothFactorField,
                noClip: fields.noClipField,
                tooltip:
                  typeof fields.polylines_tooltipContentField === "string" &&
                  fields.polylines_tooltipContentField.length,
                tooltipContent: fields.polylines_tooltipContentField,
                tooltipDirection: fields.polylines_tooltipDirectionField,
                tooltipPermanent: fields.polylines_tooltipPermanentField,
                ...generateVectorStyles(fields, "polylines"),
              }
            : polylineData;

        if (!data || !data.length) return;

        let polylineInstance = L.polyline(data, {
          ...styles,
          smoothFactor,
          noClip,
        }).addTo(map);

        if (
          tooltip &&
          typeof tooltipContent === "string" &&
          tooltipContent.length
        ) {
          polylineInstance.bindTooltip(tooltipContent, {
            permanent: tooltipPermanent,
            direction: tooltipDirection,
          });
        }

        polylineLayers.value.push(polylineInstance);

        // Add event listeners
        polylineInstance.on("click", (e) =>
          fireEvent("shape:click", {
            type: "polyline",
            shape: polylineData,
            latlng: e.latlng,
          })
        );
        if (content.editableShapes) {
          polylineInstance.on("edit", (e) =>
            fireEvent("shape:edit", {
              type: "polyline",
              shape: polylineData,
              latlng: e.latlng,
            })
          );
        }
      });
    } catch (error) {
      console.error("Error adding polylines:", error);
    }
  };

  const addGeoJSONLayers = () => {
    try {
      clearLayers(geoJsonLayers);

      if (!Array.isArray(content.geoJSONs) || !content.geoJSONs.length) return;

      content.geoJSONs.forEach((geoJSON) => {
        if (!geoJSON) return;

        const fields = geoJSONFields(content, geoJSON);

        const {
          data,
          tooltip,
          tooltipContent,
          tooltipDirection,
          tooltipPermanent,
          ...styles
        } =
          boundStates && boundStates.geoJSONs.value
            ? {
                data: fields.geoJSONsDataField,
                tooltip:
                  typeof fields.geoJSONs_tooltipContentField === "string" &&
                  fields.geoJSONs_tooltipContentField.length,
                tooltipContent: fields.geoJSONs_tooltipContentField,
                tooltipDirection: fields.geoJSONs_tooltipDirectionField,
                tooltipPermanent: fields.geoJSONs_tooltipPermanentField,
                ...generateVectorStyles(fields, "geoJSONs"),
              }
            : geoJSON;

        if (!data) return;

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
            direction: tooltipDirection,
          });
        }

        geoJsonLayers.value.push(layer);

        // Add event listeners
        layer.on("click", (e) =>
          fireEvent("shape:click", {
            type: "geojson",
            shape: geoJSON,
            latlng: e.latlng,
          })
        );
        if (content.editableShapes) {
          layer.on("edit", (e) =>
            fireEvent("shape:edit", {
              type: "geojson",
              shape: geoJSON,
              latlng: e.latlng,
            })
          );
        }
      });
    } catch (error) {
      console.error("Error adding GeoJSON layers:", error);
    }
  };

  function fireEvent(eventName, payload) {
    emit("trigger-event", {
      name: eventName,
      event: payload,
    });
  }

  function fitBounds() {
    if (!map || !markerLayers.value.length) return;

    const group = L.featureGroup([
      ...markerLayers.value,
      ...circleLayers.value,
      ...polygonLayers.value,
      ...rectangleLayers.value,
      ...polylineLayers.value,
      ...geoJsonLayers.value,
    ]);

    map.fitBounds(group.getBounds(), { padding: [20, 20] });
  }

  watch(() => content, initializeMap, { deep: true });

  watch(
    () => mapContainer,
    (value) => {
      if (value) initializeMap();
    },
    { immediate: true }
  );

  // Initialize map
  initializeMap();

  // Add layers
  clearLayers();
  addMarkers();
  addCircles();
  addPolygons();
  addRectangles();
  addPolylines();
  addGeoJSONLayers();

  // Fit bounds if needed
  if (content.fixedBounds) {
    fitBounds();
  }

  return { map };
}
