# Jenkins

创建项目

```js
create-react-app react-with-cicd
```

上传至码云仓库

```js
git remote add origin git@gitee.com:heora/react-with-cicd.git
git push -u origin master
```

安装 JDK

```js
cd /usr/local/src
wget http://img.zhufengpeixun.cn/jdk1.8.0_211.tar.gz
tar -xzvf jdk1.8.0_211.tar.gz
mkdir /usr/java
cp -r jdk1.8.0_211 /usr/java
ln -s /usr/java/jdk1.8.0_211.tar.gz/bin/java /usr/bin/java

ll /usr/bin/java // 查看软连接是否连接成功
```

安装 jenkins

```js
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install -y jenkins
```

查看 jenkins 运行状态

```js
systemctl status jenkins // 查看 jenkins 运行状态
systemctl start jenkins // 启动 jenkins

/var/lib/jenkins/secrets/initialAdminPassword // jenkins 密码
```

修改插件镜像地址

```js
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

// 插件管理 - 高级 - 升级站点
```

 配置可选插件

```js
Generic Webhook Trigger // Trigger web 触发器
Publish Over SSH	// 通过 SSH 部署服务器
nvm wrapper // 提供 node 环境
```

关闭防火墙

```js
systemctl status firewalled.service // 查看防火墙状态
systemctl stop firewalled.service
systemctl disable firewalled.service
```

配置 webhook

* jenkins

```js
// 1. 创建项目
// 2. 配置 Git（源码管理）
// 3. 构建触发器 Generic Webhook Trigger 
// 4. 应用

// 5. 设置 - 添加 API Token
```

* 码云

```js
// 项目管理 - WebHooks
// 添加 hooks（http://username:token@（IP地址 | 域名））/ 项目名称/invoke
// -- http://username:token@jenkins.yueluo.club/generic-webhook-trigger/invoke
// 添加配置

// 测试 webhook（上传代码测试、webhook测试）
```

构建项目 - 构建环境

```js
// -- 勾选（Run the build in an NVM managed environment）
// -- 编写 NVM Settings（只填写 node 版本即可）
```

 增加构建步骤（执行shell）

```js
npm config set registry https://registry.npm.taobao.org
npm install
rm -rf build
npm run build
```

构建成功后，可以另选服务器配置 nginx 部署项目，也可以选择本机部署。

追加构建脚本

```js
cd build
tar -zcvf build.tar.gz *
cp build.tar.gz /www/react-with-cicd
cd /www/react-with-cicd
tar -xzvf build.tar.gz
rm -rf build.tar.gz


chown -R jenkins /www // 如果提示权限不够，可以手动赋予 jenkins 权限
```

上述脚本操作的是本机部署程序，将打包后的文件移动至配置好的 nginx 目录。  
如果选择其他服务器部署，需要配置 SSH 免登录等功能，这里就不演示了。