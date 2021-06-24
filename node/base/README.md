# Node

## 介绍

【Node】学习

## NodeJS是什么？

    NodeJS 是一个基于chrome V8 引擎的JavaScript运行环境。
    NodeJS 使用了一个事件驱动、非阻塞 I/O 的模型，使其轻量又高效。
    
    JavaScript运行环境：window
    NodeJS运行环境：服务端

### 基础知识

    前端 ：
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

### 编译过程

    JS预编译（AO）：
    
    1. 寻找形参和变量声明
    2. 实参值赋值给形参
    3. 寻找函数声明
    4. 执行函数，赋值   


    编译步骤
    
    1. 词法分析（分词 tokenizing）
        a. 关键字 var function
        b. 标识符 var a = 1;  function test () {}
        c. 分界符 （）、；、‘ ’、{}  划分界限
        d. 运算符 + - * /  ^ (按位 异或运算)  |（按位或） || &（按位与） &&  
    2. 语法分析（parsing）：语法树、树、数组、栈、堆
        语法抽象树（Abstract Syntax Tree）（非线性结构）
    3. 语义分析（代码生成）（AST）-> （目标平台 -- 操作系统）可执行的代码 -> 二进制码（机器码）
    
    NodeJS 和 JS 不是一种语言    
    
    前端对象 -> 浏览器
    后端 不限于浏览器

###  I/O  input/output

    硬盘、内存
    
    关系型数据库（MySQL 磁盘）
    非关系型数据库（mongoDB、redis）
    
    I/O 操作 非常费时、内存 ns（纳秒） 10E - 9s           GB/S  每秒可执行30亿条指令
                      硬盘 ms（毫秒） 10E - 3s  100w倍   MB/S   
    
    阻塞IO：等待IO完成，才进行下一步操作
    非阻塞IO：不等待IO操作完成，直接进行下一步操作
    
    异步非阻塞IO模型
    
    IO 密集：文件操作、HTTP网络操作、数据库操作
    CPU 密集（集群：压缩、解压、加密、解密（图形计算）

### Node

    2009.3 Ryan dahl （Node之父） C++ 
    
    NodeJS Web.js 
    
    单线程；
    1. 多核CPU 性能浪费 
    2. 阻塞代码运行


​    
    Node不是单线程的，是多线程的。由一个主线程，实现多线程的方式、child_process
    
    组成部分：V8引擎、Libuv（c++模块）
    
    Node应用：Pomelo游戏框架。一个快速的、可扩展的、JS分布式游戏服务器框架。

## 后端分层

    1. web层（controller）：权限验证、封装、用户提示
    2. 服务层（业务逻辑层 service）：LoginService
    3. DAO（data access object）：数据操作层面
    4. 持久层；数据库；（MySQL、Oracle、DB2），（MongoDB、redis、HBase）

## CommonJS 模块化规范

    1. 一个文件是一个模块，拥有一个单独的作用域
    2. 普通方式定义的变量，函数，对象，都属于模块内部
    3. require()
    4. export module.export
    
    (function (xxx, require, module,  __filename, _dirname){
        
    })
    
    node REPL（read Eval Print Loop）（交互式解释器）
    
    核心模块 require('fs'); 
    文件模块 require('./index.js') require('./index')   ./、/、../ 
            .js -> .json -> node 


    npm i chalk -D  
    npm init
    npm i jquery -D

## 依赖寻找

    1. node_modules -> chalk -> package.json 
                    -> main: "xxx"（index.js index.json index.node）
                    -> 依次往上找 node_modules

## package.json 

    bin：二进制目录
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
            os 操作系统 ["linux", "windows", "macos", "aix", "freesd", 'vxworks']
            cpu 处理器
            engines 执行引擎
            bugs 
    
    1.2.0（大版本.次要版本.小版本）
    
    >= 1.0.3 等于或者大于当前版本 
    <= 1.0.3 等于或者小于当前版本
    ^1.0.3 插入号 不低于当前版本，同时不能改变大版本号
    ~1.0.3 大版本号以及次要版本号不能改变

## npm 包


    三部分：网站、注册表（registry）、命令行工具（cli）
    
    npm install npm -g 安装
    
    npm -h 、npm --help、npm -H、npm -?  帮助 
    
    npm i xxx --save、npm i xxx -S、
    npm i xxx -D、
    npm i xxx -g
    
    npm uninstall xxx 
    
    npm init -y （省略问答）
    
    npm --version、npm -v、 查看版本
    
    npm install 
    
    npm root -g 查看全局安装目录 -> C:\Users\月落\AppData\Roaming\npm\node_modules
    
    npm ls 查看已安装包信息
    npm ls chalk 查看具体包信息
    
    npm info chalk 查看包详细信息

## buffer 缓冲器

    NodeJS API的一部分，用于在TCP流、文件系统操作、以及其他上下文于八位字节流进行交互。
    
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
     base64 Base64编码，当从字符串创建Buffer时，此编码也是正确接受RFC4648第5节中指定的"URL和文件名安全字母"
     latin1 一种将Buffer编码成单字节编码字符串的方法
     binary latin1的别名
     hex 将每个字节编码成两个十六进制的字符

## net 模块

    5层网络协议
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

## path 模块 

    posix（类unix系统）、windows

## events 事件驱动模块（事件触发器）

        node核心API构建于惯用的异步事件驱动架构，其中某些类型的对象（触发器，Emitter）
    会触发命名事件调用函数（监听器，Listener）。
    
    Example：
        net.Server 会在每次都有新连接时触发事件
        fs.ReadStream 会在打开文件时触发事件
        stream 会在数据可读时触发事件
        => 所有能触发事件的对象都是EventEmitter类的实例。
    
    前后端事件模型区别：
    
     1. 后端继承自EventEmitter的实例、前端DOM元素
     2. 后端事件名称自定义、前端命名通过协议的方式
     3. 后端通过emit的方式触发、前端需要通过相应的UI操作来触发

## fs 文件系统

    fs模块提供了一个API，用于以模仿标准POSIX函数的方式与文件系统进行交互.
    
    error-first 错误优先原则 如果错误没有发生，error值为null或者undefined
    
    异步读取与同步读取：
        异步IO不会阻塞线程、同步会阻塞线程

## process 进程

    process 全局对象
    
    事件循环: 主线程运行时,会产生对应的堆栈.
        Call Stack 调用栈
        WebAPIs 外部线程、异步线程
        Callback Quene 事件队列
        Event Loop 事件轮询
    
    宏任务、微任务
    
        全局执行的任务就是宏任务、主要处理相应回调
        微任务：promise
    
        宏任务：主线程中按序执行 task -> task  回调函数、XHR回调、setTimeout、setIntval、U/I rending、I/O、setImmidate(node中独有)
        微任务：task 完成之后，插入进来 promise、process.nextTick(node中独有)
    
        new Promise((resolve, reject) => {
            console.log('宏任务');
        })
            .then(() => {
                console.log('微任务');
            })
            .catch(() => {
                console.log('微任务');
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

## http

    npm i nodemon -save-dev 自动检测执行

## express

  npm init -y

  npm install nodemon --save-dev

  npm install express --save

  npm install body-parser --save

  npm install ejs pug express-handlebars --save

  npm install express-handlebars@3.0 --save

  npm install mysql2 --save

  npm install sequelize --save

## Sequelize

  ORM框架（Object-Relational Mapping）框架，对象关系映射

  模型 -> 创建实例 -> 查询 -> 关系

