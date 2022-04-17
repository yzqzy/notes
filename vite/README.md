# Vite

## 从零搭建 Vite 前端项目

### 项目搭建

#### 使用 pnpm

```js
npm i -g pnpm
```

```js
pnpm config set registry https://registry.npmmirror.com/
```

#### 项目初始化

```js
pnpm create vite
```

> framework：react、variant：react-ts

```js
// 进入项目目录
cd vite-project
// 安装依赖
pnpm install
// 启动项目
pnpm run dev
```

#### 目录结构

项目目录结构如下:

```js
.
├── index.html
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── favicon.svg
│   ├── index.css
│   ├── logo.svg
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

在项目根目录中有一个`index.html`文件，这个文件十分关键，因为 Vite 默认会把项目根目录下的`index.html`作为入口文件。
也就是说，当你访问`http://localhost:3000`的时候，Vite 的 Dev Server 会自动返回这个 HTML 文件的内容。我们来看看这个 HTML 究竟写了什么:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

这个 HTML 文件的内容非常简洁，在 `body` 标签中除了 id 为 root 的根节点之外，还包含了一个声明了`type="module"`的 `script` 标签:

```js
<script type="module" src="/src/main.tsx"></script>
```

由于现代浏览器原生支持了 ES 模块规范，因此原生的 ES 语法也可以直接放到浏览器中执行，只需要在 script 标签中声明 `type="module"` 即可。比如上面的 script 标签就声明了 type="module"，同时 src 指向了`/src/main.tsx`文件，此时相当于请求了`http://localhost:3000/src/main.tsx`这个资源，Vite 的 Dev Server 此时会接受到这个请求，然后读取对应的文件内容，进行一定的中间处理，最后将处理的结果返回给浏览器。

我们可以来看看 `main.tsx` 的内容:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

你可能会诧异: 浏览器并不识别 tsx 语法，也无法直接 import css 文件，上面这段代码究竟是如何被浏览器正常执行的呢？

这就归功了 Vite Dev Server 所做的“中间处理”了，也就是说，在读取到 `main.tsx`文件的内容之后，Vite 会对文件的内容进行编译，大家可以从 Chrome 的网络调试面板看到编译后的结果:

```js
var _jsxFileName = "D:\\workspace\\notes\\vite\\vite-project\\src\\main.tsx";
import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=d559f595";
const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react;
import __vite__cjsImport1_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=d559f595";
const ReactDOM = __vite__cjsImport1_reactDom_client.__esModule ? __vite__cjsImport1_reactDom_client.default : __vite__cjsImport1_reactDom_client;
import App from "/src/App.tsx";
import "/src/index.css";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=d559f595";
const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */
_jsxDEV(React.StrictMode, {
    children: /* @__PURE__ */
    _jsxDEV(App, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 8,
        columnNumber: 5
    }, this)
}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 7,
    columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxTQUFTQyxXQUFXQyxTQUFTQyxlQUFlLE1BQXhCLENBQXBCLEVBQXNEQyxPQUNwRCx3QkFBQyxNQUFNLFlBQVA7QUFBQSxZQUNFLHdCQUFDLEtBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERiIsIm5hbWVzIjpbIlJlYWN0RE9NIiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwic291cmNlcyI6WyJEOi93b3Jrc3BhY2Uvbm90ZXMvdml0ZS92aXRlLXByb2plY3Qvc3JjL21haW4udHN4Il0sImZpbGUiOiJEOi93b3Jrc3BhY2Uvbm90ZXMvdml0ZS92aXRlLXByb2plY3Qvc3JjL21haW4udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbS9jbGllbnQnXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJ1xuaW1wb3J0ICcuL2luZGV4LmNzcydcblxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpISkucmVuZGVyKFxuICA8UmVhY3QuU3RyaWN0TW9kZT5cbiAgICA8QXBwIC8+XG4gIDwvUmVhY3QuU3RyaWN0TW9kZT5cbilcbiJdfQ==
```

Vite 会将项目的源代码编译成浏览器可以识别的代码，与此同时，一个 import 语句即代表了一个 HTTP 请求，如下面两个 import 语句:

