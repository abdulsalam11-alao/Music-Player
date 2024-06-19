import React, { forwardRef } from "react";
import "../styles/songlist.css";

const SongList = forwardRef(({ songs, onSelectSong }, ref) => {
  return (
    <div className="song-list" ref={ref}>
      {songs.map((song, index) => (
        <div
          className="song-item"
          key={song.id}
          onClick={() => onSelectSong(index)}
        >
          <img
            src={process.env.PUBLIC_URL + song.image}
            alt={song.title}
            className="song-image"
          />
          <div className="song-details">
            <p className="song-title">{song.title}</p>
            <p className="song-artist">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SongList;
