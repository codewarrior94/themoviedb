
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
   checkbox: document.getElementById('theme-switch-toggle'),
   body: document.querySelector('body'),
   footer: document.querySelector('.footer'),
   movieWrap: document.querySelector('.css-info-film-container')
};

refs.body.classList.add(Theme.LIGHT);
refs.footer.classList.add(Theme.LIGHT);
refs.movieWrap.classList.add(Theme.LIGHT);


refs.checkbox.addEventListener('change', onClickCheckbox);

function onClickCheckbox(e) {
  refs.body.classList.toggle(Theme.LIGHT);
  refs.body.classList.toggle(Theme.DARK);

  refs.footer.classList.toggle(Theme.LIGHT);
  refs.footer.classList.toggle(Theme.DARK);

  refs.movieWrap.classList.toggle(Theme.LIGHT);
  refs.movieWrap.classList.toggle(Theme.DARK);

  if (e.currentTarget.checked) {
    localStorage.setItem('theme', Theme.DARK);
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const saveTheme = localStorage.getItem('theme');
if (saveTheme === Theme.DARK) {
  refs.checkbox.checked = true;
  refs.body.classList.add(Theme.DARK);
  refs.footer.classList.add(Theme.DARK);
  refs.movieWrap.classList.toggle(Theme.DARK);
}