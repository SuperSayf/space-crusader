import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'

import * as THREE from 'three'

const Mercury = React.memo(() => {
  const mercuryRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    mercuryTexture
  ] = useTexture([
    '/assets/textures/mercury.jpg'
  ])

  const updatemercuryPosition = useCallback(() => {
    // Calculate the mercury' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.03
    const distance = 15
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    mercuryRef.current.position.set(x, 0, z)
    mercuryRef.current.rotation.y += 0.002
  }, [])

  useFrame(() => {
    updatemercuryPosition()
  })

  return (
    <group ref={mercuryRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial
          map={mercuryTexture}
        />
      </mesh>
    </group>
  )
})

export default Mercury