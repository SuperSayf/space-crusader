import { Howl } from "howler";
import soundEffect from "/assets/audio/boost.mp3";

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};

// Add a flag to track if the sound has been played
let soundPlayed = false;

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;

  if (e.key.toLowerCase() === "shift" && !soundPlayed) {
    // Create a Howl instance with the desired volume (e.g., 0.2 for softer)
    const sound = new Howl({
      src: [soundEffect],
      volume: 0.2, // Adjust the volume here (0.2 means 20% of the original volume)
    });
    sound.play();
    soundPlayed = true;
  }
});

window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;

  if (e.key.toLowerCase() === "shift") {
    // Reset the soundPlayed flag when the Shift key is released
    soundPlayed = false;
  }
});

let maxVelocity = 0.04;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.006;
export let turbo = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity)
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  if (controls["a"]) {
    jawVelocity += 0.0025;
  }

  if (controls["d"]) {
    jawVelocity -= 0.0025;
  }

  if (controls["w"]) {
    pitchVelocity -= 0.0025;
  }

  if (controls["s"]) {
    pitchVelocity += 0.0025;
  }

  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  // plane position & velocity
  if (controls.shift) {
    // Trigger the sound effect when Shift key is pressed
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}
