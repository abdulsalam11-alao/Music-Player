import React from "react";
import "../styles/songlist.css";

function SongList({ songs, onSelectSong }) {
  return (
    <div className="song-list">
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
}

export default SongList;
