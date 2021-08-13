import headerLibrary from '../templates/headerLibrary.hbs';
const wrapper = document.querySelector('.header');
const libraryBtn = document.getElementById("libraryBtn");

libraryBtn.addEventListener('click', onLibraryRedirect);

function onLibraryRedirect(e) {
  e.preventDefault();
  wrapper.innerHTML = headerLibrary();
};