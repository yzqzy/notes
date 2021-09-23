# Fiber

## 开发环境配置

### 目录介绍

| 文件/文件夹              | 描述                    |
| ------------------------ | ----------------------- |
| src                      | 源代码                  |
| dist                     | 存储客户端打包文件      |
| build                    | 存储服务端打包文件      |
| server.js                | 服务端代码              |
| webpack.config.server.js | 服务端 webpack 配置文件 |
| webpack.config.client.js | 客户端 webpack 配置文件 |
| babel.config.js          | bable 配置文件          |

### 项目依赖

```js
npm init -y
```

```js
yarn add webpack webpack-cli webpack-node-externals @babel/core @babel/preset-env @babel/preset-react babel-core babel-loader nodemon npm-run-all -D
```

```js
yarn add express -D
```

### 服务端打包配置

.babel.cofig.js

```js
module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

server.js

```js
import express from "express";

const app = express();

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`

app.get("*", (req, res) => {
  res.send(template);
});

app.listen(4000, () => console.log('server is running.'));
```

webpack.config.server.js

```js
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  externals: [ nodeExternals() ]
}
```

package.json

```js
{
  "name": "fiber",
  "version": "1.0.0",
  "description": "",
  "main": "babel.config.js",
  "scripts": {
    "dev:serve-compile": "webpack --config webpack.config.server.js --watch",
    "dev:serve": "nodemon ./build/server.js",
    "start": "npm-run-all --parallel dev:*"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.2.2",
    "express": "^4.17.1",
    "nodemon": "^2.0.12",
    "npm-run-all": "^4.1.5",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0",
    "webpack-node-externals": "^3.0.0"
  }
}
```

执行 yarn start 就可以启动本地开发服务器。

### 客户端打包配置

src/index.js

```js
console.log('index');
```

server.js

```js
import express from "express";

const app = express();

app.use(express.static('dist'));

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="build.js"></script>
    </body>
  </html>
`

app.get("*", (req, res) => {
  res.send(template);
});

app.listen(4000, () => console.log('server is running.'));
```

webpack.config.client.js

```js
const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```

package.json

```js
{
  "name": "fiber",
  "version": "1.0.0",
  "description": "",
  "main": "babel.config.js",
  "scripts": {
    "dev:client-compile": "webpack --config webpack.config.client.js --watch",
    "dev:server-compile": "webpack --config webpack.config.server.js --watch",
    "dev:server": "nodemon ./build/server.js",
    "start": "npm-run-all --parallel dev:*"

  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.2.2",
    "express": "^4.17.1",
    "nodemon": "^2.0.12",
    "npm-run-all": "^4.1.5",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0",
    "webpack-node-externals": "^3.0.0"
  }
}
```

## requestIdleCallback API

react fiber 中使用的核心 API。

### 功能介绍

利用浏览器的空余时间执行任务，如果存在更高优先级的任务要执行时，当前的任务可以被中止，优先执行高级别任务。

```js
requestIdleCallback (function (deadline) {
  // deadline.timeRemaining() // 获取浏览器空余时间
})
```

### 浏览器空余时间

页面是一帧一帧绘制出来的，当每秒绘制的帧数达到 60 时，页面是流畅的，小于这个值时，用户会感觉卡顿。

1s 60 帧，每一帧分到的时间分别是 1000 / 60 = 16 ms，如果每一帧执行的时间小于 16 ms，就说明浏览器有空余时间。如果任务在剩余的时间内没有完成则会停止任务执行，继续优先执行主任务，也就是说 requestIdleCallback 总是会利用浏览器的空余时间执行任务。

### 代码案例

页面中存在两个按钮和一个 DIV，点击第一个按钮执行一项复杂的计算，使其长期占用主线程，当计算任务执行的时候去点击第二个按钮更改页面中 DIV 的背景颜色。使用 requestIdleCallback 就可以完美解决这个卡顿问题。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    #box {
      padding: 20px;
      background-color: palegoldenrod;
    }
  </style>
</head>
<body>

  <div id="box"></div>

  <button id="btn1">执行计算任务</button>
  <button id="btn2">更改背景颜色</button>

  <script>
    const oBox = document.getElementById('box');

    const oBtn1 = document.getElementById('btn1'),
          oBtn2 = document.getElementById('btn2');

    let number = 99999;
    let value = 0;

    function calc (deadline) {
      while (number >= 0 &&  deadline.timeRemaining() > 1) {
        value = Math.random() < 0.5 ? Math.random() : Math.random();
        number--;
        console.log(value);
      }
      
      requestIdleCallback(calc);
    }

    oBtn1.onclick = function () {
      requestIdleCallback(calc);
    };
    oBtn2.onclick = function () {
      oBox.style.background = 'green';
    }
  </script>

</body>
</html>
```

