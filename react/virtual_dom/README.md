# Virtual DOM 及 Diff 算法

## JSX

Jsx 是一种 JavaScript 语法的扩展，React 使用它来描述用户界面。它看起来很像 HTML，但它的确是 JavaScript。React 代码执行之前，Babel 会将 JSX 编译成 React API。

```html
<div className="container">
  <h3>Hello React</h3>
  <p>React is great</p>
</div>
```

```jsx
React.createElement(
	'div',
  {
    className: 'container'
  },
  React.createElement('h3', null, 'Hello React'),
  React.createElement('p', null, 'Hello is great')
)
```

两种语法对比来看，JSX 语法的出现是为了让 React 开发人员编写用户界面代码更加轻松。

## Virtual DOM

### DOM 操作问题

现在 Web 应用程序中使用 JavaScript 操作 DOM 是必不可少的，但是它的效率并不高。大多数 JavaScript 框架对于 DOM 的更新远远超过其必须进行的更新。假如你有包含十个项目的列表，你仅仅更改了列表中的第一项，大多数 JavaScript 框架会重建整个列表，这比必要的工作多十倍。更新效率低下是一种很严重的问题，为了解决整个问题，React 普及了一种 Vritual DOM，它出现的目的就是为了提交 JavaScript 操作 DOM 对象的效率。

### Virtual DOM 是什么

在 React 中，每个 DOM 对象都有一个对应的 Virtual DOM 对象，它是 DOM 对象的 JavaScript 对象表现形式，其实就是使用 JavaScript 对象描述 DOM 对象信息，比如 DOM 对象的类型、属性、子元素等。

我们可以把 Virtual DOM 对象理解为 DOM 对象的副本，但是它不能直接显示在屏幕上。

```html
<div className="container">
  <h3>Hello React</h3>
  <p>React is great</p>
</div>
```

```js
{
  type: 'div',
  props: { className: 'container' },
  children: [
    {
      type: 'h3',
      props: null,
      children: [
        {
          type: 'text',
          props: {
            textContent: 'Hello React'
          }
        }
      ]
    },
  	{
    	type: 'p',
      props: null,
      children: [
        {
          type: 'text',
          props: {
            textContent: 'React is great'
          }
        }
      ]
  	}
  ]
}
```

### Virtual DOM 如何提高效率

react 可以精准找到发生变化的 DOM 对象，只更新发生变化的部分。

react 第一次创建 DOM 对象后，会为每个 DOM 对象创建其对应的 Virtual DOM 对象，在 DOM 对象发生更新之前，react 会先更新所有的 Virtual DOM 对象，然后会将更新后的 Virtual DOM 和更新前的 Virtual DOM 进行比较，从而找出发生变化的部分，react 会将发生变化的部分更新到真实 DOM 对象中，仅更新需要更新的部分。

Virtual DOM 对象的更新和比较发生在内存中，不会在视图中渲染任何内容，所以这一部分的性能损耗成本是微不足道的。

```html
<div className="container">
  <p>Hello React</p>
</div>
```

```html
<div className="container">
  <p>Hello Vue</p>
</div>
```

```jsx
{
  type: 'div',
  props: { className: 'container' },
  children: [
    {
      type: 'p',
      props: null,
      children: [
        {
          type: 'text',
          props: {
            textContent: 'Hello React'
          }
        }
      ]
    }
  ]
}
```

```jsx
{
  type: 'div',
  props: { className: 'container' },
  children: [
    {
      type: 'p',
      props: null,
      children: [
        {
          type: 'text',
          props: {
            textContent: 'Hello Vue'
          }
        }
      ]
    }
  ]
}
```

## 创建 Virtual DOM 对象

react 代码执行前，JSX 会被 Babel 转换为 React.createElement 方法的调用，在调用 createElement 方法时会传入元素的类型，元素的属性及元素的子元素，createElement 方法的返回值为构建好的 Virtual DOM 对象。

### babelrc

告诉 babel 将 jsx 转换为 TinyReact.creatElement，而不是 React.createElement

```js
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "pragma": "TinyReact.createElement"
      }
    ]
  ]
}
```

### 测试用例

```js
import TinyReact from './TinyReact';

const VirtualDOM = (
  <div className="container">
    <h1>Hello React</h1>
    <h2 data-test="test">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h3>观察，将要改变值</h3>
    { 2 == 1 && <div>2 == 1</div> }
    { 2 == 2 && <div>2 == 2</div> }
    <span>这是一段内容</span>
    <button>点击</button>
  </div>
)

console.log(VirtualDOM);
```

