import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverVenus = false; // Global game over state for Venus

// Venus component
const Venus = React.memo(() => {
  const venusRef = useRef(); // Create a reference to the Venus

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state

  const [venusTexture] = useTexture(["assets/textures/venus.jpg"]); // Load the Venus's textures

  // this calculates the score when you hit venus
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
  
  // Update the Venus's position
  const updatevenusPosition = useCallback(() => {
    // Calculate the venus' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.065;
    const distance = 20;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    venusRef.current.position.set(x, 0, z);
    venusRef.current.rotation.y += 0.002;
  }, []);

  // Check for collisions used in useFrame and triggers game over state
  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(venusRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 1 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverVenus = true;
      //Msg For Game over Reason
      const message = "You went into Venus... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updatevenusPosition();
    collisionCheck();
  });

  return (
    <group ref={venusRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial map={venusTexture} />
      </mesh>
    </group>
  );
});

export default Venus;
