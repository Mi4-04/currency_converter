import React from "react";
import "./style.css";
import axios from "axios";
import { ConverterInput } from "../../components/ConverterInput";
import { ConverterSelect } from "../../components/ConverterSelect";
import { BASE_URL } from "../../constant";

export const ConverterCurrency = () => {
  const [rates, setRates] = React.useState();
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("RUB");
  const [amount, setAmount] = React.useState(1);

  React.useEffect(() => {
    axios({
      method: "GET",

      url: `${BASE_URL}${process.env.REACT_APP_KEY}/latest/${fromCurrency}`,
    }).then((res) => setRates(res.data.conversion_rates));
  }, [fromCurrency]);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value < 0 ? 0 : e.target.value);
  };

  const result = (amount * (rates && rates[toCurrency])).toFixed(2);

  const handleChangeCurrency = () => {
    setAmount(result);
    const currency = toCurrency;
    setToCurrency(fromCurrency);
    setFromCurrency(currency);
  };

  return (
    <div>
      <div className="main_container">
        <h1>Конвертер валют</h1>
        <span>Вы переходите из</span>
        <div className="main_container_select">
          <ConverterSelect
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            rates={rates}
          />
          <p className="text_interval">в</p>
          <ConverterSelect
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            rates={rates}
          />
        </div>
        <div className="main_container_input">
          <ConverterInput amount={amount} onChange={handleChangeAmount} />
          <p className="text_interval">=</p>
          <ConverterInput amount={result} />
        </div>
      </div>
      <a className="change_currency" onClick={handleChangeCurrency}>
        Поменять валюты местами
      </a>
    </div>
  );
};
