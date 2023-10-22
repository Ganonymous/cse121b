myInfo = {
    name: "Brother T",
    photo: "images/photo.jpg",
    favoriteFoods: ["Fettucini", "Steak", "Chicken", "Shrimp", "Baked Potato"],
    hobbies: ["Reading", "Fishing", "Camping"],
    placesLived: [
      {
        place: "Rexburg, ID",
        length: "5 years",
      },
      {
        place: "Ammon, ID",
        length: "3 years",
      },
      {
        place: "Sandy, UT",
        length: "1 year",
      },
    ],
  };
  const foodElement = document.querySelector("#favorite-foods");
  const placeElement = document.querySelector("#places-lived");
  function templateFood(food){return `<li>${food}</li>`};
  function templatePlace(place){return `<dt>${place.place}</dt><dd>${place.length}</dd>`}
  function listToHtml(list, templater){
    const templated = list.map(templater);
    return templated.join("");
  }
  placeElement.innerHTML = listToHtml(myInfo.placesLived, templatePlace);
  foodElement.innerHTML = listToHtml(myInfo.favoriteFoods, templateFood);
