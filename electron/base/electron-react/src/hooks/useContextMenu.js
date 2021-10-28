import { useEffect, useRef } from "react";

const { remote } = window.require('electron');
const { Menu } = remote;

function useContextMenu (contextMenuTemplate, areaClass) {
  const currentElement = useRef();
  
  useEffect(() => {
    const areaElement = document.querySelector(areaClass);

    const menu = Menu.buildFromTemplate(contextMenuTemplate);

    const contextMenuClick = (ev) => {
      if (areaElement && areaElement.contains(ev.target)) {
        currentElement.current = ev.target;
  
        menu.popup({ window: remote.getCurrentWindow });
      }
    }

    window.addEventListener('contextmenu', contextMenuClick);

    return () => {
      window.removeEventListener('contextmenu', contextMenuClick);
    }
  });

  return currentElement;
}

export default useContextMenu;