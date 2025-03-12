const resolveFields = (content, data, fieldConfigs) => {
  const result = {};

  fieldConfigs.forEach((fieldConfig) => {
    const { field, contentField } = fieldConfig;
    result[field] = wwLib.resolveObjectPropertyPath(
      data,
      content[contentField || field]
    );
  });

  return result;
};

const markerFieldConfigs = [
  { field: "markerDataField" },
  { field: "markerIconUrlField" },
  { field: "markerIconWidthField" },
  { field: "markerIconHeightField" },
  { field: "markers_tooltipContentField" },
  { field: "markers_tooltipDirectionField" },
  { field: "markers_tooltipPermanentField" },
];

const circleFieldConfigs = [
  { field: "circleDataField" },
  { field: "circleRadiusField" },
  { field: "circles_strokeField" },
  { field: "circles_colorField" },
  { field: "circles_weightField" },
  { field: "circles_opacityField" },
  { field: "circles_lineCapField" },
  { field: "circles_lineJoinField" },
  { field: "circles_dashArrayField" },
  { field: "circles_dashOffsetField" },
  { field: "circles_fillField" },
  { field: "circles_fillColorField" },
  { field: "circles_fillOpacityField" },
  { field: "circles_fillRuleField" },
  { field: "circles_tooltipContentField" },
  { field: "circles_tooltipDirectionField" },
  { field: "circles_tooltipPermanentField" },
];

export const markerFields = (content, markerData) => {
  return resolveFields(content, markerData, markerFieldConfigs);
};

export const circleFields = (content, circleData) => {
  return resolveFields(content, circleData, circleFieldConfigs);
};
