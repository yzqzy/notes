# Vue.js 设计与实现

## 一、框架设计概览

### 权衡的艺术

#### 命令式和声明式

视图层框架通常分为命令式和声明式，它们各有优缺点。


**命令式框架关注过程，比如早期的 jquery。**

```js
$('#app') // 获取 div
	.text('hello world') // 设置文本内容
  .on('click', () => { alert('ok') }); // 绑定点击事件 
```

自然语言描述可以与代码产生一一对应关系，代码本身的描述就是“做事的过程”。


**声明式框关注结果，以 vue.js 为例。**

```vue
<div @click="() => alert('ok')">hello world</div>
```

代码实现的功能与前段代码一致，但是我们只关心结果，不需要关心过程如何实现。
vue.js 帮我们封装了过程，vue.js 的内部实现是命令式的，暴露给用户的则是声明式。

声明式代码的性能不优于命令式代码的性能。使用命令式代码可以做到极致的性能优化，声明式代码不一定做到这一点。

```js
<!-- 之前 -->
div.textContent = 'hello world';

<!-- 之后 -->
div.textContent = 'hello vue3';
```

```vue
<!-- 之前 -->
<div @click="() => alert('ok')">hello world</div>

<!-- 之后 -->
<div @click="() => alert('ok')">hello vue3</div>
```

对于框架来说，它需要找到前后的差异并只更新变化的地方，使得编译后的代码更接近于原生 js，实现最优的性能。

声明式代码会把命令式代码多出很多性能消耗（compiler、diff），框架本身就是封装了命令式代码实现了面向用户的声明式。


#### 为什么 vue.js 要选择声明式的设计方案？

声明式代码的可维护性更强。

> 命令式代码开发时，我们需要维护实现目标的整个过程，包括 DOM 元素创建、更新、删除等；
> 声明式代码只需要关心我们想要的结果，中间过程不需要我们关心。
>
> 我们在做框架设计时也要考虑可维护性和性能之间的权衡。
> 采用声明式提升可维护性的同时，势必会损失一定性能。
> 作为框架设计者要做的就是，在保持可维护性的同时让性能损失最小化。

#### 虚拟 DOM 的性能到底如何？

采用虚拟 DOM 的更新技术的性能理论上不可能比原生 js 操作 DOM 更高。

大部分情况，我们很难写出绝对优化的命令式代码。尤其是应用程序规模很大，需要付出很多精力来做到极致优化。虚拟 DOM 解决的问题就是我们不用写大量声明式代码的前提下，能够保证应用程序的性能下限，让应用程序的性能不会太差，甚至接近于命令式代码性能。

#### 运行时和编译时

设计框架，我们有三种选择，纯运行时、运行时 + 编译时、编译时。


假设我们设计了一个框架，提供一个 Render 函数，需要提供树形结构的数据对象。

```js
const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}
```

```js
function Render(obj, root) {
  const el = document.createElement(obj.tag);
  
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    obj.children.forEach((child) => Render(child, el));
  }
  
  root.appendChild(el);
};

Render(obj, document.body);
```

上述代码就是一个纯 **运行时** 的框架，提供树形结构的数据对象渲染内容，不涉及任何额外步骤，用户不需要学习额外知识。

树形结构的数据对象太麻烦，而且不直观。
如果我们想用 HTML 标签的方式描述树形结构对象时，这时可以引入编译的手段，实现一个 Compiler。

```js
const hmtl = `
  <div>
    <span>hello world</span>
  </div>
`;

const obj = Compiler(hmtl);

Render(obj, document.body);
```

这时我们的框架就变成一个 **运行时 + 编译时** 的框架。既支持提供数据对象直接渲染，也可以提供 HTML 字符串编译后渲染。


**为什么不将 html 字符串直接编译成命令式代码？**

```html
<div>
	<span>hello world</span>
</div>
```

```js
const div = document.createElement('div');
const span = document.createElement('span');

span.innerText = 'hello world'
div.appendChild(span);

document.body.appendChild(div);
```

