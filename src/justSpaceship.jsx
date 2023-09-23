import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function JustSpaceshhip(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "assets/models/justSpaceship.glb"
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[0, 0, -1.005]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={-1}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Baked_Animations_Intergalactic_Spaceships_Version_2_0"
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials["Material.001"]}
                />
              </group>
              <group
                name="Circle001_12"
                position={[1.033, 0.175, -5.274]}
                scale={[1.021, 1.021, 1.487]}
              />
              <group
                name="Circle_11"
                position={[-1.025, 0.18, -5.284]}
                scale={[1.021, 1.021, 1.487]}
              />
              <group
                name="Torus004_17"
                position={[-1.025, 0.18, -5.773]}
                rotation={[0, 0, -0.139]}
                scale={1.06}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/justSpaceship.glb");
