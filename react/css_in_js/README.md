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

## Emotion 库

Emotion 是一个旨在使用 JavaScript 编写 CSS 样式的库。

```js
npm install @emotion/core @emotion/styled -S
```

### css 属性支持的两种方式

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

根据 props 属性覆盖样式。下面是模板字符串和对象形式的样式覆盖的使用方法。

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 100px;
  height: 30px;
  background: ${ props => props.bgColor || 'orange' };
  border: none;
`;

const Container = styled.div(props => ({
  width: props.width || 1000,
  padding: 20,
  margin: '0 auto',
  background: 'pink',
}));

function App () {
  return (
    <Container width={ 500 }>
      <Button bgColor="green">按钮</Button>
    </Container>
  );
}

export default App;
```

对象形式还可以这样使用。

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  width: 100px;
  height: 30px;
  background: ${ props => props.bgColor || 'orange' };
  border: none;
`;

const Container = styled.div({
  width: 1000,
  padding: 20,
  margin: '0 auto',
  background: 'pink',
}, props => ({
  width: props.width,
  background: props.background
}));

function App () {
  return (
    <Container width={ 500 }>
      <Button bgColor="green">按钮</Button>
    </Container>
  );
}

export default App;
```

### 组件附加样式

```jsx
import React from 'react';
import styled from '@emotion/styled';

function Demo ({ className }) {
  return (
    <div className={ className }>Demo</div>
  )
}

const Demo01 = styled(Demo)`
  color: orange;
`;
const Demo02 = styled(Demo)({
  color: 'green'
});

function App () {
  return (
    <div>
      <Demo01 />
      <Demo02 />
    </div>
  );
}

export default App;
```

### 为特定组件附加样式

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Child = styled.div`
  color: red;
`;

const Parent = styled.div`
  ${ Child } {
    color: blue;
  }
`;

function App () {
  return (
    <div>
      <Child>child</Child>
      <Parent>
        <Child>child</Child>
      </Parent>
    </div>
  );
}

export default App;
```

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Child = styled.div({
  color: 'red'
});

const Parent = styled.div({
  [Child]: {
    color: 'blue'
  }
});

function App () {
  return (
    <div>
      <Child>child</Child>
      <Parent>
        <Child>child</Child>
      </Parent>
    </div>
  );
}

export default App;
```

### css 选择器 &

& 表示组件本身

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 200px;
  height: 200px;
  background: orange;
  color: green;

  &:hover {
    background: blue;
  }

  & > span {
    color: yellow;
  }
`

function App () {
  return (
      <Container>
        container
        <span>span</span>
      </Container>
  );
}

export default App;
```

### 样式化组件属性 as

要使用组件中的样式，但要更改要呈现的元素，可以使用 as 属性。

```jsx
import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  color: red;
`;

function App () {
  return (
    <Button as="a" href="//yueluo.club" >button</Button>
  );
}

export default App;
```

### 样式组合

样式组合中，后调用的样式优先级高于先调用的样式。

```jsx
import React from 'react';
import { css } from '@emotion/react';

const base = css`
  background: orange'
  color: white;
`;

const danger = css`
  color: red;
  background: pink;
`

function App () {
  return (
    <div css={[ base, danger ]}>App works</div>
  );
}

export default App;
```

### Global 组件

#### 全局样式

```jsx
import React from 'react';
import { Global, css } from '@emotion/react';

const styles = css`
  body {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: red;
  }
`;

function App () {
  return (
    <div>
      <Global styles={ styles } />
      <span>span</span>
      <a href="http://baidu.com">a标签</a>
    </div>
  );
}

export default App;
```

### 关键帧动画

```jsx
import React from 'react';
import { css, keyframes } from '@emotion/react';

const move = keyframes`
  0% {
    background: orange;
    left: 0;
    top: 0;
  }

  100% {
    background: green;
    left：600px;
    top: 300px;
  }
`;

const box = css`
  width: 100px;
  height: 100px;
  position: absolute;
  animation: ${ move } 2s ease infinite;
`;

function App () {
  return (
    <div css={ box }>
      App Works
    </div>
  );
}

export default App;
```

### 创建主题

```jsx
npm install emotion-theming -D
```

