import { useState, useMemo } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship";

//Display function to add Gameover pop up html (Currently not using this )
// function DisplayGameOver() {
//   const gameScreen = document.createElement('div');
//   gameScreen.classList.add('game-screen');
//   gameScreen.id = 'gameScreen';

//   // Create the h2 element
//   const h2 = document.createElement('h2');
//   h2.textContent = 'Game Over!';
//   gameScreen.appendChild(h2);

//   // Create the restart button
//   const restartButton = document.createElement('button');
//   restartButton.id = 'restartButton';
//   restartButton.textContent = 'Restart';
//   gameScreen.appendChild(restartButton);

//   // Create the menu button
//   const menuButton = document.createElement('button');
//   menuButton.id = 'menuButton';
//   menuButton.textContent = 'Go to Main Menu';
//   gameScreen.appendChild(menuButton);

//   // Add event listeners to buttons (if needed)

//   // Append the game screen to the body
//   document.body.appendChild(gameScreen);

//   // Create the style element
//   const style = document.createElement('style');
//   style.textContent = `
//     .game-screen {
//       display: block;
//       position: fixed;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       background-color: #333;
//       border: 4px solid #fff;
//       padding: 40px;
//       text-align: center;
//       box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
//       z-index: 9999;
//       color: #fff;
//       font-family: 'Arial', sans-serif;
//     }
//   `;
//   document.head.appendChild(style);
// }

function DisplayGameOver() {
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
  // Not working
  // style.innerHTML = `
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
}

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125 * 2;
const MAX_ASTEROIDS = 20; // Maximum number of asteroids

export function Asteroid() {
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < MAX_ASTEROIDS; i++) {
      arr.push({
        center: randomPoint(new Vector3(4, 1, 4)).add(
          new Vector3(0, 2 + Math.random() * 2, 0)
        ),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }

    return arr;
  });

  //Game Over State Component
  const [gameOver, setGameOver] = useState(false);

  const textureLoader = new TextureLoader();
  const asteroidTexture = textureLoader.load("assets/textures/asteroid.jpg");
  const geometry = useMemo(() => {
    let geo;

    targets.forEach((target) => {
      const torusGeo = new SphereGeometry(TARGET_RAD, 8, 8);
      torusGeo.applyQuaternion(
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 0, 1),
          target.direction
        )
      );
      torusGeo.translate(target.center.x, target.center.y, target.center.z);

      if (!geo) geo = torusGeo;
      else geo = mergeBufferGeometries([geo, torusGeo]);
    });

    return geo;
  }, [targets]);

  useFrame(() => {
    // Find the closest asteroid to the player
    let closestAsteroid = null;
    let closestDistance = Infinity;

    targets.forEach((target, i) => {
      const distance = planePosition.distanceTo(target.center);

      // If the asteroid is not hit and it's closer than the previous closest
      if (!target.hit && distance < closestDistance) {
        closestAsteroid = target;
        closestDistance = distance;
      }
    });

    // Move the closest asteroid toward the player
    if (closestAsteroid) {
      const directionToPlayer = planePosition.clone().sub(closestAsteroid.center);
      const speed = 0.008; // Adjust the speed as needed
      closestAsteroid.center.add(directionToPlayer.normalize().multiplyScalar(speed));
    }

    // Update the targets array with the closest asteroid information
    const updatedTargets = targets.map((target) => {
      return {
        ...target,
        isClosest: target === closestAsteroid,
      };
    });

    setTargets(updatedTargets);

    // Check for collisions with the player
    updatedTargets.forEach((target, i) => {
      const distance = planePosition.distanceTo(target.center);
      if (distance < TARGET_RAD && !gameOver) {
        target.hit = true;
        console.log("Game over");
        setGameOver(true);
        DisplayGameOver();

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
    });
  });

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        roughness={0.9}
        metalness={0.1}
        map={asteroidTexture}
      />
    </mesh>
  );
}
