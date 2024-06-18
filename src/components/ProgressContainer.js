import React from "react";

const ProgressContainer = ({ currentTime, duration, onTimeChange }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="progress-container">
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={(e) => onTimeChange(Number(e.target.value))}
        className="progress-bar"
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressContainer;
