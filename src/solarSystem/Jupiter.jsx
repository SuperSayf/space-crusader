import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl3/Lvl3Spaceship";

import * as THREE from 'three'

const Jupiter = React.memo(() => {
  const jupiterRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    jupiterTexture
  ] = useTexture([
    '/assets/textures/jupiter.jpg'
  ])

  const updatejupiterPosition = useCallback(() => {
    // Calculate the jupiter' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.1
    const distance = 95
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    jupiterRef.current.position.set(x, 0, z)
    jupiterRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(jupiterRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 5) {
      console.log("Collision detected!");
    }
  }, [])

  useFrame(() => {
    updatejupiterPosition()
    collisionCheck()
  })

  return (
    <group ref={jupiterRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[5, 32, 32]} />
        <meshPhongMaterial
          map={jupiterTexture}
        />
      </mesh>
    </group>
  )
})

export default Jupiter