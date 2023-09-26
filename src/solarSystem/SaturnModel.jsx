/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: SebastianSosnowski (https://sketchfab.com/SebastianSosnowski)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/saturn-planet-9ab1eb3bb97f4e4a9305c0aae2d280a6
Title: Saturn (planet)
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function SaturnModel(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/assets/models/saturn_planet.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null} scale={5}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.002}
        >
          <group
            name="56fb5d81d5a845599d5e60534f293915fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Saturn_Rings"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Saturn_Rings_Material_#63_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Saturn_Rings_Material_#63_0"].geometry}
                    material={materials.Material_63}
                  />
                </group>
                <group
                  name="Saturn"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <mesh
                    name="Saturn_Material_#50_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Saturn_Material_#50_0"].geometry}
                    material={materials.Material_50}
                  />
                </group>
                <group
                  name="Saturn_Clouds"
                  rotation={[-Math.PI / 2, 0, -0.019]}
                  scale={101}
                >
                  <mesh
                    name="Saturn_Clouds_Material_#62_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Saturn_Clouds_Material_#62_0"].geometry}
                    material={materials.Material_62}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/saturn_planet.glb");