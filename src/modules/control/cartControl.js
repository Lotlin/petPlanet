import {
  modalOverlay, storeProductList, cartForm,
} from '../getElements';
import {
  updateCartCount, submitOrder, closeCart, cartItemCountService,
  isCountBtnClicked, addStoreProductToCart, isClickedStoreProductAddToCartBtn,
  isUserWantsToCloseCartModal,
} from '../service/cartServise';

const addToCartControl = () => {
  storeProductList.addEventListener('click', ({target}) => {
    if (isClickedStoreProductAddToCartBtn(target)) {
      addStoreProductToCart(target);
    }
  });
};

const closeCartControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    if (isUserWantsToCloseCartModal(target)) {
      closeCart();
      updateCartCount();
    }
  });
};

export const countBtnControl = () => {
  modalOverlay.addEventListener('click', ({target}) => {
    const clickedCountdBtn = isCountBtnClicked(target);

    if (clickedCountdBtn) {
      cartItemCountService(target, clickedCountdBtn);
    }
  });
};

export const cartSubmitControl = () => {
  cartForm.addEventListener('submit', submitOrder);
};

export const cartControl = () => {
  addToCartControl();
  closeCartControl();
  countBtnControl();
  cartSubmitControl();
};
