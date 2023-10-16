import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Lvl3 from "./Lvl3/Lvl3.jsx";
import { Canvas } from "@react-three/fiber";
import "./lvlstyle.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas shadows>
    <color attach="background" args={["black"]} />
    <Suspense fallback={null}>
      <Lvl3 />
    </Suspense>
  </Canvas>
);
