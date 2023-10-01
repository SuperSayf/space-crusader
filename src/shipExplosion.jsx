import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useExplode } from "./useExplode";

export function ShipExplosion(props) {
  const { nodes, materials } = useGLTF("assets/models/shipExplosion.glb");
  const group = useRef();

  useExplode(group, {
    distance: 10,
  });

  return (
    <group
      {...props}
      dispose={null}
      ref={group}
      scale={1}
      rotation={[Math.PI, -Math.PI / 400, -Math.PI]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell.geometry}
        material={materials["Material.001"]}
        position={[0.971, 0.394, 1.732]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell001.geometry}
        material={materials["Material.001"]}
        position={[-0.895, -0.583, -1.177]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell002.geometry}
        material={materials["Material.001"]}
        position={[-1.976, 0.404, -2.411]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell003.geometry}
        material={materials["Material.001"]}
        position={[1.888, -0.635, -0.569]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell004.geometry}
        material={materials["Material.001"]}
        position={[-0.571, -0.132, 4.126]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell005.geometry}
        material={materials["Material.001"]}
        position={[-0.575, -0.88, 0.25]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell006.geometry}
        material={materials["Material.001"]}
        position={[-0.155, 1.026, 0.749]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell007.geometry}
        material={materials["Material.001"]}
        position={[-1.674, -0.498, -1.472]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell008.geometry}
        material={materials["Material.001"]}
        position={[-0.123, -0.88, 4.647]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell009.geometry}
        material={materials["Material.001"]}
        position={[-1.866, -0.875, -1.72]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell010.geometry}
        material={materials["Material.001"]}
        position={[-2.025, -0.833, -2.313]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell011.geometry}
        material={materials["Material.001"]}
        position={[-2.499, -0.271, -2.854]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell012.geometry}
        material={materials["Material.001"]}
        position={[0.515, 0.309, -2.98]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell013.geometry}
        material={materials["Material.001"]}
        position={[0.378, -0.965, 1.462]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell014.geometry}
        material={materials["Material.001"]}
        position={[0.232, 0.796, 2.488]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell015.geometry}
        material={materials["Material.001"]}
        position={[0.481, 1.15, -1.464]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell016.geometry}
        material={materials["Material.001"]}
        position={[0.054, -0.791, -2.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell017.geometry}
        material={materials["Material.001"]}
        position={[2.427, -0.737, -2.494]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell018.geometry}
        material={materials["Material.001"]}
        position={[1.824, -0.322, 0.448]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell019.geometry}
        material={materials["Material.001"]}
        position={[2.487, -0.534, 0.066]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell020.geometry}
        material={materials["Material.001"]}
        position={[-1.615, -0.14, -1.919]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell021.geometry}
        material={materials["Material.001"]}
        position={[0.271, 0.928, 0.756]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell022.geometry}
        material={materials["Material.001"]}
        position={[-0.28, 0.367, 4.018]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell023.geometry}
        material={materials["Material.001"]}
        position={[-0.244, -1.012, 3.353]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell024.geometry}
        material={materials["Material.001"]}
        position={[-0.274, -0.959, 0.747]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell025.geometry}
        material={materials["Material.001"]}
        position={[0.675, -0.144, 3.573]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell026.geometry}
        material={materials["Material.001"]}
        position={[-0.828, -0.816, -0.604]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell027.geometry}
        material={materials["Material.001"]}
        position={[0.507, -0.972, -0.171]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell028.geometry}
        material={materials["Material.001"]}
        position={[0.344, -0.194, -2.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell029.geometry}
        material={materials["Material.001"]}
        position={[0.481, 1.093, -1.027]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell030.geometry}
        material={materials["Material.001"]}
        position={[-1.584, -0.717, -2.302]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell031.geometry}
        material={materials["Material.001"]}
        position={[-1.524, 0.659, -1.829]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell032.geometry}
        material={materials["Material.001"]}
        position={[0.212, -0.339, 4.569]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell033.geometry}
        material={materials["Material.001"]}
        position={[2.671, -0.53, -2.109]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell034.geometry}
        material={materials["Material.001"]}
        position={[2.446, -0.52, 0.762]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell035.geometry}
        material={materials["Material.001"]}
        position={[-0.318, -0.843, 2.802]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell036.geometry}
        material={materials["Material.001"]}
        position={[0.934, 0.75, 0.331]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell037.geometry}
        material={materials["Material.001"]}
        position={[-1.6, 0.14, 0.828]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell038.geometry}
        material={materials["Material.001"]}
        position={[-2.317, 0.176, -2.558]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell039.geometry}
        material={materials["Material.001"]}
        position={[0.965, 0.837, -0.777]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell040.geometry}
        material={materials["Material.001"]}
        position={[-0.673, 0.099, -3.189]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell041.geometry}
        material={materials["Material.001"]}
        position={[1.022, 0.353, -3.265]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell042.geometry}
        material={materials["Material.001"]}
        position={[-0.252, -0.109, 4.52]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell043.geometry}
        material={materials["Material.001"]}
        position={[1.397, 0.214, -3.126]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell044.geometry}
        material={materials["Material.001"]}
        position={[0.428, 0.823, 0.053]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell045.geometry}
        material={materials["Material.001"]}
        position={[-1.879, -0.474, 1.155]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell046.geometry}
        material={materials["Material.001"]}
        position={[2.513, -0.245, -2.799]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell047.geometry}
        material={materials["Material.001"]}
        position={[-0.98, -0.476, 2.208]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell048.geometry}
        material={materials["Material.001"]}
        position={[-0.443, 0.952, -0.593]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell049.geometry}
        material={materials["Material.001"]}
        position={[-2.271, -0.482, 1.098]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell050.geometry}
        material={materials["Material.001"]}
        position={[-0.509, 0.788, -2.127]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell051.geometry}
        material={materials["Material.001"]}
        position={[-0.55, 1.134, -1.352]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell052.geometry}
        material={materials["Material.001"]}
        position={[1.547, -0.529, -2.207]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell053.geometry}
        material={materials["Material.001"]}
        position={[1.829, -0.38, 1.221]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell054.geometry}
        material={materials["Material.001"]}
        position={[-0.242, -0.953, -0.732]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell055.geometry}
        material={materials["Material.001"]}
        position={[-2.52, -0.058, -0.865]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell056.geometry}
        material={materials["Material.001"]}
        position={[-0.762, 0.79, 0.21]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell057.geometry}
        material={materials["Material.001"]}
        position={[2.648, -0.277, -1.38]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell058.geometry}
        material={materials["Material.001"]}
        position={[-2.694, -0.686, -0.937]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell059.geometry}
        material={materials["Material.001"]}
        position={[1.971, -0.034, -2.59]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell060.geometry}
        material={materials["Material.001"]}
        position={[0.045, 0.867, -2.15]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell061.geometry}
        material={materials["Material.001"]}
        position={[-0.256, -0.646, -2.525]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell062.geometry}
        material={materials["Material.001"]}
        position={[-2.044, 0.019, -2.127]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell063.geometry}
        material={materials["Material.001"]}
        position={[-1.088, 0.221, -3.256]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell064.geometry}
        material={materials["Material.001"]}
        position={[2.648, -0.24, -1.867]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell065.geometry}
        material={materials["Material.001"]}
        position={[-1.524, 0.255, -2.527]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell066.geometry}
        material={materials["Material.001"]}
        position={[-0.973, -0.436, -2.82]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell067.geometry}
        material={materials["Material.001"]}
        position={[-1.845, -0.19, -2.366]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell068.geometry}
        material={materials["Material.001"]}
        position={[-0.02, 0.853, -0.29]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell069.geometry}
        material={materials["Material.001"]}
        position={[0.276, -1.009, 4.188]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell070.geometry}
        material={materials["Material.001"]}
        position={[0.88, -0.057, -3.157]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell071.geometry}
        material={materials["Material.001"]}
        position={[0.45, 1.261, -1.46]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell072.geometry}
        material={materials["Material.001"]}
        position={[2.373, 0.016, -0.799]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell073.geometry}
        material={materials["Material.001"]}
        position={[0.549, -0.793, 3.069]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell074.geometry}
        material={materials["Material.001"]}
        position={[2.514, -0.05, -2.433]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell075.geometry}
        material={materials["Material.001"]}
        position={[1.155, -0.806, -0.882]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell076.geometry}
        material={materials["Material.001"]}
        position={[-0.849, 0.411, 2.835]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell077.geometry}
        material={materials["Material.001"]}
        position={[-0.207, 0.832, 1.341]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell078.geometry}
        material={materials["Material.001"]}
        position={[-2.64, -0.286, -2.526]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell079.geometry}
        material={materials["Material.001"]}
        position={[-1.26, -0.189, -2.549]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell080.geometry}
        material={materials["Material.001"]}
        position={[-2.077, 0.049, -0.182]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell081.geometry}
        material={materials["Material.001"]}
        position={[0.809, -0.489, -1.542]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell082.geometry}
        material={materials["Material.001"]}
        position={[1.086, 0.896, -2.086]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell083.geometry}
        material={materials["Material.001"]}
        position={[0.028, -0.852, 4.801]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell084.geometry}
        material={materials["Material.001"]}
        position={[-0.129, -1.151, 4.435]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell085.geometry}
        material={materials["Material.001"]}
        position={[-0.999, 0.746, -2.644]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell086.geometry}
        material={materials["Material.001"]}
        position={[2.402, -0.173, -2.922]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell087.geometry}
        material={materials["Material.001"]}
        position={[-2.729, -0.299, -1.832]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell088.geometry}
        material={materials["Material.001"]}
        position={[0.127, -0.959, 4.628]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell089.geometry}
        material={materials["Material.001"]}
        position={[-0.353, 0.657, 3.342]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell090.geometry}
        material={materials["Material.001"]}
        position={[1.215, -0.28, -3.082]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell091.geometry}
        material={materials["Material.001"]}
        position={[-1.066, 0.785, -0.816]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell092.geometry}
        material={materials["Material.001"]}
        position={[-0.362, 0.796, 2.035]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell093.geometry}
        material={materials["Material.001"]}
        position={[-2.254, -0.006, -2.862]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell094.geometry}
        material={materials["Material.001"]}
        position={[0.611, 0.557, 3.225]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell095.geometry}
        material={materials["Material.001"]}
        position={[-2.408, -0.471, 0.34]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell096.geometry}
        material={materials["Material.001"]}
        position={[-0.351, -0.906, 4.131]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell097.geometry}
        material={materials["Material.001"]}
        position={[1.704, 0.187, -0.004]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell098.geometry}
        material={materials["Material.001"]}
        position={[0.026, -0.972, -2.578]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell099.geometry}
        material={materials["Material.001"]}
        position={[-1.4, -0.88, 0.489]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell100.geometry}
        material={materials["Material.001"]}
        position={[-1.971, -0.88, -0.809]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell101.geometry}
        material={materials["Material.001"]}
        position={[-1.446, 0.62, -2.617]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell102.geometry}
        material={materials["Material.001"]}
        position={[2.64, -0.724, -0.5]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell103.geometry}
        material={materials["Material.001"]}
        position={[-0.07, 0.312, -2.926]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell104.geometry}
        material={materials["Material.001"]}
        position={[2.699, -0.348, -2.58]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell105.geometry}
        material={materials["Material.001"]}
        position={[2.318, 0.148, -0.154]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell106.geometry}
        material={materials["Material.001"]}
        position={[-0.895, -0.413, -2.01]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell107.geometry}
        material={materials["Material.001"]}
        position={[-1.12, -0.758, -2.074]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell108.geometry}
        material={materials["Material.001"]}
        position={[-1.298, 1.261, -1.626]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell109.geometry}
        material={materials["Material.001"]}
        position={[-0.015, 0.357, -3.367]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell110.geometry}
        material={materials["Material.001"]}
        position={[0.055, 1.198, -3.545]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell111.geometry}
        material={materials["Material.001"]}
        position={[1.524, 1.372, -2.839]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell112.geometry}
        material={materials["Material.001"]}
        position={[1.791, 1.61, -3.106]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell113.geometry}
        material={materials["Material.001"]}
        position={[1.811, 0.68, -2.399]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell114.geometry}
        material={materials["Material.001"]}
        position={[-0.567, -0.251, -2.415]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell115.geometry}
        material={materials["Material.001"]}
        position={[-1.875, -0.174, -2.586]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell116.geometry}
        material={materials["Material.001"]}
        position={[-1.658, -0.762, -2.549]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell117.geometry}
        material={materials["Material.001"]}
        position={[-1.089, -0.763, -2.52]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell118.geometry}
        material={materials["Material.001"]}
        position={[-0.806, -0.73, -2.25]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell119.geometry}
        material={materials["Material.001"]}
        position={[-1.781, 0.093, -2.203]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell120.geometry}
        material={materials["Material.001"]}
        position={[0.724, -0.677, -2.699]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell121.geometry}
        material={materials["Material.001"]}
        position={[0.84, 1.125, -1.51]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell122.geometry}
        material={materials["Material.001"]}
        position={[-1.759, -0.378, -2.432]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell123.geometry}
        material={materials["Material.001"]}
        position={[0.803, -0.713, -2.119]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell124.geometry}
        material={materials["Material.001"]}
        position={[-1.588, 1.482, -2.728]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell125.geometry}
        material={materials["Material.001"]}
        position={[0.832, -0.735, -2.65]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell126.geometry}
        material={materials["Material.001"]}
        position={[-2.1, -0.413, -2.798]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell127.geometry}
        material={materials["Material.001"]}
        position={[-2.057, 0.183, 0.298]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell128.geometry}
        material={materials["Material.001"]}
        position={[0.683, -0.708, -2.589]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.origin_cell129.geometry}
        material={materials["Material.001"]}
        position={[-2.111, -1.012, -0.165]}
      />
    </group>
  );
}

useGLTF.preload("assets/models/shipExplosion.glb");
