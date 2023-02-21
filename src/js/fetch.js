import Notiflix from 'notiflix';
const axios = require('axios');
const ENDPOINT = 'https://pixabay.com/api';
const KEY = '33577731-7b9b7bf07a9d841c486c320f5';
const searchOptions = 'image_type=photo&orientation=horizontal&safesearch=true';

// __________________________Этот код работал________________
// export default async function fetchPhotos(query, page) {
//     const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
//     const response = await fetch(URL);
//     if (!response.ok) {
//             Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//     }
//     const photos = await response.json();
//     return photos;
// }


// ----------------------------Эти варианты выдают axios.get is not a function____________
// export default async function fetchPhotos(query, page) {
//     const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
    
//     return await axios.get(URL)
// .then(response => {
// if (response.status !== 200 || response.data.hits.length === 0) {
// throw new Error(response.status)
// }
// return response.data;
// })
// }
export default async function fetchPhotos(query, page) {
    const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
    return axios.get(URL)
    
//         .then(response => {
//         if (response.status !== 200 || response.data.hits.length === 0) {
// Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//         }
//             return response.json()   
//         })
}



