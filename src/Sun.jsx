import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial, Vector3 } from "three";
import { planePosition } from "./Lvl3Spaceship";

export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/sun.glb");

  // Define the center and radius of the green sphere
  const sphereCenter = new Vector3(0, 0, 0);
  const sphereRadius = 2.62;

  // Create a reference to the mesh
  const sphereRef = useRef();

  // Use useFrame for continuous collision detection
  useFrame(() => {
    // Calculate the distance between the plane position and the sphere center
    const distance = planePosition.distanceTo(sphereCenter);

    // Check if the plane is inside the sphere
    if (distance < sphereRadius) {

    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Render the sun from the gltf */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={2.633}
      />
    </group>
  );
}

useGLTF.preload("assets/models/sun.glb");
