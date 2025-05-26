import { getOptions } from "./common";

export const basePath = {
  stroke: {
    label: { en: "Stroke" },
    bindable: true,
    type: "OnOff",
    defaultValue: true,
    /* wwEditor:start */
    bindingValidation: {
      type: "boolean",
      tooltip: "A boolean that controls stroke visibility: `true` or `false`",
    },
    /* wwEditor:end */
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
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip: 'A string that defines the stroke color: `"#3388ff"`',
    },
    /* wwEditor:end */
  },
  weight: {
    label: { en: "Weight" },
    bindable: true,
    type: "Number",
    defaultValue: 3,
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "number",
      tooltip: "A number that defines the stroke weight: `3`",
    },
    /* wwEditor:end */
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
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "number",
      tooltip: "A number that defines the stroke opacity (0-1): `1`",
    },
    /* wwEditor:end */
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
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip:
        'A string that defines the line cap style: `"butt"`, `"round"`, or `"square"`',
    },
    /* wwEditor:end */
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
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip:
        'A string that defines the line join style: `"miter"`, `"round"`, or `"bevel"`',
    },
    /* wwEditor:end */
  },
  dashArray: {
    label: { en: "Dash Array" },
    bindable: true,
    type: "Text",
    defaultValue: null,
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip:
        'A string that defines the dash array pattern: `"5,10"` or `null`',
    },
    /* wwEditor:end */
  },
  dashOffset: {
    label: { en: "Dash Offset" },
    bindable: true,
    type: "Text",
    defaultValue: null,
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.stroke;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip: 'A string that defines the dash offset: `"5"` or `null`',
    },
    /* wwEditor:end */
  },
  fill: {
    label: { en: "Fill" },
    bindable: true,
    type: "OnOff",
    defaultValue: true,
    /* wwEditor:start */
    bindingValidation: {
      type: "boolean",
      tooltip: "A boolean that controls fill visibility: `true` or `false`",
    },
    /* wwEditor:end */
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
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip: 'A string that defines the fill color: `"#3388ff"`',
    },
    /* wwEditor:end */
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
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.fill;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "number",
      tooltip: "A number that defines the fill opacity (0-1): `0.3`",
    },
    /* wwEditor:end */
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
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return specific__array.item && !specific__array.item.fill;
    },
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip:
        'A string that defines the fill rule: `"nonzero"` or `"evenodd"`',
    },
    /* wwEditor:end */
  },
};

export const basePathObjectPropertyPath = (propertyName) => ({
  [propertyName + "_strokeField"]: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps[propertyName] || !content[propertyName],
    label: {
      en: "Stroke field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_colorField"]: {
    label: {
      en: "Color field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_weightField"]: {
    label: {
      en: "Weight field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_opacityField"]: {
    label: {
      en: "Opacity field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_lineCapField"]: {
    label: {
      en: "Line Cap field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_lineJoinField"]: {
    label: {
      en: "Line Join field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_dashArrayField"]: {
    label: {
      en: "Dash Array field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_dashOffsetField"]: {
    label: {
      en: "Dash Offset field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_fillField"]: {
    label: {
      en: "Fill field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_fillColorField"]: {
    label: {
      en: "Fill Color field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_fillOpacityField"]: {
    label: {
      en: "Fill Opacity field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
  [propertyName + "_fillRuleField"]: {
    label: {
      en: "Fill Rule field",
    },
    section: "settings",
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: null,
  },
});
