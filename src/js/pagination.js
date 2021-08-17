const loadNextBtn = document.querySelector('.load-next');
const loadPrevBtn = document.querySelector('.load-prev');
const loadLastBtn = document.querySelector('.load-last');
const loadFirstBtn = document.querySelector('.load-first');

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
  if (currentPage === nextPage.data.total_pages) {
    loadNextBtn.disabled = true;
  } else {
    render(nextPage.data.results);
  }
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