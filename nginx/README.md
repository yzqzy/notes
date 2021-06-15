# Nginx 核心知识

## 一、Nginx 基础

### 概述

#### 主流 Web 服务器

Nginx、Apache、Tomcat。

#### Nginx 的优点

2014 发展至今。

* 高并发，高性能
* 可扩展性好
* 高可靠性
* 热部署
* BSD 许可证

### Nginx 应用场景

* 静态资源托管
  * 通过本地文件系统提供服务
* 反向代理服务
  * Nginx 的强大功能
  * 缓存
  * 负载均衡
* API 服务
  * OpenResty



<img src="./images/view.png" style="zoom: 80%" />



### Nginx 历史背景

* 互联网的数据量快速增长
  * 互联网的快速普及
  * 全球化
  * 物联网
* 摩尔定律：性能提升
* 低效的 Apache
  * 一个连接对应一个进程

### Nginx 优点

* 高并发，高性能
* 可扩展性好
* 高可靠性
* 热部署
* BSD 许可证

### Nginx 组成部分

* Nginx 二进制可执行文件
  * 由各模块源码编译出的一个文件
* Nginx.conf 配置文件
  * 控制 Nginx 的行为
* access.log 访问日志
  * 记录每一条 http 请求信息
* error.log 错误日志
  * 定位问题

### Nginx 版本发布历史

nginx 版本发布情况（mainline）。2002 年开发时间，2004 推出第一个版本。



<img src="./images/mainline.png" style="zoom: 80%" />



https://nginx.org/en/download.html。

### Nginx 发行版本选择

开源免费的 Nginx 与商业版 Nginx Plus。

开源版：nginx.org

商业版：nginx.com



<img src="./images/version.png" style="zoom: 80%" />



阿里巴巴的 Tengine，http://tengine.taobao.org/。

