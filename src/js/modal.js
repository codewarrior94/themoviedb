import getRefs from './get-refs';
import onInfoFilmAPI from './infoFilm';


const refs = getRefs();



refs.closeInfoBtn.addEventListener('click', onCloseInfoFilm);
function onCloseInfoFilm(ev){
    onToggleClass()
    refs.infoFilmContainer.innerHTML = '';
    document.removeEventListener('keydown', onEventKey);
    const idFilm = ev.target.dataset;
    console.log(idFilm)
}

refs.mainContainer.addEventListener('click', onOpenInfoFilm);
function onOpenInfoFilm(ev) {
    const idFilm = ev.target.dataset.id;
    if (idFilm > 0) {
        onToggleClass()
        onInfoFilmAPI(idFilm);
        document.addEventListener('keydown', onEventKey)
    }
}

function onToggleClass() {
    refs.infoFilmIsOpen.classList.toggle('backdrop--is-hidden');
    refs.bodyEl.classList.toggle('toggle_scroll');
}

function onEventKey(ev) {
    if (ev.code === 'Escape') {
        onCloseInfoFilm();
    }
}

refs.infoFilmIsOpen.addEventListener('click', onCloseInfoFilm);