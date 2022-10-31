import React from "react";
import chess4k from "../assets/chess4k.mp4";

const BackgroundVideo = () => {
  return (
    <div className="background_video">
      <video src={chess4k} playsinline autoPlay loop muted />
    </div>
  );
}

export default BackgroundVideo;
