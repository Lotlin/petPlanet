import {
  modalOverlay, modalOverlayCloseBtn, storeProductList,
} from '../getElements.js';
import {renderCart} from '../render/renderCart.js';
import {addToCart, updateCartCount} from '../service/cartServise.js';

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

export const cartControl = () => {
  addToCartControl();
  closeCartControl();
};
