import getRefs from './get-refs';
import onInfoFilmAPI from './infoFilm';
import LocalStorage from './localStorageMovies';

const refs = getRefs();
const localStg = new LocalStorage;


refs.closeInfoBtn.addEventListener('click', onCloseInfoFilm);

function onCloseInfoFilm(ev) {
    ev.stopPropagation();
    if (ev.code === 'Escape'
        || ev.target.classList.contains('backdrop')
        || ev.target.classList.contains('icon')) {
        onToggleClass()
        refs.infoFilmContainer.innerHTML = '';
        document.removeEventListener('keydown', onEventKey);
        localStg.removeEvent();
    }
}

refs.mainContainer.addEventListener('click', onOpenInfoFilm);
function onOpenInfoFilm(ev) {
    const film = ev.target.dataset.film;
    if (film) {
        const idFilm = JSON.parse(film).id;
        onInfoFilmAPI(idFilm, film);
        document.addEventListener('keydown', onEventKey)
    }
}

function onToggleClass() {
    refs.infoFilmIsOpen.classList.toggle('backdrop--is-hidden');
    refs.bodyEl.classList.toggle('toggle_scroll');
}

function onEventKey(ev) {
    if (ev.code === 'Escape') {
        onCloseInfoFilm(ev);
    }
}

refs.infoFilmIsOpen.addEventListener('click', onCloseInfoFilm);