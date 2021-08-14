import getRefs from './get-refs';
import onInfoFilmAPI from './infoFilm';


const refs = getRefs();



refs.closeInfoBtn.addEventListener('click', onCloseInfoFilm);
function onCloseInfoFilm(ev) {
    ev.stopPropagation();
    if (ev.code === 'Escape'
            || ev.target.classList.contains('backdrop')
            || ev.target.classList.contains('icon')) {
        onToggleClass()
        refs.infoFilmContainer.innerHTML = '';
        document.removeEventListener('keydown', onEventKey);
    }
}

refs.mainContainer.addEventListener('click', onOpenInfoFilm);
function onOpenInfoFilm(ev) {
    const idFilm = ev.target.dataset.id;
    if (idFilm > 0) {
        onInfoFilmAPI(idFilm);
        document.addEventListener('keydown', onEventKey)
    }
}

export default function onToggleClass() {
    refs.infoFilmIsOpen.classList.toggle('backdrop--is-hidden');
    refs.bodyEl.classList.toggle('toggle_scroll');
}

function onEventKey(ev) {
    if (ev.code === 'Escape') {
        onCloseInfoFilm(ev);
    }
}

refs.infoFilmIsOpen.addEventListener('click', onCloseInfoFilm);