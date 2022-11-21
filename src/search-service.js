export default class SearchApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log(this);
    const options = {
      API_KEY: '31493701-066eddf0638dc5b7781a5a354',
      URL: 'https://pixabay.com/api/',
    };

    fetch(
      `${options.URL}?key=${options.API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        console.log(this);
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
