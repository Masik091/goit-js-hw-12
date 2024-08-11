import axios from 'axios';
const URL = "https://pixabay.com/api/";
const API_KEY = "45133335-13ec6f60d2d4b23fe19aa58e6";

export default async function searchImagesByQuery(query,  page = 1, perPage  = 15) {
    try { 
        const response = await axios.get(URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: perPage 
            }
        })
        return response.data
    }
    catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
    // return fetch(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error(response.status);
    //         }
    //         return response.json();
    //     })
}
