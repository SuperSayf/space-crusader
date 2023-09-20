import { useState, useMemo } from "react";
import {
  Quaternion,
  SphereGeometry,
  TextureLoader,
  Vector3,
} from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { planePosition } from "./spaceShip";

function randomPoint(scale) {
  return new Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).multiply(scale || new Vector3(1, 1, 1));
}

const TARGET_RAD = 0.125*2;
const SPAWN_DEPTH = -10; // Depth at which new asteroids are spawned
const MAX_ASTEROIDS = 15; // Maximum number of asteroids

export function Asteroid() {
  const [targets, setTargets] = useState(() => {
    const arr = [];
    for (let i = 0; i < MAX_ASTEROIDS; i++) {
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

  const textureLoader = new TextureLoader();
  const asteroidTexture = textureLoader.load("assets/textures/asteroid.jpg");

  const geometry = useMemo(() => {
    let geo;

    targets.forEach((target) => {
      const torusGeo = new SphereGeometry(TARGET_RAD, 8, 8);
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
    // Move the asteroids downward in each frame
    targets.forEach((target, i) => {
      target.center.y -= 0.02;

      if (target.center.y < SPAWN_DEPTH) {
        // Remove asteroids that have reached the spawn depth
        target.center.set(
          randomPoint(new Vector3(4, 1, 4)).x,
          5,
          randomPoint(new Vector3(4, 1, 4)).z
        );
        target.hit = false;
      }

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

    // Remove hit asteroids and add new ones at the top
    const newTargets = targets.filter((target) => !target.hit);
    if (newTargets.length < MAX_ASTEROIDS) {
      newTargets.push({
        center: randomPoint(new Vector3(4, 1, 4)).add(
          new Vector3(0, 5, 0)
        ),
        direction: randomPoint().normalize(),
        hit: false,
      });
    }
    setTargets(newTargets);
  });

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        roughness={0.9}
        metalness={0.1}
        map={asteroidTexture}
      />
    </mesh>
  );
}
