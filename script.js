let display = document.getElementById("display");
let currentInput = "";

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendOperator(op) {
  currentInput += op;
  updateDisplay();
}

function appendDot() {
  const last = currentInput.slice(-1);
  if (last !== ".") {
    currentInput += ".";
    updateDisplay();
  }
}

function appendConstant(value) {
  currentInput += value;
  updateDisplay();
}

function insertFunction(func) {
  currentInput += func;
  updateDisplay();
}

function toggleSign() {
  try {
    const value = eval(currentInput);
    currentInput = (-value).toString();
    updateDisplay();
  } catch {
    display.textContent = "Erro";
    currentInput = "";
  }
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function calculateResult() {
  try {
    if (currentInput.includes("Math.pow(")) {
      currentInput = currentInput.replace(/Math\.pow\(([^)]+)\)/g, (match, p1) => {
        return `Math.pow(${p1},2)`;
      });
    }

    const result = eval(currentInput);
    currentInput = result.toString();
    updateDisplay();
  } catch (e) {
    display.textContent = "Erro";
    currentInput = "";
  }
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key)) appendNumber(key);
  else if ("+-*/%()".includes(key)) appendOperator(key);
  else if (key === ".") appendDot();
  else if (key === "Enter") calculateResult();
  else if (key === "Backspace") deleteLast();
  else if (key === "Escape") clearDisplay();
});
