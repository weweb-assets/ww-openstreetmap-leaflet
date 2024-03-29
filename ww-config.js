import geoJSON from "./configs/geojson";
import polyline from "./configs/polyline";
import polygon from "./configs/polygon";
import rectangle from "./configs/rectangle";
import circle from "./configs/circle";
import marker from "./configs/marker";

export default {
  editor: {
    label: {
      en: "Leaflet",
    },
    icon: "map",
    customSettingsPropertiesOrder: [
      "tileLayer",
      "providerConfiguration",
      ["lat", "lng", "zoom"],
      ["zoomControl", "attributionControl"],
      [
        "markerTitle",
        "markers",
        "markerDataField",
        "markerIconUrlField",
        "markerIconWidthField",
        "markerIconHeightField",
        "markers_tooltipContentField",
        "markers_tooltipDirectionField",
        "markers_tooltipPermanentField",
      ],
      [
        "circleTitle",
        "circles",
        "circleDataField",
        "circleRadiusField",
        "circles_strokeField",
        "circles_colorField",
        "circles_weightField",
        "circles_opacityField",
        "circles_lineCapField",
        "circles_lineJoinField",
        "circles_dashArrayField",
        "circles_dashOffsetField",
        "circles_fillField",
        "circles_fillColorField",
        "circles_fillOpacityField",
        "circles_fillRuleField",
        "circles_tooltipContentField",
        "circles_tooltipDirectionField",
        "circles_tooltipPermanentField",
      ],
      [
        "polygonTitle",
        "polygons",
        "polygonDataField",
        "polygons_strokeField",
        "polygons_colorField",
        "polygons_weightField",
        "polygons_opacityField",
        "polygons_lineCapField",
        "polygons_lineJoinField",
        "polygons_dashArrayField",
        "polygons_dashOffsetField",
        "polygons_fillField",
        "polygons_fillColorField",
        "polygons_fillOpacityField",
        "polygons_fillRuleField",
        "polygons_tooltipContentField",
        "polygons_tooltipDirectionField",
        "polygons_tooltipPermanentField",
      ],
      [
        "rectangleTitle",
        "rectangles",
        "rectangleDataField",
        "rectangles_strokeField",
        "rectangles_colorField",
        "rectangles_weightField",
        "rectangles_opacityField",
        "rectangles_lineCapField",
        "rectangles_lineJoinField",
        "rectangles_dashArrayField",
        "rectangles_dashOffsetField",
        "rectangles_fillField",
        "rectangles_fillColorField",
        "rectangles_fillOpacityField",
        "rectangles_fillRuleField",
        "rectangles_tooltipContentField",
        "rectangles_tooltipDirectionField",
        "rectangles_tooltipPermanentField",
      ],
      [
        "polylineTitle",
        "polylines",
        "polylineDataField",
        "smoothFactorField",
        "noClipField",
        "polylines_strokeField",
        "polylines_colorField",
        "polylines_weightField",
        "polylines_opacityField",
        "polylines_lineCapField",
        "polylines_lineJoinField",
        "polylines_dashArrayField",
        "polylines_dashOffsetField",
        "polylines_fillField",
        "polylines_fillColorField",
        "polylines_fillOpacityField",
        "polylines_fillRuleField",
        "polylines_tooltipContentField",
        "polylines_tooltipDirectionField",
        "polylines_tooltipPermanentField",
      ],
      [
        "geoJSONTitle",
        "geoJSONs",
        "geoJSONDataField",
        "geoJSONs_strokeField",
        "geoJSONs_colorField",
        "geoJSONs_weightField",
        "geoJSONs_opacityField",
        "geoJSONs_lineCapField",
        "geoJSONs_lineJoinField",
        "geoJSONs_dashArrayField",
        "geoJSONs_dashOffsetField",
        "geoJSONs_fillField",
        "geoJSONs_fillColorField",
        "geoJSONs_fillOpacityField",
        "geoJSONs_fillRuleField",
        "geoJSONs_TooltipContentField",
        "geoJSONs_TooltipDirectionField",
        "geoJSONs_TooltipPermanentField",
      ],
    ],
  },
  properties: {
    tileLayer: {
      label: {
        en: "Tile layer",
      },
      type: "Text",
      bindable: true,
      section: "settings",
      defaultValue: "OpenStreetMap.Mapnik",
      /* wwEditor:start */
      bindingValidation: {
        validations: [
          {
            type: "string",
          },
        ],
        tooltip:
          "A providers name: `<a href='https://leaflet-extras.github.io/leaflet-providers/preview/'>https://leaflet-extras.github.io/leaflet-providers/preview/</a>`",
      },
      /* wwEditor:end */
    },
    providerConfiguration: {
      label: {
        en: "Provider configuration",
      },
      type: "Script",
      bindable: true,
      section: "settings",
      defaultValue: "{}",
      /* wwEditor:start */
      bindingValidation: {
        validations: [
          {
            type: "string",
          },
        ],
        tooltip:
          "A providers configuration: `<a href='https://github.com/leaflet-extras/leaflet-providers#providers-requiring-registration'>https://github.com/leaflet-extras/leaflet-providers#providers-requiring-registration</a>`",
      },
      /* wwEditor:end */
    },
    lat: {
      section: "settings",
      label: { en: "Latitude origin", fr: "Origine - Latitude" },
      type: "Text",
      options: {
        placeholder: "Latitude",
      },
      defaultValue: "46.603354",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: 'A string that defines the latitue: `"40.712784"`',
      },
      /* wwEditor:end */
    },
    lng: {
      section: "settings",
      label: { en: "Longitude origin", fr: "Origine - Longitude" },
      type: "Text",
      options: {
        placeholder: "Longitude",
      },
      defaultValue: "1.888334",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: 'A string that defines the longitude: `"15.347554"`',
      },
      /* wwEditor:end */
    },
    zoom: {
      section: "settings",
      type: "Number",
      label: { en: "Zoom", fr: "Zoom" },
      options: {
        min: 0,
        max: 20,
        step: 1,
      },
      defaultValue: 4,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "A number that defines the zoom: `11`",
      },
      /* wwEditor:end */
    },
    zoomControl: {
      label: { en: "Zoom control" },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    attributionControl: {
      label: { en: "Show attribution" },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    ...marker,
    ...geoJSON,
    ...polyline,
    ...polygon,
    ...rectangle,
    ...circle,
  },
};
