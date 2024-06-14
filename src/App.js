import React, { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlay,
  faPause,
  faForward,
  faBackward,
  faVolumeUp,
  faEllipsisH,
  faFastBackward,
  faFastForward,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
// import Lover from "./image/Beatuful People.jpeg";

const songs = [
  {
    id: 1,
    title: "WAP ft. Megan Thee Stallion |",
    artist: "Cardi B",
    album: "Megan Thee Stallion",
    release_date: "2020",
    duration: 187,
    music:
      "/assets/music/Cardi-B-–-WAP-ft.-Megan-Thee-Stallion-Wiseloaded.com_.mp3",
    image: "/assets/image/cardib.png",
  },
  {
    id: 2,
    title: "Dear God",
    artist: "Dax",
    album: "Dear God (Single)",
    release_date: "2019",
    duration: 139,
    music: "/assets/music/Dax_-_Dear_God_NaijaOlofofo.mp3",
    image: "/assets/image/DaxDearGod.png",
  },
  {
    id: 3,
    title: "Beautiful People.",
    artist: "Ed Sheeran,khalid",
    album: "No.6 Collaborations Project",
    release_date: "2019",
    duration: 227,
    music:
      "/assets/music/Ed_Sheeran_-_Beautiful_People_ft_Khalid_talkglitz.tv.mp3",
    image: "/assets/image/BeatufulPeople.jpeg",
  },
  {
    id: 4,
    title: "I Don't Care",
    artist: "Ed Sheeran & Justin Bieber",
    album: "No.6 Collaborations Project",
    release_date: "2019",
    duration: 220,
    music:
      "/assets/music/Ed_Sheeran_Justin_Bieber_-_I_Dont_Care_talkglitz.tv.mp3",
    image: "/assets/image/IDON'tcare.png",
  },
  {
    id: 5,
    title: "Godzilla (feat. Juice WRLD) ",
    artist: "Eminem",
    album: "Music to be Murdered by",
    release_date: "2020",
    duration: 210,
    music: "/assets/music/Eminem-feat-Juice-WRLD-Godzilla-(Bazenation.com).mp3",
    image: "/assets/image/eminem-godzilla-feat-juice-wrld-500x500.jpg",
  },
  {
    id: 6,
    title: "DON’T CRY ",
    artist: "Juice WRLD",
    album: "Legends never Die",
    release_date: "2020",
    duration: 191,
    music: "/assets/music/Juice-WRLD-DON-T-CRY-(Bazenation.com).mp3",
    image: "/assets/image/juice-wrld-dont-cry-500x281.jpg",
  },
  {
    id: 7,
    title: "Legends ",
    artist: "Juice WRLD",
    album: "Too Soon",
    release_date: "2018",
    duration: 245,
    music: "/assets/music/Juice_WRLD_-_Legends.mp3",
    image: "/assets/image/Legends.jpg",
  },
  {
    id: 8,
    title: "Every Balmain ",
    artist: "Kodak Black",
    album: "Bill Israel",
    release_date: "2021",
    duration: 202,
    music: "/assets/music/Kodak_Black_-_Every_Balmain.mp3",
    image: "/assets/image/EveryBalmain.jpeg",
  },
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audio] = useState(new Audio());
  const [song, setSong] = useState([...songs]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  let currentSong = song[currentSongIndex];

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    audio.pause();
    setIsPlaying(false);
  };
  const PrevSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex - 1),
      audio.pause(),
      setIsPlaying(false)
    );
  };
  const updateTime = () => {
    setCurrentTime(audio.currentTime);
  };
  const endedTime = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };
  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("ended", endedTime);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };
  const moveCurMusicFor = () => {
    const newTime = audio.currentTime + 10;
    audio.currentTime = newTime > audio.duration ? audio.duration : newTime;
  };
  const moveCurMusicback = () => {
    const newTime = audio.currentTime - 10;
    audio.currentTime = newTime < 0 ? 0 : newTime;
  };
  const moveMusicByRange = (value) => {
    const newTime = value;
    audio.currentTime = newTime < 0 ? 0 : newTime;
  };
  const play = () => {
    setIsPlaying(true);
    audio.src = process.env.PUBLIC_URL + currentSong.music;
    audio.play();
    console.log(currentTime);
    updateTime();
  };
  const pause = () => {
    setIsPlaying(false);
    audio.src = process.env.PUBLIC_URL + currentSong.music;
    audio.pause();
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div className="music-player">
      <div className="header">
        <FontAwesomeIcon icon={faArrowLeft} className="menu-icon" />
        <p>{currentSong.album}</p>
        <FontAwesomeIcon icon={faEllipsisH} className="menu-icon" />
      </div>
      <div className="album-cover">
        <img
          src={process.env.PUBLIC_URL + currentSong.image}
          alt={currentSong.artist}
        />
      </div>
      <div className="song-info">
        <h2>{currentSong.title}</h2>
        <p>{currentSong.artist}</p>
      </div>
      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={currentSong.duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(Number(e.target.value))}
          className="progress-bar"
          onClick={(e) => moveMusicByRange(e.target.value)}
        />
        <span>{formatTime(currentSong.duration)}</span>
      </div>
      <div className="controls">
        <FontAwesomeIcon
          icon={faFastBackward}
          className="control-icon"
          onClick={PrevSong}
        />
        <FontAwesomeIcon
          icon={faBackward}
          className="control-icon"
          onClick={moveCurMusicback}
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className="control-icon play"
          onClick={togglePlayPause}
        />
        <FontAwesomeIcon
          icon={faForward}
          className="control-icon"
          onClick={moveCurMusicFor}
        />
        <FontAwesomeIcon
          icon={faFastForward}
          className="control-icon"
          onClick={nextSong}
        />
      </div>
      <div className="volume">
        <FontAwesomeIcon icon={faVolumeUp} />
        <p>Airpods Pro</p>
      </div>
      <div className="footer">
        <FontAwesomeIcon icon={faHeart} className="footer-icon" />
        <FontAwesomeIcon icon={faEllipsisH} className="footer-icon" />
      </div>
    </div>
  );
}

export default App;
