# Web 协议详解与抓包实战

## 概述

以 TCP/IP 协议栈为依托，自上而下、从应用层至基础设施介绍：

* 应用层
  * HTTP/1.1
  * WebSocket
  * HTTP/2.0
* 应用层的安全基础设施
  * TLS/SSL
* 传输层
  * TCP
* 网际层及链接层
  * IP 层和以太网

## 一、HTTP/1.1 协议

### HTTP 协议

HTTP（Hypertext Transfer Protocol） 是一种无状态的、应用层的，以请求，应答方式运行的协议，它使用可扩展的语义和自描述消息格式，与基于网络的超文本信息系统灵活的互动。

> a **stateless** application-level **request/response** protocol that uses **extensible semantics** and **self-dscriptive** message payloads for flexible interaction with network-based **hypertext information** systems。（RFC7230 ）

###HTTP 消息格式

#### HTTP 协议格式

请求体

```js
GET / HTTP/1.1
Host: yueluo.club
```

响应体

```js
HTTP/1.1 200 OK
Date: Wed, 19 May 2021 13:29:00 GMT
Content-Type: application/octet-stream
Transfer-Encoding: chunked
Connection: keep-alive
```

#### ABNF（扩充巴科斯-瑙尔范式）

定义语法的元语言。包括两部分，操作符和核心规则。

**操作符**

* 空白字符：用来分割定义中的各个元素
  * method SP request-target SP HTTP-version CRLF
* 选择 /：表示多个规则都是可供选择的规则
  * start-line = request-line / status-line
* 值范围 %c##-##
  * "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" 与 OCTL = %x30-37 等价
* 序列组合 ()：将规则组合起来，视为单个元素
* 不定量重复 m * n
  * `*` 元素标识零个或更多元素  *(header-field CRLF)
  * 1* 元素表示一个或更多元素，2*4 元素表示两个至四个元素
* 可选序列 []
  * [message-body]

**核心规则**

