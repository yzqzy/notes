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



vue 3 中也会优先渲染 render 函数，不过其过程是在挂载函数时进行判断的，具体代码在 `runtime-core/src/component.ts` 文件中。

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

