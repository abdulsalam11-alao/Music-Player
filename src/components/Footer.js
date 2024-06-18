import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faRandom, faRepeat } from "@fortawesome/free-solid-svg-icons";

const Footer = ({
  isShuffling,
  onToggleShuffle,
  onToggleSongList,
  onRepeat,
  repeatMode,
}) => (
  <div className="footer">
    <FontAwesomeIcon
      icon={faList}
      onClick={onToggleSongList}
      className="control-icon"
    />
    <FontAwesomeIcon
      icon={faRandom}
      className={`control-icon ${isShuffling ? "active" : ""}`}
      onClick={onToggleShuffle}
    />
    <FontAwesomeIcon
      icon={faRepeat}
      className={`control-icon ${!repeatMode ? "active" : ""}`}
      onClick={onRepeat}
    />
  </div>
);

export default Footer;
