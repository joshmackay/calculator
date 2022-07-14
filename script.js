const DIVIDE = '/';
const MULTIPLY = '*';
const ADDITION = '+';
const SUBTRACT = '-';

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allOperations = document.querySelector('.all-operations');
const currentOperation = document.querySelector('.current-operation');
const equalsButton = document.querySelector('[data-equals]').addEventListener('click', evaluate);
const deleteButton = document.querySelector('[data-delete]').addEventListener('click', deleteCurrentOperation);
const clearButton = document.querySelector('[data-clear]').addEventListener('click', clearAll);
window.addEventListener('keydown', keyPress);

numberButtons.forEach(button => 
    button.addEventListener('click', () => storeNumber(button.textContent)));
operatorButtons.forEach(button => 
    button.addEventListener('click', () => setOperation(button.textContent)));

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let clearCurrentScreenFlag = false;
let keyValue = null;

function clearCurrentScreen(){
    currentOperation.innerText = '';
    clearCurrentScreenFlag = false;
}

function keyPress(e){
    keyValue = e.key;5
    if(keyValue >= 0 && keyValue <= 9 || keyValue === '.') storeNumber(keyValue)
    if(keyValue === 'Enter' || keyValue === '=') evaluate();
    if(keyValue === 'Backspace') deleteCurrentOperation()
    if(keyValue === '/' || keyValue === '*' || keyValue === '-' || keyValue === '+')setOperation(keyValue);
    if(keyValue === 'Escape')clearAll()
}

function deleteCurrentOperation(){
    currentOperation.textContent = currentOperation.textContent.slice(0,currentOperation.textContent.length - 1);
    console.log(currentOperation.textContent)
}

function clearAll(){
 initialise();
}

function initialise(){
    currentOperation.innerText = '0';
    allOperations.innerText = '';
    firstOperand = '';
    secondOperand = '';
}

function storeNumber(number){
    if(currentOperation.innerText.includes('.') && number === '.') return
    if(currentOperation.textContent === '0' || clearCurrentScreenFlag){
        clearCurrentScreen();
    }
    currentOperation.innerText += number;
}

function setOperation(operator){
    if(currentOperator !== null) evaluate()
    firstOperand = currentOperation.textContent;
    currentOperator = operator;
    allOperations.textContent = `${firstOperand} ${currentOperator}`;
    clearCurrentScreenFlag = true;
}

function evaluate(){
    if(currentOperator === null || clearCurrentScreenFlag) return
    if(currentOperator === '÷' && currentOperation.textContent == '0'){
        console.log('error')
        return alert('Cannot divide by zero')};
    secondOperand = currentOperation.innerText;
    currentOperation.textContent = operate(currentOperator, Number(firstOperand), Number(secondOperand)).toFixed(2);
    allOperations.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
    currentOperator = null;
}

function operate(operator, x, y){
    switch(operator){
        case 'x':
            return x * y;
        case '÷':
            return x / y;
        case '/':
            return x / y;
        case '+':
            return x + y;
        case '-':
            return x - y;
    }
}
initialise();