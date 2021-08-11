import FilmAPI from './filmAPI'
import templateFilms from '../templates/filmCardInList.hbs'
import Notiflix from 'notiflix'

const filmAPI = new FilmAPI;
const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;



const refs = {
  searchFilm: document.querySelector('.search-form__input'),
  renderCardFilms: document.querySelector('.adaptiv_container'),
}

refs.searchFilm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

async function onSearch(e) {
  e.preventDefault()

  const inputValue = e.target.value
  console.log(inputValue);
  clearPicturesMarkup()

  filmAPI.resetPage()
  filmAPI.query = e.target.value

  // filmAPI.searchByKeyword(inputValue)
  //   .then(r => console.log(r))
  //   .catch(error => console.error())

  try {
    const dataArray = await filmAPI.searchByKeyword();

    if (filmAPI.query === '' || dataArray.results.length === 0) {
      // clearPicturesMarkup();
      // refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure('Search result failed. Enter the correct movie title and search again');
    } else {
      // refs.loadMoreBtn.classList.remove('is-hidden');
      filmsMarkup(dataArray.results);
    }
  } catch (error) {
    console.log(error);
  }
}

function filmsMarkup(collection) {
  refs.renderCardFilms.insertAdjacentHTML('beforeend', templateFilms(collection))
}

function clearPicturesMarkup() {
  refs.renderCardFilms.innerHTML = ''
}