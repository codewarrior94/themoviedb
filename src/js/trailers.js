import getRefs from './get-refs';

const refs = getRefs();
refs.mainContainer.addEventListener('click', createLink)

const link = document.createElement('a');

function createLink(e) {
   const film = e.target.dataset.film;
   link.setAttribute("class", 'trailer-link');
   link.setAttribute("target", '_blank');
   link.innerHTML = 'watch trailer';

   if (e.target.classList.contains('film-poster')) {
      const idFilm = JSON.parse(film).id;
      
      const KEY = '64d8aa762e5eca1f8be6b3971b76ddad'
      const URL = `https://api.themoviedb.org/3/movie/${idFilm}/videos?api_key=${KEY}&language=en-US`;
      fetch(URL)
         .then(response => response.json())
         .then(data => {
            const id = data.results[0].key;
            link.setAttribute("href",`https://www.youtube.com/watch?v=${id}`);
      })
   }
   refs.infoFilmContainer.insertAdjacentElement("beforeend", link);
}