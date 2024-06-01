export const btnsStoreHeader = document.querySelectorAll('.store__header-btn');
export const cartBtn = document.querySelector('.store__cart-btn');
export const cartCount = cartBtn.querySelector('.store__cart-cnt');

export const storeProductList = document.querySelector('.store__list');
export const getStoreProductPriceElem = (storeProduct) =>
  storeProduct.querySelector('.product__price');

export const modalOverlay = document.querySelector('.modal-overlay');
export const modalOverlayCloseBtn =
  modalOverlay.querySelector('.modal-overlay__close-btn');
export const cartItemsList = modalOverlay.querySelector('.modal-cart__list');
export const cartTotalPrice =
  modalOverlay.querySelector('.modal-cart__total-price');
export const getItemPriceElem = (item) =>
  item.querySelector('.cart-item__price');
export const getItemCountElem = (item) => item.querySelector('.cart-item__num');
export const cartForm = modalOverlay.querySelector('.modal-cart__form');
export const cartSubmitBtn = modalOverlay.querySelector('.modal-cart__btn');

export const getOrderMessage = () => document.querySelector('.order-message');
export const getCloseOrderMessageBtn = () =>
  document.querySelector('.order-message__close-btn');
