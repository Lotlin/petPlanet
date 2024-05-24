import {
  getItemPriceElem, getItemCount, getStoreProductPrice,
  modalOverlay, modalOverlayCloseBtn, storeProductList,
} from '../getElements.js';
import {renderCart, renderTotalPrice} from '../render/renderCart.js';
import {
  addToCart, updateCartCount, updateItemPriceAndCount, getItemId,
  getElemPrice, getLocalStorageCartItems, increaseCountLocalStorageCartItem,
  reduceCountLocalStorageCartItem,
} from '../service/cartServise.js';

export const openCart = () => {
  modalOverlay.classList.add('modal-overlay--active');

  renderCart();
};

export const closeCart = () => {
  modalOverlay.classList.remove('modal-overlay--active');
};

const addToCartControl = () => {
  storeProductList.addEventListener('click', ({target}) => {
    if (target.closest('.product__add-cart-btn')) {
      const productId = parseInt(target.dataset.id);

      const parentItem = target.closest('.store__product');
      const productPriceElem = getStoreProductPrice(parentItem);
      const productPrice = Number(getElemPrice(productPriceElem));

      addToCart(productId, productPrice);
      updateCartCount();
    }
  });
};

const closeCartControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (target === modalOverlay || target === modalOverlayCloseBtn) {
      closeCart();
      updateCartCount();
    }
  });
};

const increaseCountBtnControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (target.classList.contains('cart-item__num-btn--plus')) {
      const parentItem = target.closest('.cart-item');
      const priceElem = getItemPriceElem(parentItem);
      const countElem = getItemCount(parentItem);
      const itemId = getItemId(parentItem);

      const cartItems = getLocalStorageCartItems();
      increaseCountLocalStorageCartItem(cartItems, itemId);

      updateItemPriceAndCount(parentItem, priceElem, countElem, 'increase');

      const newCartItems = getLocalStorageCartItems();
      renderTotalPrice(newCartItems);
    }
  });
};

const reduceCountBtnControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (target.classList.contains('cart-item__num-btn--minus')) {
      const parentItem = target.closest('.cart-item');
      const priceElem = getItemPriceElem(parentItem);
      const countElem = getItemCount(parentItem);
      const itemId = getItemId(parentItem);

      const cartItems = getLocalStorageCartItems();
      reduceCountLocalStorageCartItem(cartItems, itemId);

      updateItemPriceAndCount(parentItem, priceElem, countElem);

      const newCartItems = getLocalStorageCartItems();
      renderTotalPrice(newCartItems);
    }
  });
};

export const cartControl = () => {
  addToCartControl();
  closeCartControl();
  increaseCountBtnControl();
  reduceCountBtnControl();
};
