import Notiflix from "notiflix";
import "simplelightbox/dist/simple-lightbox.min.css";
import {featchValue} from "./featchValue";
import {createValue} from "./ctreateValue";

const search = document.querySelector(".search-form");
const loadMore = document.querySelector(".load-more");
const div = document.querySelector("div");
const input = document.querySelector("input");

loadMore.setAttribute("hidden","");

let number = 1;
let conditon = "";

featchValue();

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