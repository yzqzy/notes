import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import './peer-puppet';

import './App.css';

function App() {
  const [ remoteCode, setRemoteCode ] = useState('');
  const [ localCode, setLocalCode ] = useState('');
  const [ controlText, setControlText ] = useState('');

  const login = async () => {
    const code = await ipcRenderer.invoke('login');

    console.log('change', code);

    setLocalCode(code);
  }

  useEffect(() => {
    login();

    ipcRenderer.on('control-state-change', handleConrolState);

    return () => {
      ipcRenderer.removeListener('control-state-change', handleConrolState);
    }
  }, []);

  const startControl = (remoteCode) => {
    ipcRenderer.send('control', remoteCode);
  }
  
  const handleConrolState = (e, name, type) => {
    let text = '';

    switch (type) {
      case 1:
        text = `正在远程控制${ name }`;
        break;
      case 2:
        text = `被${ name }控制中`;
        break;
      default:
        break;
    }

    setControlText(text);
  }

  return (
    <div className="App">
      {
        controlText === '' 
          ? 
            <>
              <div>你的控制码 { localCode }</div>
              <input
                type="text"
                value={ remoteCode }
                onChange={ e => setRemoteCode(e.target.value) }
              ></input>
              <button
                onClick={ () => startControl(remoteCode)}
              >
                确认
              </button>
            </>
          : 
            <div>{ controlText }</div>
      }
    </div>
  );
}

export default App;
