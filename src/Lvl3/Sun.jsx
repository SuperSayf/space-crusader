import React, { useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { planePosition } from "./Lvl3Spaceship";
import { displayGameOver } from "../GameOver";
import { timeAliveExternal } from "./Lvl3Spaceship";

export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/Sun.glb");

  const [sunTexture] = useTexture(["/assets/textures/sun.jpg"]);
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  // Define the center and radius of the green sphere
  const sphereCenter = new Vector3(0, 0, 0);
  const sphereRadius = 2.62;

  // Create a reference to the mesh
  const sphereRef = useRef();

  // Use effect to set the time alive
  useFrame(() => {
    setTimeAlive(timeAliveExternal);
  });

  // Use useFrame for continuous collision detection
  useFrame(() => {
    // Calculate the distance between the plane position and the sphere center
    const distance = planePosition.distanceTo(sphereCenter);

    // Check if the plane is inside the sphere
    if (distance < sphereRadius && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      //Msg For Game over Reason
      const message = "You went into the sun... BRUH";
      displayGameOver(leaderboardData, message);
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Render the sun from the gltf */}
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
