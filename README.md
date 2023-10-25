# space-crusader
Structure of the Project

Root Directory
- node_modules: Contains all the dependencies and libraries required for the project.
- public/assets: Stores all the static assets required for the game such ad images, modules and audio    files.
- .eslintrc.js: Configuration file for ESLint, ensuring code quality.
- .gitignore: Specifies which files or directories Git should ignore.
- index.html: Main HTML entry point for the game.
- package-lock.json & package.json: Provide information about the project dependencies and scripts.
- vite.config.js: Configuration file for Vite, a build tool.
- credits.html: Contains the HTML for the game's credits screen.
- lvl1.html: Contains the HTML for level 1.
- lvl2.html: Contains the HTML for level 2.
- lvl3.html: Contains the HTML for level 3.

Src Directory
Level Directories Overview
Lvl1 Directory
•	Asteroid.jsx: Component representing asteroids in level 1.
•	Lvl1.jsx: Main file containing the structure and logic specific to level 1 gameplay.
•	Lvl1Spaceship.jsx: Component related to the spaceship's features or behaviour in level 1.
•	MiniMap.jsx: Mini-map representation tailored for level 1.
•	tesseract.jsx: A model representing a tesseract in level 1.
•	Sun.jsx: Component representing the sun in level 1.
•	Targets.jsx: Contains targets that players need to collect in level 1.

Lvl2 Directory
•	astronaut.jsx: A model depicting astronauts in level 2.
•	blackhole.jsx: Represents the blackhole model in level 2.
•	bridge.jsx: Model for a bridge used in level 2.
•	Lvl2.jsx: Main file for level 2, containing specific structure and gameplay logic.
•	Lvl2Spaceship.jsx: Spaceship component tailored for level 2 features or behavior.
•	MiniMap.jsx: Mini-map representation for level 2.
•	Stargate.jsx: A model used as a finish line in level 2.
•	TargetsLvl2.jsx: Targets specific to level 2 gameplay.

Lvl3 Directory
•	Asteroid.jsx: Asteroid component for level 3.
•	DeathStar.jsx: A model from Star Wars, representing the iconic Death Star.
•	FuelShield.jsx: Model related to fuel or protective shields in level 3.
•	Lvl3.jsx: Main structure and logic file for level 3 gameplay.
•	Lvl3Spaceship.jsx: Spaceship component designed for level 3 interactions or features.
•	MiniMap.jsx: Level 3's mini-map representation.
•	Sun.jsx: Component representing the sun in level 3.
•	TargetsLvl3.jsx: Specific targets players need to engage with in level 3.

- solarSystem: Contains components or assets related to the representation of the solar system.
- startScreen: Contains files relevant css files for the game’s main menu.
- Completion.js: Handles logic or view related to the completion of certain game tasks or levels.
- controls.js: Contains the game's control logic, capturing and processing user inputs.
- firebase.js: Contains the logic for connecting to Firebase to link the leaderboard to the database.
- flame.jsx: Represents the visual or logic for flame effects in the game.
- index.css: Main CSS file for styling main menu.
- LevelComplete.js: Manages logic or displays related to the completion of a game level.
- main.jsx: The main entry point for the game and contains the html for setting up the main menu.
- mainlvl1.jsx: Contains the main structure and loads level 1 gameplay.
- mainlvl2.jsx: Contains the main structure and loads level 2 gameplay.
- mainlvl3.jsx: Contains the main structure and loads level 3 gameplay.
- MiniMap.jsx: Represents the game's mini-map feature.
- MotionBlur.jsx: Contains effect and logic for the boost for the ship.
- shipExplosion.jsx: Handles the visual and logic for spaceship explosion effects in the game.
- spaceStation.jsx: Contains components and logic related to the space station's representation in the game.
- SphereEnv.jsx: Manages spherical environmental elements or effects in the game.
- useExplode.jsx: A utility or hook to handle explosion effects or interactions in the game.


This structure provides an organized overview of the project's files and directories. This format allows team members or contributors to easily navigate and understand the project's structure.
