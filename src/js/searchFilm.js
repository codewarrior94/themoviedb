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
const loadCurrentBtn = document.querySelector('.current');



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
      loadNextBtn.addEventListener('click', onLoadNextSearch);
      loadPrevBtn.addEventListener('click', onLoadPrevSearch);
      loadFirstBtn.addEventListener('click', onLoadFirstSearch);
      loadLastBtn.addEventListener('click', onLoadLastSearch);
      loadPrevBtn.classList.remove('disabled');
      loadNextBtn.classList.remove('disabled');
      getCurrentPage()
    }
  }
  catch (error) {
    Notiflix.Loading.remove();
  }
}

let currentPage = 1;
let totalPages = 1000;

function getCurrentPage() {
  currentPage = parseInt(localStorage.getItem("current-page"), 10);
  totalPages = parseInt(localStorage.getItem("total-pages"), 10);
  loadCurrentBtn.textContent = currentPage;
  if (currentPage === totalPages) {
    loadFirstBtn.classList.add('disabled');
    loadLastBtn.classList.add('disabled');
    loadNextBtn.classList.add('disabled');
    loadPrevBtn.classList.add('disabled');
  } else if (currentPage === 1) {
    loadPrevBtn.classList.add('disabled');
    console.log(totalPages);
  } return currentPage;
}

async function onLoadNextSearch() {
  Notiflix.Loading.remove();
  filmAPI.nextPage();
  const nextPage = await filmAPI.searchByKeyword();
  localStorage.setItem("current-page", `${nextPage.data.page}`);
  getCurrentPage();
  render(nextPage.data.results);
  loadPrevBtn.classList.remove('disabled');
  Notiflix.Loading.remove();
}


async function onLoadPrevSearch() {
  Notiflix.Loading.remove();
  filmAPI.prevPage();
  const prevPage = await filmAPI.searchByKeyword();
  localStorage.setItem("current-page", `${prevPage.data.page}`);
  getCurrentPage();
  render(prevPage.data.results);
  loadNextBtn.classList.remove('disabled');
  Notiflix.Loading.remove();
}

async function onLoadFirstSearch() {
  Notiflix.Loading.remove();
  filmAPI.resetPage();
  const firstPage = await filmAPI.searchByKeyword();
  localStorage.setItem("current-page", `${firstPage.data.page}`);
  getCurrentPage();
  render(firstPage.data.results);
  Notiflix.Loading.remove();
}

async function onLoadLastSearch() {
  Notiflix.Loading.remove();
  localStorage.setItem("current-page", `${totalPages}`);
  getCurrentPage()
  loadPrevBtn.classList.remove('disabled');
  totalPages = parseInt(localStorage.getItem("total-pages"), 10);
  const lastPage = await filmAPI.searchByKeywordPagination(totalPages);
  render(lastPage.data.results);
  Notiflix.Loading.remove();
}
