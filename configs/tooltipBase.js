import { getOptions } from "./common";

export const tooltipConfig = {
  tooltip: {
    label: { en: "Tooltip" },
    type: "OnOff",
    bindable: true,
    defaultValue: false,
    /* wwEditor:start */
    bindingValidation: {
      type: "boolean",
      tooltip: "A boolean that controls tooltip visibility: `true` or `false`",
    },
    /* wwEditor:end */
  },
  tooltipContent: {
    label: { en: "Tooltip content" },
    type: "Textarea",
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return !specific__array.item || !specific__array.item.tooltip;
    },
    defaultValue: "",
    responsive: true,
    bindable: true,
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip:
        'A string that defines the tooltip content: `"<b>Hello world!</b><br>I am a tooltip"`',
    },
    /* wwEditor:end */
  },
  tooltipDirection: {
    label: { en: "Tooltip direction" },
    type: "TextSelect",
    options: {
      options: [
        { value: "auto", label: { en: "Auto" } },
        { value: "top", label: { en: "Top" } },
        { value: "bottom", label: { en: "Bottom" } },
        { value: "right", label: { en: "Right" } },
        { value: "left", label: { en: "Left" } },
      ],
    },
    bindable: true,
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return !specific__array.item || !specific__array.item.tooltip;
    },
    defaultValue: "auto",
    /* wwEditor:start */
    bindingValidation: {
      type: "string",
      tooltip:
        'A string that defines the tooltip direction: `"auto"`, `"top"`, `"bottom"`, `"right"`, or `"left"`',
    },
    /* wwEditor:end */
  },
  tooltipPermanent: {
    label: { en: "Permanent" },
    type: "OnOff",
    bindable: true,
    hidden: (
      content,
      sidepanelContent,
      boundProperties,
      wwProps_,
      specific__array
    ) => {
      return !specific__array.item || !specific__array.item.tooltip;
    },
    defaultValue: false,
    /* wwEditor:start */
    bindingValidation: {
      type: "boolean",
      tooltip: "A boolean that controls tooltip permanence: `true` or `false`",
    },
    /* wwEditor:end */
  },
};

export const tooltipDefaultValues = {
  tooltip: false,
  tooltipContent: "<b>Hello world!</b><br>I am a tooltip",
  tooltipDirection: "auto",
  tooltipPermanent: false,
};

export const tooltipObjectPropertyPath = (propertyName) => ({
  [propertyName + "_tooltipContentField"]: {
    label: { en: "Tooltip content field" },
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => getOptions(content, propertyName),
    defaultValue: "",
    section: "settings",
  },
  [propertyName + "_tooltipDirectionField"]: {
    label: { en: "Tooltip direction field" },
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps[propertyName] || !content[propertyName],
    options: (content) => getOptions(content, propertyName),
    defaultValue: "auto",
    section: "settings",
  },
  [propertyName + "_tooltipPermanentField"]: {
    label: { en: "Permanent field" },
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps[propertyName] || !content[propertyName],
    options: (content) => getOptions(content, propertyName),
    defaultValue: false,
    section: "settings",
  },
});
