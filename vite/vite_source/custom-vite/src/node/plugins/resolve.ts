import resolve from "resolve"
import path from "path"
import { pathExists } from "fs-extra"

import { Plugin } from "../plugin"
import { ServerContext } from "../server/index"
import { DEFAULT_EXTERSIONS } from "../constants"
import { cleanUrl } from "../utils"

export function resolvePlugin(): Plugin {
  let serverContext: ServerContext
  return {
    name: "vite:resolve",
    configureServer(s) {
      // 保存服务端上下文
      serverContext = s
    },
    async resolveId(id: string, importer?: string) {
      // 1. 绝对路径
      if (path.isAbsolute(id)) {
        if (await pathExists(id)) {
          return { id }
        }
        // 加上 root 路径前缀，处理 /src/main.tsx 的情况
        id = path.join(serverContext.root, id)
        if (await pathExists(id)) {
          return { id }
        }
      }
      // 2. 相对路径
      else if (id.startsWith(".")) {
        if (!importer) {
          throw new Error("`importer` should not be undefined")
        }
        const hasExtension = path.extname(id).length > 1
        let resolvedId: string
        // 2.1 包含文件名后缀
        // 如 ./App.tsx
        if (hasExtension) {
          resolvedId = resolve.sync(id, { basedir: path.dirname(importer) })
          if (await pathExists(resolvedId)) {
            // return { id: resolvedId }
            return { id }
          }
        } 
        // 2.2 不包含文件名后缀
        // 如 ./App
        else {
          // ./App -> ./App.tsx
          for (const extname of DEFAULT_EXTERSIONS) {
            try {
              const withExtension = `${id}${extname}`
              resolvedId = resolve.sync(withExtension, {
                basedir: path.dirname(importer),
              })
              if (await pathExists(resolvedId)) {
                // return { id: resolvedId }
                return { id: withExtension }
              }
            } catch (e) {
              continue
            }
          }
        }
      }
      return null
    }
  }
}
