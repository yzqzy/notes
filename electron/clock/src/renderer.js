const { ipcRenderer } = require('electron');
const Timer = require('timer.js');

function startWork () {
  const workTimer = new Timer({
    ontick: updateTime,
    onend: notification
  });

  workTimer.start(10);
}

function updateTime (ms) {
  const timerContainer = document.getElementById('J-timer');

  let s = (ms / 1000).toFixed(0);
  let ss = s % 60;
  let mm = (s / 60).toFixed(0);

  timerContainer.innerText = `${ mm.toString().padStart(2, 0) } : ${ ss.toString().padStart(2, 0) }`;
}

async function notification () {
  const res = await ipcRenderer.invoke('work-notification')

  switch (res) {
    case 'rest':
      setTimeout(() => {
        alert('休息');
      }, 5 * 1000)
      break;
    case 'work':
      startWork();
      break;
  }
}

startWork();