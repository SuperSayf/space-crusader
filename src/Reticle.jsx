import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

// Example of different camera perspective, implemented in each ship
export const Reticle = () => {
  const reticleRef = useRef();
  const rightBoxRef = useRef();
  const leftBoxRef = useRef();
  const upBoxRef = useRef();
  const downBoxRef = useRef();

  // Update reticle position based on the object (planePosition)
  useFrame(({ camera }) => {
    // General position swap with ship
    const reticlePosition = new Vector3(0, 0, -15);
    reticlePosition.applyMatrix4(camera.modelViewMatrix);
    reticleRef.current.position.copy(reticlePosition);

    // Left side of screen relative to general position
    const leftPosition = new Vector3(-10, 0, 0);
    leftPosition.applyMatrix4(camera.modelViewMatrix);
    leftBoxRef.current.position.copy(leftPosition);

    // Right side of screen relative to general position
    const rightPosition = new Vector3(10, 0, 0);
    rightPosition.applyMatrix4(camera.modelViewMatrix);
    rightBoxRef.current.position.copy(rightPosition);

    // Up side of screen relative to general position
    const upPosition = new Vector3(0, 5, 0);
    upPosition.applyMatrix4(camera.modelViewMatrix);
    upBoxRef.current.position.copy(upPosition);

    // Down side of screen relative to general position
    const downPosition = new Vector3(0, -10, 0);
    downPosition.applyMatrix4(camera.modelViewMatrix);
    downBoxRef.current.position.copy(downPosition);

  });

  return (
    <group ref={reticleRef}>
        <mesh ref={leftBoxRef}>
            <boxGeometry attach="geometry" args={[0.1, 60, 0]} position={[0, 0, 0]} />
            <meshBasicMaterial color="transparent" wireframe={false} side={2} />
        </mesh>
        <mesh ref={rightBoxRef}>
            <boxGeometry attach="geometry" args={[0.1, 60, 0]} position={[0, 0, 0]} />
            <meshBasicMaterial color="transparent" wireframe={false} side={2} />
        </mesh>
        <mesh ref={upBoxRef}>
            <boxGeometry attach="geometry" args={[60, 10, 0]} position={[0, 0, 0]} />
            <meshBasicMaterial color="transparent" wireframe={true} side={2} />
        </mesh>
        <mesh ref={downBoxRef}>
            <boxGeometry attach="geometry" args={[60, 10, 0]} position={[0, 0, 0]} />
            <meshBasicMaterial color="transparent" wireframe={true} side={2} />
        </mesh>
    </group>
  );
};
