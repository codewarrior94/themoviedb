import FilmAPI from './filmAPI'
import getRefs from './get-refs';
import detailFilm from '../templates/detail-film.hbs';
import onAddRemovDataBtn from '../js/btnAddRemov';
import Notiflix from 'notiflix';

const filmAPI = new FilmAPI;
const refs = getRefs();


export default async function onInfoFilmAPI(id) {
    filmAPI.movieById(id).then(film => {
        console.log(film.status == 404);
        const data = film.data;
        if (film.status == 404) {
                throw Error("Oops, there is no country with that name");
            }
        refs.infoFilmContainer.insertAdjacentHTML('beforeend', detailFilm(data));
        const btnAddWatched = document.querySelector('.info-btn-container');
        btnAddWatched.addEventListener('click', onAddRemovDataBtn);
        Notiflix.Loading.remove();
    })
    .catch(error)
}

function error(e) {
    console.log(e);
    Notiflix.Loading.remove();
}