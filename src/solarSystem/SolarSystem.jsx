import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Earth from "./Earth";
import Mars from "./Mars";
import { Sun } from "./Sun";
import Mercury from "./Mercury";
import Venus from "./Venus";
import Jupiter from "./Jupiter";
import Saturn from "./Saturn";
import Uranus from "./Uranus";
import Neptune from "./Neptune";
import { Stargate } from "../Lvl2/Stargate";

// Solar system component with all the planets - hierarchical modelling
const SolarSystem = React.memo(() => {
  const solarRef = useRef();

  return (
    <group ref={solarRef}>
      <Sun />
      <Stargate position={[0, -3, 4]} scale={0.005} rotation={[100, 0, 0]} />
      <Mercury />
      <Venus />
      <Earth displacementScale={0.01} />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      <Neptune />
    </group>
  );
});

export default SolarSystem;
