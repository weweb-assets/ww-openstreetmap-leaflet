import basePath from "./basePath";

export default {
  geoJSONTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "GeoJSON Layer",
    },
    editorOnly: true,
  },
  geoJSON: {
    label: "goeJSON",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "GeoJSON data",
              type: "Array",
              bindable: true,
              defaultValue: [],
            },
            ...basePath,
          },
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
};
