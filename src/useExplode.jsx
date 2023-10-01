import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const useExplode = (group, { distance = 3, enableRotation = true }) => {
  const spaceBarPressed = useRef(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === " ") {
        // Space bar pressed
        spaceBarPressed.current = true;
      }
    };

    const handleKeyRelease = (event) => {
      if (event.key === " ") {
        // Space bar released
        spaceBarPressed.current = false;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyRelease);
    };
  }, []);

  useEffect(() => {
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.children.forEach((mesh) => {
      mesh.originalPosition = mesh.position.clone();
      mesh.targetPosition = mesh.position.clone(); // Initialize target position to original position
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);

      mesh.directionVector = meshWorldPosition
        .clone()
        .sub(groupWorldPosition)
        .normalize();

      mesh.originalRotation = mesh.rotation.clone();
      mesh.targetRotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Introduce variations in animation parameters for each mesh
      mesh.animationSpeed = Math.random() * 0.2 + 0.1; // Random speed between 0.1 and 0.3
      mesh.rotationSpeed = Math.random() * 0.02 + 0.01; // Random rotation speed between 0.01 and 0.03
      mesh.upForce = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(); // Randomized upward force
      mesh.sideForce = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(); // Randomized side force
    });
  }, []);

  useFrame(() => {
    group.current.children.forEach((mesh) => {
      if (spaceBarPressed.current) {
        // Trigger explosion animation when space bar is pressed
        mesh.targetPosition = mesh.originalPosition
          .clone()
          .add(mesh.directionVector.clone().multiplyScalar(distance));

        // Apply forces in multiple directions
        mesh.position.add(mesh.upForce.clone().multiplyScalar(0.01));
        mesh.position.add(mesh.sideForce.clone().multiplyScalar(0.01));

        mesh.position.x = THREE.MathUtils.lerp(
          mesh.position.x,
          mesh.targetPosition.x,
          0.1 // Adjust the speed of the animation as needed
        );

        mesh.position.y = THREE.MathUtils.lerp(
          mesh.position.y,
          mesh.targetPosition.y,
          0.1 // Adjust the speed of the animation as needed
        );

        mesh.position.z = THREE.MathUtils.lerp(
          mesh.position.z,
          mesh.targetPosition.z,
          0.1 // Adjust the speed of the animation as needed
        );

        if (enableRotation) {
          mesh.rotation.x += mesh.rotationSpeed; // Apply rotation speed
          mesh.rotation.y += mesh.rotationSpeed; // Apply rotation speed
          mesh.rotation.z += mesh.rotationSpeed; // Apply rotation speed
        }
      }
    });
  });
};