## Satck 算法问题、Fiber 解决方案

### 存在问题

React 16 的 Fiber 是 DOM 比对的一种新的算法，Fiber 就是这种算法的名字。之前的 DOM 比对算法叫做 Stack 。

React 16 之前的版本比对更新 Virtual DOM 的过程采用循环加递归实现。这种比对方式有一个问题，就是一旦任务开始进行就无法中断，如果应用中组件数量庞大、主线程被长期占用，知道整棵 Virtual DOM 树比对更新完成之后主线程才能释放，主线程才能执行其他任务。这就会导致一些用户交互、动画等任务无法立即得到执行，页面就会产生卡顿，非常的影响用户体验。

> 因为递归使用的是 JavaScript 自身的执行栈，所以旧版 Virtual DOM 比对的算法叫做 Stack，Stack 就是堆栈的意思。

核心问题：递归无法中断，执行重任务耗时长。JavaScript 又是单线程，无法同时执行其他任务，导致任务延迟页面卡顿，用户体验差。

### 解决方案

React 16 版本的解决方案。

* 利用浏览器空闲时间执行任务，拒绝长时间占用主线程；
  * 采用 requestIdleCallback API，利用浏览器空闲时间进行 DOM 比对过程，不会长期占用主线程；
* 放弃递归只采用循环，因为循环可以被中断；
  * 递归不可被打断，循环可以被中止，只要将循环的条件保存下来，下一次任务就可以从中断的时候执行；
* 任务拆分，将任务拆分成一个个的小任务。
  * 如果任务想要实现中止再继续，任务的单元必须要小，这样即使任务没有执行完就被中止，重新执行任务的代价会小很多；
  * 之前将整棵 virtual dom 的比对看作是一个任务，现在我们可以将树中每个节点的比对看作是一个任务；
  * Fiber 的意思就是纤维，意思就是执行任务的颗粒度变的更加细腻；

核心就是第一点，第二点和第三点都是为了实现第一种而存在的。

### 实现思路

Fiber 方案中，为了实现任务的终止再继续，DOM 比对算法被分成两部分：Virtual DOM 的比对和真实 DOM 的更新。

Virtual DOM 的比对是可以被中止的，真实 DOM 的更新不可被中止。

使用 React 编写用户界面时，仍然使用 JSX 语法，babel 会将 JSX 语法转换为 React.createElement 的调用，React.createElement 方法在调用后会返回 Virtual DOM 对象，接下来就可以执行第一个阶段。

* 构建 Fiber 对象（可中断）；
  * 采用循环的方式从 Virtual DOM 对象中找到每一个内部的 Virtual DOM 对象，为每一个 Virtual DOM 对象构建 Fiber 对象；
  * Fiber 对象也是 JavaScript 对象，它是从 Virtual DOM 对象演化来的，Fiber 对象中除了存在 type、prop、children 属性之外，还存在更多关于节点的信息，比如存在当前节点需要执行的操作（删除、更新、新增、修改等）；
  * 当所有的 Fiber 对象构建完成之后，需要将所有的 Fiber 对象存储在一个数组中，接下来就可以执行第二阶段操作。
