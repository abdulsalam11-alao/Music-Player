import React from "react";

const SongInfo = ({ title, artist }) => (
  <div className="song-info">
    <h2>{title}</h2>
    <p>{artist}</p>
  </div>
);

export default SongInfo;
