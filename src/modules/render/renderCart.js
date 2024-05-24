import {API_URL} from '../components/API';
import {cartItemsList, cartTotalPrice} from '../getElements';
import {createElement} from '../util';
import {
  countCartPrices, updateCountFetchedItems,
} from '../service/cartServise';

const renderCartItem = ({photoUrl, name, count, price, id}) => {
  const item = createElement('li', {
    classList: 'modal-cart__item cart-item',
  });

  item.dataset.id = id;

  const img = createElement('img', {
    className: 'cart-item__img',
    src: `${API_URL}/${photoUrl}`,
    alt: name,
  });

  const title = createElement('h3', {
    classList: 'cart-item__title',
    textContent: name,
  });

  const numWrapper = createElement('div', {
    classList: 'cart-item__num-wrapper',
  });

  const btnMinus = createElement('button', {
    classList: 'cart-item__num-btn cart-item__num-btn--minus',
    textContent: '-',
  });

  const numElem = createElement('span', {
    classList: 'cart-item__num',
    textContent: count,
  });

  const btnPlus = createElement('button', {
    classList: 'cart-item__num-btn cart-item__num-btn--plus',
    textContent: '+',
  });

  numWrapper.append(btnMinus, numElem, btnPlus);

  const priceElem = createElement('p', {
    classList: 'cart-item__price',
    textContent: `${price * count}\u00A0₽`,
  });

  item.append(img, title, numWrapper, priceElem);

  return item;
};

export const renderCartIsEmptyMessage = () => {
  const message = createElement('li', {
    textContent: 'Корзина пуста',
  });

  cartItemsList.append(message);
};

const renderCartItems = async (cartItemsArray) => {
  cartItemsArray.forEach(item => {
    const itemELem = renderCartItem(item);
    cartItemsList.append(itemELem);
  });
};

export const renderTotalPrice = (cartItemsData) => {
  cartTotalPrice.textContent = `${countCartPrices(cartItemsData)}\u00A0₽`;
};

export const renderCart = async () => {
  cartItemsList.textContent = '';

  const cartItemsData = await updateCountFetchedItems();

  if (!cartItemsData.length) {
    renderCartIsEmptyMessage();

    return;
  }

  renderCartItems(cartItemsData);
  renderTotalPrice(cartItemsData);
};
