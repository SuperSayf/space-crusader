import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Flame(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("assets/models/flame.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    actions.Animation.play();
  }, [mixer]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.1}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[0, 0, -7.391]}
          rotation={[Math.PI / 2, 0, -Math.PI]}
          scale={-1}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="Baked_Animations_Intergalactic_Spaceships_Version_2_0"
                rotation={[Math.PI / 2, 0, 0]}
              />
              <group
                name="Circle001_12"
                position={[1.033, 0.175, -5.274]}
                scale={[1.021, 1.021, 1.487]}
              />
              <group
                name="Circle_11"
                position={[-0.016, 0.18, -5.284]}
                scale={[1.021, 1.021, 1.487]}
              >
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials["Material.002"]}
                />
              </group>
              <group
                name="Empty_9"
                position={[-0.066, 0.256, -5.542]}
                rotation={[0, -0.021, 0.023]}
              />
              <group
                name="Torus001_14"
                position={[-0.016, 0.18, -8.707]}
                rotation={[0, 0, -1.885]}
                scale={0.239}
              >
                <mesh
                  name="Object_14"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.003"]}
                />
              </group>
              <group
                name="Torus002_15"
                position={[-0.016, 0.18, -7.729]}
                rotation={[0, 0, -3.142]}
                scale={0.89}
              >
                <mesh
                  name="mesh_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_5.geometry}
                  material={materials["Material.003"]}
                  morphTargetDictionary={nodes.mesh_5.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_5.morphTargetInfluences}
                />
              </group>
              <group
                name="Torus003_16"
                position={[-0.016, 0.18, -6.751]}
                rotation={[0, 0, -1.885]}
                scale={1.229}
              >
                <mesh
                  name="mesh_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_6.geometry}
                  material={materials["Material.003"]}
                  morphTargetDictionary={nodes.mesh_6.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_6.morphTargetInfluences}
                />
              </group>
              <group
                name="Torus004_17"
                position={[-0.016, 0.18, -5.773]}
                rotation={[0, 0, -0.139]}
                scale={1.06}
              >
                <mesh
                  name="Object_20"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_20.geometry}
                  material={materials["Material.003"]}
                />
              </group>
              <group
                name="Torus006_19"
                position={[2.06, 0.193, -8.637]}
                rotation={[0, 0, -3.142]}
                scale={0.89}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/flame.glb");
