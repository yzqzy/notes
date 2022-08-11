const path = require('path')

export const EXTERNAL_TYPES = [
  "css",
  "less",
  "sass",
  "scss",
  "styl",
  "stylus",
  "pcss",
  "postcss",
  "vue",
  "svelte",
  "marko",
  "astro",
  "png",
  "jpe?g",
  "gif",
  "svg",
  "ico",
  "webp",
  "avif",
]

export const BARE_IMPORT_RE = /^[\w@][^:]/

// 预构建产物默认存放在 node_modules 中的 .vite 目录中
export const PRE_BUNDLE_DIR = path.join("node_modules", ".vite")
