# React

## 认识 React

React 是构建用户页面的 JavaScript 库。React 并不是框架。

### React 作用

React 仅仅负责 view 层渲染。

React 是一个视图渲染的工具库，不处理框架的事情。

### 使用 React

添加根容器

```jsx
<div id="app"></div>
```

引入 CDN 脚本。

```html
<!-- 开发环境 -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<!-- 生产环境 -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

创建 React 组件。

React -> React API -> 处理视图的 API 集合

ReactDOM -> render -> 虚拟 DOM -> 真实 DOM

```jsx
const span = React.createElement('span', {
  className: 'text',
  key: 1
}, 'this is a span');

ReactDOM.render(
  React.createElement('div', {
    'data-tag': 'div'
  },
  [ span ]
  ),
  document.getElementById('app')
)
```

```js
class MyButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      openStatus: false
    }
  }

  render () {
    return 'Button View';
  }
}

ReactDOM.render(
  React.createElement(MyButton),
  document.getElementById('app')
)
```

```js
class MyButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      openStatus: false
    }
  }

  render () {
    const oP = React.createElement(
      'p',
      {
        className: 'text',
        key: 1
      },
      this.state.openStatus ? 'open' : 'close'
    );

    const oBtn = React.createElement(
      'button',
      {
        key: 1,
        onClick: () => this.setState({
          openStatus: !this.state.openStatus
        })
      },
      this.state.openStatus ? 'close' : 'open'
    );

    const wrapper = React.createElement(
      'div',
      {
        className: 'wrapper',
      },
      [ oP, oBtn ]
    );

    return wrapper;
  }
}
```

### 工程化方案

```js
npx create-react-app my-react-app
```

> npx npm5.2 + 的包运行工具。create-react-app 内部使用 babel、webpack。

```js
cd my-react-app
```

```js
yarn start
```

```js
npm run build // 打包项目
```

## JSX

```js
yarn add vite
```

```js
"scripts": {
  "dev": "vite"
}
```

```html
<script type="module" src="./js/index.jsx"></script>
```

### JSX 是什么

* 一种标签语法，在 JS 上进行的语法扩展；

* 不是字符串，不是 HTML 标签；

* 描述 UI 呈现与交互的直观的表现形式；
* 生成 React 元素；

### createElement 与 JSX 对比

```jsx
<h1 className="title">This is my first JSX experience.</h1>;
```

```js
React.createElement('h1', {
  className: 'title'
}, 'This is my first JSX experience');
```

### JSX 使用

```jsx
class MyButton extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      openStatus: false
    }
  }

  statusChange () {
    this.setState({
      openStatus: !this.state.openStatus
    });
  }

  render () {
    // JSX 遵循 JS 的命名规范，一般使用 camelCase 小驼峰
    return (
      <div className="wrapper">
        <p className="text">
          {
            /** 插值表达式 */
            this.state.openStatus ? 'open' : 'close'
          }
        </p>
        <button onClick={ this.statusChange.bind(this) }>
          { this.state.openStatus ? 'close' : 'open' }
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(MyButton),
  document.getElementById('app')
);
```

### React 为什么不把视图标记和逻辑分离

* 渲染和 UI 是有逻辑耦合；
* 即使是这样的耦合，也能实现关注点分离。

### JSX 插值表达式

表达式：一切有效的（符合 JS 编程逻辑的）表达式

```js
{ title }
```

JSX 被编译以后会转换为 React 元素，React 元素就是一个普通的对象。

```jsx
const rEl = <h1 className="title">This is my first JSX experience.</h1>;

console.log(rEl);
```

<img src="../images/jsx.png" style="zoom: 120%" />

```js
{
	"type": "h1",
	"key": null,
	"ref": null,
	"props": {
		"className": "title",
		"children": "This is my first JSX experience."
	},
	"_owner": null,
	"_store": {}
}
```

```js
const rEl = React.createElement('h1', {
  className: 'title'
}, 'This is my first JSX experience');;

console.log(rEl); 
```

JSX 和 React.createElement 创建的元素是一致的。

### 插值表达式案例

```jsx
const mark = 'title';

function selectText (mark) {
  switch (mark) {
    case 'title':
    	return 'This is a title';
    default:
      return 'This is a paragraph';
  }
}

function getText (mark) {
  if (mark === 'title') {
    return <h1 className={ mark }>
    	{ selectText(mark) }
    </h1>;
  }
  
  return <p>{ selectText(mark) }</p>;
}

console.log(getText('title'));
```

```jsx
var arr = [
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
];

function setList () {
  return (
		<ul>
    	{
				arr.map(item => {
          return (
          	<li key={ item.id }>
            	<span>{ item.id }</span>
              <p>{ item.name }</p>
            </li>
          );
        })    
      }
    </ul>  
  )
}

const rEl = setList();

ReactDOM.render(
	rEl,
  document.getElementById('app')
)
```

单标签必须要闭合。

### jsx 原理

react render 之前，所有的 jsx 都会转成字符串，最终形成 react 元素。

所有输入的内容都会进行转义（XSS 攻击比较难）。

## ReactDOM.render

html 种的 div 容器叫根节点，根节点内的所有内容都是由 ReactDOM 进行管理。

一个 React 应用只有一个根节点。微前端可以存在多个节点。

用 ReactDOM 的 render 方法将 react 元素渲染到根节点中。

```jsx
const rEl = <h1 className="title">This is a title.</h1>;

/**
 * @param {ReactElement} - react 元素
 * @param {RootNode} - 根节点
 */
ReactDOM.render(rEl, document.getElementById('app'));
```

更新逻辑处理。

* React 元素是不可变的对象（immutable Object）
  * 不能添加属性
  * 不能修改属性
  * 不能删除属性
  * 不能修改属性的枚举、配置、可写（enumerable、configurable/writable）
* ReactDOM.render 会深度对比新旧元素的状态，只会做必要的真实 DOM 更新（虚拟节点的对比）

```jsx
function update () {
  const rEl = (
    <div>
      <h1>This is a title.</h1>
      <h2>{ new Date().toString() }</h2>
    </div>
  );

  ReactDOM.render(
    rEl,
    document.getElementById('app')
  );
}

setInterval(update, 1000);
```

> 渲染之前将每个 React 元素组成一个虚拟 DOM 的对象结构，然后正常做渲染，更新之前再形成新的虚拟 DOM 的对象结构，对比新的和旧的虚拟 DOM 节点，分析出两者的不同点，然后再形成一个 DOM 更新补丁，再去操作真实 DOM（更新真实 DOM）。

```jsx
class Title extends React.Component {
  render () {
    return <h1>This is a title.</h1>;
  }
}

ReactDOM.render(
  <Title />,
  document.getElementById('app')
);
```

```jsx
class Title extends React.Component {
  render () {
    return <h1>This is a title.</h1>;
  }
}

ReactDOM.render(
  React.createElement(Title),
  document.getElementById('app')
);
```

```jsx
function Title () {
  return <h1>This is a title.</h1>;
}

ReactDOM.render(
  <Title />,
  document.getElementById('app')
);
```

如果是组件渲染，ReactDOM.render 的第一个参数是 React 元素，这样才能使组件内部的 render 函数执行，函数组件才能执行。

* 组件使用 JSX 语法
* 使用 React.createElement 将组件转换为 React 元素

## 组件与 props

### 组件组成部分

在前端，组件是视图的片段。 组件包含视图标记、事件、数据、逻辑、外部的配置。

组件一般是内部管理数据集合（state），外部传入配置集合（props）。

```jsx
// 类组件
class Test extends React.Component {
  // 属性 配置 props 保存
  constructor (props) {
    super(props);

    // 数据 内部数据 state
    this.state = {
      title: this.props.title
    }
  }

  // 事件处理函数
  handleBtnClick () {
    // 逻辑部分
    this.setState({
      title: 'This is my Component.'
    });
  }

  render () {
    // 视图标记
    return (
      <div>
        <h1>{ this.state.title }</h1>
        <button onClick={ this.handleBtnClick.bind(this) }>Click</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Test title='This is a Class Component.' />,
  document.getElementById('app')
);
```

```jsx
const { useState } = React;

function Test (props) {
  const [ title, setTitle ] = useState(props.title);

  return (
    <div>
      <h1>{ title }</h1>
      <button onClick={ () => setTitle('This is my Component.') }>Click</button>
    </div>
  )
}

ReactDOM.render(
  <Test title='This is a Class Component.' />,
  document.getElementById('app')
);
```

### 组件渲染过程

* React 主动调用组件
* 将属性集合转换成对象 props => { title: 'this is a Class Component.' }
* 将对象作为 props 传入组件
* 替换 JSX 中的 props 或者 state 中的变量
* ReactDOM 将最终的 React 元素通过一系列操作转换成真实 DOM 进行渲染

### 组件调用规范

* 视图标记时 HTML 标签 `<div></div>`

* 大驼峰写法作为一个 React 元素 `<Test />` 组件  -> JSX -> React 元素

  `<Test title="This is a Class Component." />`

* 组件转换 React 元素

  `React.createElement(Test,  { title: 'This is a Class Component.' })`

### 组合组件

```jsx
class Title extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <h1>{ this.props.title }</h1>;
  }
}

class Author extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <span>{ this.props.author }</span>
    )
  }
}

class Para extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <p>{ this.props.para }</p>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    title: 'This is a Title.',
    author: 'yueluo',
    para: 'this is a paragrah'
  }

  render () {
    const { title, author, para } = this.state;

    return (
      <div>
        <Title title={ title } />
        <Author author={ author } />
        <Para para={ para } />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 组件嵌套

```jsx
class Title extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { title, author, para } = this.props;

    return <div>
      <h1>{ title }</h1>
      <Author author={ author } />
      <Para para={ para } />
    </div>;
  }
}

class Author extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <span>{ this.props.author }</span>
    )
  }
}

class Para extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <p>{ this.props.para }</p>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    title: 'This is a Title.',
    author: 'yueluo',
    para: 'this is a paragrah'
  }

  render () {
    const { title, author, para } = this.state;

    return (
      <div>
        <Title
          { ...this.state }
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 属性 props 和数据 state 区别

* state 数据池，组件内部的管理数据的容器、组件内部可写可读

* props 属性池，外部调用组件时，传入的属性集合，组件内部可读不可写

  组件内部不应该修改外部数据。React 设计之初对 props 的定义就是只读的，不可写。

```jsx
class App extends React.Component {
  constructor (props) {
    super(props);
  }

  handleBtnClick () {
    // 报错，抛出异常
    // Cannot assign to read only property 'content' of object '#<Object>'
    this.props.content = '123';
  }

  render () {
    return (
      <div>
        <h1>{ this.props.content }</h1>
        <button onClick={ this.handleBtnClick.bind(this) } >Click</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App content="This is my content." />,
  document.getElementById('app')
);
```

* state 与 props 结合

```jsx

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    content: this.props.content
  }

  handleBtnClick () {
    this.setState({
      content: '123'
    });
  }

  render () {
    return (
      <div>
        <h1>{ this.state.content }</h1>
        <button onClick={ this.handleBtnClick.bind(this) } >Click</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App content="This is my content." />,
  document.getElementById('app')
);
```

### 函数组件一定要是纯函数

纯函数能保证绝对的复用性。

相同的入参保证返回相同的结果。

纯函数不能修改入参，

```jsx
function test (a, b) {
  return a + b;
}
```

从设计上讲，在函数内部更改入参其实是在组件运行时更改外部配置（配置的意义就丧失了）。

该配置是使用组件者希望该配置达到对应的结果。

## state、setState、单向数据流

### state 概念

state react 核心概念，状态（数据池）。组件的数据池。

```jsx
class Title extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1>{ this.props.title }</h1>
    )
  }
}

class DateTime extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    datetime: new Date().toString()
  }

  render () {
    return (
      <h2 id="datetime">It's Now { this.state.datetime }</h2>
    )
  }
}

