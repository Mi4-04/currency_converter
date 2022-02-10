import React from "react";
import "./style.css";
export const SwapCurrencies = (props) => {
  const { handleChangeCurrency } = props;

  return (
    <div>
      <a className="change_currency" onClick={handleChangeCurrency}>
        Поменять валюты местами
      </a>
    </div>
  );
};
