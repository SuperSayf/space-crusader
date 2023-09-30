import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";

import * as THREE from 'three'

const Uranus = React.memo(() => {
  const uranusRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    uranusTexture
  ] = useTexture([
    '/assets/textures/uranus.jpg'
  ])

  const updateuranusPosition = useCallback(() => {
    // Calculate the uranus' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.09
    const distance = 130
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    uranusRef.current.position.set(x, 0, z)
    uranusRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(uranusRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 3) {
      console.log("Collision detected!");
    }
  }, [])

  useFrame(() => {
    updateuranusPosition()
    collisionCheck()
  })

  return (
    <group ref={uranusRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[3, 32, 32]} />
        <meshPhongMaterial
          map={uranusTexture}
        />
      </mesh>
    </group>
  )
})

export default Uranus