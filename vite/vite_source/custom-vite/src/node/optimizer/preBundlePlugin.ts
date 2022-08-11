import { Loader, Plugin } from "esbuild"
import { BARE_IMPORT_RE } from "../constants"

// 用来分析 es 模块 import/export 语句的库
import { init, parse } from "es-module-lexer"
import path from "path"
// 一个实现了 node 路径解析算法的库
import resolve from "resolve"
// 一个更加好用的文件操作库
import fs from "fs-extra"
// 用来开发打印 debug 日志的库
import createDebug from "debug"

import{ normalizePath } from '../utils'

const debug = createDebug("dev")

export function preBundlePlugin(deps: Set<string>): Plugin {
  return {
    name: "esbuild:pre-bundle",
    setup(build) {
      build.onResolve(
        {
          filter: BARE_IMPORT_RE,
        },
        (resolveInfo) => {
          const { path: id, importer } = resolveInfo
          const isEntry = !importer

          // 命中需要预编译的依赖
          if (deps.has(id)) {
            // 若为入口，则标记 dep 的 
            
            return isEntry
              ? {
                  path: id,
                  namespace: "dep",
                }
              : {
                  // 因为走到 onResolve 了，所以这里的 path 就是绝对路径了
                  path: resolve.sync(id, { basedir: process.cwd() }),
                }
          }
        }
      )

      // 拿到标记后的依赖，构造代理模块，交给 esbuild 打包
      build.onLoad(
        {
          filter: /.*/,
          namespace: "dep",
        },
        async (loadInfo) => {
          await init
          
          const id = loadInfo.path
          const root = process.cwd()

          const entryPath = resolve.sync(id, { basedir: root })

          const code = await fs.readFile(entryPath, "utf-8")
          const [imports, exports] = await parse(code)

          let relativePath = normalizePath(path.relative(root, entryPath))
          if (
            !relativePath.startsWith('./') &&
            !relativePath.startsWith('../') &&
            relativePath !== '.'
          ) {
            relativePath = `./${relativePath}`
          }

          let proxyModule = []

          // cjs
          if (!imports.length && !exports.length) {
            // 构造代理模块
            const res = require(entryPath)
            const specifiers = Object.keys(res)
            proxyModule.push(
              `export { ${specifiers.join(",")} } from "${relativePath}"`,
              `export default require("${relativePath}")`
            )
          } else {
            // esm 格式比较好处理，export * 或者 export default 即可
            if (exports.includes("default")) {
              proxyModule.push(`import d from "${relativePath}"export default d`)
            }
            proxyModule.push(`export * from "${relativePath}"`)
          }
          debug("代理模块内容: %o", proxyModule.join("\n"))
          const loader = path.extname(entryPath).slice(1)

          return {
            loader: loader as Loader,
            contents: proxyModule.join("\n"),
            resolveDir: root,
          }
        }
      )
    }
  }
}