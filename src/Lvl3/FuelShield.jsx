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
          material={materials.lambert3SG} // Example of a material property - lambert shading
          scale={14.149}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_6_A_1.geometry}
        material={materials.material_1} // Example of a material property - transparency
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_6_M_0.geometry}
        material={materials.material} // Example of a material property - transparency
      />
    </group>
  );
}

useGLTF.preload("assets/models/FuelShield.glb");
