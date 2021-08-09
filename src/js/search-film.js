import FilmAPI from './filmAPI'
import templateFilm from '../templates/test.hbs'
import Notiflix from 'notiflix'

const filmAPI = new FilmAPI;
const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 300;



const refs = {
  searchFilm: document.querySelector('.input'),
  renderCardFilm: document.querySelector('.container'),
}

refs.searchFilm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
  const inputValue = e.target.value
  console.log(inputValue);

  filmAPI.searchByKeyword(inputValue)
    .then(r => console.log(r))
    .catch(error => console.error())
}