* 提交 Commit （不可中断）；
  * 循环 Fiber 数组，根据 Fiber 对象中当前节点需要执行的任务类型，将这个操作应用在真实 DOM 对象中。

DOM 初始渲染：virtual DOM -> Fiber -> Fiber[] -> DOM

DOM 更新操作：newFiber vs oldFiber -> Fiber[] -> DOM

### Fiber 对象

```js
{
  type				节点类型（元素、文本、组件）
  props				节点属性
  stateNode		节点 DOM 对象 | 组件实例对象
  tag					节点标记（对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent）
  effects			数组，存储需要更改的 fiber 对象
  effectTag		当前 Fiber 要被执行的操作（新增、删除、修改）
  parent			当前 Fiber 的父级 Fiber
  child				当前 Fiber 的子级 Fiber
  sibling			当前 Fiber 的下一个兄弟 Fiber
  alternate		Fiber 备份 fiber 比对时使用
}
```

## 创建任务队列并添加任务

react/misc/createTaskQueue/index.js

```js
export default function createTaskQueue () {
  const taskQueue = [];

  return {
    push: item => taskQueue.push(item),
    pop: () => taskQueue.shift(),
  };
}
```

react/misc/index.js

```js
export { default as createTaskQueue }  from './createTaskQueue'; 
```

react/reconciliation/index.js

```js
import { createTaskQueue } from "../misc"

const taskQueue = createTaskQueue();

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  

  // 2. 指定在浏览器空闲时执行任务
}
```

react/index.js

```js
import createElement from "./createElement";
export { render } from './reconciliation';

export default {
  createElement
}
```

index.js

```js
import React, { render } from './react';

const jsx = (
  <div>
    <p>Hello React</p>
  </div>
);

render(jsx, document.getElementById('root'));
```

## 实现任务的调度逻辑

react/reconciliation/index.js

```js
import { createTaskQueue } from "../misc"

const taskQueue = createTaskQueue();
let subTask = null;

const getFirstTask = () => {

}

const executeTask = fiber => {
  
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

## 构建节点 Fiber 对象

react/misc/arrified/index.js

```js
const arrified = arg => Array.isArray(arg) ? arg : [arg];

export default arrified;
```

react/reconciliation/index.js

```js
import { createTaskQueue, arrified } from "../misc";

const taskQueue = createTaskQueue();
let subTask = null;

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];
    newFiber = {
      type: element.type,
      props: element.props,
      tag: 'host_component',
      effects: [],
      effectTag: 'placement',
      stateNode: null,
      parent: fiber
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }
    
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  reconcileChildren(fiber, fiber.props.children);
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

##  完善 fiber 对象：tag、stateNode

react/dom/createDOMElement.js

```js
import updateNodeElement from "./updateNodeElement";

export default function createDOMElement (virtualDOM) {
  let newElement = null;

  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
    // 更新元素属性
    updateNodeElement(newElement, virtualDOM);
  }

  return newElement;
}
```

react/dom/updateNodeElement.js

```js
export default function updateNodeElement (newElement, virtualDOM, oldVirtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {};
  // 获取旧节点对应的属性对象
  const oldProps = oldVirtualDOM && oldVirtualDOM.props || {};

  Object.keys(newProps).forEach(propName => {
    // 获取新的属性值
    const newPropsValue = newProps[propName];
    // 获取旧的属性值
    const oldPropsValue = oldProps[propName];

    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否事件属性 onClick
      if (propName.slice(0, 2) === 'on') {
        // 事件名称
        const eventName = propName.toLowerCase().slice(2);
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue);
        // 删除原有的事件处理函数
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue);
        }
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropsValue;
      } else if (propName !== 'children') {
        if (propName === 'classname') {
          newElement.setAttribute('class', newPropsValue);
        } else {
          newElement.setAttribute(propName, newPropsValue);
        }
      }
    }
  });

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName];
    const oldPropsValue = oldProps[propName];

    // 原有属性被删除
    if (!newPropsValue) {
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2);
        newElement.removeListener(eventName, oldPropsValue);
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName);
      }
    }
  });
}
```

