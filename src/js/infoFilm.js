import FilmAPI from './filmAPI';
import renderModal from './renderModal';

const filmAPI = new FilmAPI;


export default function onInfoFilmAPI(id, filmDataLS) {
    filmAPI.movieById(id, filmDataLS).then(film => {
        if (film) {
            renderModal(film, filmDataLS)
        console.log(film, filmDataLS);
        }
    })
}
