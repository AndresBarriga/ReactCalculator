import React, { useState, useEffect } from 'react';
import './Calculator.css';
import './CalculatorButton.css';
import CalculatorButton from './CalculatorButton'; 
import Display from './Display';

function Calculator() {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operator, setOperator] = useState('');
  const [displayOperator, setDisplayOperator] = useState('');
  const [commaClicked, setCommaClicked] = useState(false);
  const [resultDisplayed, setResultDisplayed] = useState(false);

  // Function to handle button clicks
  function handleButtonClick(event, value) {
    if (!isNaN(value) || value === ',') {
      if (value === ',') {
        commaClickHandler();

      } else {
          if (resultDisplayed) {
            setCurrentOperand(value);
            setResultDisplayed(false); 
          } else {  
          if (operator === '') {
            setCurrentOperand(prevDigit => prevDigit + value);
          } else {
            setCurrentOperand(prevOperand => prevOperand + value);
          }
        }
      }
    } else {
      if (currentOperand !== '') {
        setOperator(value);
        setDisplayOperator(value);
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
        setCommaClicked(false);
        
      }
    }
  }

  // Function to handle "=" button click for calculation
  function handleCalculate() {
    if (operator && currentOperand && previousOperand) {
      const firstNumber = parseFloat(previousOperand.replace(',', '.'));
      const secondNumber = parseFloat(currentOperand.replace(',', '.'));
      let result = "";

      switch (operator) {
        case '+':
          result= (firstNumber + secondNumber).toString().replace('.', ',');
          break;
        case '-':
          result = (firstNumber - secondNumber).toString().replace('.', ',');
          break;
        case '*':
          result = ((firstNumber * secondNumber).toString().replace('.', ','));
          break;
        case '/':
          if (secondNumber === 0) {
            setCurrentOperand('Error'); // Handle division by zero
          } else {
            result = (firstNumber / secondNumber).toString().replace('.', ',');
          }
          break;
        case '%':
          result = (firstNumber % secondNumber).toString().replace('.', ',');
          break;
        default:
          break;
      }
      if (result.includes(',')) {
        const decimalPlaces = result.split(',')[1].length;
        if (decimalPlaces > 5) {
          result = parseFloat(result.replace(',', '.')).toFixed(5);
        }
      }
      setCurrentOperand(result);
      setDisplayOperator("");
      setPreviousOperand('');
      setOperator('');
      setResultDisplayed(true);
    }
  }

  // Function to clear the calculator
  function handleClear() {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperator('');
    setDisplayOperator('');
    setCommaClicked(false);
  }

  // Function to handle DEL button click
  function handleDelete() {
    const updatedOperand = currentOperand.slice(0, -1);
    setCurrentOperand(updatedOperand);
  }

  // Function to handle comma click
  function commaClickHandler() {
    if (!commaClicked) {
      setCurrentOperand(prevOperand => prevOperand + ',');
      setCommaClicked(true);
    }
  }

  useEffect(() => {
    function handleKeyPress(event) {
      const key = event.key;

      if ((key >= '0' && key <= '9') || key === ',') {
        setCurrentOperand(prevOperand => prevOperand + key);
      } else if (['+', '-', '*', '/', '%'].includes(key)) {
        setOperator(key);
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
        setCommaClicked(false);
      } else if (key === 'Enter' || key === '=') {
        // If "=" key is pressed or Enter key, call handleCalculate
        handleCalculate();
      } else if (key === 'Backspace') {
        setCurrentOperand(prevInput => prevInput.slice(0, -1));
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentOperand, operator, previousOperand, commaClicked]);

  return (
    <div className="calculator-grid">
      <Display currentOperand={currentOperand} displayOperator={displayOperator} previousOperand={previousOperand} />

      {/* Calculator buttons */}
      <CalculatorButton value="%" onClick={(event) => handleButtonClick(event, "%")} />
      <CalculatorButton value="AC" onClick={handleClear} className="span-two" />
      <CalculatorButton value="DEL" onClick={handleDelete} className="del" />
      <CalculatorButton value="1" onClick={(event) => handleButtonClick(event, "1")} />
      <CalculatorButton value="2" onClick={(event) => handleButtonClick(event, "2")} />
      <CalculatorButton value="3" onClick={(event) => handleButtonClick(event, "3")} />
      <CalculatorButton value="+" onClick={(event) => handleButtonClick(event, "+")} />
      <CalculatorButton value="4" onClick={(event) => handleButtonClick(event, "4")} />
      <CalculatorButton value="5" onClick={(event) => handleButtonClick(event, "5")} />
      <CalculatorButton value="6" onClick={(event) => handleButtonClick(event, "6")} />
      <CalculatorButton value="-" onClick={(event) => handleButtonClick(event, "-")} />
      <CalculatorButton value="7" onClick={(event) => handleButtonClick(event, "7")} />
      <CalculatorButton value="8" onClick={(event) => handleButtonClick(event, "8")} />
      <CalculatorButton value="9" onClick={(event) => handleButtonClick(event, "9")} />
      <CalculatorButton value="*" onClick={(event) => handleButtonClick(event, "*")} />
      <CalculatorButton value="," onClick={commaClickHandler} />
      <CalculatorButton value="0" onClick={(event) => handleButtonClick(event, "0")} />
      <CalculatorButton value="/" onClick={(event) => handleButtonClick(event, "/")} />
      <CalculatorButton value="=" onClick={handleCalculate} />
    </div>
  );
}

export default Calculator;
