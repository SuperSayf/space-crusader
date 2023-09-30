import React, { useEffect } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { SphereEnv } from "../SphereEnv";
import { Spaceship } from "../spaceShip";
import { MiniMap } from "../MiniMap";
import { Targets } from "../TargetsLvl2";
import { MotionBlur } from "../MotionBlur";
import { Asteroid } from "../Asteroid";
import { AnimatedSpaceship } from "../animatedSpaceship";
import SolarSystem from "../solarSystem/solarSystem";

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
      {/* <Spaceship /> */}
      {/* <AnimatedSpaceship /> */}
      <SolarSystem /> 
      <Targets />
      {/* <Asteroid /> */}
      <MiniMap />

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
