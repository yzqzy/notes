# Vue 源码解析

## 如何打包调试

```
npm i --ignore-scripts
```

设置 sourcemap

```js
"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev"
```

* -w：监视源码变化
* -c：设置配置文件
* --environment：设置环境变量

```js
"debug": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
```

* --sourcemap：源码映射，用于代码调试

运行 `npm run debug` 命令可以实时监听代码变化。使用 `examples` 文件中的案例引入打包后的源码文件就开始调试。

## vue 的不同构建版本

使用 `npm run build` 命令可以打包所有版本的 vue 文件

|                            | UMD                | commonjs              | es module          |
| -------------------------- | ------------------ | --------------------- | ------------------ |
| Full                       | vue.js             | vue.common.js         | vue.esm.js         |
| Runtime-Only               | vue.runtime.js     | vue.runtime.common.js | vue.runtime.esm.js |
| Full（production）         | vue.min.js         |                       |                    |
| Runtime-only（production） | vue.runtime.min.js |                       |                    |

**Full：完整版、Runtime-only：运行时**

完整版：同时包含编译器和运行时版本

* 编译器：用来将模板字符串编译为 render 函数，用于生成虚拟 DOM，体积大，效率低
* 运行时：用来创建 Vue 实例、渲染并处理虚拟 DOM 等代码，体积小，效率高。基本上就去除去编译器的代码。
  

UMD：通用的模块版本，支持多种模块方式。vue.js 默认文件就是 编译器 + 运行时 的 UMD 版本

CommonJS：用来配合旧的打包工具来使用，例如 `Browserify` 或 `webpack1`

ESModule：为现代工具提供的版本

* ESM 格式可以被静态分析，打包工具可以利用这一特性进行 "Tree-Shaking" 



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Runtime Compiler</title>
</head>
<body>

  <div id="app">Hello World</div>

  <script src="../../dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      template: `<h1>{{ message }}</h1>`,
      data: {
        message: 'Hello World'
      }
    })
  </script>

</body>
</html>
```

引入完整版代码。运行上述代码只会看到 `h1` 标签，模板内容会替换原本内容。



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Runtime Compiler</title>
</head>
<body>

  <div id="app">Hello World</div>

	<script src="../../dist/vue.runtime.js"></script>
  <script>
    new Vue({
      el: '#app',
      template: `<h1>{{ message }}</h1>`,
      data: {
        message: 'Hello World'
      }
    })
  </script>

</body>
</html>
```

引入运行时版本。运行上述文件，页面不会渲染任何内容。并且会打印出警告信息。

```
You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

运行时版本不包含编译器，所以我们需要提供 render 函数。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Runtime Compiler</title>
</head>
<body>

  <div id="app">Hello World</div>

	<script src="../../dist/vue.runtime.js"></script>
  <script>
    new Vue({
      el: '#app',
      // template: `<h1>{{ message }}</h1>`,
      render(h) {
        return h('h1', this.message)
      },
      data: {
        message: 'Hello World'
      }
    })
  </script>

</body>
</html>
```

使用 vue-cli 创建的项目，默认导入的版本就是运行时版本，可以通过以下命令查看 webpack 配置文件。

```js
vue inspect > output.js // vue-cli 创建的项目查看 webpack 配置文件
```

我们在开发项目时编写的 vue 单文件组件，在代码打包编译时也会转为对应的 render 函数。

## 寻找入口文件

执行构建脚本

```js
"debug": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
```

--environment TARGET:web-full-dev

scripts/config.js

* 生成 rollup 构建配置文件
* 使用环境变量：TARGET:web-full-dev

```js
function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      flow(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Vue'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${key}`] = featureFlags[key]
  })
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
```

执行脚本存在 `TARGET` ，会在 `builds` 对象中获取配置：

```js
const builds = {
 	// ...
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner
  },
 	// ...
}
```

我们使用的就是 ` resolve('web/entry-runtime-with-compiler.js')`。

```js
const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}
```

```js
// alias.js

const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
```

所以最终的完整路径就是：`src/platforms/web/entry-runtime-with-compiler.js`。

## 从入口开始

> src/platforms/web/entry-runtime-with-compiler.js

当我们创建 vue 实例时，如果同时设置 `template` 和 `render` ，此时会渲染什么？

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Runtime Compiler</title>
</head>
<body>

  <div id="app"></div>

  <script src="../../dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      template: `<h1>hello yuleuo</h1>`,
      render(h) {
        return h('h1', 'hello heora')
      }
    })
  </script>

</body>
</html>
```

可以查看以下代码获得答案：

```js
// src/platforms/web/entry-runtime-with-compiler.js

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // 如果没有 render 函数会解析模板或者 el 转换成 render 函数
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```



我们可以可以通过 chrome 浏览器开发中工具中的函数调用堆栈来看下 `$mount` 是如何被调用的。

<img src="./images/vue2_template_render.png" />



* el 不能是 body 或者 html 标签
* 如果没有 render，把 template 转换为 render 函数
* 如果有 render 函数，直接调用 mount 挂载 DOM



vue 3 中也会优先渲染 render 函数，不过其过程是在挂载函数组件时进行判断的，具体代码在 `runtime-core/src/component.ts` 文件中。

```typescript
export function finishComponentSetup(
  instance: ComponentInternalInstance,
  isSSR: boolean,
  skipOptions?: boolean
) {
  const Component = instance.type as ComponentOptions

  if (__COMPAT__) {
    convertLegacyRenderFn(instance)

    if (__DEV__ && Component.compatConfig) {
      validateCompatConfig(Component.compatConfig)
    }
  }

  // template / render function normalization
  // could be already set when returned from setup()
  if (!instance.render) {
    // ...
  }

 	// ...
}
```

在此之前，还会判断 setup 函数是否存在，如果不存在才会走 `finishComponentSetup` 函数逻辑。函数调用堆栈如下：

<img src="./images/vue3_template_render.png" />

## vue 初始化过程

platforms 下定义的文件都是与平台相关的内容

```js
// src/platforms/web/entry-runtime-with-compiler.js

/* @flow */

import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'

const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

	// ...

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}

// ...

// htmlStr to render funcion
Vue.compile = compileToFunctions

export default Vue
```

```js
// src/platforms/web/entry-runtime.js

/* @flow */

import Vue from './runtime/index'

export default Vue
```



注册平台相关的指令和组件，注册 `__patch__` 和 `$mount` 方法

```js
// src/platforms/web/runtime/index.js

/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
// vue 内部使用方法
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
// 注册指令（v-model，v-show）
extend(Vue.options.directives, platformDirectives)
// 注册组件（Transition TransitionGroup）
extend(Vue.options.components, platformComponents)

// install platform patch function
// 注册 patch 函数，将虚拟 DOM 转换为真实 DOM
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  // 渲染 DOM
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
	// ....
}

export default Vue
```

```js
// src/core/util/env.js

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'

// ...
```



core 目录下代码都是与平台无关的代码，初始化静态方法

```js
// src/core/index.js

import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 初始化静态方法
// 1. 初始化 Vue.config 对象
// 2. Vue.util = { warn, extend, mergeOptions, defineReactive } 不推荐用户使用
// 3. Vue.set、Vue.delete、Vue.nextTick 
// 4. Vue.observable 使普通对象变为响应式对象
// 5. 初始化 Vue.options 对象，如 components/directives/filters
// 6. 设置 keep-alive 组件
// 7. 注册 Vue.use 用来注册插件
// 8. 注册 Vue.mixin 实现混入
// 9. 注册 Vue.extend，基于传入的 options 返回一个组件的构造函数
// 10. 注册 Vue.directive、Vue.component、Vue.filter
initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
```

创建 Vue 构造函数，设置 Vue 的实例成员

```js
// src/core/instance/index.js

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 注册 vm 的 _init 方法，初始化 vm
initMixin(Vue)
// 注册 vm 的 $data、$props、$set、$delete、$watch
stateMixin(Vue)
// 初始化事件相关方法，$on、$once、$off、$emit
eventsMixin(Vue)
// 初始化生命周期相关方法，_update、$forceUpdate、$destory
lifecycleMixin(Vue)
// render、$nextTick/_render
renderMixin(Vue)

export default Vue
```

使用构造函数的方式定义 Vue，可以方便的按照功能将这些扩展分散到各个模块中去实现，易于代码管理和维护，这种编程技巧也很值得我们学习。 



**src/platforms/web/entry-runtime-with-compiler.js**

* web 平台相关的入口文件
* 重写 `$mount` 方法
* 注册 Vue.compile 方法，传递 HTML 字符串返回 render 函数

**src/platforms/web/runtime/index.js**

* web 平台相关代码
* 注册平台相关指令：v-model、v-show
* 注册平台相关组件：transition、tansition-group
* 定义全局方法：
  * `__patch__` ：将虚拟 DOM 转换为真实 DOM
  * `$mount`：定义挂载方法，其内容调用 `mountComponent` 方法

**src/core/index.js**

* 平台无关代码
* 通过 `initGlobalAPI` 设置 Vue 的静态方法
  * 初始化 Vue.config 对象
  * Vue.util = { warn, extend, mergeOptions, defineReactive }，不推荐用户使用
  * Vue.set、Vue.delete、Vue.nextTick 
  * Vue.observable 使普通对象变为响应式对象
  * 初始化 Vue.options 对象，如 components/directives/filters
  * 设置 keep-alive 组件
  * 注册 Vue.use 用来注册插件
  * 注册 Vue.mixin 实现混入
  * 注册 Vue.extend，基于传入的 options 返回一个组件的构造函数
  * 注册 Vue.directive、Vue.component、Vue.filter

**src/core/instance/index.js**

* 平台无关代码
* 定义 Vue 构造函数，内部调用 `_init` 方法
* 定义常用的 Vue 实例成员
  * initMixin：注册 vm 的 `_init` 方法，初始化 vm
  * stateMixin：注册 vm 的 $data、$props、$set、$delete、$watch
  * eventsMixin：初始化事件相关方法，$on、$once、$off、$emit
  * lifecycleMixin：初始化生命周期相关方法，_update、$forceUpdate、$destory
  * renderMixin：render、$nextTick/_render

## vscode 配置

### flow 语法报错

<img src="./images/flow_error.png" />

关闭 vscode 代码检查

```json
// settings.json

"javascript.validate.enable": false,
```

### 高亮显示问题

解析报错，导致无法高亮显式。

<img src="./images/highlight.png" />

安装 vscode - Babel JavaScript 插件。

## Vue 初始化

### 静态成员

#### src/core/global-api/index.js

vue 静态成员初始化发生在 **src/core/index.js** 中，调用 `initGlobalAPI(Vue)` 方法。

```js
// src/core/global-api/index.js

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // 初始化 Vue.config 对象
  // 我们在 src/platforms/web/runtime/index.js 中，给 config 属性设置方法
	// 1. Vue.config.mustUseProp = mustUseProp
	// 2. Vue.config.isReservedTag = isReservedTag
	// 3. Vue.config.isReservedAttr = isReservedAttr
	// 4. Vue.config.getTagNamespace = getTagNamespace
	// 5. Vue.config.isUnknownElement = isUnknownElement
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 不推荐用户使用
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  // 设置响应式对象
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
	
  // 定义 components/directives/filters
  //  import { ASSET_TYPES } from 'shared/constants'
  // 	export const ASSET_TYPES = [
  // 	'component',
  // 	'directive',
  // 	'filter'
	// 	]
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    // 存放全局的组件、指令、过滤器
    // Vue.options.components
    // Vue.options.directives
    // Vue.options.filters
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  // 记录当前构造函数
  Vue.options._base = Vue
	
  // 拷贝内部对象（extend 浅拷贝）
  // 注册内置组件：keep-alive 组件
  extend(Vue.options.components, builtInComponents)
	
  // 注册静态方法
  // 1. Vue.use 注册插件
  initUse(Vue)
  // 2. Vue.mixin 实现混入
  initMixin(Vue)
  // 3. Vue.extend 基于传入的 options 返回组件构造函数，开发自定义组件使用
  initExtend(Vue)
  // 4. Vue.directive、Vue.component、Vue.filter
  initAssetRegisters(Vue)
}
```

#### src/core/global-api/use.js

```js
// src/core/global-api/use.js

/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 已安装插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 移除第一个参数（plugin）
    const args = toArray(arguments, 1)
    // 将 this（Vue）插入到第一项
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 缓存已安装插件
    installedPlugins.push(plugin)
    return this
  }
}
```

#### src/core/global-api/mixin.js

```js
// src/core/global-api/mixin.js

/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 将传递的配置拷贝到 Vue.options 中，注册的是全局的选项
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

#### src/core/global-api/extend.js

```js
// src/core/global-api/extend.js

/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { defineComputed, proxy } from '../instance/state'
import { extend, mergeOptions, validateComponentName } from '../util/index'

export function initExtend (Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    // Vue 构造函数
    const Super = this
    const SuperId = Super.cid
    // 已缓存的组件构造函数
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      // 开发环境验证组件名称
      validateComponentName(name)
    }
	
    // 创建组件构造函数，VueComponent
    const Sub = function VueComponent (options) {
      // 初始化方法
      this._init(options)
    }
    // 改变构造函数原型，指向 Vue 构造函数，继承 Vue
    // 所有的 vue 组件都是继承自 vue 的
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    // 合并配置
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    // 缓存组件构造函数
    cachedCtors[SuperId] = Sub
    // 返回组件构造函数
    return Sub
  }
}

function initProps (Comp) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, `_props`, key)
  }
}

function initComputed (Comp) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}
```

#### src/core/global-api/assets.js

```js
// src/shared/constants.js

export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]

export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]


// src/core/global-api/assets.js

