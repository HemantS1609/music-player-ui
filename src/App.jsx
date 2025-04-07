import { useEffect, useState } from "react";
import LeftNavigation from "./components/layout/LeftNavigation/LeftNavigation";
import Player from "./components/layout/Player/Player";
import Sidebar from "./components/layout/Sidebar";
import SongList from "./Songs.json";
import Favourite from "./components/layout/Favourite/Favourite";
import RecentPlayed from "./components/layout/RecentPlayed/RecentPlayed";

function App() {
  const [activeTab, setActiveTab] = useState("For You");
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyPlayed, setRecentlyPlayed] = useState(
    JSON.parse(sessionStorage.getItem("recentSongs")) || []
  );

  const currentSong = SongList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % SongList?.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? SongList?.length - 1 : prevIndex - 1
    );
  };

  const updateRecentlyPlayed = (song) => {
    let recentSongs = JSON.parse(sessionStorage.getItem("recentSongs")) || [];

    recentSongs = recentSongs.filter((s) => s.id !== song.id);

    recentSongs.unshift(song);

    if (recentSongs.length > 10) {
      recentSongs = recentSongs.slice(0, 10);
    }

    setRecentlyPlayed(recentSongs);
    sessionStorage.setItem("recentSongs", JSON.stringify(recentSongs));
  };

  useEffect(() => {
    if (currentSong) {
      updateRecentlyPlayed(currentSong);
    }
  }, [currentSong]);

  const filteredSongs = SongList?.filter(
    (song) =>
      song?.title.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      song?.artistName.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="app">
      {/* left navigation */}
      <LeftNavigation setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* sidebar */}
      {activeTab === "For You" && (
        <>
          <div className="main-section">
            <Sidebar
              activeTab={activeTab}
              songList={filteredSongs}
              setCurrentIndex={setCurrentIndex}
              currentIndex={currentIndex}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setShow={setShow}
              show={show}
            />
            {filteredSongs?.length > 0 && (
              <Player
                currentSong={currentSong}
                handleNext={handleNext}
                handlePrev={handlePrev}
                songList={SongList}
                setShow={setShow}
              />
            )}
          </div>
        </>
      )}
      {activeTab === "Top Tracks" && (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <h1>Comming Soon</h1>
        </div>
      )}
      {activeTab === "Favourites" && <Favourite />}
      {activeTab === "Recently Played" && (
        <RecentPlayed recentlyPlayed={recentlyPlayed} />
      )}
    </div>
  );
}

export default App;
