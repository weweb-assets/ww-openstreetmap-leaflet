export const markerFields = (content, markerData) => {
  const markerDataField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.markerDataField
  );

  const markerIconUrlField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.markerIconUrlField
  );

  const markerIconWidthField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.markerIconWidthField
  );

  const markerIconHeightField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.markerIconHeightField
  );

  const tooltipContentField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.tooltipContentField
  );

  const tooltipDirectionField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.tooltipDirectionField
  );

  const tooltipPermanentField = wwLib.resolveObjectPropertyPath(
    markerData,
    content.tooltipPermanentField
  );

  return {
    markerDataField,
    markerIconUrlField,
    markerIconWidthField,
    markerIconHeightField,
    tooltipContentField,
    tooltipDirectionField,
    tooltipPermanentField,
  };
};
