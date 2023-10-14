import { useState, useMemo } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship";
import { displayGameOver } from "../GameOver";
import { timeAliveExternal } from "./Lvl3Spaceship";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125 * 2;
const MAX_ASTEROIDS = 20; // Maximum number of asteroids

export let externalGameOverAsteroid = false;

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
  const [timeAlive, setTimeAlive] = useState(0);

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

  // Use effect to set the time alive
  useFrame(() => {
    setTimeAlive(timeAliveExternal);
  });

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
      const directionToPlayer = planePosition
        .clone()
        .sub(closestAsteroid.center);
      const speed = 0.008; // Adjust the speed as needed
      closestAsteroid.center.add(
        directionToPlayer.normalize().multiplyScalar(speed)
      );
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
        const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
        setGameOver(true);
        externalGameOverAsteroid = true;
        const message = "You hit an asteroid!, DUMMY!";

        // Wait for 3 seconds before displaying the game over screen
        setTimeout(() => {
          displayGameOver(3, leaderboardData, message);
        }, 2000);
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
