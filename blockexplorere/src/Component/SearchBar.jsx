import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex justify-center p-6 bg-white shadow-md rounded-lg mx-auto max-w-2xl mt-8">
      <form onSubmit={handleSubmit} className="flex w-full space-x-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by TxHash, Block #, or Address..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-gray-800"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md font-semibold font-inter
                       disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
