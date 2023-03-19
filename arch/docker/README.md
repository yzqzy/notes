# Docker

## Docker 是什么

Docker 是容器，内部可以部署应用（Application）。

Docker 是一种管理应用的现代手段，让应用管理变得可预测和高效。

**安装 Mysql**

```bash
$ docker pull mysql
```

国内如果拉取镜像比较慢，可以安装阿里云加速器。其实就是在 docker 的配置文件中增加一行：

[https://developer.aliyun.com/article/29941](https://developer.aliyun.com/article/29941)

```json
{
  "registry-mirrors": ["<your accelerate address>"]
}
```

每个阿里云用户都有自己的加速器地址。

拉取完镜像，可以在本地看到镜像：

```bash
$ docker images
```

我们可以通过下面这个网址查看镜像文档：[https://hub.docker.com/_/mysql](https://hub.docker.com/_/mysql)。

镜像制作者会提供镜像启动方式：

```bash
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

镜像启动后，我们可以查看容器状态：

```bash
$ docker ps 
```

我们还可以通过以下命令查看容器基础信息：

```bash
$ docker inspect [container id]
```

我们可以通过数据管理工具链接 mysql。例如 DBeaver。

```bash
$ docker pull dbeaver/cloudbeaver
```

```bash
$ docker run --name cloudbeaver --rm -ti -d -p 8088:8978 -v   /var/cloudbeaver/workspace:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:latest
```

启动后查看 mysql 容器占用的 IP 和端口：

```bash
$ docker inspect mysql
```

我们可以使用 dbeaver 连接 mysql，进行可视化操作。

## Docker 原理

Docker 不隔离计算，只隔离环境。

**环境和计算**

环境，包括文件系统、网络等。

比如 Docker 容器中的进程，只能看到 Docker 容器 “框” 住的资源。比如进程在 Docker 容器中看到的 `/` 目录，实际上可能对应用户本机的 `/var/docker/ds/001` 。

进程看到的网络，也是隔离的网络。执行进程中的用户也是 Docker 容器内部的用户，和外部完全隔离。

不过和虚拟机不同，Docker 不隔离计算。Docker 容器中的进程，也是真实的进程，不是虚拟的进程。

当一个 Docker 容器中的进程写入文件的时候，并不是在一台虚拟机上写，而是在用户本地操作系统的文件系统中写入，只不过是被隔离了。

**Docker 是一种隔离技术而非虚拟化。**

虚拟化技术最明显的特征是执行层面的虚拟化 -- 虚拟 CPU 指令。比如你本机的 Windows 不管理 vmware 中运行的进程，因为 vmware 中的进程已经完全运行在虚拟化技术上。

Docker 将自己直接嫁接在操作系统上，Docker 中的进程也是真实的进程，Docker 使用的文件系统也是真实的文件系统（只不过做了隔离）。Docker 使用的网络也是真实的网络。

**Docker 如何做到的？**

使用 Linux的 namespace 技术。你也可以用这个技术隔离你系统中的应用。

Namespace 技术是多种技术的合集，如果感兴趣可以搜索这些关键字：

* cggroup
* mnt namespace
* user namespace
* pid namespace

**docker 架构**

<img src="./images/design.png" />

**Docker 为什么可预测（predictable）**

因为镜像使用容器部署，环境是隔离的，约束行为。

容器可能会挂，可能会无响应，不会影响主机，拖垮主机。

**Docker 为什么高效**

高效在于两个层面：

* 研发效率：有自己的一套完整体系，方便使用；
* 执行高效：容器本身作为一个进程执行，不采用虚拟化技术，没有性能损耗。

## Docker 镜像部署

新建 vue 项目

```bash
$ npm create vite
```

根据目录下创建 Docker 配置文件（Dockerfile）

```
FROM node:16

WORKDIR /usr/app

COPY . .

RUN npm install cnpm -g --registry=https://registry.npmmirror.com
RUN cnpm install
RUN npm run build
RUN cnpm install serve -g

EXPOSE 3000

CMD ["serve", "dist"]
```

创建忽略文件（.dockerignore）

```
node_moduels
```

运行构建脚本

```bash
$ docker build -t docker/hello . 
```

启动项目

```bash
$ docker run -t -p 3000:3000 --name docker-hello -d docker/hello
```

现在我们就可以正常访问项目了。

## Docker Compose 工具

下载：[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

> Docker for Mac 自带 docker-compose

创建 Docker Compose 文件，`docker-compose.yml`。

```yaml
version: '2.13'

services:
  mysql:
    restart: always
    image: mariadb:10.3
    container_name: mariadb
    ports:
      - '3306:3006'
    volumes:
      - ./store/:/var/lib/mysql
    men_limit: 512m
    networks:
      - mysqlnetwork
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=local
      - MYSQL_USER=root
      - MYSQL_PASSWORD=root
      - PMA_ARBIYTRARY=1
      - PMA_HOST=mysql
      - PMA_PORT=3306
      - PMA_USER=root
      - PMA_PASSWORD=root

  redis-server:
    restart: always
    image: redis:4.0
    container_name: redis-server
    command: /bin/bash -c 'redis-server --appendonly yes'
    sysctls:
      - net.core.somaxconn=65535
    ports:
      - '6379:6379'
    volumes:
      - ./redis:/data
    men_limit: 96m
    networks:
      - mysqlnetwork

# ....
```

 启动项目：

```bash
$ docker-compose up
```

