import {　useEffect　} from 'react';
import './App.css'

// 使用 SVG
import { ReactComponent as ReactLogo } from '@assets/icon/logo-1.svg';

// 1. 方式一：导入图片
import logo from '@assets/imgs/vite.png';

import Worker from './works/example.js?worker';

// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
  console.log(e);
});


import init from './fib.wasm';

type FibFunc = (num: number) => number;

init({}).then((exports) => {
  const fibFunc = exports.fib as FibFunc;
  console.log('Fib result:', fibFunc(10));
});

function App() {
  // 2. 方式二：动态加载图片
  // useEffect(() => {
  //   const img = document.getElementById('logo') as HTMLImageElement;
  //   img.src = logo;
  // }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <img id='logo' alt="logo" />
      </header> */}
      <ReactLogo width={400} height={400} />
    </div>
  )
}

export default App
