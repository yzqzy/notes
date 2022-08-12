import { NextHandleFunction } from "connect"
import {
  isJSRequest,
  isCSSRequest,
  isImportRequest,
  cleanUrl,
} from "../../utils"
import { ServerContext } from "../index"
import createDebug from "debug"

const debug = createDebug("dev")

export async function transformRequest(
  url: string,
  serverContext: ServerContext
) {
  const { pluginContainer } = serverContext

  url = cleanUrl(url)
  
  // 简单来说，就是依次调用插件容器的 resolveId、load、transform 方法
  const resolvedResult = await pluginContainer.resolveId(url)

  let transformResult

  if (resolvedResult?.id) {
    let code = await pluginContainer.load(resolvedResult.id)
    if (typeof code === "object" && code !== null) {
      code = code.code
    }
    if (code) {
      transformResult = await pluginContainer.transform(
        code as string,
        resolvedResult?.id
      )
    }
  }
  return transformResult
}

export function transformMiddleware(
  serverContext: ServerContext
): NextHandleFunction {
  return async (req, res, next) => {
    if (req.method !== "GET" || !req.url) {
      return next()
    }

    const url = req.url

    debug("transformMiddleware: %s", url)

    // transform JS request
    if (isJSRequest(url) || isCSSRequest(url) || isImportRequest(url)) {
      // 核心编译函数
      let result = await transformRequest(url, serverContext)

      if (!result) {
        return next()
      }
      if (result && typeof result !== "string") {
        result = result.code
      }

      // 编译完成，返回响应给浏览器
      res.statusCode = 200
      res.setHeader("Content-Type", "application/javascript")
      
      return res.end(result)
    }

    next()
  }
}
