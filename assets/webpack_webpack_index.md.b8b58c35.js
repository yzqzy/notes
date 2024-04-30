import{_ as e,o as a,c as n,Q as r}from"./chunks/framework.88002d8f.js";const m=JSON.parse('{"title":"WebPack","description":"","frontmatter":{},"headers":[],"relativePath":"webpack/webpack/index.md","filePath":"webpack/webpack/index.md"}'),l={name:"webpack/webpack/index.md"},s=r(`<h1 id="webpack" tabindex="-1">WebPack <a class="header-anchor" href="#webpack" aria-label="Permalink to &quot;WebPack&quot;">​</a></h1><h2 id="webpack-诞生" tabindex="-1">webpack 诞生 <a class="header-anchor" href="#webpack-诞生" aria-label="Permalink to &quot;webpack 诞生&quot;">​</a></h2><p>Tobias Koppers 自由软件开发者、家住德国纽约堡</p><p>GWT（Google Web Toolkit）</p><p>java应用到javascript SPA编译器让java程序员能用</p><p>java编写客户端应用，其中很重要的一个功能就是代码拆分</p><p>webpack诞生之初，目的是解决代码拆分问题</p><h2 id="为什么需要构建" tabindex="-1">为什么需要构建 <a class="header-anchor" href="#为什么需要构建" aria-label="Permalink to &quot;为什么需要构建&quot;">​</a></h2><p>开发分工、框架的变化、语言的变化、环境的变化、社区的变化、工具的变化</p><pre><code>    框架变化： JS库、MVC时代、MVVM时代
</code></pre><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><p>npm install webpack webpack-cli -D</p><p>webpack --mode production 生产模式编译</p><p>webpack --mode development 开发模式编译</p><p>webpack --mode none</p><h2 id="配置-package-json" tabindex="-1">配置 package.json <a class="header-anchor" href="#配置-package-json" aria-label="Permalink to &quot;配置  package.json&quot;">​</a></h2><p>&quot;build&quot;: &quot;webpack --mode production&quot; npm run build</p><p>&quot;dev&quot;: &quot;webpack --mode development&quot; npm run dev</p><p>&quot;build&quot;: &quot;webpack --mode production --watch&quot; --watch 检测改变、自动打包</p><p>&quot;build&quot;: &quot;webpack --mode production --watch --progress --display-reasons --colors&quot; --progress --display-reasons --colors 查看打包进度</p><p>配置 dev-server、也可以实现自动更新</p><pre><code>npm i webpack-dev-server -D

&quot;dev&quot;: &quot;webpack-dev-server --mode development&quot;
</code></pre><h2 id="配置-webpack-config-js" tabindex="-1">配置 webpack.config.js <a class="header-anchor" href="#配置-webpack-config-js" aria-label="Permalink to &quot;配置 webpack.config.js&quot;">​</a></h2><pre><code>const path = require(&#39;path&#39;);  

module.exports = {
    entry: &#39;/index.js&#39;,
    output: {
        path: path.resolve(__dirname, &#39;dist&#39;),
        filename: &#39;bundle.js&#39;
    }
}

entry: [&#39;./src/index.js&#39;] 多入口、可用数组方式进行配置

entry: {
    index: &#39;./src/index.js&#39;, 多入口文件、可用对象方式进行配置
    newIndex: &#39;./src/newIndex.js&#39;
}

filename: &#39;[name].bundle.js&#39;
</code></pre><h2 id="es6-编译" tabindex="-1">ES6 编译 <a class="header-anchor" href="#es6-编译" aria-label="Permalink to &quot;ES6 编译&quot;">​</a></h2><p>#通过babel编译ES6语法</p><pre><code>babel-core：封装babel编译时需要使用的API
babel-loader: 负责ES6语法转化，webpack打包时使用babel-loader处理javascript文件

babel-loader 8.x 对应 babel-core 7.x
babel-loader 7.x 对应 babel-core 6.x
</code></pre><h1 id="presets" tabindex="-1">presets <a class="header-anchor" href="#presets" aria-label="Permalink to &quot;presets&quot;">​</a></h1><pre><code>只能解析语法

babel-preset-env 用于编译ES6语法，是一个新的preset，可以根据配置的目标运行环境自动启用需要的babel插件
babel-preset-es2015 用于编译es6语法
babel-preset-es2017 用于编译es7语法
babel-preset-latest 特殊的presets，包括es2015、es2016、... es2017 (目前到es2017)
babel-preset-react 用于编译jsx和flow语法加入
babel-preset-stage-x（stage-0/1/2/3/4）

目前不同的浏览器和平台，这些es运行环境对es6、es7、es8 支持不一，为了发挥新版es的特性，需要在特定的平台按需转码

babel配置文件中
{
    &quot;presets&quot;: [&quot;env&quot;]
}

targets 

  babel配置文件中

    tagets 指定运行环境
    tagets.node 指定node版本
    tagets.browsers 指定浏览器版本
    modules 指定何种形式的模块，设置为false表示不转码模块
</code></pre><h1 id="babel-polyfill" tabindex="-1">babel-polyfill <a class="header-anchor" href="#babel-polyfill" aria-label="Permalink to &quot;babel-polyfill&quot;">​</a></h1><pre><code>babel-polyfill
babel-plugin-transform-runtime
babel-runtime

babel-polyfill
  
  Babel 默认只转换新的JavaScript语法（syntax），不转换新的API
  比如Generator、Set、Maps、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码
  
  例如：ES6在Array对象的Array.form方法。Babel就不会转码。
  如果想实现转码，必须使用babel-polyfill，为当前环境提供一个垫片（垫片，各个浏览器之间对于标准实现不一致，实现垫片保持相同的API）

npm install babel-polyfill -D

使用：

  1. （浏览器环境）单独在html的&lt;head&gt;标签中引入babel-polyfill.js（CDN或本地文件均可）
  2. 在package.json中添加babel-polyfill依赖，在webpack配置文件增加入口：
     如entry: [&quot;babel-polyfill&quot;, &#39;./src/app.js&#39;] polyfill将会被打包进这个入口文件，而且是放在最开始的地方
  3. 在package.json 中添加babel-polyfill依赖，在webpack入口文件顶部使用 import/require 引入，如 import &#39;babel-ployfill&#39;  

  优点：一次性解决所有兼容性问题，并且是全局的。
</code></pre><h1 id="transform-runtime" tabindex="-1">Transform-runtime <a class="header-anchor" href="#transform-runtime" aria-label="Permalink to &quot;Transform-runtime&quot;">​</a></h1><pre><code>webpack中，babel-plugin-transform-runtime实际上是依赖babel-runtime.
因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持这些特性
这些polyfill包就是在babel-runtime这个包里
例如：core-js、regenerator等polyfill

babel-runtime 和 babel-plugin-transform-runtime 的区别是，相当前者是手动挡，后者是自动挡。
每当要编译一个api时都要手动加上require(&#39;babel-runtime&#39;)，而babel-plugin-transform-runtime会由工具自动添加，
主要的功能是为api提供沙箱的垫片方案，不会污染全局的api，因此适合用在第三方的开发产品中。
</code></pre><h1 id="插件-babel-runtime-与-babel-plugin-transform-runtime" tabindex="-1">插件 babel-runtime 与 babel-plugin-transform-runtime <a class="header-anchor" href="#插件-babel-runtime-与-babel-plugin-transform-runtime" aria-label="Permalink to &quot;插件 babel-runtime 与 babel-plugin-transform-runtime&quot;">​</a></h1><pre><code>package.json中添加依赖 babel-plugin-transform-runtime 以及 babel-runtime
.babelrc中配置插件: &quot;plugins&quot;: [&quot;transform-runtime&quot;]
代码中可以直接使用ES6+的新特性，无需import/require额外东西，webpack也不需要额外配置

优点：
  1. 无全局污染
  2. 依赖统一 按需引入（polyfill是各个模块共享的），无重复引入，无多余引入
  3. 适合编写lib（第三方库）类型的代码
</code></pre><h2 id="css相关" tabindex="-1">CSS相关 <a class="header-anchor" href="#css相关" aria-label="Permalink to &quot;CSS相关&quot;">​</a></h2><h1 id="处理css" tabindex="-1">处理CSS <a class="header-anchor" href="#处理css" aria-label="Permalink to &quot;处理CSS&quot;">​</a></h1><pre><code>style-loader 是为了在html中以style的方式嵌入css
css-loader 通过require的方式引入css，编译顺序是先用css-loader将css代码编译，再交给style-loder插入到网页中去

file-loader 将文件（一般是图片文件为主，其他的包括字体文件等），在进行一些处理后移动打包后的目录中。
</code></pre><h1 id="style-loader分类" tabindex="-1">style-loader分类 <a class="header-anchor" href="#style-loader分类" aria-label="Permalink to &quot;style-loader分类&quot;">​</a></h1><pre><code>style-loader：配合css-loader使用，以&lt;style&gt;&lt;/style&gt;形式在html页面中插入css代码

style-loader/url：以link标签形式向html页面插入代码，采用这种方式需要将css-loader变为file-loader，但这种方式不推荐，
                  因为如果在一个js文件中引入多个css文件会生成多个link标签，而html每个link标签都会发送一次网络请求，
                  所以这中方式并不建议

style-loader/useable：采用这种方式处理css，会有use()和unuse()两种方法，use()开启引入样式，unuse()不适用样式
</code></pre><h1 id="loader配置项-options" tabindex="-1">loader配置项 options <a class="header-anchor" href="#loader配置项-options" aria-label="Permalink to &quot;loader配置项 options&quot;">​</a></h1><pre><code>attrs：attrs是一个对象，以键值对出现，在&lt;style&gt;&lt;/style&gt;标签中以key-value形式出现，键值对可以自定义，但是使用时建议语义化
singleton：true 只用一个标签
insertAt 有两个值&#39;top|bottom&#39;，如果不配置insertAt，则默认为bottom
         当insertAt为&#39;top&#39;时，loader打包的css将优先于已经存在的css
insertInto 插入到指定标签
transform 函数的参数是css，这时我们拿到的css样式是以字符串的形式，所以可用replace方法修改样式，
          transform.js通过style-loader根据需要在css未加载到页面之前修改样式，在函数中我们可以获取到浏览器的相关信息，
          比如window，navigator等，这有助于我们根据相关信息修改样式。
</code></pre><h1 id="css-loader" tabindex="-1">css-loader <a class="header-anchor" href="#css-loader" aria-label="Permalink to &quot;css-loader&quot;">​</a></h1><pre><code>Minimize：true or false 是否开启css代码压缩，比如压缩空格不换行
modules：是否开启css-modules
localIdentName：
  [path]: 路径
  [name]: 文件名
  [local]: 样式名
  [hash: 5]: 文件标记
Compose 组合样式
</code></pre><h2 id="less-sass-postcss-图片处理" tabindex="-1">Less/Sass postcss 图片处理 <a class="header-anchor" href="#less-sass-postcss-图片处理" aria-label="Permalink to &quot;Less/Sass postcss 图片处理&quot;">​</a></h2><h1 id="postcss" tabindex="-1">postcss <a class="header-anchor" href="#postcss" aria-label="Permalink to &quot;postcss&quot;">​</a></h1><pre><code>1. 把CSS解析成JavaScript可以操作的抽象语法树结构（Abstract Syntax Tree，AST）
2. PostCSS是一款使用插件去转换CSS的工具
3. 常用插件：
   Autoprefixer：为CSS中的属性添加浏览器特定的前缀
   postcss-cssnext：使用CSS将来版本可能会加入的新特性
    * cssnext中已经包含了对Autoprefixer的使用，因此使用cssnext就不再需要使用Autoprefixer
   cssnano：压缩优化CSS
</code></pre><h1 id="less-sass" tabindex="-1">less / sass <a class="header-anchor" href="#less-sass" aria-label="Permalink to &quot;less / sass&quot;">​</a></h1><pre><code>Less：是一门CSS预处理语言，它扩展了CSS语言，增加了变量，Mixin、函数等特性
Sass：是成熟、稳定、强大的CSS扩展语言

npm i less less-loader -D
npm i node-sass sass-loader -D
</code></pre><h1 id="处理图片" tabindex="-1">处理图片 <a class="header-anchor" href="#处理图片" aria-label="Permalink to &quot;处理图片&quot;">​</a></h1><pre><code>url-loader：会将引入的图片编码，根据需求选择性的把某些小图片编码成base64格式写进页面；从而减少服务器请求，优化性能。
  * 增强版的 file-loader：url-loader 封装了file-loader

url-loader工作分为两种情况：
1. 文件大小小于limit参数，url-loader将会把文件转为DateURL
2. 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。

npm i file-loader url-loader -D
</code></pre><h1 id="图片压缩" tabindex="-1">图片压缩 <a class="header-anchor" href="#图片压缩" aria-label="Permalink to &quot;图片压缩&quot;">​</a></h1><pre><code>npm i image-webpack-loader -D
</code></pre><h2 id="常用插件、生成html、提取css、清除文件" tabindex="-1">常用插件、生成HTML、提取CSS、清除文件 <a class="header-anchor" href="#常用插件、生成html、提取css、清除文件" aria-label="Permalink to &quot;常用插件、生成HTML、提取CSS、清除文件&quot;">​</a></h2><h1 id="生成html" tabindex="-1">生成HTML <a class="header-anchor" href="#生成html" aria-label="Permalink to &quot;生成HTML&quot;">​</a></h1><pre><code>HtmlWebpackPlugin 可以自动引入打包好的JS文件
options:
  template：本地模板文件的位置
  filename：输入文件的文件名称
  minfy：压缩代码
  chunks：允许插入到模板中的一些chunk
  inject：向template或者templateContent中注入所有静态资源
</code></pre><h1 id="处理html中的图片" tabindex="-1">处理html中的图片 <a class="header-anchor" href="#处理html中的图片" aria-label="Permalink to &quot;处理html中的图片&quot;">​</a></h1><pre><code>html-loader 
  options：
    attrs: [img:src]

清除文件插件：
  clean-webpack-plugin
</code></pre><h1 id="提取css样式" tabindex="-1">提取CSS样式 <a class="header-anchor" href="#提取css样式" aria-label="Permalink to &quot;提取CSS样式&quot;">​</a></h1><pre><code>1. extract-text-webpack-plugin@next 
   options: {
     fallback: 当不提取的时候用什么方式加载到页面中
     use：提取的方式处理css
   }

2. minni-css-extract-
</code></pre><h2 id="webpack引入库、字体文件、imports-loader" tabindex="-1">Webpack引入库、字体文件、imports-loader <a class="header-anchor" href="#webpack引入库、字体文件、imports-loader" aria-label="Permalink to &quot;Webpack引入库、字体文件、imports-loader&quot;">​</a></h2><h1 id="相关插件" tabindex="-1">相关插件 <a class="header-anchor" href="#相关插件" aria-label="Permalink to &quot;相关插件&quot;">​</a></h1><pre><code>webpack.ProvidePlugin
  ProvidePlugin 是webpack内置模块
  使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入

imports-loader 
  允许使用依赖于特定全局变量的模块
  对于依赖全局变量$或this作为window对象的第三方模块非常有用    
</code></pre><h2 id="webpack-dev-server配置、eslint、热更新" tabindex="-1">webpack-dev-server配置、Eslint、热更新 <a class="header-anchor" href="#webpack-dev-server配置、eslint、热更新" aria-label="Permalink to &quot;webpack-dev-server配置、Eslint、热更新&quot;">​</a></h2><h1 id="webpack-dev-server" tabindex="-1">Webpack-dev-server <a class="header-anchor" href="#webpack-dev-server" aria-label="Permalink to &quot;Webpack-dev-server&quot;">​</a></h1><pre><code>inline 内联模式/iframe模式
open 在服务器启动后打开浏览器
hot 启用webpack的热模块替换功能
port 自定义端口
historyApiFallbcak 使用HTML5历史记录API时，index.html可能必须提供该页面以替代任何404回复
proxy 当您拥有单独的API后端开发服务服务器并且希望在同一域名上发送API请求时，可用来代理某些URL
overlay 当存在编译器错误或警告时，在浏览器中显示全屏覆盖
</code></pre><h1 id="proxy代理" tabindex="-1">proxy代理 <a class="header-anchor" href="#proxy代理" aria-label="Permalink to &quot;proxy代理&quot;">​</a></h1><pre><code>target 目标接口
changeOrigin 如果不加就无法跳转请求
logLevel 日志
</code></pre><h1 id="eslint语法检测" tabindex="-1">Eslint语法检测 <a class="header-anchor" href="#eslint语法检测" aria-label="Permalink to &quot;Eslint语法检测&quot;">​</a></h1><pre><code>ESLint是在ECMAScript/JavaScript代码中识别和报告模式匹配的工具

例如：
  1. 代码中不能存在多行空格
  2. tab键不能使用，必须换成两个空格
  3. 代码中不能存在声明但未使用的变量
  ......
</code></pre><h1 id="eslint配置相关插件" tabindex="-1">Eslint配置相关插件 <a class="header-anchor" href="#eslint配置相关插件" aria-label="Permalink to &quot;Eslint配置相关插件&quot;">​</a></h1><pre><code>standard

相关插件：
  eslint-config-standard
  eslint-plugin-promise
  eslint-plugin-html
  eslint-plugin-import 
  eslint-plugin-node
  eslint-plugin-standard
</code></pre><h2 id="webpack优化、tree-shaking、purifycss" tabindex="-1">Webpack优化、tree-shaking、purifycss <a class="header-anchor" href="#webpack优化、tree-shaking、purifycss" aria-label="Permalink to &quot;Webpack优化、tree-shaking、purifycss&quot;">​</a></h2><h1 id="tree-shaking" tabindex="-1">Tree Shaking <a class="header-anchor" href="#tree-shaking" aria-label="Permalink to &quot;Tree Shaking&quot;">​</a></h1><pre><code>JS tree shaking  
  uglifyjs-webpack-plugin

CSS tree shaking
  purifycss-webpack
  purify-css
  glob-all

  glob-all的作用就是帮助PurifyCSS进行路径处理，定位要做TreeShaking的路径文件 
</code></pre>`,75),o=[s];function t(i,c,p,d,b,h){return a(),n("div",null,o)}const k=e(l,[["render",t]]);export{m as __pageData,k as default};