将 html 字符串编译成命令式代码，我们只需要一个 Compiler 函数就可以。这样其实就变成一个纯编译时的框架，我们不支持任何运行时内容，用户的代码通过编译器编译后才能运行。

纯运行时的框架，没有编译的过程，因此也没办法分析用户提供的内容；
运行时 + 编译时的框架，由于加入编译步骤，我们可以分析用户提供的内容，提取信息再传给 Render 函数，可以做进一步的优化；
纯编译时框架，也可以分析用户内容，可以直接将代码编译成可执行代码，因此性能可能会更好，但是不够灵活。

这三个方向业内都有探索，Svelte 就是纯编译时框架，它的真实性能可能达不到理论高度。vue.js 保持运行时 + 编译时的架构，在保持灵活性的基础上尽可能去优化。


#### 总结

命令式更加关注过程，声明式更加关注结果。
命令式理论上可以做到极致优化，但是用户要承担巨大的心智负担，
声明式能够减轻用户的心智负担，但是性能有一定牺牲，框架设计者需要想办法使性能损耗最小化。

声明式更新性能损耗 = 找出差异的性能消耗 + 直接修改的性能消耗。虚拟 DOM 的意义在于使找出差异的性能消耗最小化。

vue.js 是一个编译时 + 运行时的框架，它在保持灵活性的基础上，能够通过编译手段分析用户提供的内容，从而进一步提升更新性能。

### 框架设计的核心要素

框架设计远比想象复杂，并不是把功能开发完就算大功告成。

还需要考虑框架应该给用户提供哪些构建产物？产物的模块格式如何？用户以错误的方式使用框架，如何打印合适的警告信息，让用户快速定位问题？开发版本的构建和生产版本构建有何区别？热更新需要框架层面的支持，我们是否应该支持？你的框架提供多个功能，用户只需要其中几个功能，用户能否可以走到按需使用，从而减少资源打包体积？这都应该是我们在设计框架的过程中应该考虑的。


#### 提升用户开发体验

框架设计和开发过程中，提供友好的警告信息至关重要。
友好的警告信息不仅能够帮助用户快速定位问题，还能够让框架收获良好的口碑，让用户任何框架的专业性。

vue.js 源码 warn 函数

```js
warn(
	'Failed to moune app: mount target selector "${ container }" returned null.'
)
```

warn 函数，最终调用了 `console.warn` 函数。


除了提供必要警告信息，还有很多其他方面可以作为切入口，进一步提升用户开发体验。

```js
const count = ref(0);
console.log(count);
```

直接打印 count，我们会看到一个对象，而不是 `count.value` 的值。

vue.js 3 的源码中，可以搜到 `initCustomFormatter`  的函数，该函数用来在开发环境初始化自定义 formatter。

浏览器允许我们编写自定义的 formatter，以 Chrome 为例，我们可以打开 DevTools，勾选 Console => Enable custom formatters 选项。刷新浏览器再查看，就可以直接看到 `count.value`  的值。

<img src="./images/custom_formatters.png" style="zoom: 60%" />

#### 控制代码体积

框架的大小也是衡量框架的标准之一。
实现同样功能的前提下，编写的代码让燃石越少越好，这样体积就会越小，浏览器加载资源的时间也越少。

vue.js 源码，每一个 warn 函数的调用都会配置 `_DEV_` 常量的检查：

```js
if (__DEV__ && !res) {
  warn(
    'Failed to moune app: mount target selector "${ container }" returned null.'
  )
}
```

 vue.js 使用 rollup.js 对项目进行构建，这里的 `_DEV_`  是通过 rollup.js 的插件配置来预定义的，功能类似于 webpack 中的 DefinePlugin 插件。生产环境中，这段代码不会出现在最终产物中，在构建资源的时候就会被移除。

这样我们就可以做到开发环境中为用户提供友好的警告信息的同时，不会增加生产环境代码的体积。