```js
import "/src/index.css";
import App from "/src/App.tsx";
```

在 Vite 项目中，一个`import 语句即代表一个 HTTP 请求`。上述两个语句则分别代表了两个不同的请求，Vite Dev Server 会读取本地文件，返回浏览器可以解析的代码。当浏览器解析到新的 import 语句，又会发出新的请求，以此类推，直到所有的资源都加载完成。

现在，你应该知道了 Vite 所倡导的`no-bundle`理念的真正含义:  **利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载**，而不是**先整体打包再进行加载**。相比 Webpack 这种必须打包再加载的传统构建模式，Vite 在开发阶段省略了繁琐且耗时的打包过程，这也是它为什么快的一个重要原因。

#### 配置文件

在使用 Vite 的过程，我们需要对 Vite 做一些配置，以满足日常开发的需要。你可以通过两种方式来对 Vite 进行配置，一是通过命令行参数，如`vite --port=8888`，二是通过配置文件，一般情况下，大多数的配置都通过配置文件的方式来声明。

Vite 当中支持多种配置文件类型，包括`.js`、`.ts`、`.mjs`三种后缀的文件，实际项目中一般使用 `vite.config.ts `作为配置文件，以脚手架项目中的配置为例，具体的配置代码如下:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
```

可以看到配置文件中默认在 `plugins` 数组中配置了官方的 react 插件，来提供 React 项目编译和热更新的功能。

接下来，我们可以基于这个文件完成更加丰富的配置。例如我们可以修改页面入口文件 `index.html`  的位置。

页面的入口文件`index.html`并不在项目根目录下，而需要放到 `src` 目录下，如何在访问`localhost:3000`的时候让 Vite 自动返回 src 目录下的`index.html`呢？我们可以通过`root`参数配置项目根目录的位置:

```js
// vite.config.ts
import { defineConfig } from 'vite'
// 引入 path 包注意两点:
// 1. 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
// 2. tsconfig.node.json 中设置 `allowSyntheticDefaultImports: true`，以允许下面的 default 导入方式
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // 手动指定项目根目录位置
  root: path.join(__dirname, 'src')
  plugins: [react()]
})
```

当手动指定`root`参数之后，Vite 会自动从这个路径下寻找`index.html`文件，也就是说当我直接访问 `localhost:3000`的时候，Vite 从`src`目录下读取入口文件，这样就成功实现了刚才的需求。

#### 生产环境构建

有人说`Vite`因为其不打包的特性而不能上生产环境，其实这种观点是相当有误的。

在开发阶段 Vite 通过 Dev Server 实现了不打包的特性，而在生产环境中，Vite 依然会基于 Rollup 进行打包，并采取一系列的打包优化手段。从脚手架项目的`package.json`中就可见一斑：

```js
"scripts": {
  // 开发阶段启动 Vite Dev Server
  "dev": "vite",
  // 生产环境打包
  "build": "tsc && vite build",
  // 生产环境打包完预览产物
  "preview": "vite preview"
}
```

相信你已经注意到其中的`build`命令了，没错，这个命令就是 Vite 专门用来进行生产环境打包的。但可能你会有点疑惑，为什么在`vite build`命令执行之前要先执行`tsc`呢？

`tsc` 作为 TypeScript 的官方编译命令，可以用来编译 TypeScript 代码并进行类型检查，而这里的作用主要是用来做类型检查，我们可以从项目的`tsconfig.json`中注意到这样一个配置:

```js
{
  "compilerOptions": {
    // 省略其他配置
    // 1. noEmit 表示只做类型检查，而不会输出产物文件
    // 2. 这行配置与 tsc --noEmit 命令等效
    "noEmit": true,
  },
}
```

虽然 Vite 提供了开箱即用的 TypeScript 以及 JSX 的编译能力，但实际上底层并没有实现 TypeScript 的类型校验系统，因此需要借助 `tsc` 来完成类型校验(在 Vue 项目中使用 `vue-tsc` 这个工具来完成)，在打包前提早暴露出类型相关的问题，保证代码的健壮性。

你可以试着执行一下这个打包命令:

```js
PS D:\workspace\notes\vite\vite-project> pnpm run build

