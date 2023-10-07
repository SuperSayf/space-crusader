import { useTexture } from "@react-three/drei";
import { BackSide } from "three";

export function SphereEnv() {
  const map = useTexture("assets/textures/space.png");

  return (
    <mesh>
      <sphereGeometry args={[120, 35, 35]} />
      <meshBasicMaterial side={BackSide} map={map} />
    </mesh>
  );
}
