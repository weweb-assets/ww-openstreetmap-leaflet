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
        "tooltipContentField",
        "tooltipDirectionField",
        "tooltipPermanentField",
      ],
      ["circleTitle", "circles"],
      ["polygonTitle", "polygons"],
      ["rectangleTitle", "rectangles"],
      ["polylineTitle", "polylines"],
      ["geoJSONTitle", "geoJSONs"],
    ],
  },
  actions: [{ label: "Get countries GeoJSON", action: "getCountriesGEOJSON" }],
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
