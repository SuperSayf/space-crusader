import { useState, useMemo, useEffect } from "react";
import { Quaternion, TorusGeometry, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl1Spaceship";
import { displayLevelCompletion } from "../Completion";
import { displayGameOver } from "../GameOver";
import { StarWarsDatapad } from "./starWarsDatapad"; // Import the Model component
import { StarWarsCubeCrate } from "./starWarsCubeCrate";
import { Tesseract } from "./tesseract";

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

  useEffect(() => {
    if (collectedTargets === CRATE_AMOUNT) {
      console.log("You win!");
      displayLevelCompletion(1);
    }
  }, [collectedTargets]);

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
      {targets.map(
        (target, index) =>
          !target.hit && (
            <Tesseract
              key={index}
              position={[target.center.x, target.center.y, target.center.z]}
              scale={1}
            />
          )
      )}
    </>
  );
}

