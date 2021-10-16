const EventEmitter = require('events');
const { ipcRenderer } = require('electron');

const peer = new EventEmitter();

// peer.on('robot', (type, data) => {
//   switch (type) {
//     case 'mouse':
//       const { width, height } = window.screen;

//       data.screen = { width, height };
//       ipcRenderer.send('robot', type, data);
//       break;
//     case 'key':
//       ipcRenderer.send('robot', type, data);
//       break;
//     default:
//       break;
//   }
// });

const pc = new window.RTCPeerConnection({});

pc.onicecandidate = function (e) {
  console.log('control candidate', e.candidate);

  if (e.candidate) {
    ipcRenderer.send('forward', 'control-candidate', e.candidate);
  }
}

ipcRenderer.on('condidate', (e, candidate) => {
  addIceCandidate(candidate);
});

let condidates = [];

async function addIceCandidate (candidate) {
  candidate && condidates.push(candidate);

  if (pc.remoteDescription && pc.remoteDescription.type) {
    for (let i = 0; i < condidates.length; i++) {
      await pc.addIceCandidate(new RTCIceCandidate(condidates[i]));
    }
    condidates = [];
  }
}

async function createOffer () {
  const offer = await pc.createOffer({
    offerToReceiveAudio: false,
    offerToReceiveVideo: true
  });

  await pc.setLocalDescription(offer);

  console.log(`pc offer`, JSON.stringify(offer));

  return pc.localDescription;
}

createOffer().then((offer) => {
  ipcRenderer.send('forward', 'offer', { type: offer.type, sdp: offer.sdp });
});

async function setRemote (answer) {
  await pc.setRemoteDescription(answer);
}

ipcRenderer.on('answer', (e, answser) => {
  setRemote(answser);
});

pc.ontrack = function (e) {
  peer.emit('add-stream', e.streams[0]);
}

module.exports = peer;