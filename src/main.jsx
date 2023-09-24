import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";

const rootContainer = document.getElementById("root");

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <Canvas shadows>
      <color attach="background" args={["black"]} />
      <Suspense fallback={null}>
        {/* <Lvl3 /> */}
        <App></App>
      </Suspense>
    </Canvas>
  );
} else {
  console.error("Root container element not found.");
}
