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

  