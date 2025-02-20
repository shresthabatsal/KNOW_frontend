import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import HorizontalArticleItem from "../components/HorizontalArticleItem";
import api from "../services/api";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Function to handle the search
  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true); // Set hasSearched to true when a search is attempted

    try {
      const response = await api.get(`/search?query=${query}`); // Fetch search results from the backend
      setSearchResults(response.data); // Update search results
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Allow pressing Enter to search
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && <div className="loading">Loading...</div>}

      {/* Error Message */}
      {error && <div className="error">{error}</div>}

      {/* Search Results */}
      <div className="search-results">
        {hasSearched && searchResults.length === 0 ? (
          <div className="no-results">No results found.</div>
        ) : (
          searchResults.map((article) => (
            <HorizontalArticleItem key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;