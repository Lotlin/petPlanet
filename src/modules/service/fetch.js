import {
  API_URL, CATEGORIES_URL, GET_ALL_PRODUCTS_URL,
} from '../components/API';

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

export const fetchAllProductsById = async (productsId) => {
  try {
    const response = await fetch(
        `${API_URL}/${GET_ALL_PRODUCTS_URL}/${productsId.join(',')}`,
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const products = await response.json();

    return products;
  } catch (err) {
    console.error(`Ошибка запроса товаров: ${err}`);
    return [];
  }
};

