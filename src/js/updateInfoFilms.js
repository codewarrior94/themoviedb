function updateInfoFilms(dataFilm) {
    for (const key in dataFilm) {
        if (!dataFilm[key] && ((key === 'title') || (key === 'original_title') || (key === 'overview'))) {
            dataFilm[key] = 'None';
        }
        else if (key === 'genres' && dataFilm[key].length === 0) {
            dataFilm[key] = [{ name: 'None' }];
        }
        else if (key === 'poster_path' && !dataFilm[key].includes('https://')) {
            dataFilm[key] = 'https://image.tmdb.org/t/p/w400'+dataFilm[key];
        }
    }
    return dataFilm
}

function updateDelInfoFilms(dataFilm) {
    dataFilm.title = dataFilm.original_title;
    dataFilm.genres = dataFilm.genres.split(',');
    for (let i = 0; i < dataFilm.genres.length; i++){
        dataFilm.genres[i] = {name: dataFilm.genres[i]}
    }
    return dataFilm
}

function disabledBtn() {
    const btn = document.querySelectorAll('.info-btn-container button');
    btn.forEach(el => {
        el.setAttribute('disabled', true);
        el.classList.add('disabled');
    })
}

export {updateInfoFilms, updateDelInfoFilms, disabledBtn}