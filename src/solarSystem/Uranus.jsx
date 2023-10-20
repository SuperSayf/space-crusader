import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";

import * as THREE from "three";

export let extGameOverUranus = false;

const Uranus = React.memo(() => {
  const uranusRef = useRef();

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  const [uranusTexture] = useTexture(["assets/textures/uranus.jpg"]);

  const updateuranusPosition = useCallback(() => {
    // Calculate the uranus' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.09;
    const distance = 80;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    uranusRef.current.position.set(x, 0, z);
    uranusRef.current.rotation.y += 0.002;
  }, []);

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(uranusRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 2.5 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: timeAliveExternal }];
      setGameOver(true);
      extGameOverUranus = true;
      //Msg For Game over Reason
      const message = "You went into Uranus... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updateuranusPosition();
    collisionCheck();
  });

  return (
    <group ref={uranusRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshPhongMaterial map={uranusTexture} />
      </mesh>
    </group>
  );
});

export default Uranus;
