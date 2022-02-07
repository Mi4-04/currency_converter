import React from "react";
import "./style.css";

export const ConverterSelect = (props) => {
  const { value, rates, onChange } = props;

  return (
    <div>
      <select className="currency" value={value} onChange={onChange}>
        {rates &&
          Object.keys(rates).map((rate) => (
            <option key={rate} defaultValue={rate}>
              {rate}
            </option>
          ))}
      </select>
    </div>
  );
};
