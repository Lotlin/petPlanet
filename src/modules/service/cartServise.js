import {
  cartCount, cartForm, cartSubmitBtn, getCloseOrderMessageBtn, getOrderMessage,
  modalOverlay,
} from '../getElements';
import {fetchAllProductsById, fetchPostOrder} from './fetch';
import {
  renderCartIsEmptyMessage,
  renderOrderMessageModal,
} from '../render/renderCart';
import {disableElem} from '../util.js';

export const isTheSameProduct = (localStorageCartItems, productId) =>
  localStorageCartItems.find(
      (localStorageItem) => localStorageItem.id === Number(productId),
  );

export const setProductCount = (localStorageCartItems, product) => {
  const sameProductInLS = isTheSameProduct(localStorageCartItems, product.id);

  if (sameProductInLS) {
    product.count = sameProductInLS.count;
  }
};

export const getLocalStorageCartItems = () =>
  JSON.parse(localStorage.getItem('cartItems') || '[]');

export const getProductInCart = (cartItems, productId) =>
  cartItems.find((item) => item.id === productId);

export const clearLocalStorageCartItems = () => {
  localStorage.removeItem('cartItems');
};

export const addProductToLocalStorage = (cartItems, producId, productPrice) => {
  const productInCart = getProductInCart(cartItems, producId);

  if (productInCart) {
    productInCart.count += 1;
  } else {
    cartItems.push({id: producId, count: 1, price: productPrice});
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const increaseCountLocalStorageCartItem = (cartItems, itemId) => {
  const itemInCart = getProductInCart(cartItems, itemId);

  itemInCart.count += 1;

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const updateCartCount = () => {
  const cartItems = getLocalStorageCartItems();

  cartCount.textContent = cartItems.length;
};

export const reduceCountLocalStorageCartItem = (cartItems, itemId) => {
  const itemInCart = getProductInCart(cartItems, itemId);

  if (itemInCart.count === 1) {
    cartItems = cartItems.filter((item) => item.id !== itemInCart.id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    return;
  }

  itemInCart.count -= 1;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const addToCart = (producId, productPrice) => {
  const cartItems = getLocalStorageCartItems();

  addProductToLocalStorage(cartItems, producId, productPrice);
};

export const getCartItemsFetchData = async () => {
  let allProductsData = [];

  const catrtItems = getLocalStorageCartItems();

  const allCartItemsIds = catrtItems.map(item => item.id);

  if (allCartItemsIds) {
    allProductsData = await fetchAllProductsById(allCartItemsIds);
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

export const countCartPrices = (cartItemsData) =>
  cartItemsData.reduce((acc, item) => acc + (item.price * item.count), 0);

export const getElemPrice = (priceElem) =>
  priceElem.textContent.split('\u00A0')[0];

export const getItemId = (itemElem) => parseInt(itemElem.dataset.id);

export const updateItemPriceAndCount =
  (parentItem, priceElem, countElem, operator = false) => {
    const currentPrice = Number(getElemPrice(priceElem));
    const currentCount = Number(countElem.textContent);

    if (currentCount === 1 && !operator) {
      parentItem.remove();

      const сartItems = getLocalStorageCartItems();
      if (!сartItems.length) {
        renderCartIsEmptyMessage();
        disableElem(cartSubmitBtn);
      }

      return;
    }

    const oneItemPrice = currentPrice / currentCount;

    const newCount = operator ? (currentCount + 1) : (currentCount - 1);
    countElem.textContent = newCount;

    priceElem.textContent = `${newCount * oneItemPrice}\u00A0₽`;
  };

export const isCoutBtnClicked = (target) => {
  let clickedBtn = false;

  if (target.classList.contains('cart-item__num-btn--minus')) {
    clickedBtn = 'reduce';
  }

  if (target.classList.contains('cart-item__num-btn--plus')) {
    clickedBtn = 'increase';
  }

  return clickedBtn;
};

export const submitOrder = async e => {
  e.preventDefault();

  const cartItems = getLocalStorageCartItems();
  const products = cartItems.map(({id, count}) => ({
    id,
    quantity: count,
  }));

  const storeId = cartForm.store.value;

  const {orderId} = await fetchPostOrder({products, storeId});
  renderOrderMessageModal(orderId);

  modalOverlay.classList.remove('modal-overlay--active');

  clearLocalStorageCartItems();
  updateCartCount();

  const closeOrderMessageBtn = getCloseOrderMessageBtn();
  closeOrderMessageBtn.addEventListener('click', () => {
    getOrderMessage().remove();
  });
};
