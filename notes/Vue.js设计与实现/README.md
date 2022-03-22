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
实现同样功能的前提下，编写的代码越少越好，这样体积就会越小，浏览器加载资源的时间也越少。

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

错误处理是框架开发过程中非常重要的环节。框架错误处理机制的好坏直接决定用户应用程序的健壮性，决定用户开发体验的好坏。

```js
// utils.js
export default {
  foo (fn) {
    fn && fn();
  }
}
```

该模块导出一个对象。如果用户在使用 foo 函数 过程中传入的毁掉函数执行出错，要怎么办？

第一个办法是用户自行处理，需要用户执行 try...catch。

```js
import utils from 'utils.js';

utils.foo(() => {
  try {
    // ...
  } catch (e) {
    // ...
  }
});
```

但是这会增加用户负担。如果 utils.js 提供了很多函数，用户都需要逐一添加错误处理程序。

第二个办法是我们代替用户统一处理错误。

```js
// utils.js
export default {
  foo (fn) {
    try {
      fn && fn();
    } catch (error) { }
  },
  bar (fn) {
    try {
      barfn && bar();
    } catch (error) { }
  }
}
```

每个函数都增加 try...catch，我们还可以优化下。

```js
export default {
  foo (fn) {
    callWithErrorHandling(fn);
  },
  bar (fn) {
    callWithErrorHandling(fn);
  }
}

function callWithErrorHandling (fn) {[
  try {
    fn && fn();
  } catch (error) {
    console.log(error);
  }
]}
```

代码变的简洁很多。但简洁不是目的，这样做的好处是我们可以为用户提供统一的错误处理接口。

```js
let handleError = null;

export default {
  foo (fn) {
    callWithErrorHandling(fn);
  },
  bar (fn) {
    callWithErrorHandling(fn);
  },
  // 用户注册错误处理函数
  registerErrorHandler (fn) {
    handleError = fn;
  }
}

function callWithErrorHandling (fn) {[
  try {
    fn && fn();
  } catch (error) {
    // 抛出错误
    handleError && handleError(error);
  }
]}
```

我们提供 registerErrorHandler 函数，用户可以使用它注册错误处理程序。这时错误处理的能力交由用户控制，即可以选择忽略错误，也可以调用上报程序将错误上报给监控系统。

其实这就是 vue.js 错误处理的原理，你可以在源码中搜索到 callWithErrorHandling 函数。
另外，在 vue.js 中，我们也可以注册统一的错误处理函数。

```js
import App from 'App.vue';

const app = createApp(App);

app.config.errorHandler = () => {
  // 错误处理程序
}
```

#### typescript 支持

ts，它是 js 的超集，能够为 js 提供类型支持。使用 ts 的好处有很多，如编译器自动提示、一定程度避免低级 bug、代码的可维护强。因此对 ts 的支持是否完善也是评价一个框架的重要指标。

如何衡量一个框架对 ts 类型的支持水平？并不是只要是使用 ts 编写框架，就等价于对 ts 类型支持友好。

```js
function foo (val: any) {
  return val;
}
```

这个函数很简单，接收参数 val 并返回该参数，返回值的类型是由参数决定的。上述代码显然不能满足我们的要求，正确的做法如下。

```js
function foo<T extends any>(val: T) {
  return val;
}
```

编写大型框架时，想要做到完善的 ts 类型支持很不容易，vue.js 源码中的 `runtime-core/src/apiDefineComponent.ts`文件，整个文件真正会在浏览器中中运行的代码其实只有 3 行，但是全部代码接近 200 行，这些代码都是在为类型支持服务。

#### 总结

框架设计中开发体验时衡量一个框架的重要指标之一。提供友好的警告信息又处于开发者快速定位维提，大多数情况下 "框架" 要比开发者更清楚问题出在哪里，因此在框架层面抛出有意义的警告信息是非常有必要的。

为了框架体积不受警告信息的影响（提供警告信息越详细，框架体积越大），我们需要利用 Tree-Shaking 机制，配置构建工具预定义变量的能力，从而实现仅在开发环境中打印警告信息，生产环境中则不包含这些用于提升开发体验的代码，实现线上代码的可控性。

框架不同类型的输出产物用于满足不同需求。我们需要结合实际使用情况，可以针对性输出构建产物。

框架会提供多种能力。有时会出于兼容性和灵活性考虑，对于同样的任务，框架会提供多种解决方案。vue.js 中就可以使用选项对象式 API 和组合式 API两种方法完成页面开发。从框架设计来看，这完全是基于兼容性考虑的。如果用户只想使用组合式 API，这时就可以通过特性开关关闭对应的特性。

框架的错误处理决定了用户应用程序的健壮性，也决定了用户开发应用时处理错误的负担。框架需要为用户提供统一的错误处理接口，用户可以通过注册自定义的错误处理函数来处理全部的框架异常。

框架对于 ts 的支持程序也是考量框架的重要指标。
有时候为了让框架提供更加友好的类型支持，甚至会花费比实现框架更多的时间和精力。

### vue.js 3 的设计思路

从全局视角了解 vue.js 3 的设计思路、工作机制及其重要的组成部分。

#### 声明式 UI

vue.js 是一个声明式的 UI 框架，用户在使用 vue.js 3 开发页面时是声明式地描述  UI 的。

* 使用与 html 标签一致的方式描述 DOM 元素，例如描述一个 div 标签时可以使用 `<div></div>` ；
* 使用与 html 标签一致的方式来描述属性，例如 `<div :id="app"></div>` ；
* 使用 `:` 或 `v-bind` 描述动态绑定的属性，例如 `<div :id="dynamicId"></div>` ；
* 使用 `@` 或 `v-on` 描述事件，例如点击事件 `<div @click="handler"></div>` ；
* 使用与 html 标签一致的方式来描述层级结果，例如一个具有 `span` 子结点的 `div` 标签 `<div><span></span></div>` 。

除了使用模板来声明式地描述 UI 之外，还可以使用 JavaScript 对象来描述。

```js
const title = {
  tag: 'h1',
  props: {
    onClick: handler
  },
  children: [
    { tag: 'span' }
  ]
}
```

对应到 vue.js 模板

```html
<h1 @click="handler">
  <span></span>
</h1>
```

两种方式对比，使用 JavaScript 对象描述 UI 更加灵活。比如我们要表示一个标题，根据标题级别不同，采用 `h1~h6` 这几个标签。

```js
const level = 3;
const title = {
  tag: `h${ level }`
}
```

```vue
<h1  v-if="level == 1"></h1>
<h2  v-else-if="level == 2"></h2>
<h3  v-else-if="level == 3"></h3>
<h4  v-else-if="level == 4"></h4>
<h5  v-else-if="level == 5"></h5>
<h6  v-else-if="level == 6"></h6>
```

使用 JavaScript 对象描述 UI 的方式，其实就是所谓的虚拟 DOM。

vue.js 3 除了支持使用模板描述 UI 外，还支持使用虚拟 DOM 描述 UI。

```vue
import { h } from 'vue';

export default {
	render() {
		return h('h1', { onCllick: handler })
	}
}
```

h 函数的返回值就是一个对象，它的作用是让我们编写虚拟 DOM 更加轻松。h 函数就是一个辅助创建虚拟 DOM 的工具函数。

#### 渲染器

虚拟 DOM 就是用 JavaScript 对象描述真实 DOM 结构，然后再通过渲染器将虚拟 DOM 渲染到页面。

渲染器的作用就是把虚拟 DOM 渲染为真实 DOM。假设我们有以下虚拟 DOM。

```js
const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
};
```

我们可以实现一个渲染器，将上面这段虚拟 DOM 渲染为真实 DOM。

```js
const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click me'
};

function renderer (vnode, container) {
  const el = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(),
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el));
  }

  container.appendChild(el);
}

renderer(vnode, document.body);
```

简单说下渲染器的实现思路：

* 创建元素：以 `vnode.tag` 作为标签名称来创建 DOM 元素；
* 为元素添加属性和事件；
* 处理 children；

我们现在处理的仅仅是创建节点，渲染器的精髓都在更新节点的阶段，

```js
const vnode = {
  tag: 'div',
	props: {
    onClick: () => alert('hello')
  },
  children: 'click again' // click me 改成 click again
};
```

对于渲染器来说，需要精确找到 `vnode` 对象的变更点并且只更新变更的内容。

#### 组件的本质

虚拟 DOM 除了可以描述真实 DOM 之外，还可以描述组件。组件本质上就是一组 DOM 元素的封装，这组 DOM 元素就是组件要渲染的内容，因此我们可以定义一个函数代表组件，函数的返回值就代表组件要渲染的内容。

```js
const MyComponent = function () {
  return {
    tag: 'div',
    props: {
      onClick: () => alert('hello')
    },
    children: 'click me'
  }
};
```

组件的返回值也是虚拟 DOM，它代表组件要渲染的内容。我们可以让虚拟 DOM 对象中的 tag 属性来存储组件函数。

```js
const vnode = {
  tag: MyComponent
};
```

`tag: myComponent` 用户描述组件。为了能够渲染组件，我们还需要修改 renderer 函数。

```js
function renderer (vnode, container) {
  if (typeof vnode.children === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'function') {
    mountComponent(vnode, container);
  }
}

function mountElement (vnode, container) {
  const el = document.createElement(vnode.tag);

  for (const key in vnode.props) {
    if (/^on/.test(key)) {
      el.addEventListener(
        key.substr(2).toLowerCase(),
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(child => renderer(child, el));
  }

  container.appendChild(el);
}

function mountComponent (vnode, container) {
  const subtree = vnode.tag(); 
  renderer(subtree, container);
}

renderer(vnode, document.body);
```

组件一定是函数吗？我们完全可以使用 JavaScript 对象来表达组件。

```js
const MyComponent = {
  render () {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello')
      },
      children: 'click me'
    }
  }
}
```

为此，我们还需要修改 renderer 方法和 mountComponent 方法。

```js
function renderer (vnode, container) {
  if (typeof vnode.children === 'string') {
    mountElement(vnode, container);
  } else if (typeof vnode.tag === 'object') {
    mountComponent(vnode, container);
  }
}

function mountComponent (vnode, container) {
  const subtree = vnode.tag.render(); 
  renderer(subtree, container);
}
```

vue.js 的有状态组件就是使用对象结构来表达的。

#### 模板工作原理

无论是手写虚拟 DOM（渲染函数）还是使用模板，都属于声明式地描述 UI，vue.js 同时支持这两种描述 UI 的方式。

我们已经知道虚拟 DOM 如何渲染成真实 DOM，那模板是如何工作的，这就要提高 vue.js 另一个重要组成部分，编译器。

编译器的作用就是将模板编译为渲染函数。

```vue
<div @click="handler">
  click me
</div>
```

```js
render () {
  return h('div', { onClick: handler }, 'click me')
}
```

对于编译器来说，模板就是一个普通的字符串它会分析该字符串并生成一个功能与之相同的渲染函数。

以 `.vue` 文件为例，一个 `.vue` 文件就是一个组件。

```vue
<template>
	<div @click="handler">
    click me
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    handler: () => {}
  }
}
</script>
```

template 标签里的内容就是模板内容，编译器会把模板内容编译成渲染函数并添加到 `<script>` 标签块的组件对象上。

```vue
<script>
export default {
  data() {},
  methods: {
    handler: () => {}
  },
  render () {
    return h('div', { onClick: handler }, 'click me')
  }
}
</script>
```

无论是使用模板还是直接手写渲染函数，对于一个组件来说，它要渲染内容最终都是通过渲染函数产生的，渲染器再把渲染函数返回的虚拟 DOM 渲染为真实 DOM，这就是模板的工作原理，也是 vue.js 渲染页面的流程。

#### 模块组成的有机整体

组件的实现依赖于渲染器，模板的编译依赖于编译器，编译后生成的代码是根据渲染器和虚拟 DOM 的设计决定的。

vue.js 各个模块之间是互相关联、互相制约的，共同构成一个有机整体。

下面以编译器和渲染器这两个模块为例，看一下它们是如何配合工作，实现性能提升的。

```vue
<div id="foo" :class-"cls"></div>
```

首先，编译器会把这段代码编译成渲染函数

```js
render() {
	// return h('div', { id: 'foo', class: cls })
	return {
		tag: 'div',
    props: {
      id: 'foo',
      class: cls
    }
	}
}
```

cls 是一个变量，它可能会发生变化。

渲染器的作用之一就是寻找并且只更新变化的内容，当变量 cls 发生变化时，渲染器会自行寻找变更点。vue.js 的模板是有特点的，`id="foo"` 是永远不会变化的，而 `:class="cls"`  是一个 v-bind 绑定，它是可能发生变化的。编译器能识别出哪些是静态属性，哪些是动态属性，生成代码的时候可以附带这些信息。

```js
render() {
	return {
		tag: 'div',
    props: {
      id: 'foo',
      class: cls
    },
    patchPlags: 1 // 假设数字 1 代表 class 是动态的
	}
}
```

假设数字 1 代表 “class 是动态的”，渲染器看到这个标志就知道 class 属性会发生改变。对于渲染器来说，相当于省去寻找变更点的工作量，这样就会提升性能。

编译器和渲染器之间互相配合可能让性能进一步提升，它们借助于虚拟 DOM 对象进行配合，虚拟 DOM 对象中会包含多种数据字段，每个字段都代表一定的含义。

#### 总结

