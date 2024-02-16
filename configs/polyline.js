import { basePath, basePathObjectPropertyPath } from "./basePath";
import {
  tooltipConfig,
  tooltipDefaultValues,
  tooltipObjectPropertyPath,
} from "./tooltipBase";

const POLYLINE_DATA_HELP = `The polyline data is defined by an array of LatLng points: <br><br> \`[
  [45.51, -122.68],
  [37.77, -122.43],
  [34.04, -118.2]
]\`. <br><br>
Examples can be found in the <a href="https://leafletjs.com/reference.html#polyline" target="_blank">Leaflet documentation</a>.`;

const polyline = {
  ...basePath,
  smoothFactor: {
    label: { en: "Smooth Factor" },
    bindable: true,
    type: "Number",
    defaultValue: 1.0,
  },
  noClip: {
    label: { en: "No Clip" },
    bindable: true,
    type: "OnOff",
    defaultValue: false,
  },
};

export default {
  polylineTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Polyline",
    },
    editorOnly: true,
  },
  polylines: {
    label: "Polylines",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Polyline data",
              type: "Info",
              bindable: true,
              propertyHelp: {
                tooltip: POLYLINE_DATA_HELP,
              },
              defaultValue: [],
            },
            ...polyline,
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
          smoothFactor: 1.0,
          noClip: false,
          ...tooltipDefaultValues,
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
  polylineDataField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.polylines || !content.polylines,
    label: {
      en: "Polyline data field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    propertyHelp: {
      tooltip: POLYLINE_DATA_HELP,
    },
    options: (content) => {
      if (
        !content.polylines.length ||
        typeof content.polylines[0] !== "object"
      ) {
        return null;
      }

      return { object: content.polylines[0] };
    },
    defaultValue: null,
  },
  smoothFactorField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.polylines || !content.polylines,
    label: {
      en: "Smooth factor field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content.polylines.length ||
        typeof content.polylines[0] !== "object"
      ) {
        return null;
      }

      return { object: content.polylines[0] };
    },
    defaultValue: null,
  },
  noClipField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.polylines || !content.polylines,
    label: {
      en: "No clip field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content.polylines.length ||
        typeof content.polylines[0] !== "object"
      ) {
        return null;
      }

      return { object: content.polylines[0] };
    },
    defaultValue: null,
  },
  ...basePathObjectPropertyPath("polylines"),
  ...tooltipObjectPropertyPath("polylines"),
};
