
import axios from 'axios';
const ENDPOINT = 'https://pixabay.com/api';
const KEY = '33577731-7b9b7bf07a9d841c486c320f5';
const searchOptions = 'image_type=photo&orientation=horizontal&safesearch=true';

export default async function fetchPhotos(query, page) {
    const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
    return axios.get(URL)
}



