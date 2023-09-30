import { useState, useMemo } from "react";
import { Quaternion, SphereGeometry, TorusGeometry, Vector3 } from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./animatedSpaceship";

const NUM_TARGETS = 40; // Number of targets
const TARGET_SPACING = 2.0; // Spacing between targets on the line
const TARGET_RAD = 0.125; // Radius of the target
const offset = 4;//adjusts the starting point of the targets
const ChangeY = 0;//adjusts the height of the targets
const ChangeZ = 0;//adjusts the depth of the targets

export function Targets() {
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 1; i < NUM_TARGETS; i++) {
      // Change the starting point for each target as needed
      const position = new Vector3(
        i * TARGET_SPACING + offset, // X-component (horizontal position)
        ChangeY + Math.random() * 2, // Y-component (vertical position)
        ChangeZ + Math.random() * 2, // Z-component (depth position)
      );

      // Create an initial direction vector (0, 0, 1) for the positive Z-axis
      const initialDirection = new Vector3(0, 0, 1);
      // Calculate the rotated direction vector by 90 degrees around the Y-axis
      const rotatedDirection = new Vector3(-initialDirection.z, 0, initialDirection.x);
      arr.push({
        center: position,
        direction: rotatedDirection,
        hit: false,
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
      setTargets(targets.filter((target) => !target.hit));
    }
  });

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial roughness={0.5} metalness={0.5} emissive={"#00ff00"} />
    </mesh>
  );
}
