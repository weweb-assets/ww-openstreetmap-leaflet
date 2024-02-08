import basePath from "./basePath";

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
      en: "Rectangle Vector",
    },
    editorOnly: true,
  },
  rectangle: {
    label: "Rectangle",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "Rectangle data",
              type: "LatLngBounds",
              bindable: true,
              defaultValue: [
                [54.559322, -5.767822],
                [56.1210604, -3.02124],
              ],
            },
            ...rectangle,
          },
        },
      },
    },
    defaultValue: [],
    bindable: true,
  },
};
