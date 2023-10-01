import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Lvl1 from "./Lvl1/Lvl1.jsx";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import { Loader } from "@react-three/drei";

const rootContainer = document.getElementById("root");

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <>
      <Canvas shadows>
        <color attach="background" args={["black"]} />
        <Suspense fallback={null}>
          <Lvl3 />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
} else {
  console.error("Root container element not found.");
}
