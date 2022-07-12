"use strict";

let screenBuffer = "0";
let numberBuffer = "0";
let previous = 0;
let runningTotal = 0;
let operator;

const screen = document.querySelector(".screen-text");

const calculator = document.querySelector(".buttons");
calculator.addEventListener("click", function (event) {
    handleClick(event.target.innerText);
})

function handleClick(value) {
    if (isNaN(value)) {
        handleOperation(value);
        console.log("handleOperation");
    } else {
        handleNumber(value);
        console.log("handleNumber");
    }
    renderScreen();
}

function renderScreen() {
    screen.innerText = screenBuffer;
}

function handleOperation(value) {
    switch(value) {
        case "AC":
            runningTotal = 0;
            screenBuffer = "0";
            numberBuffer = "0";
            operator = null;
            break;

        case "DEL":
            if (screenBuffer.length <= 1) {
                screenBuffer = "0";
                numberBuffer = "0";
            } else {
                if(Number(screenBuffer.charAt(screenBuffer.length - 1)) !== NaN) {
                    screenBuffer = screenBuffer.substring(0, screenBuffer.length - 1);
                    numberBuffer = numberBuffer.substring(0, screenBuffer.length - 1);
                } else {
                    screenBuffer = screenBuffer.substring(0, screenBuffer.length - 1);
                    previousOperator = null;
                }
            }
            break;

        case "=":
            doOperation();
            screenBuffer = String(runningTotal);
            break;

        default:
            console.log("default");
            handleMath(value);
    }
}

function handleMath(value) {
   if(value == ".") {
       screenBuffer += value;
        numberBuffer += value;
        numberBuffer += "0";
   } else {
       operator = value;
       previous = Number(numberBuffer);
       numberBuffer = "0";
       screenBuffer += value;
   }
}

function doOperation() {
    runningTotal = previous;
    switch(operator) {
        case "+":
            runningTotal += Number(numberBuffer);
            break;

        case "-":
            runningTotal -= Number(numberBuffer);
            break;

         case "*":
            runningTotal *= Number(numberBuffer);
            break;

         case "/":
            runningTotal /= Number(numberBuffer);
            break;
    }
    numberBuffer = runningTotal;
}

function handleNumber(value) {
    if (screen.innerText === "0") {
        screenBuffer = value;
        numberBuffer = value;
    } else {
        screenBuffer += value;
        numberBuffer += value;
    }
}