react/dom/index.js

```js
export { default as createDOMElement } from './createDOMElement';
export { default as updateNodeElement } from './updateNodeElement';
```

react/misc/arrified/index.js

```js
export default function arrified (arg) {
  return Array.isArray(arg) ? arg : [arg];
}
```

react/misc/createStateNode/index.js

```js
import { createDOMElement } from '../../dom';

export default function createStateNode (fiber) {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
}
```

react/misc/getTag/index.js

```js
export default function getTag (vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
}
```

react/reconciliation/index.js

```js
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();
let subTask = null;

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];

    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber
    }
    
    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }
    
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  reconcileChildren(fiber, fiber.props.children);

  console.log(fiber);
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

## 构建节点树剩余子节点 Fiber 对象

src/index.js

```js
import React, { render } from './react';

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
);

render(jsx, document.getElementById('root'));
```

src/react/reconciliation/index.js

```js
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();
let subTask = null;

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];

    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber
    }
    
    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }
    
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  reconcileChildren(fiber, fiber.props.children);

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }
  
  console.log(fiber);
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

## 构建 effect 数组

src/react/reconciliation/index.js

```js
const executeTask = fiber => {
  reconcileChildren(fiber, fiber.props.children);

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );

    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  console.log(fiber);
}
```

## 实现 fiber 初始渲染

src/react/reconciliation/index.js

```js
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();

let subTask = null;
let pendingCommit = null;

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {
    if (item.effectTag === 'placement') {
      item.parent.stateNode.appendChild(item.stateNode);
    }
  });
}

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];

    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber
    }
    
    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }
    
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  reconcileChildren(fiber, fiber.props.children);

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );

    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    // 执行初始渲染
    commitAllWork(pendingCommit);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

## 类组件处理

src/react/component/index.js

```js
export class Component {
  constructor (props) {
    this.props = props;
  }
}
```

src/react/misc/createReactInstance.js

```js
export function createReactInstance (fiber) {
  let instance = null;

  if (fiber.tag === 'class_component') {
    instance = new fiber.type(fiber.props); 
  } else {
    instance = fiber.type;
  }

  return instance;
}
```

src/react/misc/createStateNode.js

```js
import { createDOMElement } from '../../dom';
import { createReactInstance } from '../createReactInstance';

export default function createStateNode (fiber) {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
  return createReactInstance(fiber);
}
```

src/react/misc/getTag.js

```js
import { Component } from "../../component";

export default function getTag (vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
  if (Object.getPrototypeOf(vdom.type) === Component) {
    return 'class_component';
  }
  return 'function_component';
}
```

src/react/reconciliation/index.js

```js
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();

let subTask = null;
let pendingCommit = null;

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {
    if (item.effectTag === 'placement') {
      let fiber = item;
      let parentFiber = item.parent;

      while (parentFiber.tag === 'class_component') {
        parentFiber = parentFiber.parent;
      }

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });
}

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];

    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber
    }
    
    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }
    
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  if (fiber.tag === 'class_component') {
    reconcileChildren(fiber, fiber.stateNode.render());
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );

    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    // 执行初始渲染
    commitAllWork(pendingCommit);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

src/react/index.js

```js
import createElement from "./createElement";
export { render } from './reconciliation';
export { Component } from './component';

export default {
  createElement
}
```

src/index.js

```js
import React, { render, Component } from './react';

class Greating extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>Hello React Component</div>
    )
  }
};

render(<Greating />, document.getElementById('root'));
```

## 处理函数组件

src/index.js

```js
import React, { render, Component } from './react';

function FnComponent (props) {
  return (
    <div>Hello React Component：{ props.title }</div>
  )
}

render(<FnComponent title="Hello" />, document.getElementById('root'));
```

src/react/reconciliation/index.js

