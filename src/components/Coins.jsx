// Coins.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import { Link } from "react-router-dom";
import "./Coins.css";

const Coins = ({ currency, searchQuery }) => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const currencySymbol = currency === "INR" ? "₹" : "$";

  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(
          `${BaseUrl}/coins/markets?vs_currency=${currency}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getExchangesData();
  }, [currency]);

  const filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="coins-container"
      style={{ width: "auto", textAlign: "center" }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="heading">
            <h1 className="font-bold text-2xl font-owswald">
              CrytoCurrency By Market Cap ({currency})
            </h1>
          </div>
          <div className="coins-list">
            {filteredCoins.map((item) => (
              <Link to={`/${item.id}`} key={item.id}>
                <CoinCard item={item} currencySymbol={currencySymbol} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Coins;
