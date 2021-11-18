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

**Space**

使用 Space 可以自定义项目间距，这些间距值可以由 padding、margin 和 top、left、right、bottom 样式引用。

```jsx
console.log(theme.space); 

//{"1":"0.25rem","2":"0.5rem","3":"0.75rem","4":"1rem","5":"1.25rem","6":"1.5rem","7":"1.75rem","8":"2rem","9":"2.25rem","10":"2.5rem","12":"3rem","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","44":"11rem","48":"12rem","52":"13rem","56":"14rem","60":"15rem","64":"16rem","72":"18rem","80":"20rem","96":"24rem","px":"1px","0.5":"0.125rem","1.5":"0.375rem","2.5":"0.625rem","3.5":"0.875rem"}
```

```jsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function App () {
  return (
    <Box mt="6" w="2xs" h="10" bgColor="orange.200">
      <Text>Test</Text>
    </Box>
  );
}

export default App;
```

**Sizes**

使用 Sizes 可以自定义元素大小，这些值可以由 width、height 和 maxWidth、minWidth 等样式引用。

```jsx
console.log(theme.sizes); 

//{"1":"0.25rem","2":"0.5rem","3":"0.75rem","4":"1rem","5":"1.25rem","6":"1.5rem","7":"1.75rem","8":"2rem","9":"2.25rem","10":"2.5rem","12":"3rem","14":"3.5rem","16":"4rem","20":"5rem","24":"6rem","28":"7rem","32":"8rem","36":"9rem","40":"10rem","44":"11rem","48":"12rem","52":"13rem","56":"14rem","60":"15rem","64":"16rem","72":"18rem","80":"20rem","96":"24rem","px":"1px","0.5":"0.125rem","1.5":"0.375rem","2.5":"0.625rem","3.5":"0.875rem","max":"max-content","min":"min-content","full":"100%","3xs":"14rem","2xs":"16rem","xs":"20rem","sm":"24rem","md":"28rem","lg":"32rem","xl":"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem","8xl":"90rem","container":{"sm":"640px","md":"768px","lg":"1024px","xl":"1280px"}}
```

### 响应式断点

Breakpoints。配置响应数组值中使用的默认断点，这些值将用于生成移动优先（即最小宽度）的媒体查询。

```jsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function App () {
  return (
    <Box mt="6" w={["100px", "300px", "500px", "700px", "1000px"]} h="10" bgColor="orange.200">
      <Text>Test</Text>
    </Box>
  );
}

export default App;
```

## 标准 chakra-ui 组件

```jsx
import React from 'react';
import { chakra } from '@chakra-ui/react';

const MyButton = chakra('button', {
  baseStyle: {
    borderRadius: 'lg',
    px: 4,
    py: 2,
    fontSize: '12px',
    bgColor: 'blue.500',
    color: 'white'
  }
});

function App () {
  return (
    <div>
      <MyButton>按钮</MyButton>
    </div>
  );
}

export default App;
```

## 全局化 chakra-ui 组件样式

* src 文件夹中创建 component-styles 文件夹用于放置自定义 Chakra-UI 组件
* 在 component-styles 文件夹中创建 button.js 文件并将组件样式放置于当前文件并进行默认导出

```js
const ButtonStyle = {
  baseStyle: {
    borderRadius: 'lg'
  },
  sizes: {
    sm: {
      px: 3,
      py: 1,
      fontSize: '12px'
    },
    md: {
      px: 4,
      py: 2,
      fontSize: '14px'
    }
  },
  variants: {
    primary: {
      bgColor: 'blue.500',
      color: 'white'
    },
    danger: {
      bgColor: 'red.500',
      color: 'white'
    }
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary'
  }
}

export default ButtonStyle;
```

* 在 component-styles 文件夹中创建 index.js 文件用于导入导出所有的自定义组件

```js
import Button from './button';

export {
  Button
}
```

* 在 src 文件夹中的 index.js 文件中导入自定义 Chakra-UI 组件并和 components 属性进行合并

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import { Button } from './component-styles/index';

const theme = extendTheme({
  components: {
    Button
  }
});

ReactDOM.render(
  <ChakraProvider theme={ theme } >
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
```

* 在组件中使用样式化组件

```jsx
import React from 'react';
import { Button } from '@chakra-ui/react';

function App () {
  return (
    <div>
      <Button variant="danger" size="md">按钮</Button>
    </div>
  );
}

export default App;
```

## 构建注册表单

```js
npm install react-icons --save
```

index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, CSSReset, theme } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider theme={ theme } >
    <CSSReset />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
```

App.js

```jsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Form from './components/form';

function App () {
  return (
    <Box w={ 500 } h={ 500 } margin="30px auto">
      <Form />
    </Box>
  );
}

export default App;
```

components/form.js

```jsx
import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  Select,
  Switch,
  FormLabel,
  Flex,
  Button
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck } from 'react-icons/fa';

export default function Form () {
  return (
    <form>
      <Stack spacing="6">
        <FormControl isDisabled isInvalid>
          <InputGroup>
            <InputLeftAddon children={ <FaUserAlt /> } />
            <Input placeholder="请输入用户名" />
          </InputGroup>
          <FormHelperText fontSize="xs">用户名是必填项</FormHelperText>
        </FormControl>
        <InputGroup>
          <InputLeftAddon children={ <FaLock /> } />
          <Input type="password" placeholder="请输入密码" />
          <InputRightAddon children={ <FaCheck /> } />
        </InputGroup>
        <RadioGroup defaultValue="0">
          <Stack direction="row" spacing="4">
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </Stack>
        </RadioGroup>
        <Select placeholder="请选择学科">
          <option value="Java">Java</option>
          <option value="大前端">大前端</option>
        </Select>
        <Flex>
          <Switch id="deal" mr="3" />
          <FormLabel htmlFor="deal">是否同意协议</FormLabel>
        </Flex>
        <Button _hover={{ bgColor: 'tomato' }} colorScheme="teal">注册</Button>
      </Stack>
    </form>
  )
}
```

## 选项卡组件的使用方式

