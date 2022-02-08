import React from "react";
import "./style.css";

export const ConverterInput = (props) => {
  const { amount, onAmountChange } = props;

  return (
    <div>
      <input
        type="number"
        value={amount}
        min={1}
        onChange={(e) => onAmountChange(e.target.value)}
      />
    </div>
  );
};
