import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

import searchImagesByQuery from './js/pixabay-api.js';
import { showError, createGallary, cleanGallery } from './js/render-functions.js';

const form = document.querySelector('.gallery-form');
const input = document.querySelector('.input-gallery');
const loader = document.querySelector('.loading');
const loadMoreBtn = document.querySelector('.load-btn');
// const card = document.querySelector('.gallery-item');
let currentPage = 1;
const resultsPerPage = 15;
let currentQuery = '';



form.addEventListener('submit', async (event) => {
    event.preventDefault();
    currentPage = 1;
    currentQuery = input.value.trim();

    cleanGallery(); //  очищуєм галерею
    loadMoreBtn.classList.add('hidden');
    await performSearch()
});


loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    performSearch();
    });


async function performSearch() {
  loader.classList.remove('hidden'); // показуємо індикатор завантаження

    if (currentQuery === '') {
    showError('Please enter a search query.');
    loader.classList.add("hidden");
    return;
    }

    try {
    const data = await searchImagesByQuery(currentQuery, currentPage, resultsPerPage);
    if (data.total === 0) {
        showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
        // console.log(data);
        if (currentPage > 1) {
        const galleryHeightB = document.querySelector('.gallery-list').getBoundingClientRect().height;
        createGallary(data);
        const galleryHeightA = document.querySelector('.gallery-list').getBoundingClientRect().height;
        console.log(document.querySelector('.gallery-list').getBoundingClientRect())
        window.scrollBy({
            top: (galleryHeightA - galleryHeightB)*0.6,
            behavior: 'smooth'
        });
        } else {
            createGallary(data);
        }
        if (data.hits.length < resultsPerPage) { //const images = data.hits дожина галереї
            loadMoreBtn.classList.add('hidden'); // якщо менше результатів, ховаємо кнопку
            return iziToast.info({
                    position: "topRight",
                    message: "We're sorry, but you've reached the end of search results."
                });
        } else {
            if (data.totalHits > ( currentPage * resultsPerPage)) {
                loadMoreBtn.classList.remove('hidden'); // показуємо кнопку "Load more"
                // console.log(currentPage)
            } else {
                // console.log(1)
                    loadMoreBtn.classList.add('hidden'); // показуємо кнопку "Load more"
                    return iziToast.info({
                    position: "topRight",
                    message: "We're sorry, but you've reached the end of search results."
                });
            }
        }
    }
    } catch (error) {
    showError(error.message);
    } finally {
    loader.classList.add("hidden"); // ховаємо індикатор завантаження
        input.value = '';
    }
}

// ---- другий варіант ---
// try {
//         const data = await searchImagesByQuery(currentQuery, currentPage, resultsPerPage);
//         if (data.total === 0) {
//             showError('Sorry, there are no images matching your search query. Please try again!');
//         } else {
//             console.log(data);
//             const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
//             createGallary(data);
//             if (currentPage > 1) {
//                 window.scrollBy({
//                     top: cardHeight * 2, // Прокручуємо на дві висоти картки
//                     behavior: 'smooth'
//                 });
//             }
//             if (data.hits.length < resultsPerPage) { // Якщо менше результатів, ховаємо кнопку
//                 loadMoreBtn.classList.add('hidden');
//             } else {
//                 if (data.totalHits > (currentPage * resultsPerPage)) {
//                     loadMoreBtn.classList.remove('hidden'); // Показуємо кнопку "Load more"
//                 } else {
//                     loadMoreBtn.classList.add('hidden');
//                     iziToast.warning({
//                         position: 'topRight',
//                         message: "We're sorry, but you've reached the end of search results."
//                     });
//                 }
//             }
//         }
//     } catch (error) {
//         showError(error.message);
//     } finally {
//         loader.classList.add('hidden'); // Ховаємо індикатор завантаження
//         input.value = ''; // Скидаємо значення інпуту
//     }














    // if (query === '') {
    //     showError('Please enter a search query.');
    //     loader.classList.add("hidden")
    //     return;
    // }
    // try {
    //     const data = await searchImagesByQuery(query);
    //     if (data.total === 0) {
    //         showError('Sorry, there are no images matching your search query. Please try again!')
    //     } else {
    //         console.log(data);
    //         createGallary(data);
    //     }
    // } catch (error) {
    //     showError(error);
    // } finally {
    //     loader.classList.add("hidden")
    //     input.value = '';
    // }


    // searchImagesByQuery(query)
    //     .then((data) => {
    //         if (data.total === 0) {
    //             showError('Sorry, there are no images matching your search query. Please try again!')
    //             loader.classList.add("hidden")
    //             input.value = '';
    //             return;
    //         }
    //         // else {
    //         //     createGallary(data)
    //         // }
    //         loader.classList.add("hidden")
    //         console.log(data);
    //         createGallary(data);
    //         input.value = '';
    //     })
    //     .catch((error) => {
    //         showError(error);
    //         input.value = '';
    //     });
    
