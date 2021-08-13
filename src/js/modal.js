import getRefs from './get-refs';
import onInfoFilmAPI from './infoFilm';


const refs = getRefs();

function onCloseInfoFilm(ev){
    onToggleClass()
    refs.infoFilmContainer.innerHTML = '';
  document.removeEventListener('keydown', onEventKey);
  refs.infoFilmIsOpen.removeEventListener('click', onCloseInfoFilm);
  refs.closeInfoBtn.removeEventListener('click', onCloseInfoFilm);
    const idFilm = ev.target;
}

refs.mainContainer.addEventListener('click', onOpenInfoFilm);
function onOpenInfoFilm(ev) {
  const idFilm = ev.target.dataset.id;
    if (idFilm > 0) {
        onToggleClass()
        onInfoFilmAPI(idFilm);
      document.addEventListener('keydown', onEventKey)
      console.log(refs.closeInfoBtn);
      refs.infoFilmIsOpen.addEventListener('click', onCloseInfoFilm);
      refs.closeInfoBtn.addEventListener('click', onCloseInfoFilm);
    }
}

function onToggleClass() {
  refs.infoFilmIsOpen.classList.toggle('backdrop--is-hidden');
  refs.bodyEl.classList.toggle('toggle_scroll');
}

function onEventKey(ev) {
  console.log(ev.code);
    if (ev.code === 'Escape') {
      onCloseInfoFilm();
      onToggleClass()
    }
    // else if (ev.code === 'ArrowLeft') {
      
    // } else if (ev.code === 'ArrowRight') {
      
    // }
}