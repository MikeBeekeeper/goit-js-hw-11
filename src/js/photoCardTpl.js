
export function createPhotoCard(photos) {
    return photos.map(p => 
    `  
    <a class="gallery__link" href="${p.largeImageURL}" >

     
  <img alt="${p.tags}" class="gallery__image" 
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
  
  </a>
    `
    ).join('')
    
}



