const url = "https://pokeapi.co/api/v2/pokemon/ditto";
let results = null;
async function getPokemon(url) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
  }
}
function doStuff(data) {
    const outputElement = document.querySelector("#output")
  results = data;
  let html = `<h2>${results.name}</h2><img src="${results.sprites.front_default}" alt="Image of ${results.name}">`;
  outputElement.innerHTML = html;
  console.log("first: ", results);
}
getPokemon(url);
console.log("second: ", results);

const urlList = "https://pokeapi.co/api/v2/pokemon";
results = null;

async function getPokemonList(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        doStuffList(data);
    }

}

function comparePokeName(a, b) {
    if (a.name > b.name) {
        return 1;
    }
    if (a.name < b.name) {
        return -1;
    }
    return 0;
}

function sortPokemon(list) {
    let sortedList = list.sort(comparePokeName);
    return sortedList;
}
function doStuffList(data) {
    let pokeList = data.results;
    pokeList = sortPokemon(pokeList);
    let outputElement = document.querySelector("#outputList");
    pokeList.forEach((currentItem) => {
        let html = `<li>${currentItem.name}</li>`;
        outputElement.innerHTML += html;
    })
}
getPokemonList(urlList);