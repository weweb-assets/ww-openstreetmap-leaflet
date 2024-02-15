import basePath from "./basePath";
import { tooltipConfig, tooltipDefaultValues } from "./tooltipBase";

const RECTANGLE_DATA_HELP = `The rectangle data is defined by an array of rectangle geographical bounds: <br><br> \`[[54.559322, -5.767822], [56.1210604, -3.021240]]\`. <br><br>
Examples can be found in the <a href="https://leafletjs.com/reference.html#rectangle" target="_blank">Leaflet documentation</a>.`;

const rectangle = {
  ...basePath,
  // Rectangle-specific configurations here if needed
  // Since Rectangle extends Polygon, most options will be the same
};

export default {
  rectangleTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Rectangle",
    },
    editorOnly: true,
  },
  rectangles: {
    label: "Rectangles",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Rectangle data",
              type: "Info",
              bindable: true,
              propertyHelp: {
                tooltip: RECTANGLE_DATA_HELP,
              },
              defaultValue: [],
            },
            ...rectangle,
            ...tooltipConfig,
          },
        },
        defaultValue: {
          data: [
            [54.559322, -5.767822],
            [56.1210604, -3.02124],
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
    },
    defaultValue: [],
    bindable: true,
  },
};
