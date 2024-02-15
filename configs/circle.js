import { basePath, basePathObjectPropertyPath } from "./basePath";
import { tooltipConfig, tooltipDefaultValues } from "./tooltipBase";

const CIRCLE_DATA_HELP = `The circle data is an array of LatLng: <br><br> \`[37, -109.05]\` <br><br>
Examples can be found in the <a href="https://leafletjs.com/reference.html#circle" target="_blank">Leaflet documentation</a>.`;

const circle = {
  ...basePath,
  radius: {
    label: { en: "Radius" },
    bindable: true,
    type: "Number",
    defaultValue: 5000, // Default radius in meters
    options: {
      min: 0,
      step: 1,
    },
  },
  // Add other circle-specific configurations here
};

export default {
  circleTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Circle",
    },
    editorOnly: true,
  },
  circles: {
    label: "Circles",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Circle data",
              type: "Info",
              bindable: true,
              defaultValue: [],
              propertyHelp: {
                tooltip: CIRCLE_DATA_HELP,
              },
            },
            ...circle,
            ...tooltipConfig,
          },
        },
        defaultValue: {
          data: [46.603354, 1.888334],
          stroke: true,
          color: "#3388ff",
          weight: 3,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
          dashArray: null,
          dashOffset: null,
          full: true,
          fillColor: "#3388ff",
          fillOpacity: 0.2,
          fillRule: "evenodd",
          radius: 50000,
          ...tooltipDefaultValues,
        },
      },
      expandable: true,
    },
    defaultValue: [],
    bindable: true,
  },
};
