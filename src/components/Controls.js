import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

const Controls = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onForward,
  onBackward,
}) => (
  <div className="controls">
    <FontAwesomeIcon
      icon={faFastBackward}
      className="control-icon"
      onClick={onPrev}
    />
    <FontAwesomeIcon
      icon={faBackward}
      className="control-icon"
      onClick={onBackward}
    />
    <FontAwesomeIcon
      icon={isPlaying ? faPause : faPlay}
      className="control-icon"
      onClick={onPlayPause}
    />
    <FontAwesomeIcon
      icon={faForward}
      className="control-icon"
      onClick={onForward}
    />
    <FontAwesomeIcon
      icon={faFastForward}
      className="control-icon"
      onClick={onNext}
    />
  </div>
);

export default Controls;
