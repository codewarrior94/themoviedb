import FilmAPI from './filmAPI'
import render from './render';

const filmAPI = new FilmAPI;

filmAPI.searchTrendings().then(r => render(r.data.results))


