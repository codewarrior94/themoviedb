import FilmAPI from './filmAPI';

const filmAPI = new FilmAPI;


export default function onInfoFilmAPI(id, filmDataLS) {
    filmAPI.movieById(id, filmDataLS).then(film => {
        console.log(film, filmDataLS);
        if (film) {
            filmAPI.renderModal(film, filmDataLS)
        }
    })
}

