import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

// Define the MiniMap component
const MiniMap = () => {
  // Create a reference to the MiniMap camera
  const miniMapCameraRef = useRef();

  // Define the frustum size and aspect ratio
  const frustumSize = 500;
  const aspect = window.innerWidth / window.innerHeight;

  // Define the position of the MiniMap in pixels
  const miniMapLocationLeftPixels =
    window.innerWidth - 8 - window.innerWidth * 0.2;
  const miniMapLocationBottomPixels = 8;

  // Use the useFrame hook for rendering the MiniMap
  useFrame(({ gl, scene, camera }) => {
    // Clear the full screen for the main camera view
    gl.autoClear = true;
    gl.setViewport(0, 0, window.innerWidth, window.innerHeight);
    gl.setScissor(0, 0, window.innerWidth, window.innerHeight);
    gl.setScissorTest(true);
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();

    // Render the MiniMap camera view
    gl.setViewport(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      window.innerWidth * 0.2,
      window.innerHeight * 0.2
    );
    gl.setScissor(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      window.innerWidth * 0.2,
      window.innerHeight * 0.2
    );
    gl.setScissorTest(true);

    // Update MiniMap camera position to match the main camera
    miniMapCameraRef.current.position.x = camera.position.x;
    miniMapCameraRef.current.position.y = camera.position.y;
    miniMapCameraRef.current.position.z = 100; // Adjust the Z position as needed
    miniMapCameraRef.current.up.set(0, 0, 1); // Ensure the up vector is [0, 0, 1] for top-down view
    miniMapCameraRef.current.aspect = aspect;
    miniMapCameraRef.current.updateMatrixWorld();
    miniMapCameraRef.current.updateProjectionMatrix();
    gl.render(scene, miniMapCameraRef.current);
  }, 1);

  // Return the OrthographicCamera for the MiniMap
  return (
    <OrthographicCamera
      ref={miniMapCameraRef}
      makeDefault={false}
      zoom={50}
      position={[0, 0, 100]}
      up={[0, 0, 1]}
      left={(frustumSize * aspect) / -2}
      right={(frustumSize * aspect) / 2}
      top={frustumSize / 2}
      bottom={frustumSize / -2}
      far={1000}
      near={0.1}
    />
  );
};

// Export the MiniMap component
export { MiniMap };
