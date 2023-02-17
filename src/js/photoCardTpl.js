import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from 'simplelightbox';



export function createPhotoCard(photos) {
    return photos.map(p => 
    `
    
    <a class="gallery__link" href="${p.largeImageURL}" onclick="return false">
    <div>
    
    
  <img alt="${p.tags}" loading="lazy" class="gallery__image" 
  src="${p.previewURL}"
  data-source="${p.largeImageURL}"
  />
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b> 
      ${p.likes} 
    </p>
    <p class="info-item">
      <b>Views</b>
      ${p.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${p.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${p.downloads}
    </p>
  </div>
  </div>
  </a>
  

    `
    ).join('')
    
}

new SimpleLightbox(".gallery a", {
    captionsData: "alt",
     captionDelay: 250,
     })

