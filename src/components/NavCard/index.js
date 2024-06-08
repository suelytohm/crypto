import React, { useEffect, useState } from "react";
import "./navcard.css";

import Up from "../../assets/images/up.png";
import Down from "../../assets/images/down.png";

export const NavCard = ({ name, symbol, priceUsd, changePercent24Hr }) => {
  const [corCard, setCorCard] = useState("");

  useEffect(() => {
    if (changePercent24Hr <= 0) {
      setCorCard("red");
    } else {
      setCorCard("green");
    }
  }, [changePercent24Hr]);

  return (
    <div className={`nav-card `}>
      <p>
        {symbol}
        {/* {name} */}
      </p>
      <div className="nav-body-card">
        <div className="text-card">
          <p>${priceUsd}</p>
        </div>
        <img src={corCard === "red" ? Down : Up} alt="" />
      </div>
    </div>
  );
};
