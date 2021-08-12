import FilmAPI from './filmAPI' 

const filmAPI = new FilmAPI;

filmAPI.searchTrendings().then(r => console.log(r))