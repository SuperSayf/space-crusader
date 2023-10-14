import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";

import * as THREE from 'three'

export let extGameOverVenus = false;

const Venus = React.memo(() => {
  const venusRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  const [
    venusTexture
  ] = useTexture([
    '/assets/textures/venus.jpg'
  ])

  const updatevenusPosition = useCallback(() => {
    // Calculate the venus' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.065
    const distance = 20
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    venusRef.current.position.set(x, 0, z)
    venusRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(venusRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 1 && !gameOver) {
      const leaderboardData = [
        { name: "Sayf", timeLasted: "1 second" },
        { name: "Muz", timeLasted: "180 seconds" },
        { name: "Daggy", timeLasted: "90 seconds" }
      ];
      setGameOver(true);
      extGameOverVenus = true;
      //Msg For Game over Reason
      const message = "You went into Venus... BRUH";
      // Wait for 3 seconds before displaying the game over screen
      setTimeout(() => {
        displayGameOver(3, leaderboardData, message);
      }, 2000);
    }
  }, [])

  useFrame(() => {
    updatevenusPosition()
    collisionCheck()
  })

  return (
    <group ref={venusRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={venusTexture}
        />
      </mesh>
    </group>
  )
})

export default Venus