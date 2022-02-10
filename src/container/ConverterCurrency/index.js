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
  const [fromAmount, setFromAmount] = React.useState(1);
  const [toAmount, setToAmount] = React.useState(1);
  const [isFrom, setIsFrom] = React.useState(true);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}${process.env.REACT_APP_KEY}`,
    }).then((res) => {
      setRates(res.data.rates);
    });
  }, []);

  React.useEffect(() => {
    if (rates) {
      handleInputChange(1, isFrom);
    }
  }, [rates]);

  const handleInputChange = (amount, isFrom) => {
    const round = (number) => Math.round(Number(number) * 100) / 100;

    if (rates[fromCurrency] && rates[toCurrency]) {
      if (isFrom) {
        setFromAmount(round(amount));
        setToAmount(round(amount * (rates[fromCurrency] / rates[toCurrency])));
        setIsFrom(true);
      } else {
        setFromAmount(
          round(amount / (rates[fromCurrency] / rates[toCurrency]))
        );
        setToAmount(round(amount));
        setIsFrom(false);
      }
    }
  };

  const handleChangeCurrency = () => {
    const value = toAmount;
    const currency = toCurrency;
    setToAmount(fromAmount);
    setFromAmount(value);
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
          <ConverterInput
            isFrom={true}
            amount={fromAmount}
            onAmountChange={handleInputChange}
          />
          <p className="text_interval">=</p>
          <ConverterInput
            isFrom={false}
            amount={toAmount}
            onAmountChange={handleInputChange}
          />
        </div>
      </div>
      <SwapCurrencies handleChangeCurrency={handleChangeCurrency} />
    </div>
  );
};
