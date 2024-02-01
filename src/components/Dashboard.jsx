import React, { useState } from "react";
import Coins from "./Coins";
import Dropdown from "./Dropdown";
import Graph from "./Graph";
import SearchBar from "./SearchBar";
import Header from "./Header";
import "./Dashboard.css";

let Dashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="Header">
        <Header />
      </div>
      <div className="main-graph-coin">
        <section className="main-graph">
          <div className="searchbar">
            <Dropdown handleCurrencyChange={handleCurrencyChange} />
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="full-graph">
            <Graph currency={selectedCurrency} />
          </div>
        </section>
        <section className="main-coin">
          <Coins currency={selectedCurrency} searchQuery={searchQuery} />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