#### 良好的 Tree-Shaking

vue.js 内置了很多组件，我们的项目并没有使用这么多组件，还有前面提到的变量的打印，生产环境不需要这些代码出现。

Tree-Shaking 就是消除那些永远都不会执行的代码，也就是排除 dead code，无论是 rollup.js 和 webpack，都支持 Tree-Shaking。

要想实现 Tree-Shaking，必须满足一个条件，模块必须要 ESM（ES Module），Tree-Shaking 依赖 ESM 的静态结果。

以 rollup.js 为例

```js
|- demo
|  - package.json
|  - input.js
|  - utils.js
```

```js
yarn add rollup -D
```

```js
// input.js
import { foo } from './utils.js';

foo();
```

```js
// utils.js
export function foo (obj) {
  obj && obj.foo;
}
export function bar (obj) {
  obj && obj.bar;
}
```

上述代码我们在 utils.js 中导出了两个函数，在 input.js 中我们只是用到 foo 函数。

```js
npx rollup input.js -f esm -o dist/bundle.js // rollup 构建
```

```js
// dist/bundle.js

function foo (obj) {
  obj && obj.foo;
}

foo();
```

编译后代码不包括 bar 函数，Tree-Shaking 起到了作用。但是还存在问题，我们只是读取了 foo 函数，并没有调用，为什么 rollup.js 为什么不把 `obj && obj.foo` 作为 dead code 移除？

这其实是 Tree-Shaking 的另一个关键点 - 副作用。

副作用就是当调用函数时会对外部产生影响。你可能会说，上面代码只是读取值，怎么会产生副作用？其实有这样一种场景，如果 obj 对象是一个通过 Proxy 创建的代理对象，当我们读取对象的值，就会触发代理对象的 get trap，get trap 中可能存在副作用。

JavaScript 作为一门动态预览，想要静态分析代码很困难，所以 rollup.js 这类工具都会提供一种机制，你可以很明确地告诉 rollup.js，这段代码不会产生副作用，可以移除它。

```js
// input.js

import { foo } from './utils.js';

/*#__PURE__*/ foo();
```

如果你搜索 vue.js 3 的源码，会发现它大量使用了该注释。

```js
export const isHtmlTag = /*#__PURE__*/ makeMap(HTML_TAGS);
```

通常产生副作用的代码都是模块内函数的顶级调用。

```js
foo(); // 顶级调用

function bar () {
  foo(); // 函数内调用
}
```

对于顶级调用，可能会产生副作用；对于函数调用来说，只要函数 bar 没有被调用，那么就不会产生副作用。

在 vue.js 3 的源码中，基本都是在一些顶级调用的函数中使用 `/*__PURE__*/` 注释。该注释不仅可以作用于函数，还可以作用于任何语句。该注释也可以被 webpack 及 terser 识别。

#### 如何输出构建产物

vue.js 会为开发环境和生产环境输出不同的包。
vue.global.js 用于开发环境，它包含必要的警告信息；vue.gobal.prod.js 用于生产环境，不包含警告信息。
vue.js 构建产物不仅仅存在环境上的区分，还会根据使用场景的不同输出其他形式的产物。

不同类型的产物一定有对应的需求背景。

当用户希望可以直接在 HTML 页面中使用 `<script>` 标签引入框架并使用。
我们需要输出一种 `IIFE` 格式的资源。`IIFE`  的全称是 `Immediately Invoked Function Expression` ，即 "立即调用函数"。

```js
(function () {
  // ...
}());
```

vue.global.js 文件就是 `IIFE` 形式的资源。

```js
var Vue = (function (exports) {
  // ...
  exports.createApp = createApp;
  // ...
}({}));
```

在 rollup.js 中，我们可以配置 `format: 'iife'` 来输出这种形式的资源。

```js
// rollup.config.js

const config = {
  input: 'input.js',
  output: {
    file: 'output.js',
    format: 'iife'
  }
};

export default config;
```

