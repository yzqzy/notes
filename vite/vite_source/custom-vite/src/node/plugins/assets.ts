import { Plugin } from "../plugin"
import { cleanUrl, removeImportQuery, isWindows } from "../utils"

export function assetPlugin(): Plugin {
  return {
    name: "vite:asset",
    async load(id) {
      let cleanedId = removeImportQuery(cleanUrl(id))
      // 这里仅处理 svg
      if (cleanedId.endsWith(".svg")) {
        if (isWindows) {
          cleanedId = cleanedId.replace('D:\\', '').replace(/\\/g, '\\\\')
        }

        return {
          // 包装成一个 JS 模块
          code: `export default "${cleanedId}"`
        }
      }
    }
  }
}
