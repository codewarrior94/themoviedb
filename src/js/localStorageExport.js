import filmCardInList from "../templates/filmCardInList.hbs";
import getRefs from "./getRefs";
//Vika
import headerLibrary from '../templates/headerLibrary.hbs';
//Vika

let watchedBtn = ''
let queueBtn = ''
let isWatched = false;
let isQueue = false;
//Vika
const wrapper = document.querySelector('.header');
const libraryBtn = document.getElementById('libraryBtn');
const pageWrapper = document.querySelector('.page__wrapper');
libraryBtn.addEventListener('click', hidePagination);
function hidePagination() {
  pageWrapper.classList.add('unvisible')
}
//Vika

getRefs().myLibBtn.addEventListener("click", onMyLibClick)

function onMyLibClick(ev) {
    //Vika
    ev.preventDefault();
    wrapper.innerHTML = headerLibrary();
    //Vika
    watchedBtn = document.querySelector(".btn-watched")
    watchedBtn.addEventListener("click", onShowWathched)
    queueBtn = document.querySelector(".btn-queue")
    queueBtn.addEventListener("click", onShowQueue)
    onToggleClass(watchedBtn, 'button--checked')
    showWathched()
}

function onShowWathched(ev) {
    if (!ev.target.classList.contains('button--checked')) {
        onToggleClass(watchedBtn, 'button--checked', queueBtn)
    }
    showWathched()
}

function showWathched() {
    isWatched = true;
    isQueue = false;
    let watchedList = localStorage.getItem("watched");
    if (watchedList) {
        if (JSON.parse(watchedList).length) {
            const watchedFilmList = JSON.parse(localStorage.getItem("watched"))
            getRefs().filmList.innerHTML = watchedFilmList.map(filmCardInList).join("")
        } else {
            showMessageEmpty()
        }
    } else {
        showMessageEmpty()
    }
}

function onShowQueue(ev) {
    if (!ev.target.classList.contains('button--checked')) {
        onToggleClass(queueBtn, 'button--checked', watchedBtn)
    }
    showQueue()    
}

function showQueue() {
    isWatched = false;
    isQueue = true;
    let queueList = localStorage.getItem("queue")
    if (queueList) {
        if (JSON.parse(queueList).length) {
            const queueFilmList = JSON.parse(localStorage.getItem("queue"))
            getRefs().filmList.innerHTML = queueFilmList.map(filmCardInList).join("")
        } else {
            showMessageEmpty()
        }
    } else {
        showMessageEmpty()
    }
}

function showMessageEmpty() {
    const dataToShow = `
    <div class="empty-film-list">
        <p class="empty-film-list--row">Heeeyy!</p>
        <p class="empty-film-list--row">You didn't add any film:(</p>
        <p class="empty-film-list--row">Oooopss.... </p>
    </div>`
    getRefs().filmList.innerHTML = dataToShow
}

function onToggleClass(elNew = '', cls= '', elOld = '' ) {
    elNew.classList.toggle(cls);
    if (elOld) {
        elOld.classList.toggle(cls);
    }
}
export{showWathched, showQueue, isWatched, isQueue}