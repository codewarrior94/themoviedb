import filmCardInList from "../templates/filmCardInList.hbs";
import getRefs from "./get-refs"

let watchedBtn = ''
let queueBtn = ''

getRefs().myLibBtn.addEventListener("click", onMyLibClick)

function onMyLibClick() {
    watchedBtn = document.querySelector(".btn-watched")
    watchedBtn.addEventListener("click", showWathched)
    queueBtn = document.querySelector(".btn-queue")
    queueBtn.addEventListener("click", showQueue)
    showWathched()
}

function showWathched() {
    // let watchedListLength = JSON.parse(localStorage.getItem("watched")).length
    const watchedListLength = 0
    if (watchedListLength) {
        const watchedFilmList = JSON.parse(localStorage.getItem("watched"))
        getRefs().filmList.innerHTML = watchedFilmList.map(filmCardInList).join("")
    } else {
        showMessageEmpty()
    }
}

function showQueue() {
    let queueListLength = JSON.parse(localStorage.getItem("watched")).length

    if (queueListLength) {
        const queueFilmList = JSON.parse(localStorage.getItem("queue"))
        getRefs().filmList.innerHTML = queueFilmList.map(filmCardInList).join("")  
    } else {
        showMessageEmpty()     
    }
}

function showMessageEmpty() {
    // const dataToShow = `<div class="empty-film-list"><p>Heeeyy! You didn't add any film:( Oooopss.... </p>
    // </div>`
    console.log(dataToShow)
    getRefs().filmList.insertAdjacentHTML('beforeend', getRefs().filmList)
}