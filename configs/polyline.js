import basePath from "./basePath";

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
      en: "Polyline Vector",
    },
    editorOnly: true,
  },
  polyline: {
    label: "Polyline",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Polyline data",
              type: "Array",
              bindable: true,
              defaultValue: [],
            },
            ...polyline,
          },
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
};
