# WebPack

## webpack 诞生
 
   Tobias Koppers 自由软件开发者、家住德国纽约堡
    
   GWT（Google Web Toolkit）

   java应用到javascript SPA编译器让java程序员能用

   java编写客户端应用，其中很重要的一个功能就是代码拆分

   webpack诞生之初，目的是解决代码拆分问题

## 为什么需要构建

  开发分工、框架的变化、语言的变化、环境的变化、社区的变化、工具的变化

        框架变化： JS库、MVC时代、MVVM时代
        
## 使用

   npm install webpack webpack-cli -D

   webpack --mode production 生产模式编译

   webpack --mode development 开发模式编译

   webpack --mode none

## 配置  package.json
    
  "build": "webpack --mode production"  npm run build

  "dev": "webpack --mode development"   npm run dev 

  "build": "webpack --mode production --watch"  --watch 检测改变、自动打包

  "build": "webpack --mode production --watch --progress --display-reasons --colors" 
  --progress --display-reasons --colors 查看打包进度

  配置 dev-server、也可以实现自动更新

    npm i webpack-dev-server -D

    "dev": "webpack-dev-server --mode development"

## 配置 webpack.config.js 

    const path = require('path');  

    module.exports = {
        entry: '/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        }
    }

    entry: ['./src/index.js'] 多入口、可用数组方式进行配置

    entry: {
        index: './src/index.js', 多入口文件、可用对象方式进行配置
        newIndex: './src/newIndex.js'
    }

    filename: '[name].bundle.js'

## ES6 编译

  #通过babel编译ES6语法

    babel-core：封装babel编译时需要使用的API
    babel-loader: 负责ES6语法转化，webpack打包时使用babel-loader处理javascript文件

    babel-loader 8.x 对应 babel-core 7.x
    babel-loader 7.x 对应 babel-core 6.x

  # presets 

    只能解析语法

    babel-preset-env 用于编译ES6语法，是一个新的preset，可以根据配置的目标运行环境自动启用需要的babel插件
    babel-preset-es2015 用于编译es6语法
    babel-preset-es2017 用于编译es7语法
    babel-preset-latest 特殊的presets，包括es2015、es2016、... es2017 (目前到es2017)
    babel-preset-react 用于编译jsx和flow语法加入
    babel-preset-stage-x（stage-0/1/2/3/4）

    目前不同的浏览器和平台，这些es运行环境对es6、es7、es8 支持不一，为了发挥新版es的特性，需要在特定的平台按需转码

    babel配置文件中
    {
        "presets": ["env"]
    }

    targets 

      babel配置文件中
    
        tagets 指定运行环境
        tagets.node 指定node版本
        tagets.browsers 指定浏览器版本
        modules 指定何种形式的模块，设置为false表示不转码模块

  # babel-polyfill

    babel-polyfill
    babel-plugin-transform-runtime
    babel-runtime

    babel-polyfill
      
      Babel 默认只转换新的JavaScript语法（syntax），不转换新的API
      比如Generator、Set、Maps、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码
      
      例如：ES6在Array对象的Array.form方法。Babel就不会转码。
      如果想实现转码，必须使用babel-polyfill，为当前环境提供一个垫片（垫片，各个浏览器之间对于标准实现不一致，实现垫片保持相同的API）

    npm install babel-polyfill -D
    
    使用：

      1. （浏览器环境）单独在html的<head>标签中引入babel-polyfill.js（CDN或本地文件均可）
      2. 在package.json中添加babel-polyfill依赖，在webpack配置文件增加入口：
         如entry: ["babel-polyfill", './src/app.js'] polyfill将会被打包进这个入口文件，而且是放在最开始的地方
      3. 在package.json 中添加babel-polyfill依赖，在webpack入口文件顶部使用 import/require 引入，如 import 'babel-ployfill'  

      优点：一次性解决所有兼容性问题，并且是全局的。

  # Transform-runtime

    webpack中，babel-plugin-transform-runtime实际上是依赖babel-runtime.
    因为babel编译es6到es5的过程中，babel-plugin-transform-runtime这个插件会自动polyfill es5不支持这些特性
    这些polyfill包就是在babel-runtime这个包里
    例如：core-js、regenerator等polyfill

    babel-runtime 和 babel-plugin-transform-runtime 的区别是，相当前者是手动挡，后者是自动挡。
    每当要编译一个api时都要手动加上require('babel-runtime')，而babel-plugin-transform-runtime会由工具自动添加，
    主要的功能是为api提供沙箱的垫片方案，不会污染全局的api，因此适合用在第三方的开发产品中。

  # 插件 babel-runtime 与 babel-plugin-transform-runtime

    package.json中添加依赖 babel-plugin-transform-runtime 以及 babel-runtime
    .babelrc中配置插件: "plugins": ["transform-runtime"]
    代码中可以直接使用ES6+的新特性，无需import/require额外东西，webpack也不需要额外配置

    优点：
      1. 无全局污染
      2. 依赖统一 按需引入（polyfill是各个模块共享的），无重复引入，无多余引入
      3. 适合编写lib（第三方库）类型的代码

