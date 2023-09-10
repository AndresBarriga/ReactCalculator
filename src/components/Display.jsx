// src/components/Display/Display.jsx
import React from 'react';
import './Display.css'; // Import the component-specific CSS

function Display({ currentOperand, previousOperand }) {
  return (
    <div className="output">
      <div className="previous-operand">{previousOperand}</div>
      <div className="current-operand">{currentOperand}</div>
    </div>
  );
}

export default Display;