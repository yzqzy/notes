# Virtual DOM 及 Diff 算法

实现一个精简版的 React。

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

## Virtual DOM 对比

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

src/TinyReact/updateTextNode.js

```js
export default function updateTextNode (virtualDOM, oldVirtualDOM, oldDOM) {
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent;
    oldDOM._virtualDOM = virtualDOM;
  }
}
```

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



Virtual DOM 比对的时候是同级比对，父元素与父元素对比，子元素和子元素对比，不会发生跨级比对。

如果两个节点类型相同，需要根据节点类型进行不同处理。

如果是文本节点，就比较文本内容是否相同。如果相同，不做处理；不相同，使用新的文本节点替换旧的文本节点。

如果是元素节点，就比较元素节点的属性值。如果相同，不做处理；不相同，使用新节点属性值替换旧节点属性值。

再查看新节点是否存在被删除的属性。使用旧节点属性的名称去新节点中取值，如果取不到，说明属性已经被删除。

Virtual DOM 比对时使用的是深度优先策略。

### 节点类型不同

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
    <h6>值被改变了</h6>
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
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
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

### 删除节点

删除节点发生在节点更新之后，并且发生在同一个父节点的所有子节点身上。

在节点更新完成之后，如果旧节点对象的数量多于新的 VirtualDOM 节点的数量，就说明有节点需要被删除。

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
    <h2 data-test="test-modity">test</h2>
    <div>
      嵌套 <div>嵌套 1.1</div>
    </div>
    <h6>值被改变了</h6>
    { 2 == 1 && <div>2 == 1</div> }
    { 2 == 2 && <div>2 == 2</div> }
    <span>这是一段被修改过的内容</span>
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

src/TinyReact/unmountNode.js

```js
export default function unmountNode (node) {
  node.remove();
}
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 递归判断，对比子节点
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))

    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 存在节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
```

### 类组件状态更新

测试用例

```js

class Alert extends TinyReact.Component {
  constructor (props) {
    super(props);

    this.state = {
      title: 'Default Titie'
    }
    this.handeClick = this.handeClick.bind(this);
  }

  handeClick () {
    this.setState({
      title: 'Change Title'
    });
  }

  render () {
    return (
      <div>
        <p>Hello React.</p>
        <p>
          { this.props.name }
          { this.props.age }
        </p>
        <p>{ this.state.title }</p>
        <button onClick={this.handeClick}>Change Title</button>
      </div>
    )
  }
}

TinyReact.render(
  <Alert name="月落" age="23" />,
  document.getElementById('root')
);
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
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}
```

src/TinyReact/mountNativeElement.js

```js
import createDOMElement from "./createDOMElement";

export default function mountNativeElement (virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM);

  // 将转化之后的 DOM 对象放置在页面中
  container.appendChild(newElement);

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement);
  }
}
```

src/TinyReact/Component.js

```js
import diff from "./diff";

export default class Component {
  constructor (props) {
    this.props = props;
  }

  setState (state) {
    this.state = Object.assign({}, this.state, state);
    // 获取最新的需要渲染的 virtual DOM 对象
    const virtualDOM = this.render();
    // 获取旧的 virtual DOM 对象进行比对
    const oldDOM = this.getDOM();
    // 获取 container
    const container = oldDOM.parentNode;
    // 实现对比
    diff(virtualDOM, container, oldDOM);
  }

  setDOM (dom) {
    this._dom = dom;
  }

  getDOM () {
    return this._dom;
  }
}
```

### 组件更新

在 diff 方法中判断要更新的 Virtual DOM 是否是组件。

如果是组件再判断要更新的组件和未更新前的组件是否是同一个组件，如果不是同一个组件就不需要做组件更新操作，直接调用 mountElement 方法将返回的 Virtual DOM 添加到页面中。

如果是同一个组件，就执行更新操作，其实就是将最新的 props 传递到组件中，再调用组件的 render 方法获取组件返回的最新 Virtual DOM 对象，再将 Virtual DOM 对象传递给 diff 方法，让 diff 方法找出差异，从而将差异更新到真实 DOM 对象中。

在更新组件的过程中还要在不同阶段调用其不同的组件生命周期函数。



测试用例

