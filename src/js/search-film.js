import FilmAPI from './filmAPI'
import { render, clearContainer } from './render';
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
  Notiflix.Loading.remove();

  filmAPI.resetPage()
  filmAPI.query = e.target.value

  try {
    const films = await filmAPI.searchByKeyword();
    console.log(films);

    if (filmAPI.query === '' || films.data.results.length === 0) {

      // clearContainer()

      Notiflix.Loading.remove();
      Notiflix.Notify.failure('Search result failed. Enter the correct movie title and search again');

    } else {
      render(films.data.results);
      Notiflix.Loading.remove();
    }
  }
  catch (error) {
    Notiflix.Loading.remove();
  }
}
