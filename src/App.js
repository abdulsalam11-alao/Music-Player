import React, { useState, useEffect, useRef } from "react";
import {
  AlbumCover,
  Controls,
  Footer,
  Header,
  ProgressContainer,
  SongInfo,
  SongList,
  VolumeControl,
} from "./components/Index";
import "./index.css";

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
  const [volume, setVolume] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(
    JSON.parse(localStorage.getItem("currentSongIndex")) || 0
  );
  const [showSongList, setShowSongList] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleOrder, setShuffleOrder] = useState([]);
  const [repeatMode, setRepeatMode] = useState(false); // false: No repeat, true: Repeat all

  const audioRef = useRef(new Audio());
  const songListRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const savedTime = localStorage.getItem("currentTime");
    if (savedTime) {
      setCurrentTime(parseFloat(savedTime));
      audioRef.current.currentTime = parseFloat(savedTime);
    }

    audioRef.current.src = process.env.PUBLIC_URL + currentSong.music;
    audioRef.current.volume = volume;

    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime);
      localStorage.setItem("currentTime", audioRef.current.currentTime);
    };

    const handleEnded = () => {
      if (repeatMode) {
        nextSong();
      } else {
        playSong();
      }
    };

    audioRef.current.addEventListener("timeupdate", updateTime);
    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateTime);
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, repeatMode]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      isShuffling
        ? shuffleOrder[
            (shuffleOrder.indexOf(prevIndex) + 1) % shuffleOrder.length
          ]
        : (prevIndex + 1) % songs.length
    );
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      isShuffling
        ? shuffleOrder[
            (shuffleOrder.indexOf(prevIndex) - 1 + shuffleOrder.length) %
              shuffleOrder.length
          ]
        : (prevIndex - 1 + songs.length) % songs.length
    );
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const moveCurMusicFor = () => {
    const newTime = audioRef.current.currentTime + 10;
    audioRef.current.currentTime =
      newTime > audioRef.current.duration ? audioRef.current.duration : newTime;
  };

  const moveCurMusicBack = () => {
    const newTime = audioRef.current.currentTime - 10;
    audioRef.current.currentTime = newTime < 0 ? 0 : newTime;
  };

  const moveMusicByRange = (value) => {
    audioRef.current.currentTime = value < 0 ? 0 : value;
    setCurrentTime(audioRef.current.currentTime);
  };

  const toggleSongList = () => {
    setShowSongList(!showSongList);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setShowSongList(false);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
    if (!isShuffling) {
      const shuffledOrder = [...Array(songs.length).keys()].sort(
        () => Math.random() - 0.5
      );
      setShuffleOrder(shuffledOrder);
    }
  };

  const toggleRepeat = () => {
    setRepeatMode(!repeatMode);
  };

  const handleClickOutside = (event) => {
    if (songListRef.current && !songListRef.current.contains(event.target)) {
      setShowSongList(false);
    }
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("currentSongIndex", JSON.stringify(currentSongIndex));
  }, [currentSongIndex]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex, isPlaying]);

  return (
    <div className="music-player">
      <Header album={currentSong.album} />
      <AlbumCover image={currentSong.image} artist={currentSong.artist} />
      <SongInfo title={currentSong.title} artist={currentSong.artist} />
      <ProgressContainer
        currentTime={currentTime}
        duration={currentSong.duration}
        onTimeChange={moveMusicByRange}
      />
      <Controls
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        onNext={nextSong}
        onPrev={prevSong}
        onForward={moveCurMusicFor}
        onBackward={moveCurMusicBack}
      />
      <VolumeControl volume={volume} onHandleVolume={handleVolume} />
      {showSongList && (
        <div ref={songListRef}>
          <SongList songs={songs} onSelectSong={selectSong} />
        </div>
      )}
      <Footer
        isShuffling={isShuffling}
        onToggleShuffle={toggleShuffle}
        onToggleSongList={toggleSongList}
        onRepeat={toggleRepeat}
        repeatMode={repeatMode}
      />
      {showSongList && (
        <SongList
          songs={songs}
          onSelectSong={selectSong}
          currentSongIndex={currentSongIndex}
          ref={songListRef}
        />
      )}
    </div>
  );
}

export default App;
