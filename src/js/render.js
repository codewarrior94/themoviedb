import update from "./updateFilmsData"
import filmCardInList from "../templates/filmCardInList.hbs";
const filmList = document.querySelector(".film-list")

export default function render(notUpdFilmsList) {
  const updFilmsList = update(notUpdFilmsList);
  const dataToRender = updFilmsList.map(filmCardInList).join(" ");
  filmList.innerHTML = dataToRender;
  for (const film of updFilmsList) {
    const index = (updFilmsList.indexOf(film) + 1);
    film.index = index;
    console.log(film.index);
  }
  return film.index;
}