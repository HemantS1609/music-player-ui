import React from "react";
import "./RecentPlayed.scss";

const RecentPlayed = ({ recentlyPlayed }) => {
  console.log("recentlyPlayed", recentlyPlayed);

  return (
    <div className="recent-played-container">
      <h1 className="text-32-700 lh-36 cmb-24">Recently Played</h1>

      <div className="cmt-24 row gy-4">
        {recentlyPlayed?.length > 0 ? (
          recentlyPlayed?.map((elem, index) => (
            <div className="col-md-4 h-100" key={index}>
              <div className="recent-played-song h-100">
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={elem?.thumbnail}
                    alt={"thumbnail"}
                    className="thumbnail"
                  />
                  <div className="d-flex flex-column">
                    <span className="text-18-400 color-ffff">
                      {elem?.title}
                    </span>
                    <span className="text-14-400 lh-24 color-ffff">
                      {elem?.artistName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No recent songs found</p>
        )}
      </div>
    </div>
  );
};

export default RecentPlayed;
