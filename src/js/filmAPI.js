import axios from 'axios'
import Notiflix from 'notiflix';

import getRefs from './get-refs';
import detailFilm from '../templates/detail-film.hbs';
import LocalStorage from './localStorageMovies'
import {updateInfoFilms, updateDelInfoFilms, disabledBtn} from './updateInfoFilms'

const KEY = '64d8aa762e5eca1f8be6b3971b76ddad'
const URL = 'https://api.themoviedb.org/3'

const refs = getRefs();
const localStg = new LocalStorage;

export default class FilmAPI {
    constructor() {
        this.searchQuery = 'титаник'
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }

    async searchTrendings() {
        return await axios.get(`${URL}/trending/all/day?api_key=${KEY}&page=${this.page}`)
    }

    async movieById(movieId, filmDataLS) {
        try {
            Notiflix.Loading.hourglass()
            return await axios.get(`${URL}/movie/${movieId}?api_key=${KEY}&language=en-US`);
        }
        catch (err) {
            this.renderModal(err, filmDataLS)
            console.error("Error response:");
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers); // ***
            Notiflix.Loading.remove();
        }
    }
  
    async searchByKeyword() {
        Notiflix.Loading.hourglass()
        return await axios.get(`${URL}/search/movie?api_key=${KEY}&page=${this.page}&query=${this.searchQuery}`)
    }

    // async movieSearch() {
    //     return await axios.get(`${URL}/search/movie?api_key=${KEY}&query=${this.searchQuery}&page=${this.page}`)
    // }

    // async detailedMovieSearch() {
    //     return await axios.get()
    // }

    resetPage() {
        this.page = 1
    }

    renderModal(film, filmDataLS) {
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
}

