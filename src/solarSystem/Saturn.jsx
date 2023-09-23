import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { SaturnModel } from './SaturnModel'

import * as THREE from 'three'

const Saturn = React.memo(() => {
  const saturnRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    saturnTexture,
    saturnRingTexture
  ] = useTexture([
    '/assets/textures/saturn.jpg',
    '/assets/textures/saturn ring.png'
  ])


  const updatesaturnPosition = useCallback(() => {
    // Calculate the saturn' position based on its angle from the Sun
    const angle = clockRef.current.getElapsedTime() * 0.12
    const distance = 120
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    saturnRef.current.position.set(x, 0, z)
    saturnRef.current.rotation.y += 0.002
  }, [])

  useFrame(() => {
    updatesaturnPosition()
  })

  return (
    <group ref={saturnRef}>
        <SaturnModel />
    </group>
  )
})

export default Saturn