import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Bridge(props) {
  const { nodes, materials } = useGLTF("assets/models/Bridge.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.PIllar_4k}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Platform_4k}
        />
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/Bridge.glb");
