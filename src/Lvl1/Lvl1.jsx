import React, {useState} from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { SphereEnv } from "../SphereEnv";
import { MiniMap } from "./MiniMap";
import { Targets } from "./Targets";
import { MotionBlur } from "../MotionBlur";
import { Asteroid,  } from "./Asteroid";
import { AnimatedSpaceship, planePosition } from "./Lvl1Spaceship";
import { ShipExplosion } from "../shipExplosion";
import { externalGameOverAsteroid } from "./Asteroid";
import { useFrame } from "@react-three/fiber";

export let masterGameOverLvl1 = false;

function App() {
  // Use state to set the external game over state
  const [gameOver, setGameOver] = useState(false);

  // Use state to set the plane position
  const [planePos, setPlanePos] = useState(planePosition);

  // Use frame to update the game over state
  useFrame(() => {
    if (externalGameOverAsteroid) {
      setGameOver(true);
      masterGameOverLvl1 = true;
    }

    // Update the plane position
    setPlanePos(planePosition);
  });

  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/space.hdr"} />

      {/* Main perspective camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.5} />

      {/* Other components */}
      {/* If game over, show ship explosion */}
      {gameOver && <ShipExplosion position={planePos} />}

      {/* If not game over, show animated ship */}
      {!gameOver && <AnimatedSpaceship />}
      <Targets />
      <Asteroid />

      {/* MiniMap with top-down OrthographicCamera */}
      <MiniMap />
    </>
  );
}

export default App;

