import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { planePosition } from "./Lvl3Spaceship";

export function Sun(props) {
  const { nodes, materials } = useGLTF("assets/models/Sun.glb");

  const [sunTexture] = useTexture(['/assets/textures/sun.jpg'])

  // Define the center and radius of the green sphere
  const sphereCenter = new Vector3(0, 0, 0);
  const sphereRadius = 2.62;

  // Create a reference to the mesh
  const sphereRef = useRef();

  // Use useFrame for continuous collision detection
  useFrame(() => {
    // Calculate the distance between the plane position and the sphere center
    const distance = planePosition.distanceTo(sphereCenter);
    console.log(planePosition)

    // Check if the plane is inside the sphere
    if (distance < sphereRadius) {
      console.log("Collision detected!");
    }
  });

  return (
    <group {...props} dispose={null}>
      {/* Render the sun from the gltf */}
      <mesh
        ref={sphereRef}
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={2.633}
      >
      <meshPhongMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={0.6}
        emissive={0xffffff}
      />
      <pointLight castShadow />
      </mesh>
    </group>
  );
}

useGLTF.preload("assets/models/Sun.glb");