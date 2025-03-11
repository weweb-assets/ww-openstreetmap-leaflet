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

const rectangleFieldConfigs = [
  { field: "rectangleDataField" },
  { field: "rectangles_strokeField" },
  { field: "rectangles_colorField" },
  { field: "rectangles_weightField" },
  { field: "rectangles_opacityField" },
  { field: "rectangles_lineCapField" },
  { field: "rectangles_lineJoinField" },
  { field: "rectangles_dashArrayField" },
  { field: "rectangles_dashOffsetField" },
  { field: "rectangles_fillField" },
  { field: "rectangles_fillColorField" },
  { field: "rectangles_fillOpacityField" },
  { field: "rectangles_fillRuleField" },
  { field: "rectangles_tooltipContentField" },
  { field: "rectangles_tooltipDirectionField" },
  { field: "rectangles_tooltipPermanentField" },
];

const polylineFieldConfigs = [
  { field: "polylineDataField" },
  { field: "smoothFactorField" },
  { field: "noClipField" },
  { field: "polylines_strokeField" },
  { field: "polylines_colorField" },
  { field: "polylines_weightField" },
  { field: "polylines_opacityField" },
  { field: "polylines_lineCapField" },
  { field: "polylines_lineJoinField" },
  { field: "polylines_dashArrayField" },
  { field: "polylines_dashOffsetField" },
  { field: "polylines_fillField" },
  { field: "polylines_fillColorField" },
  { field: "polylines_fillOpacityField" },
  { field: "polylines_fillRuleField" },
  { field: "polylines_tooltipContentField" },
  { field: "polylines_tooltipDirectionField" },
  { field: "polylines_tooltipPermanentField" },
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

export const rectangleFields = (content, rectangleData) => {
  return resolveFields(content, rectangleData, rectangleFieldConfigs);
};

export const polylineFields = (content, polylineData) => {
  return resolveFields(content, polylineData, polylineFieldConfigs);
};

export const geoJSONFields = (content, geoJSONData) => {
  return resolveFields(content, geoJSONData, geoJSONFieldConfigs);
};
