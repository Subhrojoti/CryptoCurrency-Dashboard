import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "./baseUrl";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Bitcoin", "Ethereum", "XRP", "Solana"],
  datasets: [
    {
      label: "Value in $",
      data: [400, 300, 100, 200],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1.5,
      hoverBackgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
      ],
      hoverBorderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
    },
  ],
};

const Portfolio = ({ currency }) => {
  const [coinlist, setCoinlist] = useState([]);
  const [sellCoin, setSellCoin] = useState(null);
  const [buyCoin, setBuyCoin] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [exchangeValue, setExchangeValue] = useState(0);

  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(
          `${BaseUrl}/coins/markets?vs_currency=${currency}`
        );
        setCoinlist(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getExchangesData();
  }, [currency]);

  const handleSellCoinChange = (selectedSellCoin) => {
    setSellCoin(selectedSellCoin);
  };

  const handleBuyCoinChange = (selectedBuyCoin) => {
    setBuyCoin(selectedBuyCoin);
  };

  const handleExchange = () => {
    if (sellCoin && buyCoin) {
      // Example: Calculate the number of coins based on a simple ratio (replace this with your actual logic)
      const exchangeRate = buyCoin.current_price / sellCoin.current_price;
      const numberOfCoinsToBuy = inputValue / exchangeRate;
      setExchangeValue(numberOfCoinsToBuy);
    }
  };

  return (
    <>
      <div className="main">
        <div className="portfolio">
          <div className="stock">
            <p className="ammount"> Portfolio </p>
            <p className="total-value">
              <span>Total Value</span> $1000
            </p>
          </div>
          <div className="pie">
            <Pie data={data} />
          </div>
        </div>
        <div className="exchange">
          <p className="exchange-coins">Exchange Coins</p>
          <div className="sell">
            <p className="trade-sell"> SELL </p>
            <select
              value={sellCoin ? sellCoin.id : ""}
              className="value"
              onChange={(e) =>
                handleSellCoinChange(
                  coinlist.find((coin) => coin.id === e.target.value)
                )
              }
            >
              <option disabled value="">
                Select a Coin
              </option>
              {coinlist.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
            <input
              className="exchange-val"
              placeholder="Enter value"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="buy">
            <p className="trade-buy"> BUY </p>
            <select
              value={buyCoin ? buyCoin.id : ""}
              className="value"
              onChange={(e) =>
                handleBuyCoinChange(
                  coinlist.find((coin) => coin.id === e.target.value)
                )
              }
            >
              <option disabled value="">
                Select a Coin
              </option>
              {coinlist.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
            <div className="buy-ex-val">
              <p className="ex-val">{exchangeValue.toFixed(2)} Coins</p>
            </div>
          </div>
          <div id="ex-btn">
            <button className="exchange-btn" onClick={handleExchange}>
              Exchange
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
