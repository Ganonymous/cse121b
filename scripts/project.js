import BattleSim from "./Battlesim.js";
const url = "https://run.mocky.io/v3/bc7a4edc-e1f6-477a-b86f-902d2b663da2";

const charsElement = document.querySelector("#characters")
let charList = [];
async function getChars(url){
    const response = await fetch(url);
    if(response.ok){
        charList = await response.json();
        displayChars(charList);
    }
}
const makeCharArticle = (character) =>{
    let article = document.createElement("article");
    let h4 = document.createElement("h4");
    h4.innerHTML = character.name;
    let line1 = document.createElement("p");
    line1.innerHTML = `HP: ${character.maxHP}   Attack: ${character.attack}`;
    let line2 = document.createElement("p");
    line2.innerHTML = `Hit: ${Math.round(character.hit * 100)}%   Avoid: ${Math.round(character.avoid * 100)}%`;
    let line3 = document.createElement("p");
    line3.innerHTML = `Critical: ${Math.round(character.critChance * 100)}%   Speed: ${character.speed}`;
    let line4 = document.createElement("p");
    line4.innerHTML = `Special Chance: ${Math.round(character.specialChance * 100)}%  Special: ${character.specialName}`;
    let line5 = document.createElement("p");
    line5.innerHTML = `Defense: ${character.defense}   Resist: ${character.resist}`;
    article.appendChild(h4);
    article.appendChild(line1);
    article.appendChild(line2);
    article.appendChild(line3);
    article.appendChild(line4);
    article.appendChild(line5);
    return article
}
const displayChars = (characters) => (characters.forEach((character) =>{
    
    let article = makeCharArticle(character);
    let div = document.createElement("div");
    let move1 = document.createElement("span");
    move1.setAttribute("data-function", "move1");
    move1.innerHTML = "Assign as Contestant 1";
    let move2 = document.createElement("span");
    move2.setAttribute("data-function", "move2");
    move2.innerHTML = "Assign as Contestant 2";
    div.appendChild(move1);
    div.appendChild(move2)

    
    article.appendChild(div);

    charsElement.appendChild(article);
} ))
const reset = function() {
    charsElement.innerHTML = "";
}
const filterChars = (characters) =>{
    reset();
    let filter = document.querySelector("#filterSpecial").value;
    let toDisplay;
    if(filter == "Any") toDisplay = characters;
    else{
        toDisplay = characters.filter((character) => character.specialName == filter);
    }
    displayChars(toDisplay);
}
const selectContestant = (event) =>{
    let characterIndex = charList.findIndex(
        (character) => character.name == event.target.closest("article").childNodes[0].innerText
    );

    if(event.target.dataset.function == "move1"){
        assignContestant(1, characterIndex);
    }
    else if (event.target.dataset.function == "move2"){
        assignContestant(2, characterIndex);
    }
}
const assignContestant = (position, charIndex) =>{
    let article = makeCharArticle(charList[charIndex]);
    let targetPosition;
    if(position == 1){
        targetPosition = document.querySelector("#contestant1");
    } else{
        targetPosition = document.querySelector("#contestant2");
    }
    targetPosition.innerHTML = "";
    targetPosition.appendChild(article);
}
const sendBattle = () =>{
    if(document.querySelector("#contestant1").innerHTML == "" || document.querySelector("#contestant2").innerHTML == "") return;
    let char1Name = document.querySelector("#contestant1").childNodes[0].childNodes[0].innerText;
    let char1 = charList.find((character) => character.name == char1Name);
    let c1 = JSON.parse(JSON.stringify(char1))
    let char2Name = document.querySelector("#contestant2").childNodes[0].childNodes[0].innerText;
    let char2 = charList.find((character) => character.name == char2Name);
    let c2 = JSON.parse(JSON.stringify(char2));
    let logElement = document.querySelector("#log");
    logElement.innerHTML = "";
    BattleSim.RunBattle(c1, c2, logElement);
}

getChars(url);
document.querySelector("#filterSpecial").addEventListener("change", () => {filterChars(charList)});
charsElement.addEventListener("click", selectContestant);
document.querySelector("#startBattle").addEventListener("click", sendBattle);