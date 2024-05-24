export const btnsStoreHeader = document.querySelectorAll('.store__header-btn');
export const cartBtn = document.querySelector('.store__cart-btn');
export const cartCount = cartBtn.querySelector('.store__cart-cnt');

export const storeProductList = document.querySelector('.store__list');
export const getStoreProductPrice = (storeProduct) =>
  storeProduct.querySelector('.product__price');

export const modalOverlay = document.querySelector('.modal-overlay');
export const modalOverlayCloseBtn =
  modalOverlay.querySelector('.modal-overlay__close-btn');
export const cartItemsList = modalOverlay.querySelector('.modal-cart__list');
export const cartTotalPrice =
  modalOverlay.querySelector('.modal-cart__total-price');
export const getItemPriceElem = (item) =>
  item.querySelector('.cart-item__price');
export const getItemCount = (item) => item.querySelector('.cart-item__num');
