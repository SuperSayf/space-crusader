//Still in Work not in use rn.

export function displayLevelCompletion() {
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("game-screen");
    gameScreen.id = "gameScreen";

    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Level Completed!";
    gameScreen.appendChild(h2);

    // Create the hmsg element
    const hmsg = document.createElement("h2");
    hmsg.textContent = `Congratulations you have completed level 1 !`;
    gameScreen.appendChild(hmsg);

    // // Create a paragraph for rewards
    // const rewardsParagraph = document.createElement("p");
    // rewardsParagraph.textContent = `You earned: ${rewards}`;
    // gameScreen.appendChild(rewardsParagraph);

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

    // Add event listeners to buttons (if needed)

    // Append the game screen to the body
    document.body.appendChild(gameScreen);

    // Create the style element
    const style = document.createElement("style");
    style.textContent = `
      /* Add your CSS styling for the level completion screen here */

      .game-screen {
        text-align: center;
        margin: 20% auto;
        padding: 20px;
        background-color: #f5f5f5;
        border: 2px solid #ccc;
        max-width: 400px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      h2 {
        font-size: 1.5em;
        margin-bottom: 20px;
      }
      
      button {
        padding: 10px 20px;
        font-size: 1em;
        margin: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #007bff;
        color: #fff;
        transition: background-color 0.3s;
      }
      
      button:hover {
        background-color: #0056b3;
      }
    `;
    document.head.appendChild(style);

    document
        .getElementById("nextLevelButton")
        .addEventListener("click", function () {
            // Add logic to go to the next level
            // window.location.href =`game.html?level=lvl ${levelNumber++} `;
        });

    document
        .getElementById("menuButton")
        .addEventListener("click", function () {
            window.location.href = "index.html"; // Assuming this is your main menu
        });
}
