import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search-container">
        <div class="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
                <FaSearch />
            </button>
      </div>
    </div>
  );
};

export default Search;