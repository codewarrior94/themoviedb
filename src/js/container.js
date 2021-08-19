import FilmAPI from './filmAPI'
import render from './render';
import Notiflix from 'notiflix';

const filmAPI = new FilmAPI;
const loadNextBtn = document.querySelector('.next');
const loadPrevBtn = document.querySelector('.prev');
const loadLastBtn = document.querySelector('.last');
const loadFirstBtn = document.querySelector('.first');
const loadCurrentBtn = document.querySelector('.current');
let currentPage = 1;
let totalPages = 10000;
filmAPI.searchTrendings().then(r => {
  localStorage.setItem("total-pages", `${r.data.total_pages}`);
  localStorage.setItem("current-page", `${r.data.page}`);
  loadLastBtn.textContent = r.data.total_pages;
  loadNextBtn.addEventListener('click', onLoadNextTrendings);
  loadPrevBtn.addEventListener('click', onLoadPrevTrendings);
  loadFirstBtn.addEventListener('click', onLoadFirstTrendings);
  loadLastBtn.addEventListener('click', onLoadLastTrendings);
  render(r.data.results);
  getCurrentPage();
})

function getCurrentPage() {
  currentPage = parseInt(localStorage.getItem("current-page"), 10);
  totalPages = parseInt(localStorage.getItem("total-pages"), 10);
  loadCurrentBtn.textContent = currentPage;
  if (currentPage === 1) {
    loadNextBtn.classList.remove('disabled');
    loadPrevBtn.classList.add('disabled');
  } else if (currentPage === totalPages) {
    loadNextBtn.classList.add('disabled');
    loadPrevBtn.classList.remove('disabled');
  } return currentPage;
}

async function onLoadNextTrendings() {
  Notiflix.Loading.remove();
  filmAPI.nextPage();
  const nextPage = await filmAPI.searchTrendings();
  localStorage.setItem("current-page", `${nextPage.data.page}`);
  getCurrentPage();
  render(nextPage.data.results);
  loadPrevBtn.classList.remove('disabled');
  Notiflix.Loading.remove();
}

async function onLoadPrevTrendings() {
  Notiflix.Loading.remove();
  filmAPI.prevPage();
  const prevPage = await filmAPI.searchTrendings();
  localStorage.setItem("current-page", `${prevPage.data.page}`);
  getCurrentPage();
  render(prevPage.data.results);
  loadNextBtn.classList.remove('disabled');
  Notiflix.Loading.remove();
}

async function onLoadFirstTrendings() {
  Notiflix.Loading.remove();
  filmAPI.resetPage();
  const firstPage = await filmAPI.searchTrendings();
  localStorage.setItem("current-page", `${firstPage.data.page}`);
  getCurrentPage();
  render(firstPage.data.results);
  Notiflix.Loading.remove();
}

async function onLoadLastTrendings() {
  Notiflix.Loading.remove();
  localStorage.setItem("current-page", `${totalPages}`);
  getCurrentPage()
  totalPages = parseInt(localStorage.getItem("total-pages"), 10);
  const lastPage = await filmAPI.searchTrendingsPagination(totalPages);
  render(lastPage.data.results);
  Notiflix.Loading.remove();
}
