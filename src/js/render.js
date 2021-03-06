import update from "./updateFilmsData"
import filmCardInList from "../templates/filmCardInList.hbs";
import Notiflix from 'notiflix';

const filmList = document.querySelector(".film-list");

export default function render(notUpdFilmsList) {
  const updFilmsList = update(notUpdFilmsList)
  const dataToRender = updFilmsList.map(filmCardInList).join(" ")
  filmList.innerHTML = dataToRender;
  Notiflix.Loading.remove();
}