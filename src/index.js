import SearchApiService from './search-service.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const searchApiService = new SearchApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  searchApiService.query = e.currentTarget.elements.searchQuery.value;

  searchApiService.fetchArticles();
}

function onLoadMore() {
  searchApiService.fetchArticles();
}
