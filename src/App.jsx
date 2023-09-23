import React, { useEffect } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Landscape } from "./Landscape";
import { SphereEnv } from "./SphereEnv";
import { Spaceship } from "./spaceShip";
import { MiniMap } from "./MiniMap";
import { Targets } from "./Targets";
import { MotionBlur } from "./MotionBlur";
import { Asteroid } from "./Asteroid";
import { AnimatedSpaceship } from "./animatedSpaceship";

import { Howl, Howler } from "howler"; // Import Howler
import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file

function App() {
  // // Create an instance of the background music
  // const backgroundMusic = new Howl({
  //   src: [soundEffect],
  //   loop: true,
  // });

  // //Start playing the background music when the component mounts
  // useEffect(() => {
  //   backgroundMusic.volume(0.3); // Adjust the volume as needed
  //   backgroundMusic.play();

  //   // Clean up the audio when the component unmounts
  //   return () => {
  //     backgroundMusic.stop();
  //   };
  // }, []);

  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/space.hdr"} />
      
      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.5} />
      {/* <Landscape /> */}
      {/* <Spaceship /> */}
      <AnimatedSpaceship />
      {/* <Targets />
      <Asteroid /> */}
      <MiniMap />

      <directionalLight
        castShadow
        color={"#f3d29a"}
        intensity={1}
        position={[10, 5, 4]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6.2}
        shadow-camera-right={6.4}
      />

      <EffectComposer>
        <MotionBlur />
        <HueSaturation
          blendFunction={BlendFunction.NORMAL} // blend mode
          hue={-0.15} // hue in radians
          saturation={0.1} // saturation in radians
        />
      </EffectComposer>
    </>
  );
}

export default App;
