import React from "react";
import "./style.css";

export const ConverterInput = (props) => {
  const { amount, onChange } = props;

  return (
    <div>
      <input type="number" value={amount} min={1} onChange={onChange} />
    </div>
  );
};
