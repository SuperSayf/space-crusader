import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Lvl1 from "./Lvl1/Lvl1.jsx";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import "./startScreen/game-menu.css"
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

  const handleNewGameClick = () => {
    setSelectedLevel("lvl1");
    setStart(true);
  };

  const handleLevelsButtonClick = () => {
    setShowLevelOptions(!showLevelOptions); // Toggle level options visibility
  };

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
    setStart(true);
    setShowLevelOptions(false); // Close level options when a level is selected
  };

  return (
    <div className="container">
      {start && (
        <Canvas className="full-screen-canvas" shadows>
          <color attach="background" args={["black"]} />
          <Suspense fallback={null}>
            {selectedLevel === "lvl1" ? <Lvl1 /> : null}
            {selectedLevel === "lvl2" ? <Lvl2 /> : null}
            {selectedLevel === "lvl3" ? <Lvl3 /> : null}
          </Suspense>
        </Canvas>
      )}
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
              {showLevelOptions && ( // Show level options if showLevelOptions is true
                <ul className="level-options">
                  <li>
                    <button onClick={() => handleLevelSelection("lvl1")}>
                      Level 1
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleLevelSelection("lvl2")}>
                      Level 2
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleLevelSelection("lvl3")}>
                      Level 3
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button>How to Play</button>
            </li>
            <li>
              <button>Credits</button>
            </li>
            <li>
              <button>Quit</button>
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