class Board extends React.Component {
  render () {
    return (
      <div>
        <Title title="Welecome to my Board" />
        <DateTime />
      </div>
    )
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('app')
)
```

状态即局部内容的容器。

```jsx
class Title extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1>{ this.props.title }</h1>
    )
  }
}

class DateTime extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    datetime: new Date().toString()
  }

  // 组件已经被渲染到 DOM 中后运行
  // 组件已经被挂载到真实 DOM 中后运行的函数
  componentDidMount () {
    this.t = setInterval(() => {
      this.setState({
        datetime: new Date().toString()
      });
    }, 1000);
  }

  // 组件卸载之前运行
  componentWillUnmount () {
    this.t && clearInterval(this.t);
    this.t = null;
  }

  render () {
    return (
      <h2 id="datetime">It's Now { this.state.datetime }</h2>
    )
  }
}

class Board extends React.Component {
  render () {
    return (
      <div>
        <Title title="Welecome to my Board" />
        <DateTime />
      </div>
    )
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('app')
)


setTimeout(() => {
  ReactDOM.unmountComponentAtNode(
    document.getElementById('app')
  )
}, 5 * 1000)
```

如果想使用组件时传入数据，使用 props 进行配置。

如果是组件内部使用的数据，使用 state 私有数据（状态）。

### state 注意事项

* 必须使用 setState 方法来更改 state；

* 多个 setState 会合并调用；

* props 和 state 更新数据要谨慎，避免直接依赖它们（存在异步程序更新的情况）。

```js
this.setState({
	result: this.state.result + this.props.content
});

=> 

this.setState((state. props) => {
  // state 上一个 state
  // props 是本次更新时使用的 props
  result: state.result + props.content
});
```

* setState 操作合并的原理是浅合并

```js
state = {
  obj: {},
  arr: []
}

$.ajax().then(res => {
  this.setState({
    obj: res.obj
  })
});

$.ajax().then(res => {
  this.setState({
    arr: res.arr
  })
});

// 完全替换 arr，obj 是原来的引用
// 设置 arr 时，应该使用什么方法比较好?

// 1.
this.setState({
	arr: [...this.state.arr, 4];
});

// 2.
this.setState({
  arr: this.state.arr.concat(4)
});
```

* 组件不知道其他组件是否有状态，组件不关心其他组件是函数组件还是类组件

  state 是组件内部特有的数据封装，其他组件无法读写修改组件的 state。

  组件可以使用其他组件调用的时候传入属性来传递属性的值。

```jsx
class Title extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <h1>{ this.props.title }</h1>
    )
  }
}

class App extends React.Component {
  state = {
    title: 'This is a title.'
  }

