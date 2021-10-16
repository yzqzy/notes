const { desktopCapturer, ipcRenderer } = require('electron');

/**
 * @description 获取屏幕视频流
 * @returns {void}
 */
 async function getScreenStream () {
  const sources = await desktopCapturer.getSources({ types: ['screen'] });
  const { width, height } = window.screen;

  return new Promise((resolve, reject) => {
    navigator.webkitGetUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sources[0].id,
          maxWidth: width,
          maxHeight: height
        }
      }
    }, (stream) => {
      resolve(stream);
    }, (err) => {
      console.log('get media failed：', err);
    });
  });
}

const pc = new window.RTCPeerConnection({});

pc.onicecandidate = function (e) {
  console.log('puppet candidate', e.candidate);

  if (e.candidate) {
    ipcRenderer.send('forward', 'puppet-candidate', e.candidate);
  }
}

ipcRenderer.on('candidate', (e, candidate) => {
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

ipcRenderer.on('offer', async (e, offer) => {
  const answer = await createAnswer(offer);

  ipcRenderer.send('forward', 'answer', { type: answer.type, sdp: answer.sdp });
});

async function createAnswer (offer) {
  const screenStream = await getScreenStream();

  pc.addTrack(screenStream.getTracks()[0], screenStream);

  await pc.setRemoteDescription(offer);
  await pc.setLocalDescription(await pc.createAnswer());

  console.log(`create answer`, JSON.stringify(pc.localDescription));

  return pc.localDescription;
}