> vite-project@0.0.0 build D:\workspace\notes\vite\vite-project
> tsc && vite build

vite v2.9.5 building for production...
✓ 34 modules transformed.
dist/assets/logo.ecc203fb.svg    2.61 KiB
dist/index.html                  0.44 KiB
dist/assets/index.62f502b0.css   0.75 KiB / gzip: 0.48 KiB
```

此时 Vite 已经生成了最终的打包产物，我们可以通过 `pnpm run preview` 命令预览一下打包产物的执行效果。

```js
PS D:\workspace\notes\vite\vite-project> pnpm run preview

> vite-project@0.0.0 preview D:\workspace\notes\vite\vite-project
> vite preview

  > Local: http://localhost:4173/
  > Network: use `--host` to expose
```

在浏览器中打开`http://localhost:5000`地址，你将看到和开发阶段一样的页面内容，证明我们成功完成第一个 Vite 项目的生产环境构建。

#### 总结

本节中我们一起搭建了基本的前端开发环境，安装常用的编辑器、浏览器、Node.js 环境及包管理器 pnpm，接着我和你使用 Vite 的初始化命令创建一个 React 项目并成功启动，让你真切地体验到 Vite 的快速和轻量。

项目启动之后我也与你分析了项目背后的启动流程，强调了 `一个 import 语句代表一个 HTTP 请求`，而正是 Vite 的 Dev Server 来接收这些请求、进行文件转译以及返回浏览器可以运行的代码，从而让项目正常运行。

不仅如此，我还带你一起初步接触了 Vite 的配置文件，并尝试进行生产环境的打包，为下一节的学习作下了铺垫。

### CSS 工程化方案

#### 样式方案的意义

对初学者来说，谈到开发前端的样式，首先想到的便是直接写原生 CSS。
但时间一长，难免会发现原生 CSS 开发的各种问题。那么，如果我们不用任何 CSS 工程方案，又会出现哪些问题呢？

**开发体验** 欠佳。比如原生 CSS 不支持选择器的嵌套:

```js
// 选择器只能平铺，不能嵌套
.container .header .nav .title .text {
  color: blue;
}

.container .header .nav .box {
  color: blue;
  border: 1px solid grey;
}
```

**样式污染 **问题。如果出现同样的类名，很容易造成不同的样式互相覆盖和污染。

```js
// a.css
.container {
  color: red;
}

// b.css
// 很有可能覆盖 a.css 的样式！
.container {
  color: blue;
}
```

**浏览器兼容** 问题。为了兼容不同的浏览器，我们需要对一些属性(如`transition`)加上不同的浏览器前缀，比如 `-webkit-`、`-moz-`、`-ms-`、`-o-`，意味着开发者要针对同一个样式属性写很多的冗余代码。

打包后的 **代码体积** 问题。如果不用任何的 CSS 工程化方案，所有的 CSS 代码都将打包到产物中，即使有部分样式并没有在代码中使用，导致产物体积过大。

针对如上原生 CSS 的痛点，社区中诞生了不少解决方案，常见的有 5 类。

* `CSS 预处理器`：主流的包括 `Sass/Scss`、`Less` 和 `Stylus`。这些方案各自定义了一套语法，让 CSS 也能使用嵌套规则，甚至能像编程语言一样定义变量、写条件判断和循环语句，大大增强了样式语言的灵活性，解决原生 CSS 的 **开发体验问题**；
* `CSS Modules`：能将 CSS 类名处理成哈希值，这样就可以避免同名的情况下 **样式污染** 的问题；
* CSS 后处理器  `PostCSS`，用来解析和处理 CSS 代码，可以实现的功能非常丰富，比如将 `px` 转换为 `rem`、根据目标浏览器情况自动加上类似于 `--moz--`、`-o-` 的属性前缀等等；
* `CSS in JS` 方案，主流的包括  `emotion`、`styled-components`  等等，顾名思义，这类方案可以实现直接在 JS 中写样式代码，基本包含 `CSS 预处理器` 和  `CSS Modules`  的各项优点，非常灵活，解决了开发体验和全局样式污染的问题；
* CSS 原子化框架，如 `Tailwind CSS`、`Windi CSS`，通过类名来指定样式，大大简化了样式写法，提高了样式开发的效率，主要解决了原生 CSS **开发体验**的问题。

