import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverMars = false; // Global game over state for Mars

const Mars = React.memo(() => {
  const marsRef = useRef(); // Create a reference to the Mars

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state

  const [marsTexture] = useTexture(["assets/textures/mars.jpg"]); // Load the Mars' textures

  // this calculates the score when you hit mars
  const scoreCalculator = () => {
    let score = 0;
  
    if (timeAliveExternal <= 75) {
      score = 200 * (1 / timeAliveExternal) + (50 * collectedObjs);
    } else if (timeAliveExternal > 75 && timeAliveExternal <= 150) {
      score = 500 * (1 / timeAliveExternal) + (100 * collectedObjs);
    } else if (timeAliveExternal > 150) {
      score = 500 * (1 / timeAliveExternal) + (50 * collectedObjs);
    }
  
    return Math.round(score);
  };
  
  // Update the Mars' position
  const updateMarsPosition = useCallback(() => {
    // Calculate the Mars' position based on its angle from the Sun
    const angle = 1 + clockRef.current.getElapsedTime() * 0.05;
    const distance = 40;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    marsRef.current.position.set(x, 0, z);
    marsRef.current.rotation.y += 0.002;
  }, []);

  // Check for collisions used in useFrame and triggers game over state
  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(marsRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 1.1 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverMars = true;
      //Msg For Game over Reason
      const message = "You went into Mars... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updateMarsPosition();
    collisionCheck();
  });

  return (
    <group ref={marsRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshPhongMaterial map={marsTexture} />
      </mesh>
    </group>
  );
});

export default Mars;
