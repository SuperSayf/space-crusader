import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Lvl1 from "./Lvl1/Lvl1.jsx";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Html } from "@react-three/drei";

const rootContainer = document.getElementById("root");

const App = () => {
  const [start, setStart] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("lvl1");

  const handleNewGameClick = () => {
    setSelectedLevel("lvl1");
    setStart(true);
  };

  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
    setStart(true);
  };

  return (
    <>
      <Canvas shadows>
        <color attach="background" args={["white"]} />
        <Suspense fallback={null}>
          {selectedLevel === "lvl1" && start ? <Lvl1 /> : null}
          {selectedLevel === "lvl2" && start ? <Lvl2 /> : null}
          {selectedLevel === "lvl3" && start ? <Lvl3 /> : null}
          {!start && (
            <Html>
              <>
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
                    <button id="levelButton">Levels</button>
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
              </>
            </Html>
          )}
        </Suspense>
      </Canvas>
    </>
  );
};

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(<App />);
} else {
  console.error("Root container element not found.");
}

export default App;
