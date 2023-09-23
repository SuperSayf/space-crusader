/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Dinendra Neyo (https://sketchfab.com/NeyoZ)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/multi-universe-space-ship-3d-model-42a2cbc97d9c489b80c6533c44294d55
Title: Multi Universe Space Ship 3D Model
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "./controls";
import { externalBoost } from "./TargetsLvl3";
import { buildStyles } from "react-circular-progressbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { externalShowSubtitles } from "./Lvl3";
import TypeWriterEffect from "react-typewriter-effect";
import { Flame } from "./flame";
import { JustSpaceshhip } from "./justSpaceship";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 7);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

export function AnimatedSpaceship(props) {
  const group = useRef();

  const { nodes, materials } = useGLTF("assets/models/justSpaceship.glb");

  const groupRef = useRef();

  const [boost, setBoost] = useState(100);
  const [showSubtitles, setShowSubtitles] = useState(false);

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    var quaternionA = new Quaternion().copy(delayedQuaternion);

    // warning! setting the quaternion from the rotation matrix will cause
    // issues that resemble gimbal locks, instead, always use the quaternion notation
    // throughout the slerping phase
    // quaternionA.setFromRotationMatrix(delayedRotMatrix);

    var quaternionB = new Quaternion();
    quaternionB.setFromRotationMatrix(rotMatrix);

    var interpolationFactor = 0.175;
    var interpolatedQuaternion = new Quaternion().copy(quaternionA);
    interpolatedQuaternion.slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity();
    delayedRotMatrix.makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.2))
      .multiply(new Matrix4().makeTranslation(0, 0.015, 0.3));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    // helixMeshRef.current.rotation.z -= 1.0;

    setBoost(externalBoost);
    setShowSubtitles(externalShowSubtitles);
  });

  return (
    <group ref={groupRef}>
      <group ref={group} {...props} dispose={null} scale={0.01}>
        <Html position={[6, 1, 7]}>
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={boost}
              text={`${boost}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0.25,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: "#66ff00",
                textColor: "#ffffff",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </Html>

        {/* if showSubtitles */}
        {showSubtitles && (
          <Html position={[6.6, -9, 7]}>
            <div className="subtitles" style={{ width: 500, height: 100 }}>
              <TypeWriterEffect
                textStyle={{
                  fontFamily: "Copperplate",
                  textAlign: "center",
                }}
                startDelay={50}
                cursorColor="white"
                text="This is your commander speaking...Let's see how long you can stay alive...Collect the fuel canisters to replinish your fuel"
                typeSpeed={40}
              />
            </div>
          </Html>
        )}

        <JustSpaceshhip />

        <group name="Flames" position={[1, 0, 6]}>
          <Flame />
        </group>

        <group name="Flames" position={[-1, 0, 6]}>
          <Flame />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/justSpaceship.glb");
