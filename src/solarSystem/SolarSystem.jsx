import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import Earth from './Earth'
import Mars from './Mars'
import { Sun } from './Sun'
import Mercury from './Mercury'
import Venus from './Venus'
import Jupiter from './Jupiter'
import Saturn from './Saturn'
import Uranus from './Uranus'
import Neptune from './Neptune'

const SolarSystem = React.memo(() => {
  const solarRef = useRef()

  return (
    <group ref={solarRef}>
    <Sun /> 
    <Mercury />
    <mesh rotateY={Math.PI}>
        <torusGeometry args={[15, 0.1, 2, 100]} />
    </mesh>
    <Venus />
    <mesh>
        <torusGeometry args={[25, 0.1, 2, 100]} />
    </mesh>
    <Earth displacementScale={0.01}/>
    <mesh>
        <torusGeometry args={[45, 0.1, 2, 100]} />
    </mesh>
    <Mars />
    <mesh>
        <torusGeometry args={[70, 0.1, 2, 100]} />
    </mesh>
    <Jupiter />
    <mesh>
        <torusGeometry args={[95, 0.1, 2, 100]} />
    </mesh>
    <Saturn />
    <mesh>
        <torusGeometry args={[120, 0.1, 2, 100]} />
    </mesh>
    <Uranus />
    <mesh>
        <torusGeometry args={[130, 0.1, 2, 100]} />
    </mesh>
    <Neptune />
    <mesh>
        <torusGeometry args={[150, 0.1, 2, 100]} />
    </mesh>

    </group>
  )
})

export default SolarSystem