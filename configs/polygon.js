import basePath from "./basePath";

const polygon = {
  ...basePath,
  // Other polygon-specific configurations here if needed
};

export default {
  polygonTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "Polygon Vector",
    },
    editorOnly: true,
  },
  polygon: {
    label: "Polygon",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Polygon data",
              type: "Array",
              bindable: true,
              defaultValue: [],
              options: {
                item: {
                  type: "Array",
                  options: {
                    item: {
                      type: "LatLng",
                    },
                  },
                },
              },
            },
            ...polygon,
          },
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
};
