import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";
import { displayGameOver } from "../Completion";

import * as THREE from 'three'

const Mercury = React.memo(() => {
  const mercuryRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock
  const [gameOver, setGameOver] = useState(false);

  const [
    mercuryTexture
  ] = useTexture([
    '/assets/textures/mercury.jpg'
  ])

  const updatemercuryPosition = useCallback(() => {
    // Calculate the mercury' position based on its angle from the Sun
    const angle = 50 + clockRef.current.getElapsedTime() * 0.03
    const distance = 10
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    mercuryRef.current.position.set(x, 0, z)
    mercuryRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(mercuryRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 0.3 && !gameOver) {
      const leaderboardData = [
        { name: "Sayf", timeLasted: "1 second" },
        { name: "Muz", timeLasted: "180 seconds" },
        { name: "Daggy", timeLasted: "90 seconds" }
      ];
      setGameOver(true);
      //Msg For Game over Reason
      const message = "You went into Mercury... BRUH";
      displayGameOver(2, leaderboardData,message);
    }
  }, [])

  useFrame(() => {
    updatemercuryPosition()
    collisionCheck()
  })

  return (
    <group ref={mercuryRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial
          map={mercuryTexture}
        />
      </mesh>
    </group>
  )
})

export default Mercury