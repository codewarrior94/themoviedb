

export default class LocalStorage{
    constructor() {
        this.dataFilmLS = null;
    }

    eventWatchedQueueBtn(filmDataLS) {
        this.dataFilmLS = JSON.parse(filmDataLS);
        const btnLibrary = document.querySelector('.info-btn-container');
        btnLibrary.addEventListener('click', this.onBtnAddToWatched.bind(this));//удалить
    }

    onBtnAddToWatched(ev) {
        const elem = ev.target;
        const idFilm = elem.dataset.id
        if (elem.classList.contains("btn-add-watched")) {
            this.addInLosalStorage('watched');
            this.dataBtn(elem, "delete watched", "btn-del-watched", "btn-add-watched");
        }
        else if (elem.classList.contains("btn-del-watched")) {
            this.delInLosalStorage('watched', idFilm);
            this.dataBtn(elem, "add to Watched", "btn-add-watched", "btn-del-watched");
        }
        else if (elem.classList.contains("btn-add-queue")) {
            this.addInLosalStorage('queue');
            this.dataBtn(elem, "delete queue", "btn-del-queue", "btn-add-queue");
        }
        else if (elem.classList.contains("btn-del-queue")) {
            this.delInLosalStorage('queue', idFilm);
            this.dataBtn(elem, "add to queue", "btn-add-queue", "btn-del-queue");
        }
    }

    addInLosalStorage(nameKey) {
        let dataLS = localStorage.getItem(nameKey);
        if (!dataLS) {
            dataLS = '[]';
        }
        const dataJS = JSON.parse(dataLS);
        dataJS.push(this.dataFilmLS);
        this.setItemLS(nameKey, dataJS)
    }

    delInLosalStorage(nameKey, idFilm) {
        const dataLS = localStorage.getItem(nameKey);
        const dataJS = JSON.parse(dataLS);
        for (let i = 0; i < dataJS.length; i++) {
            if (dataJS[i].id == idFilm) {
                dataJS.splice(i, 1)
            }
        }
        this.setItemLS(nameKey, dataJS)
    }

    setItemLS(nameKey, dataJS) {
        const dataLS = JSON.stringify(dataJS);
        localStorage.setItem(nameKey, dataLS);
    }

    getItemLS(nameKey) {
        return localStorage.getItem(nameKey);
    }

    changeDataBtn(filmId) {
        this.renderWatchedOrQueue('watched', filmId);
        this.renderWatchedOrQueue('queue', filmId);
    }
    
    renderWatchedOrQueue(nameKey, filmId) {
        const dataLS = this.getItemLS(nameKey);
        if (dataLS) {
            const parseWatchedLS = JSON.parse(dataLS)
            for (let i = 0; i < parseWatchedLS.length; i++) {

                if (parseWatchedLS[i].id == filmId) {
                    const elem = document.querySelector(`.info-btn-container .${nameKey}`);
                    this.dataBtn(elem, `delete ${nameKey}`, `btn-del-${nameKey}`, `btn-add-${nameKey}`);
                    break
                }
            }
        }
    }

    dataBtn(elem, btnText, newCls, oldCls) {
        elem.textContent = btnText;
        elem.classList.replace(oldCls, newCls);
    }

    removeEvent() {
        document.removeEventListener('click', this.onBtnAddToWatched);
    }
}