vue.js 是一个声明式的框架，它直接描述结果，用户不需要关注过程。vue.js 采用模板的方式来描述 UI，它同样支持使用虚拟 DOM 来描述 UI。虚拟 DOM 要比模板更加灵活，模板要比虚拟 DOM 更加直观。

渲染器的作用就是把虚拟 DOM 对象渲染为真实 DOM 元素。它递归地遍历虚拟 DOM 对象，调用原生 DOM API 来完成真实 DOM 的创建。渲染器的精髓在于后续更新，它会通过 diff 算法找出变更点，并且只会更新需要更新的内容。

组件其实就是一组虚拟 DOM 元素的集合，它可以是一个返回虚拟 DOM 的函数，也可以是一个对象。

vue.js 的模板会编译器编译为渲染函数。编译器和渲染器都是 vue.js 的核心组成部分，它们共同构成一个有机整体，不同模板之间互相配合，可以进一步提升框架性能。

## 二、响应系统

### 响应系统的作用与实现

响应系统是 vue.js 的重要组成部分。

#### 响应式数据与副作用函数

副作用函数指的是会产生副作用的函数。

```js
function effect () {
  document.body.innerText = 'hello vuew';
}
```

当函数执行时，会设置 body 的文本内容，除了 effect 函数之外的任何函数都可以读取或设计 body 的文本内容。

effect 函数的执行会直接或间接影响其他函数的执行，effect 函数产生了副作用。

一个函数修改全局变量，也是一个副作用。

```js
let val = 1;

function effect () {
  val = 2;
}
```

下面再来说一下响应式数据。

```js
const obj = { text: 'hello world' };

function effect () {
  document.body.innerText = obj.text;
}
```

副作用函数 effect 会设置 body 元素的 innerText 属性，当 obj.text 的值发生变化时，我们希望副作用函数 effect 会重新执行。

```js
obj.text = 'hello vue3';
```

目前 obj 是一个普通对象，当我们修改它的值时，除了值本身发生变化之外，不会有任何其他反应。

#### 响应式数据的基本实现

如何让 obj 变成响应式数据？

* 当副作用函数 effect 执行时，会触发字段 obj.text 的读取操作；
* 当修改 obj.text，会触发字段 obj.text 设置操作。

我们可以拦截一个对象的读取和设置操作，当读取字段 obj.text 时，我们可以把副作用函数 effect 存储到  “桶” 里。当设置 obj.text 时，再把副作用函数 effect 从 “桶” 中取出并执行。

如何拦截一个对象属性的读取和设置操作？

ES2015 之前，只能通过 Object.defineProperty 函数实现，这也是 vue.js 2 采用的方式。
ES2015+ 中，我们可以使用代理对象 Proxy 来实现，这是 vue.js 3 所采用的方式。

```js
const bucket = new Set();

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    bucket.add(effect);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});


function effect () {
  document.body.innerText = obj.text;
}

effect();

setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);

```

目前这种实现还存在很多缺陷，例如我们直接通过名字（effect）来获取副作用函数，这种硬编码的方式很不灵活。
副作用函数的名字可以任意取，我们可以把副作用函数命令为 myEffect，甚至是一个匿名函数，我们要想办法去掉这种硬编码机制。

#### 设计一个完善的响应系统

一个响应系统的工作流程如下：

* 读取操作发生时，将副作用函数收集到 “桶” 中；
* 设置操作发生时，从 “桶” 中取出副作用函数并执行。

基于之前的案例，我们希望无论副作用什么是什么形式，都能够被正确地收集到 "桶" 中。我们需要提供一个用来注册副作用的函数。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}
```

我们定义一个全局变量 activeEffect，它的作用是存储被注册的副作用函数。重新定义了 effect 函数，作用是用来注册副作用函数的函数，effect 接收一个参数 fn，即要注册的副作用函数。

```js
effect(() => {
  document.body.innerText = obj.text;
});
```

我们使用一个匿名的副作用函数作为 effect 函数的参数。
当 effect 函数执行时，首先会把匿名的副作用函数 fn 赋值给全局变量 activeEffect。接着执行被注册的匿名副作用函数 fn，这将会触发响应式数据 obj.text 的读取操作，进行触发代理对象 Proxy 的 get 拦截操作。

```js
const obj = new Proxy(data, {
  get (target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});
```

副作用函数已经存储到 activeEffect 中，在 get 拦截函数内需要把 activeEffect 收集到 “桶” 中。响应系统也不再依赖副作用函数的名字。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const bucket = new Set();

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    bucket.forEach(fn => fn());
    return true;
  }
});

effect(() => {
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);
```

当我们在响应式数据 obj 上设置一个不存在的属性时：

```js
effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);

// effect run
// effect run
```

执行上述代码，effect 函数会被打印两次。
理想情况，effect 只会被执行一次，匿名副作用函数只会与字段 obj.text 之间建立关系，不应该和 obj.notExist 建立响应关系。
定时器内语句的执行不应该触发匿名副作用函数重新执行，但是定时器到时候，匿名副作用函数确重新执行了。

为了解决这个问题，我们需要重新设计 “桶” 的数据结构。

之前我们使用一个 Set 数据结构作为存在副作用函数的 “桶”。导致该问题的根本原因是，我们没有在副作用函数与被操作的目标字段之间建立明确的联系。例如当读取属性时，无论读取哪个属性，都会收集副作用函数到 “桶” 中；同样，无论设置哪个属性，也都会执行 “桶” 中的副作用函数。副作用函数与被炒作的字段之间没有明确的联系。解决方案其实也很简单，只需要在副作用函数与被操作的字段之间建立联系即可，我们不能简单地使用一个 Set 类型的数据作为 “桶”。

```js
effect(function effectFn() {
  document.body.innerText = obj.text;
});
```

上面代码中存在三个角色：

* 被操作（读取）的代理对象 obj；
* 被操作（读取）的字段名 text；
* 使用 effect 函数注册的副作用函数 effectFn。

如果用 `target` 来表示一个代理对象所代理的原理对象，用 `key` 来表示被操作的字段名，用 `effectFn` 来表示被注册的副作用函数，

```js
target
	- key
		- effectFn
```

这是一种树形结构，我们可以通过例子对其进行补充说明。

如果有两个副作用函数同时读取同一个对象的属性值：

```js
effect(function effectFn1() {
  obj.text;
});
effect(function effectFn2() {
  obj.text;
});
```

```js
target
	- text
		-	effectFn1
   	- effectFn2
```

如果一个副作用函数读取了同一个对象的两个不同的属性

```js
effect(function effectFn() {
  obj.text1;
  obj.text2;
});
```

```js
target
	-	text1
		- effectFn
	- test2
		- effectFn
```

如果在不同的副作用函数中读取了两个不同对象的不同属性

```js
effect(function effectFn1() {
  obj1.text1;
});
effect(function effectFn1() {
  obj2.text2;
});
```

```js
target1
	- text1
			- effectFn1
target2
	-	text2
			- effectFn2
```

上面形成的关系其实就是一个树型数据结构。这个联系建立起来之后，就可以解决前文提到的问题。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const data = { text: 'hello world' };

const bucket = new WeakMap();

const obj = new Proxy(data, {
  get (target, key) {
    if (!activeEffect) return;

    // 使用 target 在 bucket 中获取 depsMap，key -> effects
    let depsMap = bucket.get(target);

    // 如果不存在 depsMap，新建 map 与 target 关联
    if (!depsMap) {
      bucket.set(target, (depsMap = new Map()));
    }

    // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
    let deps = depsMap.get(key);

    // 如果 deps 不存在，新建 set 与 key 关联
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    // 将激活的副作用函数添加到 deps 中
    deps.add(activeEffect);

    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;

    // 使用 target 从 bucket 中获取 depsMap，key -> effects
    const depsMap = bucket.get(target);

    if (!depsMap) return;

    // 根据 key 从 depsMap 中获取 effects
    const effects = depsMap.get(key);

    effects && effects.forEach(fn => fn());
  }
});


effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);
```

从这段代码我们就可以看出构建数据结构的方式，我们分别使用了 WeakMap、Map、Set。

* WeakMap 由 target => map 构成；
* Map 由 key => Set 构成。



<img src="./images/effect.png" />



我们把图中的 Set 数据结构所存储的副作用函数集合称为 key 的依赖集合。

这里解释一下为什么要使用 WeakMap。

```js
const map = new Map();
const weakmap = new WeakMap();

(function () {
  const foo = { foo: 1 };
  const bar = { bar: 2 };
  
  map.set(foo, 1);
  weakmap.set(bar, 2);
})();
```

定义了一个立即执行函数（IIFE），在函数表达式内部定义了两个对象：foo 和 bar，这两个对象分别最为 map 和 weakmap 的 key。

当该函数执行完毕后，对于对象 foo 来说，它仍然作为 map 的 key 被引用着，因此垃圾回收器（garbage collector）不会把它从内存中移除，我们仍然可以通过 map.keys 打印出对象 foo。对于对象 bar 来说，由于 WeakMap 的 key 是弱引用，它不影响垃圾回收期的工作，所以一旦表达式执行完毕，垃圾回收期就会把对象 bar 从内存中移除，并且我们无法获取 weakmap 的 key 值，也无法通过 weakmap 取得对象 bar。

WeakMap 对 key 是弱引用，不影响垃圾回收器的工作。一旦 key 被垃圾回收器回收，那么对应的键和值就访问不到了。所以 WeakMap 经常用于存储哪些只有当 key 所引用的对象存在是（没有被回收）才有价值的信息。例如上面的场景中，如果 target 对象没有任何引用，说明用户不在需要它，这时垃圾回收器会完成回收任务。但是如果使用 Map 来替代 WeakMap，即使用户对 target 没用引用，target 也不会被回收，最终可能会导致内存溢出。

最后，我们对以上代码做一下封装处理。我们可以把 get 拦截函数里依赖收集的路基封装到 track 函数中。同理，我们也可以把触发副作用的函数封装到 trigger 函数中。

```js
let activeEffect;

function effect (fn) {
  activeEffect = fn;
  fn();
}

const bucket = new WeakMap();

function track (target, key) {
  if (!activeEffect) return;

  // 使用 target 在 bucket 中获取 depsMap，key -> effects
  let depsMap = bucket.get(target);

  // 如果不存在 depsMap，新建 map 与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
  let deps = depsMap.get(key);

  // 如果 deps 不存在，新建 set 与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  // 将激活的副作用函数添加到 deps 中
  deps.add(activeEffect);
}

function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 effects && effects.forEach(fn => fn());
}

const data = { text: 'hello world' };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});


effect(() => {
  console.log('effect run');
  document.body.innerText = obj.text;
});

setTimeout(() => {
  obj.notExist = 'hello vue3';
}, 1000);
```

#### 分支切换与 cleanup

首先，我们需要明确分支切换的定义

```js
const data = { ok: true, text: 'hello world' };
const obj = new Proxy(data, {});

effect(function effectFn () {
	document.body.innerText = obj.ok ? obj.text : 'not';
});
```

effect 函数内部存在一个三元表达式，根据 `obj.ok` 的值不同会执行不同的代码分支。
当字段 `obj.ok` 的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换。

分支切换可能会产生遗留的副作用函数。

```js
data
	-	ok
		- effectFn
	- text
		-	effectFn
```

副作用函数 `effectFn` 分别被字段 `data.ok` 和字段 `data.text` 所依赖集合收集。当字段 `obj.ok` 的值修改为 false，并触发副作用函数重新执行后，字段 `obj.text` 不会被读取，只会触发字段 `obj.ok` 的读取操作，理想情况下副作用函数 `effectFn` 不应该被字段 `obj.text` 所对应的依赖集合收集。

```js
data
	-	ok
		- effectFn
	- text
```

我们之前的实现还做不到这一点，当字段修改为 false，并触发副作用函数重新执行之后，会产生遗留的副作用函数。

遗留的副作用函数会导致不必要的更新。

解决这个问题的思路很简单，每次副作用函数执行时，我们可以先把它所有与之关联的依赖删除。当副作用函数执行完毕后，会重新建立联系，但在新的联系中不会包含遗留的副作用函数。

要将一个副作用函数从所有与之关联的依赖集合中移除，就需要明确知道哪些依赖集合中包含他，因此我们需要重新设计副作用函数。

```js
let activeEffect;

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    activeEffect = effectFn;
    fn();
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}

const bucket = new WeakMap();

function track (target, key) {
  if (!activeEffect) return;

  // 使用 target 在 bucket 中获取 depsMap，key -> effects
  let depsMap = bucket.get(target);

  // 如果不存在 depsMap，新建 map 与 target 关联
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  // 使用 key 在 depsMap 中获取 deps，deps 是一个 set 类型
  let deps = depsMap.get(key);

  // 如果 deps 不存在，新建 set 与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  // 将激活的副作用函数添加到 deps 中
  deps.add(activeEffect);

  // 将依赖添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps);
}
```

在 track 函数中我们将当前执行的副作用函数 activeEffect 添加到依赖收集 deps 中，deps 是一个与当前副作用函数存在联系的依赖集合，于是我们也把它添加到 `activeEffect.deps` 数组中，这样就完成对依赖集合的收集。



<img src="./images/effect_cleanup.png" />



有了联系后，我们可以在副作用函数执行时，根据 `effect.deps` 获取所有相关的依赖集合，将副作用函数从依赖集合中删除。

```js
let activeEffect;

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    cleanup(effectFn); // 依赖清理
    activeEffect = effectFn;
    fn();
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}

