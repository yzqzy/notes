# JavaScript 逆向

## 抓包工具 Charles

### 概述

* HTTP 抓包工具
* 支持 Windows、Linux、Mac
* 功能
  * 截获请求
  * 过滤请求
  * 重发请求
  * 设置断点
  * 端口转发
  * 反向代理

### 截获请求

测试地址：[https://httpbin.org/#/](https://httpbin.org/#/)

<img src="./images/httpbin.png" />

我们可以使用 [get 请求](https://httpbin.org/get) 进行测试，

<img src="./images/get.png" />

<img src="./images/get02.png" />

### 过滤请求

左下角直接输入域名过滤请求或者在请求域名上面右键选择 Focus 选项。

<img src="./images/get03.png" />

Focus 选中后只显示当前域名，其他域名会被放到 Other Hosts 分组下。

<img src="./images/get04.png" />

### 重发请求

选中请求点击刷新按钮即可。

另外我们可以点击笔的图标进行修改模式，对请求进行修改。

<img src="./images/get05.png" />

### 设置断点

Proxy - Breakpoints Settings

<img src="./images/break_points_01.png" />

<img src="./images/break_points_02.png" />

配置好后，刷新页面就会进入断点调试页面，可以对请求进行编辑。

<img src="./images/break_points_03.png" />

<img src="./images/break_points_04.png" />

### 模拟网速

Proxy - Throttle Settings

<img src="./images/throttle_settings_01.png" />

<img src="./images/throttle_settings_02.png" />

### 反向代理

反向代理相当于在我们发起请求的时候会经过我们配置的代理拿到响应之后再把响应转发给我们的客户端。

 Proxy - Reverse Proxies Settings

<img src="./images/reverse_proxy_01.png" />

<img src="./images/reverse_proxy_02.png" />

这样配置好之后当我们访问本地的 localhost:55619，就会帮我们代理到 httpbin.org，实现本地访问的效果。

<img src="./images/reverse_proxy_03.png" />

除了上述演示效果，还有另外一种反向代理的实现，即在请求链接上右键选择 Map Remote 或者 Map Local，即将请求地址转发到远程地址或者本地地址，实现代理效果。

这样我们就可以篡改浏览器实际的请求，返回我们想返回的内容。

<img src="./images/edit_mapping.png" />

## Chrome 插件 - EditThisCookie

### 概述

Cookie 常见操作

* 查看 Cookies
* 编辑 Cookies（编辑内容或者有效期）
* 删除 Cookies，实现页面退出
* 添加 Cookie，未登录状态下添加某个 Cookie 绕过登录
* 导出导入 Cookie，持久化存储到电脑上

上述需求都可以使用浏览器插件 EditThisCookie 来完成，实现整个 Cookie 的管理。

 ### 安装

[官网地址](https://www.editthiscookie.com/) 

<img src="./images/edit_cookie_01.png" />

<img src="./images/edit_cookie_02.png" />

### 基本使用

可以使用插件弹窗的形式，也可以在开发者工具面板中找到。

<img src="./images/edit_cookie_03.png" />

<img src="./images/edit_cookie_04.png" />

Chrome 其实也自带 Cookie 管理面板，位于 Application - Storage - Cookies。

<img src="./images/edit_cookie_05.png" />

我们修改 Cookie 的 HttpOnly 属性，这样我们就可以使用 `document.cookie` 获取到所有的 Cookie。

<img src="./images/edit_cookie_06.png" />

控制台的面板相对于插件弹窗功能要少一些，使用弹窗使用同时操作所有 Cookie，例如删除所有，导入导出，新增 Cookie 等。

<img src="./images/edit_cookie_07.png" />

## Chrome 插件 - Toggle JavaScript

提供开启和关闭 JavaScript 功能的操作，使我们可以查看没有 JavaScript 代码执行时的页面效果。

## Chrome 插件 - Tampermonkey

### 概述

在浏览器自定义执行 JavaScript 脚本，完成如自动抢票、自动刷单等操作。

### 安装

chrome 浏览器直接搜索 tampermonkey 就可以找到该扩展程序。

<img src="./images/tamper_monkey_01.png" />

管理面板

<img src="./images/tamper_monkey_02.png" />

### 自定义脚本

[脚本编写文档](https://www.tampermonkey.net/documentation.php?ext=dhdg#Q102)

新建脚本

<img src="./images/tamper_monkey_03.png" />

 ```js
 // ==UserScript==
 // @name         test
 // @namespace    https://www.baidu.com/
 // @version      0.1
 // @description  test
 // @author       heora
 // @match        https://www.baidu.com/
 // @grant        none
 // ==/UserScript==
 
 (function() {
     'use strict';
 
     console.log('hello world')
 })();
 ```

保存后效果如下：

<img src="./images/tamper_monkey_04.png" />

这样一个最简单的脚本就已经编写完成。打开百度就可以看到我们脚本并且会在控制台执行我们编写的函数被执行。

<img src="./images/tamper_monkey_05.png" />

<img src="./images/tamper_monkey_06.png" />

我们也可以在控制台看到我们编写的脚本源文件。

<img src="./images/tamper_monkey_07.png" />

### JavaScript 逆向应用

Hook 技术。将原本执行的函数替换成我们自定义的函数，自定义函数会保持原有函数的功能，并为其附加新功能。不改变程序执行效果的前提下，实现自定义的效果。

```js
// ==UserScript==
// @name         HookBase64
// @namespace    http://xxx.com
// @version      0.1
// @description  Hook Base64 encode function
// @author       heora
// @match        http://xxx.com/login
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hook(object, attr) {
      const func = object[attr]

      object[attr] = function() {
        console.log('hooked', object, attr)
        const ret = func.apply(object, arguments)
        debugger
        return ret
      }
    }

    hook(window, 'btoa')
})();
```

原理就是代理方法，对方法进行重写，调试。例如上述代理的 btoa 方法，用于 base64 编码。

## 无限 debugger

