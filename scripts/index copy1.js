// Sidebar
const openSideBar = document.querySelector(".openbtn");

const closeSideBar = document.querySelector(".closebtn");

openSideBar.addEventListener("click", () => {
  document.querySelector(".sidebar").style.width = "250px";
});

closeSideBar.addEventListener("click", () => {
  document.querySelector(".sidebar").style.width = "0";
});

// functions
function getHistory() {
  return document.querySelector(".history").value;
}

function printHistory(num) {
  document.querySelector(".history").value = num;
}

function getResult() {
  return document.querySelector(".result").value;
}

function printResult(num) {
  if (num === "") {
    document.querySelector(".result").value = "";
  } else {
    document.querySelector(".result").value = getFormattedNumber(num);
  }
}

function clearResult() {
  if (getResult !== "") {
    printResult("");
  }
}

function getFormattedNumber(num) {
  const number = Number(num);
  const value = number.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

function sum(num) {
  a = Number(num.slice(0, 1));
  b = Number(num.slice(1, num.length));
  return a + b;
}

//Numbers
const digits = document.querySelectorAll(".digits");
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    const numberPressed = digit.textContent;
    let result = reverseNumberFormat(getResult());
    if (result != NaN) {
      result = result + numberPressed;
      printResult(result);
    }
  });
});

//Operators
const operators = document.querySelectorAll(".operator");
   
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    const operatorPressed = operator.textContent;
    console.log(operatorPressed);
    let result = reverseNumberFormat(getResult());
    // if (operatorPressed === "AC") {
    //   printHistory("");
    //   printResult(0);
    // } else if (operatorPressed === "DEL") {
    //   result = result.toString().slice(0, getResult.length - 1);
    //   result.length === 0 ? printResult(0) : printResult(result);
    // } else {
    //   let history = getHistory();
    //   if (result !== "") {
    //     history = history + result;
    //     console.log({result, history})
    //     if(operator.textContent !== "="){
    //         history = history + `${operator.textContent}`;
    //     }
    //     printHistory(history);
    //     clearResult();
    //     const History = history.replace(/\+/g, " ");
    //     if(history.length === 4){
    //         const output = sum(History);
    //         printResult(output)

    //     }
        
        
    //   } else {
          
    //   }
    // }

    // switch (operatorPressed) {
    //   //   case "+/-":
    //   //     printHistory("");
    //   //     if (result < 0) {
    //   //       printResult(Math.abs(result));
    //   //     } else {
    //   //       printResult(-Math.abs(result));
    //   //     }
    //   //     break;

    //   //   case "%":
    //   //     printHistory(result / 100);
    //   //     printResult(result / 100);
    //   //     break;

    //   //   case "1/x":
    //   //     printHistory(`1 / (${result})`);
    //   //     printResult(1 / result);
    //   //     break;

    //   //   case "x²":
    //   //     printHistory(`sqr(${result})`);
    //   //     printResult(Math.pow(result, 2));
    //   //     break;

    //   //   case "√":
    //   //     printHistory(`√(${result})`);
    //   //     printResult(Math.sqrt(result));
    //   //     break;

    //   //   case "x!":
    //   //     printHistory(`fact(${result})`);
    //   //     printResult(factorial(result));
    //   //     break;

    //   case "+":
    //     let history = getHistory();
    //     if (result === 0 || result !== "") {
    //       history = history + result;
    //       history = history + `${operator.textContent}`;
    //       clearResult(result);
    //       printHistory(history);
    //       const History = history.replace(/\+/g, " ");

    //       const output = sum(History);
    //       console.log({ output });
    //       //   printResult(output);
    //     } else {
    //     }
    //     break;

    //   //   case "=":
    //   //     printResult(2);

    //   default:
    //     break;
    // }
  });
});
