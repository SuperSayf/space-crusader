import React, { useRef, useEffect, useState } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "../controls";
import { Flame } from "../flame";
import { JustSpaceshhip } from "../justSpaceship";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
export const planePosition = new Vector3(0, 3, 7);

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

// Custom hook to detect the shift key press
function useKeyPress(targetKey) {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) {
      setIsKeyPressed(true);
    }
  }

  function upHandler({ key }) {
    if (key === targetKey) {
      setIsKeyPressed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return isKeyPressed;
}

export function AnimatedSpaceship(props) {
  const group = useRef();

  const groupRef = useRef();

  // Detect the shift key press
  const isShiftPressed = useKeyPress("Shift");

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
  });

  return (
    <group ref={groupRef}>
      <group ref={group} {...props} dispose={null} scale={0.01}>
        <JustSpaceshhip />

        <group
          name="Flames"
          position={isShiftPressed ? [1, 0, 10] : [1, 0, 6]}
          scale={isShiftPressed ? 2 : 1}
        >
          <Flame />
        </group>

        <group
          name="Flames"
          position={isShiftPressed ? [-1, 0, 10] : [-1, 0, 6]}
          scale={isShiftPressed ? 2 : 1}
        >
          <Flame />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/justSpaceship.glb");
