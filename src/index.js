const btns = document.querySelectorAll('.store__header-btn');

const changeActiveBtn = ({target}) => {
  btns.forEach(btn => {
    btn.classList.remove('store__header-btn--active');
  });

  target.classList.add('store__header-btn--active');
};

btns.forEach(btn => {
  btn.addEventListener('click', changeActiveBtn);
});

