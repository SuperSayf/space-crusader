import { useState, useRef } from "react";
import { Quaternion, SphereGeometry, TorusGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl2SpaceShip";
import { Astronaut} from "./astronaut";
import { Text } from "@react-three/drei";
import { Mesh, RingGeometry, MeshBasicMaterial, DoubleSide } from 'three';
import { Ring } from '@react-three/drei';


const NUM_TARGETS = 30; // Number of targets
const TARGET_SPACING = 5.0; // Spacing between targets on the line
const TARGET_RAD = 0.125; // Radius of the target
const offset = 4;//adjusts the starting point of the targets
const ChangeY = 1;//adjusts the height of the targets
const ChangeZ = 0;//adjusts the depth of the targets

export function Targets() {
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

  // Use useRef for collected count
  const [collectedCount, setCollectedCount] = useState(0);
  // New state for the progress bar
  const [progress, setProgress] = useState(100);

  // Update the progress bar every frame
  const PROGRESS_DURATION = 100000; // 100 seconds in milliseconds

  useFrame((state, delta) => {
    targets.forEach((target, i) => {
      //Target Collision Updated Logic
      const distance = planePosition.distanceTo(target.center);
      //if the ship hits the target/ring
      if (distance < TARGET_RAD) {
        target.hit = true;
        console.log("Ring hit")

        // Increment the collected count and log it
        setCollectedCount(prevCount => prevCount + 1);
        console.log(`Collected targets: ${collectedCount.current}`);
      }
    });

    const atLeastOneHit = targets.find((target) => target.hit);
    if (atLeastOneHit) {
      setTargets(targets.filter((target) => !target.hit));
    }

    // Update progress based on elapsed time
    const decrement = (delta * 100) / (PROGRESS_DURATION / 1000);
    setProgress((prev) => Math.max(prev - decrement, 0));

    // Optionally, if you want the astronaut to disappear once progress reaches 0
    if (progress <= 0) {
      setTargets([]);
    }
  });
  
  // For each astronaut, decrease the progress by a certain amount on every frame (or every few frames) until it reaches 0. 
  useFrame(() => {
    let updatedTargets = [...targets];
    let needUpdate = false;
    updatedTargets.forEach((target) => {
        if (target.progress > 0) {
            target.progress -= 0.01;  // Adjust the rate of progress reduction as needed
            if (target.progress <= 0) {
                target.hit = true;
            }
            needUpdate = true;
        }
    });

    if (needUpdate) {
        setTargets(updatedTargets.filter(target => !target.hit));
    }
});

  //creates the progress bar for the astronautes
  function CircularProgressBar({ position,progress }) {
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
            <>
                {target.progress > 0 && (
                    <>
                        <Astronaut
                            key={`astronaut-${index}`}
                            position={[target.center.x, target.center.y, target.center.z]}
                            scale={0.001} // Adjust scale as required
                        />
                        {/* adds the progress bar to each astronaut */}
                        <CircularProgressBar
                            position={[target.center.x, target.center.y, target.center.z]}
                            progress={target.progress}
                        />
                    </>
                )}
            </>
        ))}
    </>
);
}
