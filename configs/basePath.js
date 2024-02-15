export const basePath = {
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

export const basePathObjectPropertyPath = (propertyName) => ({
  strokeField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.stroke || !content.stroke,
    label: {
      en: "Stroke field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  colorField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.color || !content.color,
    label: {
      en: "Color field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  weightField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.weight || !content.weight,
    label: {
      en: "Weight field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  opacityField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.opacity || !content.opacity,
    label: {
      en: "Opacity field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  lineCapField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.lineCap || !content.lineCap,
    label: {
      en: "Line Cap field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  lineJoinField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.lineJoin || !content.lineJoin,
    label: {
      en: "Line Join field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  dashArrayField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.dashArray || !content.dashArray,
    label: {
      en: "Dash Array field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  dashOffsetField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.dashOffset || !content.dashOffset,
    label: {
      en: "Dash Offset field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  fillField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.fill || !content.fill,
    label: {
      en: "Fill field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  fillColorField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.fillColor || !content.fillColor,
    label: {
      en: "Fill Color field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  fillOpacityField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.fillOpacity || !content.fillOpacity,
    label: {
      en: "Fill Opacity field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
  fillRuleField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.fillRule || !content.fillRule,
    label: {
      en: "Fill Rule field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content.markers[0] };
    },
    defaultValue: null,
  },
});
