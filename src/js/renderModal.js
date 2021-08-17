import getRefs from './get-refs';
import detailFilm from '../templates/detailFilm.hbs';
import LocalStorage from './localStorageMovies';
import Notiflix from 'notiflix';
import { updateInfoFilms, updateDelInfoFilms, disabledBtn } from './updateInfoFilms';


const refs = getRefs();
const localStg = new LocalStorage;

export default function renderModal(film={}, filmDataLoS='') {
    let data = film.data ? film.data : film;
    let filmDataLS = filmDataLoS ? JSON.parse(filmDataLoS) : filmDataLoS;
    const err = data.response;
    const errMesage = err ? "The resource you requested has been deleted!" : "The resource you requested could not be found!";
    refs.infoFilmIsOpen.classList.toggle('backdrop--is-hidden');
    refs.bodyEl.classList.toggle('toggle_scroll');

    if (err || filmDataLS.adult === '') {
        data = updateDelInfoFilms(filmDataLS)
    }
    data = updateInfoFilms(data)

    refs.infoFilmContainer.insertAdjacentHTML('beforeend', detailFilm(data));

    if (err  || filmDataLS.adult === '') {
        disabledBtn();
        Notiflix.Report.failure('Oops, something went wrong!!!',
            `${errMesage} <br><br>- Sory!!!`,
            'Click');
    }
    if (!refs.infoFilmIsOpen.classList.contains("backdrop--is-hidden") && !err) {
        localStg.changeDataBtn(data.id);
        localStg.eventWatchedQueueBtn(filmDataLoS)
    }
    Notiflix.Loading.remove();
}