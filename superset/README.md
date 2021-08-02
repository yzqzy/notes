# superset 

搭建前端本地开发环境的确有很多坑，官网文档写的模糊不清，百度、chrome 教程早就过时很久，经过多次尝试，终于搭建好开发环境，记录如下。

## 开发环境搭建

https://superset.apache.org/docs/installation/installing-superset-from-scratch。

### 安装 python 环境

安装最新版即可，最新版 python 自带 pip 打包管理工具，安装时需要将 python 添加到 path 中。

### 下载 superset 源码

https://github.com/apache/superset  下载 master zip 即可。

### 部署 python 虚拟环境

>  命令最好使用 cmd，bash 创建用户时有问题。

```js
pip install virtualenv
```

```js
virtualenv env
```

```js
env\Scripts\activate
```

### 安装、初始化 superset

解压之前下载的 superset 源码，进入到源码目录。

设置 pip 国内源地址。

```js
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

安装 superset 本地测试依赖

```js
pip install -e .
```

~~安装 apache-superset~~

```js
pip install apache-superset
```

初始化数据库

```js
superset db upgrade
```

创建用户并初始化配置

```js
superset fab create-admin

superset load_examples // 下载 superset 案例，需要安全上网

superset init
```

启动 superset server

```js
superset run -p 3000 --with-threads --reload --debugger
```

这时访问地址，会发现没有资源。

### 前端项目配置

安装项目依赖

```js
cd superset-frontend

npm install
```

修改 webpack 配置

```js
{
  test: /\.jsx?$/,
  // include source code for plugins, but exclude node_modules and test files within them
  exclude: [/superset-ui.*\/node_modules\//, /\.test.jsx?$/],
  include: [
    new RegExp(`${APP_DIR}/src`),
    /superset-ui.*\/src/,
    new RegExp(`${APP_DIR}/.storybook`),
    path.resolve(__dirname, 'src') // 添加本行代码，对 windows 环境不友好
  ],
  use: [babelLoader],
}
```

运行项目

```js
npm run dev
```

### 总结

开发环境是热更新，需要同时启动两个服务。一个是服务端的服务 ，一个是前端的打包服务，修改前端的代码时，前端的代码会实时的打包更新到 `superset/static/assets` 文件夹下，服务端根据这个文件夹内的文件对前端的页面进行渲染。

搭建好开发环境后，我们就可以做更多事情，比如对 superset 前端项目进行二次开发，定制面板内容，对项目进行移动端适配等。