/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // Vue.directive、Vue.component、Vue.filter
  // 参数基本一致，所以可以统一注册
  // https://v2.vuejs.org/v2/api/#Vue-directive
  // https://v2.vuejs.org/v2/api/#Vue-component
  // https://v2.vuejs.org/v2/api/#Vue-filter
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          // _base 定义在 vue/src/core/global-api/index.js 中
          // 把组件配置转换为组件的构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 全局注册，缓存并赋值
        this.options[type + 's'][id] = definition
    		// 返回定义
        return definition
      }
    }
  })
}
```

* [https://v2.vuejs.org/v2/api/#Vue-directive](https://v2.vuejs.org/v2/api/#Vue-directive)
* [https://v2.vuejs.org/v2/api/#Vue-component](https://v2.vuejs.org/v2/api/#Vue-component)
* [https://v2.vuejs.org/v2/api/#Vue-filter](https://v2.vuejs.org/v2/api/#Vue-filter)

### 实例成员

#### src/core/instance/index.js

```js
// src/core/instance/index.js

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

#### src/core/instance/init.js

```js
// src/core/instance/init.js

/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

export function initMixin (Vue: Class<Component>) {
  // vue 原型上挂载 _init 方法
  // 合并 options / 初始化操作
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}

// ...
```

####  src/core/instance/state.js

```js
// src/core/instance/state.js

export function stateMixin (Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  // 定义原型属性，$data、$props
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)
	
  // 定义原型方法，$set、$delete
  Vue.prototype.$set = set
  Vue.prototype.$delete = del
	
  // 定义原型方法，$watch，监视数据变化
  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}

// ...
```

#### src/core/instance/events.js

```js
// src/core/instance/events.js

// 定义原型方法：$on、$once、$off、$emit
// 这里的事件机制使用的就是发布订阅模式
export function eventsMixin (Vue: Class<Component>) {
  const hookRE = /^hook:/
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
    const vm: Component = this
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn)
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn)
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true
      }
    }
    return vm
  }

  Vue.prototype.$once = function (event: string, fn: Function): Component {
    const vm: Component = this
    function on () {
      vm.$off(event, on)
      fn.apply(vm, arguments)
    }
    on.fn = fn
    vm.$on(event, on)
    return vm
  }

  Vue.prototype.$off = function (event?: string | Array<string>, fn?: Function): Component {
    const vm: Component = this
    // all
    if (!arguments.length) {
      vm._events = Object.create(null)
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        vm.$off(event[i], fn)
      }
      return vm
    }
    // specific event
    const cbs = vm._events[event]
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null
      return vm
    }
    // specific handler
    let cb
    let i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1)
        break
      }
    }
    return vm
  }

  Vue.prototype.$emit = function (event: string): Component {
    const vm: Component = this
    if (process.env.NODE_ENV !== 'production') {
      const lowerCaseEvent = event.toLowerCase()
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          `Event "${lowerCaseEvent}" is emitted in component ` +
          `${formatComponentName(vm)} but the handler is registered for "${event}". ` +
          `Note that HTML attributes are case-insensitive and you cannot use ` +
          `v-on to listen to camelCase events when using in-DOM templates. ` +
          `You should probably use "${hyphenate(event)}" instead of "${event}".`
        )
      }
    }
    let cbs = vm._events[event]
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs
      const args = toArray(arguments, 1)
      const info = `event handler for "${event}"`
      for (let i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info)
      }
    }
    return vm
  }
}
```

#### src/core/instance/lifecycle.js

```js
// src/core/instance/lifecycle.js

// 定义原型方法：_update、$forceUpdate、$destory
export function lifecycleMixin (Vue: Class<Component>) {
  // 将 VNode 渲染成真实 DOM，首次渲染和数据更新都会调用此方法
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }

  // 强制更新，调用实例 watcher 的 update 方法
  Vue.prototype.$forceUpdate = function () {
    const vm: Component = this
    if (vm._watcher) {
      vm._watcher.update()
    }
  }
	
  // 销毁 Vue 实例
  Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // fire destroyed hook
    callHook(vm, 'destroyed')
    // turn off all instance listeners.
    vm.$off()
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
}
```

#### src/core/instance/render.js

```js
// src/core/instance/render-helpers/index.js
// 将模板编译成 render 函数时，render 函数内部会调用这些方法
export function installRenderHelpers (target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}


// src/core/instance/render.js

// 定义原型方法：$nextTick、_render
export function renderMixin (Vue: Class<Component>) {
  // install runtime convenience helpers
  // 安装渲染相关的辅助方法
  installRenderHelpers(Vue.prototype)
	
  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }

  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm
      // 调用用户定义的 render 函数或者模板编译后的 render(渲染函数)
      //  h 参数：vm.$createElement，生成虚拟 DOM
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
        } catch (e) {
          handleError(e, vm, `renderError`)
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    } finally {
      currentRenderingInstance = null
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
}
```

#### 总结

* initMixin：vue 原型上挂载 `_init` 方法、合并 options / 初始化操作
* stateMixin
  * 原型属性，$data、$props
  * 定义原型方法，$set、$delete
  * 定义原型方法，$watch，监视数据变化
* eventsMixin：定义原型方法：$on、$once、$off、$emit，这里的事件机制使用的就是发布订阅模式
* lifecycleMixin：定义原型方法：_update、$forceUpdate、$destory
  * _update：将 VNode 渲染成真实 DOM，首次渲染和数据更新都会调用此方法
  * $forceUpdate：强制更新，调用实例 watcher 的 update 方法
  * $destory：销毁 vue 实例
* renderMixin：定义原型方法：$nextTick、_render
  * render 方法内部调用用户定义的 render 函数或者模板编译后的 render(渲染函数)

### initMixin - init

#### src/core/instance/init.js

```js
// src/core/instance/init.js

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // 定义 vm 常量记录 vue 实例
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }	

    // a flag to avoid this being observed
    // 标识当前实例是 vue 实例，不需要被 observe
    vm._isVue = true
    
    // merge options 合并 options
    // 将用户传入的 options 与 用户传入的 options 进行合并
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化
    // 1. 初始化与生命周期相关的属性
    //    $children、$parent、$root ...
    initLifecycle(vm) 
    // 2. vm 的事件监听初始化，父组件绑定在当前组件上事件
    initEvents(vm) 
    // 3. vm 编译 render 初始化
    //    $slots、$scopedSlots、_c、$createElement、$attrs、#listeners
    initRender(vm)
    
    callHook(vm, 'beforeCreate') // 调用 beforeCreate 钩子函数
    
    // 4. 依赖注入：把 inject 的成员定义到 vm 上
    initInjections(vm) // resolve injections before data/props
    // 5. 初始化 vm 的 _props/methods/_data/computed/watch
    initState(vm)
    // 6. 依赖注入：初始化 provide
    initProvide(vm) // resolve provide after data/props
    
    callHook(vm, 'created') // 调用 created 钩子函数

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      // 页面挂载
      vm.$mount(vm.$options.el)
    }
  }
}
```

#### src/core/instance/lifecycle.js

```js
// src/core/instance/lifecycle.js

// 初始化与生命周期相关的属性
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  // 找到当前实例父组件，将当前实例添加到父组件的 $children 中
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

#### src/core/instance/events.js

```js
// src/core/instance/events.js

// 获取父组件附加事件，注册到当前组件
export function initEvents (vm: Component) {
  // 增加属性 _events，存储事件名称以及对应的处理函数
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // init parent attached events
  // 获取父元素上附加的事件
  const listeners = vm.$options._parentListeners
  if (listeners) {
    // 注册自定义事件
    updateComponentListeners(vm, listeners)
  }
}
```

#### src/core/instance/render.js

```js
// src/core/instance/render.js

// h 函数：vm.$createElement
// _c：模板编译生成的 render 函数内部，会调用这个方法
export function initRender (vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  // 插槽相关属性
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  // 模板编译生成的 render 函数内部，会调用这个方法
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  // h 函数，将虚拟 DOM 转换为真实 DOM
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}
```

#### src/core/instance/inject.js

实现依赖注入

```js
// src/core/instance/inject.js

export function initProvide (vm: Component) {
  // 获取 provide，存储到 vm._provided
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}

export function initInjections (vm: Component) {
  // 获取 inject 中所有属性
  const result = resolveInject(vm.$options.inject, vm)
  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(
            `Avoid mutating an injected value directly since the changes will be ` +
            `overwritten whenever the provided component re-renders. ` +
            `injection being mutated: "${key}"`,
            vm
          )
        })
      } else {
        defineReactive(vm, key, result[key])
      }
    })
    toggleObserving(true)
  }
}

export function resolveInject (inject: any, vm: Component): ?Object {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    const result = Object.create(null)
    const keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue
      const provideKey = inject[key].from
      let source = vm
      while (source) {
        // 判断属性是否存在于 source._provided 对象中，如果存在将属性设置到 result 中并返回
        // 这就是依赖注入实现的原理
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') {
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result
  }
}
```

#### src/core/instance/state.js

```js
// src/core/instance/state.js

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  // 将 props 中属性转换为响应式数据，并且定义到 vue 实例中
  if (opts.props) initProps(vm, opts.props)
  // 将选项中方法定义到 vue 实例中，注入之前会判断是否存在重名属性，并且还判断命名规范
  if (opts.methods) initMethods(vm, opts.methods)
  // 如果存在 data，初始化 data，否则初始化 vm._data 属性
  if (opts.data) {
    initData(vm)
  } else {
    // 调用 observer 函数，把对象转换为响应式对象
    observe(vm._data = {}, true /* asRootData */)
  }
  // 初始化计算属性
  if (opts.computed) initComputed(vm, opts.computed)
  // 初始化 watch 侦听器
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false)
  }
  // 遍历 propsOptions 属性
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
 			// 定义属性到 props 中，props 即 vm._props
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      // 如果不存在，将属性注入到 vue 实例中， this[key] => this._props[key]
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}

function initData (vm: Component) {
  let data = vm.$options.data
  // 判断 data 选项是否是函数，如果是函数，使用 getData 返回数据，否则使用 data
  // 组件中 data 使用函数定义，vue 实例中的 data 是一个对象
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  // 获取 data 中所有属性的 key
  const keys = Object.keys(data)
  // 获取 props
  const props = vm.$options.props
  // 获取 methods
  const methods = vm.$options.methods
  let i = keys.length
  // 判断 data 中属性是否与 props 或 methods 存在同名属性
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      // 定义属性 this[key] => vm._data[key] 
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  // 将 data 转换为响应式对象
  observe(data, true /* asRootData */)
}

export function getData (data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    popTarget()
  }
}

const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}

export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering()
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      // 如果属性不是 function，打印警告
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      // 如果属性存在于 props 中，打印警告（同名属性）
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      // 判断方法名称是否以 _ 或 $ 开头，不推荐使用，打印警告
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    // 将 method 定义到 vue 实例上
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}

function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

// ...
```

### 首次渲染过程

#### src/core/instance/init.js

```js
// src/core/instance/init.js

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
		// ...
    
    if (vm.$options.el) {
      // 页面挂载
      vm.$mount(vm.$options.el)
    }
  }
}
```

#### src/platforms/web/entry-runtime-with-compiler.js

```js
// src/platforms/web/entry-runtime-with-compiler.js

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
	
  // ...
  
  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    
    // 如果模板存在
    if (template) {
      if (typeof template === 'string') {
        // 如果模板是 id 选择器
        if (template.charAt(0) === '#') {
          // 获取对应的 DOM 对象的 innerHTML
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        // 如果模板是元素，返回元素的 innerHTML
        template = template.innerHTML
      } else {
        // 既不是 DOM 元素也不是字符串，开发环境打印警告
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        // 返回当前实例
        return this
      }
    } else if (el) {
      // 如果当前环境没有模板，获取 el 的 outHTML 作为模板
      template = getOuterHTML(el)
    }
    
    // 如果模板存在
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }
	
      // 将 template 转换为 render 函数
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  
  // 调用 mount 方法，渲染 DOM
  return mount.call(this, el, hydrating)
}
```

####  src/platforms/web/runtime/index.js

```js
// src/platforms/web/runtime/index.js

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

#### src/core/instance/lifecycle.js

```js
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  
  // 判断是否存在 render 函数
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  	
  // 触发 beforeMount 声明周期钩子函数
  callHook(vm, 'beforeMount')
	
  // 更新组件
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      // vm._render 调用用户传入的 render 或编译器生成的 render，返回虚拟 DOM
      // vm._update 将虚拟 DOM 转换为真实 DOM，渲染到页面中
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    // 触发 mounted 生命周期钩子函数
    callHook(vm, 'mounted')
  }
  return vm
}
```

#### src/core/observer/watcher.js

observer 响应式处理相关

vue 中 watcher 有三种：

* 渲染 watcher
* 计算属性 watcher
* 侦听器 watcher

```js
// src/core/observer/watcher.js

/* @flow */

// ....

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    // 表达式或者函数
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    // 是否是渲染 watcher
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      // 是否延迟执行
      // 计算属性 watcher 会延迟执行
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      // 首次渲染传入的是 updateComponent 函数
      this.getter = expOrFn
    } else {
      // 侦听器时，第二个参数会传入字符串
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    // 将当前 watcher 对象存储到栈中
    // 如果组件嵌套，先渲染内部组件，所以要把父组件的 watcher 保存起来
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 调用存储的 getter，即 updateComponent 函数
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      // 将当前 watcher 在栈中弹出
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

 	// ...
}
```

#### src/core/instance/lifecycle.js

通过调用 getter 方法，触发 updateComponent 函数

```js
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
	
  // ...
  
  // 更新组件
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
		// ...
  } else {
    updateComponent = () => {
      // vm._render 调用用户传入的 render 或编译器生成的 render，返回虚拟 DOM
      // vm._update 将虚拟 DOM 转换为真实 DOM，渲染到页面中
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
 	
  // ...
}
```

执行完 `vm._update(vm._render(), hydrating)` 之后，就会把模板渲染到页面中。

#### 总结

* Vue 初始化，初始化实例成员和静态成员
* new Vue()
* this._init()
* vm.$mount()
  * src/platforms/web/runtime/index.js
  * 如果没有传递 render，将模板编译为 render 函数
  * compileToFunctions() 生成 render() 渲染函数
  * options.render = render
* vm.$mount()
  * src/platforms/web/runtime/index.js
  * mountComponent()
