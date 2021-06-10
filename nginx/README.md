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



## 二、Nginx 架构基础



## 三、HTTP 模块

## 四、反向代理与负载均衡

##五、Nginx 系统层性能优化

## 六、深入使用 Nginx 与 OpenResty