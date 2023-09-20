import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';

export function BlackHole(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("assets/models/blackHole.glb");

  // Define a rotation speed (in radians per frame)
  const rotationSpeed = 0.01;

  // Use the useFrame hook to update the rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group {...props} ref={groupRef} dispose={null} scale={0.1} position={[10, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BlackHole_mesh.geometry}
        material={materials["BlackHole:Blackhole_mat"]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/blackHole.glb");
