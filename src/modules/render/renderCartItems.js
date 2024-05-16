import {cartItemsList} from '../getElements.js';
import {getLocalStorageCartItems} from '../util.js';
import {createElement} from '../util.js';

/*
<li class="modal-cart__item cart-item">
            <img class="cart-item__img" src="/img/photo-1.jpg" alt="Домик-конус для питомцев">
            <h3 class="cart-item__title">Домик-конус для питомцев</h3>

            <div class="cart-item__num-wrapper">
              <button class="cart-item__num-btn cart-item__num-btn--minus">-</button>
              <div class="cart-item__num">1</div>
              <button class="cart-item__num-btn cart-item__num-btn--plus">+</button>
            </div>
          </li>

*/

const renderCartItem = (cartItemTitle) => {
  const item = createElement('li', {
    classList: 'modal-cart__item cart-item',
  });
// toDo перередалать после получения данных
  const title = createElement('h3', {
    classList: 'cart-item__title',
    textContent: cartItemTitle,
  });

  item.append(title);

  return item;
};

export const renderCartItems = () => {
  cartItemsList.textContent = '';

  const catrtItemsTites = getLocalStorageCartItems();
  catrtItemsTites.forEach(cartItemTitle => {
    const itemELem = renderCartItem(cartItemTitle);

    cartItemsList.append(itemELem);
  });
};