[ABNF(Augmented BNF) 官方文档](https://time.geekbang.org/course/detail/100026801-93589)

<img src="./images/rule.png" />

#### 基于 ABNF 描述的 HTTP 协议格式

<img src="./images/layout.png" />

```js
telnet www.taohui.pub 80
```

```js
GET /wp-content/plugins/Pure-Highlightjs_1.0/assets/pure-highlight.css?ver=0.1.0 HTTP/1.1

Host:www.taohui.pub
```

### 网络为什么要分层

#### OSI 概念模型

OSI（Open System Interconnction Reference Model）概念模型。

> OSI 是概念模型，并没有被实现。

<img src="./images/osi_model.png" />

#### OSI 概念模型与 TCP/IP 模型对照

<img src="./images/tcp_ip.png" />

#### 报文头部



<img src="./images/message.png" />

### HTTP 解决的问题

#### Roy Thomas Fielding 与 HTTP/1.1

* 参与指定 HTTP/1.0 规范（1996.5）
* 参与制定 URI 规范（1998.8）
* 主导制定 HTTP/1.1 规范（1999.6）
* 2000 年发布指导 HTTP/1.1 规范制定的论文
  * 《Architectural Style and the Design of Network-based Software Architectures》，即我们常谈的 Representational State Transfer（REST）架构
* Apache 基金会（The Apache Software Foundation）共同创始人
  * 参与开发 Apache httpd 服务

#### Form Follows Function

HTTP 协议为什么是现在这个样子？

* HTTP 协议
  * Roy Thomas Fielding：HTTP 主要作者，REST 架构作者
* URI：统一资源标识符



<img src="./images/get.png" />

#### HTTP 解决了什么问题？

万维网创始人：蒂姆 伯纳斯 - 李。

人与机器之间可以通信，交换共享信息。

> Web's major goal was to be a shared information space through which people and machines could communicate.  --Tim Berners Lee

**解决 WWW 信息交互比较面对的需求：**

* 低门槛
* 可扩展性：巨大的用户群体，超长的寿命
* 分布式系统下的 Hypermedia：大粒度数据的网络传输
* Internet 规模
  * 无法控制的 scalability（可伸缩性）
    * 不可预测的负载、非法格式的数据、恶意消息
    * 客户端不能保持所有服务器信息，服务器不能保持多个请求间的状态信息
  * 独立的组件部署：新老组件并存
* 向前兼容：自 1933 年起 HTTP0.9\1.0（1996）已经被广泛使用

### Web 架构的七大关键属性

#### 评估 Web 架构的关键属性

HTTP 协议应当在以下属性中取得可接受的均衡：

1. 性能 performance：影响高可用的关键因素

2. 可伸缩性 Scalability：支持部署可以互相交互的大量组件

3. 简单性 Simplicity：易理解、易实现、易验证

4. 可见性 Visiable：对两个组件间的交互进行监视或者仲裁的能力，如缓存、分层设计等

5. 可移植性 Portability：在不同的环境下运行的能力

6. 可靠性 Reliability：出现部分故障时，对整体影响的程度

7. 可修改性 Modifiability：对系统作出修改的难易程度，由可进化性、可定制性、可扩展性、可配置性、可重用性构成

#### 架构属性：性能

* 网络性能 Network Performance
  * Throughput 吞吐量：小于等于带宽 bandwidth
  * Overhead 开销：首次开销，每次开销
* 用户感知到的性能 User-perceived Performance
  * Latency 延迟：发起请求都接收响应的时间
    * 用户发起动作的感知
    * 建立连接
    * 发送请求、接收请求
    * 将响应展现给用户
  * Completion 完成时间：完成一个应用动作所花费的时间
* 网络效率 Network Efficiency
  * 重用缓存、减少交互次数、数据传输距离更近、COD

#### 架构属性：可修改性

* 可进化性 Evolvability：一个组件独立升级而不影响其他组件
* 可扩展性 Extensibillty：向系统添加功能，而不会影响到系统的其他部分
* 可定制性 Customizability：临时性、定制性地更改某一要素来提供服务，不对常规客户产生影响
* 可配置性 Configuability：应用部署后可通过修改配置提供新的功能
* 可重用性 Reusabilit：组件可以不做修改在其他应用在使用

#### Rest 架构下的 Web



<img src="./images/rest.png" />

### 架构风格推导出 HTTP 的 REST 架构

#### 5 种架构风格

* 数据流风格 Data-flow Styles
  * 优点：简单性、可进化性、可扩展性、可配置性、可重用性
  * Nginx 、协议分层都是数据流风格
* 复制风格 Replication Styles
  * 优点：用户可察觉的性能、可伸缩性，网络效率，可靠性也可以提到提升
* 分层风格 Hierarchical Styles
  * 优点：简单性、可进化性、伸缩性
* 移动代码风格 Mobile Code Styles
  * 优点：可移植性、可扩展性、网络效率
* 点对点风格 Peer-to-Peer Styles
  * 优点：可进化性、可重用性、可扩展性、可配置性

#### 数据流风格 Data-flow Styles

管道与过滤器 Pipe And Filter，PF

每个 Filter 都有输入端和输出端，只能从输入端读取数据，处理后再从输出端产生数据

<img src="./images/PF.png" />

**统一接口的管道与过滤器 Uniform Pipe And Filter，UDF**

在 PF 上增加了统一接口的约束，所有 Fiter 过滤器必须具备同样的接口

<img src="./images/PF_with_UPF.png" />

#### 复制风格 Replication Styles

**复制仓库 Replicated Repository，RR**

多个进程提供相同的服务，通过反向代理对外提供集中服务

> MySQL 冷热备份、Web Application 反向代理等等

**缓存 $**

RR 的变体，通过复制请求的结果，为后续请求复用

<img src="./images/RR.png" />



<img src="./images/RR_with_$.png" />

#### 分层风格 Hierarchical Styles

* 客户端服务器 Client-Server，CS
  * 由 Client 触发请求，Server 监听到请求后产生响应，Client 一直等待收到响应后，会话结束
  * 分离关注点隐藏细节，良好的简单性、可伸缩性、可进化性
* 分层系统 Layered System，LS
  * 每一层为其之上的层服务，并使用在其之下的层提供的服务，例如 TCP/IP
* 分层客户端服务器 Layered Client-Server，LCS
  * LS + CS，例如正向代理和反向代理，从空间上分为外部层和内部层
* 无状态、客户端服务器 Client-Stateless-Server CSS
  * 基于 CS，服务器上不允许有 session state 会话状态
  * 提升了可见性、可伸缩性、可靠性，但重复数据导致降低网络性能
* 缓存、无状态、客户端服务器 Client-Cache-Stateless-Server C$SS
  * 提升性能
* 分层、缓存、无状态、客户端服务器 Layered-Client-Stateless-Server LC$SS



<img src="./images/LC$SS.png" />

* 远程会话 Remote Session，RS
  * CS 变体，服务器保存 Application state 应用状态
  * 可伸缩性、可见性差
  * 例如 FTP 。
* 远程访问 Remote Data Access，PDA
  * CS 变体，Application state 应用状态同时分布在客户端与服务器
  * 巨大的数据集有可能通过迭代而减少
  * 简单性、可伸缩性差

> 在 Rest 风格架构中，远程会话和远程访问并没有使用到。



<img src="./images/HS.png" />



#### 移动代码风格 Mobile Code Styles

* 虚拟机 Virtual Machine，VM
  * 分离指令与实现
* 远程求值 Remote Evaluation，REV
  * 基于 CS 的 VM，将代码发送至服务器执行
* 按需代码 Code On Demand，COD
  * 服务器在响应中发回处理代码，在客户端执行
  * 优秀的可扩展性和可配置性，提升用户可察觉性能和网络效率
  * JavaScript 就是 COD 架构风格。
* 分层、按需代码、缓存、无状态、客户端服务器 
  * Layered-Code-on-Demand-Client-Cache-Stateless-Server，LCODC$SS
  * LC$SS + COD
* 移动代理 Mobile Agent，MA
  * 相当于 REV + COD

<img src="./images/LC$SS_with_COD.png" />

代码与执行过程或者执行过程分离，例如 Javascript。

<img src="./images/mobile_code_styles.png" />

#### 点对点风格 Peer-to-Peer Styles

* Event-based Integration，EBI
  * 基于事件集成系统，如由类似 Kafka 这样的消息系统 + 分发订阅来消除耦合
  * 优秀的可重用性、可扩展性、可进化性
  * 缺乏可理解性
  * 由于消息广播等因素造成的消息风暴，可伸缩性差
* Chiron-2，C2
  * 相当于 EBI + LCS，控制了消息的方向
* Distribute Objects，DO
  * 组件结对交互
* Brokered Distributed Objects，BDO
  * 引入名字解析组件来简化 DO，例如 CORBA

**Rest 风格中没有使用点对点风格。**

<img src="./images/peer_to_peer_styles.png" />

#### Rest 架构风格演化



<img src="./images/rest_styles.png" style="zoom: 80%" />

### 如何使用 Network 面板

#### Chome 抓包

https://developers.google.com/web/tools/chrome-devtools/network/

快捷键：Control + shift + i （windows）、Command + Option + I（Mac）

<img src="./images/chrome_network.png" />

* 控制器：控制面板的外观与功能
* 过滤器：过滤请求列表中显示的资源
  * 按住 Command（Mac）或 Ctrl （Windows/Linux），然后点击过滤器可以同时选择国歌过滤器
* 概览：显示 HTTP 请求、响应的时间轴
* 请求列表：默认时间排序，可选择显示列
* 概要：请求总数、总数据量、总花费时间等

#### 控制器

* 抓包 
* 停止抓包
* 清除请求
* 跨页面加载保存请求：Preserve log
  * 所有的浏览器请求是以 log 的方式存储在浏览器上的，Preserve log 可以在页面跳转后，保留上一个页面的 log。
* 屏幕截图：Capture screenshots
* 重新执行 XHR 请求：右键点击请求选择 Replay XHR
* 停用浏览器缓存
* 手动清除浏览器缓存：右键点击请求选择 Clear Browser Cache
* 离线模拟：Offine
* 模拟慢速网络连接：Network Throttling，可自定义网速
  * Custom - Add - Add custom profile...
    * Profile Name
    * Download、Upload、Latency
* 手动清除浏览器 Cookie：右键点击请求 Clear Browser Cookies
* 隐藏 Filters 窗格
* 隐藏 Overview 窗格

#### 过滤器：按类型

* XHR、JS、CSS、Img、Media、Font、Doc、WS（WebSocket）、Manifest 或 Other （此处未列出的任何其他类型）
* 多类型，Command（Mac）或 Ctrl （Windows、Linux）
* 按时间过滤：概览面板，拖动滚动条
* 隐藏 Data URLs：CSS 图片等小文件以 BASE64 格式嵌入 HTML 中，以减少请求数

#### 过滤器：属性过滤

* domain：仅显示来自指定域的资源。可以使用通配字符（*）纳入多个域
* has-response-header：显示包含指定 HTTP 响应标头的资源
* is：使用 is:running 可以查找 WebSocket 资源，is:form-cache 可查找缓存读出的资源
* larger-than：显示大于指定大小的资源（以字节为单位）。将值设为 1000 等同于设置为 1K
* method：显示通过指定 HTTP 方法类型检索的资源
* mine-type：显示指定 MIME 类型的资源

多属性间通过空格实现 AND 操作。

```js
domain:*.yueluo.club method:GET
```

* mixed-content：显示所有混合内容资源（mixed-content:all），或者仅显示当前显示的资源（mixed-content:displayed）
* scheme：显示通过未保护 HTTP（scheme:http）或受保护 HTTPS（scheme:https）检索的资源
* set-cookie-domain：显示具有 Set-Cookie 标头并且 Domain 属性与指定资源匹配的资源
* set-cookie-name：显示具有 Set-Cookie 标头并且名称与指定值匹配的资源
* set-cookie-value：显示具有 Set-Cookie 标头并且值与指定值匹配的资源
* status-code：仅显示 HTTP 状态代码与指定代码匹配的资源

#### 请求列表

* Name：资源名称
* Status：HTTP 状态码
* Type：请求的资源的 MIME 类型
* Initiator：发起请求的对象或进程，可以有以下取值
  * Parse（解释器）：Chrome 的 HTML 解析器发起请求
    * 鼠标悬停显示 JS 脚本
  * Redirect（重定向）：HTTP 重定向启动请求
  * Script（脚本）：脚本启动请求
  * Other（其他）：一些其他进程或动作发起请求，例如用户点击链接跳转到页面或在地址栏中输入网址
* Size：服务器返回的响应大小（包括头部和包体），可显示解压后大小
* Time：总持续时间，从请求的开始到接收响应中的最后一个字节
* Waterfall：各请求相关活动的直观分析图
* 添加其他列
  * 添加响应列
* 添加自定义列



<img src="./images/manager_header.png" />



#### 请求列表排序

* 时间排序（默认）

* 按列排序

* 按活动时间排序

  * StartTime：发出的第一个请求位于顶部
  * Response Time：开始下载的第一个请求位于顶部
  * EndTime：完成的第一个请求位于顶部
  * Total Duration：连接设置时间和请求/响应时间最短的请求位于顶部
  * Latency：等待最短响应时间的请求位于顶部


#### 预览请求内容

 * 查看头部
 * 查看 Cookie
 * 预览响应报文：查看图像
 * 查看响应正文
 * 时间详细分布
 * 导出数据为 HAR 格式
 * 查看未压缩后的资源大小：Use Large Request Rows
 * 浏览器加载时间（概览、概要、请求列表）
    * DOMContendLoaded 事件的颜色设置为蓝色，而 load 事件设置为红色
* 将请求数据复制到剪贴板
  * Copy Link Address：将请求的网址复制到剪贴版
  * Copy Response：将响应包体复制到剪贴版
  * Copy as cURL：以 cURL 命令形式赋值请求
  * Copy Al as cURL：以一系列 cURL 命令形式复制所有请求
  * Copy All as HAR：以 HAR 数据形式复制所有请求
* 查看请求上下游：按住 shift 键悬停请求上，绿色是上游，红色是下游

#### 浏览器加载时间

* 触发流程
  * 解析 HTML 结构
  * 加载外部脚本和样式文件
  * 解析并执行脚本代码（部分脚本会阻塞页面加载）
  * DOM 树构建完成（DOMContentLoaded 事件）
  * 加载图片等外部文件
  * 页面加载完毕（load 事件）

#### 预览请求内容：timing

* Queueing：浏览器在以下情况下对请求排队
  * 存在更高优先级的请求
  * 此源已打开六个 TCP 连接，达到限值，仅适用于 HTTP/1.0 和 HTTP/1.1
  * 浏览器正在短暂分配磁盘中的空间
* Stalled：请求可能会因 Queueing 中描述的任何原因而停止
* DNS Lookup：浏览器正在解析请求的 IP 地址
* Proxy Negotiation：浏览器正在与代理服务器协商请求
* Request sent：正在发送请求
* ServiceWorker Preparation：浏览器正在启动 Service Worker
* Request to ServiceWorker：正在将请求发送到 Service Worker
* Waiting（TTFB）：浏览器正在等待响应的第一个字节。TTFB 表示 Time To First Byte（至第一字节的时间）。此时间包括 1 次往返延迟时间及服务器准备响应所有的时间
* Content Download：浏览器正在接收响应
* Reveiving Push：浏览器正在通过 HTTP/2 服务器推送接收此类型的数据
* Reading Push：浏览器正在读取之前收到的本地数据



<img src="./images/preview.png" />

### URI 的基本格式

#### 当没有 URI 时

站长 A 想要分享一部电影给 B，需要告诉：

* 请使用 FTP 访问 mysite.net，端口是 8502
* 登录用户名是 user，密码 pass
* 进入到 /shared/movie 目录下
* 转换为二进制模式
* 下载名为 xxx.mkv 格式的文件

有了 URI：ftp://user:pass@yueluo.club:8502/shared/movie/xxx.mkv

#### 什么是 URI

* URL：RFC1738（1994.12），Uniform Resource Locator，表示资源的位置，期望提供查找资源的方法

* URN：RFC2141（1997.5），Uniform Resource Name，期望为资源提供持久的、位置无关的标识方法，并允许简单地将多个命名空间映射到单个 URN 命名空间。
  * 例如磁力链接：magnet:?xt=urn:sha1:YNCKHTQC5C
* URI：RFC1630（1994.6）、RFC3986（2005.1，取代 RFC2396 和 RFC2732），Unform Resource Identifier，用以区分资源，是 URI 和 URN 的超级，用以取代 URL 和 URN 概念。

#### URI 

Uniform Resource Identifier 统一资源标识符

* Resource 资源
  * 可以是图片、文档、今天的温度等，也可以是不能通过互联网访问的实体，例如人、公司、实体书，也可以是抽象的概念，例如亲属关系或者符号
  * 一个资源可以有多个 URI
* Identifier 标识符
  * 将当前资源与其他资源区分开的名称
* Uniform 统一
  * 允许不同种类的资源在同一上下文出现
  * 对不同种类的资源标识符可以使用同一种语义进行解读
  * 引入新标识符时，不会对已有标识符产生影响
  * 允许同一资源标识符在不同的，internet 规模下的上下文中出现

#### URI 的组成

组成：schema、user information、host、port、path、query、fragment

<img src="./images/uri.png" />

<img src="./images/uri02.png" />

#### URI 格式

* URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ] 
* scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." ) 
  * 例如：http, https, ftp,mailto,rtsp,file,telnet 
