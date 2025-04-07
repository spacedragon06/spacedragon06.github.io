let gamepad;

function mainloop(buttonIndex) {
  try {
    gamepad = navigator.getGamepads()[0];

    if (gamepad.buttons[15].pressed || gamepad.axes[1] > 0.3) {
      buttonIndex++;
      if (buttonIndex >= 5) {
        buttonIndex = (buttonIndex % 5) + 1;
      }
    }
    if (gamepad.buttons[14].pressed || gamepad.axes[1] < -0.3) {
      buttonIndex--;
      if (buttonIndex == 0) {
        buttonIndex = buttonIndex + 4;
      }
    }
    if (gamepad.axes[6] > 0 || gamepad.axes[7] > 0) {
      document.getElementById("grass").click();
    }
    if (gamepad.buttons[3].pressed) {
      document.getElementById("settings-anchor").click();
    }
    if (gamepad.buttons[0].pressed) {
      document.body.childNodes[buttonIndex].click();
    }
    document.getElementById("shop").childNodes[buttonIndex].focus({
      focusVisible: true,
    });
  } catch (error) {
    console.log("no gamepad found");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  console.log("gamepad.js loaded");
  buttonIndex = 1;
  setInterval(mainloop(buttonIndex), 167);
});

window.addEventListener("gamepadconnected", function () {
  gamepad = navigator.getGamepads()[0];
});
