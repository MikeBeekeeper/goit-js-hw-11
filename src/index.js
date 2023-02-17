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

searchFormEl.addEventListener('submit', onSubmit);
searchFormEl.addEventListener('keydown', (e) => {
    if(e.currentTarget.value === 'Enter') onSubmit()
});

searchFormInputEl.addEventListener('input', onInput);
paginatioBtnEl.addEventListener('click', onPaginationBtnClick)

let searchQuery = '';
let numberOfPage = 1;

// function onSubmit() {  
//     event.preventDefault();
//     removeVisibleClsOfPaginationBtn();
//     resetGaleryMarkup();
//     submitBtn.disabled = true;
//     numberOfPage = 1;


//     fetchPhoto(searchQuery, numberOfPage)
//         .then(response => {
//             if (!response.ok) {
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//             }
//             return response.json()
//         })
//         .then(photos => {
//             totalMatches = photos.hits.length
            
//             if (photos.hits.length === 0) {
//                 removeVisibleClsOfPaginationBtn();
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')               
//             } 
//             if (photos.hits.length !== 0) {
//                 Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`)
//             }           
//             return createPhotoCard(photos.hits)
//         })
//         .then(markup => {          
//             updateGaleryMarkup(markup);
//             if(markup) addVisibleClsToPaginationBtn();          
//         })
//         .catch(error => {throw new Error})
//     .finally(() => searchFormInputEl.value = '')
// }

function onSubmit() { 
     event.preventDefault();
     removeVisibleClsOfPaginationBtn();
     resetGaleryMarkup();
     submitBtn.disabled = true;
    numberOfPage = 1;
    
    fetchPhotos(searchQuery,numberOfPage)
    .then(photos => {
            totalMatches = photos.hits.length
            
            if (photos.hits.length === 0) {
                removeVisibleClsOfPaginationBtn();
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')               
            } 
            if (photos.hits.length !== 0) {
                Notiflix.Notify.success(`Hooray! We found ${photos.totalHits} images.`)
            }           
            return createPhotoCard(photos.hits)
        })
        .then(markup => {          
            updateGaleryMarkup(markup);
            if(markup) addVisibleClsToPaginationBtn();          
        })
        .catch(error => console.log(error))
    .finally(() => searchFormInputEl.value = '')
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

// function onPaginationBtnClick(e) {
    
//     numberOfPage += 1;
//     fetchPhoto(searchQuery,numberOfPage)
//         .then(response => response.json())
//         .then(photos => {
//             totalMatches += photos.hits.length
            
//             if (totalMatches >= photos.totalHits || totalMatches === 0) {
//                 Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
//                 removeVisibleClsOfPaginationBtn()
//             } 
            
            
//             return photos
//         })
//         .then(photos => createPhotoCard(photos.hits))
            
//         .then(markup => addMarkupToGalery(markup))
//         .catch(error => { throw new Error })
    
// }
function onPaginationBtnClick(e) {    
    numberOfPage += 1;
    fetchPhotos(searchQuery,numberOfPage)
        .then(photos => {
            totalMatches += photos.hits.length            
            if (totalMatches >= photos.totalHits || totalMatches === 0) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
                removeVisibleClsOfPaginationBtn()
            }            
            return photos
        })
        .then(photos => createPhotoCard(photos.hits))            
        .then(markup => addMarkupToGalery(markup))
        .catch(error => alert('Whoops, something wrong((( Please, try again)'))
    
}

function updateGaleryMarkup(markup) {
    photoGalery.innerHTML = markup
}
function resetGaleryMarkup() {
    photoGalery.innerHTML = ''
}

function addMarkupToGalery(markup) {
    photoGalery.insertAdjacentHTML('beforeend', markup)
}

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });




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