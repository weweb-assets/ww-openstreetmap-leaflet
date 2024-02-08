export default {
  markerTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Marker",
    },
    editorOnly: true,
  },
  marker: {
    label: "Marker",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Marker data",
              type: "LatLng",
              bindable: true,
              defaultValue: [2.333333, 48.866667],
            },
            customIcon: {
              label: { en: "Custom marker" },
              type: "OnOff",
              defaultValue: false,
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
            },
          },
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
};
