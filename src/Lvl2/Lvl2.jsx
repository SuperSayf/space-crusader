import React, { useEffect, useState, Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { SphereEnv } from "../SphereEnv";
import { MiniMap } from "./MiniMap";
import { Targets } from "./TargetsLvl2";
import { AnimatedSpaceship } from "./Lvl2SpaceShip";
import SolarSystem from "../solarSystem/SolarSystem";
import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file
import { Howl, Howler } from "howler"; // Import Howler
import commander from "/assets/audio/Commander_voice_level_2.mp3"; // Replace with the path to your background music file
import { Bridge } from "./bridge";
import { BlackHole, extGameOverBlackHole } from "./blackhole";
import { Stats } from "@react-three/drei";
import { planePosition } from "./Lvl2SpaceShip";
import { extGameOverEarth } from "../solarSystem/Earth";
import { extGameOverMars } from "../solarSystem/Mars";
import { extGameOverSun } from "../solarSystem/Sun";
import { extGameOverMercury } from "../solarSystem/Mercury";
import { extGameOverVenus } from "../solarSystem/Venus";
import { extGameOverJupiter } from "../solarSystem/Jupiter";
import { extGameOverSaturn } from "../solarSystem/Saturn";
import { extGameOverUranus } from "../solarSystem/Uranus";
import { extGameOverNeptune } from "../solarSystem/Neptune";
import { extGameOverStargate } from "./Stargate";
import { useFrame } from "@react-three/fiber";
import { ShipExplosion } from "../shipExplosion";
import { displayGamePause, hideGamePause } from "../Completion"; // For Game Pause


export let externalShowSubtitles = false;
export let masterGameOverLvl2 = false;

// Game pause styling
let escKeytoggle = false;
const loadingBarContainerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const loadingBarStyle = {
  background: "white",
  width: "500px",
  height: "30px",
  borderRadius: "50px",
  border: "1px solid white",
  boxShadow: "0 0 10px white",
};

const textStyle = {
  color: "white",
  marginTop: "10px", // Add some top margin
  fontSize: "30px",
  textAlign: "center", // Center the text horizontally
};

// Custom loader implementation
function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html>
      <div style={loadingBarContainerStyle}>
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
    </Html>
  );
}

// Custom hook to detect the "Esc" key press to pause
function useEscKeyPress() {

  function upHandler({ key }) {
    if (key.toLowerCase() === "escape") {

      if(!escKeytoggle){
        escKeytoggle = true
        displayGamePause(2);
      }
      else{
        escKeytoggle = false;
        hideGamePause();
      }
    }
  }

  useEffect(() => {
    // window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      // window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);


   return;
}

// Encapsulates OOP concepts for lvl2
function App() {
  // Use state to set the external game over state
  const [gameOver, setGameOver] = useState(false);

  // Use state to set the plane position
  const [planePos, setPlanePos] = useState(planePosition);

  // Detect the "ESC" key press
  useEscKeyPress();

  // Use frame to update the game over state
  useFrame(() => {
    if (
      extGameOverEarth ||
      extGameOverMars ||
      extGameOverSun ||
      extGameOverMercury ||
      extGameOverVenus ||
      extGameOverJupiter ||
      extGameOverSaturn ||
      extGameOverUranus ||
      extGameOverNeptune ||
      extGameOverBlackHole ||
      extGameOverStargate
    ) {
      setGameOver(true);
      masterGameOverLvl2 = true;
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
      <OrbitControls target={[0, 0, 160]} />
      <ambientLight intensity={0.3} />
      <Targets />

      {/* If game over, show ship explosion */}
      {gameOver && <ShipExplosion position={planePos} />}

      {/* If not game over, show animated ship */}
      {!gameOver && <AnimatedSpaceship />}

      <SolarSystem />
      <MiniMap />
      <Bridge
        position={[1, 1, 120]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
      <BlackHole
        position={[0, 2, 42.5]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
      <BlackHole
        position={[2, 3, 80]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
      <BlackHole
        position={[3, 2, 65]}
        rotation={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
    </Suspense>
  );
}

export default App;
