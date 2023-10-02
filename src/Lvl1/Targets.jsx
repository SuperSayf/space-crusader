// import { useState, useMemo } from "react";
// import { Quaternion, TorusGeometry, Vector3 } from "three";
// import { mergeBufferGeometries } from "three-stdlib";
// import { useFrame } from "@react-three/fiber";
// import { planePosition } from "./Lvl1Spaceship";
// import { displayLevelCompletion } from "../LevelComplete";
// import { displayGameOver } from "../GameOver";
// function pointsInCircle(numPoints, radius, center) {
//   const points = [];
//   for (let i = 0; i < numPoints; i++) {
//     const theta = (i / numPoints) * Math.PI * 2;
//     const x = center.x + radius * Math.cos(theta);
//     const y = center.y;
//     const z = center.z + radius * Math.sin(theta);
//     points.push(new Vector3(x, y, z));
//   }
//   return points;
// }

// function randomPoint(scale) {
//   return new Vector3(
//     Math.random() * 2 - 1,
//     Math.random() * 2 - 1,
//     Math.random() * 2 - 1
//   ).multiply(scale || new Vector3(1, 1, 1));
// }

// const TARGET_RAD = 0.125;

// export function Targets() {
//   const numTargets = 2;
//   const circleRadius = 5;

//   const [targets, setTargets] = useState(() => {
//     const arr = [];
//     const circleCenter = new Vector3(0, 2, 0); // Adjust as needed

//     const circlePoints = pointsInCircle(numTargets, circleRadius, circleCenter);
//     circlePoints.forEach((point) => {
//       arr.push({
//         center: point,
//         direction: randomPoint().normalize(),
//         hit: false,
//       });
//     });

//     return arr;
//   });

//   const geometry = useMemo(() => {
//     let geo;

//     targets.forEach((target) => {
//       const torusGeo = new TorusGeometry(TARGET_RAD, TARGET_RAD / 4, 16, 32);
//       torusGeo.applyQuaternion(
//         new Quaternion().setFromUnitVectors(
//           new Vector3(0, 0, 1),
//           target.direction
//         )
//       );
//       torusGeo.translate(target.center.x, target.center.y, target.center.z);

//       if (!geo) geo = torusGeo;
//       else geo = mergeBufferGeometries([geo, torusGeo]);
//     });

//     return geo;
//   }, [targets]);

//   useFrame(() => {
//     targets.forEach((target, i) => {
//       //Target Collision Updated Logic
//       const distance = planePosition.distanceTo(target.center);
//       //if the ship hits the target/ring
//       if (distance < TARGET_RAD) {
//         target.hit = true;
//         console.log("Ring hit");
//       }
//     });

//     const atLeastOneHit = targets.find((target) => target.hit);
//     if (atLeastOneHit) {
//       setTargets(targets.filter((target) => !target.hit));
//     }
//   });

//   return targets.length > 0 ? (
//     <mesh geometry={geometry}>
//       <meshStandardMaterial
//         roughness={0.5}
//         metalness={0.5}
//         emissive={"#00ff00"}
//       />
//     </mesh>
//   ) : null;
// }

import { useState, useMemo, useEffect } from "react";
import { Quaternion, TorusGeometry, Vector3 } from "three";
// import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
// import { displayLevelCompletion } from "../LevelComplete";
import { displayLevelCompletion } from "../Completion";
// import { displayLevelCompletion } from "../LevelComplete";
import { displayGameOver } from "../GameOver";
import { StarWarsDatapad } from "./starWarsDatapad"; // Import the Model component
import { StarWarsCubeCrate } from "./starWarsCubeCrate";

const TARGET_RAD = 0.5;

function randomPointInCircle(radius, y) {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return new Vector3(x, y, z);
}

const CRATE_RADIUS = 4;
const CRATE_AMOUNT = 8;

