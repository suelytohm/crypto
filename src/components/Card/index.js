import React, { useState, useEffect } from "react";
import "./Card.css";

import Up from "../../assets/images/up.png";
import Down from "../../assets/images/down.png";

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
      <p>Preço(USD): ${priceUsd}</p>
      <p>
        Var(24h):{" "}
        {changePercent24Hr > 0 ? "+" + changePercent24Hr : changePercent24Hr}
      </p>
      <img src={corCard === "red" ? Down : Up} alt="" />
    </div>
  );
};
