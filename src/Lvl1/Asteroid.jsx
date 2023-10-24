import { useState, useMemo, useEffect } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
import { displayGameOver } from "../Completion"; // Ensure you are importing the correct component here
import { timeAliveExternal } from "./Lvl1Spaceship";
import { collectedObjs } from "./Targets";

// Define a function to generate a random point within a specified scale
function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

// Define a variable to keep track of the game over state for asteroids
export let externalGameOverAsteroid = false;

// Define constants for asteroid size, initial spawn depth, and maximum asteroids
const TARGET_RAD = 0.125 * 2;
const SPAWN_DEPTH = -10;
const MAX_ASTEROIDS = 15;

// Define the Asteroid component
export function Asteroid() {
  // Initialize state for asteroid targets
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

  // Initialize state for game over, time alive, and load asteroid texture
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);
  const textureLoader = new TextureLoader();
  const asteroidTexture = textureLoader.load("assets/textures/asteroid.jpg");

  // Calculate asteroid geometry using useMemo
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

  // Function to calculate the player's score
  const scoreCalculator = () => {
    let TotalScore = 0;
    let timeScore = (1 / timeAliveExternal) * 50;
    let targetScore = collectedObjs * 100;

    TotalScore = timeScore + targetScore;

    return Math.round(TotalScore);
  };

  // Function to handle the game end
  const handleGameEnd = () => {
    if (!gameOver) {
      const leaderboardData = [
        { name: "Player", timeLasted: scoreCalculator() },
      ];
      setGameOver(true);
      externalGameOverAsteroid = true;
      const message = "You hit an asteroid!";
      setTimeout(() => {
        displayGameOver(1, leaderboardData, message);
      }, 2000);
    }
  };

  // Use the useFrame hook for animation and game logic
  useFrame(() => {
    // Update the time alive
    setTimeAlive(timeAliveExternal);
    
    // Update asteroid positions and check for collisions with the player's plane
    const updatedTargets = targets.map((target) => {
      target.center.y -= 0.01;
      if (target.center.y < SPAWN_DEPTH) {
        target.center.set(
          randomPoint(new Vector3(4, 1, 4)).x,
          5,
          randomPoint(new Vector3(4, 1, 4)).z
        );
        target.hit = false;
      }

      const distance = planePosition.distanceTo(target.center);

      if (distance < TARGET_RAD) {
        handleGameEnd();
      }
      return target;
    });

    // Filter out the asteroids that were hit
    const newTargets = updatedTargets.filter((target) => !target.hit);

    // Add new asteroids if there are fewer than the maximum allowed
    if (newTargets.length < MAX_ASTEROIDS) {
      newTargets.push({
        center: randomPoint(new Vector3(4, 1, 4)).add(new Vector3(0, 5, 0)),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }
    setTargets(newTargets);
  });

  // Return the asteroid mesh with its material
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