export function Targets() {
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < CRATE_AMOUNT; i++) {
      arr.push({
        center: randomPointInCircle(CRATE_RADIUS, 0),
        hit: false,
      });
    }
    return arr;
  });

  const [collectedTargets, setCollectedTargets] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (collectedTargets === CRATE_AMOUNT && !gameWon) {
      setGameWon(true);
      console.log("You win!");
      displayLevelCompletion(1);
    }
  }, [collectedTargets, gameWon]);

  useFrame(() => {
    const updatedTargets = targets.map((target, i) => {
      const distance = planePosition.distanceTo(target.center);
      if (distance < TARGET_RAD && !target.hit) {
        console.log("Cube collected");
        setCollectedTargets((prev) => prev + 1);
        return { ...target, hit: true };
      }
      return target;
    });

    setTargets(updatedTargets);
  });

  return (
    <>
      {targets.map((target, index) => (
        !target.hit && (
          <StarWarsCubeCrate
            key={index}
            position={[target.center.x, target.center.y, target.center.z]}
            scale={1}
          />
        )
      ))}
    </>
  );
}

// function pointsInCircle(numPoints, radius, center) {
//   const points = [];
//   for (let i = 0; i < numPoints; i++) {
//     const theta = (i / numPoints) * Math.PI * 2;
//     const x = center.x + radius * Math.cos(theta);
//     const y = center.y;
//     const z = center.z + radius * Math.sin(theta);
//     points.push(new Vector3(x, y, z));
//   }
//   return points;
// }

// function randomPoint(scale) {
//   return new Vector3(
//     Math.random() * 2 - 1,
//     Math.random() * 2 - 1,
//     Math.random() * 2 - 1
//   ).multiply(scale || new Vector3(1, 1, 1));
// }

// const TARGET_RAD = 0.125;

// export function Targets() {
//   const numTargets = 1;
//   const circleRadius = 5;

//   const [collectedTargets, setCollectedTargets] = useState(0); // state to keep track of the number of collected targets
//   const [gameWon, setGameWon] = useState(false); //  state to track if game has been won

//   const [targets, setTargets] = useState(() => {
//     const arr = [];
//     const circleCenter = new Vector3(0, 2, 0); // Adjust as needed

//     const circlePoints = pointsInCircle(numTargets, circleRadius, circleCenter);
//     circlePoints.forEach((point) => {
//       arr.push({
//         center: point,
//         direction: randomPoint().normalize(),
//         hit: false,
//       });
//     });

//     return arr;
//   });

//   const geometry = useMemo(() => {
//     return targets.map((target, index) => (
//       <StarWarsDatapad
//         key={index} // Use a unique key for each model
//         position={target.center.clone()}
//         rotation={2 * Math.PI * Math.random()}
//       />
//     ));
//   }, [targets]);

//   /*Handles Level Completion
// -Called everytime the collectedTagets value changes
// -Sets GameWon to true
// -Calls diplayLevelCompletion function , parses 1 to it
// -See LevelComplete.js Page for more on what diplayLevelCompletion function does
// */
//   useEffect(() => {
//     if (collectedTargets === numTargets && !gameWon) {
//       setGameWon(true);
//       console.log("u win");
//       displayLevelCompletion(1);
//     }
//   }, [collectedTargets]);

//   useFrame(() => {
//     targets.forEach((target, i) => {
//       // Target Collision Updated Logic
//       const distance = planePosition.distanceTo(target.center);
//       // if the ship hits the target/ring
//       if (distance < TARGET_RAD) {
//         target.hit = true;
//         console.log("Ring hit");
//         setCollectedTargets((prev) => prev + 1); // Increase collected targets count
//       }
//     });

//     const atLeastOneHit = targets.find((target) => target.hit);
//     if (atLeastOneHit) {
//       setTargets(targets.filter((target) => !target.hit));
//     }
//   });

//   // return targets.length > 0 ? <>{geometry}</> : null;
//   return (
//     <>
//       {targets.map((target, index) => (
//         <>
//           <>
//             <StarWarsDatapad
//               key={`StarWarsDatapad-${index}`}
//               position={[0, 0, 0]} //target.center.x, target.center.y, target.center.z
//               scale={5} // Adjust scale as required
//             />
//             {/* adds the progress bar to each astronaut */}
//             {/* <CircularProgressBar
//                             position={[target.center.x, target.center.y, target.center.z]}
//                             progress={target.progress}
//                         /> */}
//           </>
//         </>
//       ))}
//     </>
//   );
// }
