export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 5;
    this.loadPages = 0;
  }

  fetchArticles() {
    const options = {
      API_KEY: '31493701-066eddf0638dc5b7781a5a354',
      URL: 'https://pixabay.com/api/',
    };

    return fetch(
      `${options.URL}?key=${options.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    )
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        this.incrementPage();

        const obj = {
          hits,
          totalHits,
        };
        return obj;
      })
      .catch(error => console.log(error.message));
  }

  incrementPage() {
    this.page += 1;
    this.loadPages += this.perPage;
  }

  resetPage() {
    this.page = 1;
    this.loadPages = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