不过，各种方案没有孰优孰劣，各自解决的方案有重叠的部分，但也有一定的差异，大家可以根据自己项目的痛点来引入。

#### CSS 预处理器

Vite 本身对 CSS 各种预处理器语言(`Sass/Scss`、`Less`和`Stylus`)做了内置支持。也就是说，即使你不经过任何的配置也可以直接使用各种 CSS 预处理器。我们以 `Sass/Scss` 为例，来具体感受一下 Vite 的 `零配置` 给我们带来的便利。

由于 Vite 底层会调用 CSS 预处理器的官方库进行编译，而 Vite 为了实现按需加载，并没有内置这些工具库，而是让用户根据需要安装。因此，我们首先安装 Sass 的官方库，安装命令如下:

```js
pnpm i sass -D
```

然后，在上一节初始化后的项目中新建  `src/components/Header` 目录，并且分别新建`index.tsx` 和 `index.scss`文件，代码如下:

```js
// index.tsx
import './index.scss';
export function Header() {
  return <p className="header">This is Header</p>
};

// index.scss
.header {
  color: red;
}
```

这样就完成了一个最简单的 demo 组件。接着我们在 `App.tsx` 应用这个组件:

```js
import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import { Header } from './components/Header';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <Header />
       	// ...
      </header>
    </div>
  )
}

export default App
```

现在你可以执行`pnpm run dev`，然后到浏览器上查看效果。接下来我们封装一个全局的主题色，新建`src/variable.scss`文件，内容如下:

```scss
// variable.scss
$theme-color: red;
```

然后，我们在原来 Header 组件的样式中应用这个变量:

```scss
@import "../../variable";

.header {
  color: $theme-color;
}
```

回到浏览器访问页面，可以看到样式依然生效。你可能会注意到，每次要使用`$theme-color`属性的时候我们都需要手动引入`variable.scss`文件，那有没有自动引入的方案呢？这就需要在 Vite 中进行一些自定义配置了，在配置文件中增加如下的内容:

```js
// vite.config.ts
import { defineConfig, normalizePath } from 'vite'
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from 'path';
import react from '@vitejs/plugin-react'

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
})
```

现在你可以直接在文件中使用全局文件的变量，相当于之前手动引入的方式显然方便了许多:

```scss
.header {
  color: $theme-color;
}
```

同样的，你可以对 `less`和`stylus`进行一些能力的配置，如果有需要你可以去下面的官方文档中查阅更多的配置项:

