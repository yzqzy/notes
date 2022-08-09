# Vite 源码实现

## 架构原理

Vite 底层使用两个构建引擎，Esbuild 和 Rollup。

<img src="../images/design.png" style="zoom: 80%" />

### EsBuild

* 依赖预构建阶段，作为 bundler（打包工具） 使用

* 语法转译，将 Esbuild 作为 transformer 使用
  * TS 或者 JSX 文件转译，生产环境和开发环境都会执行
  * 替换原来的 Babel 和 TSC 功能
* 代码压缩，作为压缩工具使用
  * 在生产环境通过插件的形式融入到 Rollup 的打包流程
  * JS 和 CSS 代码压缩

Vite 利用 EsBuild 各个垂直方向的能力（Bundler、Transformer、Minifier），给 Vite 的高性能提供了有利的保证。

Vite 3.0 支持通过配置将 EsBuild 预构建同时用于开发环境和生产环境，默认不会开启，属于实验性质的特性。

### Rollup

* 生产环境下，Vite 利用 Rollup 打包，并基于 Rollup 本身的打包能力进行扩展和优化。
  * CSS 代码分割
    * 将异步模块 CSS 代码抽离成单独文件，提高线上产物的缓存复用率
  * 自动预加载
    * 为 入口 chunk 的依赖自动生成 `<link rel="modulepreload" >`，提前下载资源，优化页面性能
    * 关于 [modulepreload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/modulepreload)
  * 异步 chunk 加载优化
    * 自动预加载公共依赖，优化 Rollup 产物依赖加载方式
* 兼容插件机制
  * 无论是开发阶段还是生产环境，Vite 都根植于 Rollup 的插件机制和生态

在 Vite 中，无论是插件机制还是打包手段，都基于 Rollup 来实现，可以说 Vite 是对于 Rollup 的一种场景化的深度拓展。

## 插件流水线

在开发阶段，Vite 实现了一个按需加载的服务器，每一个文件请求都会经历一系列的编译过程，然后再将编译结果交给 Rollup 进行模块打包。

在生产环境下，Vite 同样会执行一系列编译过程，将编译结果交给 Rollup 进行模块打包。

上述这一系列的编译过程指的就是 Vite 的插件流水线（Pipeline），插件流水线是 Vite 构建能力的核心。

接下来，我们就一起分析一下 Vite 是如何调度和组织各个插件，说说 Vite 插件容器（PluginContainer）机制的实现，同时梳理开发阶段和生产环境各自用到的插件，并分析各自的功能和实现原理。

### 插件容器

生产环境中，Vite 直接调用 Rollup 进行打包，所以 Rollup 可以调度各种插件；
开发环境中，Vite 模拟 Rollup 的插件机制，设计了 PluginContainer 对象来调度各个插件。

PluginContainer（插件容器）对象非常重要，下面我们就来看下 Vite 的插件容器机制是如何实现的。

PluginContainer 的 [实现](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/pluginContainer.ts) 借鉴于 WMR 的 `rollup-plugin-container.js`，主要分为两部分：

* 实现 Rollup 插件钩子的调度
* 实现插件钩子内部的 Context 对象

