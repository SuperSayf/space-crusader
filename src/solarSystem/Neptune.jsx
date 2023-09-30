import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl3/Lvl3Spaceship";

import * as THREE from 'three'

const Neptune = React.memo(() => {
  const neptuneRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    neptuneTexture
  ] = useTexture([
    '/assets/textures/neptune.jpg'
  ])

  const updateneptunePosition = useCallback(() => {
    // Calculate the neptune' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.07
    const distance = 150
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    neptuneRef.current.position.set(x, 0, z)
    neptuneRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(neptuneRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 3.5) {
      console.log("Collision detected!");
    }
  }, [])

  useFrame(() => {
    updateneptunePosition()
    collisionCheck()
  })

  return (
    <group ref={neptuneRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshPhongMaterial
          map={neptuneTexture}
        />
      </mesh>
    </group>
  )
})

export default Neptune