const { remote } = require('electron');
const { Menu, MenuItem } = remote;

window.addEventListener('DOMContentLoaded', () => {
  const mainWin = remote.getCurrentWindow();
  const oAddMenu = document.getElementById('J-add-menu');
  const oMenuCon = document.getElementById('J-menu-con');
  const oAddItem = document.getElementById('J-add-item');

  let subMenu = new Menu();

  // 生成自定义菜单
  oAddMenu.addEventListener('click', () => {
    const menuFile = new MenuItem({
      label: '文件',
      type: 'normal'
    });
    const menuEdit = new MenuItem({
      label: '编辑',
      type: 'normal'
    });
    const customMenu = new MenuItem({
      label: '自定义菜单项',
      submenu: subMenu
    });

    const menu = new Menu();
    
    menu.append(menuFile);
    menu.append(menuEdit);
    menu.append(customMenu);

    Menu.setApplicationMenu(menu);
  });

  // 动态添加菜单项
  oAddItem.addEventListener('click', () => {
    const content = oMenuCon.value.trim();

    if (content) {
      subMenu.append(new MenuItem({
        label: content,
        type: 'normal'
      }));
      oMenuCon.value = '';
    }
  });
});