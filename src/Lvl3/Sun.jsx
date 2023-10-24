import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { planePosition } from "./Lvl3Spaceship";
import { displayGameOver } from "../Completion";
import { timeAliveExternal } from "./Lvl3Spaceship";

export let externalGameOverSun = false; // Global game over state for Sun

export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/Sun.glb"); // Load the sun model

  const [sunTexture] = useTexture(["assets/textures/sun.jpg"]); // Load the sun texture
  const [gameOver, setGameOver] = useState(false); // Use state to set the game over state
  const [timeAlive, setTimeAlive] = useState(0); // Use state to set the time alive

  const sphereCenter = new Vector3(0, 0, 0); 
  const sphereRadius = 2.62;

  const sphereRef = useRef(); // Create a reference to the sun

  // Defines game over logic
  const handleGameEnd = () => {
    if (!gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      externalGameOverSun = true;
      const message = "You went into the sun... BRUH";

      setTimeout(() => {
        displayGameOver(3, leaderboardData, message);
      }, 1000);
    }
  };

  useFrame(() => {
    setTimeAlive(timeAliveExternal);
    const distance = planePosition.distanceTo(sphereCenter);

    if (distance < sphereRadius) {
      handleGameEnd();
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={sphereRef}
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={2.633}
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

useGLTF.preload("assets/models/Sun.glb");