* mountComponent
  * src/core/instance/lifecycle.js
  * 判断是否有 render 函数，如果没有但是传入模板，打印警告
  * 触发 beforeMount
  * 定义 updateComponent 方法
    * `vm._update(vm._render(), ...)`
    * `vm._render` ，调用 render 函数，返回虚拟 DOM
    * `vm._update` ，将虚拟 DOM 转换成真实 DOM
  * 创建 Watcher 实例
    * updateComponent 赋值给 expOrFn
    * 调用 get() 方法
  * 触发 mounted 方法
  * return vm
* watcher.get
  * src/core/observer/watcher.js
  * 调用 updateComponent() 函数
  * 调用 `vm._render()` 创建 VNode
    * 调用 `render.call(vm._renderProxy, vm.$createElement())`  或者编译 template 生成的 `render()` 
    * 返回 vnode
  * 调用 `vm._update(vnode, ...)` 
    * 调用 `vm.__patch__(vm.$el, vnode)` 挂载真实 DOM
    * 记录 `vm.$el`

## 响应式原理

### 入口文件

当数据发生变化时，自动更新视图，不需要手动操作 DOM。

* `vm.msg = { count: 0 }` ，重新给属性赋值，是否是响应式的？
* `vm.arr[0] = 4`  ，给数组元素赋值，视图是否会更新？
* `vm.arr.length = 0`，修改数组 length，视图是否会更新？
* `vm.arr.push(4)`，视图是否会更新？

响应式处理的过程是比较复杂的，我们可以先从入口开始

* src/core/instance/init.js
  * initState，vm 状态初始化，初始化 `_data`、`_props` 、methods 等
* src/core/instance/state.js

#### src/core/instance/state.js

```js
// src/core/instance/state.js

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    // 响应式处理入口
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
		
  // ...
  
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
   		// ...
    }
    if (props && hasOwn(props, key)) {
     // ...
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
```

#### src/core/observer/index.js

响应式处理相关代码

```js
// src/core/observer/index.js

// 响应式处理入口
export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 如果 value 不是对象，或者 value 是 VNode 的实例，直接返回
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  // 如果 value 存在 __ob__ （observer 对象）属性
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    // 判断 value 是否是数组或者是 JavaScript 对象
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    // 判断 value 是否是 vue 实例
    !value._isVue
  ) {
    // 创建 Observer 对象
    ob = new Observer(value)
  }
  // 如果当前处理的是根数据，vmCount 属性自增
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```

### Observer

#### src/core/observer/index.js

```js
// src/core/observer/index.js

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  // 观测对象
  value: any;
  // 依赖对象
  dep: Dep;
  // 实例计数器
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    // 设置对象的 __ob__　属性
    def(value, '__ob__', this)
    // 数据响应式数据
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // 数组响应式处理，为数组中的每一个对象创建一个 observer 实例
      this.observeArray(value)
    } else {
      // 遍历对象中每一个属性，转换成 setter/getter
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    // 获取观察对象属性
    const keys = Object.keys(obj)
    // 遍历属性，设置响应式数据
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean // 是否浅响应
) {
  // 创建依赖对象实例
  const dep = new Dep()
	// 获取 obj 的属性描述符对象
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  // 获取预定义的存取器函数（用户可能自己设置过 getter/setter）
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
	
  // 非浅响应，递归观察子对象，将子对象转换成属性转换为 getter/setter，并返回
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 如果用户提供 getter，调用用户 getter返回值，否则直接设置值
      const value = getter ? getter.call(obj) : val
      // 如果存在依赖目标，即 watcher 对象，建立依赖
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          // 如果子观察目标存在，建立对象的依赖关系
          childOb.dep.depend()
          if (Array.isArray(value)) {
            // 如果属性是数组，特殊处理收集数组对象依赖
            dependArray(value)
          }
        }
      }
      // 返回属性值
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      // 如果新值等于旧值或者新值旧值为 NaN 则不执行
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 非浅响应，观察子对象并返回子对象的 observe 对象
      childOb = !shallow && observe(newVal)
      // 派发更新
      dep.notify()
    }
  })
}
```

### 依赖收集

#### src/core/observer/index.js

```js
// src/core/observer/index.js

/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean // 是否浅响应
) {
  // 创建依赖对象实例
  const dep = new Dep()
	
  // ...
	
  // 非浅响应，递归观察子对象，将子对象转换成属性转换为 getter/setter，并返回
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 如果用户提供 getter，调用用户 getter返回值，否则直接设置值
      const value = getter ? getter.call(obj) : val
      
      // 如果存在依赖目标，即 watcher 对象，建立依赖
      if (Dep.target) {
        // 1. 当前属性添加依赖
        // 	  将 dep 对象添加到 watcher 对象的 newDeps 数组中
        // 		将 watcher 对象添加到 dep 的 subs 数组中
        dep.depend()
        if (childOb) {
          // 2. 如果属性的值是对象，建立对象的依赖关系
          // 		例如当前属性是 'arr'，这里的 childOb 就是数组对象
          //    所以属性变化时会触发依赖更新，数组中元素发生变化也会触发更新
          childOb.dep.depend()
          if (Array.isArray(value)) {
            // 3. 如果属性是数组，为数组中对象元素收集依赖
            dependArray(value)
          }
        }
      }
      // 返回属性值
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      // 如果新值等于旧值或者新值旧值为 NaN 则不执行
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 非浅响应，观察子对象并返回子对象的 observe 对象
      childOb = !shallow && observe(newVal)
      // 派发更新
      dep.notify()
    }
  })
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    // 如果当前元素是对象，并且存在 __ob__，调用 __ob__.dep.depend 方法
    // 也就是说如果数组中元素也是对象，也要为对象收集依赖
    e && e.__ob__ && e.__ob__.dep.depend()
    // 继续判断当前元素是否是数组，如果是数组，递归调用
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
```

Observer 实例有自己的 dep 属性，目的是为当前实例的子对象收集依赖。

defineReactive 方法中可以看到每个属性也有自己的 dep 对象，负责收集每一个属性的依赖。

#### src/core/observer/dep.js

vue 2 之后，每一个组件会对应一个 watcher 对象。每一个组件都会调用 mounteComponent 函数，创建 watcher 对象。

```js
// src/core/observer/dep.js

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  // watcher 对象
  static target: ?Watcher;
  // dep 实例 ID
  id: number;
  // dep 实例对应的 watcher 对象/订阅者数据
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }
	
	// 添加订阅者 watcher 对象
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }
	
  // 收集依赖 
  depend () {
    // 如果 target 存在，将 dep 对象添加到 watcher 的依赖中
    if (Dep.target) {
      // watcher.addDep
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// Dep.target 用来存放目前正在使用的 Watcher
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

// 入栈，将当前 watcher 赋值给 Dep.target
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

// 出栈
export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```

#### src/core/observer/watcher.js

```js
// src/core/observer/watcher.js

/* @flow */

// ....

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    // 表达式或者函数
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    // 是否是渲染 watcher
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      // 是否延迟执行
      // 计算属性 watcher 会延迟执行
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      // 首次渲染传入的是 updateComponent 函数
      this.getter = expOrFn
    } else {
      // 侦听器时，第二个参数会传入字符串
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    // 将当前 watcher 对象存储到栈中
    // 如果组件嵌套，先渲染内部组件，所以要把父组件的 watcher 保存起来
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 调用存储的 getter，即 updateComponent 函数
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      // 将当前 watcher 在栈中弹出
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    // 每一个 dep 对象都有一个 id 属性
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

 	// ...
}
```

### 数组处理

#### src/core/observer/index.js

```js
// src/core/util/env.js

// can we use __proto__?
export const hasProto = '__proto__' in {}
```

```js
// src/core/observer/index.js

// 获取重新定义的数组方法名称
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  // 观测对象
  value: any;
  // 依赖对象
  dep: Dep;
  // 实例计数器
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    // 设置对象的 __ob__　属性
    def(value, '__ob__', this)
    // 数据响应式数据
    if (Array.isArray(value)) {
      // 判断当前浏览器是否支持 __proto__ 属性，用来处理浏览器兼容性问题
      if (hasProto) {
        // 改变数组对象原型属性，让当前数组的原型指向 arrayMethods
        protoAugment(value, arrayMethods)
      } else {
        /// 设置数组自身方法，数组优先访问自身属性，如果不存在，才会寻找原型方法
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // 数组响应式处理，为数组中的每一个对象创建一个 observer 实例
      this.observeArray(value)
    } else {
      // 遍历对象中每一个属性，转换成 setter/getter
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    // 获取观察对象属性
    const keys = Object.keys(obj)
    // 遍历属性，设置响应式数据
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

// ...

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  // 重新设置数组的原型属性
  target.__proto__ = src
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    // 给当前数组对象重新定义函数
    def(target, key, src[key])
  }
}
```

#### src/core/observer/array.js

```js
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
// 使用数组原型创建一个新对象
export const arrayMethods = Object.create(arrayProto)

// 修改原数组
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  // 保存数组原始方法
  const original = arrayProto[method]
  // 重写数组方法
  def(arrayMethods, method, function mutator (...args) {
    // 执行数组原始方法
    const result = original.apply(this, args)
    // 获取数组对象的 __ob__ 属性
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 对新增元素进行响应式处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 发送通知
    ob.dep.notify()
    return result
  })
})
```

### Watcher

Watcher 分为三种：

* Computed Watcher
* 用户 Watcher（侦听器）
* 渲染 Watcher

#### src/core/instance/lifecycle.js

```js
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  
	// ...
  	
  // 触发 beforeMount 声明周期钩子函数
  callHook(vm, 'beforeMount')
	
  // 更新组件
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
  	// ...
  } else {
    updateComponent = () => {
      // vm._render 调用用户传入的 render 或编译器生成的 render，返回虚拟 DOM
      // vm._update 将虚拟 DOM 转换为真实 DOM，渲染到页面中
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    // 触发 mounted 生命周期钩子函数
    callHook(vm, 'mounted')
  }
  return vm
}
```

#### src/core/observer/watcher.js

```js
// src/core/observer/watcher.js

/* @flow */

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
	// ...

  constructor (
    vm: Component,
    // 表达式或者函数
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    // 是否是渲染 watcher
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // watcher，包含所有 watcher
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      // 是否延迟执行
      // 计算属性 watcher 会延迟执行
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    // watcher 标识
    this.id = ++uid // uid for batching
    // 标识当前 watcher 是否是激活的
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      // 首次渲染传入的是 updateComponent 函数
      this.getter = expOrFn
    } else {
      // 侦听器时，第二个参数会传入字符串，例如 watch: { 'person.name': function () {} }
      // 生成一个获取属性值的函数
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    // 将当前 watcher 对象存储到栈中
    // 如果组件嵌套，先渲染内部组件，所以要把父组件的 watcher 保存起来
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 调用存储的 getter
      // 渲染 watcher，存储的是 updateComponent 函数
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      // 深度监听准备
      if (this.deep) {
        traverse(value)
      }
      // 将当前 watcher 在栈中弹出
      popTarget()
      // 将当前 watcher 从 dep.subs 数组中移除，并且会把 watcher 中记录的 dep 也给移除
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    // 每一个 dep 对象都有一个 id 属性
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  
    /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      // 渲染 watcher
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  // schedular.js - flushSchedulerQueue 中会调用 run 方法
  run () {
    // 判断当前 watcher 对象是否是存活状态
    if (this.active) {
      // 调用 watcher 对象 get 方法
      // 渲染 watcher 会调用 updateComponent 函数，更新视图，渲染 watcher 不存在返回值
      // 用户 watcher 会存在返回值
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        // 如果当前 watcher 是用户 watcher
        if (this.user) {
          try {
            // 调用用户传入的回调函数
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          // 渲染 watcher cb 是 noop，空函数
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

 	// ...
}
```

#### src/core/observer/dep.js

数据更新后，会调用 notify 方法。遍历 subs 数组，调用 update 方法。

```js
// src/core/observer/dep.js

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  // watcher 对象
  static target: ?Watcher;
  // dep 实例 ID
  id: number;
  // dep 实例对应的 watcher 对象/订阅者数据
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }
	
	// 添加订阅者 watcher 对象
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }
	
  // 收集依赖 
  depend () {
    // 如果 target 存在，将 dep 对象添加到 watcher 的依赖中
    if (Dep.target) {
      // watcher.addDep
      Dep.target.addDep(this)
    }
  }
	
	// 发布通知
  notify () {
    // stabilize the subscriber list first
    // 克隆数组，不会处理新增加的 subs，保存当前状态的 subs 数组
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      // 数组排序，按照 watcher 的创建顺序进行排序
      subs.sort((a, b) => a.id - b.id)
    }
    // 遍历 subs 属性，调用每个订阅者的 update 方法实现更新
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// Dep.target 用来存放目前正在使用的 Watcher
// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

// 入栈，将当前 watcher 赋值给 Dep.target
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

// 出栈
export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```

#### src/core/observer/scheduler.js

watcher 的 update 方法被调用时，会触发 queueWatcher 函数执行。

```js
// src/core/observer/scheduler.js

export const MAX_UPDATE_COUNT = 100

const queue: Array<Watcher> = []
const activatedChildren: Array<Component> = []
let has: { [key: number]: ?true } = {}
let circular: { [key: number]: number } = {}
let waiting = false
let flushing = false
let index = 0

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0
  has = {}
  if (process.env.NODE_ENV !== 'production') {
    circular = {}
  }
  waiting = flushing = false
}

// ...

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  // 从小到大排序
  // 1. 组件更新的顺序是从父组件到子组件（因为先创建父组件然后才会创建子组件）
  // 2. 组件的用户 watcher 要在渲染 watcher 之前运行（用户 watcher 是在渲染 watcher 之前创建的）
  // 3. 如果一个组件在父组件执行之前被销毁，这个 watcher 应该被跳过
  queue.sort((a, b) => a.id - b.id)

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  // 不要缓存 length，watcher 在执行过程中，还会被设置新的 watcher
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    // 判断 watcher 是否存在 before 函数，渲染 watcher 才存在 before 函数
    if (watcher.before) {
      // 触发生命周期钩子函数，beforeUpdtae
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    // 执行 watcher
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
   		// ...
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()
	
  // 重置任务队列状态
  resetSchedulerState()

  // call component updated and activated hooks
  // 组件相关的钩子函数
  callActivatedHooks(activatedQueue)
  // 触发 updated 声明周期钩子函数
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher: Watcher) {
  // 获取 watcher id 属性
  const id = watcher.id
  // 判断 watcher 对象有没有被处理
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      // 队列没有被处理
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      // index 代表队列正在处理第几个元素
      // 如果队列中 watcher id 大于当前 watcher id，下标自减
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      // 插入到目标位置
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      // 如果队列不是执行状态
      
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        // 开发环境，直接调用函数
        flushSchedulerQueue()
        return
      }
      // 使用 nextTick 调用函数
      nextTick(flushSchedulerQueue)
    }
  }
}
```

