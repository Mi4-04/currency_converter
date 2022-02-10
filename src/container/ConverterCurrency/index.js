import React from "react";
import "./style.css";
import axios from "axios";
import { ConverterInput } from "../../components/ConverterInput";
import { ConverterSelect } from "../../components/ConverterSelect";
import { BASE_URL } from "../../constant";
import { SwapCurrencies } from "../../components/SwapCurrencies";

export const ConverterCurrency = () => {
  const [rates, setRates] = React.useState([]);
  const [fromCurrency, setFromCurrency] = React.useState("USD");
  const [toCurrency, setToCurrency] = React.useState("RUB");
  const [amount, setAmount] = React.useState(1);
  const [isFrom, setIsFrom] = React.useState(true);

  const handleFrom = React.useCallback((amount) => {
    setAmount(Number(amount));
    setIsFrom(true);
  }, []);

  const handleTo = React.useCallback((amount) => {
    setAmount(Number(amount));
    setIsFrom(false);
  }, []);

  const round = (number) => Math.round(number * 100) / 100;

  const rate =
    rates[fromCurrency] && rates[toCurrency]
      ? rates[fromCurrency] / rates[toCurrency]
      : 1;

  let fromAmount, toAmount;
  if (isFrom) {
    fromAmount = round(amount);
    toAmount = round(amount * rate);
  } else {
    fromAmount = round(amount / rate);
    toAmount = round(amount);
  }

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}${process.env.REACT_APP_KEY}`,
    }).then((res) => {
      setRates(res.data.rates);
    });
  }, []);

  const handleChangeCurrency = () => {
    const currency = toCurrency;
    setToCurrency(fromCurrency);
    setFromCurrency(currency);
  };

  const currencies = Object.keys(rates);

  return (
    <div>
      <div className="main_container">
        <h1>Конвертер валют</h1>
        <span>Вы переходите из</span>
        <div className="main_container_select">
          <ConverterSelect
            value={toCurrency}
            onCurrencyChange={setToCurrency}
            currencies={currencies}
          />
          <p className="text_interval">в</p>
          <ConverterSelect
            value={fromCurrency}
            onCurrencyChange={setFromCurrency}
            currencies={currencies}
          />
        </div>
        <div className="main_container_input">
          <ConverterInput amount={fromAmount} onAmountChange={handleFrom} />
          <p className="text_interval">=</p>
          <ConverterInput amount={toAmount} onAmountChange={handleTo} />
        </div>
      </div>
      <SwapCurrencies handleChangeCurrency={handleChangeCurrency} />
    </div>
  );
};
