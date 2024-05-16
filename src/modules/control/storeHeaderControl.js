
import {btnsStoreHeader, cartBtn} from '../getElements.js';
import {renderCategoryProducts} from '../render/renderProducts.js';
import {openCart} from './cartControl.js';

const changeStoreHeaderActiveBtn = (target) => {
  btnsStoreHeader.forEach(btn => {
    btn.classList.remove('store__header-btn--active');
  });

  target.classList.add('store__header-btn--active');
};

const headerCartBtnControl = () => {
  cartBtn.addEventListener('click', openCart);
};

export const storeHeaderControl = () => {
  btnsStoreHeader.forEach(btn => {
    btn.addEventListener('click', async ({target}) => {
      changeStoreHeaderActiveBtn(target);
      await renderCategoryProducts(btn.textContent);
    });
  });

  headerCartBtnControl();
};
