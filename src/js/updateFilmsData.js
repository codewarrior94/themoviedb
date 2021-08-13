import * as data from '../templates/genres.json'
const genres = data.genres

export default function update(notUpdFilmsList) {
    const updatedFilmData = []

    // change id => name
    for (const notUpdFilm of notUpdFilmsList) {
        for (let b = 0; b < notUpdFilm.genre_ids.length; b++) {
            let countOfMatches = 0
            for (let i = 0; i < notUpdFilmsList.length-1; i++) {
                // console.log(genres[i].id)
                if (notUpdFilm.genre_ids[b] === genres[i].id) {
                    notUpdFilm.genre_ids[b] = genres[i].name
                    countOfMatches++
                }                               
            }
            if (countOfMatches === 0) {
                notUpdFilm.genre_ids[b] = "Other"
            }
        }
        if (notUpdFilm.genre_ids.length === 0) {
            notUpdFilm.genre_ids = ["None"]
        }
    }
    
    // change number of genres if there are more than 2
    for (const item of notUpdFilmsList) {
        let film = {}

        if (item.genre_ids.length > 2) {
            film = {
                ...item,
                genre_ids: item.genre_ids[0] + ", " + item.genre_ids[1] + " ..."
            }
            updatedFilmData.push(film)
            } else {
            film = {
                ...item,
                genre_ids: item.genre_ids.join(", ")
                }
            updatedFilmData.push(film)
        }   
    }

    // check the key of year and slice it
    for (const film of updatedFilmData) {
        if (film.hasOwnProperty("release_date")) {
            film.release_date = film.release_date.substr(0,4)
        }
        if (Object.keys(film).includes("first_air_date")) {
            film.first_air_date = film.first_air_date.substr(0,4)
        }
    }

    return updatedFilmData
}