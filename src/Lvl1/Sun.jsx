import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { planePosition } from "./Lvl1Spaceship";
import { displayGameOver } from "../Completion";
import { timeAliveExternal } from "./Lvl1Spaceship";
import { collectedObjs } from "./Targets";

export let externalGameOverSun = false;

export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/Sun.glb");

  const [sunTexture] = useTexture(["assets/textures/sun.jpg"]);
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  const sphereCenter = new Vector3(0, 0, 0);
  const sphereRadius = 2;

  const sphereRef = useRef();

  const scoreCalculator = () => {
    let TotalScore = 0;
    let timeScore = (1 / timeAliveExternal) * 50;
    let targetScore = collectedObjs * 100;

    TotalScore = timeScore + targetScore;

    return Math.round(TotalScore);
  };

  const handleGameEnd = () => {
    if (!gameOver) {
      const leaderboardData = [
        { name: "Player", timeLasted: scoreCalculator() },
      ];
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

useGLTF.preload("assets/models/Sun.glb");
