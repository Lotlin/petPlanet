import {
  API_URL, CATEGORIES_URL, GET_ALL_PRODUCTS_URL, POST_ORDER_URL,
} from '../components/API';

export const fetchProductsByCategory = async category => {
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

export const fetchAllProductsById = async productsIds => {
  try {
    const response = await fetch(
        `${API_URL}/${GET_ALL_PRODUCTS_URL}/${productsIds.join(',')}`,
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

export const fetchPostOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/${POST_ORDER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(`Ошибка оформления заказа: ${error}`);
  }
};