你可以通过 [container 的定义](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/pluginContainer.ts#L500) 来看看 Rollup 各个钩子的实现方式。

```typescript
const container: PluginContainer = {
  // 异步串行钩子
  options: await (async () => {
    let options = rollupOptions
    for (const plugin of plugins) {
      if (!plugin.options) continue
      options =
        (await plugin.options.call(minimalContext, options)) || options
    }
    if (options.acornInjectPlugins) {
      parser = acorn.Parser.extend(
        ...(arraify(options.acornInjectPlugins) as any)
      )
    }
    return {
      acorn,
      acornInjectPlugins: [],
      ...options
    }
  })(),

  getModuleInfo,
	
  // 异步并行钩子
  async buildStart() {
    await Promise.all(
      plugins.map((plugin) => {
        if (plugin.buildStart) {
          return plugin.buildStart.call(
            new Context(plugin) as any,
            container.options as NormalizedInputOptions
          )
        }
      })
    )
  },
	
  // 异步优先钩子
  async resolveId(rawId, importer = join(root, 'index.html'), options) {
    const skip = options?.skip
    const ssr = options?.ssr
    const scan = !!options?.scan
    const ctx = new Context()
    ctx.ssr = !!ssr
    ctx._scan = scan
    ctx._resolveSkips = skip
    const resolveStart = isDebug ? performance.now() : 0

    let id: string | null = null
    const partial: Partial<PartialResolvedId> = {}
    for (const plugin of plugins) {
      if (!plugin.resolveId) continue
      if (skip?.has(plugin)) continue

      ctx._activePlugin = plugin

      const pluginResolveStart = isDebug ? performance.now() : 0
      const result = await plugin.resolveId.call(
        ctx as any,
        rawId,
        importer,
        {
          custom: options?.custom,
          isEntry: !!options?.isEntry,
          ssr,
          scan
        }
      )
      if (!result) continue

      if (typeof result === 'string') {
        id = result
      } else {
        id = result.id
        Object.assign(partial, result)
      }

      isDebug &&
        debugPluginResolve(
        timeFrom(pluginResolveStart),
        plugin.name,
        prettifyUrl(id, root)
      )

      // resolveId() is hookFirst - first non-null result is returned.
      break
    }

    if (isDebug && rawId !== id && !rawId.startsWith(FS_PREFIX)) {
      const key = rawId + id
      // avoid spamming
      if (!seenResolves[key]) {
        seenResolves[key] = true
        debugResolve(
          `${timeFrom(resolveStart)} ${colors.cyan(rawId)} -> ${colors.dim(
            id
          )}`
        )
      }
    }

    if (id) {
      partial.id = isExternalUrl(id) ? id : normalizePath(id)
      return partial as PartialResolvedId
    } else {
      return null
    }
  },

  // 异步优先钩子
  async load(id, options) {
    const ssr = options?.ssr
    const ctx = new Context()
    ctx.ssr = !!ssr
    for (const plugin of plugins) {
      if (!plugin.load) continue
      ctx._activePlugin = plugin
      const result = await plugin.load.call(ctx as any, id, { ssr })
      if (result != null) {
        if (isObject(result)) {
          updateModuleInfo(id, result)
        }
        return result
      }
    }
    return null
  },
	
  // 异步串行钩子
  async transform(code, id, options) {
    const inMap = options?.inMap
    const ssr = options?.ssr
    const ctx = new TransformContext(id, code, inMap as SourceMap)
    ctx.ssr = !!ssr
    for (const plugin of plugins) {
      if (!plugin.transform) continue
      ctx._activePlugin = plugin
      ctx._activeId = id
      ctx._activeCode = code
      const start = isDebug ? performance.now() : 0
      let result: TransformResult | string | undefined
      try {
        result = await plugin.transform.call(ctx as any, code, id, { ssr })
      } catch (e) {
        ctx.error(e)
      }
      if (!result) continue
      isDebug &&
        debugPluginTransform(
        timeFrom(start),
        plugin.name,
        prettifyUrl(id, root)
      )
      if (isObject(result)) {
        if (result.code !== undefined) {
          code = result.code
          if (result.map) {
            if (isDebugSourcemapCombineFocused) {
              // @ts-expect-error inject plugin name for debug purpose
              result.map.name = plugin.name
            }
            ctx.sourcemapChain.push(result.map)
          }
        }
        updateModuleInfo(id, result)
      } else {
        code = result
      }
    }
    return {
      code,
      map: ctx._getCombinedSourcemap()
    }
  },

  async close() {
    if (closed) return
    const ctx = new Context()
    await Promise.all(
      plugins.map((p) => p.buildEnd && p.buildEnd.call(ctx as any))
    )
    await Promise.all(
      plugins.map((p) => p.closeBundle && p.closeBundle.call(ctx as any))
    )
    closed = true
  }
}

return container
}
```

在前面的 [Rollup 插件机制](https://www.yueluo.club/detail?articleId=626b187965e52c4388404749) 文中，我们已经分析过 Rollup 中异步、串行、并行等钩子类型的执行原理。现在阅读上述代码并不困难。

需要注意的是，在各种钩子被调用的时候，Vite 都会强制将钩子函数的 this 绑定一个上下文对象，例如：

```typescript
async load(id, options) {
  const ssr = options?.ssr
  const ctx = new Context()
  ctx.ssr = !!ssr
  for (const plugin of plugins) {
    if (!plugin.load) continue
    ctx._activePlugin = plugin
    const result = await plugin.load.call(ctx as any, id, { ssr })
    if (result != null) {
      if (isObject(result)) {
        updateModuleInfo(id, result)
      }
      return result
    }
  }
  return null
}
```

那么这个对象是用来干什么的？

在 Rollup 钩子函数中，我们可以调用 `this.emitFile`、`this.resolve` 等诸多上下文方法。

> [https://rollupjs.org/guide/en/#plugin-context](https://rollupjs.org/guide/en/#plugin-context)

因此，Vite 除了要模拟各个插件的运行流程，还需要模拟插件执行的上下文对象，代码中的 [Context](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/pluginContainer.ts#L237) 对象就是用来完成这些事情。

```typescript
import { RollupPluginContext } from 'rollup';

type PluginContext = Omit<
  RollupPluginContext,
  // not documented
  | 'cache'
  // deprecated
  | 'emitAsset'
  | 'emitChunk'
  | 'getAssetFileName'
  | 'getChunkFileName'
  | 'isExternal'
  | 'moduleIds'
  | 'resolveId'
  | 'load'
>

const watchFiles = new Set<string>()

class Context implements PluginContext {
  // 实现各种上下文方法
  // 解析模块 AST(调用 acorn)
  parse(code: string, opts: any = {}) {
    return parser.parse(code, {
      sourceType: 'module',
      ecmaVersion: 'latest',
      locations: true,
      ...opts
    })
  }
  // 解析模块路径
  async resolve(
  id: string,
   importer?: string,
   options?: { skipSelf?: boolean }
  ) {
    let skip: Set<Plugin> | undefined
    if (options?.skipSelf && this._activePlugin) {
      skip = new Set(this._resolveSkips)
      skip.add(this._activePlugin)
    }
    let out = await container.resolveId(id, importer, { skip, ssr: this.ssr })
    if (typeof out === 'string') out = { id: out }
    return out as ResolvedId | null
  }

  // 以下两个方法均从 Vite 的模块依赖图中获取相关的信息
  getModuleInfo(id: string) {
    return getModuleInfo(id)
  }

  getModuleIds() {
    return moduleGraph
      ? moduleGraph.idToModuleMap.keys()
    : Array.prototype[Symbol.iterator]()
  }

  // 记录开发阶段 watch 的文件
  addWatchFile(id: string) {
    watchFiles.add(id)
    ;(this._addedImports || (this._addedImports = new Set())).add(id)
    if (watcher) ensureWatchedFile(watcher, id, root)
  }

  getWatchFiles() {
    return [...watchFiles]
  }

  warn() {
    // 打印 warning 信息
  }

  error() {
    // 打印 error 信息
  }

  // ...
}
```

很显然，Vite 将 Rollup 的 `PluginCxontext` 对象重新实现了一遍，因为只是开发阶段用到，所以去除了一些打包相关的方法实现。同时，上下文对象与 Vite 开发阶段的 ModuleGraph 相结合，实现开发时的 HMR。

另外，transform 钩子也会一个插件的上下文对象，不过这个对象和其他钩子不同，实现代码如下：

```typescript
class TransformContext extends Context {
  constructor(filename: string, code: string, inMap?: SourceMap | string) {
    super()
    this.filename = filename
    this.originalCode = code
    if (inMap) {
      this.sourcemapChain.push(inMap)
    }
  }

  _getCombinedSourcemap(createIfNull = false) {
    return this.combinedMap
  }

  getCombinedSourcemap() {
    return this._getCombinedSourcemap(true) as SourceMap
  }
}
```

可以看到，TransformContext 继承自之前所说的 Context 对象，也就是说 transform 钩子的上下文对象相比其他钩子只是做了一些扩展，增加了 sourcemap 合并的功能，并将不同插件的 transform 钩子执行后返回的 sourcemap 进行合并，以保证 soucemap 的准确性和完整性。

### 插件工作流概览

下面是 [resolvePlugins 函数](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/index.ts#L28) 的实现，Vite 所有插件就是在这里被收集起来的。具体实现如下：

```typescript
export async function resolvePlugins(
  config: ResolvedConfig,
  prePlugins: Plugin[],
  normalPlugins: Plugin[],
  postPlugins: Plugin[]
): Promise<Plugin[]> {
  const isBuild = config.command === 'build'
  // 收集生产环境构建的插件
  const buildPlugins = isBuild
    ? (await import('../build')).resolveBuildPlugins(config)
    : { pre: [], post: [] }

  return [
    // 1. 别名插件
    isBuild ? null : preAliasPlugin(),
    aliasPlugin({ entries: config.resolve.alias }),
    // 2. 用户自定义 pre 插件(带有`enforce: "pre"`属性)
    ...prePlugins,
    // 3. Vite 核心构建插件
    // ...
    // 4. 用户插件（不带有 `enforce` 属性）
    ...normalPlugins,
    // 5. Vite 生产环境插件 & 用户插件(带有 `enforce: "post"`属性)
    definePlugin(config),
    cssPostPlugin(config),
    ...buildPlugins.pre,
    ...postPlugins,
    ...buildPlugins.post,
    // 6. 一些开发阶段特有的插件
    ...(isBuild
      ? []
      : [clientInjectionsPlugin(config), importAnalysisPlugin(config)])
  ].filter(Boolean) as Plugin[]
}
```

从上述代码中我们可以总结出 Vite 插件的具体执行顺序：

* 别名插件。`vite:pre-alias` 和 `@rollup/plugin-alias`，用于路径别名替换。
* 用户自定义 pre 插件，也就是带有 `enfore: "pre"` 属性的自定义插件。
* Vite 核心构建插件。
* 用户自定义的普通插件，即不带有 `enfore` 属性的插件。
* Vite 生产环境插件和用户插件中带有 `enfore: "post"` 属性的插件。
* 一些开发阶段特有的插件，包括环境变量注入插件 `clientInjectionPlugin` 和 import 语句分析及重写插件 `importAnalysisPlugin`。

### 插件功能梳理

除了用户自定义插件之外，我们需要梳理的 Vite 内置插件有以下这几类：

* 别名插件
* 核心构建插件
* 生产环境特有插件
* 开发环境特有插件

#### 别名插件

别名插件有两个，分别是 [vite:pre-alias](https://github.com/vitejs/vite/blob/72cb33e947e7aa72d27ed0c5eacb2457d523dfbf/packages/vite/src/node/plugins/preAlias.ts) 和 [@rollup/plugin-alias](https://github.com/vitejs/vite/blob/72cb33e947e7aa72d27ed0c5eacb2457d523dfbf/packages/vite/src/node/plugins/index.ts#L3)。

前者主要是为了将 bare import 路径重定向到预构建依赖的路径。

```typescript
// 假设 React 已经过 Vite 预构建
import React from 'react';
// 会被重定向到预构建产物的路径
import React from '/node_modules/.vite/react.js'
```

后者则实现了比较通用的路径别名（即 `resolve.alias` 配置）的功能，使用的是 [Rollup 的官方 Alias 插件](https://github.com/rollup/plugins/tree/master/packages/alias#rollupplugin-alias) 。

#### 核心编译插件

**1. module preload 特性的 Polyfill**

当你在 Vite 配置文件中开启下面这个配置时：

```typescript
{
  build: {
    polyfillModulePreload: true
  }
}
```

Vite 会自动应用 [moudlePreloadPolyfillPlugin](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/modulePreloadPolyfill.ts#L7) 插件，在产物中注入 module preload 的 Polyfill 代码。实现原理如下：

* 扫描出当前所有的 modulepreload 标签，拿到 link 标签对应的地址，通过执行 fetch 实现预加载；
* 通过 MutationObserver 监听 DOM 变化，一旦发现包含 modulepreload 属性的 link 标签，同样通过 fetch 请求实现预加载。

> 由于部分支持原生 ESM 的浏览器并不支持 module preload，因此某些情况下需要注入相应的 polyfill 进行降级。

**2. 路径解析插件**

路径解析插件（即 [vite:resolve](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/resolve.ts)）是 Vite 中比较核心的插件，几乎所有重要的 Vite 特性都离不开这个插件的实现，例如依赖预构建、HMR、SSR 等。同时它也是实现相当复杂的插件，一方面实现了 [Node.js 官方的 resolve 算法](https://nodejs.org/api/modules.html#modules_all_together)，另一方面需要支持前面所说的各项特性，可以说是专门给 Vite 实现了一套路径解析算法。

**3. 内联脚本加载插件**

对于 HTML 中的内联脚本，Vite 会通过 [vite:html-inline-script-proxy](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/html.ts#L38) 插件来进行加载。比如下面这个 script 标签：

```html
<script type="module">
import React from 'react';
console.log(React)
</script>
```

这些内容会在后续的 `build-html` 插件从 HTML 代码中剔除，并且变成下面的这一行代码插入到项目入口模块的代码中：

```js
import '../vite-app/index.html?http-proxy&index=0.js'
```

`vite:html-inline-script-proxy` 就是用来加载这样的模块，实现如下：

```typescript
export function htmlInlineScriptProxyPlugin(): Plugin {
  return {
    name: 'vite:html',

    resolveId(id) {
      if (htmlProxyRE.test(id)) {
        return id
      }
    },

    load(id) {
      const proxyMatch = id.match(htmlProxyRE)
      if (proxyMatch) {
        const index = Number(proxyMatch[1])
        const file = cleanUrl(id)
        const html = fs.readFileSync(file, 'utf-8').replace(htmlCommentRE, '')
        let match: RegExpExecArray | null | undefined
        scriptModuleRE.lastIndex = 0
        for (let i = 0; i <= index; i++) {
          match = scriptModuleRE.exec(html)
        }
        if (match) {
          return match[2]
        } else {
          throw new Error(`No matching html proxy module found from ${id}`)
        }
      }
    }
  }
}
```

**4. CSS 编译插件**

[vite:css](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L137) 插件，主要实现下面这些功能：

* CSS 预处理器的编译
* CSS Modules
* Postcss 编译
* 通过 @import 记录依赖，便于 HMR

这个插件的核心在于 [compileCSS](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L568)  函数的实现。

**5. EsBuild 转译插件**

[vite:esbuild](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/esbuild.ts) 插件，用来编译 .js、.ts、.jsx 和 tsx，代替了传统的 Babel 或者 TSC 的功能，这也是 Vite 开发阶段性能强悍的一个原因。

插件中主要的逻辑是 `transformWithEsBuild` 函数，可以通过这个函数实现代码转译。Vite 本身也导出了这个函数，作为一种通用的 transform 能力。

使用方法如下：

```typescript
import { transformWithEsbuild } from 'vite';

// 传入两个参数: code, filename
transformWithEsbuild('<h1>hello</h1>', './index.tsx').then(res => {
  // {
  //   warnings: [],
  //   code: '/* @__PURE__ */ React.createElement("h1", null, "hello");\n',
  //   map: {/* sourcemap 信息 */}
  // }
  console.log(res);
})
```

**6. 静态资源加载插件**

静态资源加载插件包括：

* [vite:json](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/json.ts#L30)：用来加载 JSON 文件，通过 `@rollup/pluginutils` 的 `dataToEsm` 方法可以实现 JSON 的具名导入
* [vite:wasm](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/wasm.ts#L45)：用来加载 `.wasm` 格式的文件
* [vite:worker](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/worker.ts)：用来加载 Web Worker 脚本，插件内部会使用 Rollup 对 Worker 脚本进行打包
* [vite:asset](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/asset.ts#L37)：开发阶段实现了其他格式静态资源的加载，生产环境会通过 `renderChunk` 钩子将静态资源地址重写为产物的文件地址。
  * 如`./img.png` 重写为 `https://cdn.xxx.com/assets/img.91ee297e.png` 

Rollup 本身存在 [asset cascade](https://bundlers.tooling.report/hashing/asset-cascade/) 问题，即静态资源哈希更新，引用它的 JS 的哈希并没有更新（[issue](https://github.com/rollup/rollup/issues/3415)）。因此 Vite 在静态资源处理的时候，并没有交给 Rollup 生成哈希，而是根据资源内容生成哈希（[源码实现](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/asset.ts#L306)），并手动进行路径重写，以避免 `asset-cascade` 问题。

#### 生产环境特有插件

**1. 全局变量替换插件**

提供全局变量替换的功能，如下面的这个配置：

```typescript
// vite.config.ts
const version = '2.0.0';

export default {
  define: {
    __APP_VERSION__: `JSON.stringify(${version})`
  }
}
```

全局变量替换的功能与 [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace) 差不多，当然在实现上 Vite 有所区别：

* 开发环境下，Vite 会将所有的全局变量挂载到 window 对象，不用经过 define 插件的处理，节省编译开销；
* 生产环境下，Vite 会使用 [define 插件](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/define.ts)，进行字符串替换以及 sourcemap 生成。

> SSR 构建开发环境时也会使用这个插件，仅用来替换字符串。

**2. CSS 后处理插件**

CSS 后处理插件即 [vite:css-post](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L137) 插件，功能如下：

* 开发阶段 CSS 响应结果处理
* 生产环境 CSS 文件生成

首先，在开发阶段，这个插件会将之前的 CSS 编译插件处理后的结果，包装成一个 ESM 模块，返回给浏览器（[代码链接](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L284)）。

其次，生产环境中，Vite 默认会通过这个插件进行 CSS 的 code splitting，即对每个异步 chunk，Vite 会将其依赖的 CSS 代码单独打包成一个文件（[代码链接](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L400)）。

```typescript
const fileHandle = this.emitFile({
  name: chunk.name + '.css',
  type: 'asset',
  source: chunkCSS
});
```

如果 CSS 的 code splitting 功能被关闭（通过 `build.cssCodeSplit` 配置）那么 vite 会将所有的 CSS 代码打包到同一个 CSS 文件中（[代码链接](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L433)）。

最后，插件会调用 EsBuild 对 CSS 进行压缩，实现在 `minifyCSS` 函数（[代码链接](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L905)）。

**3. HTML 构建插件**

HTML 构建插件会调用 `build-html` 插件。之前我们在内联脚本加载插件中提到过，项目根目录下的 html 会转换为一段 JavaScript 代码。

```html
!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  // 普通方式引入
  <script src="./index.ts"></script>
  // 内联脚本
  <script type="module">
    import React from 'react';
    console.log(React)
  </script>
</body>
</html>
```

首先，当 Vite 在生产环境 transform 这段入口 HTML 时，会做 3 件事情：

* 对 HTML 执行各个插件中带有 `enforce: "pre"` 属性的 `transformIndexHtml` 钩子；
* 将其中的 script 标签内容删除，并将其转换为 `import` 语句，例如 `import './index.ts'`，并记录下来；
* 在 transform 钩子中返回记录下来的 import 内容，将 import 语句作为模块内容进行加载也就是说，虽然 Vite 处理的是一个 HTML 文件，但最后进行打包的内容将是一段 JS 内容（[代码链接](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/html.ts#L233)）。

```typescript
export function buildHtmlPlugin() {
  name: 'vite:build',
  transform(html, id) {
    if (id.endsWith('.html')) {
      let js = '';
      // 省略 HTML AST 遍历过程(通过 @vue/compiler-dom 实现)
      // 收集 script 标签，转换成 import 语句，拼接到 js 字符串中
      return js;
    }
  }
}
```

其次，在生成产物的最后一步即 `generateBundle` 钩子中，根据入口 Chunk 的内容，分情况进行处理。

如果只有 import 语句，先通过 Rollup 提供的 chunk 和 bundle 对象获取入口 chunk 所有的依赖 chunk，并将这些 chunk 进行后序排列。如 a 依赖 b，b 依赖 c，最后的依赖数组就是 `[c, b, a]` 。然后依次将 c, b, a 生成三个 script 标签，插入到 HTML 中。最后，Vite 会将入口 chunk 的内容从 bundle 产物中移除，因此它的内容只要 import 语句，而它 import 的 chunk 已经作为 script 标签插入到 HTML 中，入口 chunk 也就没有存在的意义了。

如果除了 import 语句，还有其他内容，Vite 就会将入口 Chunk 单独生成一个 script 标签，分析出依赖的后续排列，然后通过注入 `<link rel="modulepreload">` 标签对入口文件的依赖 chunk 进行预加载。

最后，插件会调用用户插件中带有 `enforce: "post"`  属性的 transformIndexHtml 钩子，对 HTML 进行进一步的处理。

**4. commonjs 转换插件** 

开发环境中，Vite 会使用 EsBuild 将 commonjs 转换为 ESM。生产环境中，Vite 会直接使用 Rollup 的官方插件 [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs)。

**5. data-uri 插件**

[data-uri](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/dataUri.ts#L14) 插件用来支持 import 模块中含有 Base64 编码的情况，如：

```typescript
import batman from 'data:application/json;base64, eyAiYmF0bWFuIjogInRydWUiIH0='
```

**6. dynamic-import-vars 插件 **

用于支持在动态 import 中使用变量的功能，如下示例代码：

```typescript
function importLocale(locale) {
  return import(`./locales/${locale}.js`);
}
```

内部使用的是 Rollup 的官方插件 [@rollup/plugin-dynamic-import-vars](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Frollup%2Fplugins%2Ftree%2Fmaster%2Fpackages%2Fdynamic-import-vars)。

**7. import-meta-url 支持插件**

用来转换如下格式的资源 URL：

```typescript
new URL('./foo.png', import.meta.url)
```

将其转换为生产环境的 URL 格式：

```typescript
// 使用 self.location 来保证低版本浏览器和 Web Worker 环境的兼容性
new URL('./assets.a4b3d56d.png, self.location)
```

同时，对于动态 import 的情况也能进行支持：

```typescript
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```

Vite 识别到 `./dir/${name}.png` 这样的模板字符串，会将整行代码转换成下面这样：

```js
function getImageUrl(name) {
    return import.meta.globEager('./dir/**.png')[`./dir/${name}.png`].default;
}
```

[插件代码链接](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/assetImportMetaUrl.ts#L18)

**8. import 分析插件**

[vite:build-import-analysis](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L87) 插件会在生产环境打包时用作 import 语句分析和重写，主要目的是对动态 import 的模块进行预加载处理。

对含有动态 import 的 chunk 而言，会在插件的 transform 钩子中添加一段工具代码用来进行模块预加载，逻辑并不复杂（[代码链接](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L43)）。

关键代码简化后如下:

```typescript
function preload(importModule, deps) {
  return Promise.all(
    deps.map(dep => {
      // 如果异步模块的依赖还没有加载
      if (!alreadyLoaded(dep)) { 
        // 创建 link 标签加载，包括 JS 或者 CSS
        document.head.appendChild(createLink(dep))  
        // 如果是 CSS，进行特殊处理，后文会介绍
        if (isCss(dep)) {
          return new Promise((resolve, reject) => {
            link.addEventListener('load', resolve)
            link.addEventListener('error', reject)
          })
        }
      }
    })
  ).then(() => importModule())
}
```

我们知道，Vite 内置了 CSS 代码分割的能力，当一个模块通过动态 import 引入的时候，这个模块就会被单独打包成一个 chunk，与此同时这个模块中的样式代码也会打包成单独的 CSS 文件。如果异步模块的 CSS 和 JS 同时预加载，那么在某些浏览器下（如 IE）就会出现 [FOUC 问题](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) ，页面样式会闪烁，影响用户体验。 Vite 通过监听 link 标签 load 事件的方式来保证 CSS 在 JS 之前加载完成，从而解决 FOUC 问题。

```typescript
if (isCss) {
  return new Promise((res, rej) => {
    link.addEventListener('load', res)
    link.addEventListener('error', rej)
  })
}
```

现在，我们已经知道预加载的实现方法，那么 Vite 是如何将动态 import 编译成预加载的代码的呢？

从源码的 [transform 钩子实现](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L111) 中，可以看到 Vite 会将动态 import 的代码进行转换，如下代码所示：

```typescript
/ 转换前
import('a')
// 转换后
__vitePreload(() => 'a', __VITE_IS_MODERN__ ? "__VITE_PRELOAD__" : void)
```

其中，`__vitePreload` 会被加载为前文的 preload 工具函数，`__VITE_IS_MODERN__` 会在 [renderChunk](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L208) 中被替换为 true 或者 false，表示是否为 Modern 模式打包。对于 `"__VITE_PRELOAD__"` ，Vite 会在 [generateBundle](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L234) 阶段，分析出 a 模块所有依赖文件（包括 CSS），将依赖文件名的数组作为 preload 工具函数的第二个参数。

同时，对于 Vite 独有的 `import.meta.glob` 语法，也会在这个插件中进行编译：

```typescript
const modules = import.meta.glob('./dir/*.js')
```

会通过插件转换成下面这段代码:

```typescript
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}
```

具体的实现在 [transformImportGlob](https://github.com/vitejs/vite/blob/075128a8dd0a2680540179dad2277a797f793199/packages/vite/src/node/importGlob.ts#L11) 函数中，除了被该插件使用外，这个函数还依赖预构建、开发环境 import 分析等核心流程使用。

**9. JS 压缩插件 **

Vite 中提供了两种 JS 代码压缩的工具，即 EsBuild 和 Terser，分别由两个插件实现：

* [vite:esbuild-transpile](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/esbuild.ts#L217)。在 renderChunk 阶段，调用 EsBuild 的 transform API，并指定 minify 参数，从而实现 JS 的压缩。
* [vite:terser](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/terser.ts#L6)。同样在 renderChunk 阶段，Vite 会在单独的 Worker 进程中调用 Terser 进行 JS 代码压缩。

**10. 构建报告插件**

主要由三个插件输出构建报告：

* [vite:manifest](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/manifest.ts) 。提供打包后的各种资源文件及其关联信息，如下内容所示：

```typescript
// manifest.json
{
  "index.html": {
    "file": "assets/index.8edffa56.js",
    "src": "index.html",
    "isEntry": true,
    "imports": [
      // JS 引用
      "_vendor.71e8fac3.js"
    ],
    "css": [
      // 样式文件应用
      "assets/index.458f9883.css"
    ],
    "assets": [
      // 静态资源引用
      "assets/img.9f0de7da.png"
    ]
  },
  "_vendor.71e8fac3.js": {
    "file": "assets/vendor.71e8fac3.js"
  }
}
```

* [vite:ssr-manifest](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/ssr/ssrManifestPlugin.ts) 。提供每个模块与 chunk 之间的映射关系，方便 SSR 时通过渲染的组件来确定哪些 chunk 会被调用，从而按需进行预加载。

```typescript
// ssr-manifest.json
{
  "node_modules/object-assign/index.js": [
    "/assets/vendor.71e8fac3.js"
  ],
  "node_modules/object-assign/index.js?commonjs-proxy": [
    "/assets/vendor.71e8fac3.js"
  ],
  // 省略其它模块信息
}
```

* [vite:reporter](https://github.com/vitejs/vite/blob/v2.7.0/packages/vite/src/node/plugins/reporter.ts) 。主要提供打包时的命令行构建日志。

#### 开发环境特有插件



## 源码实现

<img src="./images/vite_source.jpg" />

### 开发环境搭建

安装依赖

```bash
pnpm init -y
```

```bash
pnpm i cac chokidar connect debug es-module-lexer esbuild fs-extra magic-string picocolors resolve rollup sirv ws --save
```

```bash
pnpm i @types/connect @types/debug @types/fs-extra @types/resolve @types/ws tsup --save-dev
```

这里我们使用 [tsup](https://github.com/egoist/tsup) 进行项目的构建（Vite 本身使用 Rollup 进行打包）， tsup 能够实现库打包的功能，并且内置 esbuild 进行提速，性能上更加强悍。

配置 scripts 脚本

```json
// package.json

"scripts": {
  "start": "tsup --watch",
  "build": "tsup --minify"
}
```

新建 `tsconfig.json` 和 `tsup.config.ts` 配置文件

```json
// tsconfig.json

{
  "compilerOptions": {
    // 支持 commonjs 模块的 default import，如 import path from 'path'
    // 否则只能通过 import * as path from 'path' 进行导入
    "esModuleInterop": true,
    "target": "ES2020",
    "moduleResolution": "node",
    "module": "ES2020",
    "strict": true
  }
}
```

```json
// tsup.config.ts

import { defineConfig } from "tsup";

export default defineConfig({
  // 后续会增加 entry
  entry: {
    index: "src/node/cli.ts",
  },
  // 产物格式，包含 esm 和 cjs 格式
  format: ["esm", "cjs"],
  // 目标语法
  target: "es2020",
  // 生成 sourcemap
  sourcemap: true,
  // 没有拆包的需求，关闭拆包能力
  splitting: false,
})
```

新建 `src/node/cli.ts`文件，进行 cli 的初始化：

```typescript
// src/node/cli.ts

import cac from "cac"

const cli = cac()

// [] 中的内容为可选参数，也就是说仅输入 `vite` 命令下会执行下面的逻辑
cli
  .command("[root]", "Run the development server")
  .alias("serve")
  .alias("dev")
  .action(async () => {
    console.log('测试 cli~')
  })

cli.help()

cli.parse()
```

现在你可以执行  `pnpm start` 来编译这个 `custom-vite` 项目，tsup 会生成产物目录 `dist`，然后你可以新建 `bin/vite` 文件来引用产物:

```
#!/usr/bin/env node

require("../dist/index.js")
```

同时，你需要在 package.json 中注册 `vite`命令，配置如下:

```json
"bin": {
  "vite": "bin/vite"
}
```

现在，我们就可以在业务项目中使用 `vite` 这个命令了。这里有一个示例的 `playground` 项目，你可以拿来进行测试，[点击查看项目](https://github.com/yw0525/notes/tree/master/vite/vite_source/playground)。

playground 项目 package.json 如下：

```json
{
  "name": "playground",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "17",
    "react-dom": "17"
  },
  "devDependencies": {
    "@types/react": "17",
    "@types/react-dom": "17",
    "@vitejs/plugin-react": "^1.3.0",
    "vite": "../custom-vite",
    "typescript": "^4.6.3"
  }
}
```

将 `playground` 项目放在 `vite` 同级目录中，然后执行 `pnpm i`，`vite ` 命令会自动安装到测试项目的 `node_modules/.bin`目录中。

<div><img src="./images/command.png" /></div>

接着我们在 `playground` 项目中执行 `pnpm dev` 命令(内部执行 `vite`)，可以看到如下的 log 信息:

```
测试 cli~
```

接着，我们把 `console.log` 语句换成服务启动的逻辑:

```diff
import cac from "cac"
+ import { startDevServer } from "./server"

const cli = cac()

cli
  .command("[root]", "Run the development server")
  .alias("serve")
  .alias("dev")
  .action(async () => {
-    console.log('测试 cli~')
+   await startDevServer()
  })

cli.help()

cli.parse()
```

j接着新建 `src/node/server/index.ts`，内容如下:

```typescript
// connect 是一个具有中间件机制的轻量级 Node.js 框架。
// 既可以单独作为服务器，也可以接入到任何具有中间件机制的框架中，如 Koa、Express
import connect from "connect"
// picocolors 是一个用来在命令行显示不同颜色文本的工具
import { blue, green } from "picocolors"

export async function startDevServer() {
  const app = connect()
  const root = process.cwd()
  const startTime = Date.now()
  
  app.listen(3000, async () => {
    console.log(
      green("🚀 No-Bundle 服务已经成功启动!"),
      `耗时: ${Date.now() - startTime}ms`
    )
    console.log(`> 本地访问路径: ${blue("http://localhost:3000")}`)
  })
}
```

再次执行 `pnpm dev`，你可以发现终端出现如下的启动日志:

<div><img src="./images/server.png" /></div>

### 依赖预构建

