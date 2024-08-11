// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export function showError(error) {
    iziToast.error({
        position: "topRight",
        message: `${error}`,
    });
}

export function createGallary(data) {
    const galleryList = document.querySelector('.gallery-list');
    const lightbox = new SimpleLightbox('.gallery-item a', {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay:  250,
});
    const images = data.hits.map((hit) =>`
    <li class="gallery-item">
        <a class="gallery-link" href="${hit.largeImageURL}">
            <img class="gallery-image"
                src="${hit.webformatURL}"
                alt="${hit.tags}" 
            />
        </a>
        <div class="gallery-content">
            <h5 class="text-content">Likes<p class="text">${hit.likes}</p></h5>
            <h5 class="text-content">Views<p class="text">${hit.views}</p></h5>
            <h5 class="text-content">Comments<p class="text">${hit.comments}</p></h5>
            <h5 class="text-content">Downloads<p class="text">${hit.downloads}</p></h5>
        </div>
    </li>`).join('');

    galleryList.insertAdjacentHTML("beforeend", images);
    lightbox.refresh();
}

export function cleanGallery() {
    const list = document.querySelector(".gallery-list");
    list.innerHTML = "";
}