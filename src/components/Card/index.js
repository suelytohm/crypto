import React, { useState, useEffect } from "react";
import "./Card.css";

// import Up from "../../assets/images/up.png";
// import Up from "../../assets/svg/arrowUp.svg";
import Up from "../../assets/svg/up.png";
// import Down from "../../assets/images/down.png";
import Down from "../../assets/svg/down.png";

export const Card = ({ name, symbol, priceUsd, changePercent24Hr }) => {
  const [corCard, setCorCard] = useState("");

  useEffect(() => {
    if (changePercent24Hr <= 0) {
      setCorCard("red");
    } else {
      setCorCard("green");
    }
  }, [changePercent24Hr]);

  return (
    <div className={`card ` + corCard}>
      <h2>
        {name} ({symbol})
      </h2>
      <div className="body-card">
        <div className="text-card">
          <p>Preço(USD): ${priceUsd}</p>
          <p>
            Variação:{" "}
            {changePercent24Hr > 0
              ? "+" + changePercent24Hr
              : changePercent24Hr}
          </p>
        </div>
        <img src={corCard === "red" ? Down : Up} alt="" />
      </div>
    </div>
  );
};
