import getRefs from './get-refs';
import detailFilm from '../templates/detail-film.hbs';
import LocalStorage from './localStorageMovies';
import Notiflix from 'notiflix';
import { updateInfoFilms, updateDelInfoFilms, disabledBtn } from './updateInfoFilms';


const refs = getRefs();
const localStg = new LocalStorage;

export default function renderModal(film={}, filmDataLS='') {
        let data = film.data ? film.data : film;
        const err = data.response;
        refs.infoFilmIsOpen.classList.toggle('backdrop--is-hidden');
        refs.bodyEl.classList.toggle('toggle_scroll');
        if (err) {
            data = updateDelInfoFilms(JSON.parse(filmDataLS))
        }
        data = updateInfoFilms(data)
        refs.infoFilmContainer.insertAdjacentHTML('beforeend', detailFilm(data));
        if (err) {
            disabledBtn()
        }
        if (!refs.infoFilmIsOpen.classList.contains("backdrop--is-hidden") && !err) {
            localStg.changeDataBtn(data.id);
            localStg.eventWatchedQueueBtn(filmDataLS)
        }
        Notiflix.Loading.remove();
}