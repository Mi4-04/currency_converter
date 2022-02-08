import React from "react";
import "./style.css";

export const ConverterSelect = (props) => {
  const { value, currencies, onCurrencyChange } = props;

  return (
    <div>
      <select className="currency" value={value} onChange={e => onCurrencyChange(e.target.value)}>
        {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
      </select>
    </div>
  );
};
