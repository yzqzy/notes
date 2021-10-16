const peer = require('./peer-control');

peer.on('add-stream', stream => {
  console.log('add-stream', stream);
  play(stream);
});

const video = document.getElementById('J-screenVideo');

function play (stream) {
  video.srcObject = stream;
  video.onloadedmetadata = function () {
    video.play();
  }
}

window.onkeydown = function (e) {
  // { keyCode, meta, alt, ctrl, shift }
  const data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    control: e.ctrlKey,
    alt: e.altKey
  };

  peer.emit('robot', 'key', data);
}

window.onmouseup = function (e) {
  // { clientX, clientY, screen: { width, height }, video: { width, height } }
  const { width, height } = video.getBoundingClientRect();

  const data = {
    clientX: e.clientX,
    clientY: e.clientY,
    video: {
      width,
      height
    }
  }

  peer.emit('robot', 'mouse', data);
}