> Tengine是由淘宝网发起的Web服务器项目。它在[Nginx](http://nginx.org/)的基础上，针对大访问量网站的需求，添加了很多高级功能和特性。Tengine的性能和稳定性已经在大型的网站如[淘宝网](http://www.taobao.com/)，[天猫商城](http://www.tmall.com/)等得到了很好的检验。它的最终目标是打造一个高效、稳定、安全、易用的Web平台。
>
> 从2011年12月开始，Tengine成为一个开源项目，Tengine团队在积极地开发和维护着它。Tengine团队的核心成员来自于[淘宝](http://www.taobao.com/)、[搜狗](http://www.sogou.com/)等互联网企业。Tengine是社区合作的成果，我们欢迎大家[参与其中](http://tengine.taobao.org/source_cn.html)，贡献自己的力量。



免费 OpenResty 与商业版 OpenRestry

开源 OpenRestry：http://openresty.org。

> OpenResty® 是一个基于 [Nginx](http://openresty.org/cn/nginx.html) 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。
>
> OpenResty® 通过汇聚各种设计精良的 [Nginx](http://openresty.org/cn/nginx.html) 模块（主要由 OpenResty 团队自主开发），从而将 [Nginx](http://openresty.org/cn/nginx.html) 有效地变成一个强大的通用 Web 应用平台。这样，Web 开发人员和系统工程师可以使用 Lua 脚本语言调动 [Nginx](http://openresty.org/cn/nginx.html) 支持的各种 C 以及 Lua 模块，快速构造出足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 Web 应用系统。

商业版 OpenResty：https://openresty.com。

> 技术支持比较好。

<img src="./images/openresty.png" style="zoom: 100%" />

### 编译适合自己的 Nginx

#### 下载 Nginx

https://nginx.org

download

Mainline version、Stable version

下载稳定版。

```js
wget https://nginx.org/download/nginx-1.20.1.tar.gz
tar -xzf nginx-1.20.1.tar.gz
cd nginx-1.20.1
```

#### 目录介绍

<img src="./images/contents.png" />

* auto 
  * cc 编译
  * lib
  * os
  * types
* CHANGES：Nginx 每个版本中提供提供的特性和修复的 BUG
* CHANGES.ru：俄罗斯版本的 CHANGEES 文件，作者是俄罗斯的
* conf 示例文件
* configure：脚本，生成中间文件，执行编译前的必备动作
* contrib：提供脚本和 VIM 工具
  * cp -r contrib/vim/* ～/.vim/	可以使 vim 支持 nginx 语法
* html：提供标准 HTML 文件，500 错误文件与默认 nginx 欢迎界面
* main：linux 对 nginx 的帮助文件
* src：Nginx 源代码

#### Configure

```js
./configure --help | more // 查看帮助文件
```

默认参数编译

```js
./configure --prefix=/data/nginx
```

<img src="./images/configura.png"/>

#### 中间文件介绍

<img src="./images/contents02.png" />

objs

* ngx_modules.c：决定 nginx 编译时有哪些模块会被编译进 nginx

* src

#### 编译

```js
make // 编译
```

编译结束后，会在 objs 目录下生成大量二进制文件。

> c 语言编译时生成的所有的中间文件都会放到 src 目录

nginx 版本升级时，需要将 objs 目录下的文件拷贝到安装目录中。

如果我们使用动态模块，动态模块会生成 so 动态文件，也会放到 objs 目录下。

#### 安装

```js
make install // 首次安装时可以使用此命令
```

安装完成后可以去指定目录查看。

<img src="./images/install.png"/>

sbin：nginx 二进制文件

config：和源代码中配置文件相同，决定 nginx 功能文件

logs：日志文件

### Nginx 配置文件的通用语法介绍

#### 基础语法

* 配置文件由指令与指令块组成
* 每条指令以 ；分号结尾，指令与参数间以空格符号分割
* 指令块以 {} 大括号将多条指令组织在一起
* include 语句允许组合多个配置文件以提升可维护性
* 使用 # 符号添加注释，提高可读性
* 使用 $ 符号使用变量
* 部分指令的参数支持正则表达式

#### 配置参数：时间单位

```js
ms milliseconds
d days
s seconds
w weeks
m minutes
M months, 30 days
h hours
y years, 365 days
```

#### 配置参数：空间单位

```js
bytes
k/K kilobytes
m/M megabytes
g/G gigabytes
```

#### http 配置的指令块

http：表示内部所有执行由 http 解析并执行

server：定义域名或者一组域名

location：url 表达式

upstream：上游服务，nginx 需要与 tomcat 等其他服务交互时，我们可以定义 upstream

### Nginx 命令行：重载、热部署、日志切割

#### linux 命令行

* 格式：nginx -s reload
* 帮助：-?	-h
* 使用指定的配置文件：-c
* 指定配置指令：-g
* 指定运行目录：-p
* 发送信号：-s
  * 立刻停止服务：stop
  * 优雅的停止服务：quit
  * 重载配置文件：reload
  * 重新开始记录日志文件：reopen
* 测试配置文件是否有语法错误：-t、-T
* 打印 nginx 的版本信息、编译信息等：-v、-V

#### 重载配置文件

```js
./nginx -s reload // 不停止服务的情况下，重新载入配置文件
```

#### 热部署

```js
ps -ef | grep nginx // 查看进程状况
```

```js
// 备份现有二进制文件
cp nginx nginx.old

// 替换正在运行的二进制文件
cp -r nginx /data/nginx/sbin/ -f 

// 向 master 进程发送信号
kill -USR2 13195

// 向老的进程发送关闭信号（关闭 work 进程，老的 master 进程还可以重新拉起 worker 进程）
kill -WINCH 13195
```

#### 日志切割

```js
mv blog.log blog.bak.log

./nginx -s reopen
```

```js
// bash 脚本

crontab -l
```

### Nginx 搭建静态资源 Web 服务器



## 二、Nginx 架构基础



## 三、HTTP 模块

## 四、反向代理与负载均衡

##五、Nginx 系统层性能优化

## 六、深入使用 Nginx 与 OpenResty