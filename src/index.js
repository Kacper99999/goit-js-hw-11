import axios from "axios";

const search = document.querySelector(".search-form");
const div = document.querySelector("div");
const input = document.querySelector("input");

let number = 1;
let conditon = "";
async function featchValue(value){
    if(number > 1){
        if(conditon !== value){
            number = 1
        }
    };
        return await axios.get(`https://pixabay.com/api/?key=43636213-16e765190282d34979b0ca235&q=${value}&page=${number}&per_page=40`).then((response)=>{
        const result = [];
        number++;
        conditon = value;
        console.log(number);
        response.data["hits"].forEach(element => {
            result.push({webformatURL:element.webformatURL, largeImageURL:element.largeImageURL, tahs:element.tags, likes:element.likes, views:element.views, comments:element.comments, downloads:element.downloads});
        });
        return result;
    });
    
};

async function parseValue(value){
    const data = await value;
    console.log(data);
    console.log(value);
    const listyValues = [];
    data.forEach(element => {
        // const img = document.createElement("img");
        // img.src =element.webformatURL;
        // div.appendChild(img);    
        listyValues.push(`<div class="photo-card">
        <img src="${element.webformatURL}" alt="" loading="lazy" />
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
    listyValues.join("");
    div.innerHTML = listyValues;
};

search.addEventListener("submit", (event) => {
    event.preventDefault();
    if(input.value === ""){
        div.innerHTML = "Sorry, there are no images matching your search query. Please try again.";
    }
    else{
        div.innerHTML = "";
    parseValue(featchValue(input.value));
    }
});