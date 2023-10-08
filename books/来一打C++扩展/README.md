## 发展历程

* 2008 年 Chrome 发布、V8 发布；
* 2009 年 Node.js 发布；
* 2010 年 NPM 发布；
* 2014 年 12 月，多位核心 Node.js 开发者不满于 Joyent 对 Node.js 的管理制度，创建了 io.js；
* 2015 年初 Node.js 基金会成立；
* 2015 年 9 月 Node.js 4.0 发布，Node.js 和 io.js 正式合并。
  * Node.js 4.0 版引入了 ES6 的语言特性和 “长期支持版本” 的发布周期。

所有的编程语言底层都会回归 C/C++，Node.js 的底层依赖库 V8 使用 C++ 进行开发，libuv 则使用 C 语言。开发 Node.js 扩展可以将擅长 CPU 计算的 C++ 和擅长 I/O 的 Node.js 结合在一起，弥补 JavaScript 在计算密集型应用方面的不足。 

## libuv

Node.js 有一个重要概念是事件循环，它是由 libuv 进行驱动的。libuv 是一个专注于异步 I/O 的跨平台类库。

特性：

* 基于 epoll/kqueue/IOCP/event ports 实现的事件循环；
* 异步 TCP 和 UDP 套接字；
* 异步 DNS 解析；
* 异步文件、文件系统操作；
* 文件系统事件；
* ANSI 转义码控制的 TTY；
* 使用 UNIX domain 套接字或者命名管道实现的套接字共享 IPC；
* 子进程；
* 线程池；
* 信号（Signal）处理；
* 高精度时钟；
* 线程和同步元。

> 正是不同平台的异步机制（如 epoll、IOCP 等），libuv 才能基于它们实现跨平台的事件循环。

