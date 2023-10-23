import React, { useState, useMemo, useEffect } from "react";
import { Quaternion, SphereGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship";
import { FuelShield } from "./FuelShield";
import { displayGameOver } from "../Completion";
import { timeAliveExternal } from "./Lvl3Spaceship";

export let externalGameOverBoost = false;

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125;

export let externalBoost = 100; // Export the boost value

export function Targets() {
  const TargetAmt = 10;
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < TargetAmt; i++) {
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

  // Add a state variable for boost and its initial value
  const [boost, setBoost] = useState(100);
  const [timeAlive, setTimeAlive] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Event listener to track Shift key press
  useEffect(() => {
    let boostUsedPerSecond = 2;

    const handleKeyDown = (event) => {
      if (event.key === "Shift") {
        boostUsedPerSecond = 4;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Shift") {
        boostUsedPerSecond = 2;
      }
    };

    const interval = setInterval(() => {
      // Decrease boost by 2 every second
      setBoost((prevBoost) => prevBoost - boostUsedPerSecond);
    }, 1000);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleGameEnd = () => {
    // console.log("Game over from boost");
    if (!gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      externalGameOverBoost = true;
      const message = "You ran out of boost! haiya";
      setTimeout(() => {
        displayGameOver(3, leaderboardData, message);
      }, 2000);
    }
  };

  useFrame(() => {
    setTimeAlive(timeAliveExternal);
    targets.forEach((target, i) => {
      // Target Collision Updated Logic
      const distance = planePosition.distanceTo(target.center);
      // If the ship hits the target/ring
      if (distance < TARGET_RAD) {
        target.hit = true;
        console.log(targets.length);
      }
    });

    const atLeastOneHit = targets.find((target) => target.hit);
    if (atLeastOneHit) {
      // Increase boost by 10 when a target is hit
      setBoost((prevBoost) => Math.min(prevBoost + 15, 100));
      setTargets(targets.filter((target) => !target.hit));
    }

    // Check if boost has reached 0
    if (boost <= 0) {
      // Handle game over logic here
      handleGameEnd();
    }

    // Update the externalBoost variable
    externalBoost = boost;

    // Check if half of the targets are left and respawn if needed
    if (targets.length <= TargetAmt / 2) {
      const newTargets = [];
      for (let i = 0; i < TargetAmt; i++) {
        newTargets.push({
          center: randomPoint(new Vector3(4, 1, 4)).add(
            new Vector3(0, 2 + Math.random() * 2, 0)
          ),
          direction: randomPoint().normalize(),
          hit: false,
        });
      }
      setTargets(newTargets);
    }
  });

  return (
    <>
      {targets.map((target, index) => (
        <FuelShield
          key={index}
          position={[target.center.x, target.center.y, target.center.z]}
          scale={0.001}
        />
      ))}
    </>
  );
}
