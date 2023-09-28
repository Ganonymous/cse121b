/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2){
    return number1 + number2;
}

function addNumbers(){
    let num1 = Number(document.querySelector("#add1").value);
    let num2 = Number(document.querySelector("#add2").value);
    let sum = add(num1, num2);
    document.querySelector("#sum").value = sum;
}

document.querySelector("#addNumbers").addEventListener("click", addNumbers);

/* Function Expression - Subtract Numbers */
const subtract = function(number1, number2){
    return number1 - number2;
}

const subtractNumbers = function(){
    let num1 = Number(document.querySelector("#subtract1").value);
    let num2 = Number(document.querySelector("#subtract2").value);
    document.querySelector("#difference").value = subtract(num1, num2);
}

document.querySelector("#subtractNumbers").addEventListener("click", subtractNumbers);

/* Arrow Function - Multiply Numbers */
const multiply = (number1, number2) => number1 * number2;

const multiplyNumbers = () => {
    let num1 = Number(document.querySelector("#factor1").value);
    let num2 = Number(document.querySelector("#factor2").value);
    document.querySelector("#product").value = multiply(num1, num2);
};

document.querySelector("#multiplyNumbers").addEventListener("click", multiplyNumbers);

/* Open Function Use - Divide Numbers */
const divide = (number1, number2) => number1 / number2;

function divideNumbers(){
    let num1 = Number(document.querySelector("#dividend").value);
    let num2 = Number(document.querySelector("#divisor").value);
    document.querySelector("#quotient").value = divide(num1, num2);
}

document.querySelector("#divideNumbers").addEventListener("click", divideNumbers);

/* Decision Structure */
let today = new Date();
let currentYear = today.getFullYear();
document.querySelector("#year").innerHTML = currentYear;

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
let theArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.querySelector("#array").innerHTML = theArray;

/* Output Odds Only Array */
document.querySelector("#odds").innerHTML = theArray.filter(number => number % 2 == 1);

/* Output Evens Only Array */
document.querySelector("#evens").innerHTML = theArray.filter(number => number % 2 == 0);

/* Output Sum of Org. Array */
document.querySelector("#sumOfArray").innerHTML = theArray.reduce((total, next) => total + next);

/* Output Multiplied by 2 Array */
document.querySelector("#multiplied").innerHTML = theArray.map(number => number * 2);

/* Output Sum of Multiplied by 2 Array */
document.querySelector("#sumOfMultiplied").innerHTML = theArray.map(number => number * 2).reduce((total, next) => total + next);