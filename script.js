// Select elements
const input = document.getElementById('input');
const buttons = document.querySelectorAll('button');
const input1 = document.getElementById('input1');
const historyDisplay = document.getElementById('historyDisplay');

let currentInput = '';
let operator = '';
let firstOperand = null;
let calculationHistory = loadHistory() || [];

// Helper function to update the calculator screen
// Helper function to update the calculator screen


// Function to update input1 with the current input and calculation history
// Function to update input1 with the current input and calculation history
function updateInput1() {
    input1.value = currentInput;
    historyDisplay.value = calculationHistory.map(item => `${item.number} ${item.operator} ${item.input} = ${item.result}`).join('\n');
}
function updateInput() {
    input.value = currentInput;
}


// Event listener for button clicks
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // Clear button
        if (buttonText === 'C') {
            currentInput = '';
            operator = '';
            firstOperand = null;
        }
        // Digit or decimal button
        else if (!isNaN(buttonText) || buttonText === '.') {
            currentInput += buttonText;
        }
        // Operator button
        else if (['+', '-', '*', '/'].includes(buttonText)) {
            if (operator && currentInput !== '') {
                // Perform the previous operation
                currentInput = calculate(firstOperand, parseFloat(currentInput), operator);
                operator = '';
                firstOperand = null;
            }
            operator = buttonText;
            firstOperand = parseFloat(currentInput);
            currentInput = '';
        }
        // Equals button
        else if (buttonText === '=') {
            if (operator && currentInput !== '') {
                const one=firstOperand;
                const result = calculate(firstOperand, parseFloat(currentInput), operator);
                currentInput = result;
                operator = '';
                firstOperand = null;
                // Store the calculation in history
                storeCalculation(currentInput, result);
            }
        }

        updateInput();
        updateInput1();
    });
});

// Perform the arithmetic calculation
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return (firstOperand + secondOperand).toString();
        case '-':
            return (firstOperand - secondOperand).toString();
        case '*':
            return (firstOperand * secondOperand).toString();
        case '/':
            if (secondOperand === 0) {
                alert('Division by zero is not allowed.');
                return '';
            }
            return (firstOperand / secondOperand).toString();
        default:
            return secondOperand.toString();
    }
}

// Function to store the calculation in history

// Function to store the calculation in history
// Function to store the calculation in history
function storeCalculation(input, result) {
    calculationHistory.unshift({ 
        number: firstOperand || 0, // Use 0 if firstOperand is null
        operator: operator || '', // Use an empty string if operator is null
        input: currentInput || 0, // Use 0 if currentInput is null
        result
    });
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
    saveHistory(calculationHistory);
}


// Function to load calculation history from the JSON file
function loadHistory() {
    try {
        const historyJSON = localStorage.getItem('calculationHistory');
        return JSON.parse(historyJSON) || [];
    } catch (error) {
        return [];
    }
}

// Function to save calculation history to the JSON file
function saveHistory(history) {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
}

// Initial display of input and calculation history
updateInput1();
