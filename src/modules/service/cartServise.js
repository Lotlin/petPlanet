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

