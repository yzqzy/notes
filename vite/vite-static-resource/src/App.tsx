import {　useEffect　} from 'react';
import './App.css'

// 使用 SVG
// import { ReactComponent as ReactLogo } from '@assets/icon/logo-1.svg';

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
import SvgIcon from './components/SvgIcon';

// type FibFunc = (num: number) => number;

// init({}).then((exports) => {
//   const fibFunc = exports.fib as FibFunc;
//   console.log('Fib result:', fibFunc(10));
// });

// // const icons = import.meta.glob('./assets/icon/logo-*.svg');
// const icons = import.meta.globEager('./assets/icon/logo-*.svg');
// const urls = Object.values(icons).map(mod => mod.default);

// const icons = import.meta.globEager('./assets/icon/logo-*.svg');
// const urls = Object.values(icons).map(mod => {
//   const fileName = mod.default.split('/').pop();
//   const [svgName] = fileName.split('.');
//   return svgName;
// });

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
      {/* <img src={new URL('./logo.png', import.meta.env.VITE_IMG_BASE_URL).href} /> */}
      {/* <ReactLogo width={400} height={400} /> */}
      {/* {
        urls.map((item) => (
          <img src={item} key={item} width="50" alt="" />
        ))
      } */}
      {/* {
        urls.map((item) => (
          <SvgIcon name={item} key={item} width="50" height="50" />
        ))
      } */}
      <SvgIcon name='logo-1' width="50" height="50"  />
      <SvgIcon name='logo-2' width="50" height="50"  />
      <SvgIcon name='logo-3' width="50" height="50"  />
      <SvgIcon name='logo-4' width="50" height="50"  />
      <SvgIcon name='logo-5' width="50" height="50"  />
      <SvgIcon name='logo-6' width="50" height="50"  />
    </div>
  )
}

export default App