### 代码实现

src/TinyReact/createElement.js

```js
export default function createElement (type, props, ...children) {
  const childElements = [].concat(...children).reduce((result, child) => {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child);
      } else {
        result.push(createElement("text", { textContent: child }));
      }
    }
    return result;
  }, []);

  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
}
```

src/TinyReact/index.js

```js
import createElement from "./CreateElement";

export default {
  createElement
}
```

## Virtual 对象转换为真实 DOM

  ### 测试用例

```js
import TinyReact from './TinyReact';

const VirtualDOM = (
  <div className="container">
    <h1>Hello React</h1>
    <h2 data-test="test">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h3>观察，将要改变值</h3>
    { 2 == 1 && <div>2 == 1</div> }
    { 2 == 2 && <div>2 == 2</div> }
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击</button>
  </div>
)

TinyReact.render(
  VirtualDOM,
  document.getElementById('root')
)

console.log(VirtualDOM);
```

### 代码实现

src/TinyReact/createDOMElement.js

```js
import mountElement from "./mountElement";

export default function createDOMElement (virtualDOM) {
  let newElement = null;

  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type);
  }

  // 递归创建子节点
  virtualDOM.children.forEach(child => mountElement(child, newElement));

  return newElement;
}
```

src/TinyReact/mountNativeElement.js

```js
import createDOMElement from "./createDOMElement";

export default function mountNativeElement (virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM);

  // 将转化之后的 DOM 对象放置在页面中
  container.appendChild(newElement);
}
```

src/TinyReact/mountElement.js

```js
import mountNativeElement from "./mountNativeElement";

export default function mountElement (virtualDOM, container) {
  // Component VS NativeElement
  mountNativeElement(virtualDOM, container);
}
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';

export default function diff (virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container);
  }
}
```

src/TinyReact/render.js

```js
import diff from './diff';

export default function render (virtualDOM, container, oldDOM) {
  diff(virtualDOM, container, oldDOM);
}
```

## 为 DOM 对象添加属性

src/TinyReact/createDOMElement.js

```js
import mountElement from "./mountElement";
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

  // 递归创建子节点
  virtualDOM.children.forEach(child => mountElement(child, newElement));

  return newElement;
}
```

src/TinyReact/updateNodeElement.js

```js
export default function updateNodeElement (newElement, virtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props;

  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName];

    // 判断属性是否事件属性 onClick
    if (propName.slice(0, 2) === 'on') {
      // 事件名称
      const eventName = propName.toLowerCase().slice(2);
      // 为元素添加事件
      newElement.addEventListener(eventName, newPropsValue);
    } else if (propName === 'value' || propName === 'checked') {
      newElement[propName] = newPropsValue;
    } else if (propName !== 'children') {
      if (propName === 'classname') {
        newElement.setAttribute('class', newPropsValue);
      } else {
        newElement.setAttribute(propName, newPropsValue);
      }
    }
  });
}
```

## 组件渲染：区分函数组件和类组件

组件的 Virtual DOM 类型值为函数，函数组件和类组件都是如此。

```js
// 函数组件
const Heart = () => <span>&hearts;</span>
```

```js
// 类组件
<Heart />
```

```js
// 组件的 virtual DOM
{
  type: f function() {},
  props: {},
  children: []
}
```

普通的虚拟 DOM type 属性是字符串类型，组件的 type 时一个函数。

### 测试用例

src/index.js

```js
function Heart () {
  return (
    <div>&hearts;</div>
  )
}

TinyReact.render(
  <Heart />,
  document.getElementById('root')
)
```

### 代码实现

src/TinyReact/isFunction.js

```js
export default function isFunction (virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function';
}
```

src/TinyReact/isFunctionComponent.js

```js
import isFunction from "./isFunction";

export default function isFunctionComponent (virtualDOM) {
  const type = virtualDOM.type;
  return (
    type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
  );
}
```

src/TinyReact/mountComponent.js

```js
import isFunctionComponent from "./isFunctionComponent";

export default function mountComponent (virtualDOM, container) {
  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    console.log('函数组件');
  } else {
    // 类组件
    console.log('类组件');
  }
}
```

src/TinyReact/mountElement.js

```js
import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountElement (virtualDOM, container) {
  if (isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container);
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container);
  }
}
```

## 组件渲染：函数组件处理