### 总结

* initState - intData - observe
  * observe 就是响应式入口
* observe(value)
  * src/core/observer/index.js
  * 判断 value 是否是对象，如果不是对象直接返回
  * 判断对象是否存在 `__ob__` 属性，如果有直接返回
  * ☆ 如果没有，创建 observer 对象
  * 返回 observer 对象
* Observer
  * src/core/observer/index.js
  * 给 value 对象定义不可枚举的 `__ob__` 属性，记录当前的 observer 对象
  * ☆ 数组的响应式处理
    * 定义原型方法， 当方法被调用时，获取对象的 `__ob__.dep`，调用 notify() 方法
    * 遍历数组成员，针对每个成员调用 observe 方法
  * ☆ 对象的响应式处理，调用 walk 方法
    * 遍历对象所有属性，对每个属性调用 definedReactive 
* defineReactive
  * src/core/observer/index.js
  * 为每一个属性创建 dep 对象
  * 如果当前属性的值是对象，调用 observe
  * ☆ 定义 getter
    * ☆☆ 依赖收集
    * 返回属性
  * ☆ 定义 setter
    * 保存新值
    * 如果新值是对象，调用 observe
    * ☆☆ 派发更新，调用 dep.notify() 方法
* 依赖收集
  * 在 watcher 对象的 get 方法中调用 pushTarget 记录 Dep.target 属性
  * 访问 data 中成员时收集依赖，defineReactive 的 getter 中收集依赖
  * 把属性对应的 watcher 对象添加到 dep.subs 数组中
  * 给 childOb 收集依赖，目的是子对象添加删除成员等操作时发送通知
* Watcher
  * dep.notify() 调用 watcher 对象的 update() 方法
  * 调用 queueWatcher() 判断 watcher 是否被处理，如果没有添加到 queue 队列中，并调用 flushSchedulerQueue()
  * flushSchedulerQueue()
    * 触发 beforeUpdate 钩子函数
    * 调用 watcher.run() 方法
      * run() -> get() -> getter() - updateComponent
    * 清空上一次的依赖
    * 触发 activated 钩子函数
    * 触发 updated 钩子函数



vue lifecycle diagram：

<img src="./images/lifecycle.png" style="zoom: 60%" />

## 添加属性（set）

### Vue.set

#### src/core/global-api/index.js

```js
// src/core/global-api/index.js

export function initGlobalAPI (Vue: GlobalAPI) {
	// ...

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 不推荐用户使用
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

	// ...
}
```

#### src/core/observer/index.js

```js
// src/core/observer/index.js

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

### vm.$set

#### src/core/instance/index.js

```js
// src/core/instance/index.js

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
// 注册 vm 的 $data/$props/$set/$delete/$watch 方法
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

#### src/core/instance/state.js

```js
// src/core/instance/state.js

export function stateMixin (Vue: Class<Component>) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  // 定义原型属性，$data、$props
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)
	
  // 定义原型方法，$set、$delete
  Vue.prototype.$set = set
  Vue.prototype.$delete = del
	
  // 定义原型方法，$watch，监视数据变化
  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}

// ...
```

#### src/core/observer/index.js

这里的 set 和静态的 set 方法使用的是一个方法。

```js
// src/core/observer/index.js

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
export function set (target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    // 如果对象是 undefiend 或者 原始值，会打印警告
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // 如果 target 是数组，并且是一个合法的数组索引
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    // 通过 splice 对 key 位置元素进行替换
    target.splice(key, 1, val)
    return val
  }
  // 如果 target 是对象并且已经存在值，直接赋值即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // target 是对象，新增值
  // 1. 获取 target 的 observer 对象
  const ob = (target: any).__ob__
  // 2. 如果 target 是 vue 实例或者 $data 直接返回，并打印警告
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // 3. 如果 ob 不存在，说明 target 不是响应式对象，直接赋值即可
  if (!ob) {
    target[key] = val
    return val
  }
  // 4. 如果 ob 存在，设置响应式属性，并调用 notify 发送通知
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

set 方法既会处理数组响应式，也会处理对象的响应式。

当使用 set 处理数组时，会调用 splice 方法，当使用 set 给对象增加新成员时，会调用 defineReactive 方法。

## 删除属性（delete）

删除对象属性。如果对象是响应式对象，删除要触发视图更新。

这个方法主要是用于避免 Vue 检测不到属性被删除的限制，但是应该避免使用它。

> 与 set 方法一致，这是的 vue 不能是一个 Vue 实例或 Vue 实例的根数据对象。
>
> 方法定义的位置和 set 方法一致。

### src/core/observer/index.js

```js
/**
 * Delete a property and trigger change if necessary.
 */
export function del (target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    // 如果对象是 undefiend 或者 原始值，会打印警告
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 如果是数组并且索引合法，调用 splice 方法删除元素
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  // 如果 target 是 Vue 实例或者 $data 对象，直接返回
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  // 如果对象不存在当前 key 属性 ，直接返回
  if (!hasOwn(target, key)) {
    return
  }
  // 删除目标对象属性
  delete target[key]
  // 如果不是响应式对象，直接返回不需要处理
  if (!ob) {
    return
  }
  // 如果是响应式对象，发送通知
  ob.dep.notify()
}
```

## watch

### 如何使用

`vm.$watch(expOrFn, callback, [options])`

**功能**

观察 Vue 实例变化的一个表达式或计算属性函数，回调函数得到的参数为新值和旧值，表达式只接受监督的键路径，对于复杂的表达式，用一个函数取代。

**参数**

* expOrFn：要监视的 $data 中的属性，可以是表达式或函数
* callback：数据变化后执行的函数
  * 函数：回调函数
  * 对象：具有 handler 属性（字符串或者函数）
* options：可选项
  * deep：布尔类型，是否启用深度监听
  * immediate：布尔类型，是否立即执行一次函数函数



三种类型的的 Watcher 对象：

* 没有静态方法，只能使用实例方法，因为 $watch 方法中要使用 Vue 的实例
* Watcher 分为三种：计算属性 watcher、用户 watcher（侦听器）、渲染 watcher
  * 创建顺序：计算属性 watcher、用户 watcher、渲染 watcher

```js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // 优先处理 computed
  if (opts.computed) initComputed(vm, opts.computed)
  // 其次处理 watch
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

渲染 watcher 是在渲染过程中创建的，定义在 mountComponent 方法中。执行顺序和创建顺序一致。

### 源码分析

#### src/core/instance/state.js

```js
// src/core/instance/state.js

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  // 将 props 中属性转换为响应式数据，并且定义到 vue 实例中
  if (opts.props) initProps(vm, opts.props)
  // 将选项中方法定义到 vue 实例中，注入之前会判断是否存在重名属性，并且还判断命名规范
  if (opts.methods) initMethods(vm, opts.methods)
  // 如果存在 data，初始化 data，否则初始化 vm._data 属性
  if (opts.data) {
    initData(vm)
  } else {
    // 调用 observer 函数，把对象转换为响应式对象
    observe(vm._data = {}, true /* asRootData */)
  }
  // 初始化计算属性
  if (opts.computed) initComputed(vm, opts.computed)
  // 初始化 watch 侦听器
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

// 计算属性 watcher，lazy 属性为 true
const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}

// ...

function initWatch (vm: Component, watch: Object) {
  // 遍历 watch 对象
  for (const key in watch) {
    const handler = watch[key]
    // 如果 handler 是数组
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      // handler 不是数组
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

export function stateMixin (Vue: Class<Component>) {
	// ...

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    // 获取 Vue 实例 this
    const vm: Component = this
    if (isPlainObject(cb)) {
      // 如果 cb 是对象，执行 createWatcher
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    // 标记为用户 watcher
    options.user = true
    // 创建用户 watcher
    const watcher = new Watcher(vm, expOrFn, cb, options)
    // 如果 immediate 为 true
    if (options.immediate) {
      try {
        // 立即执行一次 cb 回调，并且把当前值传入
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
    // 返回取消监听的方法
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}
```

#### src/core/observer/watcher.js

```js
// src/core/observer/watcher.js

/* @flow */

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
	// ...

  constructor (
    vm: Component,
    // 表达式或者函数
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    // 是否是渲染 watcher
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    // watcher，包含所有 watcher
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      // 是否延迟执行
      // 计算属性 watcher 会延迟执行
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    // watcher 标识
    this.id = ++uid // uid for batching
    // 标识当前 watcher 是否是激活的
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      // 首次渲染传入的是 updateComponent 函数
      this.getter = expOrFn
    } else {
      // 侦听器时，第二个参数会传入字符串，例如 watch: { 'person.name': function () {} }
      // 生成一个获取属性值的函数
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    // 将当前 watcher 对象存储到栈中
    // 如果组件嵌套，先渲染内部组件，所以要把父组件的 watcher 保存起来
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 调用存储的 getter
      // 渲染 watcher，存储的是 updateComponent 函数
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      // 深度监听准备
      if (this.deep) {
        traverse(value)
      }
      // 将当前 watcher 在栈中弹出
      popTarget()
      // 将当前 watcher 从 dep.subs 数组中移除，并且会把 watcher 中记录的 dep 也给移除
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    // 每一个 dep 对象都有一个 id 属性
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  
    /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      // 渲染 watcher
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  // schedular.js - flushSchedulerQueue 中会调用 run 方法
  run () {
    // 判断当前 watcher 对象是否是存活状态
    if (this.active) {
      // 调用 watcher 对象 get 方法
      // 渲染 watcher 会调用 updateComponent 函数，更新视图，渲染 watcher 不存在返回值
      // 用户 watcher 会存在返回值
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        // 如果当前 watcher 是用户 watcher
        if (this.user) {
          try {
            // 调用用户传入的回调函数
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          // 渲染 watcher cb 是 noop，空函数
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

 	// ...
}
```

## 异步更新队列 - nextTick

Vue 更新 DOM 是异步执行的，并且是批量执行的

* 在下一次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

`Vue.nextTick(function () {})`、`vm.$nextTick(function() {})`

在 watcher 的 queueWatcher 中会执行 nextTick() 方法

### Vue.nextTick

#### src/core/global-api/index.js

```js
// src/core/global-api/index.js

export function initGlobalAPI (Vue: GlobalAPI) {
	// ...

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 不推荐用户使用
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

	// ...
}
```

### vm.$nextTick

#### src/core/instance/index.js

```js
// src/core/instance/index.js

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 定义 vue 构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
// 注册 vm 的 $data/$props/$set/$delete/$watch 方法
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
// $nextTick/_render
renderMixin(Vue)

export default Vue
```

#### src/core/instance/render.js

```js
export function renderMixin (Vue: Class<Component>) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype)

  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this)
  }

	// ...
}
```

#### src/core/util/next-tickjs

```js
/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks = []
let pending = false

// 刷新队列
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    // 如果没有被处理
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

优先使用 Promise，其次是 MutationObserver，然后是 setImmediate（IE、Node 环境支持），最后使 setTimeout。

nextTick 核心其实就是 timeFunc 处理，优先微任务，然后使用宏任务。

## 虚拟 DOM

### 基本概念

虚拟 DOM （Virtual DOM）是使用 JavaScript 对象描述的真实 DOM。

Vue.js 中的虚拟 DOM 借鉴 Snabbdom，并添加了 Vue.js 的特性。

* 例如：指令和组件机制

为什么要使用虚拟 DOM？

* 避免直接操作 DOM，提高开发效率
* 作为一个中间层可以跨平台
* 虚拟 DOM 不一定可以提高性能
  * 首次渲染的时候会增加开销
  * 复杂视图情况下会提升渲染性能



h 函数

vm.$createElement(tag, data, children, normalizeChildren)

* tag
  * 标签名称或者组件对象
* data
  * 描述 tag，可以设置 DOM 的属性或者标签属性
* children
  * tag 中的文本内容或者子节点



vnode 的核心属性

* tag
* data
* children
* text
* elm
* key

### 过程分析

* vm._init()
* vm.$mount()
* mountComponent
* 创建 watcher 对象
* updateComponent()
  * `vm._update(vm._render(), hydrating)`
* vm._render
  * `vnode = render.call(vm._renderProxy, vm.$creatElement)`
  * vm.$createElement()
    * h 函数，render() 中调用
    * createElement(vm, a, b, c, true)
    * `_createElemnt(context, tag, data, children, normalizationType)`
  * vm._createElement()
    * `vnode = new VNode(config, parsePlatformTagName(tag), data, children, undefiend, undefiend, context)`
    * `vm._render() ` 结束，返回 vnode
* vm._update()
  * 负责将虚拟 DOM  渲染成真实 DOM
  * 首次执行：`vm.__patch__(vm.$el, vnode, hydrating, false)`
  * 数据更新：`vm.__patch__(prevVnode, vnode)`
* `vm.__patch__()`
* patchVnode
* updateChildren

### createElement

#### src/core/instance/lifecycle.js

```typescript
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  
	// ...
  	
  // 触发 beforeMount 声明周期钩子函数
  callHook(vm, 'beforeMount')
	
  // 更新组件
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
  	// ...
  } else {
    updateComponent = () => {
      // vm._render 调用用户传入的 render 或编译器生成的 render，返回虚拟 DOM
      // vm._update 将虚拟 DOM 转换为真实 DOM，渲染到页面中
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    // 触发 mounted 生命周期钩子函数
    callHook(vm, 'mounted')
  }
  return vm
}
```

#### src/core/instance/render.js

```js
// src/core/instance/render.js

