export const createElement = (tagName, attributesObj) => {
  const elem = document.createElement(tagName);

  Object.assign(elem, attributesObj);

  return elem;
};

export const getLocalStorageCartItems = () =>
  JSON.parse(localStorage.getItem('cartItems') || '[]');

export const updateLocalStorageCartItem = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
