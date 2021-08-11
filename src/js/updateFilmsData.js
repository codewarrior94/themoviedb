import * as data from '../templates/genres.json'
const genres = data.genres

export default function update(notUpdFilmsList) {
    const updatedFilms = []

    // change id => name
    for (let a = 0; a < notUpdFilmsList.length; a++) {
        // console.log(changedNames[a])
        for (let b = 0; b < notUpdFilmsList[a].genre_ids.length; b++) {
            for (let i = 0; i < notUpdFilmsList.length-1; i++) {
                // console.log(genres[i].id)
                if (notUpdFilmsList[a].genre_ids[b] === genres[i].id) {
                    notUpdFilmsList[a].genre_ids[b] = genres[i].name

                }
                
            }
        }
    }

    for (let i = 0; i < notUpdFilmsList.length; i++) {
        let film = {}

        if (notUpdFilmsList[i].genre_ids.length > 2) {
        film = {
            ...notUpdFilmsList[i],
            genre_ids: notUpdFilmsList[i].genre_ids[0] + ", " + notUpdFilmsList[i].genre_ids[1] + ", ..."
        }
        updatedFilms.push(film)
        } else {
        film = {
            ...notUpdFilmsList[i],
            genre_ids: notUpdFilmsList[i].genre_ids.join(", ")
            }
                        
        // console.log(notUpdFilmsList[i])
        updatedFilms.push(film)
         }


    }

    console.log(updatedFilms)
    
    return updatedFilms
}