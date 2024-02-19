export const getOptions = (content, propertyName) => {
  if (
    !content[propertyName].length ||
    typeof content[propertyName][0] !== "object"
  ) {
    return null;
  }

  return { object: content[propertyName][0] };
};
