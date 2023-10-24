import React, { useEffect, useState, Suspense } from "react";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { SphereEnv } from "../SphereEnv";
import { MiniMap } from "./MiniMap";
import { Targets } from "./Targets";
import { Asteroid } from "./Asteroid";
import { AnimatedSpaceship, planePosition } from "./Lvl1Spaceship";
import { ShipExplosion } from "../shipExplosion";
import { externalGameOverAsteroid } from "./Asteroid";
import { externalGameOverTargets } from "./Targets";
import { externalGameOverSun } from "./Sun";
import { useFrame } from "@react-three/fiber";
import { Html, useProgress, Stats } from "@react-three/drei";
import { displayGamePause, hideGamePause } from "../Completion"; // For Game Pause
import { Sun } from "./Sun";

import soundEffect from "/assets/audio/background.mp3"; // Replace with the path to your background music file
import { Howl, Howler } from "howler"; // Import Howler
import commander from "/assets/audio/Commander_voice_level_1.mp3"; // Replace with the path to your background music file

export let masterGameOverLvl1 = false;
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


// Custom hook to detect the "Esc" key press to pause or hide pause
function useEscKeyPress() {
  function upHandler({ key }) {
    if (key.toLowerCase() === "escape") {
      //esc not pressed
      if(!escKeytoggle){
        escKeytoggle = true
        displayGamePause(1); //Pass in current level parameter
      }
      //esc pressed
      else{
        escKeytoggle = false;
        hideGamePause();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, []);


  return ;
}

function App() {
  // Use state to set the external game over state
  const [gameOver, setGameOver] = useState(false);

  // Use state to set the plane position
  const [planePos, setPlanePos] = useState(planePosition);

  // Detect the "ESC" key press
  useEscKeyPress();

  // Use frame to update the game over state
  useFrame(() => {
    if (externalGameOverAsteroid || externalGameOverTargets || externalGameOverSun) {
      setGameOver(true);

      if (!externalGameOverTargets) {
        masterGameOverLvl1 = true;
      }
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

    // Clean up the audio and event listener when the component unmounts
    return () => {
      backgroundMusic.stop();
      secondAudio.stop();
      secondAudio.off("end"); // Remove the event listener to prevent memory leaks
    };
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Stats />
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
        <Sun />
        <Targets />
        <Asteroid />

        {/* MiniMap with top-down OrthographicCamera */}
        <MiniMap />
      </Suspense>
    </>
  );
}

export default App;
