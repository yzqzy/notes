const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const mainWin = remote.getCurrentWindow();
  const oBtn = document.getElementById('J-btn');

  oBtn.addEventListener('click', () => {
    let subWin = new remote.BrowserWindow({
      parent: mainWin,
      modal: true,
      width: 200,
      height: 200
    });

    subWin.loadFile('sub.html');

    subWin.on('close', () => {
      subWin = null;
    })
  })
});