import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
const axios = require("axios").default;

function App() {
  const [crypto, setCrypto] = useState([]);
  const [horaAtualizacao, setHoraAtualizacao] = useState("");

  useEffect(() => {
    buscarDados();

    const intervalo = setInterval(() => {
      buscarDados();
      return () => clearInterval(intervalo);
    }, 60000);
  }, []);

  const buscarDados = () => {
    let now = new Date();

    //    let minutes = (now.getMinutes()<10? '0':'') + now.getMinutes();
    setHoraAtualizacao(
      `${now.getHours()}:${
        (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
      }`
    );

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
  };

  const financial = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Top Cryptos - As 15 criptomoedas mais negociadas</h1>

        <p>Última atualização: {horaAtualizacao}</p>
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
      <footer>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://suelytohm-portfolio.netlify.com/"
            target="_blank"
            rel="noreferrer"
          >
            Suelytohm Oliveira
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
