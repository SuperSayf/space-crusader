import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Lvl1 from "./Lvl1/Lvl1.jsx";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Loader } from "@react-three/drei";

const rootContainer = document.getElementById("root");
//Level Parameter
const urlParams = new URLSearchParams(window.location.search);
const selectedLevel = urlParams.get("level");

//Dynamic Level selection Logic
let LevelComponent;
if (selectedLevel === "lvl1") {
  LevelComponent = Lvl1;
} else if (selectedLevel === "lvl2") {
  LevelComponent = Lvl2;
} else if (selectedLevel === "lvl3") {
  LevelComponent = Lvl3;
} else {
  LevelComponent = Lvl1; // Default to Lvl1 if no valid level is provided
}


if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <>
      <Canvas shadows>
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          {/* <Lvl3 /> */}
          <LevelComponent/>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
} else {
  console.error("Root container element not found.");
}
