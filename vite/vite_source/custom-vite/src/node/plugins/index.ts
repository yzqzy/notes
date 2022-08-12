import { Plugin } from "../plugin"

import { resolvePlugin } from "./resolve"
import { esbuildTransformPlugin } from "./esbuild"
import { importAnalysisPlugin } from "./importAnalysis"

export function resolvePlugins(): Plugin[] {
  return [resolvePlugin(), esbuildTransformPlugin(), importAnalysisPlugin()]
}