目前主流浏览器基础都支持 ESM，所以用户还可以引入 ESM 格式的资源。

vue.js 3 的 vue.esm-browser.js 文件，可以使用 `<script type="module">` 标签引入。

```html
<script type="module" src="/vue.esm-browser.js"></script>
```

除了 vue.esm-browser.js 文件，vue.js 还会输出 vue.esm-bundler.js 文件。

vue.esm-bundler.js 是提供给 rollup.js 或 webpack 等打包工具使用的，通常配置在 `package.json` 中的 `module` 字段。

```js
{
  "main": "index.js",
  "module": "dist/vue.runtime.esm-bundler.js"
}
```

它们之间有何区别？

例如上文中提到的 `__DEV__`  常量，当构建用于 `<script>` ESM 资源时，开发环境 `__DEV__` 为 true，生产环境 `__DEV__` 为 false。

当打包提供给打包工具的 ESM 资源时，需要使用 `(process.env.NODE_ENV !== 'production')`  替换 `__DEV__` 常量。

```js
// browser.js

if (__DEV__) {
  warn('useCssModule() is not supported in the global build.');
}
```

```JS
// -bundler.js

if ((process.env.NODE_ENV !== 'production')) {
	warn('useCssModule() is not supported in the global build.');
}
```

用户可以通过 webpack 配置自行决定构建资源的目标环境，最终效果一致，这段代码也只会出现在开发环境中。

用户可能还希望在 Node.js 中通过 require 语句引用资源。

```js
const Vue = require('vue');
```

当进行服务端渲染时，vue.js 的代码是在 Node.js 环境中运行的。这时就需要输出 CommonJS 的资源格式，简称 cjs。

```js
// rollup.config.js

const config = {
  input: 'input.js',
  output: {
    file: 'output.js',
    format: 'cjs'
  }
};

export default config;
```

#### 特性开关

设计框架时，框架还会提供诸多特性（功能），假设我们提供 A、B、C 三个特性给用户，同时还提供 a、b、c 三个对应的特性开关。

* 对于用户关闭的特性，我们可以利用 Tree-Shaking 机制让其不包含在最终的资源中；
* 该机制为可以让框架设计更加灵活，可以通过特性开关为框架添加新的特性，不用担心资源体积变大。当框架升级时，我们也可以通过特性开关支持遗留 API，而新用户可以选择不使用遗留 API，使最终打包的资源体积最小化。

特性开关和上文提供的 `__DEV__` 常量一样，可以利用 rollup.js 的预定义常量插件来实现。

```js
{
  __FEATURE_OPTIONS_API__: isBundlerESMBuild ? '__VUE_OPTIONS_API' : true,
}
```

`__FEATURE_OPTIONS_API__` 类似于 `__DEV__`，vue.js 3 的源码中，有很多类似与如下代码的判断分支。

```js
// support for 2.x options
if (__FEATURE_OPTIONS_API__) {
  currentInstance = instance;
  pauseTracking();
  applyOptions(instance, Component);
  resetTreacking();
  currentInstance = null;
}
```

vue.js 构建资源时，如果构建服务于打包工具的资源（带有 _bundler 字样的资源），上述代码就会变成：

```js
// support for 2.x options
if (__VUE_OPTIONS_API__) {
  currentInstance = instance;
  pauseTracking();
  applyOptions(instance, Component);
  resetTreacking();
  currentInstance = null;
}
```

`__VUE_OPTIONS_API__` 就是一个特性开关，用户可以通过设置 `__VUE_OPTIONS_API__` 预定义常量的值控制是否包含这段代码。

```js
// webpack.DefinePlugin 插件配置
new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: JSON.stringify(true) // 开启特性
})
```

我们可以通过配置 `__VUE_OPTIONS_API__` 特性开关决定是否可以使用选项 API 的方式编写代码。如果明确知道自己不会使用选项 API，可以关闭此特性，这样在打包的时候 vue.js 的这部分代码就不会包含在最终资源中，减小打包体积。

#### 错误处理