function cleanup (effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];
    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn);
  }
  // 重置 effectFn.deps 数组
  effectFn.deps.length = 0;
}
```

cleanup 函数接收副作用函数作为参数，遍历副作用函数的 `effectFn.deps` 数组，该数组的每一项都是一个依赖集合，然后将该副作用函数从依赖集合中移除，最后重置 `effectFn.deps` 数组。

至此，我们的响应系统已经可以避免副作用函数产生遗留。但是目前的实现会导致死循环。问题出在 trigger 函数中。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 effects && effects.forEach(fn => fn()); // ?
}
```

trigger 内部，遍历 effects 集合，它是 set 集合，里面存储副作用函数。当副作用函数执行时，会调用 cleanup 进行清除，但是副作用函数的执行会导致其重新被收集到集合中，此时对 effects 集合的遍历仍在进行。

我们可以重新构造一个集合并遍历它。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 const effectsToRun = new Set(effects);
 effectsToRun.forEach(effectFn => effectFn());
}
```

#### 嵌套的 effect 与 effect 栈

effect 是可以发生嵌套的。

```js
effect(function effectFn1 () {
  effect(function effectFn2 () { });
}};
```

上述代码，`effetFn1` 内部嵌套了 `effectFn2`，`effectFn1` 的执行会导致 `effectFn2` 的执行。

vue.js 的渲染函数就是在一个 effect 中执行的，如果组件发生嵌套，这时就发生了 effect 嵌套。

```js
const Bar = {
  render() {}
}

const Foo = {
  render() { return <Bar /> }
}
```

```js
effect(() => {
  Foo.render();
  effect(() => {
    Bar.render();
  })
})
```

如果 effect 不支持嵌套会发生什么？我们实现的响应系统并不支持 effect 嵌套，我们可以测试一下。

```js
const data = { foo: true, bar: true };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

let temp1, temp2;

effect(function effectFn1() {
  console.log('effectFn1 process');
  
  effect(function effectFn2() {
    console.log('effectFn2 process');
    temp2 = obj.bar;
  });
  
  temp1 = obj.foo;
});
```

理想情况下，我们希望副作用函数与对象属性之间的关系如下：

```js
data
	- foo
		- effectFn1
	- bar
		- effectFn2
```

我们希望当修改 `data.foo` 时会触发 `effectFn1` 执行。
由于 `effectFn2` 嵌套在 `effectFn1` 里，所以会间接触发 `effectFn2` 执行。当修改 `obj.bar` 时，只会触发 `effectFn2` 执行。

```js
obj.foo = false;

// effectFn1 process
// effectFn2 process
// effectFn2 process
```

我们修改 `obj.foo` 的值，会发现第三行打印不符合我们预期，`effectFn1` 并没有重新执行，反而 `effectFn2` 重新执行。

问题出在我们实现 effect 函数与 activeEffect 上。

```js
let activeEffect;

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    fn();
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}
```

我们使用全局变量 activeEffect 来存储通过 effect 函数注册的副作用函数，同一时间 activeEffect 所存储的副作用函数只能有一个。当副作用函数发生嵌套时，内层副作用函数执行会覆盖 activeEffect 的值，并且永远不会恢复到原来的值。这时如果再有响应式数据进行依赖收集，即使这个响应式数据是在外层副作用函数中读取的，它们收集到的副作用函数也都是内层副作用函数。

我们可以使用副作用函数栈 `effectStack`，在副作用函数执行时，将当前副作用函数压入栈中，副作用函数执行完毕后将其从栈中弹出，始终让 activeEffect 指向栈顶的副作用函数。

```js
let activeEffect;

const effectStack = [];

function effect (fn) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}
```

通过定义 `effectStack` 数组，用它模拟栈， 使 activeEffect 始终指向正在执行的副作用函数，响应式数据只会收集直接读取其值的副作用函数作为依赖，从而避免产生错误。

#### 避免无限递归循环

实现一个完善的响应系统要考虑很多细节。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  obj.foo++;
});
```

如果在 effect 注册的副作用函数内存在一个自增操作，该操作会引起栈溢出。

```e
obj.foo => obj.foo + 1
```

在这个语句中，既会读取 `obj.foo` 的值，也会设置 `obj.foo` 的值，这就是导致问题出现的根本原因。

代码执行流程如下：

首先读取 `obj.foo` 的值，会触发 track 操作，将副作用函数收集到 “桶” 中，接着将其加 1 后再赋值给 `obj.foo`，此时会触发 trigger 操作，即把 “桶” 中副作用函数取出并执行。但是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样会导致无限递归地调用自己，于是就产生了栈溢出。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 const effectsToRun = new Set(effects);
 effectsToRun.forEach(effectFn => effectFn());
}
```

解决方法并不难，由于读取和设置操作是在同一个副作用函数执行的。无论是 track 收集的副作用函数，还是 trigger 出发执行的副作用函数，都是 activeEffect。我们可以在 trigger 动作发生时增加守卫条件：如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 const effectsToRun = new Set();
  
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => effectFn());
}
```

#### 调度执行

可调度性是响应系统非常重要的特性。所谓可调度性，指的是当 trigger 动作触发副作用重新执行时，有能力决定副作用函数执行的时机、次数以及方式。

先来看一下如何决定副作用函数的执行方式。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
});

obj.foo++;

console.log('end');
```

上面这段代码的输出结果如下：

```js
// 1
// 2
// end
```

如果我们需要调整输出顺序为：

```js
// 1
// end
// 2
```

这时我们很容易想到对策，把语句 `obj.foo++` 和 `console.log('end')` 位置互换即可。那么是否还有其他方法在不调整代码的情况下实现需求？这时就需要响应系统支持调度。

我们可以为 effect 函数设计一个选项参数 options，允许用户指定调度器：

```js
effect(() => {
  console.log(obj.foo)
}, {
  scheduler (fn) {
    // ...
  }
})
```

用户在调用 effect 函数注册副作用函数时，可以传递第二个参数 options。它是一个对象，允许指定 scheduler 调度函数，同时在 effect 函数内部我们需要把 options 选项挂载到对应的副作用函数上。

```js
function effect (fn, options = {}) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // 挂载 options
  effectFn.options = options;
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 执行副作用函数
  effectFn();
}
```

有了调度函数，我们在 trigger 函数中触发副作用函数重新执行时，就可以直接调用用户传递的调度器函数，从而把控制权交给用户。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);

 const effectsToRun = new Set();
  
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => {
   // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
   if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
   } else {
    effectFn();
   }
 });
}
```

现在我们就可以实现前文的需求了。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
}, {
  scheduler (fn) {
    setTimeout(fn);
  }
});

obj.foo++;

console.log('end');
```

我们使用 `setTimeout` 开启一个宏任务来执行副作用函数 fn，这样就可以实现期望的打印顺序。

除了控制副作用函数的执行顺序，通过调度器我们还可以控制它的执行次数。

```js
const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
});

obj.foo++;
obj.foo++;
```

这段代码的打印结果如下：

```js
// 1
// 2
// 3
```

如果我们只关心结果而不关心过程，我们期望的打印结果是：

```js
// 1
// 3
```

基于调度器，我们可以很容易地实现此功能。

```js
/** task queue start */
const jobQueue = new Set();
const p = Promise.resolve();

let isFlushing = false;

function flushJob () {
  if (isFlushing) return;

  isFlushing = true;

  p.then(() => {
    jobQueue.forEach(job => job());
  }).finally(() => {
    isFlushing = false;
  });
}
/** task queue end */

const data = { foo: 1 };
const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.foo);
}, {
  scheduler (fn) {
    jobQueue.add(fn);
    flushJob();
  }
});

obj.foo++;
obj.foo++;
```

这个功能类似于 vue.js 连续多次修改响应式数据但只会触发一次更新，vue.js 内部实现了一个更加完善的调度器。

#### 计算属性 computed 与 lazy

之前介绍了 effect 函数，它用来注册副作用函数，它允许指定一些选项参数 options。例如指定 scheduler 调度器来控制副作用函数的执行时机和方式。还介绍了用来追踪和收集依赖的 track 函数，以及用来触发副作用函数重新执行的 trigger 函数。实际上，综合这些内容，我们就可以实现 vue.js 中一个非常重要并且非常有特色的能力 - 计算属性。

```js
effect(() => {
  console.log(obj.foo);
});
```

我们实现的 effect 函数会立即执行传递给它的副作用函数。但有些场景下，我们并不希望它立即执行，而是希望它在需要的时候才执行，例如计算属性。我们通过在 options 中添加 lazy 属性来达到目的。

```js
effect(() => {
  console.log(obj.foo);
}, {
  lazy: true
});
```

lazy 选项和 scheduler 一样，可以通过 options 选项对象指定。当 `options.lazy` 为 true 时，不立即执行副作用函数。

```js
function effect (fn, options = {}) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
    // 依赖清理
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数复制给 activeEffect
    activeEffect = effectFn;
    // 将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行函数
    fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  // 挂载 options
  effectFn.options = options;
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 非 lazy 属性才执行
  if (!options.lazy) {
    effectFn();
  }
	
  // 返回 effectFn
  return effectFn;
}
```

通过这个判断，副作用函数不会立即执行。我们将副作用函数 effectFn 作为 effect 函数的返回值，我们可以手动执行该副作用函数。

```js
const effectFn = effect(() => {
  console.log(obj.foo);
}, {
  lazy: true
});

obj.foo++;

effectFn();
```

如果仅能够手动执行副作用函数，意义并不大。如果我们把传递给 effect 函数看做一个 getter，那么这个 getter 函数可以返回任何值。

```js
const effectFn = effect(
  () => obj.foo + obj.bar, {
  lazy: true
});
```

手动执行副作用函数时，就可以拿到其返回值。

```js
const value = effectFn();
```

我们还需要对 effect 函数做一些修改。

```js
function effect (fn, options = {}) {
  // effectFn 执行时，将其设置为当前激活的副作用函数
  const effectFn = () => {
 		// ...
    // 执行函数
    const ans = fn();
    // 将当前副作用函数弹出栈，并还原 activeEffect
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    // 返回结果
    return ans;
  }

 	// ...

  // 非 lazy 属性才执行
  if (!options.lazy) {
    effectFn();
  }

  // 返回 effectFn
  return effectFn;
}
```

现在我们就可以实现懒执行的副作用函数，并且可以拿到副作用函数的执行结果，接下就可以实现计算属性。

```js
function computed (getter) {
  const effectFn = effect(getter, { lazy: true });

  const obj = {
    get value () {
      return effectFn();
    }
  }

  return obj;
}
```

我们定义一个 computed 函数，它接收一个 getter 函数作为参数，我们把 getter 函数作为副作用函数，用它创建一个 lazy 的 effect。computed 函数的执行会返回一个对象，该对象的 value 属性是一个访问器属性，只有读取 value 的值时，才会执行 effectFn 并将其结果作为返回值返回。

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

const ans = computed(() => obj.foo + obj.bar);

console.log(ans.value);
```

可以看到 computed 函数可以正确工作。不过我们实现的计算属性只做到了懒计算，只有当你读取 `ans.value` 的值，它才会计算并得到值。但是并没有做到对值进行缓存，如果我们访问 `ans.value` 的值，会导致 effectFn 多次计算，即使 `obj.foo` 和 `obj.bar` 的值本身没有变化。

我们在实现 computed 函数时，可以添加对值进行缓存的功能。

```js
function computed (getter) {
  // 缓存上一次的值
  let value;
  // 标识是否需要重新计算值，true 意味要重新计算
  let dirty = true;

  const effectFn = effect(
    getter,
    {
      lazy: true,
      // 添加调度器，调度器中重置 dirty
      scheduler () {
        dirty = true;
      }
    }
  );

  const obj = {
    get value () {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    }
  }

  return obj;
}
```

新增两个变量 value 和 dirty，value 用来缓存值，dirty 用于标识是否需要重新计算，只会 dirty 为 true 的时候才会调用 effectFn 重新取值。同时增加 scheduler 调度器函数，它会在 getter 函数中所依赖的响应式数据变化时执行，将 dirty 设置为 true。

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

const ans = computed(() => obj.foo + obj.bar);

console.log(ans.value);

obj.bar++;

console.log(ans.value);
```

现在我们设计的计算属性已经趋于完美，但它还存在一个缺陷，体现在当我们在另外一个 effect 中读取计算属性值时。

```js
const ans = computed(() => obj.foo + obj.bar);

effect(() => {
  console.log(ans.value);
});

obj.bar++;
```

ans 是一个计算属性，我们在 effect 函数中读取了 `ans.value` 的值。如果此时修改 `obj.bar` 的值，我们期望副作用函数重新执行，但是上述代码并不会触发副作用函数的渲染，这是一个缺陷。

从本质上来看，这是一个典型的 effect 嵌套。一个计算属性内部拥有自己的 effect，并且它是懒执行的，只有当真正地读取计算属性的值时才会执行。对于计算属性的 getter 函数来说，它里面访问的响应式数据只会把 computed 内部的 effect 收集为依赖。当把计算属性用于另外一个 effect 时，就会发生 effect 嵌套，外层的 effect 不会被内层 effect 中的响应式数据收集。

解决方法很简单，当读取计算属性的值时，我们可以手动调用 track 函数进行追踪；当计算属性依赖的响应式数据发生变化时，我们可以手动调用 trigger 函数触发响应。

```js
function computed (getter) {
  // 缓存上一次的值
  let value;
  // 标识是否需要重新计算值，true 意味要重新计算
  let dirty = true;

  const effectFn = effect(
    getter,
    {
      lazy: true,
      // 添加调度器，调度器中重置 dirty
      scheduler () {
        dirty = true;
        // 计算属性依赖的响应式数据发生变化时，手动调用 trigger 函数触发响应
        trigger(obj, 'value');
      }
    }
  );

  const obj = {
    get value () {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value');
      return value;
    }
  }

  return obj;
}
```

如上代码所示，当读取一个计算属性的 value 值时，我们可以手动调用 track 函数，把计算属性返回的对象 obj 作为 target，同时作为第一个参数传递给 track 函数。当计算属性所依赖的响应式数据发生变化时，会执行调度器函数，在调度器函数内部手动调用 trigger 函数触发响应即可。

```js
effect(() => {
  console.log(ans.value);
});
```

它会建立这样的联系。

```js
compute(obj)
	- value
		- effectFn