* query = *( pchar / "/" / "?" ) 
* fragment = *( pchar / "/" / "?" ) 

https://tools.ietf.org/html/rfc7231?test=1#page=-7

**hier-part**

hier-part = "//" authority path-abempty / path-absolute / path-rootless / path-empty 

* authority = [ userinfo "@" ] host [ ":" port ] 
  * userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
  * host = IP-literal / IPv4address / reg-name
  * port = *DIGIT 

https://tom:pass@localhost:8080/index.html

**path = path-abempty/ path-absolute/ path-noscheme / path-rootless / path-empty** 

* path-abempty = *( “/” segment )
  * 以/开头的路径或者空路径 
* path-absolute = “/” [ segment-nz *( “/” segment ) ]
  * 以/开头的路径，但不能以//开头
* path-noscheme = segment-nz-nc *( “/” segment )
  * 以非:号开头的路径
* path-rootless = segment-nz *( “/” segment ) 
  * 相对path-noscheme，增加允许以:号开头的路径 
* path-empty = 0<pchar>
  * 空路径

#### 相对 URI

URI-reference = URI/relative-ref

* relative-ref = relative-part [ "?" query ] [ "#" fragment ]
  * relative-part = "//" authority path-abempty / path-absolute / path-noscheme / path-empty

https://tools.ietf.org/html/rfc7231?test=1#page=-7

