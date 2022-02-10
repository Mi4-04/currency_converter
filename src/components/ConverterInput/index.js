import React from "react";
import "./style.css";

export const ConverterInput = (props) => {
  const { amount, onAmountChange, isFrom } = props;

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) =>
          onAmountChange(e.target.value < 0 ? 1 : e.target.value, isFrom)
        }
      />
    </div>
  );
};