```js
class Alert extends TinyReact.Component {
  constructor (props) {
    super(props);

    this.state = {
      title: 'Default Titie'
    }
    this.handeClick = this.handeClick.bind(this);
  }

  handeClick () {
    this.setState({
      title: 'Change Title'
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps);
  }

  componentWillUpdate () {
    console.log('componentWillUpdate');
  }

  componentDidUpdate () {
    console.log('componentDidUpdate');
  }

  render () {
    return (
      <div>
        <p>Hello React.</p>
        <p>
          { this.props.name }
          { this.props.age }
        </p>
        <p>{ this.state.title }</p>
        <button onClick={this.handeClick}>Change Title</button>
      </div>
    )
  }
}

class Title extends TinyReact.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>{ this.props.title }</div>
    );
  }
}

TinyReact.render(
  <Alert name="月落" age="23" />,
  document.getElementById('root')
);

setTimeout(() => {
  TinyReact.render(
    <Alert name="月落" age="23" />,
    // <Title title="我是标题" />,
    document.getElementById('root')
  );
}, 2000);
```

src/TinyReact/Component.js

```js
import diff from "./diff";

export default class Component {
  constructor (props) {
    this.props = props;
  }

  setState (state) {
    this.state = Object.assign({}, this.state, state);
    // 获取最新的需要渲染的 virtual DOM 对象
    const virtualDOM = this.render();
    // 获取旧的 virtual DOM 对象进行比对
    const oldDOM = this.getDOM();
    // 获取 container
    const container = oldDOM.parentNode;
    // 实现对比
    diff(virtualDOM, container, oldDOM);
  }

  setDOM (dom) {
    this._dom = dom;
  }

  getDOM () {
    return this._dom;
  }

  updateProps (props) {
    this.props = props;
  }

  // 生命周期函数
  componentWillMount () { }
  componentDidMount () { }
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }
  componentWillUpdate (nextProps, nextState) { }
  componentDidUpdate (prevPros, prevState) {}
  componentWillUnmount () {}
}
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};
  const oldComponent = oldVirtualDOM.component;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 递归判断，对比子节点
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))

    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 存在节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};
  const oldComponent = oldVirtualDOM.component;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 递归判断，对比子节点
    virtualDOM.children.forEach((child, index) => diff(child, oldDOM, oldDOM.childNodes[index]))

    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 存在节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
```

src/TinyReact/diffComponent.js

```js
import mouneElement from './mountElement';
import updateComponent from './updateComponent';

export default function diffComponent (virtualDOM, oldComponent, oldDOM, container) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 同组件，组件更新
    updateComponent(virtualDOM, oldComponent, oldDOM, container);
  } else {
    // 非同组件
    mouneElement(virtualDOM, container, oldDOM);
  }
}

// 判断是否是同一个组件
function isSameComponent (virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor;
}
```

src/TinyReact/mountComponent.js

```js
import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent (virtualDOM, container, oldDOM) {
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
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    // 挂载组件
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}
```

src/TinyReact/mountElement.js

```js
import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountElement (virtualDOM, container, oldDOM) {
  if (isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container, oldDOM);
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container, oldDOM);
  }
}
```

src/TinyReact/mountNativeElement.js

```js
import createDOMElement from "./createDOMElement";
import unmountNode from './unmountNode';

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM);

  // 如果存在旧的 DOM 对象，进行删除
  if (oldDOM) {
    unmountNode(oldDOM);
  }

  // 将转化之后的 DOM 对象放置在页面中
  container.appendChild(newElement);

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement);
  }
}
```

src/TinyReact/updateComponent.js

```js
import diff from "./diff";

// 组件更新
export default function updateComponent (virtualDOM, oldComponent, oldDOM, container) {
  oldComponent.componentWillReceiveProps(virtualDOM.props);

  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    const prevProps = oldComponent.props; // 未更新前 props

    oldComponent.componentWillUpdate(virtualDOM.props);

    // 组件属性更新
    oldComponent.updateProps(virtualDOM.props);
  
    // 获取组件返回的最新的 virtual DOM
    const nextVirtualDOM  = oldComponent.render();
    // 更新 component 组件实例对象
    nextVirtualDOM.component = oldComponent;
    
    diff(nextVirtualDOM, container, oldDOM);

    oldComponent.componentDidUpdate(prevProps);
  }
}
```

## Ref 属性获取元素

