import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { NavCard } from "./components/NavCard";
import Marquee from "react-fast-marquee";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
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

  const changeVariant = (value) => {
    if (value > 0) {
      return "success";
    }
    return "error";
  };

  return (
    <div className="App">
      <div className="nav-marquee">
        <Marquee
          gradient={true}
          gradientWidth={100}
          gradientColor="#000"
          delay={2}
          pauseOnHover={true}
        >
          {crypto.slice(0, 30).map((currency, key) => (
            <a
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`${currency.name} ${financial(
                currency.changePercent24Hr
              )}`}
              href="/"
              data-tooltip-variant={changeVariant(currency.changePercent24Hr)}
            >
              <NavCard
                key={key}
                name={currency.name}
                symbol={currency.symbol}
                priceUsd={financial(currency.priceUsd)}
                changePercent24Hr={financial(currency.changePercent24Hr)}
              />
            </a>
          ))}
        </Marquee>
      </div>
      <div className="container">
        <h1>Top Cryptos - As 30 criptomoedas mais negociadas</h1>
        <p>
          Atualizações a cada minuto (Última atualização: {horaAtualizacao})
        </p>
        <div className="criptos">
          {crypto.slice(0, 30).map((currency, key) => (
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
            href="https://suelytohm-portfolio.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Suelytohm Oliveira
          </a>
        </p>
      </footer>
      <Tooltip id="my-tooltip" />
    </div>
  );
}

export default App;
