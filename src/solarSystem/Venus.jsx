import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl3/Lvl3Spaceship";

import * as THREE from 'three'

const Venus = React.memo(() => {
  const venusRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    venusTexture
  ] = useTexture([
    '/assets/textures/venus.jpg'
  ])

  const updatevenusPosition = useCallback(() => {
    // Calculate the venus' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.065
    const distance = 25
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    venusRef.current.position.set(x, 0, z)
    venusRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(venusRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 1.5) {
      console.log("Collision detected!");
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
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial
          map={venusTexture}
        />
      </mesh>
    </group>
  )
})

export default Venus