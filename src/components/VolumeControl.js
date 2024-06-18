import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons";

const VolumeControl = ({ volume, onHandleVolume }) => (
  <div className="volume">
    <FontAwesomeIcon icon={faVolumeUp} />
    <p>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={onHandleVolume}
      />
    </p>
  </div>
);

export default VolumeControl;
