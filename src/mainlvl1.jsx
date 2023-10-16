import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Lvl1 from "./Lvl1/Lvl1.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="container">
    <div className="video-background">
      <video
        playsInline="playsInline"
        autoPlay="autoplay"
        muted="muted"
        loop="loop"
      >
        <source src="../assets/audio/astronautplaying.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <Canvas className="full-screen-canvas" shadows>
      <Suspense fallback={null}>
        <Lvl1 />
      </Suspense>
    </Canvas>
  </div>
);
