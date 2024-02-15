export const tooltipConfig = {
  tooltip: {
    label: { en: "Tooltip" },
    type: "OnOff",
    bindable: true,
    defaultValue: false,
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
  },
};

export const tooltipDefaultValues = {
  tooltip: false,
  tooltipContent: "<b>Hello world!</b><br>I am a tooltip",
  tooltipDirection: "auto",
  tooltipPermanent: false,
};

export const tooltipObjectPropertyPath = (propertyName) => ({
  tooltipContentField: {
    label: { en: "Tooltip content field" },
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) => {
      return !boundProps[propertyName] || !content[propertyName];
    },
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content[propertyName][0] };
    },
    defaultValue: "",
    section: "settings",
  },
  tooltipDirectionField: {
    label: { en: "Tooltip direction field" },
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps[propertyName] || !content[propertyName],
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content[propertyName][0] };
    },
    defaultValue: "auto",
    section: "settings",
  },
  tooltipPermanentField: {
    label: { en: "Permanent field" },
    type: "ObjectPropertyPath",
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps[propertyName] || !content[propertyName],
    options: (content) => {
      if (
        !content[propertyName].length ||
        typeof content[propertyName][0] !== "object"
      ) {
        return null;
      }

      return { object: content[propertyName][0] };
    },
    defaultValue: false,
    section: "settings",
  },
});
