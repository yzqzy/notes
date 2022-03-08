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
  
 effect && effects.forEach(effectFn => {
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
  
 effect && effects.forEach(effectFn => {
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

