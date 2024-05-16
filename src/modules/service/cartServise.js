import {cartCount, storeProductList} from '../getElements.js';
import {getLocalStorageCartItems, updateLocalStorageCartItem} from '../util.js';

export const updateCartCount = () => {
  const cartItems = getLocalStorageCartItems();

  cartCount.textContent = cartItems.length;
};


export const addToCart = (productName) => {
  const cartItems = getLocalStorageCartItems();
  cartItems.push(productName);

  updateLocalStorageCartItem(cartItems);
};

export const addToCartControl = () => {
  storeProductList.addEventListener('click', ({target}) => {
    if (target.closest('.product__add-cart-btn')) {
      const choosenProductCart = target.closest('.product');
      const productName =
        choosenProductCart.querySelector('.product__title').textContent;

      addToCart(productName);
      updateCartCount();
    }
  });
};
