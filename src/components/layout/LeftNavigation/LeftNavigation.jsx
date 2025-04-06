import React from "react";
import { Logo } from "../../../utils/constants/image";
import { UserProfile } from "../../../utils/constants/image";
import "./LeftNavigation.scss";

const LeftNavigation = ({ setActiveTab, activeTab }) => {
  return (
    <nav className="left-navigation">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <ul className="list cps-0">
        <li
          className={`${activeTab === "For You" ? "op-100" : "op-40"}`}
          onClick={() => setActiveTab("For You")}
        >
          For You
        </li>
        <li
          className={`${activeTab === "Top Tracks" ? "op-100" : "op-40"}`}
          onClick={() => setActiveTab("Top Tracks")}
        >
          Top Tracks
        </li>
        <li
          className={`${activeTab === "Favourites" ? "op-100" : "op-40"}`}
          onClick={() => setActiveTab("Favourites")}
        >
          Favourites
        </li>
        <li
          className={`${activeTab === "Recently Played" ? "op-100" : "op-40"}`}
          onClick={() => setActiveTab("Recently Played")}
        >
          Recently Played
        </li>
      </ul>

      <div className="user-profile">
        <img src={UserProfile} alt="user-profile" />
      </div>
    </nav>
  );
};

export default LeftNavigation;
