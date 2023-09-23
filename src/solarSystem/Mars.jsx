import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'

import * as THREE from 'three'

const Mars = React.memo(() => {
  const marsRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    marsTexture
  ] = useTexture([
    '/assets/textures/mars.jpg'
  ])

  const updateMarsPosition = useCallback(() => {
    // Calculate the Mars' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.05
    const distance = 70
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    marsRef.current.position.set(x, 0, z)
    marsRef.current.rotation.y += 0.002
  }, [])

  useFrame(() => {
    updateMarsPosition()
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