```

#### watch 的实现原理

watch 本质就是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。

```js
watch(obj, () => {
  console.log('data change');
});

obj.foo++;
```

watch 的实现本质是就是利用了 effect 以及 `options.scheduler` 选项。下面是最简单的 watch 实现。

```js
function watch (soure, cb) {
  effect(
  	() => source.foo,
    {
      scheduler () {
        cb()
      }
    }
  )
}
```

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

watch(obj, () => {
  console.log('data change');
});

obj.foo++;
obj.bar++;
```

上面这段代码可以正常工作，但是在实现 watch 函数，硬编码了对 `source.foo` 的读取操作。我们需要封装一个通用的读取操作。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb) {
  effect(
  	() => traverse(source),
    {
      scheduler () {
        cb()
      }
    }
  )
}
```

在 watch 内部的 effect 中调用 traverse 函数进行递归读取操作，这样就能读取一个对象上的任意属性，从而当任意属性发生变化时都能触发回调函数执行。

watch 函数除了可以观测响应式数据，还可以接收一个 getter 函数。

```js
watch(
  () => obj.foo,
  () => {
    console.log('data change');
  }
);
```

传递给 watch 函数的第一个参数不再是一个响应属性，而是一个 getter 函数。getter 函数内部，用户可以指定 watch 依赖哪些响应式数据，只有当这些数据变化时，才会触发回调函数执行。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  effect(
  	() => getter(),
    {
      scheduler () {
        cb()
      }
    }
  )
}
```

我们可以判断 source 类型，如果用户传递函数，直接使用用户的 getter 函数；如果用户没有传递函数，自定义一个函数调用 traverse 方法。这样就实现了自定义 getter 的功能。

目前 watch 还缺少一个重要的能力，就是在回调函数中拿不到旧值和新值。

```js
watch(
  () => obj.foo,
  (newVal, oldVal) => {
    console.log('data change', newVal, oldVal);
  }
);

obj.foo++;
```

我们可以利用 effect 函数的 lazy 现象，获取新值与旧值。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;

  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler () {
        newValue = effectFn();
        cb(newValue, oldValue);
        oldValue = newValue;
      }
    }
  );

  oldValue = effectFn();
}
```

我们手动调用 effectFn 函数得到的返回值就是旧值，即第一次执行得到得知。当变化发生并处罚 scheduler 调度函数执行时，会重新调用 effectFn 函数并得到新值，这样我们就可以拿到旧值与新值，接着把它们作为参数传递给回调函数就可以了。

#### 立即执行的 watch 与回调执行时机

watch 的本质其实是对 effect 的二次封装。关于 watch 还有两个特性：一个是立即执行的回调函数，另一个时回调函数的执行时机。

首先来看下立即执行的回调函数。默认情况下，一个 watch 的回调只会在响应式数据发生变化时才执行。

```js
watch(obj, () => {
  console.log('data change');
});
```

vue.js 中可以通过选项参数 immediate 指定回调是否需要立即执行。

```js
watch(obj, () => {
  console.log('data change');
}, {
  immediate: true
});
```

当 immediate 选项存在并且为 true 时，回调函数会在该 watch 创建时立即执行一次。

回调函数的立即执行与后续执行本质是没有任何差别，我们可以把 scheduler 调度函数封装为一个函数，分别在初始化和变更时执行它。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb, options = {}) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;

  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  }

  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler: job
    }
  );

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}
```

```js
const data = { foo: 1, bar: 2 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

watch(
  () => obj.foo,
  (newVal, oldVal) => {
    console.log('data change', newVal, oldVal);
  },
  {
    immediate: true
  }
);

obj.foo++;
obj.foo++;
```

这样就实现了回调函数的立即执行功能。除了指定回调函数为立即执行之外，还可以通过其他选项参数来指定回调函数的执行时机，例如 vue.js 3 中使用 flush 选项。

```js
watch(
  obj,
  () => {
    console.log('data change');
  },
  {
    // 回调函数会在 watch 创建时立即执行一次
    flush: 'pre'
  }
);
```

flush 选项可以指定为 `pre`，`post` 或者 `sync`。flush 本质是在指定调度函数的执行时机。

当 flush 的值为 `post` 时，代表调度函数需要将副作用函数放到一个微任务队列中，并等待 DOM 更新结束后执行。

我们可以用以下代码模拟 `post` 的效果。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb, options = {}) {
  let getter;

	// ...
  
  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve();
          p.then(job);
        } else {
          job();
        }
      }
    }
  );
	
  // ...
}
```

我们修改了调度器函数 scheduler 的实现方式，当 `options.flush` 的值为 `post` 时，将 job 函数放到微任务队列中，从而实现异步延迟执行。否则执行执行 job 函数，这本质是相当于 `sync` 的实现机制，及同步执行。对于 `pre` 的情况，我们暂时没有办法模拟，这涉及组件的更新时机，其中 `pre` 和 `post` 原本的语义指的就是组件更新前和更新后。

#### 过期的副作用

竞态问题通常在多进程或多线程编程中被提及，我们在编程中也会遇见这种问题。

```js
let finalData;

watch(obj, async () => {
  const res = await fetch('/path/request');
  finalData = res;
})
```

我们使用 watch 观测 obj 对象的变化，当 obj 对象发生变化都会发送网络请求，等数据请求成功之后，将结果赋值给 `finalData` 变量。

这段代码会发生竞态问题，当 obj 对象发生多次修改，发起多个网络请求，你无法确定哪一个请求会先返回。

假设我们有两个请求，第一次修改 obj，发出请求 A，第二次修改 obj，发出请求 B。我们认为请求 B 返回的数据才是最新的，而请求 A 则应该被视为过期的。我们希望 `finalData` 存储的值应该请求 B 返回的结果。

我们需要一个让副作用过期的手段。为了让问题更加清晰，我们可以用 watch 函数复现场景。

在 vue.js 中，watch 函数的回调函数接收第三个参数 `onInvalidate`，它是一个函数，类似于事件监听器，我们可以使用 `onInvalidate` 函数注册一个回调，这个回调会在当前副作用函数过期时执行。

```js
let finalData;

watch(obj, async (newVal, oldVal, onInvalidate) => {
  let expired = false;

  onInvalidate(() => {
    expired = true;
  });

  const res = await fetch('https://service.yueluo.club/');
  const data = await res.json();

  if (!expired) {
    console.log(data); // 只打印一次结果
    finalData = data;
  }
})

obj.foo++;
obj.foo++;
```

在 watch 内部每次检查到变更后，有副作用函数重新执行之前，会先调用我们通过 `onInvalidate` 函数注册的过期回调。

```js
function traverse (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  seen.add(value);

  // 假设 value 是一个对象，不考虑数组等其他结构
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch (source, cb, options = {}) {
  let getter;

  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue, newValue;

  // cleanup 存储用户注册的过期回调
  let cleanup;

  function onInvalidate (fn) {
    cleanup = fn;
  }

  // 提取 scheduler 调度函数为一个独立的 job 函数
  const job = () => {
    newValue = effectFn();
    // 调用回调函数前，先调用过期回调
    if (cleanup) {
      cleanup();
    }
    // 返回第三个参数
    cb(newValue, oldValue, onInvalidate);
    oldValue = newValue;
  }

  const effectFn = effect(
  	() => getter(),
    {
      lazy: true,
      scheduler: () => {
        if (options.flush === 'post') {
          const p = Promise.resolve();

          p.then(job);
        } else {
          job();
        }
      }
    }
  );

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}
```

#### 总结

一个响应式数据最基本的实现依赖于对 “读取” 和 ”设置“ 操作的拦截，从而在副作用函数与响应式数据之间建立关系。当 ”读取“ 操作发生时，我们将当前执行的副作用函数存储到 ”桶中“；当 ”设置“ 操作发生时，再将副作用函数从 ”桶“ 里去除并执行。这就是响应系统的实现原理。

我们实现了一个相对完善的响应系统。使用 WeakMap 配合 Map 构建新的 ”桶“ 结构，从而能够在响应式数据与副作用函数建立更加精确的联系。我们还介绍了 WeakMap 与 Map 这两个数据结构之间的区别。WeakMap 是弱引用的，它不影响垃圾回收器的工作。当用户代码对一个对象没有用引用关系时，WeakMap 不会阻止垃圾回收器回收该对象。

我们还讨论了分支切换导致的冗余副作用问题，这个问题会导致副作用函数进行不必要的更新。为了解决这个问题，我们需要在每次副作用函数重新执行之前，清除上一次建立的响应联系，当副作用函数重新执行后，会再次建立新的响应联系，新的响应联系不存在冗余副作用。在此过程中，我们遇到了遍历 set 数据结构导致无限循环的新问题，该问题产生的原因可以从 ECMA 规范中得知，即 ”调用 forEach 遍历 Set 集合时，如果一个值已经被访问过，但这个值被删除并重新添加到集合，如果此时 forEach 遍历没有结束，那么这个值会被重新访问“。解决访问是建立一个新的 Set 集合用来遍历。

然后，我们讨论了关于嵌套的副作用函数的问题。它发生在组件嵌套的场景中，及父子组件关系。这时为了避免在响应式数据与副作用函数之间建立的响应关系发生错乱，我们需要使用使用副作用函数栈来存储不同的副作用函数。当一个副作用函数执行完毕后，将其从栈中弹出。当读取响应式数据时，被读取的响应式数据只会与当前栈顶的副作用函数建立联系，从而解决问题。我们还遇到副作用函数死循环，导致栈溢出的问题。该问题的根本原因在于，对响应式数据的读取和设置操作发生在同一个副作用函数内。解决方法很简单，如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。

随后，我们讨论了响应系统的可调度性。可调度指的是当 trigger 动作触发副作用函数重新执行后，有能力决定副作用函数的时机、次数以及方式。为了实现调度能力，我们为 effect 函数增加了第二个选项参数，可以通过 scheduler 选项指定调用器，这样用户可以通过调度器自行完成任务的调度。我们还讲解了如果通过调度器实现任务去重，即通过一个微任务队列对任务进行缓存，从而实现去重。

我们讲解了计算属性，即 computed。计算属性实际上是一个懒执行的副作用函数，我们通过 lazy 选项使得副作用函数可以懒执行。被标记为懒执行的副作用函数可以通过手动方式让其执行。利用这个特点，我们设计了计算属性，当读取计算属性的值时，只需要手动执行副作用函数即可。当计算属性依赖的响应式数据发生变化时，会通过 scheduler 将 dirty 标记设置为 true。这样下次读取计算属性的值时，我们会重新计算真正的值。

我们还讨论了 watch 的实现原理。它本质上利用了副作用函数重新执行时的可调度性。一个 watch 本身会创建一个 effect，当这个 effect 依赖的响应式数据发生变化时，会执行该 effect 的调度器函数，即 scheduler 可以理解为 “回调”，所以我们只需要在 scheduler 中执行用户通过 watch 函数注册的回调函数即可。此外，我们还讲解了立即执行回调的 watch，通过添加新的 immediate 选项来实现，还讨论了如何控制回调函数的执行时机，通过 flush 选项来指定回调函数具体的执行时机，本质是利用了调用器和异步的微任务队列。

最后，我们讨论了过期的副作用函数，它会导致竞态问题。为了解决这个问题，vue.js 为 watch 的回调函数设计了第三个参数，及 `onInvalidate` 。它是一个函数，用来注册过期回调。每当 watch 的回调函数执行之前，会优先执行用户通过 `onInvalidate` 注册的过期回调。这样，用户就有机会在过期回调中将上一次的副作用标记为 “过期”，从而解决竞态问题。

### 非原始值的响应式方案

#### 理解 Proxy 和 Reflect

vue.js 3 的响应式数据是基于 Proxy 实现的，因此我们也有必要了解 Proxy 以及与之关联的 Reflect。

使用 Proxy 创建一个对象，可以实现对其他对象的代理。Proxy 只能代理对象，无法代理非对象值，例如字符串、布尔值等。

所以代理，指的是对一个对象基本语义的代理。它允许我们拦截并重新定义对一个对象的基本操作。

类似读取、设置属性值的操作，就属于基本语义的操作，即基本操作。

```js
let obj = { foo: 1 };

obj.foo; // 读取属性 foo 的值
obj.foo++; // 读取和设置属性 foo 的值
```

既然是基本操作，就可以使用 Proxy 拦截。

```js
const p = new Proxy(obj, {
  get () {},
  set () {}
})
```

Proxy 构造函数接收两个参数。第一个参数是被代理的对象，第二个参数也是一个对象，这个对象是一组夹子（trap）。其中 get 函数用来拦截读取操作，set 函数用来拦截设置操作。

在 JavaScript 世界里，万物皆对象。例如一个函数也是一个对象，所以调用函数也是对一个对象的基本操作。因此，我们可以用 Proxy 拦截函数的调用操作，这里我们使用 apply 拦截函数的调用。

```js
const fn = name => { console.log('我是: ', name); }

const p2 = new Proxy(fn, {
  apply (target, thisArg, argArray) {
    target.call(thisArg, ...argArray);
  }
});

p2('heora'); // 我是:  heora
```

Proxy 只能够拦截对一个对象的基本操作。调用对象下的方法属于非基本操作，我们叫它复合操作。

```js
obj.fn();
```

调用一个对象下的方法， 是由两个基本语义组成的。第一个基本语义是 get，即先通过 get 操作得到 `obj.fn` 属性。第二个语义是函数调用，即通过 get 得到 `obj.fn` 的值后在调用它，也就是我们上面说到的 apply。理解 Proxy 只能代理对象的基本语义很重要。当我们实现对数组或 Map、Set 等数据类型的代理时，都利用了 Proxy 的这个特点。

了解了 Proxy，我们再来讨论 Reflect。Reflect 是一个全局对象，它有很多方法。

```js
Reflect.get();
Reflect.set();
Reflect.apply();
// ...
```

Reflect 下的方法与 Proxy 拦截器方法名字相同，任何在 Proxy 的拦截器中找到的方法， 都可以在 Reflect 中找到同名函数，那么这些函数的作用是什么？以 `Reflect.get` 函数来说，它的功能就是提供访问一个对象属性的默认行为。

```js
const obj = { foo: 1 };

console.log(obj.foo); // 直接读取
console.log(Reflect.get(obj, 'foo')); // 通过 Reflect.get 读取
```

`Refelct.*` 方法与响应式数据的实现密切相关。

```js
const data = { foo: 1 };

const obj = new Proxy(data, {
  get (target, key) {
    track(target, key);
    return target[key];
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});
```

这是我们实现响应式数据最基本的代码。在 get 和 set 拦截函数中直接使用原始对象 target 来完成对属性的读取和设置操作。

这段代码其实还有问题。

```js
const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};

// ...

effect(() => {
  console.log(obj.bar);
});

obj.foo++;
```

bar 属性是一个访问器属性，它返回了 `this.foo` 属性的值。我们在 effect 副作用函数中通过代理对象 p 访问 bar 属性。

当 effect 注册的副作用函数执行时，会读取 `obj.bar` 属性值，它发现 `obj.bar` 是一个访问器属性，因此会执行 getter 函数。由于在 getter 函数中通过 `this.foo` 读取了 foo 属性值，因此我们认为副作用函数与属性 foo 之间也会建立联系。当我们修改 `obj.foo` 时应该能够触发响应，使得副作用函数重新执行。实际并非如此，当我们修改 `obj.foo` 值时，副作用函数并不会重新执行。

问题出在 bar 属性的访问起函数 getter 里。

```js
const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};
```

在 get 拦截函数内，通过 `target[key]` 返回属性值。其中 target 是原始值 `data`，key 就是字符串 `bar`，所以 `target[key]` 相当于 `data.bar`。因此当我们使用 `obj.bar` 访问 bar 属性时，它的 getter 函数内的 this 指向的其实是原始对象 `data`，这说明最终访问的其实是 `data.foo`。在副作用函数内通过原始对象访问它的某个属性是不会建立响应联系的。

```js
effect(() => {
  data.foo; // data 是原始数据，不是代理对象，不能建立响应联系
});
```

我们可以使用 `Reflect.get` 函数解决这个问题。

```js
const data = {
  foo: 1,
  get bar () {
    return this.foo
  }
};