- [Sass](https://link.juejin.cn/?target=https%3A%2F%2Fsass-lang.com%2Fdocumentation%2Fjs-api%2Fmodules%23render)
- [Less](https://link.juejin.cn/?target=https%3A%2F%2Flesscss.org%2Fusage%2F%23less-options)
- [Stylus](https://link.juejin.cn/?target=https%3A%2F%2Fstylus-lang.com%2Fdocs%2Fjs.html)

#### CSS Modules

CSS Modules 在 Vite 也是一个开箱即用的能力，Vite 会对后缀带有`.module`的样式文件自动应用 CSS Modules。接下来我们通过一个简单的例子来使用这个功能。

首先，将 Header 组件中的 `index.scss` 更名为 `index.module.scss`，然后稍微改动一下 `index.tsx` 的内容，如下:

```js
// index.tsx
import styles from './index.module.scss';
export function Header() {
  return <p className={styles.header}>This is Header</p>
};
```

现在打开浏览器，可以看见 p 标签的类名已经被处理成了哈希值的形式:

```js
._header_gxlcr_1 {
    color: red;
}
```

说明现在 CSS Modules 已经正式生效了！同样的，你也可以在配置文件中的`css.modules`选项来配置 CSS Modules 的功能，比如下面这个例子:

```js
import { defineConfig, normalizePath } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    }
  }
})
```

再次访问页面，我们可以发现刚才的类名已经变成了我们自定义的形式:

```js
// html
<p class="index-module__header___IdNfn">This is Header</p>

// css
.index-module__header___IdNfn {
    color: red;
}
```

这是一个 CSS Modules 中很常见的配置，对开发时的调试非常有用。其它的一些配置项不太常用，大家可以去这个 [地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmadyankin%2Fpostcss-modules) 进行查阅。

#### PostCSS

一般你可以通过  `postcss.config.js` 来配置 postcss ，不过在 Vite 配置文件中已经提供了 PostCSS 的配置入口，我们可以直接在 Vite 配置文件中进行操作。

首先，我们来安装一个常用的 PostCSS 插件 —— `autoprefixer`:

```js
pnpm i autoprefixer postcss -D
```

这个插件主要用来自动为不同的目标浏览器添加样式前缀，解决的是浏览器兼容性的问题。接下来让我们在 Vite 中接入这个插件:

```js
import { defineConfig, normalizePath } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react()],
  css: {
 		// ...
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
})

```

配置完成后，我们回到 Header 组件的样式文件中添加一个新的 CSS 属性:

```js
.header {
  color: $theme-color;
  text-decoration: dashed;
}
```

你可以刷新浏览器或者执行`pnpm run build`命令进行打包，可以看到产物中自动补上了浏览器前缀，如:

```css
.index-module__header___IdNfn {
    color: red;
    -webkit-text-decoration: dashed;
    -moz-text-decoration: dashed;
    text-decoration: dashed;
}
```

由于有 CSS 代码的 AST (抽象语法树)解析能力，PostCSS 可以做的事情非常多，甚至能实现 CSS 预处理器语法和 CSS Modules，社区当中也有不少的 PostCSS 插件，除了刚刚提到的 `autoprefixer` 插件，常见的插件还包括:

- [postcss-pxtorem](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcuth%2Fpostcss-pxtorem)： 用来将 px 转换为 rem 单位，在适配移动端的场景下很常用。
- [postcss-preset-env](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcsstools%2Fpostcss-preset-env): 通过它，你可以编写最新的 CSS 语法，不用担心兼容性问题。
- [cssnano](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fcssnano%2Fcssnano): 主要用来压缩 CSS 代码，跟常规的代码压缩工具不一样，它能做得更加智能，比如提取一些公共样式进行复用、缩短一些常见的属性值等等。

关于 PostCSS 插件，这里还给大家推荐一个站点：[www.postcss.parts/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.postcss.parts%2F) ，你可以去里面探索更多的内容。

#### CSS In JS

社区中有两款主流的 `CSS In JS`  方案:  `styled-components` 和 `emotion`。

对于 CSS In JS 方案，在构建侧我们需要考虑 `选择器命名问题`、`DCE`(Dead Code Elimination 即无用代码删除)、`代码压缩`、`生成 SourceMap`、`服务端渲染(SSR)`等问题，而 `styled-components` 和 `emotion` 已经提供了对应的 babel 插件来解决这些问题，我们在 Vite 中要做的就是集成这些 babel 插件。

具体来说，上述的两种主流 CSS in JS 方案在 Vite 中集成方式如下:

```js
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          "babel-plugin-styled-components"
          // 适配 emotion
          "@emotion/babel-plugin"
        ]
      },
      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      jsxImportSource: "@emotion/react"
    })
  ]
})
```

#### CSS 原子化框架

在目前的社区当中，CSS 原子化框架主要包括 `Tailwind CSS` 和  `Windi CSS`。Windi CSS 作为前者的替换方案，实现了按需生成 CSS 类名的功能，开发环境下的 CSS 产物体积大大减少，速度上比`Tailwind CSS v2`快 20~100 倍！当然，Tailwind CSS 在 v3 版本也引入 [JIT(即时编译)](https://link.juejin.cn/?target=https%3A%2F%2Fv2.tailwindcss.com%2Fdocs%2Fjust-in-time-mode) 的功能，解决了开发环境下 CSS 产物体积庞大的问题。接下来我们将这两个方案分别接入到 Vite 中，在实际的项目中你只需要使用其中一种就可以了。

##### Windi CSS

首先安装 `windicss` 及对应的 Vite 插件:

```js
pnpm i windicss vite-plugin-windicss -D
```

