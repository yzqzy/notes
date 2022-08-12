import connect from "connect"
import { blue, green } from "picocolors"

import { optimize } from '../optimizer'
import { resolvePlugins } from '../plugins'
import { Plugin } from "../plugin";
import { createPluginContainer, PluginContainer } from '../pluginContainer'

import { indexHtmlMiddware } from './middlewares/indexHtml'
import { transformMiddleware } from "./middlewares/transform"
import { staticMiddleware } from "./middlewares/static"

export interface ServerContext {
  root: string;
  pluginContainer: PluginContainer;
  app: connect.Server;
  plugins: Plugin[]
}

export async function startDevServer() {
  const app = connect()
  const root = process.cwd()
  const startTime = Date.now()

  const plugins = resolvePlugins()
  const pluginContainer = createPluginContainer(plugins)

  const serverContext: ServerContext = {
    root: process.cwd(),
    app,
    pluginContainer,
    plugins
  }

  for (const plugin of plugins) {
    if (plugin.configureServer) {
      await plugin.configureServer(serverContext)
    }
  }

  // 核心编译逻辑
  app.use(transformMiddleware(serverContext))
  // 处理入口 HTML 资源
  app.use(indexHtmlMiddware(serverContext))
  // 处理静态资源
  app.use(staticMiddleware())

  app.listen(3000, async () => {
    await optimize(root)

    console.log(
      green("🚀 No-Bundle 服务已经成功启动!"),
      `耗时: ${Date.now() - startTime}ms`
    )
    console.log(`> 本地访问路径: ${blue("http://localhost:3000")}`)
  })
}
