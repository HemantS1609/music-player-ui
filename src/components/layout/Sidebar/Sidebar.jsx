import React, { useState } from "react";
import SearchInput from "../../Input/SearchInput/SearchInput";
import "./Sidebar.scss";

const Sidebar = ({
  activeTab,
  songList,
  setCurrentIndex,
  currentIndex,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="sidebar">
      <h1 className="text-32-700 lh-36 cmb-24">{activeTab}</h1>
      <SearchInput
        placeholder="Search Song, Artist"
        query={searchQuery}
        setQuery={setSearchQuery}
      />
      <div className="cmt-24 song-list-container">
        {songList?.length > 0 ? (
          songList?.map((elem, index) => (
            <div
              className={`${
                currentIndex === index ? "active-box" : ""
              } song-box pointer`}
              key={index}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="d-flex align-items-center gap-2">
                <img
                  src={elem?.thumbnail}
                  alt={"thumbnail"}
                  className="thumbnail"
                />
                <div className="d-flex flex-column">
                  <span className="text-18-400 color-ffff">{elem?.title}</span>
                  <span className="text-14-400 lh-24 color-ffff">
                    {elem?.artistName}
                  </span>
                </div>
              </div>
              <span className="color-ffff">{elem?.duration}</span>
            </div>
          ))
        ) : (
          <p className="no-results">No songs found</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