const obj = new Proxy(data, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  }
});

effect(() => {
  console.log(obj.bar);
});

obj.foo++;
```

> receiver 用来处理定义在 prototype 上的 getter 。

我们在代理对象的 get 拦截函数接收第三个参数 receiver，它代表谁在读取属性。

```js
obj.bar
```

当我们使用代理对象 obj 访问 bar 属性时，那么 receiver 就是 obj，你可以简单地理解为函数调用中的 this。我们使用 `Reflect.get(target, key, receiver)` 代替之前的 `target[key]`，这里的关键点就是第三个参数。它会使访问器属性中 bar 的 getter 函数内的 this 指向代理对象 obj。

```js
const data = {
  foo: 1,
  get bar () {
    // this 为 obj 对象
    return this.foo
  }
};
```

this 由原始对象 data 变成代理对象 obj。这会在副作用函数与响应式数据之间建立响应联系，从而达到依赖收集的效果。如果此时再对 `obj.foo` 进行自增操作，会发现已经可以触发副作用函数重新执行了。

#### 对象及 Proxy 的工作原理

我们经常听说 “JavaScript 中一切皆对象”，那么到底什么是对象那？

根据 ECMAScript  规范，在 JavaScript 中有两种对象，一种叫做常规对象（ordinary object），另一种叫做异质对象（exotic object）。这两种对象包含了 JavaScript 世界中的所有对象，任何不属于常规对象的对象都是异质对象。

我们知道，在 JavaScript 中，函数其实也是对象。假设给出一个对象 obj，如何区分它是普通对象还是函数呢？实际上，在 JavaScript 中，对象的实际语义是由对象的内部方法（internal method）指定的。所谓内部方法，指的是当我们对一个对象进行操作时在引擎内部调用的方法，这些方法对于 JavaScript 使用者来说是不可见的。当我们访问对象属性时：

```js
obj.foo
```

引擎内部会调用 `[[Get]]` 这个内部方法来读取属性值。在 ECMAScript 规范中使用 `[[xxx]]` 来代表内部方法或内部槽。当然，一个对象不仅部署了 `[[Get]]` 这个内部方法。

##### 对象必要的内部方法

> https://tc39.es/ecma262/#sec-invariants-of-the-essential-internal-methods

| 内部方法                | 签名                                             | 描述                                                         |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `[[GetPrototypeOf]]`    | () => Object \| Null                             | 查明为该对象提供继承属性的对象，null 代表没有继承属性        |
| `[[SetPrototypeOf]]`    | (Object \|Null) => Boolean                       | 将该对象与提供继承属性的另一个对象相关联。传递 null 表示没有继承属性，返回 true 表示操作成功完成，返回 false 表示操作失败 |
| `[[IsExtensible]]`      | () => Boolean                                    | 查明是否允许向该对象添加其他属性                             |
| `[[PreventExtensions]]` | () => Boolean                                    | 控制能否向该对象添加新属性。如果操作成功则返回 true，操作失败则返回 false |
| `[[GetOwnProperty]]`    | (propertyKey) => Undefined \| PropertyDescriptor | 返回该对象自身属性的描述符，其键为 propertyKey，如果不存在这样的属性，则返回 undefined |
| `[[DefineOwnProperty]]` | (propertyKey, PropertyDescriptor) => Boolean     | 创建或更改自己的属性，其键为 propertyKey，以具有由 PropertyDescriptor 描述的状态。如果该属性已创建或更新，则返回 true；如果无法创建或更新该属性，则返回 false |
| `[[HasProperty]]`       | (propertyKey) => Boolean                         | 返回一个布尔值，指示该对象是否已经拥有键为 propertyKey 的自己的或继承的属性 |
| `[[Get]]`               | (propertyKey, Receiver) => any                   | 从该对象返回键为 propertyKey 的属性的至。如果必须运行 ECMAScript 代码来检索属性值，则在运行代码时使用 Receiver 作为 this 值 |
| `[[Set]]`               | (propertyKey, value, Receiver) => Boolean        | 将键值为 propertyKey 的属性的值设置为 value。如果必须运行 ECMAScript 代码来设置属性值，则在运行代码时使用 Receiver 作为 this 值。如果成功设置了属性值，则返回 true；如果无法设置，则返回 false |
| `[[Delete]]`            | (propertyKey) => Boolean                         | 从该对象删除属于自身的键为 propertyKey 的属性。如果该属性未被删除并且仍然存在，则返回 false；如果该属性已被删除或不存在，则返回 true |
| `[[OwnPropertyKeys]]`   | () => List of propertyKey                        | 返回一个 List，其元素都是对象自身的属性值                    |                                         

包括 `[[Get]]` 在内，一个对象必须部署 11 种必要的内部方法。除了上面的内部方法之外，还有两个额外的必要内部方法。

##### 额外的必要内部方法

| 内部方法        | 签名                              | 描述                                                         |
| --------------- | --------------------------------- | ------------------------------------------------------------ |
| `[[Call]]`      | (any, a list of any) => any       | 将运行的代码与 this 对象关联。由函数调用触发。该内部方法的参数是一个 this 值和参数列表 |
| `[[Construct]]` | (a list of any, Object) => Object | 创建一个对象。通过 new 运算符或 super 调用触发。该内部方法的第一个参数是一个 List，该 List 的元素是构造函数调用或 Super 调用的参数，第二个参数是最初应用 new 运算符的对象。实现该内部方法的对象称为构造函数 |

如果一个对象需要作为函数调用，那么这个对象就必须部署内部方法 `[[call]]`。我们可以通过内部方法和内部槽来区分对象，例如函数对象会部署内部方法 `[[Call]]` ，而普通对象不会。

内部方法具有多态性。不同类型的对象可能部署了相同的内部方法，但是具有不同的逻辑。例如，普通对象和 Proxy 对象都部署了 `[[Get]]` 这个内部方法，但它们的逻辑是不同的，普通对象部署的 `[[Get]]` 内部方法的逻辑是由 ECMA 规范的 10.1.8 节定义的，而 Proxy 对象部署的 `[[Get]]` 内部方法的逻辑在 ECMA 规范的 10.5.8 节定义。

https://tc39.es/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots-get-p-receiver

https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver

了解内部方法后，就可以解释什么是常规对象，什么是异质对象。

* 对于对象必要的内部方法，必须使用 ECMA 规范 `10.1.x ` 节给出的定义实现；
* 对于内部方法 `[[Call]]`，必须使用 ECMA 规范 10.2.1 节给出的定义实现；
* 对于内部方法 `[[Construct]]` ，必须使用 ECMA 规范 10.2.2 节给出的定义实现。

所有不符合这三点要求的对象都是异质对象。例如，由于 Proxy 对象的内部方法 `[[Get]]` 没有使用 ECMA 规范 10.1.8 节给出的定义实现，所以 Proxy 是一个异质对象。

Proxy 是一个对象，它本身部署了上述必要的内部方法，当我们通过代理对象访问属性值时：

```js
const p = new Proxy(obj, { /** ... */ });
p.foo
```

引擎会调用部署在在对象 p 上的内部方法 `[[Get]]` 。代理对象和普通对象没有太大区别。它们的区别在于对于内部方法 `[[Get]]` 的实现，这里就体现了内部方法的多态性，即不同的对象部署相同的内部方法，但它们的行为可能不同。具体体现在，如果在创建代理对象时没有指定对应的拦截函数，例如没有指定 `get()` 拦截函数，那么当我们通过代理对象访问属性值时，代理对象的内部方法 `[[Get]]` 会调用原始对象的内部方法 `[[Get]]` 来获取属性值，这其实就是代理透明性质。

创建代理对象时指定的拦截函数，实际上是用来自定义代理对象本身的内部方法和行为，而不是用来指定被代理对象的内部方法和行为的。下面列出了 Proxy 对象部署的所有内部方法以及用来自定义内部方法和行为的拦截函数名字。

##### Proxy 对象部署的内部方法

Proxy 对象部署的所有内部方法。

| 内部方法                | 处理器函数               |
| ----------------------- | ------------------------ |
| `[[GetPrototypeOf]]`    | getPrototyeOf            |
| `[[SetPrototypeOf]]`    | setPrototypeOf           |
| `[[IsExtensible]]`      | isExtensible             |
| `[[PreventExtensions]]` | preventExtensions        |
| `[[GetOwnProperty]]`    | getOwnPropertyDescriptor |
| `[[DefineOwnProperty]]` | defineProperty           |
| `[[HasProperty]]`       | has                      |
| `[[Get]]`               | get                      |
| `[[Set]]`               | set                      |
| `[[Delete]]`            | deleteProperty           |
| `[[OwnPropertyKeys]]`   | ownKeys                  |
| `[[Call]]`              | apply                    |
| `[[Construct]]`         | construct                |

其中 `[[Call]]` 和 `[[Construct]]` 这两个内部方法只有当被代理的对象是函数和构造函数时才会部署。

我们要拦截删除属性操作时，可以使用 deleteProperty 拦截函数实现。

```js
const data = { foo: 1 };

const obj = new Proxy(data, {
  deleteProperty (target, key) {
    return Reflect.deleteProperty(target, key);
  }
});

console.log(obj.foo);
delete obj.foo;
console.log(obj.foo);
```

deleteProperty 实现的是大力对象 obj 的内部方法和行为，所以为了删除被代理对象上的属性值，我们需要使用 `Reflect.deleteProperty(target, key)` 来完成。

#### 如何代理对象

之前我们使用 get 拦截函数去拦截对属性的读取操作。在响应系统中，“读取” 是一个很宽泛的概念，例如使用 in 操作符检查对象上是否具有给定的 key 也属于 “读取” 操作。

```js
effect(() => {[
  'foo' on obj
]});
```

这本质是也是在进行 “读取” 操作。响应系统应该拦截一切读取操作，以便当数据变化时能够正确地触发响应。

* 访问属性：`obj.foo`
* 判断对象或原型上是否存在给定的 key：`key in obj`
* 使用 `for ... in` 循环遍历对象: `for (const key in obj) {}`

接下来，我们逐步讨论如何拦截这些读取操作。对于属性的读取，例如 `obj.foo`，我们可以使用 get 拦截函数实现。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});
```