// 定义原型方法：$nextTick、_render
export function renderMixin (Vue: Class<Component>) {
	// ...

  Vue.prototype._render = function (): VNode {
    const vm: Component = this
    // vm.$options
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm
      // 调用用户定义的 render 函数或者模板编译后的 render(渲染函数)
      //  h 参数：vm.$createElement，生成虚拟 DOM
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
        } catch (e) {
          handleError(e, vm, `renderError`)
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    } finally {
      currentRenderingInstance = null
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
}

// h 函数：vm.$createElement
// _c：模板编译生成的 render 函数内部，会调用这个方法
export function initRender (vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  // 插槽相关属性
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  // 模板编译生成的 render 函数内部，会调用这个方法
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  // h 函数，将虚拟 DOM 转换为真实 DOM
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}
```

#### src/core/vdom/create-element.js

```js
// src/core/vdom/vnode.js

// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}

export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

```js
// src/core/vdom/create-element.js

const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationTyp	e: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  // 当 data 是数组或者原始值，重置设置参数
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
	// 如果是用户传入的 render 函数，设置 normalizationType 属性
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement (
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
) {
  // 如果 data 存在并且存在 __ob__ 属性，这时 data 是响应式对象
  if (isDef(data) && isDef((data: any).__ob__)) {
    // data 不应该是响应式数据
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    return createEmptyVNode()
  }
  // <component v-bind:is="currentTabComponent"></component>
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    // 如果 tag 是 false，意味着 :is 指令是 false，返回空节点
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      )
    }
  }
  // support single function children as default scoped slot
  // 处理作用域插槽
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    // 返回一维数组，处理用户传入的 render 函数
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    // 把二维数组转换为一维数组
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // 如果 tag 是 html 保留标签，直接创建 VNode 对象
      // platform built-in elements
      if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn(
          `The .native modifier for v-on is only valid on components but it was used on <${tag}>.`,
          context
        )
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if (
      (!data || !data.pre) && 
      isDef(Ctor = resolveAsset(context.$options, 'components', tag))
    ) {
      // 查找自定义组件构造函数声明
      // 根据 Ctor 创建组件的 VNode
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // 自定义标签
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    // 创建组件
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
```

```js
// src/core/vdom/helper/normalize-children.js

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
export function simpleNormalizeChildren (children: any) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
export function normalizeChildren (children: any): ?Array<VNode> {
  // 1. 如果 children 是原始值，创建文本节点，并返回数组形式
  // 2. 如果 children 是数组，将数组扁平化
  // 3. 非上述情况，返回 undefined
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node): boolean {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children: any, nestedIndex?: string): Array<VNode> {
  const res = []
  let i, c, lastIndex, last
  for (i = 0; i < children.length; i++) {
    c = children[i]
    if (isUndef(c) || typeof c === 'boolean') continue
    lastIndex = res.length - 1
    last = res[lastIndex]
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, `${nestedIndex || ''}_${i}`)
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]: any).text)
          c.shift()
        }
        res.push.apply(res, c)
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c)
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c))
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text)
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = `__vlist${nestedIndex}_${i}__`
        }
        res.push(c)
      }
    }
  }
  return res
}
```

### update

#### src/core/instance/lifecycle.js

```js
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  
	// ...
  	
  // 触发 beforeMount 声明周期钩子函数
  callHook(vm, 'beforeMount')
	
  // 更新组件
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
  	// ...
  } else {
    updateComponent = () => {
      // vm._render 调用用户传入的 render 或编译器生成的 render，返回虚拟 DOM
      // vm._update 将虚拟 DOM 转换为真实 DOM，渲染到页面中
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    // 触发 mounted 生命周期钩子函数
    callHook(vm, 'mounted')
  }
  return vm
}

export function lifecycleMixin (Vue: Class<Component>) {
  // 将 VNode 渲染成真实 DOM，首次渲染、数据更新都会调用
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render 首次渲染
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates 数据更新
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }

  // ...
}
```

### patch 定义过程

#### src/platforms/web/runtime/index.js

```js
// src/platforms/web/runtime/index.js

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// ...

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop
```

#### src/platforms/web/runtime/patch.js

```js
// src/platforms/web/runtime/patch.js

/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

// createPatchFunction 高阶函数，柯里化函数
export const patch: Function = createPatchFunction({ nodeOps, modules })
```

```js
// src/platforms/web/runtime/node-ops.js

// DOM 操作 API

/* @flow */

import { namespaceMap } from 'web/util/index'

export function createElement (tagName: string, vnode: VNode): Element {
  const elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}

export function createElementNS (namespace: string, tagName: string): Element {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

export function createTextNode (text: string): Text {
  return document.createTextNode(text)
}

export function createComment (text: string): Comment {
  return document.createComment(text)
}

export function insertBefore (parentNode: Node, newNode: Node, referenceNode: Node) {
  parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild (node: Node, child: Node) {
  node.removeChild(child)
}

export function appendChild (node: Node, child: Node) {
  node.appendChild(child)
}

export function parentNode (node: Node): ?Node {
  return node.parentNode
}

export function nextSibling (node: Node): ?Node {
  return node.nextSibling
}

export function tagName (node: Element): string {
  return node.tagName
}

export function setTextContent (node: Node, text: string) {
  node.textContent = text
}

export function setStyleScope (node: Element, scopeId: string) {
  node.setAttribute(scopeId, '')
}
```

```js
// src/platforms/web/runtime/modules/index.js

// 平台相关的处理
// 操作属性、样式、事件等

import attrs from './attrs'
import klass from './class'
import events from './events'
import domProps from './dom-props'
import style from './style'
import transition from './transition'

export default [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition // 过渡动画
]


// src/platforms/web/runtime/modules/attrs.js

// ...

// vnode 钩子的声明周期函数
export default {
  create: updateAttrs,
  update: updateAttrs
}
```

```js
// src/core/vdom/modules/index

// 处理指令和 ref

import directives from './directives'
import ref from './ref'

export default [
  ref,
  directives
]
```

#### src/core/vdom/patch.js

```js
// src/core/vdom/patch.js

const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
	
  // modules 节点的属性/事件/样式属性
  // nodeOps 节点操作
  const { modules, nodeOps } = backend

  for (i = 0; i < hooks.length; ++i) {
    // cbs['create'] = []
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        // cbs['create'] = [updateAttrs, updateClass, update...]
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

	// ...
	
  // 返回 patch 函数
  // createPatchFunction({ nodeOps, moduels }) 传入平台相关的两个参数
  // core 中方法与平台无关，通过函数柯里化做到平台与核心逻辑分离
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
  	// ...
  }
}
```

### patch 执行过程

#### patch

```js
// src/core/vdom/patch.js

const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
	
  // modules 节点的属性/事件/样式属性
  // nodeOps 节点操作
  const { modules, nodeOps } = backend

  for (i = 0; i < hooks.length; ++i) {
    // cbs['create'] = []
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        // cbs['create'] = [updateAttrs, updateClass, update...]
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }

	// ...
	
  // 返回 patch 函数
  // createPatchFunction({ nodeOps, moduels }) 传入平台相关的两个参数
  // core 中方法与平台无关，通过函数柯里化做到平台与核心逻辑分离
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // 新 VNode 不存在
    if (isUndef(vnode)) {
      // 老 VNode 存在，执行 destory 钩子函数
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    // 待插入节点队列
    const insertedVnodeQueue = []
    
		// 老 VNode 不存在
    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      // 创建新的 VNode，当前创建的 DOM 元素只是存在于内存中
      createElm(vnode, insertedVnodeQueue)
    } else {
      // 新老节点都存在，更新
      const isRealElement = isDef(oldVnode.nodeType)
      	
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // 不是真实 DOM 元素，并且新节点和旧节点相同，更新操作 diff 算法
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        // 如果是真实 DOM 元素，创建 VNode （首次渲染）
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              )
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          // 将真实 DOM 转换为 VNode 节点
          oldVnode = emptyNodeAt(oldVnode)
        }

        // replacing existing element
        // 获取存储的 DOM 元素
        const oldElm = oldVnode.elm
        // 获取 DOM 元素的父元素
        const parentElm = nodeOps.parentNode(oldElm)

        // create new node
        // 创建 DOM 节点
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) {
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor)
            }
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            ancestor = ancestor.parent
          }
        }

        // destroy old node（移除老节点）
        if (isDef(parentElm)) {
          // 判断 parentElm 是否存在，将 oldVNode 从界面中移除，并且触发相关的钩子函数
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          // 如果 ParentElm 不存在，并且 oldVNode 存在 tag 属性
          invokeDestroyHook(oldVnode)
        }
      }
    }
	
    // 触发队列中节点 insert 钩子函数
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
```

#### createElm

把 VNode 转换为 DOM 元素，并插入到 DOM 树中，并且去触发一些相应的钩子函数。

```js
// src/core/vdom/patch.js

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
  
  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      // 如果 children 是数组
      
      if (process.env.NODE_ENV !== 'production') {
        // 判断子元素是否存在相同的 key，如果存在，打印警告
        checkDuplicateKeys(children)
      }
      // 遍历 children，再次调用 createElm 将 vnode 转换为真实 DOM
      for (let i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
      }
    } else if (isPrimitive(vnode.text)) {
      // 原始值，创建文本节点，挂载到 vnode.elm 中
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
    }
  }
  
  // 把 VNode 转换为真实 DOM
  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // 如果 vnode 存在 elm 元素，并且存在子节点
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    vnode.isRootInsert = !nested // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }
	
    // 缓存变量
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    	
    if (isDef(tag)) {
      // vnode 存在 tag 属性，这里就是 vnode 的标签名称
      
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++
        }
        // 如果标签是否是未知标签，打印警告
        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          )
        }
      }
	
      // 判断 vnode 是否存在命名空间，分别调用不同的方法
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
      // 为 vnode 所对应的 dom 元素设置样式作用域，设置 scopedId
      setScope(vnode)

      /* istanbul ignore if */
      if (__WEEX__) {
       	// ...
      } else {
        // 将 vnode 的子元素转换为 DOM 对象
        createChildren(vnode, children, insertedVnodeQueue)
        if (isDef(data)) {
          // 如果 data 存在值，触发 created 钩子函数
          invokeCreateHooks(vnode, insertedVnodeQueue)
        }
        // 将 vnode 创建好的 DOM 对象插入到父级 DOM 中
        insert(parentElm, vnode.elm, refElm)
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--
      }
    } else if (isTrue(vnode.isComment)) {
      // vnode 是注释节点
      vnode.elm = nodeOps.createComment(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    } else {
      // vnode 是文本节点
      vnode.elm = nodeOps.createTextNode(vnode.text)
      insert(parentElm, vnode.elm, refElm)
    }
  }
}
```

#### patchVnode

新旧 VNode 对比，找到差异，更新到真实 DOM

```js
// src/core/vdom/patch.js

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
  
  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    // 遍历所有新节点的子节点，调用 createElm，将子节点转化为真实 DOM，挂载到 DOM 树
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx)
    }
  }
  
  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          // 触发 remove、destory 钩子函数
          removeAndInvokeRemoveHook(ch)
          invokeDestroyHook(ch)
        } else { // Text node
          removeNode(ch.elm)
        }
      }
    }
  }
  
  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    const elm = vnode.elm = oldVnode.elm

		// ...
    
    let i
    const data = vnode.data
    
    // 触发 prepatch 钩子函数
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode)
    }
	
    // 获取新旧节点的子节点 
    const oldCh = oldVnode.children
    const ch = vnode.children
    
    if (isDef(data) && isPatchable(vnode)) {
      // 触发 update 钩子函数（模块中的钩子函数），更新节点的属性/样式/事件等
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
      // 用户自定义钩子函数
      if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
    }
     
     // 判断新节点没有文本
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        // 新老节点都有子节点并且子节点不同
        // 对子节点进行 diff 操作，调用 updateChildren 
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      } else if (isDef(ch)) 
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
        // 新节点存在子节点，老节点不存在子节点
        // 先清空老节点 DOM 的文本内容，然后为当前 DOM 节点加入子节点
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
      } else if (isDef(oldCh)) {
        // 老节点存在子节点，新节点没有子节点
        // 删除老节点中的子节点
        removeVnodes(oldCh, 0, oldCh.length - 1)
      } else if (isDef(oldVnode.text)) {
        // 老节点存在 text 属性，设置为空
        nodeOps.setTextContent(elm, '')
      }
    } else if (oldVnode.text !== vnode.text) {
      // 新旧节点都有文本节点且不一致、重新赋值修改文本
      nodeOps.setTextContent(elm, vnode.text)
    }
    if (isDef(data)) {
      // 获取 postpatch 钩子函数并执行
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
    }
  }
}
```

#### ☆ updateChildren

pacthVnode 中，当新老节点都存在子节点，并且是相同节点，会调用 updateChildren 方法。

```js
// src/core/vdom/patch.js

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
		
  // diff 算法，更新新旧节点的子节点
  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      // 检查重复 key
      checkDuplicateKeys(newCh)
    }
	
    // diff 算法
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        // 判断开始节点是否有值，如果不存在值，获取后一个节点作为开始节点
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        // 判断结束节点是否有值，如果不存在值，获取前一个节点作为结束节点
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        // 头头比较
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        // 尾尾比较
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        // 头尾比较
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        // 尾头比较
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        // 乱序对比
        // 用新节点去老节点中依次比较
        	
        // 缓存老节点的 key 和 索引，创建映射表
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        
        // 如果新节点存在 key，去老节点索引中查找，如果没有找到，使用节点再去查找
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        	
        if (isUndef(idxInOld)) { // New element
          // 如果没有找到，说明是新元素
          // 创建新节点的 DOM 对象，并插入到老节点的 DOM 元素之前
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          // 获取老节点
          vnodeToMove = oldCh[idxInOld]
          
          if (sameVnode(vnodeToMove, newStartVnode)) {
            // 如果新老节点相同，patchVnode
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            // 将老的节点移动到新节点之前
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // 如果 key 相同，但是是不同的元素，创建新元素
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        // 移动下标，依次处理
        newStartVnode = newCh[++newStartIdx]
      }
    }
    
    if (oldStartIdx > oldEndIdx) {
      // 新节点比老节点多的情况，把剩余新节点插入到老节点后面
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      // 新节点遍历完，老节点还存在，移除老节点
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
}
```

#### key 的作用

vue 文档中说明可以在 v-for 的过程中给每一个节点设置 key 属性，以便于跟踪节点，元素复用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>patch - no key</title>
</head>
<body>

  <div id="app">
    <button @click="handler">按钮</button>
    <ul>
      <li v-for="value in array">{{ value }}</li>
    </ul>
  </div>

  <script src="../../dist/vue.js"></script>

  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        array: ['a', 'b', 'c', 'd']
      },
      methods: {
        handler() {
          this.array.splice(1, 0, 'x')
          // => this.array = ['a', 'x', 'b', 'c', 'd']
        }
      }
    })
  </script>

