import basePath from "./basePath";
import { tooltipConfig, tooltipDefaultValues } from "./tooltipBase";

const POLYGON_DATA_HELP = `The polygon data is an array of arrays of latlngs: <br><br> \`[[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]]\`. <br><br>
Examples can be found in the <a href="https://leafletjs.com/reference.html#polygon" target="_blank">Leaflet documentation</a>.`;

const polygon = {
  ...basePath,
  // Other polygon-specific configurations here if needed
};

export default {
  polygonTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Polygon",
    },
    editorOnly: true,
  },
  polygons: {
    label: "Polygons",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Polygon data",
              type: "Info",
              bindable: true,
              defaultValue: [],
              propertyHelp: {
                tooltip: POLYGON_DATA_HELP,
              },
            },
            ...polygon,
            ...tooltipConfig,
          },
        },
        defaultValue: {
          data: [
            [37, -109.05],
            [41, -109.03],
            [41, -102.05],
            [37, -102.04],
          ],
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
          ...tooltipDefaultValues,
        },
      },
      expandable: true,
    },
    defaultValue: [],
    bindable: true,
  },
};
