import React, { useEffect, useState } from "react";
import "./Favourite.scss";
const Favourite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  return (
    <div className="favourite-container">
      {favorites?.length === 0 ? (
        <h1>No favourite songs.</h1>
      ) : (
        <>
          <div className="row">
            {favorites?.map((o, i) => (
              <div className=" col-md-4" key={i}>
                <div className="favorites-song h-100">
                  <div className="image-box">
                    <img src={o.thumbnail} alt="" />
                  </div>
                  <div className="d-flex justify-content-between cmt-10">
                    <span className="text-18-400 color-ffff">{o?.title}</span>
                  </div>
                  <span className="text-14-400 lh-24 color-ffff">
                    {o?.artistName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favourite;
