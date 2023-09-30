import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { planePosition } from "../Lvl2/Lvl2SpaceShip";
import Moon from './Moon'

import * as THREE from 'three'

const Earth = React.memo(({ displacementScale }) => {
  const earthRef = useRef()

  const clockRef = useRef(new THREE.Clock()) // Create a reference to the clock

  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    '/assets/textures/earth.jpg',
    '/assets/textures/earth_normal.jpg',
    '/assets/textures/earth_specular.jpg',
    '/assets/textures/earth_displacement.jpg',
    '/assets/textures/earth_night.jpg',
  ])

  const updateEarthPosition = useCallback(() => {
    // Calculate the Earth's position based on its angle from the Sun
    const angle = 10 + clockRef.current.getElapsedTime() * 0.01
    const distance = 45
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    earthRef.current.position.set(x, 0, z)
    earthRef.current.rotation.y += 0.002
  }, [])

  const collisionCheck = useCallback(() => {
    const distance = planePosition.distanceTo(earthRef.current.position);

    // Check if the plane is inside the sphere
    if (distance <= 2) {
      console.log("Collision detected!");
    }
  }, [])

  useFrame(() => {
    updateEarthPosition();
    collisionCheck();
  })

  return (
    <group ref={earthRef}>
      <mesh
        castShadow
        receiveShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={500}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={1.5}
        />
      </mesh>
      <Moon />
    </group>
  )
})

export default Earth