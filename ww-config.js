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
      ["markerTitle", "markers"],
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
    circles: {
      label: { en: "Circles", fr: "Circles" },
      type: "Array",
      section: "settings",
      options: {
        item: {
          type: "Object",
          defaultValue: { label: { en: "New circle" }, value: "" },
          options: {
            item: {
              x: {
                type: "Number",
                label: {
                  en: "Coordinate X",
                },
                options: {
                  step: 1,
                },
                bindable: true,
              },
              y: {
                type: "Number",
                label: {
                  en: "Coordinate Y",
                },
                options: {
                  step: 1,
                },
                bindable: true,
              },
              radius: {
                type: "Number",
                label: {
                  en: "Radius",
                },
                options: {
                  step: 1,
                },
                bindable: true,
                defaultValue: 1000,
              },
              strokeWeight: {
                type: "Number",
                label: {
                  en: "Stroke weight",
                },
                options: {
                  step: 1,
                },
                bindable: true,
                defaultValue: 1,
              },
              strokeColor: {
                label: "Stroke color",
                type: "Color",
                bindable: true,
                defaultValue: "#099AF2",
              },
              fillColor: {
                label: "Fill color",
                type: "Color",
                bindable: true,
                defaultValue: "#099AF230",
              },
              tooltipContent: {
                // hidden: () => !props.tooltip,
                label: { en: "Tooltip content" },
                type: "Text",
                options: {
                  placeholder: "HTML content",
                },
                bindable: true,
              },
            },
          },
        },
      },
      bindable: true,
    },
    xField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "X field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    yField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "Y field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    radiusField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "Radius field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    strokeWeightField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "Stroke weight field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    strokeColorField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "Stroke color field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    fillColorField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "Fill color field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    tooltipContentField: {
      hidden: (content, _, boundProps) =>
        !boundProps.circles || !content.circles,
      label: {
        en: "Tooltip content field",
      },
      type: "ObjectPropertyPath",
      options: (content) => {
        if (!content.circles.length || typeof content.circles[0] !== "object") {
          return null;
        }

        return { object: content.circles[0] };
      },
      defaultValue: "",
      section: "settings",
    },
    ...marker,
    ...geoJSON,
    ...polyline,
    ...polygon,
    ...rectangle,
    ...circle,
  },
};
