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

## Vue 初始化 - 静态成员

### src/core/global-api/index.js

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

###  src/core/global-api/use.js

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

### src/core/global-api/mixin.js

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

### src/core/global-api/extend.js

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

### src/core/global-api/assets.js

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

## Vue 初始化 - 实例成员

### src/core/instance/index.js

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

### src/core/instance/init.js

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

###  src/core/instance/state.js

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

### src/core/instance/events.js

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

### src/core/instance/lifecycle.js

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

### src/core/instance/render.js

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

### 总结

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

## Vue 初始化 - initMixin - init

### src/core/instance/init.js

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
    
    // 4. 
    initInjections(vm) // resolve injections before data/props
    // 5.
    initState(vm)
    // 6. 
    initProvide(vm) // resolve provide after data/props
    
    callHook(vm, 'created') // 调用 created 钩子函数

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
```

### src/core/instance/lifecycle.js

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

### src/core/instance/events.js

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

### src/core/instance/render.js

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

