import headerMain from '../templates/headerMain.hbs';
import headerLibrary from '../templates/headerLibrary.hbs';
const wrapper = document.querySelector('.main-wrapper');
const homeBtn = document.getElementById("homeBtn");
const libraryBtn = document.getElementById("libraryBtn");

libraryBtn.addEventListener('click', onLibraryRedirect);

function onLibraryRedirect(e) {
  e.preventDefault();
  wrapper.innerHTML = headerLibrary();
};