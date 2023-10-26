import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { planePosition } from "./Lvl1Spaceship";
import { displayGameOver } from "../Completion";
import { timeAliveExternal } from "./Lvl1Spaceship";
import { collectedObjs } from "./Targets";

// Define a variable to track the game over state for the Sun component
export let externalGameOverSun = false;
export const sphereCenter = new Vector3(0, 0, 0);
export const sphereRadius = 2;

// Define the Sun component
export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/Sun.glb");

  const [sunTexture] = useTexture(["assets/textures/sun.jpg"]);
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  // Define the center and radius of the sphere representing the Sun
  // const sphereCenter = new Vector3(0, 0, 0);
  // const sphereRadius = 2;

  const sphereRef = useRef();

  // Function to calculate the player's score
  const scoreCalculator = () => {
    let TotalScore = 0;
    let timeScore = (1 / timeAliveExternal) * 50;
    let targetScore = collectedObjs * 100;

    TotalScore = timeScore + targetScore;

    return Math.round(TotalScore);
  };

  // Function to handle the game end when the player goes into the Sun
  const handleGameEnd = () => {
    if (!gameOver) {
      // Prepare leaderboard data with the player's score
      const leaderboardData = [
        { name: "Player", timeLasted: scoreCalculator() },
      ];
      setGameOver(true);
      externalGameOverSun = true;
      const message = "You went into the sun... BRUH";

      // Display the game over screen after a delay
      setTimeout(() => {
        displayGameOver(1, leaderboardData, message);
      }, 1000);
    }
  };

  // Use the useFrame hook for animation and game logic
  useFrame(() => {
    setTimeAlive(timeAliveExternal);

    // Calculate the distance between the player's position and the Sun's center
    const distance = planePosition.distanceTo(sphereCenter);

    // If the player gets too close to the Sun, trigger the game end
    if (distance < sphereRadius) {
      handleGameEnd();
    }
  });

  // Return the Sun model with its material and lighting
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={sphereRef}
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={2}
      >
        <meshPhongMaterial
          map={sunTexture}
          emissiveMap={sunTexture}
          emissiveIntensity={0.6}
          emissive={0xffffff}
        />
        <pointLight castShadow />
      </mesh>
    </group>
  );
}

// Preload the 3D model of the Sun
useGLTF.preload("assets/models/Sun.glb");
