var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// src/node/cli.ts
import cac from "cac";

// src/node/server/index.ts
import connect from "connect";
import { blue, green as green2 } from "picocolors";

// src/node/optimizer/index.ts
import path4 from "path";
import { build } from "esbuild";
import { green } from "picocolors";

// src/node/constants.ts
var path = __require("path");
var EXTERNAL_TYPES = [
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
  "avif"
];
var BARE_IMPORT_RE = /^[\w@][^:]/;
var PRE_BUNDLE_DIR = path.join("node_modules", ".vite");

// src/node/optimizer/scanPlugin.ts
function scanPlugin(deps) {
  return {
    name: "esbuild:scan-deps",
    setup(build2) {
      build2.onResolve(
        { filter: new RegExp(`\\.(${EXTERNAL_TYPES.join("|")})$`) },
        (resolveInfo) => {
          return {
            path: resolveInfo.path,
            external: true
          };
        }
      );
      build2.onResolve(
        {
          filter: BARE_IMPORT_RE
        },
        (resolveInfo) => {
          const { path: id } = resolveInfo;
          deps.add(id);
          return {
            path: id,
            external: true
          };
        }
      );
    }
  };
}

// src/node/optimizer/preBundlePlugin.ts
import { init, parse } from "es-module-lexer";
import path3 from "path";
import resolve from "resolve";
import fs from "fs-extra";
import createDebug from "debug";

// src/node/utils.ts
var path2 = __require("path");
var os = __require("os");
function slash(p) {
  return p.replace(/\\/g, "/");
}
var isWindows = os.platform() === "win32";
function normalizePath(id) {
  return path2.posix.normalize(isWindows ? slash(id) : id);
}

// src/node/optimizer/preBundlePlugin.ts
var debug = createDebug("dev");
function preBundlePlugin(deps) {
  return {
    name: "esbuild:pre-bundle",
    setup(build2) {
      build2.onResolve(
        {
          filter: BARE_IMPORT_RE
        },
        (resolveInfo) => {
          const { path: id, importer } = resolveInfo;
          const isEntry = !importer;
          if (deps.has(id)) {
            return isEntry ? {
              path: id,
              namespace: "dep"
            } : {
              path: resolve.sync(id, { basedir: process.cwd() })
            };
          }
        }
      );
      build2.onLoad(
        {
          filter: /.*/,
          namespace: "dep"
        },
        async (loadInfo) => {
          await init;
          const id = loadInfo.path;
          const root = process.cwd();
          const entryPath = resolve.sync(id, { basedir: root });
          const code = await fs.readFile(entryPath, "utf-8");
          const [imports, exports] = await parse(code);
          let relativePath = normalizePath(path3.relative(root, entryPath));
          if (!relativePath.startsWith("./") && !relativePath.startsWith("../") && relativePath !== ".") {
            relativePath = `./${relativePath}`;
          }
          let proxyModule = [];
          if (!imports.length && !exports.length) {
            const res = __require(entryPath);
            const specifiers = Object.keys(res);
            proxyModule.push(
              `export { ${specifiers.join(",")} } from "${relativePath}"`,
              `export default require("${relativePath}")`
            );
          } else {
            if (exports.includes("default")) {
              proxyModule.push(`import d from "${relativePath}"export default d`);
            }
            proxyModule.push(`export * from "${relativePath}"`);
          }
          debug("\u4EE3\u7406\u6A21\u5757\u5185\u5BB9: %o", proxyModule.join("\n"));
          const loader = path3.extname(entryPath).slice(1);
          return {
            loader,
            contents: proxyModule.join("\n"),
            resolveDir: root
          };
        }
      );
    }
  };
}

// src/node/optimizer/index.ts
async function optimize(root) {
  const entry = path4.resolve(root, "src/main.tsx");
  const deps = /* @__PURE__ */ new Set();
  await build({
    entryPoints: [entry],
    bundle: true,
    write: false,
    plugins: [scanPlugin(deps)]
  });
  console.log(
    `${green("\u9700\u8981\u9884\u6784\u5EFA\u7684\u4F9D\u8D56")}:
${[...deps].map(green).map((item) => `  ${item}`).join("\n")}`
  );
  await build({
    entryPoints: [...deps],
    write: true,
    bundle: true,
    format: "esm",
    splitting: true,
    outdir: path4.resolve(root, PRE_BUNDLE_DIR),
    plugins: [preBundlePlugin(deps)]
  });
}

// src/node/server/index.ts
async function startDevServer() {
  const app = connect();
  const root = process.cwd();
  const startTime = Date.now();
  app.listen(3e3, async () => {
    await optimize(root);
    console.log(
      green2("\u{1F680} No-Bundle \u670D\u52A1\u5DF2\u7ECF\u6210\u529F\u542F\u52A8!"),
      `\u8017\u65F6: ${Date.now() - startTime}ms`
    );
    console.log(`> \u672C\u5730\u8BBF\u95EE\u8DEF\u5F84: ${blue("http://localhost:3000")}`);
  });
}

// src/node/cli.ts
var cli = cac();
cli.command("[root]", "Run the development server").alias("serve").alias("dev").action(async () => {
  await startDevServer();
});
cli.help();
cli.parse();
//# sourceMappingURL=index.mjs.map