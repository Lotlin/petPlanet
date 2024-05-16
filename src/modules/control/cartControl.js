import {modalOverlay, modalOverlayCloseBtn} from '../getElements.js';
import {renderCartItems} from '../render/renderCartItems.js';

export const openCart = () => {
  modalOverlay.classList.add('modal-overlay--active');

  renderCartItems();
};

export const closeCart = () => {
  modalOverlay.classList.remove('modal-overlay--active');
};

export const cartControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (target === modalOverlay || target === modalOverlayCloseBtn) {
      closeCart();
    }
  });
};
