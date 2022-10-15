import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
const axios = require("axios").default;

function App() {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then(function (response) {
        // handle success
        setCrypto(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const financial = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Top Cryptos</h1>
        <div className="criptos">
          {crypto.slice(0, 15).map((currency, key) => (
            <Card
              key={key}
              name={currency.name}
              symbol={currency.symbol}
              priceUsd={financial(currency.priceUsd)}
              changePercent24Hr={financial(currency.changePercent24Hr)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
