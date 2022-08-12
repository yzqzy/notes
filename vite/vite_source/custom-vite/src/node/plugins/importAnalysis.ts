import { pathExists } from "fs-extra"
import resolve from "resolve"
import path from "path"
// magic-string 用来作字符串编辑
import MagicString from "magic-string" 
import { init, parse } from "es-module-lexer"

import {
  BARE_IMPORT_RE,
  DEFAULT_EXTERSIONS,
  PRE_BUNDLE_DIR,
} from "../constants"
import {
  cleanUrl,
  isJSRequest,
  normalizePath
} from "../utils"

import { Plugin } from "../plugin"
import { ServerContext } from "../server/index"

export function importAnalysisPlugin(): Plugin {
  let serverContext: ServerContext
  return {
    name: "vite:import-analysis",
    configureServer(s) {
      // 保存服务端上下文
      serverContext = s
    },
    async transform(code: string, id: string) {
      // 只处理 JS 相关的请求
      if (!isJSRequest(id)) {
        return null
      }
      await init
      // 解析 import 语句
      const [imports] = parse(code)
      const ms = new MagicString(code)
      // 对每一个 import 语句依次进行分析
      for (const importInfo of imports) {
        // 举例说明: const str = `import React from 'react'`
        // str.slice(s, e) => 'react'
        const { s: modStart, e: modEnd, n: modSource } = importInfo
        
        if (!modSource) continue
        // 第三方库: 路径重写到预构建产物的路径
        if (BARE_IMPORT_RE.test(modSource)) {
          // const bundlePath = path.join(
          //   serverContext.root,
          //   PRE_BUNDLE_DIR,
          //   `${modSource}.js`
          // )
          const bundlePath = normalizePath(
            path.join('/', PRE_BUNDLE_DIR, `${modSource}.js`)
          )
          ms.overwrite(modStart, modEnd, bundlePath)
        } else if (modSource.startsWith(".") || modSource.startsWith("/")) {
          // 直接调用插件上下文的 resolve 方法，会自动经过路径解析插件的处理
          const resolved = await this.resolve(modSource, id)
          if (resolved) {
            ms.overwrite(modStart, modEnd, resolved.id)
          }
        }
      }

      return {
        code: ms.toString(),
        // 生成 SourceMap
        map: ms.generateMap(),
      }
    }
  }
}