/html/rfc7231?test=1#page-7

### URI 编码

#### 为什么要进行 URI 编码

* 传递数据中，可以存在用作分隔符的保留字符
* 对可能产生歧义性的数据编码
  * 不在 ASCII 码范围内的字符
  * ASCII 码不可显示的字符
  * URL 中规定的保留字符
  * 不安全字符（传输环节中可能会被不正确处理），如空格、引号、尖括号等

#### 保留字符与非保留字符

* 保留字符
  * reserved = gen-delims / sub-delims
    * gen-delims = ":" / "/" / "?" / "#" / "[" / "]" / "@"
    * sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
* 非保留字符
  * unreserved = ALPHA / DIGIT / "**-**" / "**.**" / "**_**" / "~"
    * ALPHA: %41-%5A and %61-%7A
    * DIGIT: %30-%39 
    * -: %2D .: %2E _: %5F
    * ~: %7E，某些实现将其认为保留字符

#### URI 百分号编码

* 百分号编码的方式

  * pct-encoded = "%" HEXDIG HEXDIG
    * US-ASCII：128 个字符（95 个可显示字符，33 个不可显示字符） 
    * 参见：https://zh.wikipedia.org/wiki/ASCII 
  * 对于 HEXDIG 十六进制中的字母，大小写等价

* 非 ASCII 码字符（例如中文）：建议先 UTF8 编码，再 US-ASCII 编码 

* 对 URI 合法字符，编码与不编码是等价的 

  * 例如，“URI 转换”既可以“URI%e8%bd%ac%e6%8d%a”，也可以 “%55%52%49%e8%bd%ac%e6%8d%a2” 

    * https://www.baidu.com/s?wd=URI%20%e8%bd%ac%e6%8d%a2 
    * https://www.baidu.com/s?wd=%55%52%49%20%e8%bd%ac%e6%8d%a2

### HTTP 的请求行




## 二、WebSocket 协议

## 三、HTTP/2 协议

## 四、TLS/SSL 协议

## 五、TCP 协议

## 六、IP 协议