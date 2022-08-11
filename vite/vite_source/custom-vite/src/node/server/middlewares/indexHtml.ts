import { NextHandleFunction } from "connect"
import path from "path"
import { pathExists, readFile } from "fs-extra"
import { ServerContext } from "../index"

export function indexHtmlMiddware(
  serverContext: ServerContext
): NextHandleFunction {
  return async (req, res, next) => {
    if (req.url === "/") {
      const { root } = serverContext

      // 默认使用项目根目录下的 index.html
      const indexHtmlPath = path.join(root, "index.html")

      if (await pathExists(indexHtmlPath)) {
        const rawHtml = await readFile(indexHtmlPath, "utf8")

        let html = rawHtml

        // 通过执行插件的 transformIndexHtml 方法来对 HTML 进行自定义的修改
        for (const plugin of serverContext.plugins) {
          if (plugin.transformIndexHtml) {
            html = await plugin.transformIndexHtml(html)
          }
        }

        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        return res.end(html)
      }
    }
    
    return next()
  }
}
