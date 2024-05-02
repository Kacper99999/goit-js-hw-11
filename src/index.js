import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const search = document.querySelector(".search-form");
const loadMore = document.querySelector(".load-more");
const div = document.querySelector("div");
const input = document.querySelector("input");

loadMore.setAttribute("hidden","");

let number = 1;
let conditon = "";
let totalHits = 0;
async function featchValue(value){
    if (conditon !== value){
        if(number > 1){
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
        number = 1;
        totalHits = 0;
    }
        return await axios.get(`https://pixabay.com/api/?key=43636213-16e765190282d34979b0ca235&q=${value}&page=${number}&per_page=40`).then((response)=>{
        const result = [];
        number++;
        conditon = value;
        totalHits = totalHits+40;
        response.data["hits"].forEach(element => {
            result.push({webformatURL:element.webformatURL, largeImageURL:element.largeImageURL, tahs:element.tags, likes:element.likes, views:element.views, comments:element.comments, downloads:element.downloads});
        });
        return result;
    }).catch(()=>{
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    })
    
};

async function createValue(value){
    const data = await value;
    const listValues = [];
    data.forEach(element => {
        listValues.push(`<div class="photo-card">
        <a href=${element.largeImageURL}>
        <img src="${element.webformatURL}" alt="" loading="lazy" width = 450 height = 400 />
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes</b>${element.likes}
            </p>
            <p class="info-item">
            <b>Views</b>${element.views}
            </p>
            <p class="info-item">
            <b>Comments</b>${element.comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>${element.downloads}
            </p>
        </div>
        </div>`)

    });
    div.innerHTML = listValues.join("");
    new SimpleLightbox(".photo-card a");
    
};

search.addEventListener("submit", (event) => {
    event.preventDefault();
    if(input.value === ""){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    else{
        loadMore.removeAttribute("hidden");
        search.setAttribute("disambled","")
        div.innerHTML = "";
        if(number === 1 || conditon !== input.value){
            createValue(featchValue(input.value));
        }
    }
});

loadMore.addEventListener("click", ((event)=>{
    event.preventDefault();
    if(number > 1){
        createValue(featchValue(input.value));
    }
}));