</body>
</html>
```

没有设置 key 的情况下，需要更新 3 次 DOM，还需要插入一次 DOM。会发生 4 次 DOM 操作。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>patch - has key</title>
</head>
<body>

  <div id="app">
    <button @click="handler">按钮</button>
    <ul>
      <li v-for="value in array" :key="value">{{ value }}</li>
    </ul>
  </div>

  <script src="../../dist/vue.js"></script>

  <script>
    const vm = new Vue({
      el: '#app',
      data: {
        array: ['a', 'b', 'c', 'd']
      },
      methods: {
        handler() {
          this.array.splice(1, 0, 'x')
          // => this.array = ['a', 'x', 'b', 'c', 'd']
        }
      }
    })
  </script>

</body>
</html>
```

 存在 key 的情况下，整个过程中，只需要进行一次 DOM 插入操作。

### 总结

* vm._init()

* vm.$mount()

* mountComponent

* 创建 watcher 对象

* updateComponent()

  * `vm._update(vm._render(), hydrating)`

* vm._render

  * `vnode = render.call(vm._renderProxy, vm.$creatElement)`
  * vm.$createElement()
    * h 函数，用户设置的 render 函数调用
    * createElement(vm, a, b, c, d, true)
  * vm._c
    * h 函数，模板编译的 render 函数中调用
    * createElement(vm, a, b, c, d, false)
  * _createElement
    * `vnode = new VNode(config, parsePlatformTagName(tag), data, children, undefiend, undefiend, context)`
    * `vm._render() ` 结束，返回 vnode

* vm._update()

  * 负责将虚拟 DOM  渲染成真实 DOM
  * 首次执行：`vm.__patch__(vm.$el, vnode, hydrating, false)`
  * 数据更新：`vm.__patch__(prevVnode, vnode)`

* `vm.__patch__()`

  * runtime/index.js 中挂载 `Vue.prototype.__patch__`
  * runtime/patch.js 的 patch 函数
  * 设置 modules 和 nodeOps
    * modules：平台相关的模块
    * nodeOps：操作 DOM API
  * 调用 createPatchFunction() 函数返回 patch 函数

* patch()

  * vdom/patch.js 中的 createPatchFunction 返回 patch 函数
  * 挂载 cbs 节点的属性/事件/样式操作的钩子函数
  * 判断第一个参数是真实 DOM 还是虚拟 DOM。首次加载，第一个参数就是真实 DOM，转换成 VNode，调用 createElm
  * 如果是数据更新的时候，新旧节点是 sameVnode 执行 patchVnode，也就是 diff 过程
  * 删除旧节点

* createElm(vnode, InsertedVnodeQueue)

  * 把虚拟节点转化为真实 DOM，并插入到 DOM 树
  * 把虚拟节点的 children，转换为真实 DOM，并插入到 DOM 树

* patchVnode

  * 对比新旧 VNode，以及新旧 VNode 的子节点，更新差异
  * 如果新旧 VNode 都有子节点并且子节点不同的话，会调用 updateChildren 对比子节点的差异
  
* updateChildren

  * 从头和尾依次找到相同的子节点进行比较 patchVnode，总共有四种比较方式
  * 在老节点的子节点中查找 newStartVnode，并进行处理
  * 如果新节点比老节点多，把新增的子节点插入到 DOM 中
  * 如果老节点比新节点多，把多余的老节点删除

## 模板编译

### 简介

模板编译的主要目的是将模板（template）转换为渲染函数（render）。

```html
<div>
  <h1 @click="handler">title</h1>
  <p>some content</p>
</div>
```

```js
render(h) {
  return h('div', [
    h('h1', { on: { click: this.handler } }, 'title'),
    h('p', 'some content')
  ])
}
```

* Vue 2.x 使用 VNode 描述视图以及各种交互，用户自己编写 VNode 比较复杂
* 用户只需要编写类似 HTML 的代码 - Vue.js 模板，通过编译器将模板转换为返回 VNode 的 render 函数
* .vue 文件会被 webpack 在构建的过程中转换成 render 函数
  * 通过 vue-loader 实现模板编译

根据模板编译时机，我们可以把编译过程分为运行时编译和构建时编译，支持运行时编译必须使用完整的的 Vue 版本。

运行时编译的缺点就是引入的 vue 文件体积大，运行速度慢。
使用 vue-cli 创建的项目，默认加载的是运行时版本的 vue，不带编译器，体积相对较小。这时就需要构建时编译。

### 模板编译结果分析

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>compile</title>
</head>
<body>

  <div id="app">
    <h1>Vue<span>Template Compile</span></h1>
    <p>{{ message }}</p>
    <comp @click="handler" />
  </div>

  <script src="../../dist/vue.js"></script>

  <script>
    Vue.component('comp', {
      template: '<div>a custom component</div>'
    })

    const vm = new Vue({
      el: '#app',
      data: {
        message: 'vue compiler'
      },
      methods: {
        handler() {
          console.log('test')
        }
      }
    })

    console.log(vm.$options.render)
  </script>

</body>
</html>
```

```js
(function anonymous() {
  with (this) {
    return _c(
      'div',
      { attrs: { "id":"app" } }, 
      [
        _m(0),
        _v(" "),
        _c('p', [_v(_s(message))]),
        _v(" "),
        _c('comp', { on: { "click": handler } } )
      ],
      1
    )
  }
})
```

编译生成的函数的位置

* `_c()`
  * src/core/instance/render.js
* `_m()/_v()/_s()`
  * src/core/instance/render-helpers/index.js

```js
// src/core/instance/render.js

// _c => createElement

export function initRender (vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm)
    }, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm)
    }, true)
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
}
```

```js
// src/core/instance/render-helpers/index.js

// render.js - renderMixin 中调用 installRenderHelpers 函数

// _m => renderStatic
// _v => createTextVNode
// _s => toString

/* @flow */

import { toNumber, toString, looseEqual, looseIndexOf } from 'shared/util'
import { createTextVNode, createEmptyVNode } from 'core/vdom/vnode'
import { renderList } from './render-list'
import { renderSlot } from './render-slot'
import { resolveFilter } from './resolve-filter'
import { checkKeyCodes } from './check-keycodes'
import { bindObjectProps } from './bind-object-props'
import { renderStatic, markOnce } from './render-static'
import { bindObjectListeners } from './bind-object-listeners'
import { resolveScopedSlots } from './resolve-scoped-slots'
import { bindDynamicKeys, prependModifier } from './bind-dynamic-keys'

export function installRenderHelpers (target: any) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString
  target._l = renderList
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode
  target._e = createEmptyVNode
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}
```

```jsx
<div id="app">
  <h1>Vue<span>Template Compile</span></h1>
  <p>{{ message }}</p>
  <comp @click="handler" />
</div>

Vue.component('comp', {
	template: '<div>a custom component</div>'
})

-----------

(function anonymous() {
  with (this) {
    return _c(
      'div',
      { attrs: { "id":"app" } }, 
      [
        _m(0), // 对应模板中 h1 标签，处理模板的过程中会对静态内容做优化处理
        _v(" "), // 对应 h1 标签和 p 标签之间的空白位置
        _c('p', [_v(_s(message))]), // p 标签
        _v(" "), // p 标签和组件 comp 之间的空白位置
        _c('comp', { on: { "click": handler } } ) // comp 组件
      ],
      1 // 后续如何对 children 处理
    )
  }
})

-----------

(function anonymous() {
  with (this) {
    return createElement(
      'div',
      { attrs: { "id":"app" } }, 
      [
        renderStatic(0),
        createTextVNode(" "),
        createElement('p', [createTextVNode(toString(message))]),
        createTextVNode(" "),
        createElement('comp', { on: { "click": handler } } )
      ],
      1
    )
  }
})
```

### Vue Template Explorer

网页工具，可以将 HTML 模板转换为 render 函数。

[https://v2.template-explorer.vuejs.org](https://v2.template-explorer.vuejs.org)

[https://template-explorer.vuejs.org](https://template-explorer.vuejs.org)

```html
<div id="app">
  <h1>Vue<span>Template Compile</span></h1>
  <p>{{ message }}</p>
  <comp @click="handler" />
</div>
```

```js
// vue2

function render() {
  with(this) {
    return _c('div', {
      attrs: {
        "id": "app"
      }
    }, [_m(0), _c('p', [_v(_s(message))]), _c('comp', {
      on: {
        "click": handler
      }
    })], 1)
  }
}
```

```js
// vue3

import { createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, toDisplayString as _toDisplayString, resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_comp = _resolveComponent("comp")

  return (_openBlock(), _createElementBlock("div", { id: "app" }, [
    _createElementVNode("h1", null, [
      _createTextVNode("Vue"),
      _createElementVNode("span", null, "Template Compile")
    ]),
    _createElementVNode("p", null, _toDisplayString(_ctx.message), 1 /* TEXT */),
    _createVNode(_component_comp, { onClick: _ctx.handler }, null, 8 /* PROPS */, ["onClick"])
  ]))
}

// Check the console for the AST
```

使用 vue2 模板时，标签内文本内容尽量不要添加多余空白内容，vue3 编译后 render 函数已经去除多余空白内容，不会保留。

### 模板编译入口

#### src/platforms/web/entry-runtime-with-compiler.js

```js
// src/platforms/web/entry-runtime-with-compiler.js

const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)
		
  // ...
  
  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
         	// ...
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
     	// ...
      
      // 把 template 转换为 render 函数
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)
}
```

#### src/platforms/web/compiler/index.js

```js
// src/platforms/web/compiler/index.js

/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
```

```js
// src/platforms/web/compiler/options.js
import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace
} from '../util/index'

import modules from './modules/index'
import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'

export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}


//  src/platforms/web/compiler/moduels/index.js
import klass from './class'
import style from './style'
import model from './model'

// 处理类样式与行内样式以及 v-model
export default [
  klass,
  style,
  model
]
// src/platforms/web/compiler/moduels/model.js
/**
 * Expand input[v-model] with dynamic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */


//  src/platforms/web/compiler/directives/index.js
import model from './model'
import text from './text'
import html from './html'

export default {
  model,
  text,
  html
}
```

#### src/compiler/index

```js
/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模板转换成 ast 抽象语法树（以树行方式描述代码结构）
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    optimize(ast, options)
  }
  // 将抽象语法树生成字符串形式的 js 代码
  const code = generate(ast, options)
  return {
    ast,
    // 渲染函数
    render: code.render,
    // 静态渲染函数，生成静态 VNode 树
    staticRenderFns: code.staticRenderFns
  }
})
```

#### src/compiler/create-compiler.js

```js
/* @flow */

import { extend } from 'shared/util'
import { detectErrors } from './error-detector'
import { createCompileToFunctionFn } from './to-function'

export function createCompilerCreator (baseCompile: Function): Function {
  // baseOptions 平台相关的 options
  // src/platforms/web/compiler/options.js
  return function createCompiler (baseOptions: CompilerOptions) {
    // 接收模板和用户传入的选项
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
      const finalOptions = Object.create(baseOptions)
      const errors = []
      const tips = []

      let warn = (msg, range, tip) => {
        (tip ? tips : errors).push(msg)
      }

      if (options) {
        if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
          // $flow-disable-line
          const leadingSpaceLength = template.match(/^\s*/)[0].length

          warn = (msg, range, tip) => {
            const data: WarningMessage = { msg }
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength
              }
            }
            (tip ? tips : errors).push(data)
          }
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules)
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          )
        }
        // copy other options
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }
      }

      finalOptions.warn = warn

      // 调用 baseCompiler 编译模板
      const compiled = baseCompile(template.trim(), finalOptions)
      if (process.env.NODE_ENV !== 'production') {
        detectErrors(compiled.ast, warn)
      }
      compiled.errors = errors
      compiled.tips = tips
      return compiled
    }

    return {
      compile,
      // 模板编译入口
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```

#### 总结

* compileToFunctions(template, {}, this)
  * 返回 { render, staticRenderFns }
* createCompiler(baseOptions)
  * 定义 compile(template, options) 函数
  * 生成 compileToFunctions
    * createCompileToFunctionFn(compile)
  * 返回 { compile, compileToFunctions  }
  * compileToFunctions 函数是模板编译的入口
* createCompileCreater(function baseCompile(){ })
  * 传入 baseCompile(template, finalOptions) 函数
  * baseCompile
    * 解析 parse
    * 优化 optimize
    * 生成 generate
  * 返回 createCompiler 函数

### compileToFunctions

#### src/compiler/create-compiler.js

```js
/* @flow */

import { extend } from 'shared/util'
import { detectErrors } from './error-detector'
import { createCompileToFunctionFn } from './to-function'

export function createCompilerCreator (baseCompile: Function): Function {
  // baseOptions 平台相关的 options
  // src/platforms/web/compiler/options.js
  return function createCompiler (baseOptions: CompilerOptions) {
    // 接收模板和用户传入的选项
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
      const finalOptions = Object.create(baseOptions)
      const errors = []
      const tips = []

      let warn = (msg, range, tip) => {
        (tip ? tips : errors).push(msg)
      }

      if (options) {
        if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
          // $flow-disable-line
          const leadingSpaceLength = template.match(/^\s*/)[0].length

          warn = (msg, range, tip) => {
            const data: WarningMessage = { msg }
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength
              }
            }
            (tip ? tips : errors).push(data)
          }
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules)
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          )
        }
        // copy other options
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }
      }

      finalOptions.warn = warn

      // 调用 baseCompiler 编译模板
      const compiled = baseCompile(template.trim(), finalOptions)
      if (process.env.NODE_ENV !== 'production') {
        detectErrors(compiled.ast, warn)
      }
      compiled.errors = errors
      compiled.tips = tips
      return compiled
    }

    return {
      compile,
      // 模板编译入口
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```

#### src/compiler/to-function.js

寻找缓存中编译结果

* 如果存在直接返回缓存内容
* 如果没有开始编译，并且将编译后的字符串形式代码转换为函数形式，最后缓存并返回结果

```js
function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err, code })
    return noop
  }
}

