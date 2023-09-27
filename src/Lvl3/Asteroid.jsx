import { useState, useMemo } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship";
import { externalBoost } from "./TargetsLvl3";

//Display function to add Gameover pop up html (Currently not using this )
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
  style.textContent = `
    .game-screen {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #333;
      border: 4px solid #fff;
      padding: 40px;
      text-align: center;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
      z-index: 9999;
      color: #fff;
      font-family: 'Arial', sans-serif;
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
const MAX_ASTEROIDS = 15; // Maximum number of asteroids

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

  // Game Over State Component
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

  useFrame(({ clock }) => {
    // Get the current time to make the movement smoother
    const elapsedTime = clock.elapsedTime;

    targets.forEach((target, i) => {
      // Calculate the direction vector from the asteroid to the player
      const directionToPlayer = planePosition
        .clone()
        .sub(target.center)
        .normalize();

      // Define a speed at which the asteroids move towards the player
      const speed = 0.0002;

      // Update the position of the asteroid towards the player
      target.center.add(directionToPlayer.multiplyScalar(speed * elapsedTime));

      // Check if the asteroid is close enough to the player to trigger a collision
      const distanceToPlayer = target.center.distanceTo(planePosition);

      if (distanceToPlayer < TARGET_RAD && !gameOver) {
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

      if (externalBoost <= 0 && !gameOver) {
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

    // Remove hit asteroids and add new ones at the top
    const newTargets = targets.filter((target) => !target.hit);
    if (newTargets.length < MAX_ASTEROIDS) {
      newTargets.push({
        center: randomPoint(new Vector3(4, 1, 4)).add(new Vector3(0, 5, 0)),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }
    setTargets(newTargets);
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
