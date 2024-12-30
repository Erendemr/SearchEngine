const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const input = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imagelistWrapper = document.querySelector(".imagelist-wrapper");

runEventListener();

function runEventListener(){
    form.addEventListener("submit" , search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    input.value = "";
    imagelistWrapper.innerHTML = "";
}

function search(e){

    const value = input.value.trim().toLowerCase();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID huSqKajeuJm0KgejsXQ1aUvTIUqbki4eRY65KYfuphw" 
        }
    })
    .then((res)=> res.json())
    .then((data)=>{
        Array.from(data.results).forEach((image)=>{
            addImageToUI(image.urls.small)
        })
    })
    .catch((err)=>console.log(err))

    e.preventDefault();
}

function addImageToUI(url){
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height='400';
    img.width = '400';

    div.append(img);
    imagelistWrapper.append(div);
}