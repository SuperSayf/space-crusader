import { useState, useMemo, useEffect, createContext } from "react";
import { Quaternion, SphereGeometry, TorusGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl2SpaceShip";
import { Astronaut} from "./astronaut";
import {TargetsProvider, useTargets} from "./targetsContext";
// import { CircularProgressbar } from "react-circular-progressbar";
// import { Html } from "@react-three/drei";
// import { buildStyles } from "react-circular-progressbar";

export const NUM_TARGETS = 30; // Number of targets
const TARGET_SPACING = 5.0; // Spacing between targets on the line
const TARGET_RAD = 0.125; // Radius of the target
const offset = 4;//adjusts the starting point of the targets
const ChangeY = 1;//adjusts the height of the targets
const ChangeZ = 0;//adjusts the depth of the targets

export function Targets() {
  const [collectedTargets, setCollectedTargets] = useState(0); // state to keep track of the number of collected targets
  const [gameWon, setGameWon] = useState(false); //  state to track if game has been won
  
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < NUM_TARGETS; i++) {
      // Change the starting point for each target as needed
      const position = new Vector3(
        ChangeZ + Math.random() * 2, // X-component (depth position)
        ChangeY + Math.random() * 2, // Y-component (vertical position)
        i * TARGET_SPACING + offset, // Z-component (horizontal position)
      );
      // Create an initial direction vector (0, 0, 1) for the positive Z-axis
      const initialDirection = new Vector3(1, 0, 0);
      // Calculate the rotated direction vector by 90 degrees around the Y-axis
      const rotatedDirection = new Vector3(-initialDirection.z, 0, initialDirection.x);
      arr.push({
        center: position,
        direction: rotatedDirection,
        hit: false,
        progress: Math.random() * 100, // Random progress between 0 and 100
      });
    }

    return arr;
  });

  const geometry = useMemo(() => {
    let geo;

    targets.forEach((target) => {
      // Use a torus geometry to create a ring around the target
      const torusGeo = new TorusGeometry(TARGET_RAD, TARGET_RAD / 4, 16, 32);
      torusGeo.applyQuaternion(
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 0, 1),
          target.direction
        )
      );
      torusGeo.translate(target.center.x, target.center.y, target.center.z);

      if (!geo) geo = torusGeo;
      else geo = mergeBufferGeometries([geo, torusGeo]);
    });

    return geo;
  }, [targets]);

  /*Handles Level Completion
  -Called everytime the collectedTagets value changes
  -Sets GameWon to true
  -Calls diplayLevelCompletion function , parses 1 to it
  -See LevelComplete.js Page for more on what diplayLevelCompletion function does
  */
  useEffect(() => {
    console.log("Collected Targets: ", collectedTargets);
  }, [collectedTargets]);

  useFrame(() => {
    targets.forEach((target, i) => {
      //Target Collision Updated Logic
      const distance = planePosition.distanceTo(target.center);
      //if the ship hits the target/ring
      if (distance <= TARGET_RAD + 0.15) {
        target.hit = true;
        console.log("Ring hit");
        setCollectedTargets(prev => prev + 1); // Increase collected targets count
      }
    });

    const atLeastOneHit = targets.find((target) => target.hit);
    if (atLeastOneHit) {
      setTargets(targets.filter((target) => !target.hit));
    }
  });

  return (
    <>
      {targets.map((target, index) => (
        <Astronaut
          key={index}
          position={[target.center.x, target.center.y, target.center.z]}
          scale={0.001}// Adjust scale as required
        />
      //   <mesh geometry={geometry}>
      //   <meshStandardMaterial
      //     roughness={0.5}
      //     metalness={0.5}
      //     emissive={"#00ff00"}
      //   />
      // </mesh>
      ))}
    </>
  );
}
