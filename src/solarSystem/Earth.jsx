import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { planePosition, timeAliveExternal } from "../Lvl2/Lvl2SpaceShip";
import Moon from "./Moon";
import { displayGameOver } from "../Completion";
import { collectedObjs } from "../Lvl2/TargetsLvl2";
import * as THREE from "three";

export let extGameOverEarth = false;

const Earth = React.memo(({ displacementScale }) => {
  const earthRef = useRef();

  const clockRef = useRef(new THREE.Clock()); // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  //this calculates the score when you hit earth
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
  


  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    "assets/textures/earth.jpg",
    "assets/textures/earth_normal.jpg",
    "assets/textures/earth_specular.jpg",
    "assets/textures/earth_displacement.jpg",
    "assets/textures/earth_night.jpg",
  ]);

  const updateEarthPosition = useCallback(() => {
    // Calculate the Earth's position based on its angle from the Sun
    const angle = 10 + clockRef.current.getElapsedTime() * 0.01;
    const distance = 30;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;
    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += 0.002;
  }, []);

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(earthRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 1.5 && !gameOver) {
      const leaderboardData = [{ name: "Player", timeLasted: scoreCalculator() }];
      setGameOver(true);
      extGameOverEarth = true;
      //Msg For Game over Reason
      const message = "You went into Earth... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(2, leaderboardData, message);
      }, 2000);
    }
  }, []);

  useFrame(() => {
    updateEarthPosition();
    collisionCheck();
  });

  return (
    <group ref={earthRef}>
      <mesh castShadow receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={500}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={1.5}
        />
      </mesh>
      <Moon />
    </group>
  );
});

export default Earth;
