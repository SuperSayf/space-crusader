import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverMercury = false; // Global game over state for Mercury

const Mercury = React.memo(() => {
  const mercuryRef = useRef(); // Create a reference to the Mercury

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state

  const [mercuryTexture] = useTexture(["assets/textures/mercury.jpg"]); // Load the Mercury's textures

  // this calculates the score when you hit mercury
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
  
  // Update the Mercury's position
  const updatemercuryPosition = useCallback(() => {
    // Calculate the mercury' position based on its angle from the Sun
    const angle = 50 + clockRef.current.getElapsedTime() * 0.03;
    const distance = 10;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    mercuryRef.current.position.set(x, 0, z);
    mercuryRef.current.rotation.y += 0.002;
  }, []);

  // Check for collisions used in useFrame and triggers game over state
  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(mercuryRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 0.3 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverMercury = true;
      //Msg For Game over Reason
      const message = "You went into Mercury... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updatemercuryPosition();
    collisionCheck();
  });

  return (
    <group ref={mercuryRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial map={mercuryTexture} />
      </mesh>
    </group>
  );
});

export default Mercury;
