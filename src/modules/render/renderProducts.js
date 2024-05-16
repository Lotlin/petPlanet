import {API_URL} from '../components/API.js';
import {storeProductList} from '../getElements.js';
import {fetchProductsByCategory} from '../service/fetchProductsByCategory.js';
import {createElement} from '../util.js';

const renderProductCard = (product) => {
  const productElem = createElement('li', {
    classList: 'store__item',
  });

  const article = createElement('article', {
    classList: 'store__product product',
  });

  const img = createElement('img', {
    classList: 'product__img',
    src: `${API_URL}/${product.photoUrl}`,
    alt: product.name,
    width: 388,
    height: 261,
  });

  const title = createElement('h3', {
    classList: 'product__title',
    textContent: product.name,
  });

  const price = createElement('p', {
    classList: 'product__price',
    textContent: `${product.price}\u00A0₽`,
  });

  const btn = createElement('button', {
    classList: 'product__add-cart-btn',
    textContent: 'Заказать',
  });

  article.append(img, title, price, btn);

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
