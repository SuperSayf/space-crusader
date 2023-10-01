// GameOver.js

export function displayGameOver() {
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("game-screen");
    gameScreen.id = "gameScreen";
  
    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Game Over!";
    gameScreen.appendChild(h2);
  
    // Create the restart button
    const restartButton = document.createElement("button");
    restartButton.id = "restartButton";
    restartButton.textContent = "Restart";
    gameScreen.appendChild(restartButton);
  
    // Create the menu button
    const menuButton = document.createElement("button");
    menuButton.id = "menuButton";
    menuButton.textContent = "Go to Main Menu";
    gameScreen.appendChild(menuButton);
  
    // Add event listeners to buttons (if needed)
  
    // Append the game screen to the body
    document.body.appendChild(gameScreen);
  
    // Create the style element
    const style = document.createElement("style");
    style.textContent = `
      .game-screen {
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #000; /* Dark background for a space theme */
        border: 4px solid #fff;
        padding: 40px;
        text-align: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
        z-index: 9999;
        color: #fff;
        font-family: 'Arial', sans-serif;
      }
  
      .game-screen h2 {
        color: #33ccff; /* Cosmic blue for the heading */
      }
  
      .game-screen button {
        background-color: #33ccff; /* Cosmic blue for buttons */
        color: #fff;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        margin: 10px;
        transition: background-color 0.3s ease;
      }
  
      .game-screen button:hover {
        background-color: #005580; /* Darker blue on hover */
      }
    `;
    document.head.appendChild(style);
    document
    .getElementById("restartButton")
    .addEventListener("click", function () {
      window.location.href = "game.html";
    });
  document
    .getElementById("menuButton")
    .addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
  