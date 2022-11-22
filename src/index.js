import SearchApiService from './search-service.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');

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
  searchApiService.fetchArticles().then(({ hits, totalHits }) => {
    clearMarkup();
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        { clickToClose: true }
      );
    }
    renderSearchMarkup(hits);
    gallery.refresh();
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`, {
      clickToClose: true,
    });
    showLoadMoreBtn();
  });
}

function onLoadMore() {
  searchApiService.fetchArticles().then(({ hits, totalHits }) => {
    if (searchApiService.loadPages > totalHits) {
      hideLoadMoreBtn();
      return Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderSearchMarkup(hits);
    gallery.refresh();
  });
}

function renderSearchMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `
    <div class="photo-card">
  <a class='photo-card__link' href='${largeImageURL}'><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
      }
    )
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