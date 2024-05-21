import {CAREGORIES_NAME} from './modules/components/API.js';
import {cartControl} from './modules/control/cartControl.js';
import {storeHeaderControl} from './modules/control/storeHeaderControl.js';
import {renderCategoryProducts} from './modules/render/renderProducts.js';
import {
  updateCartCount,
} from './modules/service/cartServise.js';

const init = async () => {
  await renderCategoryProducts(CAREGORIES_NAME.houses);
  storeHeaderControl();
  cartControl();
  updateCartCount();
};


init();
