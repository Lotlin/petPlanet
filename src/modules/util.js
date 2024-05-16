export const createElement = (tagName, attributesObj) => {
  const elem = document.createElement(tagName);

  Object.assign(elem, attributesObj);

  return elem;
};
