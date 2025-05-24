import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMore,
  showLoadMore,
  showLoaderMessage,
  hideLoaderMessage,
  scrollAfterLoad,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
const perPage = 15;

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

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMore();
    } else {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
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
  showLoaderMessage();
  hideLoadMore();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);
    createGallery(data.hits);
    scrollAfterLoad();

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage < totalPages) {
      showLoadMore();
    } else {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    hideLoaderMessage();
  }
});
