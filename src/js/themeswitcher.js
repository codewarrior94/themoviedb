const THEME = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
   checkbox: document.getElementById('theme-switch-toggle'),
   body: document.querySelector('body'),
   footer: document.querySelector('.footer'),
  movieWrap: document.querySelector('.css-info-film-container'),
  pageWrapper: document.querySelector('.page__wrapper'),
};

refs.body.classList.add(THEME.LIGHT);
refs.footer.classList.add(THEME.LIGHT);
refs.movieWrap.classList.add(THEME.LIGHT);
refs.pageWrapper.classList.add(THEME.LIGHT);


refs.checkbox.addEventListener('change', onClickCheckbox);

function onClickCheckbox(e) {
  refs.body.classList.toggle(THEME.LIGHT);
  refs.body.classList.toggle(THEME.DARK);

  refs.footer.classList.toggle(THEME.LIGHT);
  refs.footer.classList.toggle(THEME.DARK);

  refs.movieWrap.classList.toggle(THEME.LIGHT);
  refs.movieWrap.classList.toggle(THEME.DARK);

  refs.pageWrapper.classList.toggle(THEME.LIGHT);
  refs.pageWrapper.classList.toggle(THEME.DARK);

  if (e.currentTarget.checked) {
    localStorage.setItem('theme', THEME.DARK);
  } else {
    localStorage.setItem('theme', THEME.LIGHT);
  }
}

const saveTheme = localStorage.getItem('theme');
if (saveTheme === THEME.DARK) {
  refs.checkbox.checked = true;
  refs.body.classList.add(THEME.DARK);
  refs.footer.classList.add(THEME.DARK);
  refs.movieWrap.classList.toggle(THEME.DARK);
  refs.pageWrapper.classList.toggle(THEME.DARK);
}