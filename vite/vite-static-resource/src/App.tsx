import {　useEffect　} from 'react';
import './App.css'

// 1. 方式一：导入图片
import iconLogo from '@/assets/imgs/vite.png';

function App() {
  // 2. 方式二：动态加载图片
  useEffect(() => {
    const img = document.getElementById('logo') as HTMLImageElement;
    img.src = iconLogo;
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={iconLogo} className="App-logo" alt="logo" />
        <img id='logo' alt="logo" />
      </header>
    </div>
  )
}

export default App
