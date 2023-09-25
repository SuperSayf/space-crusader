import React, { useState, useMemo, useEffect } from "react";
import { Quaternion, SphereGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship";
import { FuelShield } from "../FuelShield";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125;

export let externalBoost = 100; // Export the boost value

export function Targets() {
  const TargetAmt = 10;
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < TargetAmt; i++) {
      arr.push({
        center: randomPoint(new Vector3(4, 1, 4)).add(
          new Vector3(0, 2 + Math.random() * 2, 0)
        ),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }

    return arr;
  });

  // Add a state variable for boost and its initial value
  const [boost, setBoost] = useState(100);
  let boostUsedPerSecond = 2

  // Use useEffect to decrease boost every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease boost by 2 every second
      setBoost((prevBoost) => prevBoost - boostUsedPerSecond);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  // Event listener to track Shift key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Shift") {
        console.log("Shift key is pressed down");
        boostUsedPerSecond = 4;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Shift") {
        console.log("Shift key is released");
        boostUsedPerSecond = 2;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    targets.forEach((target, i) => {
      const v = planePosition.clone().sub(target.center);
      const dist = target.direction.dot(v);
      const projected = planePosition
        .clone()
        .sub(target.direction.clone().multiplyScalar(dist));

      const hitDist = projected.distanceTo(target.center);
      if (hitDist < TARGET_RAD) {
        target.hit = true;
      }
    });

    const atLeastOneHit = targets.find((target) => target.hit);
    if (atLeastOneHit) {
      // Increase boost by 10 when a target is hit
      setBoost((prevBoost) => prevBoost + 10);
      setTargets(targets.filter((target) => !target.hit));
    }

    // Check if boost has reached 0
    if (boost <= 0) {
      //Implement the game over logic here
    }

    // Update the externalBoost variable
    externalBoost = boost;
  });

  return (
    <>
      {targets.map((target, index) => (
        <FuelShield
          key={index}
          position={[target.center.x, target.center.y, target.center.z]}
          scale={0.001}
        />
      ))}
    </>
  );
}
