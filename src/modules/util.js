export const createElement = (tagName, attributesObj) => {
  const elem = document.createElement(tagName);

  Object.assign(elem, attributesObj);

  return elem;
};

export const disableElem = (elem) => {
  elem.disabled = 'true';
};

export const activateElem = (elem) => {
  elem.removeAttribute('disabled');
};

export const getDeliveryDate = (deliveryTimeInDays = 1) => {
  const monthsArr = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const currentDay = new Date();
  currentDay.setDate(currentDay.getDate() + deliveryTimeInDays);

  const deliveryDay = currentDay.getDate();
  const deliveryMonth = monthsArr[currentDay.getMonth()];
  const year = currentDay.getFullYear();

  const deliveryTime = `${deliveryDay} ${deliveryMonth} ${year} года`;
  return deliveryTime;
};
