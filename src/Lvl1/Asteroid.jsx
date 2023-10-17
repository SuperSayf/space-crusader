import { useState, useMemo, useEffect } from "react";
import { Quaternion, SphereGeometry, TextureLoader, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
import { displayGameOver } from "../Completion"; // Ensure you are importing the correct component here
import { timeAliveExternal } from "./Lvl1Spaceship";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

export let externalGameOverAsteroid = false;

const TARGET_RAD = 0.125 * 2;
const SPAWN_DEPTH = -10;
const MAX_ASTEROIDS = 15;

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

  const handleGameEnd = () => {
    if (!gameOver) {
      const leaderboardData = [
        { name: "Player", timeLasted: timeAlive + " seconds" },
        { name: "Muz", timeLasted: "180 seconds" },
        { name: "Daggy", timeLasted: "90 seconds" },
      ];
      setGameOver(true);
      externalGameOverAsteroid = true;
      const message = "You hit an asteroid!";
      setTimeout(() => {
        displayGameOver(1, leaderboardData, message);
      }, 2000);
    }
  };

  useFrame(() => {
    setTimeAlive(timeAliveExternal);
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

    const newTargets = updatedTargets.filter((target) => !target.hit);
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