对于 in 操作符，应该如何拦截？在 ECMA-262 规范的 13.10.1 节中，明确定义了 in 操作符的运行时逻辑。

https://tc39.es/ecma262/#sec-relational-operators-runtime-semantics-evaluation

```js
RelationalExpression : RelationalExpression in ShiftExpression
1. Let lref be the result of evaluating RelationalExpression.
2. Let lval be ? GetValue(lref).
3. Let rref be the result of evaluating ShiftExpression.
4. Let rval be ? GetValue(rref).
5. If Type(rval) is not Object, throw a TypeError exception.
6. Return ? HasProperty(rval, ? ToPropertyKey(lval)).
```

1. 让 `lref` 的值为 `RelationalExpression` 的执行结果；
2. 让 `lval` 的值为 `? GetValue(lref)` ;
3. 让 `rref` 的值为 `ShiftExpression` 的执行结果；
4. 让 `rval` 的值为 `? GetValue(rref)` ;
5. 如果 `Type(rval)` 不是对象，则抛出异常；
6. 返回 `? HasProperty(rval, ? ToPropertyKey(lval))`.

关键点在第 6 步，可以发现，in 操作符的运算结果是通过调用一个叫做 `HasProperty` 的抽象方法得到的。

`HasProperty` 抽象方法，可以在 ECMA-262 规范中的 7.3.12 找到。

https://tc39.es/ecma262/#sec-hasproperty

```js
1. Return ? O.[[HasProperty]](P).
```

 `HasProperty` 抽象方法的返回值是通过调用对象的内部方法 `[[HasProperty]]` 得到的。`[[HasProperty]]` 是对象必要的内部方法，它对应的拦截函数叫 has，因此我们可以通过 has 拦截函数实现对 in 操作符的处理。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  has (target, key) {
    track(target, key);
    return Reflect.has(target, key);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});
```

这样我们在副作用函数中通过 in 操作符操作响应式数据时，就能够建立依赖关系。

接着来看如何拦截 `for...in` 循环。我们所有能够拦截的方法有 13 种，它们是一个对象的所有基本语义方法，也就是说，任何操作其实都是由这些基本语义方法及其组合实现的，`for...in` 循环也不例外。

https://tc39.es/ecma262/#sec-runtime-semantics-forinofheadevaluation

```js
6. If iterationKind is enumerate, then
	a. If exprValue is undefined or null, then
		i. Return Completion Record { [[Type]]: break, [[Value]]: empty, [[Target]]: empty }.
	b. Let obj be ! ToObject(exprValue).
	c. Let iterator be EnumerateObjectProperties(obj).
	d. Let nextMethod be ! GetV(iterator, "next").
	e. Return the Iterator Record { [[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false }.
```

在 ECMA 262 规范的 14.7.5.6 节中定义了 `for...in` 头部的执行规则。

6. 如果 `iterationKind` 是枚举（enumerate），则
   1. 如果 `exprValue` 是 undefined 或 null，返回 `Completion Record { [[Type]]: break, [[Value]]: empty, [[Target]]: empty }`
   2. 让 `obj` 的值为 `! ToObject(exprValue)`
   3. 让 `iterator` 的值为 `EnumerateObjectProperties(obj)`
   4. 让 `nextMethod` 的值为 `! GetV(iterator, "next")`
   5. 返回 ` Iterator Record { [[Iterator]]: iterator, [[NextMethod]]: nextMethod, [[Done]]: false }`

仔细观察这一子步骤：

```js
让 iterator 的值为 EnumerateObjectProperties(obj)
```

其中的关键点在于 `EnumerateObjectProperties(obj)` 。这里的 `EnumerateObjectProperties` 是一个抽象方法，该方法返回一个迭代器对象，规范中的 14.7.5.9 给出了满足该抽象方法的示例实现。

https://tc39.es/ecma262/#sec-enumerate-object-properties

```js
function* EnumerateObjectProperties(obj) {
  const visited = new Set();
  for (const key of Reflect.ownKeys(obj)) {
    if (typeof key === "symbol") continue;
    const desc = Reflect.getOwnPropertyDescriptor(obj, key);
    if (desc) {
      visited.add(key);
      if (desc.enumerable) yield key;
    }
  }
  const proto = Reflect.getPrototypeOf(obj);
  if (proto === null) return;
  for (const protoKey of EnumerateObjectProperties(proto)) {
    if (!visited.has(protoKey)) yield protoKey;
  }
}
```

可以看到，该方法是一个 generator 函数，接收一个参数 obj。实际上，obj 就是被 `for...in` 循环遍历的对象，其关键点在于使用 `Reflect.ownKeys(obj)` 来获取只属于对象自身拥有的键。我们可以使用 `ownKeys` 拦截函数来拦截 `Reflect.ownKeys` 操作。

```js
const obj = { foo: 1 };
const ITERATE_KEY = Symbol();

const p = new Proxy(obj, {
	// ...
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});
```

拦截 `ownKeys` 操作即可间接拦截 `for...in` 循环。但是我们为什么要使用 `ITERATE_KEY` 作为追踪的 key？

`ownKeys` 拦截函数与 `get/set` 拦截函数不同，在 `get/set` 中，我们可以得到具体操作的 `key`，但是在 `ownKeys` 中，我们只能拿到目标对象 `target`。在读写属性值时，可以明确地知道当前正在操作哪一个属性，所以只需要在该属性与副作用函数之间建立联系即可。`ownKeys` 用来获取一个对象的所有属于自己的键值，这个操作明显不与任何具体的键进行绑定，因此我们只能构造唯一的 `key` 作为标识，即 `ITERATE_KEY`。

既然追踪的是 `ITERATE_KEY`，在触发响应的时候也应该触发它才行：

```js
trigger(target, ITERATE_KEY);
```

我们用一段代码来说明。假设副作用函数内有一段 `for...in` 循环。

```js
const obj = { foo: 1 };
const ITERATE_KEY = Symbol();

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

p.bar = 2;
```

由于对象 p 原本只有 foo 属性，因此 for...in 循环只会执行一次。现在为它添加了新的属性 bar，所以 for...in 循环就会由执行一次变成执行两次。也就是说，当为对象添加新属性时，会对 for...in 循环产生影响，所以需要触发与 `ITERATE_KEY` 相关联的副作用函数重新执行。但我们之前的 effect 实现还做不到这一点。

```js
const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    const res = Reflect.set(target, key, newVal);
    trigger(target, key);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});
```

当为对象 p 添加新的 bar 属性时，会触发 set 拦截函数执行。此时 set 拦截函数接收到的 key 就是字符串 'bar'，因此最终调用 trigger 函数时也只是触发与 'bar' 相关联的副作用函数重新执行。但根据前文的介绍，我们知道 for...in 循环是在副作用函数与 `ITERATE_KEY` 之间建立联系，这和 'bar' 一点关系都没有，因此当我们尝试执行 `p.bar = 2` 操作时，并不会正确地触发响应。

弄清楚问题在哪，我们就可以解决这个问题了。当添加属性时，我们将那些与 `ITERATE_KEY` 相关联的副作用函数也取出来执行。

```js
function trigger (target, key) {
 // 使用 target 从 bucket 中获取 depsMap，key -> effects
 const depsMap = bucket.get(target);

 if (!depsMap) return;

 // 根据 key 从 depsMap 中获取 effects
 const effects = depsMap.get(key);
 // 获取与 ITERATE_KEY 相关联的副作用函数（☆☆☆）
 const iterateEffects = depsMap.get(ITERATE_KEY);

 const effectsToRun = new Set();

 // 将与 key 相关联的副作用函数添加到 effctesToRun
 effects && effects.forEach(effectFn => {
   // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
   if (effectFn !== activeEffect) {
     effectsToRun.add(effectFn);
   }
 })
 // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun（☆☆☆）
 iterateEffects && iterateEffects.forEach(effectFn => {
  if (effectFn !== activeEffect) {
    effectsToRun.add(effectFn);
  }
 });
 
 //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
 effectsToRun.forEach(effectFn => {
   // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
   if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
   } else {
    effectFn();
   }
 });
}
```

当 trigger 函数执行时，除了把那些直接与具体操作的 key 相关联的副作用取出来执行外，还要把那些与 `ITERATE_KEY` 相关联的副作用函数取出来执行。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  set (target, key, newVal) {
    const res = Reflect.set(target, key, newVal);
    trigger(target, key);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

p.bar = 2;
```

对于添加新的属性来说，这么做没有什么问题，但如果仅仅修改已有属性的值，就会存在问题。

```js
p.foo = 2;
```

与添加属性不同，修改属性不会对 `for...in` 循环产生影响。因为无论怎么修改一个属性的值，对于 `for...in` 玄幻来说都只会循环一次。所以在这种情况下，我们不需要触发副作用函数重新执行，否则会造成不必要的性能开销。然而无论是添加新属性，还是修改已有的属性值，其基本语义都是 `[[Set]]`，我们都是通过 set 拦截函数来实现拦截的。

```js
const p = new Proxy(obj, {
	// ...
  set (target, key, newVal) {
    const res = Reflect.set(target, key, newVal);
    trigger(target, key);
    return res;
  },
	// ...
});
```

所以如果相解决上述问题，当设置属性操作发生时，就需要我们在 set 拦截函数内能够区分操作的类型，区分出是添加新属性还是设置已有属性。

```js
const obj = { foo: 1 };

const hasOwnProperty = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  set (target, key, newVal, receiver) {
    const type = hasOwnProperty(target, key) ? 'SET' : 'ADD';
    const res = Reflect.set(target, key, newVal, receiver);
    trigger(target, key, type);
    return res;
  },
});
```

我们优先使用 `Object.prototype.hasOwnProperty` 检查当前操作的属性是否已经存在于目标对象上，如果存在，则说明当前操作类型为 'SET'，即修改属性值；否则认为当前操作类型为 'ADD'，即添加新属性。我们把类型作为第三个参数传递给 trigger 函数。

在 trigger 函数内就可以通过类型 type 来区分当前的操作类型，并且只有当操作类型 type 为 'ADD' 时，才会触发 `ITERATE_KEY` 相关联的副作用函数重新执行，这样就避免了不需要的性能损耗。

```js
function trigger (target, key, type) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  // 将与 key 相关联的副作用函数添加到 effctesToRun
  effects && effects.forEach(effectFn => {
    // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })

  if (type === 'ADD') {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    
    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

通常我们会将操作类型封装为一个枚举值。

```js
const TRIGGER_TYPE = {
  SET: 'SET',
  ADD: 'ADD'
};
```

这样无论是对后期代码维护，还是对代码的清晰度，都是非常有帮助的。

关于对象的代理，还剩下最后一部分，就是删除属性操作的代理。

```js
delete p.foo;
```

如何代理 delete 操作符呢？规范的 13.5.1.2 节中明确定义了 delete 操作符的行为。

```js
13.5.1.2 Runtime Semantics: Evaluation
UnaryExpression : delete UnaryExpression
	1. Let ref be the result of evaluating UnaryExpression.
	2. ReturnIfAbrupt(ref).
	3. If ref is not a Reference Record, return true.
	4. If IsUnresolvableReference(ref) is true, then
		a. Assert: ref.[[Strict]] is false.
		b. Return true.
	5. If IsPropertyReference(ref) is true, then
		a. Assert: IsPrivateReference(ref) is false.
		b. If IsSuperReference(ref) is true, throw a ReferenceError exception.
		c. Let baseObj be ? ToObject(ref.[[Base]]).
		d. Let deleteStatus be ? baseObj.[[Delete]](ref.[[ReferencedName]]).
		e. If deleteStatus is false and ref.[[Strict]] is true, throw a TypeError exception.
		f. Return deleteStatus.
	6. Else,
		a. Let base be ref.[[Base]].
		b. Assert: base is an Environment Record.
		c. Return ? base.DeleteBinding(ref.[[ReferencedName]]).
