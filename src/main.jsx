import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import "./startScreen/game-menu.css";
import { Html } from "@react-three/drei";

const rootContainer = document.getElementById("root");

const App = () => {
  const [start, setStart] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showLevelOptions, setShowLevelOptions] = useState(false);
  const videoRef = useRef(null);

  const handleLevelsButtonClick = () => {
    setShowLevelOptions(!showLevelOptions);
  };

  const handleCreditsButtonClick = () => {
    window.location.href = "credits.html";
  };

  const handleNewGameClick = () => {
    setShowVideo(true);
    setStart(true);

    // Play the "lore.mp4" video
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.style.display = "block"; // Show the video
      videoElement.play();

      // After playing the video, navigate to level 1
      videoElement.onended = () => {
        window.location.href = "lvl1.html";
      };
    }
  };

  const handleLvl1Click = () => {
    // Navigate to level 1 directly without playing the video
    window.location.href = "lvl1.html";
  };

  const handleLvl2Click = () => {
    window.location.href = "lvl2.html";
  };

  const handleLvl3Click = () => {
    window.location.href = "lvl3.html";
  };

  return (
    <div className="container">
      <div className="video-background">
        <video
          playsInline
          autoPlay
          muted
          loop
          style={{ width: "100%", height: "100%" }}
        >
          <source src="assets/audio/backgroundvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className="video-lore"
        style={{
          display: showVideo ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <video
          ref={videoRef}
          playsInline
          style={{ width: "100%", height: "100%" }}
        >
          <source src="assets/audio/lore-full-c.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {!start && (
        <div className="overlay">
          <header>
            <h1>Space Crusaders</h1>
          </header>
          <ul className="threeD-button-set">
            <li>
              <button id="newGameButton" onClick={handleNewGameClick}>
                New Game
              </button>
            </li>
            <li>
              <button id="levelButton" onClick={handleLevelsButtonClick}>
                Levels
              </button>
              {showLevelOptions && (
                <ul className="level-options">
                  <li>
                    <button onClick={handleLvl1Click}>Level 1</button>
                  </li>
                  <br />
                  <li>
                    <button onClick={handleLvl2Click}>Level 2</button>
                  </li>
                  <br />
                  <li>
                    <button onClick={handleLvl3Click}>Level 3</button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button onClick={handleCreditsButtonClick}>Credits</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(<App />);
} else {
  console.error("Root container element not found.");
}

export default App;
