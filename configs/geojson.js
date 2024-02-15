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
  geoJSONs: {
    label: "goeJSONs",
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
              options: {
                fixed: true,
              },
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
