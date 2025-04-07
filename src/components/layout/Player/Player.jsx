import React, { useEffect, useRef, useState } from "react";
import {
  rkfm,
  hrk,
  hr,
  hrm,
  hrm6,
  abl,
  fj,
  fm,
} from "../../../utils/constants/songs";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaEllipsisH,
  FaBackward,
  FaForward,
  FaVolumeMute,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import "./Player.scss";

const Player = ({ currentSong, songList, handleNext, handlePrev, setShow }) => {
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const songMap = { rkfm, hrk, hr, hrm, hrm6, abl, fj, fm };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    audioRef.current.currentTime =
      (audioRef.current.duration * newProgress) / 100;
  };

  const toggleFavorite = () => {
    let updatedFavorites = [...favorites];

    if (favorites?.some((fav) => fav.id === currentSong.id)) {
      updatedFavorites = favorites.filter((o) => o?.id !== currentSong?.id);
    } else {
      updatedFavorites.push(currentSong);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setMenuOpen(false);
  };

  const handleVolumn = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const songSrc = songMap[currentSong.musicUrl];
    audioRef.current = new Audio(songSrc);
    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [currentSong]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration) {
          setProgress((currentTime / duration) * 100);
        }
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const progressStyle = {
    background: `linear-gradient(to right, white ${progress}%, #333 ${progress}%)`,
  };

  return (
    <div className="player-container">
      <div className="h-30 hamburger pointer">
        <i className="bi bi-list" onClick={() => setShow(true)} />
      </div>
      <h1 className="text-start song-title">{currentSong.title}</h1>
      <span className="artist-text text-16-400 text-start">
        {currentSong.artistName}
      </span>
      <div className="cover-image-container">
        <img
          src={currentSong.thumbnail}
          alt={currentSong.title}
          className="cover-image"
        />
      </div>
      <div className="music-control">
        <input
          type="range"
          className="progress-bar cmb-40"
          ref={progressBarRef}
          value={progress}
          min={0}
          max={100}
          onChange={handleSeek}
          style={progressStyle}
        />

        <div className="controls">
          <div className="ellipse-container">
            <button
              className="ellipse-icon-button"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaEllipsisH />
            </button>
            {menuOpen && (
              <div className="menu-conatiner">
                <button onClick={toggleFavorite} className="fav-button">
                  {favorites.some((fav) => fav.id === currentSong.id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="icon-button-fb" onClick={handlePrev}>
              <FaBackward />
            </button>

            <button className="play-button" onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button className="icon-button-fb" onClick={handleNext}>
              <FaForward />
            </button>
          </div>
          <button className="icon-button" onClick={handleVolumn}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
