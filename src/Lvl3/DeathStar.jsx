import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial, Vector3 } from "three";
import { planePosition } from "./Lvl3Spaceship";
import { displayGameOver } from "../Completion";
import { timeAliveExternal } from "./Lvl3Spaceship";

export let externalGameOverDeathStar = false;

export function DeathStar(props) {
  const { nodes, materials } = useGLTF("assets/models/deathStar.glb");
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  const sphereCenter = new Vector3(5, 1, 1);
  const sphereRadius = 0.51;

  const handleGameEnd = () => {
    if (!gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      externalGameOverDeathStar = true;
      const message =
        "You went into the death star... BRUH have you not watched Star Wars?";
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
    <group {...props} dispose={null} position={[5, 1, 1]}>
      <mesh
        scale={0.01}
        castShadow
        receiveShadow
        geometry={nodes.DeathStar001_1_0.geometry}
        material={materials.material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        scale={0.01}
        castShadow
        receiveShadow
        geometry={nodes.DeathStar_misa001_2_0.geometry}
        material={materials.material_1}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/deathStar.glb");
