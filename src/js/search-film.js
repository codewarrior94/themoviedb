import FilmAPI from './filmAPI'
import templateFilms from '../templates/filmCardInList.hbs'
import Notiflix from 'notiflix'

const filmAPI = new FilmAPI;
const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 500;



const refs = {
  searchForm: document.getElementById('search-form'),
  searchFilm: document.querySelector('.search-form__input'),
  renderCardFilms: document.querySelector('.film-list'),
}

refs.searchFilm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

async function onSearch(e) {
  e.preventDefault()
  clearPicturesMarkup()

  filmAPI.resetPage()
  filmAPI.query = e.target.value

  try {
    const films = await filmAPI.searchByKeyword();

    if (filmAPI.query === '' || films.data.results.length === 0) {
      Notiflix.Notify.failure('Search result failed. Enter the correct movie title and search again');
    } else {
      filmsMarkup(films.data.results);
      Notiflix.Loading.remove();
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