import FilmAPI from './filmAPI'
import render from './render';
import Notiflix from 'notiflix';

const filmAPI = new FilmAPI;
const loadNextBtn = document.querySelector('.next');
const loadPrevBtn = document.querySelector('.prev');
const loadLastBtn = document.querySelector('.last');
const loadFirstBtn = document.querySelector('.first');

filmAPI.searchTrendings().then(r => {
  localStorage.setItem("total-pages", `${r.data.total_pages}`);
  localStorage.setItem("current-page", `${r.data.page}`);
  loadLastBtn.textContent = r.data.total_pages;
  loadNextBtn.addEventListener('click', onLoadNext);
  loadPrevBtn.addEventListener('click', onLoadPrev);
  loadFirstBtn.addEventListener('click', onLoadFirst);
  loadLastBtn.addEventListener('click', onLoadLast);
  render(r.data.results);
  // console.log(r.data)
})

let currentPage = parseInt(localStorage.getItem("current-page"), 10);
let totalPages = parseInt(localStorage.getItem("total-pages"), 10);

async function onLoadNext() {
  Notiflix.Loading.remove();
  filmAPI.nextPage();
  const nextPage = await filmAPI.searchTrendings();
    localStorage.setItem("current-page", `${nextPage.data.page}`);
    currentPage = parseInt(localStorage.getItem("current-page"), 10);
    render(nextPage.data.results);
    // console.log("currentPage " + currentPage);
    // console.log("totalPages " + totalPages);
    Notiflix.Loading.remove();
}

async function onLoadPrev() {
  Notiflix.Loading.remove();
  filmAPI.prevPage();

  const prevPage = await filmAPI.searchTrendings();
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

  const firstPage = await filmAPI.searchTrendings();
  localStorage.setItem("current-page", `${firstPage.data.page}`);
  currentPage = parseInt(localStorage.getItem("current-page"), 10);
  render(firstPage.data.results);
  Notiflix.Loading.remove();
}

async function onLoadLast() {
  Notiflix.Loading.remove();
  totalPages = parseInt(localStorage.getItem("total-pages"), 10);
  const lastPage = await filmAPI.searchTrendingsPagination(totalPages);

  localStorage.setItem("current-page", `${totalPages}`);
  
  render(lastPage.data.results);
  Notiflix.Loading.remove();
}
