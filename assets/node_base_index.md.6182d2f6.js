import{_ as n,o as e,c as a,Q as o}from"./chunks/framework.88002d8f.js";const f=JSON.parse('{"title":"Node","description":"","frontmatter":{},"headers":[],"relativePath":"node/base/index.md","filePath":"node/base/index.md"}'),t={name:"node/base/index.md"},r=o(`<h1 id="node" tabindex="-1">Node <a class="header-anchor" href="#node" aria-label="Permalink to &quot;Node&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>【Node】学习</p><h2 id="nodejs是什么" tabindex="-1">NodeJS是什么？ <a class="header-anchor" href="#nodejs是什么" aria-label="Permalink to &quot;NodeJS是什么？&quot;">​</a></h2><pre><code>NodeJS 是一个基于chrome V8 引擎的JavaScript运行环境。
NodeJS 使用了一个事件驱动、非阻塞 I/O 的模型，使其轻量又高效。

JavaScript运行环境：window
NodeJS运行环境：服务端
</code></pre><h3 id="基础知识" tabindex="-1">基础知识 <a class="header-anchor" href="#基础知识" aria-label="Permalink to &quot;基础知识&quot;">​</a></h3><pre><code>前端 ：
    浏览器：HTML、CSS、JS
    Android：JAVA、Python、C++、C#
    IOS：C++、Object-c
后端 ：
    linux系统：
        JAVA、C++、Python、C++、C#、NodeJS、PHP

计算机语言：HTML（标记语言）

编程语言：HTML不是编程语言
    1. 机器语言（机器码、原生码） 低级语言
    2. 汇编语言（面向处理器） 低级语言
    3. 高级语言（可读性更强）
</code></pre><h3 id="编译过程" tabindex="-1">编译过程 <a class="header-anchor" href="#编译过程" aria-label="Permalink to &quot;编译过程&quot;">​</a></h3><pre><code>JS预编译（AO）：

1. 寻找形参和变量声明
2. 实参值赋值给形参
3. 寻找函数声明
4. 执行函数，赋值   


编译步骤

1. 词法分析（分词 tokenizing）
    a. 关键字 var function
    b. 标识符 var a = 1;  function test () {}
    c. 分界符 （）、；、‘ ’、{}  划分界限
    d. 运算符 + - * /  ^ (按位 异或运算)  |（按位或） || &amp;（按位与） &amp;&amp;  
2. 语法分析（parsing）：语法树、树、数组、栈、堆
    语法抽象树（Abstract Syntax Tree）（非线性结构）
3. 语义分析（代码生成）（AST）-&gt; （目标平台 -- 操作系统）可执行的代码 -&gt; 二进制码（机器码）

NodeJS 和 JS 不是一种语言    

前端对象 -&gt; 浏览器
后端 不限于浏览器
</code></pre><h3 id="i-o-input-output" tabindex="-1">I/O input/output <a class="header-anchor" href="#i-o-input-output" aria-label="Permalink to &quot;I/O  input/output&quot;">​</a></h3><pre><code>硬盘、内存

关系型数据库（MySQL 磁盘）
非关系型数据库（mongoDB、redis）

I/O 操作 非常费时、内存 ns（纳秒） 10E - 9s           GB/S  每秒可执行30亿条指令
                  硬盘 ms（毫秒） 10E - 3s  100w倍   MB/S   

阻塞IO：等待IO完成，才进行下一步操作
非阻塞IO：不等待IO操作完成，直接进行下一步操作

异步非阻塞IO模型

IO 密集：文件操作、HTTP网络操作、数据库操作
CPU 密集（集群：压缩、解压、加密、解密（图形计算）
</code></pre><h3 id="node-1" tabindex="-1">Node <a class="header-anchor" href="#node-1" aria-label="Permalink to &quot;Node&quot;">​</a></h3><pre><code>2009.3 Ryan dahl （Node之父） C++ 

NodeJS Web.js 

单线程；
1. 多核CPU 性能浪费 
2. 阻塞代码运行
</code></pre><p>​<br> Node不是单线程的，是多线程的。由一个主线程，实现多线程的方式、child_process</p><pre><code>组成部分：V8引擎、Libuv（c++模块）

Node应用：Pomelo游戏框架。一个快速的、可扩展的、JS分布式游戏服务器框架。
</code></pre><h2 id="后端分层" tabindex="-1">后端分层 <a class="header-anchor" href="#后端分层" aria-label="Permalink to &quot;后端分层&quot;">​</a></h2><pre><code>1. web层（controller）：权限验证、封装、用户提示
2. 服务层（业务逻辑层 service）：LoginService
3. DAO（data access object）：数据操作层面
4. 持久层；数据库；（MySQL、Oracle、DB2），（MongoDB、redis、HBase）
</code></pre><h2 id="commonjs-模块化规范" tabindex="-1">CommonJS 模块化规范 <a class="header-anchor" href="#commonjs-模块化规范" aria-label="Permalink to &quot;CommonJS 模块化规范&quot;">​</a></h2><pre><code>1. 一个文件是一个模块，拥有一个单独的作用域
2. 普通方式定义的变量，函数，对象，都属于模块内部
3. require()
4. export module.export

(function (xxx, require, module,  __filename, _dirname){
    
})

node REPL（read Eval Print Loop）（交互式解释器）

核心模块 require(&#39;fs&#39;); 
文件模块 require(&#39;./index.js&#39;) require(&#39;./index&#39;)   ./、/、../ 
        .js -&gt; .json -&gt; node 


npm i chalk -D  
npm init
npm i jquery -D
</code></pre><h2 id="依赖寻找" tabindex="-1">依赖寻找 <a class="header-anchor" href="#依赖寻找" aria-label="Permalink to &quot;依赖寻找&quot;">​</a></h2><pre><code>1. node_modules -&gt; chalk -&gt; package.json 
                -&gt; main: &quot;xxx&quot;（index.js index.json index.node）
                -&gt; 依次往上找 node_modules
</code></pre><h2 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;package.json&quot;">​</a></h2><pre><code>bin：二进制目录
lib：存放javascript代码
doc：存放文档的目录
test：存放单元测试的代码

package.json 包描述文件 

    name 包名称 
    version 版本号
    description 包描述
    keywords 关键字
    maintainers 包维护者
    contributors 社区贡献者
    licenses 许可证
    dependencies 依赖
    devDependcies 生产依赖 
    homepage 主页
    bin 脚本
    scripts 脚本说明对象
    main 入口文件 
        os 操作系统 [&quot;linux&quot;, &quot;windows&quot;, &quot;macos&quot;, &quot;aix&quot;, &quot;freesd&quot;, &#39;vxworks&#39;]
        cpu 处理器
        engines 执行引擎
        bugs 

1.2.0（大版本.次要版本.小版本）

&gt;= 1.0.3 等于或者大于当前版本 
&lt;= 1.0.3 等于或者小于当前版本
^1.0.3 插入号 不低于当前版本，同时不能改变大版本号
~1.0.3 大版本号以及次要版本号不能改变
</code></pre><h2 id="npm-包" tabindex="-1">npm 包 <a class="header-anchor" href="#npm-包" aria-label="Permalink to &quot;npm 包&quot;">​</a></h2><pre><code>三部分：网站、注册表（registry）、命令行工具（cli）

npm install npm -g 安装

npm -h 、npm --help、npm -H、npm -?  帮助 

npm i xxx --save、npm i xxx -S、
npm i xxx -D、
npm i xxx -g

npm uninstall xxx 

npm init -y （省略问答）

npm --version、npm -v、 查看版本

npm install 

npm root -g 查看全局安装目录 -&gt; C:\\Users\\月落\\AppData\\Roaming\\npm\\node_modules

npm ls 查看已安装包信息
npm ls chalk 查看具体包信息

npm info chalk 查看包详细信息
</code></pre><h2 id="buffer-缓冲器" tabindex="-1">buffer 缓冲器 <a class="header-anchor" href="#buffer-缓冲器" aria-label="Permalink to &quot;buffer 缓冲器&quot;">​</a></h2><pre><code>NodeJS API的一部分，用于在TCP流、文件系统操作、以及其他上下文于八位字节流进行交互。

Buffer用来读取或者操作二进制流的机制 bit Byte  8bit = 1字节 

字符集：unicode码   
字符编码：utf-8 (1或4) utf-32  utf-16 (JS中默认的编码方式 2或4)

utf-8 一般以3个字节表示一个字符 最多4个字节表示一个字符

node中 buffer默认编码方式是utf-8

buffer 是基于slab（动态内存管理系统）实现的

1. buffer操作二进制流
2. 实例类似于整数（0-255 用16进制的方式）数组，大小是固定的
3. buffer 是V8堆外部的固定大小的原始内存分配 
   node的buffer是通过c++实现的、不是通过javascript实现的
   slab 动态内存管理机制、类unix系统实现 FreeBSD linux
   node代码不是在V8中申请的，是node中c++层面实现的

const buf = new Buffer(); 已废弃 不安全的
 创建出的Buffer实例分配的内存是未经初始化的，并且可能包含敏感数据。
 此类Buffer随后必须被初始化，可以使用buf.fill(0)的方式填满整个Buffer.
 虽然可以提高性能，开发经验表明，创建一个快速但并未初始化的Buffer与创建一个
 速度更慢但更安全的Buffer之间需要一个明确的划分。

编码字符集：
 目前node支持6种编码方式、可使用iconv、iconv-lite 支持不同编码方式（npm）
 ascii 仅适用于7位ASCII数据。此编码速度很快，如果设置会剥离高位。
 utf8 多字节编码的Unicode字符。许多网页和其他文档格式都使用UTF-8。
 utf16le 2或4个字节，小端序编码的Unicode字符。支持代理（U+10000至U+10FFFF）
 ucs2 utf16le的别名
 base64 Base64编码，当从字符串创建Buffer时，此编码也是正确接受RFC4648第5节中指定的&quot;URL和文件名安全字母&quot;
 latin1 一种将Buffer编码成单字节编码字符串的方法
 binary latin1的别名
 hex 将每个字节编码成两个十六进制的字符
</code></pre><h2 id="net-模块" tabindex="-1">net 模块 <a class="header-anchor" href="#net-模块" aria-label="Permalink to &quot;net 模块&quot;">​</a></h2><pre><code>5层网络协议
    1. 应用层：http（TCP协议 80）、FTP协议（文件传输协议 21）、SMTP（邮件传输协议 邮件发送 25）、POP3（110）、DNS
    2. 传输层（运输层）协议：TCP（一对一）、UDP（广播）
    3. 网络层：IP、ICMP 
    4. 数据链路层：PPP、SLIP
    5. 物理层：ISO2110（规范） 

TCP/IP
    包含4部分，不仅仅是TCP、IP
    包含引用层、传输层、网络层、...

    GET/test?param=xxx? HTTP/1.1 (http协议定义、报文格式)

    net模块 可以扮演 客户端 服务端 socket

    socket 套接字
</code></pre><h2 id="path-模块" tabindex="-1">path 模块 <a class="header-anchor" href="#path-模块" aria-label="Permalink to &quot;path 模块&quot;">​</a></h2><pre><code>posix（类unix系统）、windows
</code></pre><h2 id="events-事件驱动模块-事件触发器" tabindex="-1">events 事件驱动模块（事件触发器） <a class="header-anchor" href="#events-事件驱动模块-事件触发器" aria-label="Permalink to &quot;events 事件驱动模块（事件触发器）&quot;">​</a></h2><pre><code>    node核心API构建于惯用的异步事件驱动架构，其中某些类型的对象（触发器，Emitter）
会触发命名事件调用函数（监听器，Listener）。

Example：
    net.Server 会在每次都有新连接时触发事件
    fs.ReadStream 会在打开文件时触发事件
    stream 会在数据可读时触发事件
    =&gt; 所有能触发事件的对象都是EventEmitter类的实例。

前后端事件模型区别：

 1. 后端继承自EventEmitter的实例、前端DOM元素
 2. 后端事件名称自定义、前端命名通过协议的方式
 3. 后端通过emit的方式触发、前端需要通过相应的UI操作来触发
</code></pre><h2 id="fs-文件系统" tabindex="-1">fs 文件系统 <a class="header-anchor" href="#fs-文件系统" aria-label="Permalink to &quot;fs 文件系统&quot;">​</a></h2><pre><code>fs模块提供了一个API，用于以模仿标准POSIX函数的方式与文件系统进行交互.

error-first 错误优先原则 如果错误没有发生，error值为null或者undefined

异步读取与同步读取：
    异步IO不会阻塞线程、同步会阻塞线程
</code></pre><h2 id="process-进程" tabindex="-1">process 进程 <a class="header-anchor" href="#process-进程" aria-label="Permalink to &quot;process 进程&quot;">​</a></h2><pre><code>process 全局对象

事件循环: 主线程运行时,会产生对应的堆栈.
    Call Stack 调用栈
    WebAPIs 外部线程、异步线程
    Callback Quene 事件队列
    Event Loop 事件轮询

宏任务、微任务

    全局执行的任务就是宏任务、主要处理相应回调
    微任务：promise

    宏任务：主线程中按序执行 task -&gt; task  回调函数、XHR回调、setTimeout、setIntval、U/I rending、I/O、setImmidate(node中独有)
    微任务：task 完成之后，插入进来 promise、process.nextTick(node中独有)

    new Promise((resolve, reject) =&gt; {
        console.log(&#39;宏任务&#39;);
    })
        .then(() =&gt; {
            console.log(&#39;微任务&#39;);
        })
        .catch(() =&gt; {
            console.log(&#39;微任务&#39;);
        })

Promise.resolve().then() 微任务 

node 事件循环、借助libuv实现
        node.js启动后，会初始化事件轮询. 处理已提供的输入脚本，它可能会调用一些异步的API函数调用，
    安排任务处理事件，或者调用process.nextTick(),然后开始事件循环.

   1 timers
   2 pending callbacks                  incoming
   2 idle, prepare      connections    
   2 poll                               data etc
   3 check
   4 close callbacks

   每一个循环都是一个tick  tick-tick

   每次运行的事件循环之间，Node.js检查它是否在等待任何异步I/O或计时器，如果没有的话，则关闭干净.
</code></pre><h2 id="http" tabindex="-1">http <a class="header-anchor" href="#http" aria-label="Permalink to &quot;http&quot;">​</a></h2><pre><code>npm i nodemon -save-dev 自动检测执行
</code></pre><h2 id="express" tabindex="-1">express <a class="header-anchor" href="#express" aria-label="Permalink to &quot;express&quot;">​</a></h2><p>npm init -y</p><p>npm install nodemon --save-dev</p><p>npm install express --save</p><p>npm install body-parser --save</p><p>npm install ejs pug express-handlebars --save</p><p>npm install express-handlebars@3.0 --save</p><p>npm install mysql2 --save</p><p>npm install sequelize --save</p><h2 id="sequelize" tabindex="-1">Sequelize <a class="header-anchor" href="#sequelize" aria-label="Permalink to &quot;Sequelize&quot;">​</a></h2><p>ORM框架（Object-Relational Mapping）框架，对象关系映射</p><p>模型 -&gt; 创建实例 -&gt; 查询 -&gt; 关系</p>`,51),i=[r];function s(d,c,l,p,h,u){return e(),a("div",null,i)}const b=n(t,[["render",s]]);export{f as __pageData,b as default};
