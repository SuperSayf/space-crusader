import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { SaturnModel } from "./SaturnModel";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverSaturn = false; // Global game over state for Saturn

// Saturn component
const Saturn = React.memo(() => {
  const saturnRef = useRef(); // Create a reference to the Saturn

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state

  // Load the Saturn's textures
  const [saturnTexture, saturnRingTexture] = useTexture([
    "assets/textures/saturn.jpg",
    "assets/textures/saturn ring.png",
  ]);

  // this calculates the score when you hit saturn
  const scoreCalculator = () => {
    let score = 0;
    const penalty = 50;
    if (timeAliveExternal <= 75) {
      score = 100 * (1 / timeAliveExternal) + (50 * collectedObjs);
    } else if (timeAliveExternal > 75 && timeAliveExternal <= 150) {
      score = 500 * (1 / timeAliveExternal) + (100 * collectedObjs);
    } else if (timeAliveExternal > 150) {
      score = 500 * (1 / timeAliveExternal) + (50 * collectedObjs);
    }
    score -= penalty;
    return Math.round(score);
  };
  
  // Update the Saturn's position
  const updatesaturnPosition = useCallback(() => {
    // Calculate the saturn' position based on its angle from the Sun
    const angle = 30 + clockRef.current.getElapsedTime() * 0.12;
    const distance = 70;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    saturnRef.current.position.set(x, 0, z);
    saturnRef.current.rotation.y += 0.002;
    saturnRef.current.rotation.z += 0.0003;
  }, []);

  // Check for collisions used in useFrame and triggers game over state
  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(saturnRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 6 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverSaturn = true;
      //Msg For Game over Reason
      const message = "You went into Saturn... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updatesaturnPosition();
    collisionCheck();
  });

  return (
    <group ref={saturnRef}>
      <SaturnModel />
    </group>
  );
});

export default Saturn;
