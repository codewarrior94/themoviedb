import './partials/sass/main.scss'
import SimpleLightbox from 'simplelightbox';
import FilmAPI from './partials/js/filmAPI';

const filmAPI = new FilmAPI;

filmAPI.searchTrendings().then(r => console.log(r))