
import {btnsStoreHeader} from '../getElements.js';

const changeStoreHeaderActiveBtn = ({target}) => {
  btnsStoreHeader.forEach(btn => {
    btn.classList.remove('store__header-btn--active');
  });

  target.classList.add('store__header-btn--active');
};

export const storeHeaderControl = () => {
  btnsStoreHeader.forEach(btn => {
    btn.addEventListener('click', changeStoreHeaderActiveBtn);
  });
};