DOM 元素 ref 的实现思路是在创建节点时判断其 Virtual DOM 对象中是否有 ref 属性，如果有就调用 ref 属性中所存储的方法并且将创建出来的 DOM 对象作为参数传递给 Ref 方法，这样在渲染组件节点的时候就可以拿到元素对象并将元素对象存储为组件属性了。

类组件的实现思路是在 mountComponent 方法中，如果判断当前处理的是类组件，就通过类组件返回的 Virtual DOM 对象中获取组件实例对象，判断组件实例对象中的 props 属性中是否存在 ref 属性，如果存在就调用 ref 方法并且将组件实例对象传递给 ref 方法。

### 测试用例

```js
class Title extends TinyReact.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>{ this.props.title }</div>
    );
  }
}

class DemoRef extends TinyReact.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    console.log(this.input.value);
    console.log(this.alert);
  }

  componentDidMount () {
    console.log('componentDidMount');
  }

  render () {
    return (
      <div>
        <input type="text" ref={ input => this.input = input} />
        <button onClick={ this.handleClick }>按钮</button>
        <Title
          title="title"
          ref={ alert => this.alert = alert }
        />
      </div>
    )
  }
}

TinyReact.render(<DemoRef />, document.getElementById('root'));
```

### 代码实现

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

  // 处理 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement);
  }

  return newElement;
}
```

src/TinyReact/mountComponent.js

```js
import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent (virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null;
  let component = null;

  if (isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM);
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM);
    component = nextVirtualDOM.component;
  }

  if (isFunction(nextVirtualDOM)) {
    // 函数组件
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    // 挂载组件
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }

  if (component) {
    component.componentDidMount();

    // props 属性处理
    if (component.props && component.props.ref) {
      component.props.ref(component);
    }
  }
}

function buildFunctionComponent (virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent (virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}
```

## key 属性

React 中，渲染列表数据时通常会在被渲染的列表元素上添加 key 属性，key 属性就是唯一标识，可以帮助 React 识别哪些数据被修改或者删除了，从而达到 DOM 最小化操作的目的。

key 属性不需要全局唯一，但是在同一个父节点的兄弟节点之间必须是唯一的。

在对比同一个父节点下类型相同的子节点时需要用到 key 属性。

### 节点对比

实现思路是在两个元素进行比对时，如果类型相同，就循环旧的 DOM 对象的子元素，查看其身上是否有 key 属性，如果有将这个子元素的 DOM 对象存储在一个 JavaScript 对象中，接着循环要渲染的 Virtual DOM 对象的子元素，在循环过程中获取到这个子元素的 key 属性，然后使用这个 key 属性到 JavaScript 对象中查找 DOM 对象，如果能够找到就说明这个元素是已经存在的，是不需要重新渲染的。如果通过 key 属性找不到这个元素，就说明这个元素是新增的需要渲染的。



测试用例

```js
class KeyDemo extends TinyReact.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      persons: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        },
      ]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      persons: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 5,
          name: '李逵'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        },
      ]
    })
  }

  render () {
    return (
      <div>
        <ul>
          {
            this.state.persons.map(person => (
              <li key={ person.id }>{ person.name }</li>
            ))
          }
        </ul>
        <button onClick={ this.handleClick }>改变</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, document.getElementById('root'));
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};
  const oldComponent = oldVirtualDOM.component;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }


    // 1. 将拥有 key 属性的子元素放置在一个单独的对象中
    const keyedElements = {};

    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i];
      
      // 元素节点
      if (domElement.nodeType === 1) {
        const key = domElement.getAttribute('key');

        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0;

    if (hasNoKey) {
      // 递归判断，对比子节点
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      });
    } else {
      // 2. 循环 virtualDOM 的子元素，获取子元素的 key 属性
      virtualDOM.children.forEach((child, idx) => {
        const key = child.props.key;

        if (key) {
          const domElement = keyedElements[key];

          if (domElement) {
            // 3. 判断当前位置元素是不是期望元素
            if (oldDOM.childNodes[idx] && oldDOM.childNodes[idx] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[idx]);
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[idx]);
          }
        }
      });
    }

    // 获取旧节点
    const oldChildNodes = oldDOM.childNodes;
    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 存在节点需要被删除
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i]);
      }
    }
  }
}
```

src/TinyReact/mountNativeElement.js

```js
import createDOMElement from "./createDOMElement";
import unmountNode from './unmountNode';

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM);

  if (oldDOM) {
    // 添加元素
    container.insertBefore(newElement, oldDOM);
  } else {
    // 将转化之后的 DOM 对象放置在页面中
    container.appendChild(newElement);
  }

  if (oldDOM) {
    // 如果存在旧的 DOM 对象，进行删除
    unmountNode(oldDOM);
  }

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement);
  }
}
```

### 节点删除 (一)

对比节点的过程中，如果旧节点的数量对于要渲染的新节点的数量就说明有节点被删除了，继续判断这个 keyedElements 对象中是否有元素，如果没有就使用索引方式删除，如果有就要使用 key 属性比对的方式进行删除。

循环旧节点，在循环旧节点的过程中获取旧节点对应的 key 属性，然后根据 key 属性在新节点中查找这个旧节点，如果找到就说明这个节点没有被删除，如果没有找到，就说明节点被删除了，调用卸载节点的方法卸载节点即可。



测试用例

```js

