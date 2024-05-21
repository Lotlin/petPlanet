import {API_URL} from '../components/API.js';
import {storeProductList} from '../getElements.js';
import {fetchProductsByCategory} from '../service/fetch.js';
import {createElement} from '../util.js';

const renderProductCard = ({photoUrl, name, price, id}) => {
  const productElem = createElement('li', {
    classList: 'store__item',
  });

  const article = createElement('article', {
    classList: 'store__product product',
  });

  const img = createElement('img', {
    classList: 'product__img',
    src: `${API_URL}/${photoUrl}`,
    alt: name,
    width: 388,
    height: 261,
  });

  const title = createElement('h3', {
    classList: 'product__title',
    textContent: name,
  });

  const priceElem = createElement('p', {
    classList: 'product__price',
    textContent: `${price}\u00A0₽`,
  });

  const btn = createElement('button', {
    classList: 'product__add-cart-btn',
    textContent: 'Заказать',
  });

  btn.dataset.id = id;

  article.append(img, title, priceElem, btn);

  productElem.append(article);


  return productElem;
};

export const renderCategoryProducts = async (category) => {
  const products = await fetchProductsByCategory(category);

  storeProductList.textContent = '';

  products.forEach(product => {
    const productCard = renderProductCard(product);

    storeProductList.append(productCard);
  });
};