export function createCompileToFunctionFn (compile: Function): Function {
  // 定义 cache 对象
  const cache = Object.create(null)

  return function compileToFunctions (
    template: string,
    options?: CompilerOptions,
    vm?: Component
  ): CompiledFunctionResult {
    options = extend({}, options)
    const warn = options.warn || baseWarn
    delete options.warn

    /* istanbul ignore if */
		// ...

    // check cache
    // 1. 判断缓存中是否存在编译结果，如果存在，直接返回缓存结果
    const key = options.delimiters
      ? String(options.delimiters) + template
      : template
    if (cache[key]) {
      return cache[key]
    }

    // compile
    // 2. 把模板编译为对象形式（render、staticRenderFns），字符串形式的 js 代码
    const compiled = compile(template, options)

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(e => {
            warn(
              `Error compiling template:\n\n${e.msg}\n\n` +
              generateCodeFrame(template, e.start, e.end),
              vm
            )
          })
        } else {
          warn(
            `Error compiling template:\n\n${template}\n\n` +
            compiled.errors.map(e => `- ${e}`).join('\n') + '\n',
            vm
          )
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(e => tip(e.msg, vm))
        } else {
          compiled.tips.forEach(msg => tip(msg, vm))
        }
      }
    }

    // turn code into functions
    const res = {}
    const fnGenErrors = []
    
    // 3. 把字符串形式的 js 代码转换为 js 方法
    res.render = createFunction(compiled.render, fnGenErrors)
    res.staticRenderFns = compiled.staticRenderFns.map(code => {
      return createFunction(code, fnGenErrors)
    })

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          `Failed to generate render function:\n\n` +
          fnGenErrors.map(({ err, code }) => `${err.toString()} in\n\n${code}\n`).join('\n'),
          vm
        )
      }
    }
	
    // 4. 缓存并返回 res 对象（render、staticRenderFns 方法）
    return (cache[key] = res)
  }
}
```

### compile

#### src/compiler/create-compiler.js

```js
/* @flow */

import { extend } from 'shared/util'
import { detectErrors } from './error-detector'
import { createCompileToFunctionFn } from './to-function'

export function createCompilerCreator (baseCompile: Function): Function {
  // baseOptions 平台相关的 options
  // src/platforms/web/compiler/options.js
  return function createCompiler (baseOptions: CompilerOptions) {
    
    // 接收模板和用户传入的选项
    function compile (
      template: string,
      options?: CompilerOptions // 用户传入的选项
    ): CompiledResult {
      // 合并配置
      const finalOptions = Object.create(baseOptions)
      // 存储编译过程中出现的错误和信息
      const errors = []
      const tips = []

      let warn = (msg, range, tip) => {
        (tip ? tips : errors).push(msg)
      }

      if (options) {
        if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
          // $flow-disable-line
          const leadingSpaceLength = template.match(/^\s*/)[0].length

          warn = (msg, range, tip) => {
            const data: WarningMessage = { msg }
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength
              }
            }
            (tip ? tips : errors).push(data)
          }
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules)
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          )
        }
        // copy other options
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }
      }

      finalOptions.warn = warn

      // 调用 baseCompiler 编译模板，将模板编译为 render 函数
      const compiled = baseCompile(template.trim(), finalOptions)
      if (process.env.NODE_ENV !== 'production') {
        detectErrors(compiled.ast, warn)
      }
      compiled.errors = errors
      compiled.tips = tips
      
      return compiled
    }

    return {
      compile,
      // 模板编译入口
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```

### 抽象语法树 AST 

抽象语法树

* 抽象语法树简称 AST（Abstract Syntax Tree）
* 使用对象的形式描述树形的代码结构
* 此处的抽象语法树是用来描述树形结构的 HTML 字符串

为什么要使用抽象语法树：

* 模板字符串转换成 AST 后，可以通过 AST 对模板做优化处理
* 标记模板中的静态内容，在 patch 的时候直接跳过静态内容
* 在 patch 的过程中静态内容不需要对比和重新渲染

> 使用 babel 对 js 代码进行降级处理时，也会先把代码转换为 AST，再将代码转换为降级后的 js 代码。

抽象语法树查看：[https://astexplorer.net](https://astexplorer.net)

#### src/compiler/index.js

```js
/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模板转换成 ast 抽象语法树（以树行方式描述代码结构）
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    optimize(ast, options)
  }
  // 将抽象语法树生成字符串形式的 js 代码
  const code = generate(ast, options)
  return {
    ast,
    // 渲染函数
    render: code.render,
    // 静态渲染函数，生成静态 VNode 树
    staticRenderFns: code.staticRenderFns
  }
})
```

### baseCompile - parse

parse 函数的作用是把模板字符串转为 AST 对象。

parse 函数会依次遍历 html 模板字符串，将 html 模板字符串转换为 ast 对象。

html 中的属性和指令都会记录在 ast 对象的相应属性上。

#### src/compiler/index.js

```js
/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模板转换成 ast 抽象语法树（以树行方式描述代码结构）
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    optimize(ast, options)
  }
  // 将抽象语法树生成字符串形式的 js 代码
  const code = generate(ast, options)
  return {
    ast,
    // 渲染函数
    render: code.render,
    // 静态渲染函数，生成静态 VNode 树
    staticRenderFns: code.staticRenderFns
  }
})
```

#### src/compiler/parser/index.js

```js
/**
 * Convert HTML string to AST.
 */
export function parse (
  template: string,
  options: CompilerOptions
): ASTElement | void {
  warn = options.warn || baseWarn
	
  // ...
  
	// 2. 模板解析
  parseHTML(template, {
    warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    // 解析过程中的回调函数，生成 AST
    start (tag, attrs, unary, start, end) {
      // check namespace.
      // inherit parent ns if there is one
      const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs)
      }
	
      // 创建 AST 对象
      let element: ASTElement = createASTElement(tag, attrs, currentParent)
      if (ns) {
        element.ns = ns
      }
	
      /// ...
   	
      // apply pre-transforms
      for (let i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element
      }
	
      // 开始处理指令 v-pre
      if (!inVPre) {
        processPre(element)
        if (element.pre) {
          inVPre = true
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true
      }
      if (inVPre) {
        processRawAttrs(element)
      } else if (!element.processed) {
        // structural directives
        // 处理结构化指令 v-for，v-if，v-once
        processFor(element)
        processIf(element)
        processOnce(element)
      }

      if (!root) {
        root = element
        if (process.env.NODE_ENV !== 'production') {
          checkRootConstraints(root)
        }
      }

      if (!unary) {
        currentParent = element
        stack.push(element)
      } else {
        closeElement(element)
      }
    },

    end (tag, start, end) {
      const element = stack[stack.length - 1]
      // pop stack
      stack.length -= 1
      currentParent = stack[stack.length - 1]
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        element.end = end
      }
      closeElement(element)
    },

    chars (text: string, start: number, end: number) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start }
            )
          } else if ((text = text.trim())) {
            warnOnce(
              `text "${text}" outside root element will be ignored.`,
              { start }
            )
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      const children = currentParent.children
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text)
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = ''
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' '
        } else {
          text = ' '
        }
      } else {
        text = preserveWhitespace ? ' ' : ''
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE, ' ')
        }
        let res
        let child: ?ASTNode
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text
          }
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text
          }
        }
        if (child) {
          if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
            child.start = start
            child.end = end
          }
          children.push(child)
        }
      }
    },
    comment (text: string, start, end) {
      // adding anything as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        const child: ASTText = {
          type: 3,
          text,
          isComment: true
        }
        if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
          child.start = start
          child.end = end
        }
        currentParent.children.push(child)
      }
    }
  })
  return root
}
```

#### src/compiler/parser/html-parser.js

```js
// src/compiler/parser/html-parser.js

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// html-parser 借鉴的是一个开源库
// http://erik.eae.net/simplehtmlparser/simplehtmlparser.js

export function parseHTML (html, options) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no
  let index = 0
  let last, lastTag
  
  while (html) {
    last = html
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<')
      
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->')

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            advance(commentEnd + 3)
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2)
            continue
          }
        }

        // Doctype:
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // End tag:
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          const curIndex = index
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1], curIndex, index)
          continue
        }

        // Start tag:
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1)
          }
          continue
        }
      }

      let text, rest, next
      if (textEnd >= 0) {
        rest = html.slice(textEnd)
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1)
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd)
        }
        text = html.substring(0, textEnd)
      }

      if (textEnd < 0) {
        text = html
      }

      if (text) {
        advance(text.length)
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index)
      }
    } else {
      let endTagLength = 0
      const stackedTag = lastTag.toLowerCase()
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'))
      const rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1)
        }
        if (options.chars) {
          options.chars(text)
        }
        return ''
      })
      index += html.length - rest.length
      html = rest
      parseEndTag(stackedTag, index - endTagLength, index)
    }

    if (html === last) {
      options.chars && options.chars(html)
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(`Mal-formatted tag at end of template: "${html}"`, { start: index + html.length })
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag()
	
  // 记录当前更新下标，消费字符串
  function advance (n) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag () {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      }
      advance(start[0].length)
      let end, attr
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }

  function handleStartTag (match) {
    const tagName = match.tagName
    const unarySlash = match.unarySlash

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag)
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName)
      }
    }

    const unary = isUnaryTag(tagName) || !!unarySlash

    const l = match.attrs.length
    const attrs = new Array(l)
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i]
      const value = args[3] || args[4] || args[5] || ''
      const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      }
      if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length
        attrs[i].end = args.end
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
      lastTag = tagName
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end)
    }
  }

  function parseEndTag (tagName, start, end) {
    let pos, lowerCasedTagName
    if (start == null) start = index
    if (end == null) end = index

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase()
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (let i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            `tag <${stack[i].tag}> has no matching end tag.`,
            { start: stack[i].start, end: stack[i].end }
          )
        }
        if (options.end) {
          options.end(stack[i].tag, start, end)
        }
      }

      // Remove the open elements from the stack
      stack.length = pos
      lastTag = pos && stack[pos - 1].tag
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end)
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end)
      }
      if (options.end) {
        options.end(tagName, start, end)
      }
    }
  }
}
```

### baseCompile - optimize

#### src/compiler/index.js

```js
/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模板转换成 ast 抽象语法树（以树行方式描述代码结构）
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    optimize(ast, options)
  }
  // 将抽象语法树生成字符串形式的 js 代码
  const code = generate(ast, options)
  return {
    ast,
    // 渲染函数
    render: code.render,
    // 静态渲染函数，生成静态 VNode 树
    staticRenderFns: code.staticRenderFns
  }
})
```

#### src/compiler/optimizer.js

优化的目的是为了标记抽象语法树的静态节点

* 对应的 DOM 子树永远不会发生变化
* 标记为静态子树后，后续更新时就不需要重新渲染，patch 过程中可以直接跳过静态子树

```js
/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  // 标记静态节点
  markStatic(root)
  // second pass: mark static roots.
  // 标记静态根节点
  markStaticRoots(root, false)
}

function genStaticKeys (keys: string): Function {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic (node: ASTNode) {
  // 判断节点是否是静态的
  node.static = isStatic(node)
  // 元素节点
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    // 是组件，不是 slot，没有 inline-template
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    // 遍历 children
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i]
      // 标记静态
      markStatic(child)
      if (!child.static) {
        // 如果有一个 child 不是 static，当前 node 不是 static
        node.static = false
      }
    }
    // 处理条件渲染的 ast 对象
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        const block = node.ifConditions[i].block
        markStatic(block)
        if (!block.static) {
          node.static = false
        }
      }
    }
  }
}

function markStaticRoots (node: ASTNode, isInFor: boolean) {
  // 判断节点是否为元素
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    // 如果一个元素内只有文本节点，此时这个元素不是静态的 Root
    // Vue 认为这种优化会带来负面影响
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true
      return
    } else {
      node.staticRoot = false
    }
    // 检测当前节点的子节点是否存在静态的 Root
    if (node.children) {
      for (let i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for)
      }
    }
    if (node.ifConditions) {
      for (let i = 1, l = node.ifConditions.length; i < l; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor)
      }
    }
  }
}

// 判断是否为静态节点
function isStatic (node: ASTNode): boolean {
  if (node.type === 2) { // expression 插值表达式
    return false
  }
  if (node.type === 3) { // text 文本
    return true
  }
  return !!(node.pre || ( // pre
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) && // 不能是 v-for 下的直接子节点
    Object.keys(node).every(isStaticKey)
  ))
}
```

### baseCompile - generate

#### src/compiler/index.js

```js
/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模板转换成 ast 抽象语法树（以树行方式描述代码结构）
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    optimize(ast, options)
  }
  // 将抽象语法树生成字符串形式的 js 代码
  const code = generate(ast, options)
  return {
    ast,
    // 渲染函数
    render: code.render,
    // 静态渲染函数，生成静态 VNode 树
    staticRenderFns: code.staticRenderFns
  }
})
```

#### src/compiler/codegen/index.js

```js
// src/compiler/codegen/index.js

