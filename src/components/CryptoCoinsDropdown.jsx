import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import "./Dashboard.css";

const CryptoDropdown = ({ currency, onCoinSelect, onChartTypeSelect }) => {
  const [coinNames, setCoinNames] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("line");

  useEffect(() => {
    const fetchCoinNames = async () => {
      try {
        const { data } = await axios.get(
          `${BaseUrl}/coins/markets?vs_currency=${currency}`
        );
        const coinName = data.map((coin) => coin.name);
        setCoinNames(coinName);
      } catch (error) {
        console.error("Error fetching coin names:", error);
      }
    };

    fetchCoinNames();
  }, [currency]);

  const handleCoinChange = (event) => {
    const selectedCoin = event.target.value;
    setSelectedCoin(selectedCoin);
    if (onCoinSelect) {
      onCoinSelect(selectedCoin);
    }
  };

  const handleChartTypeChange = (event) => {
    const selectedChartType = event.target.value;
    setSelectedChartType(selectedChartType);
    if (onChartTypeSelect) {
      onChartTypeSelect(selectedChartType);
    }
  };

  return (
    <div className="crypto-dropdown ">
      <select
        className="coin-db"
        value={selectedCoin}
        onChange={handleCoinChange}
      >
        <option value="" disabled>
          Cryptocurrency
        </option>
        {coinNames.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="chart-db"
        value={selectedChartType}
        onChange={handleChartTypeChange}
      >
        <option value="" disabled>
          Select Chart Type
        </option>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
    </div>
  );
};

export default CryptoDropdown;
