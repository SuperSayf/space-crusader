import { useState, useMemo, useEffect } from "react";
import { Quaternion, TorusGeometry, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
import { displayLevelCompletion } from "../Completion";
import { Tesseract } from "./tesseract";
import { timeAliveExternal } from "./Lvl1Spaceship";

const TARGET_RAD = 0.5;

export let externalGameOverTargets = false;

function randomPointInCircle(radius, y) {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return new Vector3(x, y, z);
}

const CRATE_RADIUS = 4;
const CRATE_AMOUNT = 8;
export const NUM_TARGETS = 8; // Number of targets
export var collectedObjs = 0; // Number of collected targets

export function Targets() {
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < CRATE_AMOUNT; i++) {
      arr.push({
        center: randomPointInCircle(CRATE_RADIUS, 0),
        hit: false,
      });
    }
    return arr;
  });

  const [collectedTargets, setCollectedTargets] = useState(0);

  useEffect(() => {
    if (collectedTargets === CRATE_AMOUNT) {
      console.log("You win!");
      setGameOver(true);
      externalGameOverTargets = true;
      handleGameCompletion();
    }
  }, [collectedTargets]);

  const handleGameCompletion = () => {
    if (!gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      const message = "You collected all the cubes!";
      setTimeout(() => {
        displayLevelCompletion(1, leaderboardData, message);
      }, 1000);
    }
  };

  useFrame(() => {
    setTimeAlive(timeAliveExternal);
    const updatedTargets = targets.map((target, i) => {
      const distance = planePosition.distanceTo(target.center);
      if (distance < TARGET_RAD && !target.hit) {
        console.log("Cube collected");
        collectedObjs++;
        setCollectedTargets((prev) => prev + 1);
        return { ...target, hit: true };
      }
      return target;
    });

    setTargets(updatedTargets);
  });

  return (
    <>
      {targets.map(
        (target, index) =>
          !target.hit && (
            <Tesseract
              key={index}
              position={[target.center.x, target.center.y, target.center.z]}
              scale={1}
            />
          )
      )}
    </>
  );
}
