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
const numberOfDecimalPoints = 7;
const allowedKeys = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "=", "Delete", "Backspace", "Enter"];

// Clear all: 
calcClear.addEventListener("click", clearAll);
calcDelete.addEventListener("click", backspace);
calcDigit.addEventListener("click", (e)=> addDigit(e));
calcTotals.addEventListener("click", operate);

calcNumbers.forEach((number) => number.addEventListener('click', (e) => numberKeys(e)));
calcOperator.forEach((operator) => operator.addEventListener('click', (e) => operatorKeys(e)));
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
function numberKeys(e) {
    let key = getKey(e);
    if (!operationExists) {
        firstOperand += key;
        isEquationEmpty = false;
    } else if (!isEquationEmpty && operationExists) {
        secondOperand += key;
    }
    displayEquation.textContent += key;
}
function operatorKeys(e) {
    let key = getKey(e);

    if (!operationExists && firstOperand !== '') {
        operation = key;
        updateDisplay(checkSymbol(key), displayEquation);
        operationExists = true;
    } else if (operationExists && firstOperand !== '' && secondOperand === '') {
        operation = key;
        let clearedOperator = displayEquation.textContent.slice(0, -1) + checkSymbol(key);
        displayEquation.textContent = clearedOperator;
    }
    else if (operationExists && firstOperand !== '' && secondOperand !== '') {
        operate();
        firstOperand = displayTotal.textContent;
        secondOperand = '';
        operation = key;
        displayEquation.textContent = `${firstOperand}${checkSymbol(operation)}`;
    }
}
// Functions
function operate() {
    if (firstOperand !== '' && secondOperand !== '') {
        let a = parseFloat(firstOperand);
        let b = parseFloat(secondOperand);
    
        if (operation === "+") {
            displayTotal.textContent = add(a, b);
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
    };
}
function getKey(e) {
    return e.target.getAttribute('data-key') || e.key;
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
    if (firstOperand !== '' && !operationExists) {
        firstOperand = firstOperand.slice(0, -1);
    } 
    else if (operationExists && secondOperand === '') {
        operation = ''
        operationExists = false;
    } 
    else {
        secondOperand = secondOperand.slice(0, -1);
    }
    displayEquation.textContent = displayEquation.textContent.slice(0, -1);
}
function add (a, b) {
    return beautify((a + b));
}
function substract (a, b) {
    return beautify((a - b));
}
function divide (a, b) {
    if (b === 0 ) {
        return "Math Error";
    } else {
        return beautify(a / b);
    }
}
function multiply (a, b) {
    return beautify(a * b)
}
function beautify (result) {
    result = parseFloat(result.toFixed(numberOfDecimalPoints));
    return result === parseInt(result, 10) ? parseInt(result, 10) : result;
}
function checkSymbol(symbol) {
    if (symbol === "*") {
        symbol = '×';
    } else if (symbol === '/') {
        symbol = '÷';
    }
    return symbol;
}

function updateDisplay(symbol, target) {
    return target.textContent += symbol;
}

window.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (allowedKeys.includes(key)) {
        const pressedKeys = document.querySelector(`[data-key="${e.key}"]`);
        const operators = ["+", "-", "*", "/"];
        
        if (pressedKeys || pressedKeys === "Enter") {
            pressedKeys.classList.add("pressed");
        }

        if (e.target.getAttribute('data-clear') || e.key === 'Delete') {
            clearAll();
        } 
        else if (e.target.getAttribute('data-delete') || e.key === 'Backspace')  {
            backspace();
        } else if (e.target.getAttribute('data-operator') || operators.includes(e.key)) {
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