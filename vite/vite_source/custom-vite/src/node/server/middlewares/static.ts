import { NextHandleFunction } from "connect"
import { isImportRequest } from "../../utils"
// 一个用于加载静态资源的中间件
import sirv from "sirv"

export function staticMiddleware(): NextHandleFunction {
  const serveFromRoot = sirv("/", { dev: true })

  return async (req, res, next) => {
    if (!req.url) {
      return
    }
    // 不处理 import 请求
    if (isImportRequest(req.url)) {
      return
    }

    serveFromRoot(req, res, next)
  }
}
