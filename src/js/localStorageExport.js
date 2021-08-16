import filmCardInList from "../templates/filmCardInList.hbs";

const myLibBtn = document.getElementById("libraryBtn")
const filmList = document.querySelector(".film-list")

let watchedBtn = ''
let queueBtn = ''

myLibBtn.addEventListener("click", onMyLibClick)

function onMyLibClick() {
    watchedBtn = document.querySelector(".btn-watched")
    console.log(watchedBtn)
    watchedBtn.addEventListener("click", showWathched)
    queueBtn = document.querySelector(".btn-queue")
    queueBtn.addEventListener("click", showQueue)
    showWathched()
}

function showWathched() {
    const watchedFilmList = JSON.parse(localStorage.getItem("watched"))
    filmList.innerHTML = watchedFilmList.map(filmCardInList).join("") 
}

function showQueue() {
    const queueFilmList = JSON.parse(localStorage.getItem("queue"))
    filmList.innerHTML = queueFilmList.map(filmCardInList).join("")     
}

