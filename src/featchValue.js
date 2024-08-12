import axios from "axios";
import Notiflix from "notiflix";

let number = 1;
let conditon = "";
let totalHits = 0;

export async function featchValue(value){
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
        return resultnumber;
    }).catch(()=>{
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    })
    
};