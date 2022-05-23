// Get UI elements
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const allClear = document.getElementsByClassName("all-clear")[0];
const decimal = document.getElementsByClassName("decimal")[0];
const sign = document.getElementsByClassName("sign")[0];
const equalSign = document.getElementsByClassName("equal")[0];
const displayResult = document.getElementById("display-result");

// Init value
const INIT_CALCULATION = {
  a: 0,
  isASet: false,
  b: 0,
  isBSet: false,
  operator: "",
}

const userActivity = {... INIT_CALCULATION}

const initCalculation = () => {
  userActivity.a = 0;
  userActivity.isASet = false,
  userActivity.b = 0;
  userActivity.isBSet = false,
  userActivity.operator = ""
  displayResult.value = 0;
}

// Add
const add = (a, b) => {
	return Number(a) + Number(b);
};

// Subtract
const subtract = (a, b) => {
	return a - b;
};

// multiply
const multiply = (a, b) => {
  return a * b;
};

//Divide
const divide = (a, b) => {
  return b === 0 ? 0 : a / b
}

// Power
const power = (a, b = 2) => {
  return a ** b;
};

// Percentage
const percentage = (a, b) => {
  return (100 * a) / b;
}

// Execute operation
const operate = () => {
  const {a, b, operator} = userActivity;
  let result = 0;
  initCalculation();

  switch(operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    case 'X2':
      result = power(a, 2);
      break;
    case '%':
      result = percentage(a, b);
      break;
    default: 
      result = 0;
      break;                           
  } 
  // add the result as first value for the next operation 
  userActivity.a = result;
  // show result to display
  displayResult.value = result;
}

// Return if number is a Decimal
const isDecimal = (number) => {
  return `${number}`.indexOf('.') > -1 ? true : false;
}

// Build value 
const buildNumber = (char) => {
  let valueDisplay = 0;

  if (userActivity.operator === "") {
    if (!isDecimal(userActivity.a) || char !== '.') userActivity.a = userActivity.a === 0 ? `${char}` : `${userActivity.a}${char}`;
    valueDisplay = userActivity.a;
  } else {
    if (!isDecimal(userActivity.b) || char !== '.') userActivity.b = userActivity.b === 0 ? `${char}` : `${userActivity.b}${char}`;
    valueDisplay = userActivity.b;
  }
  // Show current value into display
  displayResult.value = valueDisplay;
}

// Add operator to calculation
const setOperator = (op) => {
  if (userActivity.operator !== "") operate()
  userActivity.operator = op;
  if (op === 'X2') operate(); // Trigger power(a, 2)
}

const signChange = () => {
  let valueDisplay = 0;

  if (userActivity.operator === "") {
    userActivity.a *= -1;
    valueDisplay = userActivity.a;
  } else {
    userActivity.b *= -1;
    valueDisplay = userActivity.b;
  }
  // Show current value into display
  displayResult.value = valueDisplay;
}

// Add Click to all buttons
allClear.addEventListener('click', () => initCalculation());
decimal.addEventListener('click', () => buildNumber(decimal.value));
equalSign.addEventListener('click', () => operate());
sign.addEventListener('click', () => signChange())

for (const number in numbers) {
  if (number < numbers.length) numbers[number].addEventListener('click', () => buildNumber(numbers[number].innerText));
}

for (const operator in operators) {
  if (operator < operators.length) operators[operator].addEventListener('click', () => setOperator(operators[operator].value))
}