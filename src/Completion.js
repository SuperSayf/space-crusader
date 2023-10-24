import { db } from "./firebase.js";
import { getDoc, doc, updateDoc } from "firebase/firestore";

async function getLeaderboardData(level) {
  try {
    const docRef = doc(db, "Leaderboard", `Level${level}`);
    const leaderboardSnapshot = await getDoc(docRef);

    if (leaderboardSnapshot.exists()) {
      // Assuming the structure of the leaderboard data is an object with player names as keys and scores as values
      const leaderboardData = leaderboardSnapshot.data().Scores || {};

      // Sort the object by score (convert it to an array of objects for sorting)
      const sortedLeaderboardData = Object.entries(leaderboardData)
        .map(([name, timeLasted]) => ({ name, timeLasted }))
        .sort((a, b) => b.timeLasted - a.timeLasted)
        .slice(0, 5); // Slice to get only the top 5 entries

      return sortedLeaderboardData;
    } else {
      console.log("Document does not exist.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return [];
  }
}

// Add a function to add a score to the leaderboard
async function addScoreToLeaderboard(level, inputName, score) {
  try {
    const docRef = doc(db, "Leaderboard", `Level${level}`);
    const leaderboardSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (leaderboardSnapshot.exists()) {
      const leaderboardData = leaderboardSnapshot.data().Scores || {};

      const name = inputName.toLowerCase(); // Convert input name to lowercase

      // Check if the new score is higher than the existing score
      if (
        leaderboardData[name] === undefined ||
        score > leaderboardData[name]
      ) {
        // Update the score for the given name only if it's higher
        leaderboardData[name] = score;

        // Update the document in Firestore with the new leaderboard data
        await updateDoc(docRef, { Scores: leaderboardData });

        console.log(
          `${inputName}'s score (${score}) added to Level ${level} leaderboard.`
        );
      } else {
        console.log(
          `${inputName}'s score (${score}) is not higher than the existing score.`
        );
      }
    } else {
      console.log("Document does not exist.");
    }
  } catch (error) {
    console.error("Error adding score to leaderboard:", error);
  }
}

// Flag to track if a popup is currently displayed
let isPopupDisplayed = false;
// Flag to track if Esc  is currently pressed
let isEscDisplayed = false

//Game Over
export async function displayGameOver(level, playerData, message) {
  if (!isPopupDisplayed) {
    isPopupDisplayed = true;

    //if pause menue displayed and  game over  just remove the in game-menue 
    if(isEscDisplayed){
      hideGamePause();
    }

    const gameScreen = document.createElement("div");
    gameScreen.classList.add("game-screen");
    gameScreen.id = "gameScreen";

    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Game Over!";
    // Make it red
    h2.style.color = "#ff0000";
    gameScreen.appendChild(h2);

    // Create the input box for entering the player's name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your name";
    gameScreen.appendChild(nameInput);

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    gameScreen.appendChild(submitButton);

    submitButton.addEventListener("click", async () => {
      const playerName = nameInput.value;

      if (playerName) {
        // Remove the input elements
        gameScreen.removeChild(nameInput);
        gameScreen.removeChild(submitButton);

        // Create the h2 element with the dynamic message
        const hmsg = document.createElement("h2");
        hmsg.textContent = message; // Set the dynamic message
        gameScreen.appendChild(hmsg);

        // Create the h2 element with the text "Your Score"
        const yourScore = document.createElement("h2");
        yourScore.textContent = "Your Score: " + playerData[0].timeLasted;
        // Make it green
        yourScore.style.color = "#00ff00";
        gameScreen.appendChild(yourScore);

        // Create the h2 element with the text "Top 5 Scores"
        const top5Scores = document.createElement("h2");
        top5Scores.textContent = "Top 5 Scores";
        gameScreen.appendChild(top5Scores);

        // Create the leaderboard table
        const leaderboardTable = document.createElement("table");
        leaderboardTable.classList.add("leaderboard-table");

        // Create the table header row
        const tableHeaderRow = document.createElement("tr");
        const nameHeader = document.createElement("th");
        nameHeader.textContent = "Name";
        const timeHeader = document.createElement("th");
        timeHeader.textContent = "Score";

        tableHeaderRow.appendChild(nameHeader);
        tableHeaderRow.appendChild(timeHeader);

        leaderboardTable.appendChild(tableHeaderRow);

        // Add a loading spinner
        const loadingSpinner = document.createElement("div");
        loadingSpinner.classList.add("loading-spinner");
        gameScreen.appendChild(loadingSpinner);

        // Set the loading spinner style
        const spinnerStyle = document.createElement("style");
        spinnerStyle.textContent = `
        .loading-spinner {
          border: 6px solid rgba(255, 255, 255, 0.3);
          border-top: 6px solid #33ccff; /* Cosmic blue for the spinner */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;

        document.head.appendChild(spinnerStyle);

        const playerScore = playerData[0].timeLasted;

        // Truncate the player name to 15 characters, and add an ellipsis if it's longer
        const truncatedPlayerName =
          playerName.length > 15
            ? playerName.substring(0, 15) + "..."
            : playerName;

        // Add the player's score to the leaderboard
        await addScoreToLeaderboard(level, truncatedPlayerName, playerScore);

        // Populate the table with leaderboard data
        const leaderboardData = await getLeaderboardData(level);

        // Remove the loading spinner
        gameScreen.removeChild(loadingSpinner);

        if (leaderboardData) {
          leaderboardData.forEach((entry, index) => {
            const tableRow = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.textContent = entry.name;
            const timeCell = document.createElement("td");
            timeCell.textContent = entry.timeLasted;

            tableRow.appendChild(nameCell);
            tableRow.appendChild(timeCell);

            leaderboardTable.appendChild(tableRow);
          });
        }

        gameScreen.appendChild(leaderboardTable);

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

        // Add event listeners for the buttons
        restartButton.addEventListener("click", function () {
          window.location.href = `lvl${level}.html`;
        });

        menuButton.addEventListener("click", function () {
          window.location.href = "index.html";
        });

        // Append the game screen to the body
        document.body.appendChild(gameScreen);
      }
    });

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
  
      .leaderboard-table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
      }
  
      .leaderboard-table th, .leaderboard-table td {
        border: 1px solid #fff;
        padding: 8px;
        text-align: left;
      }
  
      .leaderboard-table th {
        background-color: #33ccff;
        color: #fff;
      }
  
      .leaderboard-table tr:nth-child(even) {
        background-color: #005580;
      }
  
      .leaderboard-table tr:nth-child(odd) {
        background-color: #33ccff;
      }
    `;
    document.head.appendChild(style);
  }
}

//Level Finish

export function displayLevelCompletion(level, playerData, message) {
  if (!isPopupDisplayed) {
    isPopupDisplayed = true;

    //if pause menue displayed and completion done just remove the in game-menue 
    if(isEscDisplayed){
      hideGamePause();
    }
    const gameScreen = document.createElement("div");
    gameScreen.classList.add("game-screen");
    gameScreen.id = "gameScreen";

    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Congrats!";
    // Make it green
    h2.style.color = "#00ff00";
    gameScreen.appendChild(h2);

    // Create the input box for entering the player's name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your name";
    gameScreen.appendChild(nameInput);

    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    gameScreen.appendChild(submitButton);

    submitButton.addEventListener("click", async () => {
      const playerName = nameInput.value;

      if (playerName) {
        // Remove the input elements
        gameScreen.removeChild(nameInput);
        gameScreen.removeChild(submitButton);

        // Create the h2 element with the dynamic message
        const hmsg = document.createElement("h2");
        hmsg.textContent = message; // Set the dynamic message
        gameScreen.appendChild(hmsg);

        // Create the h2 element with the text "Your Score"
        const yourScore = document.createElement("h2");
        yourScore.textContent = "Your Score: " + playerData[0].timeLasted;
        // Make it green
        yourScore.style.color = "#00ff00";
        gameScreen.appendChild(yourScore);

        // Create the h2 element with the text "Top 5 Scores"
        const top5Scores = document.createElement("h2");
        top5Scores.textContent = "Top 5 Scores";
        gameScreen.appendChild(top5Scores);

        // Create the leaderboard table
        const leaderboardTable = document.createElement("table");
        leaderboardTable.classList.add("leaderboard-table");

        // Create the table header row
        const tableHeaderRow = document.createElement("tr");
        const nameHeader = document.createElement("th");
        nameHeader.textContent = "Name";
        const timeHeader = document.createElement("th");
        timeHeader.textContent = "Score";

        tableHeaderRow.appendChild(nameHeader);
        tableHeaderRow.appendChild(timeHeader);

        leaderboardTable.appendChild(tableHeaderRow);

        // Add a loading spinner
        const loadingSpinner = document.createElement("div");
        loadingSpinner.classList.add("loading-spinner");
        gameScreen.appendChild(loadingSpinner);

        // Set the loading spinner style
        const spinnerStyle = document.createElement("style");
        spinnerStyle.textContent = `
        .loading-spinner {
          border: 6px solid rgba(255, 255, 255, 0.3);
          border-top: 6px solid #33ccff; /* Cosmic blue for the spinner */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;

        document.head.appendChild(spinnerStyle);

        const playerScore = playerData[0].timeLasted;

        // Truncate the player name to 15 characters, and add an ellipsis if it's longer
        const truncatedPlayerName =
          playerName.length > 15
            ? playerName.substring(0, 15) + "..."
            : playerName;

        // Add the player's score to the leaderboard
        await addScoreToLeaderboard(level, truncatedPlayerName, playerScore);

        // Populate the table with leaderboard data
        const leaderboardData = await getLeaderboardData(level);

        // Remove the loading spinner
        gameScreen.removeChild(loadingSpinner);

        if (leaderboardData) {
          leaderboardData.forEach((entry, index) => {
            const tableRow = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.textContent = entry.name;
            const timeCell = document.createElement("td");
            timeCell.textContent = entry.timeLasted;

            tableRow.appendChild(nameCell);
            tableRow.appendChild(timeCell);

            leaderboardTable.appendChild(tableRow);
          });
        }

        gameScreen.appendChild(leaderboardTable);

        // Create the restart button
        const restartButton = document.createElement("button");
        restartButton.id = "restartButton";
        restartButton.textContent = "Next Lvl";
        gameScreen.appendChild(restartButton);

        // Create the menu button
        const menuButton = document.createElement("button");
        menuButton.id = "menuButton";
        menuButton.textContent = "Go to Main Menu";
        gameScreen.appendChild(menuButton);

        // Add event listeners for the buttons
        restartButton.addEventListener("click", function () {
          window.location.href = `lvl${level + 1}.html`;
        });

        menuButton.addEventListener("click", function () {
          window.location.href = "index.html";
        });

        // Append the game screen to the body
        document.body.appendChild(gameScreen);
      }
    });

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
  
      .leaderboard-table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
      }
  
      .leaderboard-table th, .leaderboard-table td {
        border: 1px solid #fff;
        padding: 8px;
        text-align: left;
      }
  
      .leaderboard-table th {
        background-color: #33ccff;
        color: #fff;
      }
  
      .leaderboard-table tr:nth-child(even) {
        background-color: #005580;
      }
  
      .leaderboard-table tr:nth-child(odd) {
        background-color: #33ccff;
      }
    `;
    document.head.appendChild(style);
  }
}


//In game Pause
export function displayGamePause(level) {

  if (!isPopupDisplayed) {
    // isPopupDisplayed = true;
    isEscDisplayed = true
    const gamePauseScreen = document.createElement("div");
    gamePauseScreen.classList.add("game-screen");
    gamePauseScreen.id = "gamePauseScreen";

    // Create the h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "You are currently in pause menu but the game is on";
    // Make it green
    h2.style.color = "#00ff00";
    gamePauseScreen.appendChild(h2);


    // Create the restart button
    const restartButton = document.createElement("button");
    restartButton.id = "restartButton";
    restartButton.textContent = "Restart Level";
    gamePauseScreen.appendChild(restartButton);

    // Create the menu button
    const menuButton = document.createElement("button");
    menuButton.id = "menuButton";
    menuButton.textContent = "Go to Main Menu";
    gamePauseScreen.appendChild(menuButton);

    // Add event listeners for the buttons
    restartButton.addEventListener("click", function () {
      window.location.href = `lvl${level }.html`;
    });

    menuButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });

    // Append the game screen to the body
    document.body.appendChild(gamePauseScreen);

    // Append the game screen to the body
    document.body.appendChild(gamePauseScreen);

    // Create the style element
    const style = document.createElement("style");
    style.textContent = `
      .game-screen {
        display: block;
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #000; /* Dark background for a space theme */
        border: 4px solid #fff;
        padding: 10px;
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
  
      .leaderboard-table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
      }
  
      .leaderboard-table th, .leaderboard-table td {
        border: 1px solid #fff;
        padding: 8px;
        text-align: left;
      }
  
      .leaderboard-table th {
        background-color: #33ccff;
        color: #fff;
      }
  
      .leaderboard-table tr:nth-child(even) {
        background-color: #005580;
      }
  
      .leaderboard-table tr:nth-child(odd) {
        background-color: #33ccff;
      }
    `;
    document.head.appendChild(style);
  }
}

// function to hide the pause menu 
export function hideGamePause() {
  const gameScreen = document.getElementById("gamePauseScreen");
  if (gameScreen) {
    document.body.removeChild(gameScreen);
    isEscDisplayed = false;
  }
}