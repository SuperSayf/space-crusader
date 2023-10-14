import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { SaturnModel } from './SaturnModel'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";

import * as THREE from 'three'

export let extGameOverSaturn = false;

const Saturn = React.memo(() => {
  const saturnRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  const [
    saturnTexture,
    saturnRingTexture
  ] = useTexture([
    '/assets/textures/saturn.jpg',
    '/assets/textures/saturn ring.png'
  ])


  const updatesaturnPosition = useCallback(() => {
    // Calculate the saturn' position based on its angle from the Sun
    const angle = 30 + clockRef.current.getElapsedTime() * 0.12
    const distance = 70
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    saturnRef.current.position.set(x, 0, z)
    saturnRef.current.rotation.y += 0.002
    saturnRef.current.rotation.z += 0.0003
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(saturnRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 5.5 && !gameOver) {
      const leaderboardData = [
        { name: "Sayf", timeLasted: "1 second" },
        { name: "Muz", timeLasted: "180 seconds" },
        { name: "Daggy", timeLasted: "90 seconds" }
      ];
      setGameOver(true);
      extGameOverSaturn = true;
      //Msg For Game over Reason
      const message = "You went into Saturn... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(3, leaderboardData, message);
      }, 3000);
    }
  }, [])

  useFrame(() => {
    updatesaturnPosition()
    collisionCheck()
  })

  return (
    <group ref={saturnRef}>
        <SaturnModel />
    </group>
  )
})

export default Saturn