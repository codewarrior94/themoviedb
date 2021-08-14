import update from "./updateFilmsData"
import filmCardInList from "../templates/filmCardInList.hbs";
const filmList = document.querySelector(".film-list")

export default function render(notUpdFilmsList) {
    // console.log(notUpdFilmsList)
    const updFilmsList = update(notUpdFilmsList)
    const dataToRender = updFilmsList.map(filmCardInList).join(" ")
    filmList.innerHTML = dataToRender
    }