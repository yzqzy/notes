# NPM 私服

## nexus

**安装**

```jsx
mkdir /data/nexus
chown -R 200 /data/nexus
```

```js
docker search nexus
docker pull sonatype/nexus3
```

```js
docker run -d -p 4873:8081 --name nexus -e NEXUS_CONTEXT=nexus -v /data/nexus:/nexus-data -v /etc/localtime:/etc/localtime --restart=always sonatype/nexus3
```

```js
docker run -d \
  -p 4873:8081 \
  --name nexus \
  -e NEXUS_CONTEXT=nexus \
  -v /data/nexus:/nexus-data \ 
  -v /etc/localtime:/etc/localtime \
  --restart=always \
  sonatype/nexus3
```

> --restart=always 跟随 docker 一起启动

**登录**

`http://xxxx/nexus/`  地址访问

用户名：admin，密码在 data/nexus/admin.password 文件中。

```js
cat /data/nexus/admin.password
```

**仓库配置**

create repos

* npm proxy

```js
npm-taobao https://registry.npm.taobao.org/
npm-npmjs  https://registry.npmjs.org

Negative Cache：43200 （1 个月）
```

* npm hosted

```js
npm-hosted

Deployment policy：Allow redeploy
```

* npm group

```js
npm-public

配置优先级：

npm-hosted
npm-taobao
npm-npmjs
```

**安全配置**

Security：

Realms ，选中 npm Bearer Token Realm 

**测试**

上传操作：

```js
npm login –-registry=https://registry.yueluo.club/nexus/repository/npm-hosted/
npm publish –-registry=https://registry.yueluo.club/nexus/repository/npm-hosted/
```

使用仓库

```js
nrm add yueluo https://registry.yueluo.club/nexus/repository/npm-public/
nrm use yueluo
```

## verdaccio docker

```js
docker pull verdaccio/verdaccio
```

```js
mkdir /data/verdaccio/conf
touch confg.yaml
```

```yaml
# /data/verdaccio/conf/confg.yaml

storage: ../storage
plugins: ../plugins
auth:
  htpasswd:
    file: ./htpasswd
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npm.taobao.org/
packages:
  "@*/*":
    access: $all
    publish: $authenticated
    proxy: taobao
  "**":
    access: $all
    proxy: taobao
logs:
  - { type: stdout, format: pretty, level: http }
```

```js
docker run -d \
  --name verdaccio \
  -p 4873:4873 \
  -v /data/verdaccio/conf:/verdaccio/conf \
  -v /data/verdaccio/storage:/verdaccio/storage \
  -v /data/verdaccio/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
```

## verdaccio pm2

```js
npm install -g verdaccio
```

```js
/usr/node/node-v14.8.0-linux-x64/bin/verdaccio
/usr/node/node-v14.8.0-linux-x64/lib/node_modules/verdaccio/bin/verdaccio
```

**建立软连接**

**安装**

```js
ln -s /usr/node/node-v14.8.0-linux-x64/bin/verdaccio /usr/local/bin/verdaccio
```

任意目录执行 verdaccio 命令，可以启动 verdaccio。

```js
/root/.config/verdaccio
```

**修改配置文件**

```js
mkdir /data/verdaccio /data/verdaccio/conf /data/verdaccio/storage /data/verdaccio/plugins
```

```yaml
#
# This is the default config file. It allows all users to do anything,
# so don't use it on production systems.
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: /data/verdaccio/storage
# path to a directory with plugins to include
plugins: /data/verdaccio/plugins

web:
  title: Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  # convert your UI to the dark side
  # darkMode: true
  # logo: http://somedomain/somelogo.png
  # favicon: http://somedomain/favicon.ico | /path/favicon.ico

# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/ui/tree/master/i18n/translations
il8n:
 web: zh-CN

auth:
  htpasswd:
    file: /data/verdaccio/conf/htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
  taobao:
    url: https://registry.npm.taobao.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: taobao

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated
    unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: taobao

# You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# log settings
logs: { type: stdout, format: pretty, level: http }

#experiments:
#  # support for npm token command
#  token: false
#  # disable writing body size to logs, read more on ticket 1912
#  bytesin_off: false
#  # enable tarball URL redirect for hosting tarball with a different server, the tarball_url_redirect can be a template string
#  tarball_url_redirect: 'https://mycdn.com/verdaccio/${packageName}/${filename}'
#  # the tarball_url_redirect can be a function, takes packageName and filename and returns the url, when working with a js configuration file
#  tarball_url_redirect(packageName, filename) {
#    const signedUrl = // generate a signed url
#    return signedUrl;
#  }

# This affect the web and api (not developed yet)
#i18n:
#web: en-US
```

**测试使用**

推荐本地使用 nrm。

```js
nrm add yueluo https://registry.yueluo.club/
nrm use yueluo
```

创建用户

```js
npm adduser
```

发布

```js
npm publish
```

**pm2 启动**

```js
pm2 start verdaccio --name="registry_service"
```