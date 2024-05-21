export const createElement = (tagName, attributesObj) => {
  const elem = document.createElement(tagName);

  Object.assign(elem, attributesObj);

  return elem;
};

export const getLocalStorageCartItems = () =>
  JSON.parse(localStorage.getItem('cartItems') || '[]');

export const isProductInCart = (cartItems, productId) =>
  cartItems.find((item) => item.id === productId);

export const updateLocalStorageCartItem = (cartItems, producId) => {
  const productInCart = isProductInCart(cartItems, producId);

  if (productInCart) {
    productInCart.count += 1;
  } else {
    cartItems.push({id: producId, count: 1});
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const getLocalStorageCartProductDetais = () => {
  JSON.parse(localStorage.getItem('CartProductDetais' || '[]'));
};

export const updateLocalStorageCartProductDetais = (cartProductDetails) => {
  localStorage.setItem('CartProductDetais', JSON.stringify(cartProductDetails));
};

export const isTheSameProduct = (localStorageCartItems, productId) =>
  localStorageCartItems.find(
      (localStorageItem) => localStorageItem.id === Number(productId),
  );

export const setProductCount = (localStorageCartItems, product) => {
  const sameProductInLS = isTheSameProduct(localStorageCartItems, product.id);

  if (sameProductInLS) {
    product.count = sameProductInLS.count;
  }
};


