// Declaration and assigning of variables 
let display = document.querySelector(".display");
let history = document.querySelector(".history");
let currentInput = "0";
let historyLog = [];

// Making the display element functional
function updateDisplay() {
  display.textContent = currentInput;
}

// Allowinng display element to receive inputs 
function addToInput(value) {
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

// Adding functionality to the clear button operation
function clearInput() {
  currentInput = "0";
  updateDisplay();
}

// Adding functionality to the backarrow/backspace button on calculator 
function backspace() {
    currentInput = currentInput.slice(0, -1) || "0";
  updateDisplay();
}
   
// Writing the function to make the operations functional within the display box and history also performing
function calculate() {
  try {
    // Replaces × with * and ÷ with / for eval
    let expression = currentInput.replace("×", "*").replace("÷", "/");
    let result = eval(expression);
    if (result === Infinity || isNaN(result))
      throw new Error("Invalid operation");
    historyLog.push(`${currentInput} = ${result}`);
    history.textContent = `History: ${historyLog.join(", ")}`;
    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    updateDisplay();
    setTimeout(clearInput, 1000);
  }
}

// Calling back functions for more functionality 
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (
      button.classList.contains("digit") ||
      button.classList.contains("operator")
    ) {
      addToInput(value);
    } else if (button.classList.contains("clear")) {
      clearInput();
      } else if (button.classList.contains ("backarrow") ) {
      backspace();
    } else if (button.classList.contains("equals")) {
      calculate();
    }
  });
});

// Keyboard support function
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) addToInput(key);
  else if (key === ".") addToInput(key);
  else if (key === "+") addToInput("+");
  else if (key === "-") addToInput("-");
  else if (key === "*") addToInput("×");
  else if (key === "/") addToInput("÷");
  else if (key === "Enter" || key === "=") calculate();
  else if (key === "Backspace") backspace();
  else if (key === "Escape") clearInput();
});

//Thank you