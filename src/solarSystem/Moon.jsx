import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useCallback } from 'react'
import * as THREE from 'three'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";


const Moon = React.memo(() => {
  const moonRef = useRef()
  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [moonTexture] = useTexture(['/assets/textures/moon_map.jpg'])
  const xAxis = 4
  const updateMoonPosition = useCallback(() => {
    // Orbit Rotation
    moonRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.8) * xAxis
    moonRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.8) * xAxis
    // Axis Rotation
    moonRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(moonRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 0.5) {
      console.log("Collision detected!");
    }
  }, [])

  useFrame(() => {
    updateMoonPosition()
    collisionCheck()
  })

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[xAxis, 0, 0]}>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial
        map={moonTexture}
        emissiveMap={moonTexture}
        emissive={0xffffff}
        emissiveIntensity={0.05}
      />
    </mesh>
  )
})

export default Moon