## CSS相关

  # 处理CSS

    style-loader 是为了在html中以style的方式嵌入css
    css-loader 通过require的方式引入css，编译顺序是先用css-loader将css代码编译，再交给style-loder插入到网页中去

    file-loader 将文件（一般是图片文件为主，其他的包括字体文件等），在进行一些处理后移动打包后的目录中。

    
  # style-loader分类

    style-loader：配合css-loader使用，以<style></style>形式在html页面中插入css代码

    style-loader/url：以link标签形式向html页面插入代码，采用这种方式需要将css-loader变为file-loader，但这种方式不推荐，
                      因为如果在一个js文件中引入多个css文件会生成多个link标签，而html每个link标签都会发送一次网络请求，
                      所以这中方式并不建议

    style-loader/useable：采用这种方式处理css，会有use()和unuse()两种方法，use()开启引入样式，unuse()不适用样式

  # loader配置项 options

    attrs：attrs是一个对象，以键值对出现，在<style></style>标签中以key-value形式出现，键值对可以自定义，但是使用时建议语义化
    singleton：true 只用一个标签
    insertAt 有两个值'top|bottom'，如果不配置insertAt，则默认为bottom
             当insertAt为'top'时，loader打包的css将优先于已经存在的css
    insertInto 插入到指定标签
    transform 函数的参数是css，这时我们拿到的css样式是以字符串的形式，所以可用replace方法修改样式，
              transform.js通过style-loader根据需要在css未加载到页面之前修改样式，在函数中我们可以获取到浏览器的相关信息，
              比如window，navigator等，这有助于我们根据相关信息修改样式。

  # css-loader 

    Minimize：true or false 是否开启css代码压缩，比如压缩空格不换行
    modules：是否开启css-modules
    localIdentName：
      [path]: 路径
      [name]: 文件名
      [local]: 样式名
      [hash: 5]: 文件标记
    Compose 组合样式

## Less/Sass postcss 图片处理

  # postcss 

    1. 把CSS解析成JavaScript可以操作的抽象语法树结构（Abstract Syntax Tree，AST）
    2. PostCSS是一款使用插件去转换CSS的工具
    3. 常用插件：
       Autoprefixer：为CSS中的属性添加浏览器特定的前缀
       postcss-cssnext：使用CSS将来版本可能会加入的新特性
        * cssnext中已经包含了对Autoprefixer的使用，因此使用cssnext就不再需要使用Autoprefixer
       cssnano：压缩优化CSS
    
  # less / sass

    Less：是一门CSS预处理语言，它扩展了CSS语言，增加了变量，Mixin、函数等特性
    Sass：是成熟、稳定、强大的CSS扩展语言

    npm i less less-loader -D
    npm i node-sass sass-loader -D

  # 处理图片

    url-loader：会将引入的图片编码，根据需求选择性的把某些小图片编码成base64格式写进页面；从而减少服务器请求，优化性能。
      * 增强版的 file-loader：url-loader 封装了file-loader

    url-loader工作分为两种情况：
    1. 文件大小小于limit参数，url-loader将会把文件转为DateURL
    2. 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。

    npm i file-loader url-loader -D

  # 图片压缩

    npm i image-webpack-loader -D

## 常用插件、生成HTML、提取CSS、清除文件

  # 生成HTML

    HtmlWebpackPlugin 可以自动引入打包好的JS文件
    options:
      template：本地模板文件的位置
      filename：输入文件的文件名称
      minfy：压缩代码
      chunks：允许插入到模板中的一些chunk
      inject：向template或者templateContent中注入所有静态资源

  # 处理html中的图片

    html-loader 
      options：
        attrs: [img:src]

    清除文件插件：
      clean-webpack-plugin

  # 提取CSS样式

    1. extract-text-webpack-plugin@next 
       options: {
         fallback: 当不提取的时候用什么方式加载到页面中
         use：提取的方式处理css
       }
    
    2. minni-css-extract-
    
## Webpack引入库、字体文件、imports-loader

  # 相关插件

    webpack.ProvidePlugin
      ProvidePlugin 是webpack内置模块
      使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入

    imports-loader 
      允许使用依赖于特定全局变量的模块
      对于依赖全局变量$或this作为window对象的第三方模块非常有用    

## webpack-dev-server配置、Eslint、热更新

  # Webpack-dev-server

    inline 内联模式/iframe模式
    open 在服务器启动后打开浏览器
    hot 启用webpack的热模块替换功能
    port 自定义端口
    historyApiFallbcak 使用HTML5历史记录API时，index.html可能必须提供该页面以替代任何404回复
    proxy 当您拥有单独的API后端开发服务服务器并且希望在同一域名上发送API请求时，可用来代理某些URL
    overlay 当存在编译器错误或警告时，在浏览器中显示全屏覆盖
    
  # proxy代理

    target 目标接口
    changeOrigin 如果不加就无法跳转请求
    logLevel 日志

  # Eslint语法检测

    ESLint是在ECMAScript/JavaScript代码中识别和报告模式匹配的工具

    例如：
      1. 代码中不能存在多行空格
      2. tab键不能使用，必须换成两个空格
      3. 代码中不能存在声明但未使用的变量
      ......

  # Eslint配置相关插件

    standard
    
    相关插件：
      eslint-config-standard
      eslint-plugin-promise
      eslint-plugin-html
      eslint-plugin-import 
      eslint-plugin-node
      eslint-plugin-standard

## Webpack优化、tree-shaking、purifycss

  # Tree Shaking

    JS tree shaking  
      uglifyjs-webpack-plugin

    CSS tree shaking
      purifycss-webpack
      purify-css
      glob-all

      glob-all的作用就是帮助PurifyCSS进行路径处理，定位要做TreeShaking的路径文件 

      