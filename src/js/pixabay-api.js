import axios from 'axios';

const API_KEY = '50342970-c77e3a3b99b31ba7a45091d0e';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error(
        'Sorry, there are no images matching your search query. Please try again!',
        error
      );
      throw error;
    });
}
