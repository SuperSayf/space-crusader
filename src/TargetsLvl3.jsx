import React, { useState, useMemo, useEffect } from "react";
import { Quaternion, SphereGeometry, TorusGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./Lvl3Spaceship"
import { Html } from "@react-three/drei";
import { FuelShield } from "./FuelShield";

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
  const TargetAmt = 2;
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

  // Use useEffect to decrease boost every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease boost by 1 every second
      setBoost((prevBoost) => prevBoost - 2);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const geometry = useMemo(() => {
    let geo;

    targets.forEach((target) => {
      // Use a torus geometry to create a ring around the target
      const torusGeo = new SphereGeometry(TARGET_RAD, 32, 32);
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

    //console.log(boost);
    externalBoost = boost;
  });

  return (
    <>
      {targets.map((target, index) => (
        <FuelShield
          key={index}
          position={[target.center.x, target.center.y, target.center.z]}
          scale = {0.001}
        />
      ))}
    </>
  );
}
