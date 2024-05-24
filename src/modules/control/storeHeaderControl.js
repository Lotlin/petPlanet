
import {btnsStoreHeader, cartBtn} from '../getElements';
import {renderCategoryProducts} from '../render/renderProducts';
import {openCart} from './cartControl';

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
