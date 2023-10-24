import { useState, useMemo, useEffect } from "react";
import { Quaternion, TorusGeometry, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
import { displayLevelCompletion } from "../Completion";
import { Tesseract } from "./tesseract";
import { timeAliveExternal } from "./Lvl1Spaceship";

// Define the radius of the targets
const TARGET_RAD = 0.5;

// Create a variable to track the game over state for the Targets component
export let externalGameOverTargets = false;

// Function to generate a random point within a circle
function randomPointInCircle(radius, y) {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return new Vector3(x, y, z);
}

// Define the radius and amount of crates
const CRATE_RADIUS = 4;
const CRATE_AMOUNT = 8;

// Define the total number of targets and the number of collected targets
export const NUM_TARGETS = 8;
export var collectedObjs = 0;

// Define the Targets component
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

  // Check for game completion when all targets are collected
  useEffect(() => {
    if (collectedTargets === CRATE_AMOUNT) {
      console.log("You win!");
      setGameOver(true);
      externalGameOverTargets = true;
      handleGameCompletion();
    }
  }, [collectedTargets]);

  // Function to calculate the player's score
  const scoreCalculator = () => {
    let TotalScore = 0;
    let timeScore = (1 / timeAliveExternal) * 50;
    let targetScore = collectedObjs * 100;

    TotalScore = timeScore + targetScore;

    return Math.round(TotalScore);
  };

  // Function to handle game completion
  const handleGameCompletion = () => {
    if (!gameOver) {
      const leaderboardData = [
        { name: "Player", timeLasted: scoreCalculator() },
      ];
      setGameOver(true);
      const message = "You collected all the cubes!";
      setTimeout(() => {
        displayLevelCompletion(1, leaderboardData, message);
      }, 1000);
    }
  };

  // Use the useFrame hook for animation and game logic
  useFrame(() => {
    setTimeAlive(timeAliveExternal);

    // Update the state of the targets and check for collisions with the player
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
