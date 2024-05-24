import {cartCount} from '../getElements.js';
import {fetchAllProductsById} from './fetch';
import {renderCartIsEmptyMessage} from '../render/renderCart';

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

export const getLocalStorageCartItems = () =>
  JSON.parse(localStorage.getItem('cartItems') || '[]');

export const getProductInCart = (cartItems, productId) =>
  cartItems.find((item) => item.id === productId);

export const addProductToLocalStorage = (cartItems, producId, productPrice) => {
  const productInCart = getProductInCart(cartItems, producId);

  if (productInCart) {
    productInCart.count += 1;
  } else {
    cartItems.push({id: producId, count: 1, price: productPrice});
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const increaseCountLocalStorageCartItem = (cartItems, itemId) => {
  const itemInCart = getProductInCart(cartItems, itemId);

  itemInCart.count += 1;

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const reduceCountLocalStorageCartItem = (cartItems, itemId) => {
  const itemInCart = getProductInCart(cartItems, itemId);

  if (itemInCart.count === 1) {
    cartItems = cartItems.filter((item) => item.id !== itemInCart.id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return;
  }

  itemInCart.count -= 1;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const updateCartCount = () => {
  const cartItems = getLocalStorageCartItems();

  cartCount.textContent = cartItems.length;
};

export const addToCart = (producId, productPrice) => {
  const cartItems = getLocalStorageCartItems();

  addProductToLocalStorage(cartItems, producId, productPrice);
};

export const getCartItemsFetchData = async () => {
  let allProductsData = [];

  const catrtItems = getLocalStorageCartItems();

  const allCartItemsId = catrtItems.map(item => item.id);

  if (allCartItemsId) {
    allProductsData = await fetchAllProductsById(allCartItemsId);
  }

  return allProductsData;
};

export const updateCountFetchedItems = async () => {
  const localStorageCartItems = getLocalStorageCartItems();

  if (!localStorageCartItems.length) {
    return [];
  }

  const productsFetchData = await getCartItemsFetchData();

  productsFetchData.forEach(fetchItem => {
    setProductCount(localStorageCartItems, fetchItem);
  });

  return productsFetchData;
};

export const countCartPrices = (cartItemsData) =>
  cartItemsData.reduce((acc, item) => acc + (item.price * item.count), 0);

export const getElemPrice = (priceElem) =>
  priceElem.textContent.split('\u00A0')[0];

export const getItemId = (itemElem) => parseInt(itemElem.dataset.id);

export const updateItemPriceAndCount =
  (parentItem, priceElem, countElem, operator = false) => {
    const currentPrice = Number(getElemPrice(priceElem));
    const currentCount = Number(countElem.textContent);

    if (currentCount === 1 && !operator) {
      parentItem.remove();

      const сartItems = getLocalStorageCartItems();
      if (!сartItems.length) {
        renderCartIsEmptyMessage();
      }

      return;
    }

    const oneItemPrice = currentPrice / currentCount;

    const newCount = operator ? (currentCount + 1) : (currentCount - 1);
    countElem.textContent = newCount;

    priceElem.textContent = `${newCount * oneItemPrice}\u00A0₽`;
  };

export const isCoutBtnClicked = (target) => {
  let clickedBtn = false;

  if (target.classList.contains('cart-item__num-btn--minus')) {
    clickedBtn = 'reduce';
  }

  if (target.classList.contains('cart-item__num-btn--plus')) {
    clickedBtn = 'increase';
  }

  return clickedBtn;
}