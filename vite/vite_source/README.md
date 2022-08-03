## 双引擎架构

Vite 底层使用两个构建引擎，Esbuild 和 Rollup。


<img src="../images/design.png" />


依赖预构建阶段，Esbuild 作为 bundler 来使用。

ts/tsx、js/jsx 单文件编译后，Vite 使用 Esbuild 进行语法转义，将 Esbuild 作为 transformer 使用。

生产环境中，Esbuild 是 Vite 默认的压缩工具。



生产环境下，Vite 利用 Rollup 打包，并基于 Rollup 本身的打包能力进行扩展和优化。

* CSS 代码分割
* 自动预加载

