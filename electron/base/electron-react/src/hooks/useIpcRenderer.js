import { useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

function useIpcRenderer (actionMap) {
  useEffect(() => {
    Object.keys(actionMap).forEach((action) => {
      ipcRenderer.on(action, actionMap[action]);
    });

    return () => {
      Object.keys(actionMap).forEach((action) => {
        ipcRenderer.removeListener(action, actionMap[action]);
      });
    }
  });
}

export default useIpcRenderer;