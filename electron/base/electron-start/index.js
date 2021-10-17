const { remote } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  let mainWin = remote.getCurrentWindow();

  let oWinTool = document.getElementsByClassName('windowTool')[0];
  let oCloseBtn = oWinTool.getElementsByClassName('close')[0],
      oMaxsizeBtn = oWinTool.getElementsByClassName('maxsize')[0],
      oMinsizeBtn = oWinTool.getElementsByClassName('minisize')[0];

  oCloseBtn.addEventListener('click', () => {
    mainWin.close();
  });
  oMaxsizeBtn.addEventListener('click', () => {
    if (!mainWin.isMaximized()) {
      mainWin.maximize();
    } else {
      mainWin.restore();
    }
  });
  oMinsizeBtn.addEventListener('click', () => {
    if (!mainWin.isMinimized()) {
      mainWin.minimize();
    } else {
      mainWin.restore();
    }
  });
});