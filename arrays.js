let theArray = ['one', 'two', 'three'];
let htmlArray = theArray.map((val) => `<li>${val}</li>`);
document.getElementById("myList").innerHTML = htmlArray.join("")

let gradesArray = ['A', 'B', 'A'];
function gradeToGPA(grade){
    switch (grade){
        case 'A':
            return 4;
            break;
        case 'B':
            return 3;
            break;
        case 'C':
            return 2;
            break;
        case 'D':
            return 1;
            break;
        case 'F':
            return 0;
            break;
    }
}
let GPAArray = gradesArray.map(gradeToGPA);

let gpa = GPAArray.reduce((accumulator, currentValue) => accumulator + currentValue) / GPAArray.length;

let fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
let longFruits = fruits.filter((fruit) => fruit.length >= 6);

let numbers = [12, 34, 21, 54];
let luckyNumber = 21;
let luckyPresent = numbers.indexOf(luckyNumber) != -1;