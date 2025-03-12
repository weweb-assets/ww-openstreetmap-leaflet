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

const polygonFieldConfigs = [
  { field: "polygonDataField" },
  { field: "polygons_strokeField" },
  { field: "polygons_colorField" },
  { field: "polygons_weightField" },
  { field: "polygons_opacityField" },
  { field: "polygons_lineCapField" },
  { field: "polygons_lineJoinField" },
  { field: "polygons_dashArrayField" },
  { field: "polygons_dashOffsetField" },
  { field: "polygons_fillField" },
  { field: "polygons_fillColorField" },
  { field: "polygons_fillOpacityField" },
  { field: "polygons_fillRuleField" },
  { field: "polygons_tooltipContentField" },
  { field: "polygons_tooltipDirectionField" },
  { field: "polygons_tooltipPermanentField" },
];

const geoJSONFieldConfigs = [
  { field: "geoJSONsDataField" },
  { field: "geoJSONs_strokeField" },
  { field: "geoJSONs_colorField" },
  { field: "geoJSONs_weightField" },
  { field: "geoJSONs_opacityField" },
  { field: "geoJSONs_lineCapField" },
  { field: "geoJSONs_lineJoinField" },
  { field: "geoJSONs_dashArrayField" },
  { field: "geoJSONs_dashOffsetField" },
  { field: "geoJSONs_fillField" },
  { field: "geoJSONs_fillColorField" },
  { field: "geoJSONs_fillOpacityField" },
  { field: "geoJSONs_fillRuleField" },
  { field: "geoJSONs_tooltipContentField" },
  { field: "geoJSONs_tooltipDirectionField" },
  { field: "geoJSONs_tooltipPermanentField" },
];

export const markerFields = (content, markerData) => {
  return resolveFields(content, markerData, markerFieldConfigs);
};

export const circleFields = (content, circleData) => {
  return resolveFields(content, circleData, circleFieldConfigs);
};

export const polygonFields = (content, polygonData) => {
  return resolveFields(content, polygonData, polygonFieldConfigs);
};

export const geoJSONFields = (content, geoJSONData) => {
  return resolveFields(content, geoJSONData, geoJSONFieldConfigs);
};
