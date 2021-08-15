import FilmAPI from './filmAPI'

const filmAPI = new FilmAPI;


export default function onInfoFilmAPI(id) {
    filmAPI.movieById(id).then(film => {
        console.log(film);
        if (film) {
            filmAPI.renderModal(film)
        }
    })
}

