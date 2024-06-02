import {CAREGORIES_NAME} from './modules/data/API';
import {cartControl} from './modules/control/cartControl';
import {storeHeaderControl} from './modules/control/storeHeaderControl';
import {renderCategoryProducts} from './modules/render/renderProducts';
import {updateCartCount} from './modules/service/cartServise';

const init = async () => {
  await renderCategoryProducts(CAREGORIES_NAME.houses);
  storeHeaderControl();
  cartControl();
  updateCartCount();
};

init();
