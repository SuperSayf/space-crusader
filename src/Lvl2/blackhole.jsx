/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Bl@ke (https://sketchfab.com/Bl_at_ke)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/gargantua-the-black-hole-d8b4c8af897842d0a85f4ea170e4fecc
Title: Gargantua the Black Hole
*/

import React, { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";

export let extGameOverBlackHole = false;

export function BlackHole(props) {
  const holeRef = useRef();

  const { nodes, materials } = useGLTF(
    "assets/models/gargantua_the_black_hole.glb"
  );
  const [gameOver, setGameOver] = useState(false);
  const [timeAlive, setTimeAlive] = useState(0);

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(holeRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 0.2 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAlive }];
      setGameOver(true);
      extGameOverBlackHole = true;
      //Msg For Game over Reason
      const message = "You went into Black Hole... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    setTimeAlive(timeAliveExternal);
    collisionCheck();
  });

  return (
    <group {...props} dispose={null} ref={holeRef}>
      <group rotation={[-1.493, -0.212, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.black}
            scale={0.748}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.accretion_disk}
            scale={0.91}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.Einstein_ring}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.black}
            scale={1.048}
          />
          <mesh
            // castShadow
            // receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials.glowing}
            scale={1.065}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/gargantua_the_black_hole.glb");
