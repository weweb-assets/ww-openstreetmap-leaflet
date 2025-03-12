import { ref, watch } from "vue";
import L from "../leaflet";
import _L from "leaflet";
import "leaflet-providers";

import default_iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import default_iconUrl from "leaflet/dist/images/marker-icon.png";
import default_shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { markerFields, circleFields } from "./fields.js";

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
      });

      const tileLayer = _L.tileLayer.provider(content.tileLayer);

      tileLayer.on("tileerror", (error) => {
        console.error("Tile loading error:", error);
      });

      tileLayer.addTo(map);

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

      addMarkers();
      addCircles();
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
