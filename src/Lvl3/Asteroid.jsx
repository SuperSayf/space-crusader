import { useState, useMemo, useEffect } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship";
import { displayGameOver } from "../Completion";
import { timeAliveExternal } from "./Lvl3Spaceship";

// Define a function to generate a random point within a specified scale
function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1, // X-component (depth position)
    Math.random() * 2 - 1, // Y-component (vertical position)
    Math.random() * 2 - 1 // Z-component (horizontal position)
  ).multiply(scale || new Vector3(1, 1, 1)); // Scale the random point by the specified scale
}

const TARGET_RAD = 0.125 * 2; // Radius of the target
const MAX_ASTEROIDS = 20; // Maximum number of asteroids

export let externalGameOverAsteroid = false; // Global game over state for asteroids


export function Asteroid() {
  const [targets, setTargets] = useState(() => {
    const arr = [];
    // Create a loop to generate the asteroids
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

  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state
  const [timeAlive, setTimeAlive] = useState(0); // Use state to set the time alive

  const textureLoader = new TextureLoader();
  const asteroidTexture = textureLoader.load("assets/textures/asteroid.jpg"); // Load the asteroid's textures
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

  // Defines a function to handle player collisions with asteroids
  const handleGameEnd = () => {
    if (!gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      externalGameOverAsteroid = true;
      const message = "You hit an asteroid!, DUMMY!";

      setTimeout(() => {
        displayGameOver(3, leaderboardData, message);
      }, 1000);
    }
  };

  useFrame(() => {
    setTimeAlive(timeAliveExternal);
    // Find the closest asteroid to the player
    let closestAsteroid = null;
    let closestDistance = Infinity;

    // Loop through the asteroids to find the closest one
    targets.forEach((target, i) => {
      const distance = planePosition.distanceTo(target.center);

      if (!target.hit && distance < closestDistance) {
        closestAsteroid = target;
        closestDistance = distance;
      }
    });

    // Move the closest asteroid towards the player
    if (closestAsteroid) {
      const directionToPlayer = planePosition
        .clone()
        .sub(closestAsteroid.center);
      const speed = 0.008;
      closestAsteroid.center.add(
        directionToPlayer.normalize().multiplyScalar(speed)
      );
    }

    // Update the asteroid's hit state
    const updatedTargets = targets.map((target) => {
      return {
        ...target,
        isClosest: target === closestAsteroid,
      };
    });

    setTargets(updatedTargets); // Update the targets state

    // Check for collisions with the player
    updatedTargets.forEach((target, i) => {
      const distance = planePosition.distanceTo(target.center);
      if (distance < TARGET_RAD) {
        handleGameEnd();
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
