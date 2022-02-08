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

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}${process.env.REACT_APP_KEY}`,
    }).then((res) => {
      setRates(res.data.rates);
    });
  }, []);

  React.useEffect(() => {
    if (!!rates) {
      function init() {
        handleFromAmountChange(1);
      }
      init();
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(2);
  }

  const handleFromAmountChange = (fromAmount) => {
    if (fromCurrency !== null && toCurrency !== null) {
      setToAmount(
        format((fromAmount * rates[toCurrency]) / rates[fromCurrency])
      );
      setFromAmount(fromAmount);
    }
  };

  const handleFromCurrencyChange = (fromCurrency) => {
    if (fromCurrency !== null && toCurrency !== null) {
      setToAmount(
        format((fromAmount * rates[toCurrency]) / rates[fromCurrency])
      );
      setFromCurrency(fromCurrency);
    }
  };

  const handleToAmountChange = (toAmount) => {
    if (fromCurrency !== null && toCurrency !== null) {
      setFromAmount(
        format((toAmount * rates[fromCurrency]) / rates[toCurrency])
      );
      setToAmount(toAmount);
    }
  };

  const handleToCurrencyChange = (toCurrency) => {
    if (fromCurrency !== null && toCurrency !== null) {
      setFromAmount(
        format((toAmount * rates[fromCurrency]) / rates[toCurrency])
      );
      setToCurrency(toCurrency);
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

  return (
    <div>
      <div className="main_container">
        <h1>Конвертер валют</h1>
        <span>Вы переходите из</span>
        <div className="main_container_select">
          <ConverterSelect
            value={fromCurrency}
            onCurrencyChange={handleFromCurrencyChange}
            currencies={Object.keys(rates)}
          />
          <p className="text_interval">в</p>
          <ConverterSelect
            value={toCurrency}
            onCurrencyChange={handleToCurrencyChange}
            currencies={Object.keys(rates)}
          />
        </div>
        <div className="main_container_input">
          <ConverterInput
            amount={fromAmount}
            onAmountChange={handleFromAmountChange}
          />
          <p className="text_interval">=</p>
          <ConverterInput
            amount={toAmount}
            onAmountChange={handleToAmountChange}
          />
        </div>
      </div>
      <SwapCurrencies handleChangeCurrency={handleChangeCurrency} />
    </div>
  );
};
