

export function displayLevelCompletion(level) {
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("game-screen");
    gameScreen.id = "gameScreen";

    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Level Completed!";
    gameScreen.appendChild(h2);

    // Create the hmsg element based on level 
    const hmsg = document.createElement("h2");
    hmsg.textContent = `Congratulations you have completed level ${level} !`;
    gameScreen.appendChild(hmsg);

    // Create the next level button
    const nextLevelButton = document.createElement("button");
    nextLevelButton.id = "nextLevelButton";
    nextLevelButton.textContent = "Next Level";
    gameScreen.appendChild(nextLevelButton);

    // Create the menu button
    const menuButton = document.createElement("button");
    menuButton.id = "menuButton";
    menuButton.textContent = "Go to Main Menu";
    gameScreen.appendChild(menuButton);


    // Append the game screen to the body
    document.body.appendChild(gameScreen);

    // Create the style element
    const style = document.createElement("style");
    style.textContent = `
      /* Add your CSS styling for the level completion screen here */

      .game-screen {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #071428; /* Dark blue-green background */
        border: 4px solid #33ccff; /* Cosmic blue border */
        padding: 40px;
        text-align: center;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
        z-index: 9999;
        color: #fff;
        font-family: 'Arial', sans-serif;
        max-width: 400px;
      }
  
      .game-screen h2 {
        color: #33ccff; /* Cosmic blue for the heading */
        font-size: 24px;
        margin-bottom: 10px;
      }
  
      .game-screen hmsg {
        font-size: 18px;
        margin-bottom: 20px;
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
        background-color: #0056b3;
      }
    `;
    document.head.appendChild(style);
    
    //Logic for nextLevelButtton Navigation
    document
        .getElementById("nextLevelButton")
        .addEventListener("click", function () {
            //Responsible to navigate to  the next level page by increamenting 1 
            window.location.href = `game.html?level=lvl${level+1 }`;

        });
    //Logic for menuButton Navigation
    document
        .getElementById("menuButton")
        .addEventListener("click", function () {
            window.location.href = "index.html"; // Assuming this is your main menu
        });
}
