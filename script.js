
// DOM selectors
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.currentDisplay');
const displayOperator = document.querySelector('.currentOperator'); // Optional show operator here when used

//eventListeners
buttons.forEach( btn => btn.addEventListener('click', updateCalculator));
buttons.forEach( btn => btn.addEventListener('mousedown', toggleButton));
buttons.forEach( btn => btn.addEventListener('mouseup', toggleButton));

// Variables 
const operators = ['+', '-', '×', '÷'];
let firstNumber = '';
let secondNumber = '';
let selectedOperator = '';
let solution = '';
let equalsFlag = false;

//*****functions********

//initialise function, sets up calculator on start, and resets when clear is pressed
function initialise(){
  firstNumber = '';
  secondNumber = '';
  selectedOperator = '';
  solution = '';
  equalsFlag = false;
  display.innerHTML = '';
  displayOperator.innerHTML = '';
}

//visual efect for button presses, activated with event listeners
function toggleButton(e){
  e.target.classList.toggle("button-press");
}

//store number function, called on button click or decimal click
function storeNumber(value){
  //runs if the equals button has not been pressed.
  //stops adding numbers to the solution when displayed which will allow for additional operations 
  if(equalsFlag === false){
    //these 2 if statements check for existing decimal point, ignores click if there is one.
    //decided to use the operator variable contents to determine if the first or second number is the       current working number
    //if selectedOperator is not an empty string, we know we are on to the second number
    //could have set up a flag to indicate if we are on first or sencond instead
    if(selectedOperator === '' && value === '.' && firstNumber.includes('.')) return
    if(selectedOperator !== '' && value === '.' && secondNumber.includes('.')) return

    //if else statement to work out if we are on the first or second number
    //updates the string and outputs to display DOM
    if(selectedOperator === ''){
      firstNumber += value;
      display.innerHTML = firstNumber;
    }
    else {
      secondNumber += value;
      display.innerHTML = secondNumber;
    }
  }
}

//checks to see if the number passed contains a decimal point
//used back in storeNumber() to check if we skip an additional press of the decimal button
function checkForPoint(number){
  number.includes('.') ? true : false;
}

//stores and displays the operator symbol when pressed
function storeOperator(key){
  selectedOperator = key;
  equalsFlag = false; //sets the equals flag to false so we can keep adding numbers now that a new operator has been selected
  displayOperator.innerHTML = key;
}

//evaluates the calculation when '=' is pressed
function evaluate(operator, first, second){
  //only runs if the equals flag is false i.e. the equals was not the last key pressed
  //stops undefined showing when equals pressed twice
  if(equalsFlag === false){
    //convert to numbers
    first = Number(first); 
    second = Number(second);

    //clears the operator on the screen
    displayOperator.innerHTML = '';

    //switch statement to return calculation based on operator
    switch(operator){
      case '×':
        return displaySolution(first * second);
      case '÷':
        return displaySolution(first / second);
      case '+':
        return displaySolution(first + second);
      case '-':
        return displaySolution(first - second);
    }
  }
}

//this displays the solution on the display
function displaySolution(value){
  //checks if number contains decimal place
  //converts to 2 decimal places then updates display
  if(value % 2 > 0){
    console.log(value)
    solution = value.toFixed(2);
    display.innerHTML = solution;
  }
  //if no decimal places, updates to display
  else{
    display.innerHTML = value;
  }
  //sets solution to the first number so that subsequent calcs can be made
  firstNumber = value;
  secondNumber = '';
  selectedOperator = '';
}

//clears the current working number in case of mistake
function deleteCurrentNumber(){
  //if statement checks if first or second number is active when delete is pressed
  //it then sets the variable back to an empty string and then clears the display
  //does not clear everything, just the current working number
  if(selectedOperator === ''){
    firstNumber = '';
    display.innerHTML = ''
  }
  else {
    secondNumber = '';
    display.innerHTML = '';
  }
}

//this is the main function that is run when a button is pressed
function updateCalculator(event) {
  const key = event.target.dataset.value;
  
  //if statement grouping button types
  //first if looks for numbers or decimal points, run storeNumber function
  if((key >= 0 && key <= 9) || key === '.'){
    storeNumber(key);
  }
  //next else if looks for an operator key, runs storeOperator()
  else if(operators.includes(key)){
    storeOperator(key);
  }
  //next else if looks for equals key, runs evaluate to calculate solution
  //sets the equalsFlag to true, used to block undesired behavior and stop entering
  //additional numbers to the end of the result value
  else if(key === '='){
    solution = evaluate(selectedOperator, firstNumber, secondNumber);
    //displaySolution(solution);
    equalsFlag = true;
  }
  
  //if statement for the clear button
  //run initialise() and clears out variables
  else if(key === 'clear'){
    initialise();
  }
  //run the delete funtion, this will only clear the current working number, either firstNumber or secondNumber
  //unlike clear that resets the calc
  else{
    deleteCurrentNumber();
  }
}

//start of program
initialise();