  render () {
    return <Title title={ this.state.title } />
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

* props 虽然是响应式，在组件内部是只读的，无法修改其他组件的 state

* 状态从父到子，由上而下的传递的方式，叫做单向数据流。vue 的 props 也是单项数据绑定。

  react 没有提供 v-model 的指令，没有办法通过视图修改数据。

  数据绑定机制和数据流向机制是两个概念，vue 和 react props 都是单向数据流。

* state 只能传递给自己的子组件（state 的安全影响范围）

  state 只能影响当前组件的 UI 的内部的 UI。

* 组件可以没有状态

  有没有组件，组件间可以不受嵌套影响。

  有无状态是可以切换的。

## 事件处理函数绑定与事件对象

### 事件概念

DOM 事件处理。

```jsx
addEventListener()

onClick = function () {}

<button onclick="doSth"></button>
```

React 元素采用了 DOM 0 标准中的事件属性定义的方法。

```jsx
<button onClick={ this.doSth }>click</button>
```

创建 React 元素的方法。

```jsx
React.createElement(
	'button',
	{
    onClick: { this.doSth },
  },
  'click'
)
```

```jsx
class App extends React.Component {
  doSth () {
    console.log('Something is done.');
  }

  doSth2 () {
    console.log('Something is done！');
  }

  render () {
    return (
      <div>
        <button onClick={ this.doSth }>click</button>
        <a href="#" onClick={ this.doSth2 } >click</a>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

```jsx
<a href="javascript:void(0)" onClick={ this.doSth2 } >click</a>

// 使用 javascript:void(0) 会警告，建议使用下面方式

e.preventDefault();
```

### React 的事件对象

```jsx
class App extends React.Component {
  doSth (e) {
    console.log('Something is done.');
    console.log(e);
  }

  render () {
    return (
      <div>
        <button onClick={ this.doSth }>click</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

SyntheticEvent 合成事件对象 React 重新定义。

SyntheticEvent 遵循 W3C 事件对象规范，不存在浏览器兼容性问题。

### React 事件处理

react 为什么要将事件处理直接在元素上绑定？

React 一直认为事件处理和视图是有程序上的直接关系的，我们分离的是逻辑，不应该是事件绑定。

事件处理和视图写在一起，可以更加直观的表述视图和逻辑的关系，更加容易维护。

这种事件绑定方式对于组件化是有好处的。

### this 指向问题

```jsx
class App extends React.Component {
  doSth () {
    console.log(this);
  }

  render () {
    return (
      <div>
        <button onClick={ this.doSth }>click</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

默认处理函数的 this 为 undefined。

ES6 的 class 模块默认是不对事件处理函数进行 this 的再绑定。

解决 this 的方法：

* `bind(this)`

```jsx
// 构造器中
class App extends React.Component {
  constructor (props) {
    super(props);
    this.doSth = this.doSth.bind(this);
  }

  doSth () {
    console.log(this);
  }

  render () {
    return (
      <div>
        <button onClick={ this.doSth }>click</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

```jsx
// 视图标记中
class App extends React.Component {
  doSth () {
    console.log(this);
  }

  render () {
    return (
      <div>
        <button onClick={ this.doSth.bind(this) }>click</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

* 回调和箭头函数

  render 函数时每次执行的都会形成新的回调。

  ```jsx
  
  class App extends React.Component {
    doSth () {
      console.log(this);
    }
  
    render () {
      return (
        <div>
          <button onClick={ () => this.doSth() }>click</button>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
  ```

  给子组件的属性传递函数时，由于每次都要新创建回调，子组件每次都会接收新函数，有可能触发组件的重新渲染。

  ```jsx
  <Title fn={ () => this.doSth() } />
  ```

  如果想使用箭头函数的形式。可以使用 class fields 写法，代码如下：

  > 实验性写法，state = {} 也是实验性写法。

  ```jsx
  class App extends React.Component {
    doSth = () => {
      console.log(this);
    }
  
    render () {
      return (
        <div>
          <button onClick={ this.doSth }>click</button>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
  ```

  推荐 class fields 写法和 bind 写法。

### 参数问题

  ```jsx
  class App extends React.Component {
    doSth (p1, p2, p3) {
      console.log(p1, p2, p3);
    }
  
    doSth2 (p1, p2, p3) {
      console.log(p1, p2, p3);
    }
  
    render () {
      return (
        <div>
          <button onClick={ (e) => this.doSth(1, 2, 3) }>click</button>
          <button onClick={ this.doSth2.bind(this, 1, 2, 3) }>click</button>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
  
  // 两种绑定方式是一致的。
  ```

  ```jsx
  class App extends React.Component {
    doSth (p1, p2, p3, e) {
      console.log(p1, p2, p3, e);
    }
  
    doSth2 (p1, p2, p3, e) {
      console.log(p1, p2, p3, e);
    }
  
    render () {
      return (
        <div>
          <button onClick={ (e) => this.doSth(1, 2, 3, e) }>click</button>
          <button onClick={ this.doSth2.bind(this, 1, 2, 3) }>click</button>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
  
  // 回调函数的方式事件对象在最后。必须显式传入事件对象。
  // bind 的方式不用传递，也在最后。隐式传入事件对象。
  // 事件对象都是在最后。回调函数的形式建议传到最后。
  ```

## 条件渲染

```jsx
class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  login = () => {
    const { username, password } = this.state;

    if (!username || !password) {
      return alert('用户名密码不能为空');
    }
    
    this.props.login(username, password);
  }

  handleUseNameChange = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }
 
  render () {
    return (
      <div>
        <p>
          用户名：
          <input 
            type="text"
            placeholder="用户名"
            onChange={this.handleUseNameChange}
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            placeholder="密码"
            onChange={this.handlePasswordChange}
          />
        </p>
        <p>
          <button onClick={ this.login }>登录</button>
        </p>
      </div>
    )
  }  
}

class Welcome extends React.Component {
  render () {
    return (
      <div>
        <h1>欢迎您，月落。</h1>
        <button onClick={this.props.logout}>退出登录</button>
      </div>
    );
  }
}

class Tip extends React.Component {
  render () {
    const { tipShow } = this.props;

    if (!tipShow) {
      // 如果 render 返回 null，不会进行任何渲染
      return null;
    }

    return (
      <p>This is a tip.</p>
    )
  }
}

class App extends React.Component {
  state = {
    logged: false,
    count: 0,
    tipShow: false
  }

  logout = () => {
    this.setState({
      logged: false,
      tipShow: false
    });
  }

  login = (username, password) => {
    if (username != 'root' || password != 'root') {
      return alert('用户名密码错误');
    }

    this.setState({
      logged: true,
      tipShow: true
    });
  }

  render () {
    const { logged, count, tipShow } = this.state;

    return (
      <div>
        {
          logged && <span>您好。</span>
        }
        {
          // 判断表达式一定是 bool false、null、undefined 的时候才不会被渲染
          // 0、NaN 会被渲染出来
          count && <p>会员等级：{ count }</p>
          // 解决方式：count.toString() && 
        }
        {
          logged ? (
            <Welcome logout={this.logout} />
          ) : <LoginForm login={this.login} />
        }
        <Tip tipShow={ tipShow } />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## 列表渲染

JSX - map method。

列表中每个子元素必须有一个唯一的 key 属性值。

key 是 React 查看元素是否改变的唯一标识。

key 必须在兄弟节点中唯一，确定的（兄弟节点是一个列表中的兄弟元素）。

```jsx
class App extends React.Component {
  state = {
    arr: [
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
  }

  render () {
    const { arr } = this.state;

    return (
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map((item, index) => (
              <tr key={ index }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
              </tr>
            ))
          }
        </tbody>
      </table>   
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

不建议（禁止）使用 index 作为 key 值（不建议是建立在列表顺序改变、元素增删的情况下）。

列表项增删或顺序改变，index 的对应项就会改变，key 值对应的项还是之前列表情况的对应元素的项的值。导致状态混乱，查找元素性能变差。如果列表是静态不可操作的，可以考虑选择 index 作为 key 值，但是也不推荐。因为很有可能这个列表在以后维护扩展时，有可能变为可操作的列表。

* 尽量避免使用 index
* 可以使用数据 ID（很有可能 ID 会变动）
* 最好使用动态生成静态ID、库 nanoid

```jsx
import { nanoid } from 'nanoid';
class App extends React.Component {
  state = {
    arr: [
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
  }

  render () {
    const { arr } = this.state;

    return (
      <table border="1">
        <thead>
          <tr>
            <th>KEY</th>
            <th>ID</th>
            <th>名称</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map((item, index) => {
              const key = nanoid();

              return (
                <tr key={ key }>
                  <td>{ key }</td>
                  <td>{ item.id }</td>
                  <td>{ item.name }</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>   
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

使用 key 赋值的正确姿势：

```jsx
import { nanoid } from 'nanoid';

class ItemTitle extends React.Component {
  render () {
    return (
      <thead>
        <tr>
          <th>KEY</th>
          <th>ID</th>
          <th>NAME</th>
        </tr>
      </thead>
    )
  }
}

class ListItem extends React.Component {
  render () {
    const { sid, item } = this.props;

    return (
      <tbody>
        <tr>
          <td>{ sid }</td>
          <td>{ item.id }</td>
          <td>{ item.name }</td>
        </tr>
      </tbody>
    )
  }
}

class ListTable extends React.Component {
  state = {
    arr: [
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
  }

  render () {
    return (
      <table border="1">
        <ItemTitle />
        {
          this.state.arr.map(item => {
            const sid = nanoid();
						// key 不会作为属性传递给子组件，必须显式传递 key 值
            // 防止开发者在逻辑中修改 key 值（对 key 值进行操作）
            return (
              <ListItem
                key={ sid }
                sid={ sid }
                item={ item }
              />
            )
          })
        }
      </table>
    )
  }
}


ReactDOM.render(
  <ListTable />,
  document.getElementById('app')
);
```

key 不会作为属性传递给子组件，必须显式传递 key 值。
防止开发者在逻辑中修改 key 值（对 key 值进行操作）。

如果存在多层 map 嵌套，最好提出子组件或者 map 形成单独组件。

## 受控组件

受控组件指组件数据由 state 控制。
非受控组件就是组件数据是只读的，不受控于 state。

```jsx
class App extends React.Component {
  // 1. state 就是表单的唯一数据源
  state = {
    username: ''
  }

  handleUserNameChange = (e) => {
    // 2. 控制表单操作并且同步 state
    this.setState({
      username: e.target.value
    }, () => {
      console.log(this.state.username);
    });
  }

  render () {
    const { username } = this.state;

    return (
      <p>
        用户名:
        <input
          type="text"
          placeholder="用户名"
          value={ username }
          onChange={ this.handleUserNameChange }
        />
      </p>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

受控组件就是满足 state 是唯一数据源，并且可以同步 state 的方式的组件。

```jsx
class App extends React.Component {
  state = {
    username: '',
    password: '',
    intro: '',
    gender: 'male',
    isStudent: true,
    hobbies: []
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStudentChange = (isStudent) => {
    this.setState({
      isStudent
    })
  }

  handleHobbiesChange = (e) => {
    if (e.target.checked) {
      this.setState({
        hobbies: [...this.state.hobbies, e.target.value]
      });
    } else {
      this.setState({
        hobbies: this.state.hobbies.filter(item => item !== e.target.value)
      })
    }
  }

  handleSubmitClick = (e) => {
    e.preventDefault();

    const { username, password, intro, gender, isStudent, hobbies } = this.state;

    console.log(username, password, intro, gender, isStudent, hobbies);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.setState({
      username: '',
      password: '',
      intro: '',
      gender: 'male',
      isStudent: true,
      hobbies: []
    });
  }

  render () {
    const { username, password, intro, gender, isStudent } = this.state;

    return (
      <form>
        <p>
          用户名:
          <input
            type="text"
            name="username"
            placeholder="用户名"
            value={ username }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            name="password"
            placeholder="密码"
            value={ password }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <textarea
            name="intro"
            placeholder="自我介绍"
            value={ intro }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <select
            value={ gender }
            name="gender"
            onChange={ this.handleChange }
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </p>
        <p>
          是否是学生：
          是<input
              type="radio"
              name="isStudent"
              checked={ isStudent }
              onChange={ this.handleStudentChange.bind(this, true) }
            />
          | 
          否<input
              type="radio"
              name="isStudent"
              onChange={ this.handleStudentChange.bind(this, false) }
            />
        </p>
        <p>
          钢琴：<input
                  type="checkbox"
                  name="hobbies"
                  value="piano"
                  onChange={ this.handleHobbiesChange }
                />|
          旅行：<input
                  type="checkbox"
                  name="hobbies"
                  value="travel"
                  onChange={ this.handleHobbiesChange }
                />|
          跑步：<input
                  type="checkbox"
                  name="hobbies"
                  value="running"
                  onChange={ this.handleHobbiesChange }
                />|
          唱歌：<input
                  type="checkbox"
                  name="hobbies"
                  value="singing"
                  onChange={ this.handleHobbiesChange }
                />
        </p>
        <p>
          <button onClick={ this.handleSubmitClick }>登录</button>
          <button onClick={ this.handleResetClick } >重置</button>
        </p>
      </form>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

=> 

```jsx
class App extends React.Component {
  state = {
    username: '',
    password: '',
    intro: '',
    gender: 'male',
    isStudent: true,
    hobbies: [],
    hobbiesData: [
      {
        name: '钢琴',
        value: 'piano'
      },
      {
        name: '旅行',
        value: 'travel'
      },
      {
        name: '跑步',
        value: 'running'
      },
      {
        name: '唱歌',
        value: 'singing'
      }
    ]
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStudentChange = (isStudent) => {
    this.setState({
      isStudent
    })
  }

  handleHobbiesChange = (e) => {
    if (e.target.checked) {
      this.setState({
        hobbies: [...this.state.hobbies, e.target.value]
      });
    } else {
      this.setState({
        hobbies: this.state.hobbies.filter(item => item !== e.target.value)
      })
    }
  }

  handleSubmitClick = (e) => {
    e.preventDefault();

    const { username, password, intro, gender, isStudent, hobbies } = this.state;

    console.log(username, password, intro, gender, isStudent, hobbies);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.setState({
      username: '',
      password: '',
      intro: '',
      gender: 'male',
      isStudent: true,
      hobbies: []
    });
  }

  render () {
    const { username, password, intro, gender, isStudent, hobbies, hobbiesData } = this.state;

    return (
      <form>
        <p>
          用户名:
          <input
            type="text"
            name="username"
            placeholder="用户名"
            value={ username }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            name="password"
            placeholder="密码"
            value={ password }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <textarea
            name="intro"
            placeholder="自我介绍"
            value={ intro }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <select
            value={ gender }
            name="gender"
            onChange={ this.handleChange }
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </p>
        <p>
          是否是学生：
          是<input
              type="radio"
              name="isStudent"
              checked={ isStudent }
              onChange={ this.handleStudentChange.bind(this, true) }
            />
          | 
          否<input
              type="radio"
              name="isStudent"
              onChange={ this.handleStudentChange.bind(this, false) }
            />
        </p>
        <p>
          {
            hobbiesData.map(item => {

              return (
                <span  key={ item.value }>
                  { item.name }：
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={ item.value }
                    checked={ hobbies.includes(item.value) }
                    onChange={ this.handleHobbiesChange }
                  />|
                </span>
              )
            })
          }
        </p>
        <p>
          <button onClick={ this.handleSubmitClick }>登录</button>
          <button onClick={ this.handleResetClick } >重置</button>
        </p>
      </form>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

=>

```jsx
class App extends React.Component {
  state = {
    username: '',
    password: '',
    intro: '',
    gender: 'male',
    isStudent: true,
    hobbies: []
  }

  hobbiesData = [
    {
      name: '钢琴',
      value: 'piano'
    },
    {
      name: '旅行',
      value: 'travel'
    },
    {
      name: '跑步',
      value: 'running'
    },
    {
      name: '唱歌',
      value: 'singing'
    }
  ]

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleStudentChange = (isStudent) => {
    this.setState({
      isStudent
    })
  }

  handleHobbiesChange = (e) => {
    if (e.target.checked) {
      this.setState({
        hobbies: [...this.state.hobbies, e.target.value]
      });
    } else {
      this.setState({
        hobbies: this.state.hobbies.filter(item => item !== e.target.value)
      })
    }
  }

  handleSubmitClick = (e) => {
    e.preventDefault();

    const { username, password, intro, gender, isStudent, hobbies } = this.state;

    console.log(username, password, intro, gender, isStudent, hobbies);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.setState({
      username: '',
      password: '',
      intro: '',
      gender: 'male',
      isStudent: true,
      hobbies: []
    });
  }

  render () {
    const { username, password, intro, gender, isStudent, hobbies } = this.state;

    return (
      <form>
        <p>
          用户名:
          <input
            type="text"
            name="username"
            placeholder="用户名"
            value={ username }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          密码：
          <input
            type="password"
            name="password"
            placeholder="密码"
            value={ password }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <textarea
            name="intro"
            placeholder="自我介绍"
            value={ intro }
            onChange={ this.handleChange }
          />
        </p>
        <p>
          <select
            value={ gender }
            name="gender"
            onChange={ this.handleChange }
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </p>
        <p>
          是否是学生：
          是<input
              type="radio"
              name="isStudent"
              checked={ isStudent }
              onChange={ this.handleStudentChange.bind(this, true) }
            />
          | 
          否<input
              type="radio"
              name="isStudent"
              onChange={ this.handleStudentChange.bind(this, false) }
            />
        </p>
        <p>
          {
            this.hobbiesData.map(item => {
              return (
                <span  key={ item.value }>
                  { item.name }：
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={ item.value }
                    checked={ hobbies.includes(item.value) }
                    onChange={ this.handleHobbiesChange }
                  />|
                </span>
              )
            })
          }
        </p>
        <p>
          <button onClick={ this.handleSubmitClick }>登录</button>
          <button onClick={ this.handleResetClick } >重置</button>
        </p>
      </form>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

##  受控/非受控组件

### 应用场景

非受控组件：表单数据是不受控于 state，使用 React ref 从 DOM 节点中获取表单数据的组件。

```jsx
class App extends React.Component {
  constructor (props) {
    super(props);

  }

  handleSumbmitClick = (e) => {
    e.preventDefault();
    console.log(this.refs.usernameRef.value);
    console.log(this.refs.passwordRef.value);
  }

  handleResetClick = (e) => {
    e.preventDefault();
    this.refs.usernameRef.value = null;
    this.refs.passwordRef.value = null;
  }

  render () {
    return (
      <form onSubmit={ this.handleSumbmitClick }>
        <p>
          用户名：
          <input
            ref="usernameRef"
            type="text"
            placeholder="用户名"
          />
        </p>
        <p>
          密码：
          <input
            ref="passwordRef"
            type="password"
            placeholder="密码"
          />
        </p>
        <p>
          <button type="submit">登录</button>
          <button onClick={ this.handleResetClick }>重置</button>
        </p>
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

refs 已被弃用。建议使用 React.createRef。

```jsx
class App extends React.Component {
  constructor (props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  handleSumbmitClick = (e) => {
    e.preventDefault();

    console.log(this.usernameRef.current.value);
    console.log(this.passwordRef.current.value);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.usernameRef.current.value = null;
    this.passwordRef.current.value = null;
  }

  render () {
    return (
      <form onSubmit={ this.handleSumbmitClick }>
        <p>
          用户名：
          <input
            ref={ this.usernameRef }
            type="text"
            placeholder="用户名"
          />
        </p>
        <p>
          密码：
          <input
            ref={ this.passwordRef }
            type="password"
            placeholder="密码"
          />
        </p>
        <p>
          <button type="submit">登录</button>
          <button onClick={ this.handleResetClick }>重置</button>
        </p>
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

非受控组件，其他表单元素使用。

```jsx
class App extends React.Component {
  constructor (props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.genderRef = React.createRef();
  }

  handleSumbmitClick = (e) => {
    e.preventDefault();

    console.log(this.usernameRef.current.value);
    console.log(this.passwordRef.current.value);
    console.log(this.genderRef.current.value);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.usernameRef.current.value = null;
    this.passwordRef.current.value = null;
  }

  render () {
    return (
      <form onSubmit={ this.handleSumbmitClick }>
        <p>
          用户名：
          <input
            ref={ this.usernameRef }
            type="text"
            placeholder="用户名"
          />
        </p>
        <p>
          密码：
          <input
            ref={ this.passwordRef }
            type="password"
            placeholder="密码"
          />
        </p>
        <p>
          <select
            // from field 默认值 - 组件挂载完毕后进行更新，不会导致 的任何更新
            ref={ this.genderRef }
            defaultValue="female"
          >
            <option value="male" >男</option>
            <option value="female" >女</option>
          </select>
        </p>
        <p>
          <input type="radio" defaultChecked={ true } />
        </p>
        <p>
          <input type="checkbox" defaultChecked={ true } />
        </p>
        <p>
          <button type="submit">登录</button>
          <button onClick={ this.handleResetClick }>重置</button>
        </p>
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

非受控组件  文件上传

```jsx
class App extends React.Component {
  constructor (props) {
    super(props);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
    this.genderRef = React.createRef();
    this.fileRef = React.createRef();
  }

  handleSumbmitClick = (e) => {
    e.preventDefault();

    console.log(this.usernameRef.current.value);
    console.log(this.passwordRef.current.value);
    console.log(this.genderRef.current.value);
    console.log(this.fileRef.current.files[0]);
  }

  handleResetClick = (e) => {
    e.preventDefault();

    this.usernameRef.current.value = null;
    this.passwordRef.current.value = null;
  }

  render () {
    return (
      <form onSubmit={ this.handleSumbmitClick }>
        <p>
          用户名：
          <input
            ref={ this.usernameRef }
            type="text"
            placeholder="用户名"
          />
        </p>
        <p>
          密码：
          <input
            ref={ this.passwordRef }
            type="password"
            placeholder="密码"
          />
        </p>
        <p>
          <select
            // from field 默认值 - 组件挂载完毕后进行更新，不会导致 的任何更新
            ref={ this.genderRef }
            defaultValue="female"
          >
            <option value="male" >男</option>
            <option value="female" >女</option>
          </select>
        </p>
        <p>
          <input type="radio" defaultChecked={ true } />
          <input type="checkbox" defaultChecked={ true } />
        </p>
        <p>
          <input type="file" ref={ this.fileRef } />
        </p>
        <p>
          <button type="submit">登录</button>
          <button onClick={ this.handleResetClick }>重置</button>
        </p>
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

### 受控、非受控组件

非受控 inputs 很像传统的表单的 inputs。

文档地址：https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/。

## 父子组件数据关系与状态提升

用来解决两个组件（无父子关系）状态共享，并且同步数据变化。

```jsx
class Info extends React.Component {
  render () {
    const { username } = this.props;

    return (
      <div>
        <p>第{ this.props.inputNum }号：</p>
        <p>
          输入长度：{ username.length }
        </p>
        <p>
          提示：
          {
            username.length < 6 ? '长度必须大于等于 6 位' :
              username.length >= 6 && username < 12 ? '长度合法' : '长度必须小于 12'
          }
        </p>
      </div>
    )
  }
}

class UserNameInput extends React.Component {
  state = {
    username: ''
  }

  changeUserName = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  render () {
    return (
      <div>
        <Info
          username={ this.state.username }
          inputNum={ this.props.inputNum }
        />
        <div>
          <input
            type="text"
            onChange={ this.changeUserName }
          />
        </div>
      </div>
    )
  }
}

class App extends  React.Component {
  render () {
    return (
      <div>
        <UserNameInput inputNum={ 1 } />
        <UserNameInput inputNum={ 2 } />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

类组件调用实例化时，组件内部状态是唯一且独立的。

```jsx
function Info (props) {
  const { username } = props;

  return (
    <div>
      <p>第{ props.inputNum }号：</p>
      <p>
        输入长度：{ username.length }
      </p>
      <p>
        提示：
        {
          username.length < 6 ? '长度必须大于等于 6 位' :
            username.length >= 6 && username < 12 ? '长度合法' : '长度必须小于 12'
        }
      </p>
    </div>
  )
}

function UserNameInput (props) {
  const [username, setUsername] = React.useState('');

  const changeUserName = (e) => {
    setUsername(e.target.value);
  }

  return (
    <div>
      <Info
        username={ username }
        inputNum={ props.inputNum }
      />
      <div>
        <input
          type="text"
          onChange={ changeUserName }
        />
      </div>
    </div>
  )
}

function App () {
  return (
    <div>
      <UserNameInput inputNum={ 1 } />
      <UserNameInput inputNum={ 2 } />
    </div>
  )
}
```

组件嵌套与调用，和类组件还是函数组件没有关系。

类组件与函数组件相互嵌套使用没有任何问题。

```jsx
class Info extends React.Component {
  render () {
    const { username } = this.props;

    return (
      <div>
        <p>第{ this.props.inputNum }号：</p>
        <p>
          输入长度：{ username.length }
        </p>
        <p>
          提示：
          {
            username.length < 6 ? '长度必须大于等于 6 位' :
              username.length >= 6 && username < 12 ? '长度合法' : '长度必须小于 12'
          }
        </p>
      </div>
    )
  }
}

class UserNameInput extends React.Component {
  render () {
    return (
      <div>
        <Info
          username={ this.props.username }
          inputNum={ this.props.inputNum }
        />
        <div>
          <input
            type="text"
            onChange={ this.props.usernameChange }
          />
        </div>
      </div>
    )
  }
}

class App extends  React.Component {
  state = {
    username: ''
  }

  changeUserName = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  render () {
    return (
      <div>
        <UserNameInput
          username={ this.state.username }
          inputNum={ 1 }
          usernameChange={ this.changeUserName }
        />
        <UserNameInput
          username={ this.state.username }
          inputNum={ 2 }
          usernameChange={ this.changeUserName }
        />
      </div>
    )
  }
}
```

单向数据流，数据的流动都是从父到子，通过 props 向下传递数据。

props 是只读数据，props 对应的数据操作交由父组件完成，数据由父组件管理。

状态提升其实就是，本应该是子组件的状态，交给父组件来保存和操作。

## 组合和继承、CSS Module

### 包含组合

```jsx
class Container extends React.Component {
  render () {
    console.log(this.props);

    return (
      <div className="container">
        { this.props.children }
      </div>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <Container>
      </Container>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

如果 Container 内部有内容，React 会在 props 内部增加 children 属性。

* 如果 Container 内部有非元素内容，children 就是非元素内容。

```js
{"children":"123"}
```

* 如果 Container 内部有单个元素内容，children 是 React 元素对象。

```js
children: {$$typeof: Symbol(react.element), type: "h1", key: null, ref: null, props: {…}, …}
```

* 如果 Container 内部有多个元素内容，children 是 React 元素对象数组。

```js
children: (2) [{…}, {…}]
```

### 属性传递

```jsx
class Container extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          { this.props.header }
        </div>
        <div className="sidebar">
          { this.props.sidebar }
        </div>
        <div className="main">
          { this.props.main }
        </div>
      </div>
    )
  }
}

class Header extends React.Component {
  render () {
    return (
      <p>
        HEADER  
      </p>
    );
  }
}

class SideBar extends React.Component {
  render () {
    return (
      <p>
        SideBar
      </p>
    );
  }
}

class Main extends React.Component {
  render () {
    return (
      <p>
        Main
      </p>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <Container
        header={ <Header /> }
        sidebar={ <SideBar /> }
        main={ <Main /> }
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

props 可以传递任何内容，同样就可以传递组件。

vite 自带 CSS MODULE（CSS 模块化），可以导出 CSS，必须写成 xx.module.css 的形式。

```css
// index.module.css

html,
body {
  margin: 0;
  height: 100%;
}

h1,
p {
  margin: 0;
  font-weight: normal;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 60px;
  background-color: #000;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 220px;
  height: 100%;
  padding-top: 80px;
  box-sizing: border-box;
  background-color: orange;
}

.main {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 80px 0 0 320px;
  background-color: green;
  box-sizing: border-box;
}
```

```jsx
import styles from './index.module.css';

class Container extends React.Component {
  render () {
    return (
      <div className={ styles.container }>
        <div className={ styles.header }>
          { this.props.header }
        </div>
        <div className={ styles.sidebar }>
          { this.props.sidebar }
        </div>
        <div className={ styles.main }>
          { this.props.main }
        </div>
      </div>
    )
  }
}
```

为什么 JSX 可以通过 props 传递视图元素 React 元素？

JSX 本质上都会转成 React 元素（对象 Object），视图通过 props 传递的机制比较像 Vue 的 插槽，但是 React 并没有 slot 的概念定义。

React 本身就允许通过 props 传递任何类型的数据到子组件。

### 多层组合（模态框封装）

```css
.modal {
  position: fixed;
  top: 60px;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  box-shadow: 1px 3px 5px #999;
  border-radius: 10px;
  overflow: hidden;
}

.modalHeader {
  height: 44px;
  padding: 0 15px;
  box-sizing: border-box;
  line-height: 44px;
  background-color: orange;
}

.modalHeader h1 {
  font-size: 16px;
}

.modalContent {
  padding: 15px;
  box-sizing: border-box;
  background-color: #fff;
}
```

```jsx
import styles from './index.module.css';

function Modal (props) {
  return (
    <div className={ styles.modal }>
      <header className={ styles.modalHeader }>
        <h1>{ props.headerTitle }</h1>
      </header>
      <div className={ styles.modalContent }>
        { props.children  }
      </div>
    </div>
  )
}

function Alert (props) {
  return (
    <Modal
      headerTitle={ props.headerTitle }
    >
      <p>{ props.alertText }</p>
    </Modal>
  )
}

function WelcomeAlert () {
  return (
    <Alert
      headerTitle="欢迎你"
      alertText="尊贵的用户"
    />
  )
}

function LoginModal () {
  return (
    <Modal
      headerTitle="登录"
    >
      <form action="">
        <p>
          <input type="text" placeholder="用户名" />
        </p>
        <p>
          <input type="password" placeholder="密码" />
        </p>
        <p>
          <button>登录</button>
        </p>
      </form>
    </Modal>
  )
}

function App () {
  return (
    <div>
      <WelcomeAlert />
      <LoginModal />
    </div>
  )
}
```

### 继承

React 目前还没有发现有需要组件继承的需求。
因为通过 children 或者是传递视图 React 元素的方式完全可以解决组件组合的问题。
props 可以传递任何类型的数据，所以组合的方式完全可以替代继承方案。

逻辑部分需要继承或者共用，这个需要自己去逻辑抽离的模块、函数、类，单独进行模块导入使用。

## 代码分割、import 静动态导入

### 静动态导入对比

打包 - 整体打包成一个 bundle 的一个 JS 文件。
代码、模块是加载的时候不需要 -> 分割出来单独形成一个文件块 chunk。

模块懒加载，减少应用体积，减少加载时的体积。

模块：ES MODULE -> ES6 -> import export

import 导入模块、import 是一个 ES6 的模块化关键字，不是一个函数。

```js
import()
import
```

import 分为静态导入（static import）和动态导入（dynamic import）。
import 是可以被调用的，但是和普通函数是不同的，import 不是一个对象，只是一个关键字。

```js
import xxx from ''; // 静态导入模块
import (''); // 动态导入模块
```

import 类似于 typeof，typeof 和 typeof（）。

**static import**

模块静态导入。导入并加载时，导入的模块会被编译，不是按需编译。

**dynamic import**

模块动态导入。根据条件或按需导入。

### 动态导入应用场景

* 模块太大，使用可能性很低的模块是存在的，这些模块不需要马上加载；

* 模块的导入占用大量系统内存；

* 模块需要异步获取；

* 导入模块时需要动态的构建路径（说明符）；

  static import 只支持静态说明符，dynamic import 支持动态说明符。

  ```js
  import xx from './' + a + b + c + '.js'; // 不允许
  import('./' + a + b + c + '.js'); // 允许
  ```

* 模块中的代码需要程序触发某些条件才运行；

不能滥用动态导入。静态导入有利于初始化模块依赖关系，静态的程序分析和 tree shaking。

```jsx
// index.jsx

const oBtn = document.querySelector('#btn');

oBtn.onclick = async function () {
  const { default: Test } = await import('./index.module');
  const { plus } = await import('./index2.module');

  console.log(plus(1, 2));
  
  new Test();
}
```

```js
// index.module.js

class Test {
  constructor () {
    console.log('new Test')
  }
}

export default Test;
```

```js
// index2.module.js

export function plus (a, b) {
  console.log('a + b =', a + b);
  return a + b;
}
```

react 可以使用动态导入，实现代码分割的功能，按需加载、编译，减少打包体积。

### 动态导入使用限制

create react app 创建的工程，可以直接使用 import() 导入。

手动配置 webpack，需要自己配置。https://www.webpackjs.com/guides/code-splitting/。

如果使用 babel 解析 import()，必须安装 @babel/plugin-syntax-dynamic-import 插件。

## 代码分割 lazy、路由懒加载

### lazy、Suspense 

lazy 内置方法，Suspense React 内置组件，都挂载到 React 上。

lazy 是 React 提供的懒（动态）加载组件的方法。React.lazy()。

参数：函数 -> 动态导入组件（支持 Promise）。

减少打包体积、对初次渲染不适用的组件延迟加载。

依赖内置组件 Suspense，给 lazy 加上 loading 指示器组件的一个容器组件。

```jsx
class Loading extends React.Component {
  render () {
    return <div>Loading...</div>
  };
}

export default Loading;
```

```jsx
class Main extends React.Component {
  render () {
    return <div>Main</div>
  };
}

export default Main;
```

```jsx
import Loading from './loading';

const MainComponent = React.lazy(() => import('./main'));
class App extends React.Component {
  render () {
    return (
      <React.Suspense
        fallback={ <Loading /> }
      >
        <div>
          <MainComponent />
        </div>
      </React.Suspense>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

lazy 接收一个动态导入组件的函数，该函数返回一个 Promise。

Promise 会 resolve 一个默认导出的 React 组件。

```js
export default xxx
```

Suspense 目前只和 lazy 配合实现组件等待加载指示器的功能。不支持服务端渲染。

服务端渲染可以使用 Loadable Components。

```js
npm i @loadable/component
```

### 路由懒加载

index BrowserRouter

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Page1

```jsx
import React, { Component } from 'react';

class Page1 extends Component {
  render () {
    return <p>Page One</p>;
  }
}

export default Page1;
```

Page2

```jsx
import React, { Component } from 'react';

class Page2 extends Component {
  render () {
    return <p>Page Two</p>;
  }
}

export default Page2;
```

Page3

```jsx
import React, { Component } from 'react';

class Page3 extends Component {
  render () {
    return <p>Page Three</p>;
  }
}

export default Page3;
```

App

```jsx
import React, { Component, lazy, Suspense } from "react";
import { Switch, Route } from 'react-router';
import Loading from './Loading';

class App extends Component {
  render () {
    return (
      <Suspense
        fallback={ <Loading /> }
      >
        <div className="app">
          <Switch>
            <Route path="/page1" component={ lazy(() => import('./views/Page1')) } />
            <Route path="/page2" component={ lazy(() => import('./views/Page2')) } />
            <Route path="/page3" component={ lazy(() => import('./views/Page3')) } />
          </Switch>
        </div>
      </Suspense>
    )
  }
}

export default App;
```

## 错误边界与使用技巧

### 错误边界是什么

错误边界是 React 16 增加的特性。

防止某个组件的 UI 渲染错误导致整个应用崩溃。

子组件发生错误，有备用的渲染 UI。

错误边界其实是一个组件，这个组件只能用 class 组件来写。

错误边界针对的是渲染期间的错误，不是事件交互时的错误。

### getDerivedStateFromError

```jsx
class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError () {
    return { hasError: true };
  }

  render () {
    if (this.state.hasError) {
      return (
        <h1>This is Error UI</h1>
      );
    }

    return this.props.children;
  }
}

class Test extends React.Component {
  render () {
    return (
      <div>{ data.title }</div>
    )
  }
}

class Sub extends React.Component {
  render () {
    return (
      <p>This is content</p>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <Sub />
        <ErrorBoundary>
          <Test />
        </ErrorBoundary>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

Bound bind -> 绑定、带子、线 bund  
ou -> o -> i  ary 名词后缀，边界

static getDerivedStateFromError(error) 静态方法 

参数：子组件抛出的错误

返回值：新的 state

获取捕获到的错误状态，修改错误状态

作用：渲染备用的 UI

渲染阶段调用，不允许出现副作用 setTimeout 等。

无法捕获的场景:

* 事件处理函数

* 异步代码 setTimeout、ajax
* 服务端渲染场景
* 错误边界内部的错误

错误边界组件捕获错误的时机：

* 渲染时
* 生命周期函数中
* 组件树的构造函数中

### compoentDidCatch

```jsx
class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError (error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    console.log(error, info);
  }

  render () {
    if (this.state.hasError) {
      return (
        <h1>This is Error UI</h1>
      );
    }

    return this.props.children;
  }
}
```

compoentDidCatch(error, info) - 组件原型上的方法

边界错误组件捕获异常，并进行异常处理

作用：作用信息获取，运行副作用。

在组件抛出错误后调用。

参数：

* error 抛出的错误
* info 组件引发错误相关的信息，组件栈

```jsx
<ErrorBoundary2>
  <ErrorBoundary>
    <Test />
  </ErrorBoundary>
</ErrorBoundary2>
```

错误边界的组件存在冒泡机制，可以把错误向上抛。

如果多个嵌套错误边界组件，则从最里层错误出发，向上冒泡，触发捕获。

```jsx
class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  constructor (props) {
    super(props);

    window.onerror = function (err) {
      console.log(err);
    }
  }

  static getDerivedStateFromError (error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    console.log(error, info);
  }

  render () {
    if (this.state.hasError) {
      return (
        <h1>This is Error UI</h1>
      );
    }

    return this.props.children;
  }
}
```

> 错误边界可以冒泡到 window 上，生产环境错误不会冒泡。
>
> 错误边界仅可以捕获其子组件的错误。它无法捕获其自身的错误。

### 未捕获（Uncaught Errors）的新行为

未捕获的错误在 React 中应该如何处理。

自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。

把一个错误的 UI 显示出来比完全移除它更加糟糕。对于支付类应用来说，显示错误的金额也比不呈现任何内容糟糕。

增加错误边界能够让你在应用发生异常时提供更好的用户体验。

### 组件栈追踪

compoentDidCatch(error, info)

如何你没有使用 create-react-app，你可以添加 @babel/plugin-transform-react-jsx-source 插件到 Babel 配置中。

它仅用于开发环境，生产环境必须将其禁用。

### try/catch 问题

try/catch 只能用于命令式代码。

错误边界保留了 React 的生命性质，即使一个错误发生在 componentDidUpdate 方法中，并且由一个深层组件树的 setState 引起，其仍然能够冒泡到最近的错误边界。

### React 15 的命名修改

React 15 中有一个支持有限的错误边界方法，unstable_handlerError。此方法不再起作用。同时自 React 16 Beta 发布起你需要使用 componentDidCatch。

##代码分割之错误边界

### 懒加载，错误边界 混合使用

```jsx
class Loading extends React.Component {
  render () {
    return <div>Loading...</div>
  };
}

export default Loading;
```

```jsx
class ErrorBoundary extends React.Component {
  state = {
    hashError: false
  };

  static getDerivedStateFromError (err) {
    return {
      hashError: true
    };
  }

  componentDidCatch (error, info) {
    console.log(error, info);
  }

  render () {
    if (this.state.hashError) {
      return <h1>
        This is a Error UI
      </h1>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

```jsx
class Test extends React.Component {
  render () {
    return (
      <div>
        { data.title }
      </div>
    )
  }
}

export default Test;
```

```jsx
import Loading from './loading';
import ErrorBoundary from './ErrorBoundary';

const TestComponent = React.lazy(() => import('./index.module'));

class App extends React.Component {
  render () {
    return (
      <ErrorBoundary>
        <React.Suspense
          fallback={ <Loading /> }
        >
          <TestComponent />
        </React.Suspense>
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 命名导出

lazy 只支持 default 方式导出的组件。

```jsx
// Components
class Test1 extends React.Component {
  render () {
    return <h1>This is Test1</h1>
  }
}

class Test2 extends React.Component {
  render () {
    return <h1>This is Test2</h1>
  }
}

export {
  Test1,
  Test2
}
```

```jsx
// Test1.jsx
export {
  Test1 as default
} from './Compnents';

// Test2.jsx
export {
  Test2 as default
} from './Compnents';
```

```jsx
import Loading from './loading';

const Test1 = React.lazy(() => import('./modules/Test1'));
const Test2 = React.lazy(() => import('./modules/Test2'));

class App extends React.Component {
  render () {
    return (
      <React.Suspense
        fallback={ <Loading /> }
      >
        <Test1 />
        <Test2 />
      </React.Suspense>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## Context 使用场景

context 上下文	容器 -> 数据 -> 程序的多个地方传递数据。容器叫做上下文。

程序在执行的时候可访问的容器。



ThemeContext 

* Provider 供应方
* Comsumer 消费方 使用方



主题：

context.js

```js
const ThemeContext = React.createContext('black');

export {
  ThemeContext
}
```

index.tsx

```tsx
import { ThemeContext } from '../config/context';
import '../css/index.css';

class Header extends React.Component {
  render () {
    return (
      <ThemeContext.Consumer>
        {
          (theme) => (
            <header className={`header ${ theme }`}>
              { this.props.children }
            </header>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

class NavItem extends React.Component {
  render () {
    const { index, item } = this.props;

    return (
      <div className={ !index ? `item active` : 'item' }>
        { item }
      </div>
    )
  }
}

class BottomNav extends React.Component {
  render () {
    return (
      <div className="bottom-nav">
        {
          this.props.data.map((item, index) => {
            return (
              <NavItem
                item={ item }
                index={ index }
                key={ index }
              />
            )
          })
        }
      </div>
    );
  }
}

class Main extends React.Component {
  state = {
    navData: [
      '第①',
      '第②',
      '第③',
      '第④'
    ]
  }

  render () {
    return (
      <>
        <Header>标题</Header>
        <div style={{ marginTop: '88px' }}>
          <button onClick={() => this.props.themeChange('black')}>Black</button>
          <button onClick={() => this.props.themeChange('red')}>Red</button>
          <button onClick={() => this.props.themeChange('orange')}>Orange</button>
          <button onClick={() => this.props.themeChange('purple')}>Purple</button>
        </div>
        <BottomNav
          data={ this.state.navData }
        />
      </>
    );
  };
}

class  App extends React.Component {
  state = {
    theme: 'black'
  }

  themeChange (theme) {
    this.setState({
      theme
    });
  }

  render () {
    return (
      <ThemeContext.Provider
        value={this.state.theme}
      >
        <Main themeChange={ this.themeChange.bind(this) } />
      </ThemeContext.Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

index.css

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: #000;

  text-align: center;
  color: #fff;
  line-height: 44px;
}

.header.black {
  background-color: #000;
  color: #fff;
}

.header.red {
  background-color: red;
  color: #fff;
}

.header.orange {
  background-color: orange;
  color: #000;
}

.header.purple {
  background-color: purple;
  color: #fff;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background-color: #efefef;
}

.bottom-nav .item {
  float: left;
  width: 25%;
  height: 100%;
  text-align: center;
  line-height: 44px;
  font-size: 14px;
  color: #999;

}

.bottom-nav .item.active {
  color: #000;
}
```

## Context 与 组合的应用场景

Context 给整个组件树共享全局数据。

Context 会弱化及污染组件纯度，导致组件复用性降低。

```tsx
const CityContext = React.createContext({
  name: 'chengdu',
  text: '成都'
});

class App extends React.Component {
  state = {
    cityInfo: {
      name: 'chengdu',
      text: '成都'
    },
  }

  changeCity (cityInfo) {
    this.setState({
      cityInfo
    })
  }

  render () {
    return (
      <CityContext.Provider value={this.state.cityInfo}>
        <Header changeCity={this.changeCity.bind(this)} />
        <span>{ this.state.cityInfo.text }</span>
      </CityContext.Provider>
    );
  }
}

class Header extends React.Component {
  render () {
    return (
      <Selector changeCity={this.props.changeCity} />
    );
  }
}

class Selector extends React.Component {
  static contextType = CityContext;

  render () {
    return (
      <select
        value={ this.context.name }
        onChange={
          (e) => this.props.changeCity({
            name: e.target.value,
            text: e.target[e.target.selectedIndex].text
          })
        }
      >
        <option value="beijing">北京</option>
        <option value="chengdu">成都</option>
        <option value="shengzhen">深圳</option>
        <option value="hangzhou">杭州</option>
      </select>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

Context 适合杂乱无章的组件都需要同一些数据。单纯为了不层层传递属性，不建议使用 Context。

可以使用组合的方式解决层层传递属性的问题，不适合使用 Context。

```jsx
class Header extends React.Component {
  render () {
    return (
      <header>
        <h1>{ this.props.text }</h1>
        <div>{ this.props.citySelector }</div>
      </header>
    )
  }
}

class Selector extends React.Component {
  render () {
    return (
      <select
        value={ this.props.cityInfo.name }
        onChange={
          (e) => {
            this.props.changeCity({
              name: e.target.value,
              text: e.target[e.target.selectedIndex].text
            })
          }
        }
      >
        {
          this.props.cityData.map((item, index) => (
            <option
              key={ index }
              value={ item.name }
            >
              { item.text }
            </option>
          ))
        }
      </select>
    )
  }
}

class App extends React.Component {
  state = {
    title: '标题',
    cityInfo: {
      name: 'beijing',
      text: '北京'
    },
    cityData: [
      {
        name: 'chengdu',
        text: '成都'
      },
      {
        name: 'beijing',
        text: '北京'
      },
      {
        name: 'hangzhou',
        text: '杭州'
      },
      {
        name: 'shenzhen',
        text: '深圳'
      }
    ]
  }

  changeCity (cityInfo) {
    this.setState({
      cityInfo
    });
  }

  render () {
    return (
      <>
        <Header
          text={ this.state.title }
          citySelector={
            <Selector
              cityData={ this.state.cityData }
              cityInfo={ this.state.cityInfo }
              changeCity={ this.changeCity.bind(this) }
            />
          }
        />
        <span>{ this.state.cityInfo.text }</span>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## Context API

displayName

```js
// 用于 debugger 工具的显示名称
AContext.displayName = 'MyAContext';
```

React.createContext 创建一个指定的 Context 对象。

组件会找离自己最近的 Provider，获取其 value。

没有匹配到 Provider 就使用 defaultValue，其他情况均不使用默认参数。

Context.Provider：通过 React.createContext 创建在上下文对象里的一个组件。组件可以插入其他组件，订阅这个 Context。

通过 Provider 的 value 属性将数据传递给 Consumer 组件。

value 变化，插入 Provider 的组件都会重新渲染。 

```tsx
const AContext = React.createContext('default a');
const BContext = React.createContext('default b');

AContext.displayName = 'MyAContext';

class App extends React.Component {
  state = {
    a: 'a context',
    b: 'b context'
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        b: 'bb context'
      });
    }, 1000);
  }

  render () {
    return (
      <AContext.Provider value={this.state.a}>
        <BContext.Provider value={this.state.b}>
          <Test />
        </BContext.Provider>
      </AContext.Provider>
    );
  }
}

class Test extends React.Component {
  shouldComponentUpdate () {
    console.log('repaint');
  }

  render () {
    return (
      <AContext.Consumer>
        {
          value => (
            <BContext.Consumer>
              {
                value => (
                  <div>{ value }</div>
                )
              }
            </BContext.Consumer>
          )
        }
      </AContext.Consumer>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

new and old value -> comparing -> Object.is  相同的算法。Object.is 更具备现代开发的逻辑。



Consumer 使用 Provider 提供的 value，订阅 Context 的变更。

Consumer 内部使用函数作为子元素， function as a child。

函数接收 context 最近的 Provider 提供的 value。



如果没有 Provider，会寻找默认的 value。

```tsx
<AContext.Consumer>
  {
    value => (
      <BContext.Consumer>
        {
          value => (
            <div>{ value }</div>
          )
        }
      </BContext.Consumer>
    )
  }
</AContext.Consumer>

const AContext = React.createContext('default a'); // 显示 default a

<AContext.Provider value={this.state.a}>
  <Test />
</AContext.Provider>
```



```js
static contextType = CityContext;
// 将当前的环境下的 context 重新指定引用

=> 
static contextType; // 报错
```

不合法的静态属性 contextType，react 组件可以监控到是否是所需要的 contextType。

conextType 必须是由 React.createContext () 创建的 Context 对象。

> ES3 中静态属性是 Select.contextType。

context 在生命周期函数和 render 函数中都可以访问。

## 动态 Context 嵌套案例

```js
// config.js

export const btnStyle = {
  primary: {
    color: '#fff',
    backgroundColor: 'blue'
  },
  success: {
    color: '#fff',
    backgroundColor: 'green'
  },
  warning: {
    color: '#000',
    backgroundColor: 'orange'
  },
  danger: {
    color: '#fff',
    backgroundColor: 'red'
  },
};
```

```js
// context.js

import { btnStyle } from '../config';

export const BtnStyleContext = React.createContext({
  style: btnStyle.primary,
  doClick: () => {}
});

export const LoginStatusContext = React.createContext({
  status: false,
  login: () => {}
});
```

```jsx
// index.jsx

import { btnStyle } from "../config";
import { BtnStyleContext, LoginStatusContext } from '../config/context';

class Button extends React.Component {
  render () {
    return (
      <BtnStyleContext.Consumer>
        {
          ({ style, doClick }) => (
            <button
              style={style}
              onClick={ doClick }
              { ...this.props }
            />
          )
        }
      </BtnStyleContext.Consumer>
    );
  }
}

class Header extends React.Component {
  render () {
    return (
      <LoginStatusContext.Consumer>
        {
          ({ status, login }) => (
            <div className="header">
              <h1>Header</h1>
              <Button>Header({ status ? '已登录' : '未登录' })</Button>
              <button onClick= {login }>登录/注销</button>
            </div>
          )
        }
      </LoginStatusContext.Consumer>
    )
  }
}

class Main extends React.Component {
  render () {
    return (
      <LoginStatusContext.Consumer>
        {
          ({ status }) => (
            <div className="main">
              <h1>Main</h1>
              <Button>Main({ status ? '已登录' : '未登录' })</Button>
            </div>
          )
        }
      </LoginStatusContext.Consumer>
    )
  }
}

class Footer extends React.Component {
  render () {
    return (
      <LoginStatusContext.Consumer>
        {
          ({ status }) => (
            <div className="footer">
              <h1>Footer</h1>
              <Button>Footer({ status ? '已登录' : '未登录' })</Button>
            </div>
          )
        }
      </LoginStatusContext.Consumer>
    )
  }
}

class Home extends React.Component {
  render () {
    return (
      <div className="page-home">
        <Header />
        <hr />
        <Main />
        <hr />
        <Footer />
        <hr />
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    style: btnStyle.success,
    loginStatus: false,
  }

  doClick (e) {
    console.log(e.target.textContent);
  }

  login () {
    this.setState({
      loginStatus: !this.state.loginStatus
    });
  }

  render () {
    return (
      <div className="app">
        <BtnStyleContext.Provider
          value={{
            style: this.state.style,
            doClick: this.doClick
          }}
        >
          <LoginStatusContext.Provider
            value={{
              status: this.state.loginStatus,
              login: this.login.bind(this)
            }}
          >
            <Home />
          </LoginStatusContext.Provider>
        </BtnStyleContext.Provider>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## Fragment 和 短语法应用

Feagment -> React -> Rragment

document.createDocumentFeagment() 创建文档碎片。

```js
createElement div tds、div append tr
```

React 每一个组件都原则上都需要一个根节点。

React.Fragment -> 创建文档碎片



React.Fragment

```jsx
class Table extends React.Component {
  state = {
    headers: [
      'Name',
      'ID',
      'Age'
    ],
    info: [
      'yueluo',
      '2324324234',
      '23'
    ]
  }

  render () {
    return (
      <table border="1">
        <caption>Private Information</caption>
        <thead>
          <tr>
            <TableHeaders headers={ this.state.headers } />
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCells info={ this.state.info } />
          </tr>
        </tbody>
      </table>
    );
  }
}

class TableHeaders extends React.Component {
  render () {
    return (
      <React.Fragment>
        {
          this.props.headers.map((item, index) => (
            <th key={ index }>{ item }</th>
          ))
        }
      </React.Fragment>
    )
  }
}

class TableCells extends React.Component {
  render () {
    return (
      <React.Fragment>
        {
          this.props.info.map((item, index) => (
            <td key={index}>{ item }</td>
          ))
        }
      </React.Fragment>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <Table />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```



短语法：声明 React.Fragment

```jsx
class Table extends React.Component {
  state = {
    headers: [
      'Name',
      'ID',
      'Age'
    ],
    info: [
      'yueluo',
      '2324324234',
      '23'
    ]
  }

  render () {
    return (
      <table border="1">
        <caption>Private Information</caption>
        <thead>
          <tr>
            <TableHeaders headers={ this.state.headers } />
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCells info={ this.state.info } />
          </tr>
        </tbody>
      </table>
    );
  }
}

class TableHeaders extends React.Component {
  render () {
    return (
      <>
        {
          this.props.headers.map((item, index) => (
            <th key={ index }>{ item }</th>
          ))
        }
      </>
    )
  }
}

class TableCells extends React.Component {
  render () {
    return (
      <>
        {
          this.props.info.map((item, index) => (
            <td key={index}>{ item }</td>
          ))
        }
      </>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <Table />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```



短语法不支持 key，不支持任何属性。

React.Fragment 支持 key，不过现阶段只支持 key 属性，不支持其他属性。

```jsx
class StaffList extends React.Component {
  state = {
    list: [
      {
        id: 1,
        name: '小红',
        desc: '研发'
      },
      {
        id: 2,
        name: '小李',
        desc: '运维'
      },
      {
        id: 3,
        name: '小明',
        desc: '财务'
      },
      {
        id: 4,
        name: '小华',
        desc: '销售'
      },
    ]
  }

  render () {
    return (
      <dl>
        {
          this.state.list.map(({ id, name, desc }) => (
            // <>
            //   <dl>{ id }: { name }</dl>
            //   <dd>{ desc }</dd>
            // </>
            <React.Component key={ id }>
              <dl>{ id }: { name }</dl>
              <dd>{ desc }</dd>
            </React.Component>
          ))
        }
      </dl>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <StaffList />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## 高阶组件案例

Student List

```js
{ id, name grade }
```

Teacher List

```js
{
  id, name, subject, like
}
```



students.json

```json
[
  {
    "id": 1,
    "name": "小红",
    "grade": 1
  },
  {
    "id": 2,
    "name": "小明",
    "grade": 2
  },
  {
    "id": 3,
    "name": "小李",
    "grade": 3
  },
  {
    "id": 4,
    "name": "小杨",
    "grade": 4
  }
]
```

teachers.json

```json
[
  {
    "id": 1,
    "name": "yueluo",
    "subject": "JS",
    "like": 0
  },
  {
    "id": 2,
    "name": "heora",
    "subject": "CSS",
    "like": 0
  },
  {
    "id": 3,
    "name": "senen",
    "subject": "HTML",
    "like": 0
  }
]
```

express server

```js
const express = require('express');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Accept-Control-Allow-methods', 'POST,GET');
  next();
});

app.get('/getTeachers', function (req, res) {
  const teacherData = readFileSync(resolve(__dirname, './data/teachers.json'), 'utf8');
  res.send(teacherData);
});

app.get('/getStudents', function (req, res) {
  const studentData = readFileSync(resolve(__dirname, './data/students.json'), 'utf8');
  res.send(studentData);
});

app.listen(8080, () => {
  console.log('welcome to use Express.');
});
```

index.jsx

```jsx
class StudentList extends React.Component {
  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>年级</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.grade }</td>
                <td>
                  <button
                    onClick={() => this.props.removeStudent(item.id)}
                  >删除</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

class TeacherList extends React.Component {
  render () {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>科目</th>
            <th>喜欢</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.subject }</td>
                <td>{ item.like }</td>
                <td>
                  <button
                    onClick={() => this.props.likeTeacher(item.id)}
                  >
                    喜欢
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

const fetchListData = (field) => {
  let url = '';

  switch (field) {
    case 'student':
      url = 'http://localhost:8080/getStudents';
      break;
    case 'teacher':
      url = 'http://localhost:8080/getTeachers';
      break;
    default:
      break;
  }

  return axios(url);
}

class App extends React.Component {
  state = {
    studentList: [],
    teacherList: []
  }

  async componentDidMount () {
    const studentData = await fetchListData('student');
    const teacherData = await fetchListData('teacher');

    this.setState({
      studentList: studentData.data,
      teacherList: teacherData.data
    });
  }

  removeStudent (id) {
    this.setState({
      studentList: this.state.studentList.filter(item => item.id !== id)
    });
  }

  likeTeacher (id) {
    this.setState({
      teacherList: this.state.teacherList.map(item => {
        if (item.id === id) {
          item.like += 1;
        }
        return item;
      })
    });
  }

  render () {
    return (
      <div className="app">
        <StudentList
          data={ this.state.studentList }
          removeStudent={ this.removeStudent.bind(this) }
        />
        <TeacherList
          data={ this.state.teacherList }
          likeTeacher={ this.likeTeacher.bind(this) }
        />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```



=>

HOC （High Order Component）

HOC 不是 React 提供的 API，只是一种高级的设计模式。

HOC 是一个函数，接收一个组件参数，返回一个新组件。

普通组件返回的是 UI，HOC 返回的是一个新组件。

HOC 不能修改参数组件，只能传入组件所需要的 props。

HOC 是一个没有副作用的纯函数。

HOC 除了必须填入被包裹的组件参数以外，其余参数根据需求增加。

HOC 不关心数据如何使用，包裹组件不关心数据从哪里来。

HOC 和包裹组件直接唯一的契合点就是 props。

```tsx
class StudentList extends React.Component {
  render () {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>年级</th>
            <th>删除</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.grade }</td>
                <td>
                  <button
                    onClick={() => this.props.removeStudent(item.id)}
                  >删除</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

class TeacherList extends React.Component {
  render () {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>科目</th>
            <th>喜欢</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={ item.id }>
                <td>{ item.id }</td>
                <td>{ item.name }</td>
                <td>{ item.subject }</td>
                <td>{ item.like }</td>
                <td>
                  <button
                    onClick={() => this.props.likeTeacher(item.id)}
                  >
                    喜欢
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

const fetchListData = (field) => {
  let url = '';

  switch (field) {
    case 'student':
      url = 'http://localhost:8080/getStudents';
      break;
    case 'teacher':
      url = 'http://localhost:8080/getTeachers';
      break;
    default:
      break;
  }

  return axios(url);
}

function listHoc (WrapperComponent, fetchListData) {
  return class extends React.Component {
    state = {
      listData: []
    }

    removeStudent (id) {
      this.setState({
        listData: this.state.listData.filter(item => item.id !== id)
      });
    }

    likeTeacher (id) {
      this.setState({
        listData: this.state.listData.map(item => {
          if (item.id === id) {
            item.like += 1;
          }
          return item;
        })
      });
    }

    async componentDidMount () {
      const result = await fetchListData(this.props.field);

      this.setState({
        listData: result.data
      });
    }

    render () {
      return (
        <>
          {
            this.props.field === 'student' ? (
              <WrapperComponent
                data={ this.state.listData }
                removeStudent={ this.removeStudent.bind(this) }
              />
            ) : (
              <WrapperComponent
                data={ this.state.listData }
                likeTeacher={ this.likeTeacher.bind(this) }
              />
            )
          }
        </>
      )
    }
  }
}

const StudentListHoc = listHoc(StudentList, fetchListData);
const TeacherListHoc = listHoc(TeacherList, fetchListData);

class App extends React.Component {
  render () {
    return (
      <div className="app">
        <StudentListHoc field="student" />
        <TeacherListHoc field="teacher" />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## 高阶组件横切关注点及柯里化

横切关注点：react 最早使用 mixins 的思想，目前使用 HOC 解决横切关注点的问题。

对参数组件本身的逻辑状态与试图的横向切割。让 HOC 来完成逻辑和状态的管理，让参数组件来完成视图的渲染。

让 HOC 将数据与逻辑传递到参数组件中，从而完成关注点分离且有机结合的任务。

## 高阶组件使用注意事项与总结

```tsx
class MyInput extends React.Component {
  render () {
    return (
      <div>
        <h1>{ this.props.inputValue }</h1>
        <p>总计：{ this.props.b + this.props.c }</p>
        <input
          type="text"
          placeholder="请填写"
          value={ this.props.inputValue }
          onChange={ this.props.valueInput }
        />
      </div>
    );
  }
}

function InputHoc (WrapperComponent) {
  // WrapperComponent.prototype.componentDidUpdate = function () {
  // 高阶组件不可以修改参数组件，可能会导致参数组件内部逻辑执行失效
  // 一切的功能都可以在容器内实现
  // }

  class InputHocComponent extends React.Component {
    state = {
      inputValue: ''
    };

    valueInput (e) {
      this.setState({
        inputValue: e.target.value
      });
    }

    render () {
      // 如何排除参数组件不需要的属性
      const { a, ...props } = this.props; 

      return (
        <WrapperComponent
          inputValue={ this.state.inputValue }
          valueInput={ this.valueInput.bind(this) }
          { ...props }
        >

        </WrapperComponent>
      );
    }
  }

  InputHocComponent.displayName = "InputHoc";

  return InputHocComponent;
}

const MyInputHoc = InputHoc(MyInput);

class App extends React.Component {
  state = {
    a: 1,
    b: 2,
    c: 3
  }

  render () {
    return (
      <MyInputHoc {...this.state} />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

```tsx
function MyInput (props) {
  React.useEffect(() => {
    console.log('我是 MyInput');
  }, [props.inputValue]);

  return (
    <div>
      <h1>{ props.inputValue }</h1>
      <p>总计：{ props.b + props.c }</p>
      <input
        type="text"
        placeholder="请填写"
        value={ props.inputValue }
        onChange={ props.valueInput }
      />
    </div>
  );
}
```

高阶组件接收的参数组件可以是类组件，也可以是函数组件。



HOC 更加关注逻辑与状态的管理，参数组件的逻辑与状态的订阅。

参数组件主要关注视图与状态。

## Refs的应用场景与选用思考

Refs 允许访问我们的真实 DOM。

React 数据流，通过 props 实现父子组件的交互，Refs 允许用于强制修改子组件。

### 管理 input 焦点

通过一个按钮，清空 input value，input 聚焦。

```jsx
class MyInput extends React.Component {
  state = {
    inputValue: ''
  }

  constructor (props) {
    super(props);

    this.inputRef = React.createRef();
  }

  inputOperating () {
    const oInput = this.inputRef.current;

    oInput.focus();

    this.setState({
      inputValue: ''
    });
  }

  changeInputVal (e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  render () {
    return (
      <div>
        <input
          type="text"
          ref={ this.inputRef }
          value={ this.state.inputValue }
          onChange={ this.changeInputVal.bind(this) }
        />
        <button onClick={ this.inputOperating.bind(this) }>Button</button>
      </div>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <MyInput />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 媒体管理（播放、暂停）

```jsx
class MyVideo extends React.Component {
  constructor (props) {
    super(props);

    this.videoRef = React.createRef();
  }

  videoPlay () {
    this.videoRef.current.play();
  }

  videoPause () {
    this.videoRef.current.pause();
  }

  render () {
    return (
      <div>
        <video
          ref={ this.videoRef }
          src="https://data.yueluo.club/react"
          width="300"
          height="200"
          controls
        />
        <div>
          <button onClick={ this.videoPlay.bind(this) }>Play</button>
          <button onClick={ this.videoPause.bind(this) }>Pause</button>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <MyVideo />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 强制动画

```jsx

class MyBox extends React.Component {
  constructor (props) {
    super(props);

    this.boxRef = React.createRef();
  }

  boxExtend () {
    const oBox = this.boxRef.current;

    oBox.style.width = '500px';
    oBox.style.height = '500px';
  }

  render () {
    return (
      <>
        <div
          ref={ this.boxRef }
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'orange',
            transition: 'all 1s'
          }}
        ></div>
        <button onClick={ this.boxExtend.bind(this) }>Extend</button>
      </>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <MyBox />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 集成 DOM 库

使用 jQuery。

```jsx
class MyBox2 extends React.Component {
  constructor (props) {
    super(props);

    this.boxRef = React.createRef();
  }

  boxExtend () {
    const $box = $(this.boxRef.current);

    $box.animate({
      width: '500px',
      height: '500px'
    });
  }

  render () {
    return (
      <>
        <div
          ref={ this.boxRef }
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'orange',

          }}
        ></div>
        <button onClick={ this.boxExtend.bind(this) }>Extend</button>
      </>
    )
  }
}

class App extends React.Component {
  render () {
    return (
      <MyBox2 />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

### 模态框打开、关闭（bad case）

```jsx
class Modal extends React.Component {
  modalRef = React.createRef();

  constructor (props) {
    super(props);

    if (props.onRef) {
      props.onRef(this);
    }
  }

  open () {
    this.modalRef.current.style.display = 'block';
  }

  close () {
    this.modalRef.current.style.display = 'none';
  }

  render () {
    return (
      <div
        ref={ this.modalRef }
        style={{
          width: 300,
          border: '1px solid #000',
          display: 'none'
        }}
      >
        <h1>This is a Modal</h1>
        <p>This is a super Modal.</p>
      </div>
    )
  }
}

class App extends React.Component {
  modalOpen (status) {
    switch (status) {
      case 'open':
        this.modal.open();
        break;
      case 'close':
        this.modal.close();
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <div>
        <Modal onRef={ ref => (this.modal = ref) } />
        <div>
          <button onClick={ () => this.modalOpen('open') }>Open</button>
          <button onClick={ () => this.modalOpen('close') }>Close</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

没有必要使用 ref 操作模态框展示。我们可以用状态来操作组件的显示或者隐藏。

```jsx
class Modal extends React.Component {
  // modalRef = React.createRef();

  // constructor (props) {
  //   super(props);

  //   if (props.onRef) {
  //     props.onRef(this);
  //   }
  // }

  // open () {
  //   this.modalRef.current.style.display = 'block';
  // }

  // close () {
  //   this.modalRef.current.style.display = 'none';
  // }

  render () {
    return (
      <div
        // ref={ this.modalRef }
        style={{
          width: 300,
          border: '1px solid #000',
          // display: 'none'
          display: this.props.isOpen ? 'block' : 'none'
        }}
      >
        <h1>This is a Modal</h1>
        <p>This is a super Modal.</p>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    isOpen: false
  };

  modalOpen (status) {
    // switch (status) {
    //   case 'open':
    //     this.modal.open();
    //     break;
    //   case 'close':
    //     this.modal.close();
    //     break;
    //   default:
    //     break;
    // }
    this.setState({
      isOpen: status === 'open' ? true : false
    });
  }

  render () {
    return (
      <div>
        {/* <Modal onRef={ ref => (this.modal = ref) } /> */}
        <Modal isOpen={ this.state.isOpen } />
        <div>
          <button onClick={ () => this.modalOpen('open') }>Open</button>
          <button onClick={ () => this.modalOpen('close') }>Close</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

## React.createRef 用法与细节分析

createRef => React.createRef();

通过 createRef 可以创建一个 ref 对象，通过元素的 ref 属性可以附加到 React 元素上。

一般通过构造器给 this 上的属性赋值 ref，方便整个组件使用。

```jsx
class Test extends React.Component {
  constructor (props) {
    super(props);

    this.divRef = React.createRef();
  }

  render () {
    return (
      <div ref={ this.divRef } >{ this.props.children }</div>
    )
  }
}
```

ref 只要传递 React 元素中，就可以利用 ref 的 current 属性访问到真实 DOM 节点。

```jsx
class Test extends React.Component {
  constructor (props) {
    super(props);

    this.divRef = React.createRef();
  }

  render () {
    return (
      <div ref={ this.divRef } >{ this.props.children }</div>
    );
  }
}

class App extends React.Component {
  state = {
    text: 'Hello Ref'
  }

  render() {
    return (
      <Test>
        { this.state.text }
      </Test>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
```

ref 在 componentDidMount 和 componentDidUpdate 触发前更新。



ref 有不同的使用方式

* ref - html 元素上，current 就是真实 DOM 节点
* ref - class 组件上，current 指向组件的实例

```jsx
class App extends React.Component {
  state = {
    text: 'Hello Ref'
  }

  constructor (props) {
    super(props);

    this.testRef = React.createRef();
  }

  componentDidMount () {
    console.log(this.testRef);
  }

  render() {
    return (
      <Test
        ref={ this.testRef }
      >
        { this.state.text }
      </Test>
    );
  }
}
```

* ref - 函数组件（没有实例），createRef 附加不到组件上，无法使用，可以使用 React.useRef 。

```jsx
function Test2 () {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    console.log(divRef);
  }, []);

  return (
    <div ref={ divRef }>Hello, Function Ref</div>
  );
}
```

## Refs 转发机制与在高阶组件中的使用

