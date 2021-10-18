const { remote } = require('electron');
const { Menu, MenuItem } = remote;

const contextMenuItems = [
  { label: 'Run Code' },
  { label: '转到定义' },
  { type: 'separator' },
  {
    label: '其他',
    click () {
      console.log('clicked.');
    }
  },
]

window.addEventListener('DOMContentLoaded', () => {
  const menu = Menu.buildFromTemplate(contextMenuItems);

  window.addEventListener('contextmenu', ev => {
    ev.preventDefault();

    menu.popup({
      window: remote.getCurrentWindow()
    });
  });
});