class KeyDemo extends TinyReact.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      persons: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        },
      ]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      persons: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        }
      ]
    })
  }

  render () {
    return (
      <div>
        <ul>
          {
            this.state.persons.map(person => (
              <li key={ person.id }>{ person.name }</li>
            ))
          }
        </ul>
        <button onClick={ this.handleClick }>改变</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, document.getElementById('root'));
```

src/TinyReact/diff.js

```js
import mountElement from './mountElement';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';
import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';
import diffComponent from './diffComponent';

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM || {};
  const oldComponent = oldVirtualDOM.component;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // oldDOM 不存在，首次渲染
    mountElement(virtualDOM, container);
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 节点类型不同
    const newElement = createDOMElement(virtualDOM);    
    // 替换老节点
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM.type === oldVirtualDOM.type) {
    // 节点类型相同

    if (virtualDOM.type === 'text') {
      // 文本节点，更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 元素节点，更新属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }


    // 1. 将拥有 key 属性的子元素放置在一个单独的对象中
    const keyedElements = {};

    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i];
      
      // 元素节点
      if (domElement.nodeType === 1) {
        const key = domElement.getAttribute('key');

        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0;

    if (hasNoKey) {
      // 递归判断，对比子节点
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      });
    } else {
      // 2. 循环 virtualDOM 的子元素，获取子元素的 key 属性
      virtualDOM.children.forEach((child, idx) => {
        const key = child.props.key;

        if (key) {
          const domElement = keyedElements[key];

          if (domElement) {
            // 3. 判断当前位置元素是不是期望元素
            if (oldDOM.childNodes[idx] && oldDOM.childNodes[idx] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[idx]);
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[idx]);
          }
        }
      });
    }

    // 获取旧节点
    const oldChildNodes = oldDOM.childNodes;

    // 判断旧节点数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 存在节点需要被删除
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过 key 属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          const oldChild = oldChildNodes[i];
          const oldChildKey = oldChild._virtualDOM.props.key;

          let found = false;

          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true;
              break;
            }
          }

          if (!found) {
            unmountNode(oldChild);
          }
        }
      }
    }
  }
}
```

### 节点删除 (二)

删除节点并不是将节点直接删除就可以，还需要考虑以下几种情况：

* 如果要删除的节点是文本节点可以直接删除；
* 如果要删除的节点由组件生成，需要调用组件卸载生命周期函数；
* 如果要删除的节点中包含了其他组件生成的节点，需要调用其他组件的卸载生命周期函数；
* 如果要删除的节点身上有 ref 属性，还需要删除通过 ref 属性传递给组件的 DOM 节点对象；
* 如果要删除的节点身上存在事件，需要删除事件对应的事件处理函数。



src/TinyReact/unmountNode.js

```js
export default function unmountNode (node) {
  const virtualDOM = node._virtualDOM;

  // 1. 文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    node.remove();
    return;
  }

  // 2. 判断元素节点是否由组件生成
  const component = virtualDOM.component;

  if (component) {
    // 节点由组件生成
    component.componentWillUnmount();
  }

  // 3. 判断节点是否存在 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null);
  }

  // 4. 节点的属性中是否存在事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLocaleLowerCase().slice(2);
      const eventHandler = virtualDOM.props[propName];

      node.removeEventListener(eventName, eventHandler);
    }
  });

  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i]);
      i--;
    }
  }

  // 删除节点
  node.remove();
}
```

