import {
  tooltipConfig,
  tooltipDefaultValues,
  tooltipObjectPropertyPath,
} from "./tooltipBase";

const MARKER_DATA_HELP = `The marker data is an array of LatLng: \`[37, -109.05]\``;

export default {
  markerTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Marker",
    },
    editorOnly: true,
  },
  markers: {
    label: "Markers",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Marker data",
              type: "Info",
              bindable: true,
              propertyHelp: {
                tooltip: MARKER_DATA_HELP,
              },
              defaultValue: [2.333333, 48.866667],
            },
            customIcon: {
              label: { en: "Custom marker" },
              type: "OnOff",
              defaultValue: false,
              bindable: true,
              propertyHelp: `See icon documentation here: https://leafletjs.com/reference.html#icon`,
            },
            iconUrl: {
              label: { en: "Marker image" },
              bindable: true,
              type: "Image",
              hidden: (
                content,
                sidepanelContent,
                boundProperties,
                wwProps_,
                specific__array
              ) => {
                return specific__array.item && !specific__array.item.customIcon;
              },
            },
            iconWidth: {
              type: "Length",
              label: {
                en: "Width",
              },
              options: {
                unitChoices: [{ value: "px", label: "px", min: 1, max: 1000 }],
              },
              defaultValue: "32",
              hidden: (
                content,
                sidepanelContent,
                boundProperties,
                wwProps_,
                specific__array
              ) => {
                return specific__array.item && !specific__array.item.customIcon;
              },
              responsive: true,
              bindable: true,
            },
            iconHeight: {
              type: "Length",
              label: {
                en: "Height",
              },
              options: {
                unitChoices: [{ value: "px", label: "px", min: 1, max: 1000 }],
              },
              defaultValue: "32",
              hidden: (
                content,
                sidepanelContent,
                boundProperties,
                wwProps_,
                specific__array
              ) => {
                return specific__array.item && !specific__array.item.customIcon;
              },
              responsive: true,
              bindable: true,
            },
            ...tooltipConfig,
          },
        },
        defaultValue: {
          data: [46.603354, 1.888334],
          customIcon: false,
          iconUrl: "https://placehold.co/400x400/png",
          iconWidth: "32",
          iconHeight: "32",
          tooltip: false,
          tooltipContent: "<b>Hello world!</b><br>I am a tooltip",
          tooltipDirection: "auto",
          tooltipPermanent: false,
          ...tooltipDefaultValues,
        },
      },
      expandable: true,
    },
    defaultValue: [],
    bindable: true,
  },
  markerDataField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.markers || !content.markers,
    label: {
      en: "Data field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    propertyHelp: {
      tooltip: MARKER_DATA_HELP,
    },
    options: (content) => {
      if (!content.markers.length || typeof content.markers[0] !== "object") {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  markerIconUrlField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.markers || !content.markers,
    label: {
      en: "Icon URL field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (!content.markers.length || typeof content.markers[0] !== "object") {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  markerIconWidthField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.markers || !content.markers,
    label: {
      en: "Icon width field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (!content.markers.length || typeof content.markers[0] !== "object") {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  markerIconHeightField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.markers || !content.markers,
    label: {
      en: "Icon height field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (!content.markers.length || typeof content.markers[0] !== "object") {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  ...tooltipObjectPropertyPath("markers"),
};
