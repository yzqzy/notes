# 构建工具对比

说起构建工具，大家首先想到的肯定是 webpack 以及现在比较火的 vite。

webpack 功能强大，生态丰富，面世至今，一直都很受欢迎。vite 则采用 `unbundle` 构建模式，带来极致的开发体验。

在这两个构建工具之外，还有其他的构建工具。例如 rollup、parcel、esbuild，以及 grunt 和 gulp。

## grunt/gulp

grunt/gulp 都是运行在 node 环境上的自动化工具。

在开发过程中，我们可以将一些常见操作：解析 html、代码转换、代码检查、代码压缩、代码混淆 配置成一系列任务，然后通过 grunt/gulp 自动执行这些任务：

grunt 和 gulp 的不同点：

* 使用 grunt 过程中，会产生一些临时文件。其他任务可能会基于临时文件再做处理并生成最终的构建后文件，导致出现多次 I/O。
* gulp 有文件流的概念，通过管道将多个任务和操作连接起来，不会产生临时文件，减少了 I/O 操作，流程更加清晰，纯粹，大大加快了构建速度。

## webpack/rollup/parcel

webpack/rollup/parcel 都是模块打包器。

这一类构建工具，通常需要指定入口 - entry，然后以 entry 为起点，通过分析整个项目内各个源文件之间的依赖关系，构建一个模块依赖图 - module graph，然后再将 module graph 分离成三种类型的 bundle: entry 所在 initial bundle、lazy load 需要的 async bundle 和自定义分离规则的 custom bundle。

这几个构建工具各有优势：

* webpack 大而全，配置灵活，生态丰富，是构建工具首选。
* parcel 号称零配置，使用简单，适合不大需要定制化的项目使用。
* rollup 推崇 ESM 标准开发，打包出来的代码干净，适用于组件开发。

## vite/esbuild

新一代构建工具。

esbuild，基于 go 语言实现，代码直接编译成机器码，构建速度比 webpack 更快。

vite，开发模式下借助浏览器对 ESM 的支持，采用 nobundle 的方式进行构建，能提供极致的开发体验。生产模式下则基于 rollup 进行构建。

