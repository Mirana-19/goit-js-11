import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './pixabayApi';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
let page = 1;
refs.form.addEventListener('submit', onFormSubmit);
refs.loadMore.addEventListener('click', onLoadMoreBtn);

async function onFormSubmit(e) {
  e.preventDefault();
  refs.loadMore.classList.add('visually-hidden');
  page = 1;
  refs.gallery.innerHTML = '';
  makeRequest();
}

getImages('cat', 2);

function onLoadMoreBtn(e) {
  page += 1;
  console.log(e);
  makeRequest();
}

async function makeRequest() {
  const query = refs.form.elements.searchQuery.value;
  const responce = await getImages(query, page);
  const images = responce.data.hits;

  if (!images.length) {
    return page === 1
      ? Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      : Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
  }

  if (page === 1) {
    refs.loadMore.classList.remove('visually-hidden');
  }
  renderGalleryCards(images);
  new SimpleLightbox('.gallery a', {});
}

function createGalleryCardMarkup(item) {
  return `
  <div class="photo-card">
     <a href="${item.largeImageURL}"> <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width=300 height=150 /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes ${item.likes}</b>
        </p>
        <p class="info-item">
          <b>Vievs ${item.views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${item.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${item.downloads}</b>
        </p>
      </div>
    </div>`;
}

function renderGalleryCards(items) {
  const markup = items.map(item => createGalleryCardMarkup(item)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
