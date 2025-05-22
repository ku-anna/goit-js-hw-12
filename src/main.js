import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = input.value.trim();
  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;
  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'No images found for this query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    if (data.totalHits > 15) showLoadMore();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMore();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);
    createGallery(data.hits);
    const alreadyLoaded = currentPage * 15;
    if (alreadyLoaded < data.totalHits) {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function hideLoadMore() {
  loadMoreBtn.classList.add('hidden');
}
console.log('Showing Load More button');

function showLoadMore() {
  loadMoreBtn.classList.remove('hidden');
}

const loaderMessage = document.querySelector('.loader-message');

function showLoaderMessage() {
  loaderMessage.classList.remove('hidden');
}

function hideLoaderMessage() {
  loaderMessage.classList.add('hidden');
}
