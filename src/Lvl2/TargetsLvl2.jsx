import { useState, useMemo, useEffect, createContext } from "react";
import { Quaternion, SphereGeometry, TorusGeometry, Vector3, DoubleSide } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl2SpaceShip";
import { Astronaut } from "./astronaut";
import { Fragment } from 'react';


export const NUM_TARGETS = 20; // Number of targets
const TARGET_SPACING = 5.0; // Spacing between targets on the line
const TARGET_RAD = 0.125; // Radius of the target
const offset = 5;//adjusts the starting point of the targets
const ChangeY = 1;//adjusts the height of the targets
const ChangeZ = 0;//adjusts the depth of the targets
export var collectedObjs = 0; // Number of collected targets

export function Targets() {
  const [progress, setProgress] = useState(100); // New state for the progress bar

  // Update the progress bar every frame
  const PROGRESS_DURATION = 1000; // 100 seconds in milliseconds

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

  //working code for hitting targets but progress bar not working
  useFrame((delta) => {
    const decrement = (delta * 100) / (PROGRESS_DURATION / 1000);
    let anyTargetHit = false; // initialize the flag here

    targets.forEach((target, index) => {
      const distance = planePosition.distanceTo(target.center);

      if (distance <= TARGET_RAD + 0.1) {
        // console.log(`Target ${index} hit with distance:`, distance);
        collectedObjs++;

        // Directly update the state by filtering out the hit target
        setTargets(prevTargets => prevTargets.filter((_, i) => i !== index));
      }

      //return { ...target, hit, progress: newProgress };
    });

    // Only update the targets state if any target has been hit
    if (anyTargetHit) {
      setTargets(updatedTargets.filter(target => !target.hit));
    }

    if (progress > 0) {
      setProgress(prevProgress => Math.max(prevProgress - decrement, 0));
    }
  });

  //creates the progress bar for the astronautes
  function CircularProgressBar({ position, progress }) {
    const radius = 0.2;  // adjust this value for size
    const tube = 0.05;   // adjust this value for thickness of the ring

    const thetaLength = (progress / 100) * 2 * Math.PI;

    return (
      <mesh position={position}>
        <ringGeometry attach="geometry" args={[radius - tube, radius, 32, 8, 0, thetaLength]} />
        <meshBasicMaterial attach="material" color="red" side={DoubleSide} />
      </mesh>
    );
  }

  return (
    <>
      {targets.map((target, index) => (
        <Fragment key={`fragment-${index}`}>
          {target.progress > 0 && (
            <>
              <Astronaut
                key={`astronaut-${index}`}
                position={[target.center.x, target.center.y, target.center.z]}
                scale={0.001} // Adjust scale as required
              />
              {/* adds the progress bar to each astronaut */}
              {/* <CircularProgressBar
                key={`progress-bar-${index}`}
                position={[target.center.x, target.center.y, target.center.z]}
                progress={target.progress}
              /> */}
            </>
          )}
        </Fragment>
      ))}

    </>
  );
}
