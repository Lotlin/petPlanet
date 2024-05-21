import {cartCount} from '../getElements.js';
import {
  getLocalStorageCartItems, updateLocalStorageCartItem, setProductCount,
} from '../util.js';
import {fetchAllProductsById} from './fetch';

export const updateCartCount = () => {
  const cartItems = getLocalStorageCartItems();

  cartCount.textContent = cartItems.length;
};

export const addToCart = (producId) => {
  const cartItems = getLocalStorageCartItems();

  updateLocalStorageCartItem(cartItems, producId);
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

export const updateItemPriceAndCount =
  (priceElem, countElem, operator = false) => {
    const currentPrice = Number(getElemPrice(priceElem));
    const currentCount = Number(countElem.textContent);

    const oneItemPrice = currentPrice / currentCount;

    const newCount = operator ? (currentCount + 1) : (currentCount - 1);
    countElem.textContent = newCount;

    priceElem.textContent = `${newCount * oneItemPrice}\u00A0₽`;

  // toDO updateLocalStorageCartItem
  // toDo totalPrice
  };
