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
    // 克隆数组
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

  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
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



## 动态添加响应式属性

