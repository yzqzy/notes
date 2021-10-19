const { shell, ipcRenderer } = require('electron');
const path = require('path');

window.addEventListener('DOMContentLoaded', () => {
  const oBtn1 = document.getElementById('J-open-url');
  const oBtn2 = document.getElementById('J-open-folder');
  const oIframe = document.getElementById('J-webview');

  oBtn1.addEventListener('click', (ev) => {
    ev.preventDefault();

    const urlPath = oBtn1.getAttribute('href');

    shell.openExternal(urlPath);
  });

  oBtn2.addEventListener('click', () => {
    shell.showItemInFolder(path.resolve(__dirname));
  });

  ipcRenderer.on('openUrl', () => {
    oIframe.src = "https://yueluo.club/about"
  });
});
