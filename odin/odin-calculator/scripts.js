// JS Calculatror by AG
// --- part of "The Odin Project" ---


// Get buttons
const calcNumbers     = document.querySelectorAll('[data-number]');
const calcOperator    = document.querySelectorAll('[data-operator]');
const calcClear       = document.querySelector('[data-clear]');
const calcDelete      = document.querySelector('[data-delete]');
const calcTotals      = document.querySelector('[data-totals]');
const displayEquation = document.querySelector('[data-equation]');
const displayTotal    = document.querySelector('[data-total]');
const calcDigit       = document.querySelector('[data-digit]');

// Create variables for the 2 calcNumbers
let firstOperand = '';
let secondOperand = '';
let isEquationEmpty = true;
let operationExists = false;
let operation;
let hasDigit = false;
const numberOfDecimalPoints = 3;

const allowedKeys =
    [
        "0", ".",
        "1", "2", "3",
        "4", "5", "6",
        "7", "8", "9",
        "+", "-", "*",
        "/", "=",
        "Delete", "Backspace", "Enter"
    ];


updateDisplay();


// Clear all: 
calcClear.addEventListener("click", clearAll);
calcDelete.addEventListener("click", backspace);

calcTotals.addEventListener("click", operate);

calcDigit.addEventListener("click", (e)=> addDigit(e));

function addDigit(e) {
    let key = e.target.getAttribute('data-key') || e.key;

    if (!hasDigit && firstOperand !== '' && !operationExists) {
        firstOperand += key;
        displayEquation.textContent += key;
        hasDigit = true;
    } else if (operationExists && secondOperand == '') {
        hasDigit = false;
        return;

    } else if (operationExists && secondOperand !== '' && !secondOperand.includes(key)) {
        secondOperand += key;
        displayEquation.textContent += key;
        hasDigit = true;
    }
}

function updateDisplay () {
    displayEquation.innerHTML = '';
    displayTotal.innerHTML = '';
}

calcNumbers.forEach((number) => {
    number.addEventListener('click', (e) => numberKeys(e));
});

function numberKeys(e) {
    let key = e.target.getAttribute('data-key') ||e.key;
    displayEquation.textContent += `${key}`;

    if (!operationExists) {
        firstOperand += key;
        isEquationEmpty = false;
    } else if (!isEquationEmpty && operationExists) {
        secondOperand += key;
    }
}

calcOperator.forEach((operator) => {
    operator.addEventListener('click', (e) => operatorKeys(e));
});

function operatorKeys(e) {
    let key = e.target.getAttribute('data-key') || e.key;

    if (!operationExists) {
        operation = key;
        displayEquation.textContent += key;
        operationExists = true;
    } else if (operationExists && firstOperand !== '' && secondOperand === '') {
        operation = key;
        let clearedOperator = displayEquation.textContent.slice(0, -1) + key;
        displayEquation.textContent = clearedOperator;
    }
    else if (operationExists && firstOperand !== '' && secondOperand !== '') {
        operate();
        firstOperand = displayTotal.textContent;
        secondOperand = '';
        operation = key;
        displayEquation.textContent = `${firstOperand}${operation}`;
    }
}

// Functions
function operate() {
    if (firstOperand !== null && secondOperand !== null) {
        let a = parseFloat(firstOperand);
        let b = parseFloat(secondOperand);

        if (operation === "+") {
            displayTotal.textContent =  add(a, b);
        }
        else if (operation === "-") {
            displayTotal.textContent = substract(a, b);
        }
        else if (operation === "*") {
            displayTotal.textContent = multiply(a, b);
        }
        else if (operation === "/") {
            displayTotal.textContent = divide(a, b);
        }
    } 
}

function clearAll() {
    displayEquation.innerHTML = '';
    displayTotal.innerHTML = '';
    firstOperand = '';
    secondOperand = '';
    operation = '';
    operationExists = false;
    isEquationEmpty = true;
    hasDigit = false;
}

function backspace() {
    if (firstOperand !== '' && operationExists == false) {
        firstOperand = firstOperand.slice(0, -1);
    } 
    else if (operationExists == true && secondOperand == '') {
        operation = ''
        operationExists = false;
    } 
    else {
        secondOperand = secondOperand.slice(0, -1);
    }
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
}

function add (a, b) {
    let result = parseFloat((a + b).toFixed(numberOfDecimalPoints));
    return result === parseInt(result, 10) ? parseInt(result, 10) : result;
}

function substract (a, b) {
    let result = parseFloat((a - b).toFixed(numberOfDecimalPoints));
    return result === parseInt(result, 10) ? parseInt(result, 10) : result;
}

function divide (a, b) {

    if (a === 0 || b === 0 ) {
        return "Oops";
    }

    let result = parseFloat((a / b).toFixed(numberOfDecimalPoints));
    return result === parseInt(result, 10) ? parseInt(result, 10) : result;
}

function multiply (a, b) {
    let result = parseFloat((a * b).toFixed(numberOfDecimalPoints));
    return result === parseInt(result, 10) ? parseInt(result, 10) : result;
}

window.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (allowedKeys.includes(key)) {
        const pressedKeys = document.querySelector(`[data-key="${e.key}"]`);

        if (pressedKeys || pressedKeys === "Enter") {
            pressedKeys.classList.add("pressed");
        }

        if (e.target.getAttribute('data-clear') || e.key === 'Delete') {
            clearAll();
        } 
        else if (e.target.getAttribute('data-delete') || e.key === 'Backspace')  {
            backspace();
        } else if (e.target.getAttribute('data-operator') || 
            e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
            operatorKeys(e);
        } else if (e.key === "Enter") {
            operate();
        } else if (e.target.getAttribute('data-digit') || e.key === '.') {
            addDigit(e);
        } else {
            numberKeys(e);
        }
    }
});

window.addEventListener('keyup', (e) => {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
        key.classList.remove("pressed");
    })
});