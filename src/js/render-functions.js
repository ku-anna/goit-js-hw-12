import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

const loadMoreBtn = document.querySelector('.load-more');
const loaderMessage = document.querySelector('.loader2-message');

export function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}
console.log('Showind load more button');

export function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

export function showLoaderMessage() {
  loaderMessage.classList.remove('hidden');
}
console.log('Showing "Loading images, please wait..."');
export function hideLoaderMessage() {
  loaderMessage.classList.add('hidden');
}
export function checkEndOfCollection(currentPage, totalHits, perPage) {
  const totalPages = Math.ceil(totalHits / perPage);
  if (currentPage >= totalPages) {
    hideLoadMore();
    iziToast.info({
      title: 'End of results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}

export function scrollAfterLoad() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
