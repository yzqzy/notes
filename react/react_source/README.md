# React 源码

## 搭建 React 源码本地调试环境

使用 create-react-app 脚手架创建项目

```js
npx create-react-app react-source-test
```

弹射 create-react-app 脚手架内部配置

```js
npm run eject
```

克隆 react 官方原理（项目根目录下克隆）

```js
git clone --branch v16.13.1 --depth=1 https://github.com/facebook/react.git src/react
```

链接本地源码

```js
// config/webpack.config.js

resolve: {
  // This allows you to set a fallback for where webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  // https://github.com/facebook/create-react-app/issues/253
  modules: ['node_modules', paths.appNodeModules].concat(
    modules.additionalModulePaths || []
  ),
  // These are the reasonable defaults supported by the Node ecosystem.
  // We also include JSX as a common component filename extension to support
  // some tools, although we do not recommend using it, see:
  // https://github.com/facebook/create-react-app/issues/290
  // `web` extension prefixes have been added for better support
  // for React Native Web.
  extensions: paths.moduleFileExtensions
    .map(ext => `.${ext}`)
    .filter(ext => useTypeScript || !ext.includes('ts')),
  // alias: {
  //   // Support React Native Web
  //   // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  //   'react-native': 'react-native-web',
  //   // Allows for better profiling with ReactDevTools
  //   ...(isEnvProductionProfile && {
  //     'react-dom$': 'react-dom/profiling',
  //     'scheduler/tracing': 'scheduler/tracing-profiling',
  //   }),
  //   ...(modules.webpackAliases || {}),
  // },
  alias: {
    'react-native': 'react-native-web',
    react: path.resolve(__dirname, '../src/react/packages/react'),
    'react-dom': path.resolve(__dirname, '../src/react/packages/react-dom'),
    'shared': path.resolve(__dirname, '../src/react/packages/shared'),
    'react-reconciler': path.resolve(__dirname, '../src/react/packages/react-reconciler'),
    'legacy-events': path.resolve(__dirname, '../src/react/packages/legacy-events')
  },
  plugins: [
    // Adds support for installing with Plug'n'Play, leading to faster installs and adding
    // guards against forgotten dependencies and such.
    PnpWebpackPlugin,
    // Prevents users from importing files from outside of src/ (or node_modules/).
    // This often causes confusion because we only process files within src/ with babel.
    // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
    // please link the files into your node_modules/ and let module-resolution kick in.
    // Make sure your source files are compiled, as they will not be processed in any way.
    new ModuleScopePlugin(paths.appSrc, [
      paths.appPackageJson,
      reactRefreshOverlayEntry,
    ]),
  ],
},
```

修改环境变量

```js
// config/env.js

// const stringified = {
//   'process.env': Object.keys(raw).reduce((env, key) => {
//     env[key] = JSON.stringify(raw[key]);
//     return env;
//   }, {}),
// };
const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
  __DEV__: true,
  SharedArrayBuffer: true,
  spyOnDev: true,
  spyOnDevAndProd: true,
  spyOnProd: true,
  __PROFILE__: true,
  __UMD_: true,
  __EXPERIMENTRL_: true,
  __VARIANT__: true,
  gate: true,
  trustedTypes: true    
}
```

配置 babel 转换代码时忽略类型检查

```js
npm install @babel/plugin-transform-flow-strip-types -D
```

```js
// config/webpack.config.js	[babel-loader]
plugins: [
  require.resolve('@babel/plugin-transform-flow-strip-types'),
]{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    customize: require.resolve(
      'babel-preset-react-app/webpack-overrides'
    ),
    presets: [
      [
        require.resolve('babel-preset-react-app'),
        {
          runtime: hasJsxRuntime ? 'automatic' : 'classic',
        },
      ],
    ],
    
    plugins: [
      require.resolve('@babel/plugin-transform-flow-strip-types'),
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent:
                '@svgr/webpack?-svgo,+titleProp,+ref![path]',
            },
          },
        },
      ],
      isEnvDevelopment &&
        shouldUseReactRefresh &&
        require.resolve('react-refresh/babel'),
    ].filter(Boolean),
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,
    compact: isEnvProduction,
  },
},
```

导出 HostConfig

```js
// react/packages/react-reconciler/src/ReactFiberHostConfig.js

import invariant from 'shared/invariant';

export * from './forks/ReactFiberHostConfig.dom';
// We expect that our Rollup, Jest, and Flow configurations
// always shim this module with the corresponding host config
// (either provided by a renderer, or a generic shim for npm).
//
// We should never resolve to this file, but it exists to make
// sure that if we *do* accidentally break the configuration,
// the failure isn't silent.

// invariant(false, 'This module must be shimmed by a specific renderer.');
```

修改 ReactSharedInternals.js

```js
// react/packages/shared/ReactSharedInternals.js

// import * as React from 'react';

// const ReactSharedInternals =
//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

import ReactSharedInternals from '../react/src/ReactSharedInternals';
```

关闭 eslint 扩展

```js
// react/.eslintrc.js	[module.exports]
// 删除 extends

module.exports = {
  // extends: ['fbjs', 'prettier'],
}
```

禁止 invariant 报错

```js
// react/packages/shared/invariant.js

export default function invariant(condition, format, a, b, c, d, e, f) {
  if (condition) return;
  throw new Error(
    'Internal React error: invariant() is meant to be replaced at compile ' +
      'time. There is no runtime version.',
  );
}
```

eslint 配置

> react 源码文件夹新建 .eslintrc.json 并添加如下配置

```js
{
  "extends": "react-app",
  "globals": {
    "SharedArrayBuffer": true,
    "spyOnDev": true,
    "spyOnDevAndProd": true,
    "spyOnProd": true,
    "__PROFILE__": true,
    "__UMD__": true,
    "__EXPERIMENTAL__": true,
    "__VARIANT__": true,
    "gate": true,
    "trustedTypes": true
  }
}
```

修改 react react-dom 引入方式

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

```js
// src/index.js

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
```

```js
// src/App.js

import * as React from 'react';
import logo from './logo.svg';
import './App.css';
```

解决 vscode 中 flow 报错

```js
"javascript.validate.enable": false
```

`__DEV__`  报错

删除 node_modules 文件夹，执行 npm install 

## JSX 转换 ReactElement 过程解析

