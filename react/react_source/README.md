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
  modules: ["node_modules", paths.appNodeModules].concat(
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
    .filter(ext => useTypeScript || !ext.includes("ts")),
  alias: {
    "react-native": "react-native-web",
    react: path.resolve(__dirname, "../src/react/packages/react"),
    "react-dom": path.resolve(__dirname, "../src/react/packages/react-dom"),
    shared: path.resolve(__dirname, "../src/react/packages/shared"),
    "react-reconciler": path.resolve(
      __dirname,
      "../src/react/packages/react-reconciler"
    ),
    "legacy-events": path.resolve(
      __dirname,
      "../src/react/packages/legacy-events"
    )
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
    new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
  ]
}, // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
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
  "process.env": Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {}),
  __DEV__: true,
  SharedArrayBuffer: true,
  spyOnDev: true,
  spyOnDevAndProd: true,
  spyOnProd: true,
  __PROFILE__: true,
  __UMD__: true,
  __EXPERIMENTAL__: true,
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

{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve("babel-loader"),
  options: {
    customize: require.resolve(
      "babel-preset-react-app/webpack-overrides"
    ),
    plugins: [
      require.resolve("@babel/plugin-transform-flow-strip-types"),
      [
        require.resolve("babel-plugin-named-asset-import"),
        {
          loaderMap: {
            svg: {
              ReactComponent:
                "@svgr/webpack?-svgo,+titleProp,+ref![path]"
            }
          }
        }
      ]
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
    // See #6846 for context on why cacheCompression is disabled
    cacheCompression: false,
    compact: isEnvProduction
  }
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

import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
```

```js
// src/App.js

import * as React from "react"
```

解决 vscode 中 flow 报错

```js
"javascript.validate.enable": false
```

`__DEV__`  报错

删除 node_modules 文件夹，执行 npm install 

## JSX 转换 ReactElement 过程解析

JSX 被 Babel 编译为 React.createElement 方法的调用，createElement 方法在调用后返回的就是 ReactElement，就是 Virtual DOM。

### createElement

packages/react/index.js

```js
export {
  Children,
  createRef,
  Component,
  PureComponent,
  createContext,
  forwardRef,
  lazy,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useDebugValue,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  Fragment,
  Profiler,
  StrictMode,
  Suspense,
  createElement,
  cloneElement,
  isValidElement,
  version,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  createFactory,
  useTransition,
  useDeferredValue,
  SuspenseList,
  unstable_withSuspenseConfig,
  block,
  DEPRECATED_useResponder,
  DEPRECATED_createResponder,
  unstable_createFundamental,
  unstable_createScope,
  jsx,
  jsxs,
  jsxDEV,
} from './src/React';
```

packages/react/src/React.js

```js
import {
  createElement as createElementProd,
  createFactory as createFactoryProd,
  cloneElement as cloneElementProd,
  isValidElement,
  jsx as jsxProd,
} from './ReactElement';
```

packages/react/src/ReactElement.js

```js
/**
 * 创建 React Element
 * type      元素类型
 * config    配置属性
 * children  子元素
 * 1. 分离 props 属性和特殊属性
 * 2. 将子元素挂载到 props.children 中
 * 3. 为 props 属性赋默认值 (defaultProps)
 * 4. 创建并返回 ReactElement
 */
export function createElement(type, config, children) {
  /**
   * propName -> 属性名称
   * 用于后面的 for 循环
   */
  let propName;

  /**
   * 存储 React Element 中的普通元素属性 即不包含 key ref self source
   */
  const props = {};

  /**
   * 待提取属性
   * React 内部为了实现某些功能而存在的属性
   */
  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 如果 config 不为 null
  if (config != null) {
    // 如果 config 对象中有合法的 ref 属性
    if (hasValidRef(config)) {
      // 将 config.ref 属性提取到 ref 变量中
      ref = config.ref;
      // 在开发环境中
      if (__DEV__) {
        // 如果 ref 属性的值被设置成了字符串形式就报一个提示
        // 说明此用法在将来的版本中会被删除
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }
    // 如果在 config 对象中拥有合法的 key 属性
    if (hasValidKey(config)) {
      // 将 config.key 属性中的值提取到 key 变量中
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // 遍历 config 对象
    for (propName in config) {
      // 如果当前遍历到的属性是对象自身属性
      // 并且在 RESERVED_PROPS 对象中不存在该属性
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        // 将满足条件的属性添加到 props 对象中 (普通属性)
        props[propName] = config[propName];
      }
    }
  }

  /**
   * 将第三个及之后的参数挂载到 props.children 属性中
   * 如果子元素是多个 props.children 是数组
   * 如果子元素是一个 props.children 是对象
   */

  // 由于从第三个参数开始及以后都表示子元素
  // 所以减去前两个参数的结果就是子元素的数量
  const childrenLength = arguments.length - 2;
  // 如果子元素的数量是 1
  if (childrenLength === 1) {
    // 直接将子元素挂载到到 props.children 属性上
    // 此时 children 是对象类型
    props.children = children;
    // 如果子元素的数量大于 1
  } else if (childrenLength > 1) {
    // 创建数组, 数组中元素的数量等于子元素的数量
    const childArray = Array(childrenLength);
    // 开启循环 循环次匹配子元素的数量
    for (let i = 0; i < childrenLength; i++) {
      // 将子元素添加到 childArray 数组中
      // i + 2 的原因是实参集合的前两个参数不是子元素
      childArray[i] = arguments[i + 2];
    }
    // 如果是开发环境
    if (__DEV__) {
      // 如果 Object 对象中存在 freeze 方法
      if (Object.freeze) {
        // 调用 freeze 方法 冻结 childArray 数组
        // 防止 React 核心对象被修改 冻结对象提高性能
        Object.freeze(childArray);
      }
    }
    // 将子元素数组挂载到 props.children 属性中
    props.children = childArray;
  }

  /**
   * 如果当前处理是组件
   * 看组件身上是否有 defaultProps 属性
   * 这个属性中存储的是 props 对象中属性的默认值
   * 遍历 defaultProps 对象 查看对应的 props 属性的值是否为 undefined
   * 如果为undefined 就将默认值赋值给对应的 props 属性值
   */

  // 将 type 属性值视为函数 查看其中是否具有 defaultProps 属性
  if (type && type.defaultProps) {
    // 将 type 函数下的 defaultProps 属性赋值给 defaultProps 变量
    const defaultProps = type.defaultProps;
    // 遍历 defaultProps 对象中的属性 将属性名称赋值给 propName 变量
    for (propName in defaultProps) {
      // 如果 props 对象中的该属性的值为 undefined
      if (props[propName] === undefined) {
        // 将 defaultProps 对象中的对应属性的值赋值给 props 对象中的对应属性的值
        props[propName] = defaultProps[propName];
      }
    }
  }

  /**
   * 在开发环境中 React 会检测开发者是否在组件内部
   * 通过 props 对象获取 key 属性或者 ref 属性
   * 如果开发者调用了 在控制台中报错误提示
   */

  // 如果处于开发环境
  if (__DEV__) {
    // 元素具有 key 属性或者 ref 属性
    if (key || ref) {
      // 看一下 type 属性中存储的是否是函数 如果是函数就表示当前元素是组件
      // 如果元素不是组件 就直接返回元素类型字符串
      // displayName 用于在报错过程中显示是哪一个组件报错了
      // 如果开发者显式定义了 displayName 属性 就显示开发者定义的
      // 否者就显示组件名称 如果组件也没有名称 就显示 'Unknown'
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      // 如果 key 属性存在
      if (key) {
        // 为 props 对象添加key 属性
        // 并指定当通过 props 对象获取 key 属性时报错
        defineKeyPropWarningGetter(props, displayName);
      }
      // 如果 ref 属性存在
      if (ref) {
        // 为 props 对象添加 ref 属性
        // 并指定当通过 props 对象获取 ref 属性时报错
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  // 返回 ReactElement
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    // 在 Virtual DOM 中用于识别自定义组件
    ReactCurrentOwner.current,
    props,
  );
}
```

