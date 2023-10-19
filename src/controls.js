import { Howl } from "howler";
import soundEffect from "/assets/audio/boost.mp3";

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};

// Add a flag to track if the sound has been played
let soundPlayed = false;

// Define the cheat code sequence
const cheatCodeSequence = ["r", "i", "c", "k"];
let currentCodeIndex = 0;

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;

  // Check for the cheat code sequence
  if (e.key.toLowerCase() === cheatCodeSequence[currentCodeIndex]) {
    currentCodeIndex++;

    if (currentCodeIndex === cheatCodeSequence.length) {
      // Cheat code has been successfully entered
      executeCheatCodeAction();
      currentCodeIndex = 0; // Reset the code index
    }
  } else {
    currentCodeIndex = 0; // Reset if a wrong key is pressed
  }

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

// Define gamepad state
const gamepadState = {
  leftStickX: 0,
  leftStickY: 0,
  rightStickX: 0,
  rightStickY: 0,
  R2: false, // To track the R2 button state
  X: false, // To track the X button state
};

// Handle gamepad input
function handleGamepadInput() {
  const gamepads = navigator.getGamepads();
  if (gamepads.length > 0) {
    const gamepad = gamepads[0]; // You may need to adjust this index based on the connected gamepad

    // Check if the gamepad object is not null before accessing its properties
    if (gamepad) {
      // Read left stick input for ship movement
      const leftStickX = gamepad.axes[0];
      const leftStickY = gamepad.axes[1];

      // Read right stick input for additional ship control
      const rightStickX = gamepad.axes[2];
      const rightStickY = gamepad.axes[3];

      // Calculate the average of left and right stick input
      gamepadState.leftStickX = (leftStickX + rightStickX) / 2;
      gamepadState.leftStickY = (leftStickY + rightStickY) / 2;

      // Check R2 button
      gamepadState.R2 = gamepad.buttons[7].pressed; // You may need to adjust the button index

      // Check X button
      gamepadState.X = gamepad.buttons[2].pressed; // You may need to adjust the button index

      // You can add more logic here to handle other gamepad buttons for actions
    }
  }
}

function simulateKeyboardEvent(key, type) {
  const event = new KeyboardEvent(type, {
    key: key,
  });
  window.dispatchEvent(event);
}

let isR2Pressed = false;

function updateShiftKeyState() {
  if (gamepadState.R2) {
    if (!isR2Pressed) {
      isR2Pressed = true;
      simulateKeyboardEvent("Shift", "keydown");
    }
  } else {
    if (isR2Pressed) {
      isR2Pressed = false;
      simulateKeyboardEvent("Shift", "keyup");
    }
  }
}

let isXPressed = false;
let isXPressedPrev = false;

function updateXKeyState() {
  if (gamepadState.X) {
    isXPressed = true;
  } else {
    isXPressed = false;
  }

  if (isXPressed && !isXPressedPrev) {
    simulateKeyboardEvent("p", "keydown");
  }

  if (!isXPressed && isXPressedPrev) {
    simulateKeyboardEvent("p", "keyup");
  }

  isXPressedPrev = isXPressed; // Update the previous state
}

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  handleGamepadInput(); // Update gamepad input

  jawVelocity *= 0.95;
  pitchVelocity *= 0.95;

  if (Math.abs(jawVelocity) > maxVelocity)
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  // Use gamepad input for ship movement
  jawVelocity += gamepadState.leftStickX * 0.0025;
  pitchVelocity -= gamepadState.leftStickY * 0.0025;

  // Use right stick input for additional ship control
  jawVelocity += gamepadState.rightStickX * 0.0025;
  pitchVelocity -= gamepadState.rightStickY * 0.0025;

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

  updateXKeyState();

  updateShiftKeyState();

  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}

// Define the action to be executed when the cheat code is entered
function executeCheatCodeAction() {
  // Go to a page with a Rick Astley video
  window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

// Check for gamepad support
window.addEventListener("gamepadconnected", (event) => {
  const gamepad = event.gamepad;
  console.log(`Gamepad connected: ${gamepad.id}`);
  // Add your gamepad input handling logic here
});

// Check for gamepad disconnection
window.addEventListener("gamepaddisconnected", (event) => {
  const gamepad = event.gamepad;
  console.log(`Gamepad disconnected: ${gamepad.id}`);
  // Add your gamepad disconnection handling logic here
});
