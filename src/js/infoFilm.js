import FilmAPI from './filmAPI'
import getRefs from './get-refs';
import detailFilm from '../templates/detail-film.hbs';
import onAddRemovDataBtn from '../js/btnAddRemov';
import Notiflix from 'notiflix';

const filmAPI = new FilmAPI;
const refs = getRefs();


export default function onInfoFilmAPI(id) {
    filmAPI.movieById(id).then(film => {
        console.log(film.data);
        const data = film.data;

        refs.infoFilmContainer.insertAdjacentHTML('beforeend', detailFilm(data));
        const btnAddWatched = document.querySelector('.info-btn-container');
        btnAddWatched.addEventListener('click', onAddRemovDataBtn);
        Notiflix.Loading.remove();
    })
}