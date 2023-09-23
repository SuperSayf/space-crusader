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
    <Venus />
    <Earth displacementScale={0.01}/>
    <Mars />
    <Jupiter />
    <Saturn />
    <Uranus />
    <Neptune />
    </group>
  )
})

export default SolarSystem