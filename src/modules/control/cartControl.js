import {
  getItemPrice, getItemCount,
  modalOverlay, modalOverlayCloseBtn, storeProductList,
} from '../getElements.js';
import {renderCart} from '../render/renderCart.js';
import {
  addToCart, updateCartCount, updateItemPriceAndCount,
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

      addToCart(productId);
      updateCartCount();
    }
  });
};

const closeCartControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (target === modalOverlay || target === modalOverlayCloseBtn) {
      closeCart();
    }
  });
};

const addCountBtnControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (target.classList.contains('cart-item__num-btn--plus')) {
      const parentItem = target.closest('.cart-item');
      const priceElem = getItemPrice(parentItem);
      const countElem = getItemCount(parentItem);

      updateItemPriceAndCount(priceElem, countElem, true);
    }
  });
};

export const cartControl = () => {
  addToCartControl();
  closeCartControl();
  addCountBtnControl();
};
