
import {btnsStoreHeader} from '../getElements.js';
import {renderCategoryProducts} from '../render/renderProducts.js';

const changeStoreHeaderActiveBtn = (target) => {
  btnsStoreHeader.forEach(btn => {
    btn.classList.remove('store__header-btn--active');
  });

  target.classList.add('store__header-btn--active');
};

export const storeHeaderControl = () => {
  btnsStoreHeader.forEach(btn => {
    btn.addEventListener('click', async ({target}) => {
      changeStoreHeaderActiveBtn(target);
      const rusCategotyName = btn.textContent.trim();
      await renderCategoryProducts(rusCategotyName);
    });
  });
};
