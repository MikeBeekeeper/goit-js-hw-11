import Notiflix from 'notiflix';
const axios = require('axios');
const ENDPOINT = 'https://pixabay.com/api';
const KEY = '33577731-7b9b7bf07a9d841c486c320f5';
const searchOptions = 'image_type=photo&orientation=horizontal&safesearch=true';

// export default async function fetchPhotos(query, page) {
//     const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
//     const response = await fetch(URL);
//     if (!response.ok) {
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//     }
//     const photos = await response.json();
//     return photos;
// }

export default async function fetchPhotos(query, page) {
    const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
    const response = await fetch(URL)
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query.Please try again.')
            }
            return response.json();
        })
}
