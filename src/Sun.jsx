import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';

export function Sun(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("assets/models/Sun.glb");

  // Create a reference for the point light
  const lightRef = useRef();

  // Define a rotation speed (in radians per frame)
  const rotationSpeed = 0.01;

  // Use the useFrame hook to update the rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group {...props} ref={groupRef} dispose={null} scale={0.03} position={[0, 0, 0]} rotation={[Math.PI / 2, 2, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["sun_01_Sphere-Mesh"].geometry}
        material={materials.FF9800}
      />

      {/* Add a PointLight */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color={0xffff00}
        intensity={2}
      />
    </group>
  );
}

useGLTF.preload("assets/models/Sun.glb");
