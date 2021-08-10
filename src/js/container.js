import FilmAPI from './filmAPI'
import getRefs from './get-refs';

const filmAPI = new FilmAPI;
const refs = getRefs();

filmAPI.searchTrendings().then(r => console.log(r))

//filmAPI.movieById(2).then(r => console.log(r))