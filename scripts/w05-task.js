/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.querySelector("#temples");
let templeList = [];

/* async displayTemples Function */
const displayTemples = (temples) => {temples.forEach(temple => {
    let article = document.createElement("article");
    let h3 = document.createElement("h3");
    h3.innerHTML = temple.templeName;
    let img = document.createElement("img");
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", temple.location);
    article.appendChild(h3);
    article.appendChild(img);
    templesElement.appendChild(article);
});}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
    const response = await fetch("https://byui-cse.github.io/cse121b-ww-course/resources/temples.json");
    if (response.ok){
        templeList = await response.json();
        displayTemples(templeList);
    }
}

/* reset Function */
const reset = () => {
    templesElement.innerHTML = "";
}

/* sortBy Function */
const sortBy = (temples) => {
    reset();
    let filter = document.querySelector("#sortBy").value;
    let toDisplay;
    switch (filter){
        case "utah":
            toDisplay = temples.filter((temple) => temple.location.includes("Utah"));
            displayTemples(toDisplay);
            break;
        case "notutah":
            toDisplay = temples.filter((temple) => !temple.location.includes("Utah"));
            displayTemples(toDisplay);
            break;
        case "older":
            toDisplay = temples.filter((temple) => new Date(temple.dedicated) < new Date(1950, 0 ,1));
            displayTemples(toDisplay);
            break;
        case "all":
            displayTemples(temples);
            break;
    }
}


getTemples();


/* Event Listener */
document.querySelector("#sortBy").addEventListener("change", () => {sortBy(templeList)});
