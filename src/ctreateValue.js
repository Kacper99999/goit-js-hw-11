import SimpleLightbox from "simplelightbox";
const div = document.querySelector(".container");

export async function createValue(value){
    const data = await value;
    const listValues = [];
    data.forEach(element => {
        listValues.push(`<div class="photo-card">
        <a href=${element.largeImageURL}>
        <img src="${element.webformatURL}" alt="" loading="lazy" width = 450 height = 400 />
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b>${element.likes}
            </p>
            <p class="info-item">
            <b>Views: </b>${element.views}
            </p>
            <p class="info-item">
            <b>Comments: </b>${element.comments}
            </p>
            <p class="info-item">
            <b>Downloads: </b>${element.downloads}
            </p>
        </div>
        </div>`)

    });
    div.innerHTML = listValues.join("");
    console.log(listValues);
    new SimpleLightbox(".photo-card a");
    
};