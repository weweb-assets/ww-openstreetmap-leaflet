export default {
  stroke: {
    label: { en: "Stroke" },
    bindable: true,
    type: "OnOff",
    defaultValue: true,
  },
  color: {
    label: { en: "Color" },
    bindable: true,
    type: "Color",
    defaultValue: "#3388ff",
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
  },
  weight: {
    label: { en: "Weight" },
    bindable: true,
    type: "Number",
    defaultValue: 3,
  },
  opacity: {
    label: { en: "Opacity" },
    bindable: true,
    type: "Number",
    defaultValue: 1,
    options: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  lineCap: {
    label: { en: "Line Cap" },
    bindable: true,
    type: "TextSelect",
    options: {
      options: [
        { value: "butt", label: { en: "Butt" } },
        { value: "round", label: { en: "Round" }, default: true },
        { value: "square", label: { en: "Square" } },
      ],
    },
    defaultValue: "round",
  },
  lineJoin: {
    label: { en: "Line Join" },
    bindable: true,
    type: "TextSelect",
    options: {
      options: [
        { value: "miter", label: { en: "Miter" } },
        { value: "round", label: { en: "Round" }, default: true },
        { value: "bevel", label: { en: "Bevel" } },
      ],
    },
    defaultValue: "round",
  },
  dashArray: {
    label: { en: "Dash Array" },
    bindable: true,
    type: "Text",
    defaultValue: null,
  },
  dashOffset: {
    label: { en: "Dash Offset" },
    bindable: true,
    type: "Text",
    defaultValue: null,
  },
  fill: {
    label: { en: "Fill" },
    bindable: true,
    type: "OnOff",
    defaultValue: true,
  },
  fillColor: {
    label: { en: "Fill Color" },
    bindable: true,
    type: "Color",
    defaultValue: "#3388ff",
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.fill;
    },
  },
  fillOpacity: {
    label: { en: "Fill Opacity" },
    bindable: true,
    type: "Number",
    defaultValue: 0.3,
    options: {
      min: 0,
      max: 1,
      step: 0.1,
    },
  },
  fillRule: {
    label: { en: "Fill Rule" },
    bindable: true,
    type: "TextSelect",
    options: {
      options: [
        { value: "nonzero", label: { en: "Nonzero" } },
        { value: "evenodd", label: { en: "Evenodd" }, default: true },
      ],
    },
    defaultValue: "evenodd",
  },
};
