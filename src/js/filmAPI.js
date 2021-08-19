import axios from 'axios'
import Notiflix from 'notiflix';
import renderModal from './renderModal';

const KEY = '64d8aa762e5eca1f8be6b3971b76ddad';
const URL = 'https://api.themoviedb.org/3';

export default class FilmAPI {
    constructor() {
        this.searchQuery = 'титаник'
        this.page = 1;
        this.renderModal = renderModal;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }

    async searchTrendings() {
        return await axios.get(`${URL}/trending/movie/day?api_key=${KEY}&page=${this.page}`)
    }

    async movieById(movieId) {
        try {
            Notiflix.Loading.hourglass()
            return await axios.get(`${URL}/movie/${movieId}?api_key=${KEY}&language=en-US`);
        }
        catch (err) {
            this.renderModal(err)
            Notiflix.Loading.remove();
        }
    }
  
    async searchByKeyword() {
        Notiflix.Loading.hourglass()
        return await axios.get(`${URL}/search/movie?api_key=${KEY}&page=${this.page}&query=${this.searchQuery}`)
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

    async searchByKeywordPagination(page) {
      Notiflix.Loading.hourglass()
      this.page = page;
      return await axios.get(`${URL}/search/movie?api_key=${KEY}&page=${this.page}&query=${this.searchQuery}`)
    }
  
    async searchTrendingsPagination(page) {
      Notiflix.Loading.hourglass()
      this.page = page;
      return await axios.get(`${URL}/trending/movie/day?api_key=${KEY}&page=${this.page}`)
    }
  
    nextPage() {
      this.page += 1
    }
    
    prevPage() {
      this.page -= 1
    }
}

