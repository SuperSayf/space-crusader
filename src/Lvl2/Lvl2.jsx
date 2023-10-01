import React, { useEffect } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { SphereEnv } from "../SphereEnv";
import { Spaceship } from "../spaceShip";
import { MiniMap } from "../MiniMap";
import { Targets } from "./TargetsLvl2";
import { MotionBlur } from "../MotionBlur";
import { Asteroid } from "../Lvl1/Asteroid";
import { AnimatedSpaceship } from "./Lvl2SpaceShip";
import SolarSystem from "../solarSystem/solarSystem";
import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file
import { Howl, Howler } from "howler"; // Import Howler
import commander from "/assets/audio/Level_2_voice_over.mp3"; // Replace with the path to your background music file
import {Bridge} from "./bridge";
import { Stats } from "@react-three/drei";

export let externalShowSubtitles = false;

function App() {
  // Create an instance of the background music
  const backgroundMusic = new Howl({
    src: [soundEffect],
    loop: true,
  });
  // Create an instance of the second audio
  const secondAudio = new Howl({
    src: [commander],
    loop: false,
  });

  // Start playing the background music and the second audio when the component mounts
  useEffect(() => {
    backgroundMusic.volume(0.3); // Adjust the volume as needed
    backgroundMusic.play();

    secondAudio.volume(1.0); // Adjust the volume as needed
    secondAudio.play();

    externalShowSubtitles = true;

    // Add an event listener to the second audio to detect when it ends
    secondAudio.on("end", () => {
      externalShowSubtitles = false;
    });

    // Clean up the audio and event listener when the component unmounts
    return () => {
      backgroundMusic.stop();
      secondAudio.stop();
      secondAudio.off("end"); // Remove the event listener to prevent memory leaks
      externalShowSubtitles = false;
    };
  }, []);

  

  return (
    <>
    <Stats />
      <SphereEnv />
      <Environment background={false} files={"assets/textures/space.hdr"} />

      <PerspectiveCamera makeDefault position={[0, 10, 10]} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.3} />
      {/* <Spaceship /> */}
      <AnimatedSpaceship />
      <SolarSystem />
      <Targets />
      {/* <Asteroid /> */}
      <MiniMap />
      <Bridge
        position={[1, -8, 170]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.5, 0.5, 0.5]}
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
