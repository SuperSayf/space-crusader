import React, { useEffect, useState, Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { EffectComposer, HueSaturation } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Landscape } from "../Landscape";
import { SphereEnv } from "../SphereEnv";
import { Targets } from "./TargetsLvl3";
import { MotionBlur } from "../MotionBlur";
import { Asteroid } from "./Asteroid";
import { SpaceStation } from "../spaceStation";
import { MiniMap } from "./MiniMap";
import { Sun } from "./Sun";
import { AnimatedSpaceship } from "./Lvl3Spaceship";
import { DeathStar } from "./DeathStar";
import { Howl, Howler } from "howler"; // Import Howler
import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file
import commander from "/assets/audio/commander.mp3"; // Replace with the path to your background music file
import { Stats } from "@react-three/drei";
import { ShipExplosion } from "../shipExplosion";
import { planePosition } from "./Lvl3Spaceship";
import { externalGameOverAsteroid } from "./Asteroid";
import { externalGameOverDeathStar } from "./DeathStar";
import { externalGameOverSun } from "./Sun";
import { useFrame } from "@react-three/fiber";

export let externalShowSubtitles = false;

export let masterGameOverLvl3 = false;

// Define a CSS class for the loading bar
const loadingBarStyle = {
  background: "white", // Blue background color
  width: "500px", // Set the width to 80% to represent progress
  height: "30px", // Set the height as needed
  borderRadius: "50px", // Rounded border
  border: "1px solid white", // Solid white border
  position: "relative", // Position relative to the parent
  margin: "0 auto", // Center horizontally
  marginTop: "50px", // Add some top margin
  boxShadow: "0 0 10px white", // Add a slight shadow
};

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textStyle = {
  textAlign: "center",
  fontSize: "24px",
  margin: "20px 0",
  color: "white",
  width: "500px",
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html>
      <div style={centerStyle}>
        <div>
          {/* <p style={textStyle}>
            This is your commander speaking...Let's see how long you can stay
            alive...Collect the fuel canisters to replenish your fuel
          </p> */}
          <div className="loading-bar" style={loadingBarStyle}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "blue",
                borderRadius: "inherit",
              }}
            ></div>
          </div>
          <p style={textStyle}>{Math.round(progress)} %</p>
        </div>
      </div>
    </Html>
  );
}

function Lvl3() {
  // Use state to set the external game over state
  const [gameOver, setGameOver] = useState(false);

  // Use state to set the plane position
  const [planePos, setPlanePos] = useState(planePosition);

  // Use frame to update the game over state
  useFrame(() => {
    if (
      externalGameOverAsteroid ||
      externalGameOverSun ||
      externalGameOverDeathStar
    ) {
      setGameOver(true);
      masterGameOverLvl3 = true;
    }

    // Update the plane position
    setPlanePos(planePosition);
  });

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
    <Suspense fallback={<Loader />}>
      <Stats />
      <SphereEnv />
      <Environment background={false} files={"assets/textures/space.hdr"} />

      <PerspectiveCamera makeDefault position={[0, 0, 0]} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight intensity={0.5} />
      {/* <Landscape /> */}
      <SpaceStation />
      <Sun />
      <DeathStar />

      {/* If game over, show ship explosion */}
      {gameOver && <ShipExplosion position={planePos} />}

      {/* If not game over, show animated ship */}
      {!gameOver && <AnimatedSpaceship />}

      <Targets />
      <Asteroid />
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
    </Suspense>
  );
}

export default Lvl3;
