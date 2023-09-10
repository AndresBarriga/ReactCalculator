import React from 'react';
import './CalculatorButton.css'; // Import the component-specific CSS

function CalculatorButton({ value, onClick, className }) {
  return (
    <button className={`calculator-button ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
}

export default CalculatorButton;