const DIVIDE = '/';
const MULTIPLY = '*';
const ADDITION = '+';
const SUBTRACT = '-';

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');

numberButtons.forEach(button => 
    button.addEventListener('click', () => storeNumber(button.textContent)));
operatorButtons.forEach(button => 
    button.addEventListener('click', () => setOperation(button.textContent)));



let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let newCalculation = true;
let operatorFlag = false;
let result = '';

function add(x, y){
    return x * y;
}

function div(x, y){
    return x / y;
}

function add(x, y){
    return x + y;
}

function sub(x, y){
    return x - y;
}

function operate(operator, x, y){

}

function initialise(){
    document.querySelector('.current-operation').innerText = '0';
    result = 0;
}

function storeNumber(number){
    if(newCalculation){
        document.querySelector('.current-operation').innerText = '';
        newCalculation = false;
    }
    document.querySelector('.current-operation').innerText += number;
}

function convertOperator(operator){
    switch(operator){
        case 'x':
            currentOperator = '*';
            break;
        case '+':
            currentOperator = '+';
            break;
        case '-':
            currentOperator = '-';
            break;
        case '&#247;':
            currentOperator = '/';
            break;
    }
}

function setOperation(operator){
    firstOperand = document.querySelector('.current-operation').innerText;
    if(firstOperand == ''){
         alert('You need to enter a number first')
    } else{
        convertOperator(operator);
    }
}

initialise();