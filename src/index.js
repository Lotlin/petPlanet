import {CAREGORIES_NAME} from './modules/components/API.js';
import {storeHeaderControl} from './modules/control/storeHeaderControl.js';
import {renderCategoryProducts} from './modules/render/renderProducts.js';

const init = () => {
  storeHeaderControl();
  renderCategoryProducts(CAREGORIES_NAME.houses);
};


init();
