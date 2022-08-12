import esbuild from "esbuild"
import path from "path"
import { readFile } from "fs-extra"

import { Plugin } from "../plugin"
import { isJSRequest } from "../utils"

export function esbuildTransformPlugin(): Plugin {
  return {
    name: "vite:esbuild-transform",
    // 加载模块
    async load(id) {
      if (isJSRequest(id)) {
        try {
          const code = await readFile(id, "utf-8")
          return code
        } catch (e) {
          return null
        }
      }
    },
    async transform(code, id) {
      if (isJSRequest(id)) {
        const extname = path.extname(id).slice(1)
        const { code: transformedCode, map } = await esbuild.transform(code, {
          target: "esnext",
          format: "esm",
          sourcemap: true,
          loader: extname as "js" | "ts" | "jsx" | "tsx",
        })
        return {
          code: transformedCode,
          map,
        }
      }
      return null
    }
  }
}
