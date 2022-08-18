# interview

## HTML 语义化

语义化指根据内容的结构，选择合适的标签。通俗来讲就是用正确的标签做正确的事。

语义化优点：

* 对机器友好，带有语义化的文字表现力丰富，适合搜索引擎的爬虫爬取有效信息，有利于 SEO；
* 语义化标签支持读屏软件，根据文章可以自动生成目录；
* 对开发者友好，可以增强可读性，使网页结构更加清晰，有利于团队的开发和维护。

常见的语义化标签：

```html
<header></header>
<nav></nav>
<section></section>
<main></main>
<article></article>
<aside></aside>
<footer></footer>
```

## DOCTYPE（文档类型）

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明。

它必须声明在第一行。用于告知浏览器如何解析文档，不同的渲染模型会影响浏览器对 CSS 代码甚至 JavaScript 脚本的解析。

浏览器渲染页面有两种方式：

* CSS1Compat，标准模式（Strick mode）
  * 浏览器默认模式，使用 `W3C` 标准解析并渲染页面
  * 标准模式中，浏览器按照 `W3C` 标准解析代码
* BackCompat，怪异模式/混杂模式（Quirk mode）
  * 浏览器用自己的方式解析代码
  * 混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作

## defer 与 async

defer 和 async 属性都会异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析。

defer

* IE4 已经存在该方法，

* 多个 defer 属性标签，会按照加载顺序依次执行
* 脚本加载完成后，不会立即执行，会在DOM 树构建完毕后，DOMContentLoaded 事件触发之前执行

async

* HTML5 新增属性，IE9 及以上支持该属性
* 多个带有 async 属性的标签，不能保持加载顺序
* 脚本加载完成后会立即执行

[企业级异步加载](https://notes.yueluo.club/fragment/index.html#_1%E3%80%81%E5%90%8C%E6%AD%A5%E4%B8%8E%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD)

## 常用的 meta 标签

meta 标签由 name 和 content 属性定义，用来描述网页文档的属性。

HTTP 标准固定了一些 name 形成共识，开发者也可以自定义 name。

### charset

用来描述 HTML 文档的编码类型

```html
<meta charset="UFT-8" />
```

### viewport

适配移动端，用来控制视口的大小和比例

```html
<meta name="viewport" content="width=deveice-width, initial-scale=1, maximun-scale=1" />
```

content 参数有以下几种：

* width viewport：宽度（数值/deveice-width）
* height viewport：高度（数值/device-height）
* initial-scale：初始缩放比例
* maximum-scale：最大缩放比例
* minimum-scale：最小缩放比例
* use-scalable：是否允许用户缩放（yes/no）

### keywords 

页面关键词

```html
<meta name="keywords" content="关键词" />
```

### description

页面描述

```html
<meta name="description" content="页面描述内容" />
```

### refresh

页面重定向和刷新

```html
<meta http-equiv="refresh" content="0;url=" />
```

### robots

搜索引擎索引方式

```html
<meta name="robots" content="index,follow" />
```

`content` 参数有以下几种：

- `all`：文件将被检索，且页面上的链接可以被查询
- `none`：文件将不被检索，且页面上的链接不可以被查询
- `index`：文件将被检索
- `follow`：页面上的链接可以被查询
- `noindex`：文件将不被检索
- `nofollow`：页面上的链接不可以被查询

## HTML5 新特性

* 新增语义化标签：nav、header、footer、aside、section、article

* 音频、视频标签：audio、video

* 数据存储：localStorage、sessionStorage、IndexedDB

* canvas（画布）、Geolocation（地理定位）、websocket（通信协议）

* input 标签新增属性：placeholder、autocomplete、autofocus、required

* history API：go、forward、back、pushstate
* DOM 查询操作：`document.querySelector()`、`document.querySelectorAll()`
* 拖放：`<img draggable="true" />`

## 行内元素、块级元素、空元素

行内元素有：`a b span img input select strong`

块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`

空元素，即没有内容的HTML元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签

- 常见的有：`<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`
- 少见的有：`<area>`、`<base>`、`<col>`、`<colgroup>`、`<command>`、`<embed>`、`<keygen>`、`<param>`、`<source>`、`<track>`、`<wbr>`

## web worker

[MDN定义](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 

可以通过 postMessage 将结果回传到主线程，在进行复杂操作的时候，不会阻塞主线程。 

如何创建 web worker： 

1. 检测浏览器对于 web worker 的支持性 
2. 创建 web worker 文件（js，回传函数等） 
3. 创建 web worker 对象

## 离线存储

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

HTML5 的离线存储是基于一个新建的 `.appcache` 文件的缓存机制，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

### 使用方法

创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：

```html
<html lang="en" manifest="index.manifest" >
```

在 `index.manifest` 文件中编写需要离线存储的资源：

```
CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resourse/logo.png
    FALLBACK:
    / /offline.html
```

- CACHE: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。
- NETWORK: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。
- FALLBACK: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html 。

离线状态时，操作 `window.applicationCache` 进行离线缓存的操作。

### 更新缓存

* 更新 manifest 文件

* 通过 javascript 操作

* 清除浏览器缓存

### 注意事项

* 浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。

* 如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。

* 引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。

* FALLBACK 中的资源必须和 manifest 文件同源。

* 当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。

* 站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。

* 当 manifest 文件发生改变时，资源请求本身也会触发更新。

### 管理和加载

- 在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件。
  - 如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。
  - 如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器会直接使用离线存储的资源。

## iframe

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

### 优点

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

### 缺点

- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

## label 属性的作用

label 标签来定义表单控件的关系：当用户选择 label 标签时，浏览器会自动将焦点转到和 label 标签相关的表单控件上。

```html
<label for="mobile">Number:</label>
<input type="text" id="mobile"/>
```

```html
<label>Date:<input type="text"/></label>
```

## canvas 和 svg

矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。

矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

### svg

SVG 可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的 2D 图形的语言，SVG 基于XML就意味着 SVG DOM 中的每个元素都是可用的，可以为某个元素附加 Javascript 事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

### canvas

Canvas是画布，通过 Javascript 来绘制 2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

## head 标签

`<head>` 标签用于定义文档的头部，它是所有头部元素的容器。

`<head>` 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

可以用在 head 部分：`<base>`, `<link>`, `<meta>`, `<script>`, `<style>`, `<title>`。

`<title>` 定义文档的标题，它是 head 部分中唯一必需的元素。 

## 渐进增强、优雅降级

### 定义

渐进增强（progressive enhancement）：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。

优雅降级 graceful degradation： 一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

### 区别

优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；
渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要；

降级意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带。

“优雅降级” 观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。 在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。 

“渐进增强”观点则认为应关注于内容本身。内容是建立网站的诱因，有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo 所采纳并用以构建其 “分级式浏览器支持 (Graded Browser Support)” 策略的原因所在。

## drag API 

- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。 
- drag：事件主体是被拖放元素，在正在拖放被拖放元素时触发。 
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。 
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。 
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。 
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。 
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

