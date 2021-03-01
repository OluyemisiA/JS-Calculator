// Sidebar
const openSideBar = document.querySelector(".openbtn");

const closeSideBar = document.querySelector(".closebtn");

openSideBar.addEventListener("click", () => {
  document.querySelector(".sidebar").style.width = "250px";
});

closeSideBar.addEventListener("click", () => {
  document.querySelector(".sidebar").style.width = "0";
});

//Calculator logic
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator-keys");

//Values to be evaulated
let firstValue = "";
let activeOperator = "";
let secondValue = "";
let hasAnswer = false;
let displayedNum = 0;
let history = "";
let previousKey = "";
let previousUnary = ""
let previousAction = ""

//Adding event listeners using event delegation
keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const keyContent = key.textContent;
    const action = key.dataset.action;
    const unary = key.dataset.unary;
    const command = key.dataset.command;
    displayedNum = reverseNumberFormat(getResult());
    history = getHistory();

    if (!action) {
      if (displayedNum === "0" || hasAnswer) {
        printResult(keyContent);
        hasAnswer = false;
      } else {
        const number = displayedNum + keyContent;
        printResult(number);
      }
    }


    if (action) {
      binaryOperator(action, keyContent)
    }
    if (unary) {
      unaryOperator(unary, keyContent)
    }

    previousKey = action ? "operator" : command ? "comand" : unary ? "unary" : "number"

    if (unary) {
      previousUnary = unary
    }
    if (action) {
      previousAction = action;
    }

    // The function called when command buttons are clicked.
    execute(command);
  }
});


// functions
function binaryOperator(action, keyContent) {

  // asigning the left hand value after binary operation click
  if (!firstValue) {
    firstValue = displayedNum;
    history = history + firstValue;
    printResult("");
  }

  // asigning the right hand value after binary operation click
  if (firstValue && activeOperator) {
    secondValue = displayedNum;

    //handles the printing of history
    if (previousKey === "operator") {
      let historyArray = history.split(/\s/);
      historyArray.splice(historyArray.length - 1, 1, keyContent)
      let newHistory = historyArray.join(' ')
      history = newHistory
    } else if (previousKey === "unary") {
      history = `${history} ${keyContent}`
    } else {
      history = history + " " + secondValue + ` ${keyContent}`;
    }
    printHistory(history)
  }

  if (
    activeOperator === "" ||
    (activeOperator && previousKey === "operator")
  ) {
    activeOperator = action;
    if (previousKey !== "operator") {
      history = history + ` ${keyContent}`;
      printHistory(history);
    }
  } else {
    firstValue = evaulate(firstValue, activeOperator, secondValue).toString();
    printResult(firstValue);
    activeOperator = action;
    secondValue = "";
    hasAnswer = true;
  }
}

function unaryOperator(unary, keyContent) {
  let result = evaulate(displayedNum, unary, null).toString()
  if (!firstValue) {
    firstValue = result;
    history = `${history} ${displayedNum} ${keyContent}`
    printResult(firstValue)
    printHistory(history)
  } else if (firstValue && previousAction) {
    secondValue = result
    history = `${history} ${displayedNum} ${keyContent}`
    printResult(result)
    printHistory(history)
  }
  hasAnswer = true
}

function getHistory() {
  return document.querySelector(".history").textContent;
}

function printHistory(num) {
  document.querySelector(".history").textContent = num;
}

function getResult() {
  return document.querySelector(".result").textContent;
}

function printResult(num) {
  if (num === 0) {
    document.querySelector(".result").textContent = num;
  } else if (num.includes(".")) {
    document.querySelector(".result").textContent = num;
  } else {
    document.querySelector(".result").textContent = getFormattedNumber(num);
  }
}

function getFormattedNumber(num) {
  const number = Number(num);
  const value = number.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  return num.replace(/,/g, "");
}

//Functions for operators
function sum(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a + b;
}

function subtract(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a - b;
}

function multiply(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a * b;
}

function divide(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  return a / b;
}

function percentage(a) {
  a = parseFloat(a);
  return a / 100;
}

function inv(a) {
  a = parseFloat(a);
  return 1 / a;
}

function sqr(a) {
  a = parseFloat(a);
  return Math.pow(a, 2);
}

function sqrt(a) {
  a = parseFloat(a);
  return Math.sqrt(a);
}

function negation(a) {
  a = parseFloat(a);
  if (a < 0) {
    return Math.abs(a);
  } else {
    return -Math.abs(a);
  }
}

function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

function evaulate(firstValue, activeOperator, secondValue) {
  let result = "";
  switch (activeOperator) {
    case "add":
      result = sum(firstValue, secondValue);
      break;
    case "multiply":
      result = multiply(firstValue, secondValue);
      break;
    case "divide":
      result = divide(firstValue, secondValue);
      break;
    case "subtract":
      result = subtract(firstValue, secondValue);
      break;
    case "percentage":
      result = percentage(firstValue);
      history = history + firstValue;
      console.log("sup: ", history);
      break;
    case "inv":
      result = inv(firstValue);
      break;
    case "sqr":
      result = sqr(firstValue);
      break;
    case "square-root":
      result = sqrt(firstValue);
      break;
    case "factorial":
      result = factorial(firstValue);
      break;
    case "negation":
      result = negation(firstValue);
      break;
    default:
      break;
  }
  return result;
}

function execute(command) {
  switch (command) {
    case "clear":
      firstValue = "";
      secondValue = "";
      activeOperator = "";
      printResult(0);
      printHistory("");
      break;
    case "delete":
      displayedNum = displayedNum.toString().slice(0, getResult.length - 1);
      displayedNum.length === 0 ? printResult(0) : printResult(displayedNum);
      break;
    case "decimal":
      if (!displayedNum.includes(".")) {
        displayedNum = displayedNum + ".";
      }
      printResult(displayedNum);
    default:
      break;
  }
}
