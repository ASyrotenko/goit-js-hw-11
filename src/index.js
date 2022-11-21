import SearchApiService from './search-service.js';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryContainer: document.querySelector('.gallery'),
};

const searchApiService = new SearchApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  hideLoadMoreBtn();
  searchApiService.query = e.currentTarget.elements.searchQuery.value;
  searchApiService.resetPage();
  searchApiService.fetchArticles().then(hits => {
    clearMarkup();
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        { clickToClose: true }
      );
    }
    renderSearchMarkup(hits);
    showLoadMoreBtn();
  });
}

function onLoadMore() {
  searchApiService.fetchArticles().then(renderSearchMarkup);
}

function renderSearchMarkup(hits) {
  const markup = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views</b>
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <b>${downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.galleryContainer.innerHTML = '';
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