```js
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();

let subTask = null;
let pendingCommit = null;

const commitAllWork = fiber => {
  fiber.effects.forEach(item => {
    if (item.effectTag === 'placement') {
      let fiber = item;
      let parentFiber = item.parent;

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });
}

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];

    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      parent: fiber
    }
    
    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }
    
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  if (fiber.tag === 'class_component') {
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );

    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    // 执行初始渲染
    commitAllWork(pendingCommit);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

## 实现节点更新

src/index.js

```js
import React, { render, Component } from './react';

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
);

render(jsx, document.getElementById('root'));

setTimeout(() => {
  const newJsx = (
    <div>
      <p>666</p>
      <p>Hello Fiber</p>
    </div>
  );

  render(newJsx, document.getElementById('root'));
}, 2000)
```

src/react/reconciliation/index.js

```js
import { updateNodeElement } from "../dom";
import { createTaskQueue, arrified, createStateNode, getTag } from "../misc";

const taskQueue = createTaskQueue();

let subTask = null;
let pendingCommit = null;

const commitAllWork = fiber => {
  // 循环 effects 数组，构建 DOM 节点树
  fiber.effects.forEach(item => {
    if (item.effectTag === 'update') {
      if (item.type === item.alternate.type) {
        // 节点类型相同
        updateNodeElement(item.stateNode, item, item.alternate);
      } else {
        // 节点类型不同
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        )
      }
    } else if (item.effectTag === 'placement') {
      let fiber = item;
      let parentFiber = item.parent;

      while (parentFiber.tag === 'class_component' || parentFiber.tag === 'function_component') {
        parentFiber = parentFiber.parent;
      }

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });

  // 备份旧根 fiber 对象
  fiber.stateNode.__rootFiberContainer = fiber;
}

const getFirstTask = () => {
  // 从任务队列中获取任务
  const task = taskQueue.pop();
  // 返回最外层节点的 fiber 对象
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  }
}

// 构建子级节点关系
const reconcileChildren = (fiber, children) => {
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null; // 子节点的 vritualDOM 对象
  let newFiber = null; // 子级 fiber 对象
  let prevFiber = null; // 上一个兄弟 fiber 对象
  let alternate = null;

  if (fiber.alternate &&  fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements) {
    // 子级 Virtual DOM 对象
    element = arrifiedChildren[index];

    if (element && alternate) {
      // 更新操作
            
      // 子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'update',
        parent: fiber,
        alternate
      }

      if (element.type === alternate.type) {
        // 类型相同
        newFiber.stateNode = alternate.stateNode;
      } else {
        // 类型不同
        // 为 fiber 节点添加 DOM 对象或组件实例对象
        newFiber.stateNode = createStateNode(newFiber);
      }
    } else if (element && !alternate) {
      // 初始渲染操作
      
      // 子级 fiber 对象
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: 'placement',
        parent: fiber
      }

      // 为 fiber 节点添加 DOM 对象或组件实例对象
      newFiber.stateNode = createStateNode(newFiber);
    } else {

    }


    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.siblint = newFiber;
    }

    if (alternate && alternate.siblint) {
      alternate = alternate.siblint;
    } else {
      alternate = null;
    }

    // 更新
    prevFiber = newFiber;

    index++;
  }
}

const executeTask = fiber => {
  if (fiber.tag === 'class_component') {
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    );

    if (currentExecutelyFiber.siblint) {
      return currentExecutelyFiber.siblint;
    }
    
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
}

const workLoop = deadline => {
  if (!subTask) {
    subTask = getFirstTask();
  }

  // 如果任务存在并且浏览器有空闲时间就调用
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    // 执行初始渲染
    commitAllWork(pendingCommit);
  }
}

const performTask = deadline => {
  // 执行任务
  workLoop(deadline);
  // 如果任务是否存在
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
}

export const render = (element, dom) => {
  // 1. 向任务队列中添加任务
  taskQueue.push({
    dom,
    props: { children: element }
  });
  
  // 2. 指定在浏览器空闲时执行任务
  requestIdleCallback(performTask);
}
```

## 扩展更新节点方法

原有 updateNodeElement 方法不支持更新文本节点，只支持原有节点。



