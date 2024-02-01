import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <>
      <input
        className=" search-bar p-2 border border-blue rounded-l-md w-4/5 ml-20 outline-none"
        type="text"
        placeholder="Search by Coin"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </>
  );
};

export default SearchBar;