export class CodegenState {
  options: CompilerOptions;
  warn: Function;
  transforms: Array<TransformFunction>;
  dataGenFns: Array<DataGenFunction>;
  directives: { [key: string]: DirectiveFunction };
  maybeComponent: (el: ASTElement) => boolean;
  onceId: number;
  staticRenderFns: Array<string>;
  pre: boolean;

  constructor (options: CompilerOptions) {
    this.options = options
    this.warn = options.warn || baseWarn
    this.transforms = pluckModuleFunction(options.modules, 'transformCode')
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData')
    this.directives = extend(extend({}, baseDirectives), options.directives)
    const isReservedTag = options.isReservedTag || no
    this.maybeComponent = (el: ASTElement) => !!el.component || !isReservedTag(el.tag)
    this.onceId = 0
    this.staticRenderFns = [] // 存储静态根节点生成的代码
    this.pre = false
  }
}
```

```js
// src/compiler/codegen/index.js

export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  const state = new CodegenState(options)
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns // 存储的是静态渲染函数
  }
}

export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }

  if (el.staticRoot && !el.staticProcessed) {
    // 处理静态节点
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    let code
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        // 生成元素的属性/指令/事件等
        // 处理各种指令，包括 genDirectives(model/text/html)
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // module transforms
    for (let i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code)
    }
    return code
  }
}
```

### 总结

模板编译是把模板首先转换为 AST 对象，然后对 AST 对象进行优化（标记静态根节点），然后把优化后的 AST 对象生成字符串形式代码。最后将字符串形式代码通过 new Function 转换成匿名函数。这个匿名函数就是最终生成的 render 函数。

模板编译就是把模板字符串转换为渲染函数。

```html
<div id="app">
  <h1>Vue<span>Template Compile</span></h1>
  <div>{{ message }}<p>hello</p></div>
  <div>是否显示</div>
</div>
```

h1 标签内容是静态根节点，另外两个 div 都不是静态根节点，对于标签内部直接包含 div 元素，vue 不会将其标记为静态根节点。

* compileToFunctions(template, ...)
  * 先从缓存加载编译好的 render 函数
  * 缓存中没有则调用 compile(template, options)
* compile(template, options)
  * 合并 options
  * baseCompile(template.trim(), finalOptions)
* baseCompile(template.trim(), finalOptions)
  * parse()
    * 把 template 转换为 AST Tree
  * optimize()
    * 标记 AST Tree 中的静态节点 sub tree
    * 检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点
    * patch 阶段跳过静态子树
  * generate()
    * 将 AST Tree 转换为字符串形式的 js 代码 
* compileToFunctions(template, ...)
  * 继续把上一步中生成的字符串形式 js 代码转换为函数
  * createFunction()
  * render 和 staticRenderFns 初始化完毕，挂载到 Vue 实例的 options 对应的属性中

## 组件化

一个 Vue 组件就是一个拥有预定义选项的一个 Vue 实例。

一个组件可以组成页面上一个功能完备的区域，组件可以包含脚本、样式、模板。

### 组件注册

* 全局组件
* 局部组件

```html
<div id="app"></div>

<script>
  const Comp = Vue.component('comp', {
    template: '<div>Hello Component</div>'
  })

  const vm = new Vue({
    el: '#app',
    render(h) {
      return h(Comp)
    }
  })
</script>
```



#### src/core/global-api/assets.js

全局组件注册

```js
// src/shared/constants.js

export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
```

```js
// src/core/global-api/assets.js

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // Vue.component、Vue.directive、Vue.filter
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          // vue.extend 方法，将组件配置转化为组件的构造函数
          // _base 其实就是 Vue 构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 全局注册，存储资源并赋值
    		// this.options['components']['comp'] = definition
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
```

#### src/core/global-api/extend.js

```js
export function initExtend (Vue: GlobalAPI) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0
  let cid = 1

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    // vue 构造函数
    const Super = this
    const SuperId = Super.cid
    
    // 缓存中加载组件的构造函数
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
	
    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      // 开发环境验证组件名称是否合法
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      // 调用 _init() 初始化
      this._init(options)
    }
    // 原型继承
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    // 合并 options
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    // 把组件构造函数保存到 Ctor.options.components.comp = Ctor
    if (name) {
      // 因为缓存到 Vue.options.components 中，所以所有位置都可以访问
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    // 将组件的构造函数缓存到 options._Ctor
    cachedCtors[SuperId] = Sub
    return Sub
  }
}
```

### 创建过程

页面首次渲染过程

* Vue 构造函数
* this._init()
* this.$mount()
* mouneComponent()
* new Watcher() 渲染 watcher
* updateComponent()
* vm._render()，createElement()
* vm._update()

#### src/core/vdom/create-element.js

```js
const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}

export function _createElement (
  context: Component, // vue 实例或组件实例
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
) {
 	// ...
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !('@binding' in data.key)) {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      )
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    // 普通标签处理
   	// ...
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
```

#### src/core/vdom/create-component.js

```js
// src/core/vdom/create-component.js

export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component, // vue 实例或当前组件实例
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  if (isUndef(Ctor)) {
    return
  }

  const baseCtor = context.$options._base

  // plain options object: turn it into a constructor
  // 如果 Ctor 不是一个构造函数，是一个对象
  // 使用 Vue.extend() 创造一个子组件的构造函数
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid Component definition: ${String(Ctor)}`, context)
    }
    return
  }

  // async component
  let asyncFactory
  // 如果 Ctor 没有 cid，被视为异步组件
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor)
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {}

  // resolve constructor options in case global mixins are applied after
  // component constructor creation 
  // 合并组件和全局 mixins 混入的选项
  resolveConstructorOptions(Ctor)

  // transform component v-model data into props & events
  // 处理组件上的 v-model 指令
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }

  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    const slot = data.slot
    data = {}
    if (slot) {
      data.slot = slot
    }
  }

  // install component management hooks onto the placeholder node
  // 安装组件的钩子函数 init/prepatch/insert/destory
  installComponentHooks(data)

  // return a placeholder vnode
  const name = Ctor.options.name || tag
  // 创建自定义组件的 VNode，设置自定义组件名称
  const vnode = new VNode(
    // vue-component-1-comp
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  if (__WEEX__ && isRecyclableComponent(vnode)) {
    return renderRecyclableComponentTemplate(vnode)
  }
	
	// 返回 vnode 对象
  return vnode
}

// 安装组件构造函数
function installComponentHooks (data: VNodeData) {
  const hooks = data.hook || (data.hook = {})
  // 用户可以传递自定义钩子函数
  // 将用户传入的自定义钩子函数和 componentVNodeHooks 中预定义的钩子函数合并
  for (let i = 0; i < hooksToMerge.length; i++) {
    const key = hooksToMerge[i]
    const existing = hooks[key]
    const toMerge = componentVNodeHooks[key]
    // 合并 hooks
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
    }
  }
}

function mergeHook (f1: any, f2: any): Function {
  const merged = (a, b) => {
    // flow complains about extra args which is why we use any
    f1(a, b)
    f2(a, b)
  }
  merged._merged = true
  return merged
}

// 创建组件实例
export function createComponentInstanceForVnode (
  // we know it's MountedComponentVNode but flow doesn't
  vnode: any,
  // activeInstance in lifecycle state
  parent: any
): Component {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  // 创建组件实例
  return new vnode.componentOptions.Ctor(options)
}
```

```js
// src/core/vdom/create-component.js  

// hooksToMerge

// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      )
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },

  prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    const options = vnode.componentOptions
    const child = vnode.componentInstance = oldVnode.componentInstance
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    )
  },

  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  },

  destroy (vnode: MountedComponentVNode) {
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy()
      } else {
        deactivateChildComponent(componentInstance, true /* direct */)
      }
    }
  }
}

const hooksToMerge = Object.keys(componentVNodeHooks)
```

### 组件 patch 过程

#### src/core/vdom/patch.js

组件创建是由父到子，组件挂载是先挂载子组件再挂载父组件。

组件的粒度也不是越小越好，嵌套一层组件会重复执行一次创建过程，比较消耗性能。组件的抽象过程要合理。

```js
// src/core/vdom/patch.js

const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

export function createPatchFunction (backend) {
  let i, j
  const cbs = {}
	
  // modules 节点的属性/事件/样式属性
  // nodeOps 节点操作
  const { modules, nodeOps } = backend

  for (i = 0; i < hooks.length; ++i) {
    // cbs['create'] = []
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        // cbs['create'] = [updateAttrs, updateClass, update...]
        cbs[hooks[i]].push(modules[j][hooks[i]])
      }
    }
  }
	
  
  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode)
    }

    vnode.isRootInsert = !nested // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }
		
    // ...
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
      const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        // 调用 init() 方法，创建和挂载组件实例
        // init() 的过程中创建了组件的真实 DOM，挂载到 vnode.elm 上
        i(vnode, false /* hydrating */)
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        // 调用钩子函数（VNode 的钩子函数初始化属性/事件/样式等，组件的钩子函数）
        initComponent(vnode, insertedVnodeQueue)
        // 把组件对应 DOM 插入到父元素中，先挂载子组件再挂载父组件
        insert(parentElm, vnode.elm, refElm)
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
        }
        return true
      }
    }
  }
	
  // 返回 patch 函数
  // createPatchFunction({ nodeOps, moduels }) 传入平台相关的两个参数
  // core 中方法与平台无关，通过函数柯里化做到平台与核心逻辑分离
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // 新 VNode 不存在
    if (isUndef(vnode)) {
      // 老 VNode 存在，执行 destory 钩子函数
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    // 待插入节点队列
    const insertedVnodeQueue = []
    
		// 老 VNode 不存在
    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      // 创建新的 VNode，当前创建的 DOM 元素只是存在于内存中
      createElm(vnode, insertedVnodeQueue)
    } else {
      // 新老节点都存在，更新
      const isRealElement = isDef(oldVnode.nodeType)
      	
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // 不是真实 DOM 元素，并且新节点和旧节点相同，更新操作 diff 算法
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
       	// ...

        // replacing existing element
        // 获取存储的 DOM 元素
        const oldElm = oldVnode.elm
        // 获取 DOM 元素的父元素
        const parentElm = nodeOps.parentNode(oldElm)

        // create new node
        // 创建 DOM 节点
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )
				
        // ...

        // destroy old node（移除老节点）
        if (isDef(parentElm)) {
          // 判断 parentElm 是否存在，将 oldVNode 从界面中移除，并且触发相关的钩子函数
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          // 如果 ParentElm 不存在，并且 oldVNode 存在 tag 属性
          invokeDestroyHook(oldVnode)
        }
      }
    }
	
    // 触发队列中节点 insert 钩子函数
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
```

#### src/core/vdom/create-component.js

```js
// src/core/vdom/create-component.js  

// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  // 创建子组件过程，父组件已经创建完毕，组件的创建过程是先父后子
  init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      // 调用子组件构造函数，子组件构造函数调用 vue._init 方法，如果是子组件，没有 el 属性，不会调用 $mount 方法
      const child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance // 激活实例，当前组件对象的父组件对象
      )
      // 组件的 $mount
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },

  prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    const options = vnode.componentOptions
    const child = vnode.componentInstance = oldVnode.componentInstance
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    )
  },

  insert (vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  },

  destroy (vnode: MountedComponentVNode) {
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy()
      } else {
        deactivateChildComponent(componentInstance, true /* direct */)
      }
    }
  }
}

const hooksToMerge = Object.keys(componentVNodeHooks)

export function createComponentInstanceForVnode (
  // we know it's MountedComponentVNode but flow doesn't
  vnode: any,
  // activeInstance in lifecycle state
  parent: any
): Component {
  // 创建 options 对象
  const options: InternalComponentOptions = {
    _isComponent: true, // 标记当前是组件
    _parentVnode: vnode, // 占位 vnode
    parent // activeInstance，当前组件的父组件对象
  }
  // check inline-template render functions
  const inlineTemplate = vnode.data.inlineTemplate
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render
    options.staticRenderFns = inlineTemplate.staticRenderFns
  }
  // 创建组件对象
  return new vnode.componentOptions.Ctor(options)
}
```

```js
// src/core/global-api/extend.js

/**
   * Class inheritance
   */
Vue.extend = function (extendOptions: Object): Function {
  // ...

  const Sub = function VueComponent (options) {
    // 调用 _init() 初始化
    this._init(options)
  }

  // ...

  return Sub
}
```

#### src/core/instance/init.js

```js
// src/core/instance/init.js

export function initMixin (Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    // 定义 vm 常量记录 vue 实例
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }	

    // a flag to avoid this being observed
    // 标识当前实例是 vue 实例，不需要被 observe
    vm._isVue = true
    
    // merge options 合并 options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化
    // 1. 初始化与生命周期相关的属性，记录组件的父子关系
    initLifecycle(vm) 
    // 2. vm 的事件监听初始化，父组件绑定在当前组件上事件
    initEvents(vm) 
    // 3. vm 编译 render 初始化
    //    $slots、$scopedSlots、_c、$createElement、$attrs、#listeners
    initRender(vm)
    
    callHook(vm, 'beforeCreate') // 调用 beforeCreate 钩子函数
    
    // 4. 依赖注入：把 inject 的成员定义到 vm 上
    initInjections(vm) // resolve injections before data/props
    // 5. 初始化 vm 的 _props/methods/_data/computed/watch
    initState(vm)
    // 6. 依赖注入：初始化 provide
    initProvide(vm) // resolve provide after data/props
    
    callHook(vm, 'created') // 调用 created 钩子函数

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
		
    // 子组件选项没有 el 属性，$mount 不会执行
    if (vm.$options.el) {
      // 页面挂载
      vm.$mount(vm.$options.el)
    }
  }
}
```

#### src/core/instance/lifecycle.js

```js
// src/core/instance/lifecycle.js

// 初始化与生命周期相关的属性
// 建立组件父子关系
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  // 找到当前实例父组件，将当前实例添加到父组件的 $children 中
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    // 把当前 VM 实例缓存起来，存储到 activeInstance 中
    // 执行附件的 update 方法，调用 patch，patch 过程中创建子组件，从而调用子组件的 update 方法
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }
}
```

