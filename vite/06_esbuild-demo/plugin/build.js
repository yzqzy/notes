const { build } = require("esbuild");
const httpImport = require("./http-import-plugin");
const html = require('./html-plugin');

async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ["./src/index.jsx"],
    outdir: "dist",
    bundle: true,
    format: "esm",
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [httpImport(), html()],
  }).then(() => {
    console.log("🚀 Build Finished!");
  });
}

runBuild();