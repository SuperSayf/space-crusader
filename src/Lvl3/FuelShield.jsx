import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function FuelShield(props) {
  const { nodes, materials } = useGLTF("assets/models/FuelShield.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.lambert3SG}
          scale={14.149}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_6_A_1.geometry}
        material={materials.material_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_6_M_0.geometry}
        material={materials.material}
      />
    </group>
  );
}

useGLTF.preload("assets/models/FuelShield.glb");
