// Dropdown.js

import React, { useState } from "react";

const Dropdown = ({ handleCurrencyChange }) => {
  const [currency, setCurrency] = useState("INR");
  const currencyList = ["INR", "USD"];

  const handleChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    handleCurrencyChange(newCurrency);
  };

  return (
    <select
      className=" currency border-black-100 outline-none  font-bold ml-20 bg-[#AFE1DF] p-2.5 rounded-md"
      value={currency}
      onChange={handleChange}
    >
      {currencyList.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
