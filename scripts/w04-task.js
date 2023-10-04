/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Andrew Leetham",
    photo: "images/profile.jpg",
    favoriteFoods: [
        "Fruit Crepes",
        "Mac 'n Cheese",
        "Pizza",
        "Strawberries",
        "Chocolate"
    ],
    hobbies: [
        "Magic: The Gathering",
        "Video Games",
        "Dungeons & Dragons"
    ],
    placesLived: []
}
/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push({
    place: "Forest Home, UT",
    length: "1.5 years"
});
myProfile.placesLived.push({
    place: "Henrico County, VA",
    length: "10 Years"
});
myProfile.placesLived.push({
    place: "Camas, WA",
    length: "14 Years"
});
/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").innerHTML = myProfile.name;
/* Photo with attributes */
document.querySelector("#photo").setAttribute("src", myProfile.photo);
document.querySelector("#photo").setAttribute("alt", myProfile.name);
/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let listItem = document.createElement("li");
    listItem.textContent = food;
    document.querySelector("#favorite-foods").appendChild(listItem);
});
/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let listItem = document.createElement("li");
    listItem.textContent = hobby;
    document.querySelector("#hobbies").appendChild(listItem);
});
/* Places Lived DataList */
myProfile.placesLived.forEach(home => {
    let dt = document.createElement("dt");
    dt.textContent = home.place;
    document.querySelector("#places-lived").appendChild(dt);
    let dd = document.createElement("dd");
    dd.textContent = home.length;
    document.querySelector("#places-lived").appendChild(dd);
});


