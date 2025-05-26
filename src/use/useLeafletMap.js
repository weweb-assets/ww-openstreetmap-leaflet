import { ref, watch } from "vue";
import L from "../leaflet";
import _L from "leaflet";
import "leaflet-providers";

import default_iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import default_iconUrl from "leaflet/dist/images/marker-icon.png";
import default_shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { markerFields, circleFields, polygonFields } from "./fields.js";

// Utility function for coordinate validation
const isValidCoordinate = (lat, lng) => {
  return (
    !isNaN(lat) &&
    !isNaN(lng) &&
    isFinite(lat) &&
    isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

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

  function fireEvent(eventName, payload) {
    emit("trigger-event", {
      name: eventName,
      event: payload,
    });
  }

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
      // Validate map container exists and is a valid DOM element
      if (!mapContainer) {
        console.warn("Map container is not defined");
        return;
      }

      // Check if container is a DOM element or has the necessary properties
      if (
        typeof mapContainer === "object" &&
        !mapContainer.nodeType &&
        !mapContainer.jquery
      ) {
        console.warn("Map container is not a valid DOM element");
        return;
      }

      // Clean up existing map instance
      if (map) {
        try {
          map.remove();
        } catch (cleanupError) {
          console.warn(
            "Error cleaning up previous map instance:",
            cleanupError
          );
        }
        map = null;
      }

      // Validate content object
      if (!content || typeof content !== "object") {
        console.error("Invalid content configuration");
        return;
      }

      // Validate and parse coordinates with fallbacks
      const lat = content.lat !== undefined ? parseFloat(content.lat) : 0;
      const lng = content.lng !== undefined ? parseFloat(content.lng) : 0;
      const zoom = content.zoom !== undefined ? parseInt(content.zoom) : 1;

      // Enhanced coordinate validation including special values
      const isValidLat = (value) => {
        return !isNaN(value) && isFinite(value) && value >= -90 && value <= 90;
      };

      const isValidLng = (value) => {
        return (
          !isNaN(value) && isFinite(value) && value >= -180 && value <= 180
        );
      };

      const isValidZoom = (value) => {
        return !isNaN(value) && isFinite(value) && value >= 0 && value <= 20;
      };

      // Validate coordinates are within valid ranges
      if (!isValidLat(lat)) {
        console.error(
          "Invalid latitude value:",
          content.lat,
          "- using default 0"
        );
      }
      if (!isValidLng(lng)) {
        console.error(
          "Invalid longitude value:",
          content.lng,
          "- using default 0"
        );
      }
      if (!isValidZoom(zoom)) {
        console.error("Invalid zoom value:", content.zoom, "- using default 1");
      }

      const validLat = isValidLat(lat) ? lat : 0;
      const validLng = isValidLng(lng) ? lng : 0;
      const validZoom = isValidZoom(zoom) ? zoom : 1;

      // Create map with error handling
      map = L.map(mapContainer, {
        center: [validLat, validLng],
        zoom: validZoom,
        zoomControl: content.zoomControl !== false,
        markerZoomAnimation: true,
        attributionControl: content.attributionControl !== false,
      });

      // Add tile layer with error handling
      let tileLayer;
      try {
        const tileLayerName = content.tileLayer || "OpenStreetMap.Mapnik";
        tileLayer = _L.tileLayer.provider(tileLayerName);

        tileLayer.on("tileerror", (error) => {
          console.warn("Tile loading error:", error);
        });

        tileLayer.addTo(map);
      } catch (tileError) {
        console.error("Error creating tile layer:", tileError);
        // Fallback to basic OpenStreetMap if provider fails
        try {
          tileLayer = _L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution: "© OpenStreetMap contributors",
            }
          );
          tileLayer.addTo(map);
        } catch (fallbackError) {
          console.error("Failed to load fallback tile layer:", fallbackError);
        }
      }

      // Add map event listeners
      map.on("load", () => fireEvent("map:load"));
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

      // Add layers with individual error handling
      try {
        addMarkers();
      } catch (markerError) {
        console.error("Error adding markers:", markerError);
      }

      try {
        addCircles();
      } catch (circleError) {
        console.error("Error adding circles:", circleError);
      }

      try {
        addPolygons();
      } catch (polygonError) {
        console.error("Error adding polygons:", polygonError);
      }
    } catch (error) {
      console.error("Map initialization error:", error);
      // Don't re-throw the error to prevent crashes
      map = null;
    }
  };

  const addMarkers = () => {
    try {
      clearLayers(markerLayers);

      if (!map) {
        console.warn("Map not initialized, skipping markers");
        return;
      }

      if (!Array.isArray(content.markers) || !content.markers.length) return;

      content.markers.forEach((markerData, index) => {
        try {
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

          // Validate marker data
          if (!data || !Array.isArray(data) || data.length !== 2) {
            console.warn(`Invalid marker data at index ${index}:`, data);
            return;
          }

          // Validate coordinates with enhanced checks
          const lat = parseFloat(data[0]);
          const lng = parseFloat(data[1]);

          if (!isValidCoordinate(lat, lng)) {
            console.warn(
              `Invalid marker coordinates at index ${index}:`,
              data,
              `(lat: ${lat}, lng: ${lng})`
            );
            return;
          }

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
            fireEvent("marker:dragend", {
              marker: markerData,
              latlng: e.latlng,
            })
          );
        } catch (markerError) {
          console.warn(`Error adding marker at index ${index}:`, markerError);
        }
      });
    } catch (error) {
      console.error("Error adding markers:", error);
    }
  };

  const addCircles = () => {
    try {
      clearLayers(circleLayers);

      if (!map) {
        console.warn("Map not initialized, skipping circles");
        return;
      }

      if (!Array.isArray(content.circles) || !content.circles.length) return;

      content.circles.forEach((circleData, index) => {
        try {
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

          // Validate circle data
          if (!data || !Array.isArray(data) || data.length !== 2) {
            console.warn(`Invalid circle data at index ${index}:`, data);
            return;
          }

          // Validate coordinates with enhanced checks
          const lat = parseFloat(data[0]);
          const lng = parseFloat(data[1]);

          if (!isValidCoordinate(lat, lng)) {
            console.warn(
              `Invalid circle coordinates at index ${index}:`,
              data,
              `(lat: ${lat}, lng: ${lng})`
            );
            return;
          }

          // Enhanced radius validation
          const validRadius = parseFloat(radius);
          if (
            isNaN(validRadius) ||
            !isFinite(validRadius) ||
            validRadius <= 0
          ) {
            console.warn(
              `Invalid circle radius at index ${index}:`,
              radius,
              `(parsed: ${validRadius})`
            );
            return;
          }

          // Check for extremely large radius values that might cause performance issues
          if (validRadius > 10000000) {
            // 10,000 km
            console.warn(
              `Circle radius at index ${index} is very large (${validRadius}m). This might cause performance issues.`
            );
          }

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
        } catch (circleError) {
          console.warn(`Error adding circle at index ${index}:`, circleError);
        }
      });
    } catch (error) {
      console.error("Error adding circles:", error);
    }
  };

  const addPolygons = () => {
    try {
      clearLayers(polygonLayers);

      if (!map) {
        console.warn("Map not initialized, skipping polygons");
        return;
      }

      if (!Array.isArray(content.polygons) || !content.polygons.length) return;

      content.polygons.forEach((polygonData, index) => {
        try {
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

          // Validate polygon data
          if (!data || !Array.isArray(data) || data.length === 0) {
            console.warn(`Invalid polygon data at index ${index}:`, data);
            return;
          }

          // Enhanced polygon coordinate validation
          const isValidPolygon = data.every((coord, coordIndex) => {
            if (!Array.isArray(coord) || coord.length !== 2) {
              console.warn(
                `Invalid polygon coordinate structure at index ${index}, coordinate ${coordIndex}:`,
                coord
              );
              return false;
            }

            const lat = parseFloat(coord[0]);
            const lng = parseFloat(coord[1]);

            if (!isValidCoordinate(lat, lng)) {
              console.warn(
                `Invalid polygon coordinate values at index ${index}, coordinate ${coordIndex}:`,
                coord,
                `(lat: ${lat}, lng: ${lng})`
              );
              return false;
            }

            return true;
          });

          if (!isValidPolygon) {
            console.warn(
              `Skipping polygon at index ${index} due to invalid coordinates`
            );
            return;
          }

          // Ensure polygon has at least 3 points
          if (data.length < 3) {
            console.warn(
              `Polygon at index ${index} has insufficient points (${data.length}). Minimum 3 required.`
            );
            return;
          }

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
        } catch (polygonError) {
          console.warn(`Error adding polygon at index ${index}:`, polygonError);
        }
      });
    } catch (error) {
      console.error("Error adding polygons:", error);
    }
  };

  const resizeMap = () => {
    try {
      if (map) {
        // Use Leaflet's built-in method to handle container size changes
        map.invalidateSize();
      }
    } catch (error) {
      console.warn("Error resizing map:", error);
    }
  };

  watch(() => content, initializeMap, { deep: true });

  watch(
    () => mapContainer,
    (value) => {
      if (value) initializeMap();
    },
    { immediate: true }
  );

  return { map, resizeMap };
}
