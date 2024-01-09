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
              defaultValue: [0, 0],
            },
            iconUrl: {
              label: { en: "Custom icon" },
              bindable: true,
              type: "Image",
              defaultValue: "default-icon.png",
            },
          },
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
};