函数组件及参数处理。

### 测试用例

```js
function Demo () {
  return <div>&hearts;</div>;
}

function Heart (props) {
  return (
    <div>
      { props.title }
      <Demo />
    </div>
  );
}

TinyReact.render(
  <Heart title="Hello React" />,
  document.getElementById('root')
)
```

### 代码实现

src/TinyReact/mountComponent.js

```js
import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent (virtualDOM, container) {
  let nextVirtualDOM = null;

  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    console.log('类组件');
  }

  if (isFunction(nextVirtualDOM)) {
    // 函数组件
    mountComponent(nextVirtualDOM, container);
  } else {
    // 挂载组件
    mountNativeElement(nextVirtualDOM, container);
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}
```

## 组件渲染：类组件

### 测试用例

```jsx
class Alert extends TinyReact.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <p>Hello React.</p>
        <p>
          { this.props.name }
          { this.props.age }
        </p>
      </div>
    )
  }
}

TinyReact.render(
  <Alert name="月落" age="23" />,
  document.getElementById('root')
);
```

### 代码实现

src/TinyReact/Component.js

```js
export default class Component {
  constructor (props) {
    this.props = props;
  }
}
```

src/TinyReact/index.js

```js
import createElement from "./CreateElement";
import render from './render';
import Component from "./Component";

export default {
  createElement,
  render,
  Component
}
```

src/TinyReact/mountComponent.js

```js
import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent (virtualDOM, container) {
  let nextVirtualDOM = null;

  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
  }

  if (isFunction(nextVirtualDOM)) {
    // 函数组件
    mountComponent(nextVirtualDOM, container);
  } else {
    // 挂载组件
    mountNativeElement(nextVirtualDOM, container);
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  return component.render();
}
```

## DOM 元素更新 

DOM 元素更新前需要进行 Virtual DOM 对比，从而得到需要更新的 DOM 节点。

进行 Virtual DOM 对比时，需要用到更新后的 Vritual DOM 和更新前的 Virtual DOM。更新后的 Virtual DOM 我们可以通过 render 方法进行传递；对于更新前的 Virtual DOM，其实就是已经在页面中显示的真实 DOM 对象。

我们在创建真实 DOM 对象时，就可以将 Virtual DOM 添加到真实 DOM 对象的属性中，在进行 Virtual DOM 对比之前，就可以通过真实 DOM 对象获取到其对应的 Virtual DOM 对象，其实就是通过 render 方法的第三个参数进行获取，container.firstChild。



src/TinyReact/createDOMElement.js

```js
import mountElement from "./mountElement";
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

  newElement._virtualDOM = virtualDOM;

  // 递归创建子节点
  virtualDOM.children.forEach(child => mountElement(child, newElement));

  return newElement;
}
```

src/TinyReact/render.js

```js
import diff from './diff';

export default function render (
  virtualDOM,
  container,
  oldDOM = container.firstChild
) {
  diff(virtualDOM, container, oldDOM);
}
```

### 节点类型相同

测试用例

```js
const VirtualDOM = (
  <div className="container">
    <h1>Hello React</h1>
    <h2 data-test="test">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h3>观察，将要改变值</h3>
    { 2 == 1 && <div>2 == 1</div> }
    { 2 == 2 && <div>2 == 2</div> }
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击</button>
  </div>
)

const ModifyVirtualDOM = (
  <div className="container">
    <h1>Hello React</h1>
    <h2 data-test="test-modity">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h3>值被改变了</h3>
    { 2 == 1 && <div>2 == 1</div> }
    { 2 == 2 && <div>2 == 2</div> }
    <span>这是一段被修改过的内容</span>
    <button onClick={() => alert('你好，Modity。')}>点击</button>
  </div>
)

TinyReact.render(
  VirtualDOM,
  document.getElementById('root')
)

setTimeout(() => {
  TinyReact.render(
    ModifyVirtualDOM,
    document.getElementById('root')
  )
}, 2 * 1000);
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateTextNode from './updateTextNode';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (oldVirtualDOM && oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性

    }

    // 递归判断
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))
  }
}
```

src/TinyReact/updateTextNode.js

```js
export default function updateTextNode (virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent;
    oldDOM._virtualDOM = virtualDOM;
  }
}
```

### 节点类型不同

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (oldVirtualDOM && oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 递归判断
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))
  }
}
```

src/TinyReact/updateNodeElement.js

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

### 删除节点

