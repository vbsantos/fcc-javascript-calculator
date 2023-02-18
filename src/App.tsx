import { useState } from 'react'
import './style.css'

const OPERATORS = ["+", "-", "/", "*", "="];

export const App = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const getLastInput = () => input.trim().split(" ").at(-1) || "";

  const isOperator = (input: string) => OPERATORS.includes(input);

  const handleNumberClick = (num: string) => {
    const isZero = ["0", "000"].includes(num);

    if (isZero) {
      const lastInput = getLastInput();
      const isLastInputOperator = isOperator(lastInput);
      if (isLastInputOperator) {
        setInput(prev => prev + "0");
      } else {
        if (lastInput !== "0" && lastInput !== "") {
          setInput(prev => prev + num);
        }
      }
    } else {
      if (input === "" || input === "0") {
        setInput(num);
      } else if (input.endsWith(" 0")) {
        setInput(prev => prev.slice(0, -1) + num);
      } else {
        setInput(prev => prev + num);
      }
    }
  };

  const calculate = () => {
    const previousInput = input;
      try {
        return eval(input).toString();
      } catch (error) {
        setError(true)
        setTimeout(() => setError(false), 1000)
        return previousInput
      }
  }

  const handleOperationClick = (op: string) => {
    let newInput = "";
    if (input === "") {
      newInput = "0";
    }

    if (op === "=") {
      newInput += calculate();
    } else {
      const lastInput = getLastInput();
      const isLastInputOperator = isOperator(lastInput);
      if ((lastInput === "" || isLastInputOperator) && op !== "-") {
        if (lastInput === "-") {
          const secondLastInput = input.trim().split(" ").at(-2) || "";
          const secondLastInputIsOperator = OPERATORS.includes(secondLastInput);
          if (secondLastInputIsOperator) {
            newInput += input.slice(0, -5) + ` ${op} `;
          } else {
            newInput += input.slice(0, -3) + ` ${op} `;
          }
        } else {
          newInput += input.slice(0, -3) + ` ${op} `;
        }
      } else {
        if (lastInput === "-" && op === "-") {
          newInput += input.slice(0, -3) + ` ${op} `;

        } else {
          newInput += isLastInputOperator ? input + `${op} ` : input + ` ${op} `;
        }
      }
    }

    setInput(newInput)
  };

  const handleDecimalClick = () => {
    if (!input.split(" ")?.at(-1)?.includes(".")) {
      setInput(prev => prev + ".");
    }
  };

  const handleClearClick = () => {
    setInput("");
  };

  return (
    <div id="main-container">
      <div id="calculator">
        <div id="display">
          {error ? "ERROR" : `${input || 0}`}
        </div>
        <div id="keyboard">
          <button id="clear" onClick={handleClearClick}>AC</button>
          <button id="divide" onClick={() => handleOperationClick("/")}>/</button>
          <button id="multiply" onClick={() => handleOperationClick("*")}>×</button>
          <button id="seven" onClick={() => handleNumberClick("7")}>7</button>
          <button id="eight" onClick={() => handleNumberClick("8")}>8</button>
          <button id="nine" onClick={() => handleNumberClick("9")}>9</button>
          <button id="subtract" onClick={() => handleOperationClick("-")}>-</button>
          <button id="four" onClick={() => handleNumberClick("4")}>4</button>
          <button id="five" onClick={() => handleNumberClick("5")}>5</button>
          <button id="six" onClick={() => handleNumberClick("6")}>6</button>
          <button id="add" onClick={() => handleOperationClick("+")}>+</button>
          <button id="one" onClick={() => handleNumberClick("1")}>1</button>
          <button id="two" onClick={() => handleNumberClick("2")}>2</button>
          <button id="three" onClick={() => handleNumberClick("3")}>3</button>
          <button id="equals" onClick={() => handleOperationClick("=")}>=</button>
          <button id="zero" onClick={() => handleNumberClick("0")}>0</button>
          {/* <button id="zero2" onClick={() => handleNumberClick("00")}>00</button> */}
          <button id="zero3" onClick={() => handleNumberClick("000")}>000</button>
          <button id="decimal" onClick={() => handleDecimalClick()}>.</button>
        </div>
      </div>
    </div>
  );
}
