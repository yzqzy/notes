# Chakra-UI

Chakra UI 是一个简单的，模块化的易于理解的 UI 组件库，提供了丰富的构建 React 应用所需的 UI 组件。

文档：https://next.chakra-ui.com/docs/getting-started

* Chakra UI 内置 Emotion，是 CSS-IN-JS 解决方案的集大成者
* 基于 Styled-Systems https://styled-system.com/
* 支持开箱即用的主题功能
* 默认支持白天和黑夜两种模式
* 拥有大量功能丰富且有用的组件
* 使响应式设计变的轻而易举
* 文档清晰且全面，查找 API 更加容易
* 适用于构建用于展示的给用户的界面
* 框架正在变得越来越完善

## 快速开始

```js
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4
```

index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme, ChakraProvider, CSSReset } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <App theme={ theme } />
  </ChakraProvider>,
  document.getElementById('root')
);
```

App.js

```jsx
import React from 'react';
import { Button } from '@chakra-ui/react';

function App () {
  return (
    <div>
      <Button>按钮</Button>
    </div>
  );
}

export default App;
```

## 样式属性

Style Props 是用来更改组件样式的，通过为组件传递属性的方式实现。通过传递简化的样式属性以达到提升开发效率的目的。

也可以查看文档：https://chakra-ui.com/docs/features/style-props。

| 样式属性         | css属性                      | 主题    |
| ---------------- | ---------------------------- | ------- |
| m,margin         | margin                       | space   |
| mx               | margin-left & margin-right   | space   |
| p,padding        | padding                      | space   |
| py               | padding-top & padding-bottom | space   |
| bg               | background                   | colors  |
| bgColor          | background-color             | colors  |
| color            | color                        | colors  |
| border           | border                       | borders |
| textAlign        | text-aligin                  | none    |
| w,width          | width                        | sizes   |
| boxSize          | width & height               | sizes   |
| d,display        | display                      | none    |
| pos,position     | postion                      | none    |
| left             | left                         | space   |
| shadow,boxShadow | box-shdow                    | shadows |

```jsx
import React from 'react';
import { Button, Box } from '@chakra-ui/react';

function App () {
  return (
    <Box w={ 200 } h={ 100 } bgColor="orange">
      <Button>按钮</Button>
    </Box>
  );
}

export default App;
```

## 颜色模式（color mode）

chakra-ui 提供的组件都支持两种颜色模式，浅色模式（light）和暗色模式（dark），可以通过 useColorMode 进行颜色模式的更改。

Chakra 将颜色模式存储在 localStorage 中，并使用类名策略来确保颜色模式是持久的。

```jsx
import React from 'react';
import { Button, Box, Text, useColorMode } from '@chakra-ui/react';

function App () {
  const { colorMode, toggleColorMode } = useColorMode();

  console.log(colorMode);

  return (
    <Box w={ 200 } h={ 100 } bgColor={ colorMode === 'light' ? 'tomato' : 'skyblue' }>
      <Text>{ colorMode }</Text>
      <Button onClick={ toggleColorMode }>按钮</Button>
    </Box>
  );
}

export default App;
```

## useColorModelValue

根据颜色模式设置样式。

chakra 允许在为元素设置样式时根据颜色模式产生不同值，通过 useColorModeValue 钩子函数实现。

```jsx
import React from 'react';
import { Button, Box, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';

function App () {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('tomato', 'skyblue');

  return (
    <Box w={ 200 } h={ 100 } bgColor={ bgColor }>
      <Text>{ colorMode }</Text>
      <Button onClick={ toggleColorMode }>按钮</Button>
    </Box>
  );
}

export default App;
```

## 强制组件的颜色模式

使组件不受颜色模式的影响，始终保持在某个颜色模式下的样式。

```jsx
import React from 'react';
import { Button, Box, Text, useColorMode, useColorModeValue, LightMode } from '@chakra-ui/react';

function App () {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('tomato', 'skyblue');

  return (
    <Box w={ 200 } h={ 100 } bgColor={ bgColor }>
      <Text>{ colorMode }</Text>
      <Button onClick={ toggleColorMode }>按钮</Button> <br />
      <LightMode>
        <Button onClick={ toggleColorMode }>按钮</Button>
      </LightMode>
    </Box>
  );
}

export default App;
```

## 颜色模式通用设置

**设置默认颜色模式**

通过 theme.config.initialColorMode 可以设置应用使用的默认主题

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme, ChakraProvider, CSSReset } from '@chakra-ui/react';

theme.config.initialColorMode = 'dark';

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <App theme={ theme } />
  </ChakraProvider>,
  document.getElementById('root')
);
```

**使用操作系统所使用的颜色模式**

通过 theme.config.useSystemColorMode 可以设置将应用的颜色模式设置为操作系统所使用的颜色模式

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme, ChakraProvider, CSSReset } from '@chakra-ui/react';

theme.config.useSystemColorMode = true;

ReactDOM.render(
  <ChakraProvider>
    <CSSReset />
    <App theme={ theme } />
  </ChakraProvider>,
  document.getElementById('root')
);
```

## 主题对象

### 颜色

设置颜色时，可以但不限于取主题中提供的颜色值。

```js
console.log(theme.colors); 
```

```jsx
console.log(JSON.stringify(theme.colors.red));

//{"50":"#FFF5F5","100":"#FED7D7","200":"#FEB2B2","300":"#FC8181","400":"#F56565","500":"#E53E3E","600":"#C53030","700":"#9B2C2C","800":"#822727","900":"#63171B"}
```

```jsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function App () {
  return (
    <Box w={ 200 } h={ 100 } bgColor="orange.200">
      <Text>Test</Text>
    </Box>
  );
}

export default App;
```

### 间距和大小

### 响应式断点