```

5. 如果 `IsPropertyReference(ref)` 是 true，那么
   1. 断言：`IsPrivateReference(ref)` 是 false
   2. 如果 `IsSuperReference(ref)` 也是 true，则抛出 `ReferenceError` 异常
   3. 让 `baseObj`  的值为 `? ToObject(ref.[[Base]])`
   4. 让 `deleteStatus` 的值为 `? baseObj.[[Delete]](ref.[[ReferencedName]])`
   5. 如果 `deleteStatus` 的值为 false 并且 `ref.[[Strict]]` 的值是 true，则抛出 `TypeError` 异常
   6. 返回 `deleteStatus`

由第 5 步的 d 子步骤可知，delete 操作符的行为依赖 `[[Delete]]` 内部方法。该内部方法可以使用 `deleteProperty` 拦截。

```js
const TRIGGER_TYPE = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE'
};
```

```js
const p = new Proxy(obj, {
	// ...
  deleteProperty (target, key) {
    // 检查被操作的属性是否是对象自己的属性
    const hadKey = Object.prototype.hasOwnProperty.call(target, key);
    // 使用 Reflect.deleteProperty 删除属性
    const res = Reflect.deleteProperty(target, key);

    if (res && hadKey) {
      // 只有当被删除属性时对象自身属性并且删除成功时，才出发更新
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }

    return res;
  }
});
```

在调用 trigger 函数时，我们传递了新的操作类型 ‘DELETE’。由于删除操作会使得对象的建变少，它会影响 `for...in` 循环的次数，因此当操作类型为 'DELETE' 时，我们也应该触发那些与 `ITERATE_KEY` 相关联的副作用函数重新执行。

```js
function trigger (target, key, type) {
  // 使用 target 从 bucket 中获取 depsMap，key -> effects
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  // 根据 key 从 depsMap 中获取 effects
  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  // 将与 key 相关联的副作用函数添加到 effctesToRun
  effects && effects.forEach(effectFn => {
    // 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })

  // 操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数执行
  if (type === TRIGGER_TYPE.ADD || type === TRIGGER_TYPE.DELETE) {
    // 获取与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    
    // 将与 ITERATE_KEY 相关联的副作用函数也添加到 effectsToRun
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

在这段代码中，我们添加 `type === 'DELETE'` 判断，使得删除属性操作能够触发与 `ITERATE_KEY` 相关联的副作用函数重新执行。

```js
const {
  effect, track, trigger,
  ITERATE_KEY, TRIGGER_TYPE
} = require('../shared/effect');

const obj = { foo: 1 };

const p = new Proxy(obj, {
  get (target, key, receiver) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  set (target, key, newVal, receiver) {
    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);
    trigger(target, key, type);
    return res;
  },
  ownKeys (target) {
    track(target, ITERATE_KEY);
    return Reflect.ownKeys(target);
  },
  deleteProperty (target, key) {
    const hadKey = Object.prototype.hasOwnProperty.call(target, key);
    const res = Reflect.deleteProperty(target, key);

    if (res && hadKey) {
      trigger(target, key, TRIGGER_TYPE.DELETE);
    }

    return res;
  }
});

effect(() => {
  for (const key in p) {
    console.log(key);
  }
});

// p.bar = 2;
// p.foo = 2;
delete p.foo;
```

#### 合理地触发响应

我们从规范的角度介绍了如何代理对象，这个过程中，我们处理了很多边界条件。例如，我们需要明确知道操作的类型是 ‘ADD’ 还是 'SET'，或者是其他操作类型，从而正确地触发响应。但想要合理地触发响应，还有许多工作要做。

下面我们来看第一个问题，即当值没有发生变化时，不需要触发影响。

```js
const obj = { foo: 1 };

const p = new Proxy(obj, { /* ... */ });

effect(() => {
  console.log(p.foo);
});

p.foo = 1;
```

`p.foo` 的初始值为 1，当为 `p.foo` 设置新的值时，如果值没有发生变化，则不需要触发响应。为了满足需求，我们需要修改 set 拦截函数的代码，在调用 trigger 函数触发响应之前，需要检查值是否真的发生了变化。

```js
const p = new Proxy(obj, {
	// ...
  set (target, key, newVal, receiver) {
    const oldVal = target[key];

    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);

    if (oldVal !== newVal) {
      trigger(target, key, type);
    }

    return res;
  },
	// ...
});
```

我们在 set 拦截函数内首先获取旧值 `oldVal`，接着比较新值与旧值，只有当它们不全等的时候才触发响应。

但是仅仅进行全等比较是有缺陷的，体现在对 `NaN` 的处理上 。`NaN` 与 `NaN` 进行全等比较总会得到 false。

```js
const obj = { foo: NaN };

effect(() => {
  console.log(p.foo);
});

p.foo = NaN;

// NaN
// NaN
```

为了解决这个问题，我们需要再加一个条件，新值和旧值不全等的情况下，保证它们都不是 `NaN`。这样就解决了 `NaN` 的问题。

```js
const p = new Proxy(obj, {
	// ...
  set (target, key, newVal, receiver) {
    const oldVal = target[key];

    const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
    const res = Reflect.set(target, key, newVal, receiver);
			
    // 不全等且都不是 NaN
    if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
      trigger(target, key, type);
    }

    return res;
  },
	// ...
});
```

接下来，我们讨论一种从原型上继承属性的情况。为了讲解方便，我们需要封装一个  reactive 函数，该函数接收一个对象作为参数，并返回为其创建的响应式数据。

```js
const {
  track, trigger,
  ITERATE_KEY, TRIGGER_TYPE
} = require('../shared/effect');

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    ownKeys (target) {
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    set (target, key, newVal, receiver) {
      const oldVal = target[key];
  
      const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
      const res = Reflect.set(target, key, newVal, receiver);
  
      if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
        trigger(target, key, type);
      }
  
      return res;
    },
    ownKeys (target) {
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty (target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
  
      if (res && hadKey) {
        trigger(target, key, TRIGGER_TYPE.DELETE);
      }
      return res;
    }
  });
}
```

reactive 函数只是对 Proxy 进行了一层封装。我们可以基于 reactive 创建一个例子。

```js
const obj = {};
const proto = { bar: 1 };

const child = reactive(obj);
const parent = reactive(proto);

Object.setPrototypeOf(child, parent);

effect(() => {
  console.log(child.bar);
});

child.bar = 2; // 会导致副作用函数重新执行两次 1 2 2
```

我们定义了空对象 obj 和对象 `proto`，分别为两者创建了对应的响应式数据 child 和 parent，并且使用 `Object.setProtypeOf` 方法将 parent 设置为 child 的原型。我们在副作用函数内访问 `child.bar` 的值。child 本身并没有 bar 属性，因此当访问 `child.bar` 时，值是从原型上继承而来的。但既然 child 是响应式数据，那么它与副作用函数之间就会建立联系，因此当我们执行 `child.bar = 2` 时，副作用函数会重新触发。但是执行代码你会发现，副作用函数不仅执行了，还执行了两次。

 当在副作用函数中读取 `child.bar` 的值时，会触发 child 代理对象的 get 拦截函数。在拦截函数内使用 `Reflect.get(target, key, receiver)` 来得到最终结果。

```js
Reflect.get(obj, 'bar', receiver);
```

这其实是实现通过 `obj.bar` 来访问属性值的默认行为。引擎内部是通过调用 obj 对象所部署的 `[[Get]]` 内部方法来得到最终结果的，因此我们有必要查看规范 10.1.8.1 节来了解 `[[Get]]` 内部方法的执行流程。

```js
1. Let desc be ? O.[[GetOwnProperty]](P).
2. If desc is undefined, then
	a. Let parent be ? O.[[GetPrototypeOf]]().
	b. If parent is null, return undefined.
	c. Return ? parent.[[Get]](P, Receiver).
3. If IsDataDescriptor(desc) is true, return desc.[[Value]].
4. Assert: IsAccessorDescriptor(desc) is true.
5. Let getter be desc.[[Get]].
6. If getter is undefined, return undefined.
7. Return ? Call(getter, Receiver).
```

3. 如果 `desc` 是 undefined，那么
   1. 让 parent 的值为 `? O.[[GetPrototypeOf]]()`
   2. 如果 parent 是 null，则返回 `undefined`
   3. 返回 `? parent.[[Get]](P, Receiver)`

如果对象自身不存在该属性，那么会获取对象的原型，并调用原型的 `[[Get]]` 方法得到最终结果。也就是说，当读取 `child.bar` 属性值时，由于 child 代理的对象 obj 自身没有 bar 属性，因此会获取对象 obj 的原型，也就是 parent 对象，所以最终得到的实际上 `parent.bar` 的值。parent 本身也是响应式对象，因此在副作用函数中访问 `parent.bar` 的值时，会导致副作用函数被收集，从而建立响应联系。`child.bar` 和 `parent.bar` 都与副作用函数建立了响应联系。

我们还需要看看设置操作发生时的具体执行流程。当执行 `child.bar = 2` 时，会调用 child 代理对象的 set 拦截函数。同样，在 set 拦截函数中，我们用 `Reflect.set(target, key, newVal, receiver)` 来完成默认的设置行为，即引擎会调用 obj 对象部署的 `[[Set]]` 内部方法，根据规范 10.1.9.2 节可知 `[[Set]]` 内部方法的执行流程。

```js
1. If ownDesc is undefined, then
	a. Let parent be ? O.[[GetPrototypeOf]]().
	b. If parent is not null, then
		i. Return ? parent.[[Set]](P, V, Receiver).
	c. Else,
		i. Set ownDesc to the PropertyDescriptor { [[Value]]: undefined, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }.
```

1. 如果 `ownDesc` 是 undefined，那么
   1. 让 parent 的值为 `O.[[GetPrototypeOf]]()`
   2. 如果 parent 不是 null，则
      1. 返回 `? parent.[[Set]](P, V, Receiver)`
   3. 否则
      1. 将 `ownDesc` 设置为 `{ [[Value]]: undefined, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true }`

如果设置的属性不存在于对象上，那么会取得其原型，并调用原型的 `[[Set]]` 方法，也就是 parent 的 `[[Set]]` 内部方法。由于 parent 是代理对象，所以这就相当于执行它的 set 拦截函数。换句话说，虽然我们操作的是 `child.bar`，但这也会导致 parent 代理对象 set 拦截函数被执行。当读取 `child.bar` 的值时，副作用函数不仅会被 `child.bar` 收集，也会被 `parent.bar` 收集。所以当 parent    代理对象的 set 拦截函数执行时，就会触发副作用函数重新执行，那就是为什么修改 `child.bar` 的值会导致副作用函数重新执行两次。

其实解决思路也很简单，既然执行两次，那么只要屏蔽其中一次就可以。我们可以把由 `parent.bar` 触发的那次副作用函数的重新执行屏蔽。两次更新是由于 set 拦截函数被触发两次导致的，所以只要我们能够在 set 拦截函数内区分这两次更新就可以了。当我们设置 `child.bar` 的值时，会执行 child 代理对象的 set 拦截函数。

```js
// child 的 set 拦截函数
set (target, key, value, receiver) {
  // target 是原始对象 obj
  // receiver 是代理对象 child
}
```

此时的 target 是原始对象 obj，receiver 是代理对象 child，我们发现 receiver 其实就是 target 的代理对象。

但由于 obj 上不存在 bar 属性，所以会取得 obj 的原型 parent，并执行 parent 代理对象的 set 拦截函数：

```js
// parent 的 set 拦截函数
set (target, key, value, receiver) {
  // target 是原始对象 proto
  // receiver 仍然是代理对象 child
}
```

当 parent 代理对象的 set 拦截函数执行时，此时 target 是原始对象 `proto`，而 `receiver` 仍然是代理对象 `child`，而不再是 `target` 的代理对象。通过这个特点，我们可以看到 target 和 receiver 的区别。由于我们设置的是 `child.bar` 的值，所以无论是在什么情况下，receiver 都是 child，而 target 则是变化的。根据这个区别，我们很容易就可以想到解决办法，只需要判断 receiver 是否是 target 的代理对象即可。只有当 receiver 是 target 的代理对象时才触发更新，这样就能够屏蔽由原型引起的更新了。

所以接下来的问题就变成如何确定 receiver 是不是 target 的代理对象，这需要我们为 get 拦截函数添加一个能力。

```js
function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    }
  });
}
```

我们增加了一段代码，它可以让代理对象通过 raw 属性读取原始数据。

```js
console.log(child.raw === obj); // true
console.log(parent.raw === proto); // true
```

有了它，我们就能够在 set 拦截函数中判断 receiver 是不是 target 的代理对象。

```js
function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set (target, key, newVal, receiver) {
      const oldVal = target[key];
      const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
      const res = Reflect.set(target, key, newVal, receiver);

      // taget === receiver.raw 说明 receiver 是 target 的代理对象
      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type);
        }
      }
  
      return res;
    }
  });
}
```

我们新增了一个判断条件，只有当 receiver 是 target 的代理对象时才触发更新，这样就能屏蔽由原型引起的更新，从而避免不必要的更新操作。

#### 浅响应与深响应

这一节我们介绍 reactive 与 shallowReactive 的区别，即深响应和浅响应的区别。实际上，我们目前所实现的 reactive 是浅响应的。

```js
const obj = reactive({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo.bar = 2; // 修改 obj.foo.bar 的值，并不能触发响应
```

我们创建 obj 代理对象，该对象的 foo 属性值也是一个对象，即 `{ bar: 1 }` 。在副作用函数内访问 `obj.foo.bar` 的值时，会发现后续对 `obj.foo.bar` 的修改不能触发副作用函数重新执行。

```js

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    }
  });
}
```

我们读取 `obj.foo.bar` 时，首先要读取 `obj.foo` 的值。这里我们直接用 `Reflect.get` 函数返回 `obj.foo` 的结果。由于通过 `Reflect.get`  得到 `obj.foo` 的结果是一个普通对象，即 `{ bar: 1 }`，它并不是一个响应式对象，所以在副作用函数中访问 `obj.foo.bar`  时，是不能建立响应联系的。要解决这个问题，我们需要对 `Reflect.get` 返回的结果做一层包装：

```js
const isPlainObject = (data) => typeof data === 'object' && data !== null;

function reactive (obj) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
       
      const res = Reflect.get(target, key, receiver);
      if (isPlainObject(res)) {
        return reactive(res);
      }
      return res;
    },
  });
}
```

当读取属性值时，我们首先检测该值是否是对象，如果是对象，则递归地调用 reactive 函数将其包装成响应式数据并返回。这样当使用  `obj.foo` 读取 foo 属性值时，得到的就会是一个响应式数据，因此再通过 `obj.foo.bar` 读取 bar 属性值时，自然就会建立响应联系。这样，当修改 `obj.foo.bar` 的值时，就能够触发副作用函数重新执行了。

但是，并非所有情况下我们都希望深响应，这就催生了 shallowReactive，即浅响应。所谓浅响应，指的是只有对象的第一层属性是响应的。

```js
const obj = shallowReactive({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo = { bar: 2 }; // 响应的，可以触发副作用函数并执行
obj.foo.bar = 3; // 不是响应的，不能触发副作用函数重新执行
```

我们使用 shallowReactive 函数创建了一个浅响应的代理对象 obj。可以发现，只有对象的第一层属性是响应的，第二层及更深层次的属性则不是响应的。

```js
function crateReactive (obj, isShallow = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      track(target, key);
       
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return reactive(res);
      }

      return res;
    }
  });
}
```

```js
function reactive (obj) {
  return crateReactive(obj);
}

function shallowReactive (obj) {
  return crateReactive(obj, true);
}
```

我们可以把对象创建的工作封装到一个新的函数  `createReactive`  中。该函数除了接收原始对象 obj 之外，还接收参数 `isShallow`，代表是否创建浅响应对象。默认情况下，`isShallow` 的值为 false，代表创建深响应对象。当读取属性操作发生时，在 get 拦截函数内如果发现是浅响应的，那么直接返回原始数据即可。

#### 只读和浅只读

我们希望一些数据是只读的，当用户尝试修改只读数据时，会收到警告信息。这样就可以实现对数据的保护，例如组件接收到的 props 对象应该是一个只读数据。这时就需要接下来要讨论的 readonly 函数，它能够将一个数据变成只读的。

```js
const obj = readonly({ foo: 1 });

obj.foo = 2;
```

只读本质上也是对数据对象的代理，我们同样可以使用 `createReactive`  函数来实现。我们可以为 `createReactive`  函数增加第三个参数 `isReadonly` 。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
		// ...
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];
      const type = Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;
      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type);
        }
      }
  
      return res;
    },
  	// ...
    deleteProperty (target, key) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      const res = Reflect.deleteProperty(target, key);
  
      if (res && hadKey) {
        trigger(target, key, TRIGGER_TYPE.DELETE);
      }
      return res;
    }
  });
}
```

```js
function readonly (obj) {
  return crateReactive(obj, false, true);
}
```

我们使用 `createReactive`  创建代理对象时，可以通过第三个参数指定是否创建一个只读的代理对象。同时，我们还修改了 get 拦截函数和 deleteProperty 拦截函数的实现，对于一个对象来说，只读意味着既不可以设置对象的属性值，也不可以删除对象的属性。在这个两个拦截函数中，我们分别添加了是否是只读的判断，一旦数据是只读的，则当这些操作发生时，会打印警告信息，提示用户这是一个非法操作。

其次，如果一个数据是只读的，那就意味着任何方式都无法修改它。因此，没有必要为制度数据建立响应联系。处于这个原因，当在副作用函数中读取一个只读属性的值时，不需要调用 track 函数追踪响应。

```js
const obj = readonly({ foo: 1 });

