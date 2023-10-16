import React, { useEffect } from "react";

const GameMenu = () => {
  const handleNewGameClick = () => {
    window.location.href = "game.html";
  };

  const handleLevelButtonClick = () => {
    window.location.href = "level.html";
  };

  useEffect(() => {
    const menu = document.querySelector(".threeD-button-set");
    const menuRect = menu.getBoundingClientRect();

    const { matches: motionOK } = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );

    if (motionOK) {
      const getAngles = (clientX, clientY) => {
        const { x, y, width, height } = menuRect;

        const dx = clientX - (x + 0.5 * width);
        const dy = clientY - (y + 0.5 * height);

        return { dx, dy };
      };

      const handleMouseMove = ({ target, clientX, clientY }) => {
        const { dx, dy } = getAngles(clientX, clientY);

        menu.style.setProperty("--x", `${dy / 20}deg`);
        menu.style.setProperty("--y", `${dx / 20}deg`);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        // Clean up the event listener when the component unmounts
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div>
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
          <button id="levelButton" onClick={handleLevelButtonClick}>
            Levels
          </button>
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
  );
};

export default GameMenu;
