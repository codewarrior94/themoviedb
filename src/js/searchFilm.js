import FilmAPI from './filmAPI'
import render from './render';
import Notiflix from 'notiflix'

const filmAPI = new FilmAPI;
const debounce = require('lodash.debounce')
const DEBOUNCE_DELAY = 500;
const loadNextBtn = document.querySelector('.next');
const loadPrevBtn = document.querySelector('.prev');
const loadLastBtn = document.querySelector('.last');
const loadFirstBtn = document.querySelector('.first');



const refs = {
  searchForm: document.getElementById('search-form'),
  searchFilm: document.querySelector('.search-form__input'),
  renderCardFilms: document.querySelector('.film-list'),
}

refs.searchFilm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))
// loadPrevBtn.disabled = true;
// loadNextBtn.disabled = true;

async function onSearch(e) {
  e.preventDefault()
  Notiflix.Loading.remove();

  filmAPI.resetPage()
  filmAPI.query = e.target.value
  
  try {
    const films = await filmAPI.searchByKeyword();

    if (filmAPI.query === '' || films.data.results.length === 0) {
      refs.renderCardFilms.innerHTML = ''
      Notiflix.Loading.remove();
      Notiflix.Notify.failure('Search result failed. Enter the correct movie title and search again');
    } else {
      render(films.data.results);
      Notiflix.Loading.remove();
      localStorage.setItem("total-pages", `${films.data.total_pages}`)
      localStorage.setItem("current-page", `${films.data.page}`)
      loadLastBtn.textContent = films.data.total_pages;
      loadNextBtn.addEventListener('click', onLoadNext);
      loadPrevBtn.addEventListener('click', onLoadPrev);
      loadFirstBtn.addEventListener('click', onLoadFirst);
      loadLastBtn.addEventListener('click', onLoadLast);
    }
  }
  catch (error) {
    Notiflix.Loading.remove();
  }
}

let currentPage = parseInt(localStorage.getItem("current-page"), 10);
let totalPages = parseInt(localStorage.getItem("total-pages"), 10);

// if (`${currentPage}` > 1 || `${currentPage}` <= `${totalPages}`) {
//   loadPrevBtn.style.disabled = false;
// } else {
//   loadPrevBtn.style.disabled = true;
// }

// if (`${currentPage}` >= 1 && `${currentPage}` < `${totalPages}`) {
//   loadNextBtn.disabled = false;
// } else {
//   loadNextBtn.disabled = true;
// }

async function onLoadNext() {
  Notiflix.Loading.remove();
  filmAPI.nextPage();

  const nextPage = await filmAPI.searchByKeyword();
  localStorage.setItem("current-page", `${nextPage.data.page}`);
  currentPage = parseInt(localStorage.getItem("current-page"), 10);
  render(nextPage.data.results);
  console.log("currentPage " + currentPage);
  console.log("totalPages " + totalPages);
  Notiflix.Loading.remove();
}
async function onLoadPrev() {
  Notiflix.Loading.remove();
  filmAPI.prevPage();

  const prevPage = await filmAPI.searchByKeyword();
  localStorage.setItem("current-page", `${prevPage.data.page}`);
  currentPage = parseInt(localStorage.getItem("current-page"), 10);
  render(prevPage.data.results);
  console.log("currentPage " + currentPage);
  console.log("totalPages " + totalPages);
  Notiflix.Loading.remove();
}

async function onLoadFirst() {
  Notiflix.Loading.remove();
  filmAPI.resetPage();

  const firstPage = await filmAPI.searchByKeyword();
  localStorage.setItem("current-page", `${firstPage.data.page}`);
  currentPage = parseInt(localStorage.getItem("current-page"), 10);
  render(firstPage.data.results);
  Notiflix.Loading.remove();
}

async function onLoadLast() {
  Notiflix.Loading.remove();
  currentPage = parseInt(localStorage.getItem("total-pages"), 10);
  const lastPage = await filmAPI.searchByKeywordPagination(currentPage);

  localStorage.setItem("current-page", `${currentPage}`);
  
  render(lastPage.data.results);
  Notiflix.Loading.remove();
}
