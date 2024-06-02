import {
  API_URL, CATEGORIES_URL, GET_ALL_PRODUCTS_URL, POST_ORDER_URL,
} from '../data/API';

const fetchData = async (endpoint, option = {}) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, option);

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (err) {
    console.error(`Ошибка запроса ${err}`);
  }
};

export const fetchProductsByCategory = category =>
  fetchData(`${CATEGORIES_URL}/${category}`);


export const fetchAllProductsById = productsIds =>
  fetchData(`/${GET_ALL_PRODUCTS_URL}/${productsIds.join(',')}`);

export const fetchPostOrder = (orderData) => fetchData(POST_ORDER_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData),
});
