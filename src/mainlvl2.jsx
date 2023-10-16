import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Lvl2 from "./Lvl2/Lvl2.jsx";
import { Canvas } from "@react-three/fiber";
import "./lvlstyle.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas shadows>
    <color attach="background" args={["black"]} />
    <Suspense fallback={null}>
      <Lvl2 />
    </Suspense>
  </Canvas>
);
