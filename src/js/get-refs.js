export default function getRefs() {
    return {
        searchMovie: document.querySelector('.search-movie'),
        infoMovie: document.querySelector('.info_movie'),
        //modal info film
        infoFilmContainer: document.querySelector('.info_film_container'),
        infoFilmIsOpen: document.querySelector('.backdrop'),
        closeInfoBtn: document.querySelector('.icon'),
        bodyEl: document.querySelector('body'),
        mainContainer: document.querySelector('.container'),
        //modal info film
    };
}