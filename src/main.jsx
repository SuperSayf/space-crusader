import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Lvl1 from "./Lvl1/Lvl1.jsx";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import "./startScreen/game-menu.css";
import { Html } from "@react-three/drei";
const rootContainer = document.getElementById("root");

const App = () => {
  const [start, setStart] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("lvl1");
  const [showLevelOptions, setShowLevelOptions] = useState(false); // New state

  // Check for the level parameter in the URL and set it as the initial selected level
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = urlParams.get("level");
    if (levelParam) {
      setSelectedLevel(levelParam);
      setStart(true);
    }
  }, []);

  const handleLevelsButtonClick = () => {
    setShowLevelOptions(!showLevelOptions); // Toggle level options visibility
  };

  const handleCreditsButtonClick = () => {
    // Change the window.location.href
    window.location.href = "credits.html";
  };

  const handleLvl1Click = () => {
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
          playsInline="playsInline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src="assets/audio/backgroundvideo.mp4" type="video/mp4" />
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
              <button id="newGameButton" onClick={handleLvl1Click}>
                New Game
              </button>
            </li>
            <li>
              <button id="levelButton" onClick={handleLevelsButtonClick}>
                Levels
              </button>
              {showLevelOptions && ( // Show level options if showLevelOptions is true
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
