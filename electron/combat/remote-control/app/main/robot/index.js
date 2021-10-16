const { ipcMain } = require('electron');
const robot = require('robotjs');
const vkey = require('vkey');

function handleMouse (data) {
  // data { clientX, clientY, screen: { width, height }, video: { width, height } }
  const { clientX, clientY, screen, video } = data;

  const x = clientX * screen.width / video.width;
  const y = clientY * screen.height / video.height;

  robot.moveMouse(x, y);
  robot.mouseClick();
}

function handleKey (data) {
  // data { keyCode, meta, alt, ctrl, shift }
  const modifiers = [];

  if (data.meta) modifiers.push('meta');
  if (data.shift) modifiers.push('shift');
  if (data.alt) modifiers.push('alt');
  if (data.ctrl) modifiers.push('ctrl');
  
  const key = vkey[data.keyCode].toLowerCase();

  if (key[0] !== '<') {
    robot.keyTap(key, modifiers);
  }
}

module.exports = function () {
  ipcMain.on('robot', (e, type, data) => {
    switch (type) {
      case 'mouse':
        handleMouse(data);
        break;
      case 'key':
        handleKey(data);
        break;
      default:
        break;
    }
  });
}