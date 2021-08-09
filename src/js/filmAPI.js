import axios from 'axios'

const KEY = '64d8aa762e5eca1f8be6b3971b76ddad'
const URL = 'https://api.themoviedb.org/3'

export default class FilmAPI {
    constructor() {
        this.searchQuery = ''
        this.page = 1 
     }
    
    get query() {
        return this.searchQuery
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery
    }

    async searchTrendings() {
        return await axios.get(`${URL}/trending/all/day?api_key=${KEY}&page=${this.page}`)
    }

    // async movieSearch() {
    //     return await axios.get(`${URL}/search/movie?api_key=${KEY}&query=${this.searchQuery}&page=${this.page}`)
    // }

    // async detailedMovieSearch() {
    //     return await axios.get()
    // }

    resetPage() {
        this.page = 1
    }
}