effect(() => {
  console.log(obj.foo); // 可以读取值，但是不需要在副作用函数与数据之间建立响应关系
});

obj.foo = 2;
```

为了实现这个功能，我们需要修改 get 拦截函数的实现。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      // 非只读才需要建立响应关系
      if (!isReadonly) {
        track(target, key);
      }
       
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return reactive(res);
      }

      return res;
    },
		// ...
  });
}

```

在 get 拦截函数内检测 `isReadonly` 变量的值，判断是否是只读的，只有在非只读的情况下才会调用 track 函数建立响应关系。

我们目前实现的 readonly 函数更应该叫做 `shallowReadonly` ，因为它没有做到深只读。

```js
const obj = readonly({ foo: { bar: 1 } });

effect(() => {
  console.log(obj.foo.bar);
});

obj.foo.bar = 2;

// 1
// 2
```

为了实现深只读，我们还应该在 get 函数内地递归地调用 readonly 将数据包装成只读的代理对象，并将其作为返回值返回。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get (target, key, receiver) {
      if (key === 'raw') {
        return target;
      }

      if (!isReadonly) {
        track(target, key);
      }
       
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (isPlainObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }

      return res;
    },
  });
}
```

如上面的代码所示，我们在返回属性值之前，判断它是否是只读的，如果是只读的，则调用 readonly 函数对值进行包装，并把包装后的只读对象返回。

对于 `shallowReadonly` ，我们只需要修改 `createReactive` 的第二个参数即可。

```js
function readonly (obj) {
  return crateReactive(obj, false, true);
}

function shallowReadonly (obj) {
  return crateReactive(obj, true, true);
}
```

在 `shallowReadonly` 函数内调用 `createReactive` 函数创建代理对象时，将第二个参数 `isShallow` 设置为 true，这样就可以创建一个浅只读的代理对象了。

####　代理数组

在 JavaScript 中，数据只是一个特殊的对象，因此想要更好地实现对数组的代理，就有必要了解相比普通对象，数组到底有有何特殊之处。

我们知道 JavaScript 有两种对象，分别是常规对象和异质对象。数组就是一个异质对象，因为数组对象的 `[[DefineOwnProperty]]`  内部方法与常规对象不同。换句话说，数组对象处理 `[[DefineOwnProperty]]` 这个内部方法之外，其他内部方法的逻辑都与常规对象相同。因此，当实现对数组的代理时，用于代理普通对象的大部分代码都可以继续使用。

```js
const { effect } = require('../shared/effect');
const { reactive } = require('../shared/reactive');

const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

arr[0] = 'bar';

// foo
// bar
```

上面这段代理能够按预期工作。实际上，当我们通过索引或设置数组元素的值时，代理对象的 get/set 拦截函数也会执行，因此我们不需要做任何额外的工作，就能够让数组索引的读取和设置操作是响应式。

对数组操作与普通对象的操作仍然存在不同，下面总结了所有对数组元素或属性的 “读取” 操作：

* 通过索引访问数组元素值：`arr[0]`
* 访问数组的长度：`arr.length`
* 把数组作为对象，使用 `for...in` 循环遍历
* 使用 `for...of` 迭代遍历数组
* 数组的原型方法，如 `concat/join/every/some/find/findIndex/includes` 等，以及其他不改变原数组的原型方法

对数组的操作要比普通对象丰富得多。下面来看下对数组元素或属性 的设置操作有哪些。

* 通过索引修改数组元素值：`arr[1] = 3`
* 修改数组长度：`arr.length = 0`
* 数组的栈方法：`push/pop/shift/unshift`
* 修改原数组的原型方法：`splice/fill/sort`

除了通过数组索引修改数据元素值这种基本操作之外，数组本身还有很多会修改原数组的原型方法。调用这些方法也属于对数组的操作，有些方法的操作语义是 "读取"，有些方法的操作语义是 “设置”。因此，当这些操作发生时，也应该正确地建立响应联系或触发响应。

似乎代理数组的难度要比代理普通对象的难度大很多。但事实并非如此，因为数组本身也是对象，只不过它是异质对象，它与常规对象的差异并不大。因此，大部分用来代理常规对象的代码对于数组也是生效的。

##### 数组的索引与 length

通过数组的索引访问元素的值时，已经可以建立响应联系。

```js
const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

arr[0] = 'bar';
```

但通过索引设置数组的元素值与设置对象的属性值从根本上是不同的，这是因为数组部署的内部 `DefineOwnProperty` 不同于常规对象。实际上，当我们通过索引设置数组元素的值时，会执行数组对象所部署的内部方法 `[[Set]]` ，这一步与设置常规对象的属性值一样。根据规范可知，内部方法 `[[Set]]` 其实依赖于 `[[DefineOwnProperty]]`  ，到了这里就体现出了差异。

数组对象所部署的内部方法 `[[DefineOwnProperty]]` 的逻辑定义在规范的 10.4.2.1 节。

https://tc39.es/ecma262/#sec-array-exotic-objects-defineownproperty-p-desc

```js
1. If P is "length", then
	a. Return ? ArraySetLength(A, Desc).
2. Else if P is an array index, then
	a. Let oldLenDesc be OrdinaryGetOwnProperty(A, "length").
	b. Assert: IsDataDescriptor(oldLenDesc) is true.
	c. Assert: oldLenDesc.[[Configurable]] is false.
	d. Let oldLen be oldLenDesc.[[Value]].
	e. Assert: oldLen is a non-negative integral Number.
	f. Let index be ! ToUint32(P).
	g. If index ≥ oldLen and oldLenDesc.[[Writable]] is false, return false.
	h. Let succeeded be ! OrdinaryDefineOwnProperty(A, P, Desc).
	i. If succeeded is false, return false.
	j. If index ≥ oldLen, then
		i. Set oldLenDesc.[[Value]] to index + 1𝔽.
		ii. Set succeeded to ! OrdinaryDefineOwnProperty(A, "length", oldLenDesc).
		iii. Assert: succeeded is true.
	k. Return true.
3. Return ? OrdinaryDefineOwnProperty(A, P, Desc).
```

第 2 步的 j 子步骤描述的内容如下：

1. 如果 `index >= oldLen` ,  那么
   1. 将 `oldLenDesc.[[Value]]` 设置为 `index + 1`
   2. 让 succeeded 的值为 `OrdinaryDefineOwnProperty(A, 'length', oldLenDesc)`
   3. 断言：succeeded 是 true

可以看到，规范中明确说明，如果设置的索引值大于数组当前的长度，那么要更新数组的 length 数组。所以当通过索引设置元素值时，可能会隐式地修改 length 的属性值。因此在触发响应响应时，也应该触发与 length 属性相关联的副作用函数重新执行。

```js
const arr = reactive(['foo']);

effect(() => {
	console.log(arr.length); // 1
});

// 设置索引为 1 的值，会导致数组的长度变为 2
arr[1] = 'bar';
```

数据的原长度为 1，并且在副作用函数中访问了 length 属性。然后设置数组索引为 1 的元素值，这会导致数组的长度变为 2，因此应该触发副作用函数重新执行。但目前的实现还做不到这一点，为了实现目标，我们需要修改 set 拦截函数。

```js

function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
  	// ...
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];
      const type = Array.isArray(target) 
        // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，如果是，视为 SET 操作，否则是 ADD 操作
        ? Number(key) < target.length ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD
        : Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;

      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type);
        }
      }
  
      return res;
    },
   	// ...
  });
}
```

我们在判断操作类型时，新增了对数组类型的校验。如果代理的目标对象是数组，那么对于操作类型的判断会有所区别。即被设置的索引值如果小于数组长度，就视做 SET 操作，因为它不会改变数组长度；如果设置的索引值大于数组的当前长度，则视为 ADD 操作，因为这汇隐式地修改数组的 length 属性值。有了这些信息，我们就可以在 trigger 函数中正确地触发与数组对象的 length 属性相关联的副作用函数重新执行了。

```js
function trigger (target, key, type) {
	// ...
  
  // 操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length 属性相关联的副作用函数 
  if (type === TRIGGER_TYPE.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length');

    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects && lengthEffects.forEach((effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    }));
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

反过来思考，其实修改数组的 length 属性也会隐式地影响数组元素。

```js
const arr = reactive(['foo']);

effect(() => {
  console.log(arr[0]);
});

// 将数组的长度修改为 0，导致第 0 个元素被删除，因此应该触发响应
arr.length = 0;
```

在副作用函数内访问了数组的第 0 个元素，接着将数组的 length 属性修改为 0。这会隐式地影响数组元素，即所有元素都被删除，所以应该触发副作用函数重新执行。然后并非所有对 length 属性的修改都会影响数组中的已有元素。拿上面例子来说，如果我们将 length 属性设置为 100，这并不会影响第 0 个元素，所以也就不需要触发副作用函数重新执行。当修改 length 属性值时，只有那些索引值大于或等于新的 length 属性值的元素才需要触发响应。但无论如何，目前的实现还做不到这一点，为了实现目标，我们需要修改 set 拦截函数。在调用 trigger 函数触发响应时，应该把新的属性值传递过去。

```js
function crateReactive (obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
  	// ... 	
    set (target, key, newVal, receiver) {
      if (isReadonly) {
        console.warn(`属性 ${ key } 是只读的`);
        return true;
      }

      const oldVal = target[key];
      const type = Array.isArray(target) 
        // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，如果是，视为 SET 操作，否则是 ADD 操作
        ? Number(key) < target.length ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD
        : Object.prototype.hasOwnProperty.call(target, key) ? TRIGGER_TYPE.SET : TRIGGER_TYPE.ADD;

      const res = Reflect.set(target, key, newVal, receiver);

      if (target === receiver.raw) {
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 增加第四个参数，即触发响应的新值
          trigger(target, key, type, newVal);
        }
      }
  
      return res;
    },
   	// ...
  });
}
```

接下来，我们还需要修改 trigger 函数。

```js
function trigger (target, key, type, newVal) {
	// ...

  // 操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length 属性相关联的副作用函数 
  if (type === TRIGGER_TYPE.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length');

    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects && lengthEffects.forEach((effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    }));
  }

  // 如果操作目标是数组，并且修改了数组的 length 属性
  if (Array.isArray(target) && key === 'length') {
    // 对于索引大于或等于新的 length 值的元素
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 函数中
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn);
          }
        });
      }
    });
  }
  
  //  effects && effects.forEach(fn => fn()); 避免与 cleanup 产生死循环
  effectsToRun.forEach(effectFn => {
    // 如果存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}
```

如上面的代码所示，为 trigger 函数增加了第四个参数，即触发响应时的新值。这里的新值指的是新的 length 属性值，它代表新的数组长度。接着，我们判断操作的目标是否是数组，如果是，则需要找到所有索引值大于或等于新的 length 值的元素，然后把它与它们相关联的副作用函数取出并执行。

##### 遍历数组

