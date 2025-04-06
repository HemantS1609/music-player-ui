import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./SearchInput.scss";

const SearchInput = ({
  placeholder = "Search By Workflow Name/ID",
  query,
  setQuery,
}) => {
  return (
    <div className="search-input-container">
      <div className="search-input">
        <input
          type="text"
          className="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="search-icon">
          <IoSearchOutline color="#CACACA" size={23} />
        </span>
      </div>
    </div>
  );
};

export default SearchInput;
