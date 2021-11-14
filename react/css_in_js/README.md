# CSS-IN-JS

集成 CSS 代码在 JavaScript 文件。

## 存在原因

CSS-IN-JS 时 WEB 项目中将 CSS 代码捆绑在 JavaScript 代码中的解决方案。

这种方案旨在解决 CSS 的局限性，例如缺乏动态功能，作用域和可移植性。

## 优缺点

### 优点

* 让 CSS 代码拥有独立的作用域，阻止 CSS 代码泄露到组件外部，防止样式冲突；
* 让组件更具有可移植性，实现开箱即用，轻松创建低耦合的应用程序；
* 让组件更具有可重用性只需要编写一次，可以在任何地方运行，不仅可以在同一应用程序中重用组件，而且可以在使用相同框架构建的其他应用程序中重用组件；
* 让样式具有动态功能，可以将复杂的逻辑应用于样式规则，如果要创建需要动态功能的复杂 UI，它是理想的方案。

### 缺点

* 为项目增加了额外的复杂性；
* 自动生成的选择器大大降低了代码的可读性。

## 支持  css 属性的两种方式

## Emotion 库

Emotion 是一个旨在使用 JavaScript 编写 CSS 样式的库。

```js
npm install @emotion/core @emotion/styled -S
```

### css 属性支持

```js
import React from 'react';

function App () {
  return (
    <div css={{ width: 200, height: 200, background: 'orange' }}>App</div>
  );
}

export default App;

```

通知 babel，不再需要将 JSX 语法转换为 React.createElement 方法，而是需要转换为 JSX 方法。

|        | 输入                       | 输出                                                 |
| ------ | -------------------------- | ---------------------------------------------------- |
| Before | `<img src="avator.png" />` | `Reactc.createElement('img', { src: 'avator.png' })` |
| After  | `<img src="avator.png" />` | `jsx('img', { src: 'avator.png' })`                  |

#### JSX Pragma

```jsx
/** @jsx jsx */
import { jsx } from '@emotion/core';
```

#### Babel Preset

```js
npm run eject
```

```js
npm i @emotion/babel-preset-css-prop -D
```

package.json

```js
"presets": [
  "react-app",
  "@emotion/babel-preset-css-prop"
]
```

### css 方法

#### String Styles

推荐使用。

```js
import React from 'react';
import { css } from '@emotion/react';

const style = css`
  width: 200px;
  height: 200px;
  background: orange
`;

function App () {
  return (
    <div css={ style }>App</div>
  );
}

export default App;
```

#### Oject Styles

```jsx
import React from 'react';
import { css } from '@emotion/react';

const style = css({
  width: 200,
  height: 200,
  background: 'orange'
});

function App () {
  return (
    <div css={ style }>App</div>
  );
}

export default App;
```

### css 优先级

props 对象中的 css 属性优先级高于组件内部的 css 属性。调用组件时可以覆盖组件默认样式。

components/Css

```jsx
import React from 'react';
import { css } from '@emotion/react';

const style = css`
  width: 200px;
  height: 200px;
  background: orange;
`;

function Css (props) {
  return (
    <div
      css={ style }
      { ...props }
    >
      CSS
    </div>
  )
}

export default Css
```

App.js

```js
import React from 'react';
import Css from './components/CSS';
import { css } from '@emotion/react';

const style = css({
  background: 'blue'
});

function App () {
  return (
    <div>
      <Css css={ style } />
      App works
    </div>
  );
}

export default App;
```

### 样式化组件

#### 基础使用

样式化组件就是用来构建用户界面，是 emotion 库提供的另一种为元素添加样式的方式。

> 样式编写同样支持模板字符串和对象的方式。

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 100px;
  height: 30px;
  background: orange;
  border: none;
`;

const Container = styled.div`
  width: 1000px;
  padding: 20px;
  margin: 0 auto;
  background: pink;
`;

function App () {
  return (
    <Container>
      <Button>按钮</Button>
      App works
    </Container>
  );
}

export default App;
```

#### 默认样式处理

根据 props 属性覆盖样式。

**字符串类型样式覆盖**



**对象类型样式覆盖**
