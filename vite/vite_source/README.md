# Vite 源码实现

## 架构原理

Vite 底层使用两个构建引擎，Esbuild 和 Rollup。

<img src="../images/design.png" style="zoom: 80%" />

### EsBuild

* 依赖预构建阶段，作为 bundler（打包工具） 使用

* 语法转义，将 Esbuild 作为 transformer 使用
  * TS 或者 JSX 文件转义，生产环境和开发环境都会执行
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

**5. EsBuild 转义插件**



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

