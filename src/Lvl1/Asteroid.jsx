import { useState, useMemo } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
// import { displayGameOver } from "../GameOver";
import { displayGameOver } from "../Completion";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

export let externalGameOverAsteroid = false;

const TARGET_RAD = 0.125 * 2;
const SPAWN_DEPTH = -10; // Depth at which new asteroids are spawned
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
    // Move the asteroids downward in each frame
    targets.forEach((target, i) => {
      target.center.y -= 0.01;
      if (target.center.y < SPAWN_DEPTH) {
        // Remove asteroids that have reached the spawn depth
        target.center.set(
          randomPoint(new Vector3(4, 1, 4)).x,
          5,
          randomPoint(new Vector3(4, 1, 4)).z
        );
        target.hit = false;
      }

      const distance = planePosition.distanceTo(target.center);
      //if the ship hits the asteroid
      if (distance < TARGET_RAD && !gameOver) {
        target.hit = true; //  muz
        console.log("Game over");

        //Dummy Leaderboard
        const leaderboardData = [
          { name: "Sayf", timeLasted: "Didn't even put it in" },
          { name: "Muz", timeLasted: "180 seconds" },
          { name: "Daggy", timeLasted: "90 seconds" },
        ];
        setGameOver(true);
        externalGameOverAsteroid = true;
        //Msg For Game over Reason
        const message = "You hit an asteroid!";
        // Wait for 3 seconds before displaying the game over screen
        setTimeout(() => {
          displayGameOver(3, leaderboardData, message);
        }, 2000);
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
