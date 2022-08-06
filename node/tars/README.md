## 简介

[https://tarscloud.github.io/TarsDocs/](https://tarscloud.github.io/TarsDocs/)

## 开发相关

### 脚手架

[https://tarscloud.github.io/TarsDocs/dev/tars.js/nodetools-cli.html](https://tarscloud.github.io/TarsDocs/dev/tars.js/nodetools-cli.html)

```js
npm install -g @tars/nodetools-cli
```

```js
nodetools init
```

tars rpc 服务选择  `tars协议`， http服务选择  `非tars协议`

### @tars/deploy

打包本地 tars 应用。也可以使用脚手架完成一键部署。

```javascript
npm i @tars/deploy -g
```

```javascript
tars-deploy name [options]
```

### tars2node

[https://tarscloud.github.io/TarsDocs/dev/tars.js/tars2node.html](https://tarscloud.github.io/TarsDocs/dev/tars.js/tars2node.html)

转换 tars 文件。

```javascript
tars2node Protocol.tars --client
```

```javascript
tars2node Protocol.tars --client --ts
```

### 内网穿透工具

chisel_1.7.6_windows_amd64。

[https://github.com/jpillora/chisel/releases](https://github.com/jpillora/chisel/releases)

```javascript
 ./chisel.exe client --auth root:Eetai2uchohsha6o http://chisel.cuntutu.com 17892:192.168.0.216:17890 192.168.0.216:18193 192.168.1.140:10101 192.168.1.140:10102 192.168.1.140:10103 192.168.1.140:10104 192.168.1.140:10105 192.168.1.140:10106 192.168.1.140:10107 192.168.1.140:10108 192.168.1.140:10109 192.168.1.140:10110 192.168.1.140:10111 192.168.1.140:10113 192.168.1.140:10114 192.168.1.140:10116 192.168.1.140:10122 192.168.1.140:10201 192.168.1.140:10202 192.168.1.140:10203 192.168.1.140:1020 192.168.1.140:10130 192.168.1.140:18130
```



自建查询服务，替代 tars 原有的注册中心。

[https://github.com/yw0525/tars-registry-proxy](https://github.com/yw0525/tars-registry-proxy)

```javascript
const registry = require("@tars/registry");

registry.setLocator("tars.tarsregistry.QueryObj@tcp -h 10.1.1.204 -p 17890");

registry.findObjectById("winwin.tars_file_registry.TarsFileRegistryObj")
    .then(function (result) {
        console.log(result.response.return.value);
    });
```



<img src="./images/design.png" />

## 本地环境安装部署

[https://tarscloud.github.io/TarsDocs/installation/docker-install.html](https://tarscloud.github.io/TarsDocs/installation/docker-install.html)

[https://tarscloud.github.io/TarsDocs/installation/docker.html](https://tarscloud.github.io/TarsDocs/installation/docker.html)

### 创建虚拟网络

```javascript
docker network create -d bridge --subnet=172.25.0.0/16 --gateway=172.25.0.1 tars
```

### 安装 MySQL

```javascript
docker run -d -p 3306:3306 --net=tars \
    -e MYSQL_ROOT_PASSWORD="123456" \
    --ip="172.25.0.2" \
    --name=tars-mysql \
    mysql:5.6
```

### 框架部署

tarscloud/framework  框架部署。

**获取最新镜像**

```javascript
docker pull tarscloud/framework:latest
```

**创建容器**

```javascript
docker run -d \
    --name=tars-framework \
    --net=tars \
    -e MYSQL_HOST="172.25.0.2" \
    -e MYSQL_ROOT_PASSWORD="123456" \
    -e MYSQL_USER=root \
    -e MYSQL_PORT=3306 \
    -e REBUILD=false \
    -e INET=eth0 \
    -e SLAVE=false \
    --ip="172.25.0.3" \
    -p 3000:3000 \
    -p 3001:3001 \
		-p 4000:4000 \
		-p 4100:4100 \
		-p 4200:4200 \
    -p 17890:17890 \
    -p 17891:17891 \
    tarscloud/framework:latest
```

```javascript
docker run -d --name=tars-framework --net=tars -e MYSQL_HOST="172.25.0.2" -e MYSQL_ROOT_PASSWORD="123456" -e MYSQL_USER=root -e MYSQL_PORT=3306 -e REBUILD=false -e INET=eth0 -e SLAVE=false --ip="172.25.0.3" -p 3000:3000 -p 3001:3001 -p 4000:4000 -p 4100:4100 -p 4200:4200 -p 4300:4300 -p 17890:17890 -p 17891:17891 tarscloud/framework:latest
```

运行完毕访问 [http://127.0.0.1:3000](http://127.0.0.1:3000)。

