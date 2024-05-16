import {API_URL, CATEGORIES_URL} from '../components/API.js';

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/${CATEGORIES_URL}/${category}`);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const products = await response.json();

    return products;
  } catch (err) {
    console.error(`Ошибка запроса товаров: ${err}`);
  }
};
