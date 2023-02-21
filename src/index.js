import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPhotos from './js/fetch.js';
import { createPhotoCard } from "./js/photoCardTpl.js";

const submitBtn = document.querySelector(".search-form__btn");
const photoGalery = document.querySelector(".gallery");
const searchFormEl = document.querySelector(".search-form")
const searchFormInputEl = document.querySelector(".search-form__input");
const paginatioBtnEl = document.querySelector(".load-more")
const gallery = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
     captionDelay: 250,
     })

searchFormEl.addEventListener('submit', onSubmit);
searchFormEl.addEventListener('keydown', (e) => {
    if(e.currentTarget.value === 'Enter') onSubmit()
});

searchFormInputEl.addEventListener('input', onInput);
paginatioBtnEl.addEventListener('click', onPaginationBtnClick)

let searchQuery = '';
let numberOfPage = 1;

function onSubmit() { 
    event.preventDefault();
    addVisibleClsToPaginationBtn()
    paginatioBtnEl.textContent = "Loading";
     submitBtn.disabled = true;
    numberOfPage = 1;
    
    fetchPhotos(searchQuery, numberOfPage)
        .then(response => {
            const photos = response.data.hits;
            const totalHits = response.data.totalHits
            totalMatches = photos.length
            if (photos.length === 0) {
                removeVisibleClsOfPaginationBtn();
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')               
            } 
            if (photos.length !== 0) {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
            }           
            return createPhotoCard(photos)
        })
        .then(markup => {          
            updateGaleryMarkup(markup);
            if(markup) paginatioBtnEl.textContent = "Load more";          
        })
        .catch(error => console.log(error))
    .finally(() => gallery.refresh() )
}


function addVisibleClsToPaginationBtn() {
    paginatioBtnEl.classList.add("visible");
}

function removeVisibleClsOfPaginationBtn() {
    paginatioBtnEl.classList.remove("visible");
}

function onInput(e) {
    searchQuery = e.target.value.trim();
    if (searchQuery) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    return searchQuery;
}
let totalMatches = 0;

function onPaginationBtnClick(e) {    
    numberOfPage += 1;
    paginatioBtnEl.disabled = true;
    fetchPhotos(searchQuery,numberOfPage)
        .then(response => {
            const photos = response.data.hits;
            const totalHits = response.data.totalHits;
            totalMatches += photos.length            
            if (totalMatches >= totalHits || totalMatches === 0) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
                removeVisibleClsOfPaginationBtn()
            }            
            return photos
        })
        .then(photos => createPhotoCard(photos))            
        .then(markup => {
            addMarkupToGalery(markup)
            paginatioBtnEl.disabled = false;
        })       
        .catch(error => alert('Whoops, something wrong((( Please, try again)'))
        .finally(() => gallery.refresh() )

    
}

function updateGaleryMarkup(markup) {
    photoGalery.innerHTML = markup
}

function addMarkupToGalery(markup) {
    photoGalery.insertAdjacentHTML('beforeend', markup)
}

Notiflix.Notify.init({
    position: 'center-center',
    width: '50%',
    height: '100px',
    fontSize: '30px',
    timeout: 1500,
    warning: {
        background: '#1facc5',
        position: 'center-center',
    },
    failure: {
        background: '#e90c0c',      
    }
});

