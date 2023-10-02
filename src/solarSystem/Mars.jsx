import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";

import * as THREE from 'three'

const Mars = React.memo(() => {
  const marsRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  const [
    marsTexture
  ] = useTexture([
    '/assets/textures/mars.jpg'
  ])

  const updateMarsPosition = useCallback(() => {
    // Calculate the Mars' position based on its angle from the Sun
    const angle = 1 + clockRef.current.getElapsedTime() * 0.05
    const distance = 70
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    marsRef.current.position.set(x, 0, z)
    marsRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(marsRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 1.3 && !gameOver) {
      const leaderboardData = [
        { name: "Sayf", timeLasted: "1 second" },
        { name: "Muz", timeLasted: "180 seconds" },
        { name: "Daggy", timeLasted: "90 seconds" }
      ];
      setGameOver(true);
      //Msg For Game over Reason
      const message = "You went into Mars... BRUH";
      displayGameOver(2, leaderboardData,message);
    }
  }, [])

  useFrame(() => {
    updateMarsPosition()
    collisionCheck()
  })

  return (
    <group ref={marsRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshPhongMaterial
          map={marsTexture}
        />
      </mesh>
    </group>
  )
})

export default Mars