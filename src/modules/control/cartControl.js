import {
  getItemPriceElem, getItemCount, getStoreProductPrice,
  modalOverlay, modalOverlayCloseBtn, storeProductList,
} from '../getElements.js';
import {renderCart, renderTotalPrice} from '../render/renderCart.js';
import {
  addToCart, updateCartCount, updateItemPriceAndCount, getItemId,
  getElemPrice, getLocalStorageCartItems, increaseCountLocalStorageCartItem,
  reduceCountLocalStorageCartItem, isCoutBtnClicked,
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

export const countBtnControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    const clickeCountdBtn = isCoutBtnClicked(target);

    if (clickeCountdBtn) {
      const parentItem = target.closest('.cart-item');
      const priceElem = getItemPriceElem(parentItem);
      const countElem = getItemCount(parentItem);
      const itemId = getItemId(parentItem);

      const cartItems = getLocalStorageCartItems();

      if (clickeCountdBtn === 'increase') {
        increaseCountLocalStorageCartItem(cartItems, itemId);
        updateItemPriceAndCount(parentItem, priceElem, countElem, 'increase');
      } else {
        reduceCountLocalStorageCartItem(cartItems, itemId);
        updateItemPriceAndCount(parentItem, priceElem, countElem);
      }

      const newCartItems = getLocalStorageCartItems();
      renderTotalPrice(newCartItems);
    }
  });
};

export const cartControl = () => {
  addToCartControl();
  closeCartControl();
  countBtnControl();
};
