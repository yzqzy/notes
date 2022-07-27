# NPM

## Node模块、常用命令、SEMVER规范

Node模块（mode_modules）

Node环境：一个在Node环境下开发的项目，模块可能是一个库、框架或者是项目依赖、甚至是一个项目，Node环境就是让这些模块成功运行起来的服务提供方。

package.json：描述node模块的文件，包含多项对Node模块的说明与配置。

```js
npm init 

npm init -yes

npm init -y

npm set init.name = 'yueluo'

npm install | uninstall

npm install xxx@1.1.1

npm rebuild xxx // 重新构建模块

npm update xxxx or npm update -g xxx // 更新模块

npm search xxx // 搜索模块
```

    semver 规范 - version
    Semantic Versioning：语义化规范
    种类：固定版本、范围版本
    
    version：x.x.x.x（主版本.次版本.修订版本-日期版本_希腊字母）
    
    MAJOR.MINOR.PATCH-alphabel

```
1.3.2-20200507_alpha
```

* 主版本：多个功能、API、UI等做了大范围升级且一般不向后（向下）兼容。
* 次版本：功能或API新增，UI增强，向后兼容。
* 修订版：问题（Bug）修复、少量功能升级补丁且向下兼容

主板本号升级，次版本与修订版本号归0，次版本号升级，修订版本号归0。

先行版本号（Pre-release version）

Base：仅实现项目的基本架构
Alpha：初级版本、测试第一阶段，实现功能，修复严重BUG，内部开发人员交流版本

    Beta：中级测试、测试第二阶段，实现UI，进一步修改功能性BUG，可发布测试
    
    RC（Release Candidate）：最终测试版，候选版本，可能会出现一些局部的小BUG，
    可发布RC2进行进一步BUG修改，近似于正式版本。
    
    Release：正式版，交付版本，标准版（stable）
    
    release x 1.0.0
    release x 1.0.0_stable（web开发不常用）  

依赖版本号

    ^1.2.0 -> 主版本固定（1） 
    
    主版本号1固定，且遵循不小于次版本号，如次版本号相等，则需不小于修订版本号。
    
    注意：npm install 会安装主版本号固定下的最新版本
    
    ^1.3.0 ^1.4.0 等等


    ~：~1.2.0 主版本号1固定，次版本号2固定，且遵循不小于修订版本号。
    
    ~1.2.5 -> 1.2.6


    >、<、=、>=、<=、-：版本范围
    
    > 3.2   < 2.2   2.0.3-2.1.0        

```js
||：或选择

^3 < 3.2 || > 3.4

3.1   3.5 ...
```

    x、*：通配
    
    4.x：对应主版本号4的所有版本号，次版本号、修订版本号不定
    *：所有版本号

```
0.1.0_base
0.1.1（0.1.1_alpha web开发可以不添加alpha）
0.1.2
...
0.1.9  

version 0.1.x
```

    新增 功能1
    新增 功能2

version 0.1.9

    修复 xxx
    修复 xxx

version 0.2.1

    新增 xxx
    修复 xxx

## package-lock、License 协议

### package-lock.json

保存当前安装依赖的来源及版本号

版本变动规则：

install 指定版本：自动更新 package-lock.json 对应的版本

install 范围版本

```
版本小于等于 package-lock.json 中对应的版本时，安装 package-lock.json 中的版本
版本大于 package-lock.json 中的对应的版本时，安装范围版本号中最高的版本，并更新 package-lock.json 中对应的版本

npm i babel-loader@7.1.1 -> 自动更新 package-lock.json -> 安装7.1.1
babel-loader：^7.1.1 
package-lock.json 7.3.1 -> 安装7.3.1

babel-loader：^7.5.1  
package-lock.json 7.3.1 -> 安装主版本固定的最高版本，比如 7.8.1
```

### 开源协议

开源协议：说明授权他人使用被开源的项目有哪些权利

协议查询：https://opensource.org/licenses/alphabetical

```
license

"license"："MIT"
"license"："(MIT or GPL)"
"license"："SEE LINCENSE IN LICENSE_xxx.txt"
"license"："UNLICENSED"
```

#### BSD协议 

Berkeley SoftWare Distrubution：伯克利软件发行版

自由使用、修改源码、修改后开源或者再发布

三大条件：

* 再发布的产品包含源码，则必须携带原来的BSD协议
* 再发布二进制类库或软件，其内部必须携带原来的BSD协议
* 禁止用原源码作业或机构、原产品名称做市场推广

####  Apache协议

Apache Licence 2.0：Apache 开源协议2.0

自由使用、修改源码、修改后开源或再发布（商业软件）

三大条件：

* 修改源码，必须在源码所在文件中进行说明
* 修改或拓展的代码中，必须携带原协议、商标、专利声明和作者要求包含的说明信息
* 如果使用源码后再发布的产品中包含说明文件，该说明文件必须携带Apache License且不能更改

#### GPL协议

GPL：GNU Genaral Public License（Linux）：通用公共许可证

GNU 一种自由的操作系统。

自由使用、修改、拓展源码、修改后开源或再发布

一大条件：必须开源免费（不可以商业化）

#### LGPL协议

LGPL：GUN Lesser General Public License：宽通用公共许可证

针对类库，自由引用，无需开源，可发布与销售

#### MIT协议

MIT：Massachusetts Institute Of Technology （麻省理工学院）

自由使用、复制、修改、合并、发布、再授权、销售
可修改授权条款

一大条件：再发布的产品必须版权声明和许可声明

#### Mozilla协议

MPL：The Mozilla Public License

自由使用、修改、发布

三大条件：

* 修改源码，必须开源

* 新增代码不可使用原许可

* 修改代码，必须提供说明文档

#### MPL：The Mozilla Public License

自由使用、修改、发布

三大条件：

* 修改源码，必须开源

* 新增代码不可使用原许可

* 修改代码，必须提供说明文档

#### ISC协议

ISC：Internal Systems Consortium （互联网系统协会）

自由使用、修改可闭源、无需版权说明

一大条件：商用后不可使用作者名字宣传

## package.json 常用配置项详解

配置项

1. name 项目名称（英文）

        禁止使用JS，NODE等关键词
        
        禁止使用 . 或 _ 开头
        
        小写字母
        
        不要用空格
        
        不要太长

    html-webpack-plugin

2. keywords：`Array<string>`，字符串数组

3. description：String，字符串

4. homepage：URL（不带协议）

    www.yueluo.club

5. bugs：Object

    url：bug 提交与追踪地址
    email：bug 提交的邮箱地址
    
    {
      "url": "issues.jsplusplus.com",
      "email": "1445367137@qq.com"
    }

6. author contributors

    author：Object 作者信息
    
      name：作者名称
      mail：邮箱地址
      url：作者网站首页地址
    
    author：yueluo yueluo@qq.com http://www.yueluo.club
    
    conntributors：Array 一组贡献者（单个元素同author配置）

7. main

    main 入口文件

    编写的模块需要直接引用，需要设置入口文件

    案例：

      如果编写一个 webpack plugin -test-webpack-plugin 入口文件在 dist/app.js
      当前 test-webpack-plugin 文件夹下的 package.json 内要设置 main: 'dist/app.js'

      项目模块中使用该 plugin 时

    ```js
    const TestWebpackPlugin = reuqire('test-webpack-plugin');
    
    // 不用写引用路径
    reuqire('test-webpack-plugin/dist/app.js')
    ```

8. repository

    repository：Object 线上仓库
    
      type：'git or svn'
      url：'仓库线上地址'

9. private 

    private：Boolean 是否私有
    
     true npm 无法发布

## scripts 脚本命令以及使用技巧

10. scripts

scrips：Object 定义脚本命令，任何可以shell运行的命令都可以被定义

shell：

    c 语言编写的程序，Linux上的一种命令语言。
    
    shell脚本（shell script），shell 语言编写的脚本程序。

```
"remove": "rm -rf index.txt"
```

通配符

    "remove": "rm -rf **/*.txt" 删除根目录文件夹下的所有后缀名为 .txt 的文件
    
    "remove": "rm -rf **/*.txt *.txt" 删除根目录及其子目录下所有名为 .txt 的文件
    
    比如临时文件等。

参数

```js
"build": "webpack --config wepack.config.js && node upload_source.js"

// --config 就是配置的参数
```

& 和 &&

    &：同时执行
    &&：顺次执行

默认值

    没有定义脚本命令也可以使用
    
    npm start：node server.js
      
    npm install：node-gyp rebuild

钩子

```
"prebuild": "echo before",
"build": "echo build",
"postbuild": "echo after build"

npm run build -> 自动在之前执行 prebuild，之后再执行 postbuild

prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

  简写

    npm start = npm run start
    npm stop = npm run stop
    npm test = npm run test
    
    npm restart = pm run stop && npm run restart && npm run start（可以在命令前后增加事件钩子）

取值

```json
process.env.npm_package_name
process.env.npm_package_repository_type

"server": "echo $npm_package_server"

案例：

"server": {
"url": "http://ww.yueluo.club",
"port": "3000" 
}

package.json 取值

"port": "echo $npm_package_server_port"

server.js 文件取值

process.env.npm_package_server_port; // 3000
```

## dependencies依赖分类

dependencies：依赖模块

  devDependencies：开发环境下，用于转换、压缩、混淆、替换代码等协助最终打包成线上版本所需的依赖

    npm i xxx --save-dev    npm i xxx -D

  dependencies：线上（生产）环境中，项目、程序、模块运行必备的依赖。

    npm i xxx --save    npm i xxx -S

npm i xxx 安装当前命令行所在目录、安装在dependenices

npm i xxx -g 全局安装

peerDependencies

peerDependencies：同辈依赖


```
test 项目中依赖 a、b 模块，a 模块也依赖 b 模块，如何解决不重复安装 b 模块。

解决方法：

a 模块中

"peerDependencies": {
"b": "^1.0.0"
}

npm3 不强制安装 peerDependencies

警告：xxx@1.1.1 reuqires a peer of yyy@2.2.2 but none is installed，提示手动安装模块。
```

## npm发布、版本管理、废弃与删除

NPM是随同NodeJs一起安装的包管理工具。

允许用户从NPM服务器下载别人编写的第三方包到本地使用。
允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
允许用户将自己编写的包或命令行程序上传到服务器供别人使用。

npm -v

注册NPM

  https://www.npmjs.com/

  1. sign up
  2. 填写正确的邮箱
  3. 到邮箱内验证邮箱
  4. 跳转到NPM首页

nrm 操作

  npm i nrm -g  npm 仓库管理软件，快速切换npm仓库

  nrm ls 列出所有仓库

  nrm add cnpm https://registry.npm.Taobao.org 增加仓库

  nrm use npm 切换仓库

npm 发布

  1. npm adduser 增加用户 ，如果发布报错，先 npm login
  2. 填写注册 NPM 时填写的用户名、密码、邮箱地址
  3. 显示 logged is as yueluo on https://registry.npmjs.org 增加成功
  4. 查看 npm 仓库  nrm ls  前面有 * 的就是当前仓库
  5. 切换仓库 nrm use npm  切换到 npm 仓库
  6. npm publish
  7. 发布成功

scoped 包发布

  package.json 的 name @yueluo/my-module

  如果需要域的服务，是要收费的。

  如果不想被收费，可以使用 npm publish --access public 。

```js
{
  classe1: {
    yueluo: {
      name: '月落'
    }
  },
    classe2: {
      yueluo: {
        name: '月落'
      }
    }
}
```

babel-loader xiaoming
babel-loader xiaoli

scoped

    @xiaoming/babel-loader
    @xiaoli/babel-loader

版本迭代

  ```js
  npm version <major | minor | path> 增加版本
  npm publish 再次发布
  npm view yueluo-first versions 查看版本迭代情况
  npm up yueluo-first 切换到 npm 下 yueluo-first 项目下
  ```

node index.js 

废弃包版本

 ```js
 npm deprecate yueluo-first@0.1.0 'deprecate fircdst version'
 npm view yueluo-first versions 无变化
 
 安装 0.1.0 （npm view yueluo-first versions）
 
 提示：npm WARN deprecated yueluo-first@0.1.0: deprecate first version
 ```

删除包

包删除 24 小时后可重发
发布 72 小时内的包可删除

```js
npm unpublish yeuluo-first@0.1.0 -force
```

删除包

```js
npm unpublish yeuluo-first -force
```

## 编写 markdown 文档

markdown

  纯文本格式标记语言，本质上跟HTML一致，没有区别。

  用简单的书写方式确定一批文本显示格式。

  后缀名：.md

vscode Markdown Preview Enhanced

标题

```html
# Thi is a title for markdon
## Thi is a title for markdon
### Thi is a title for markdon
#### Thi is a title for markdon
##### Thi is a title for markdon
###### Thi is a title for markdon
```

文本

```html
This is a content for markdown.

**This is a content. 加粗**
*This is a content. 斜体*
***This is a content. 加粗斜体***
~~This is a content. 删除线~~
<p style="text-decoration: underline">This is a content 下划线</p>
```

引用

```html
> This is a content.
> > This is a content.
> >
> > > This is a content.
> > > 
```

分割线

```html
---
```

***

图片

```html
![yueluo](http://data.yueluo.club/icon/icon.png "yueluo")
```

超链接

```html
[yueluo](http://www.yueluo.club "yueluo")
```

无序列表

```html
无序 - + *

this is a list

- list item
* list item
+ list item
```

有序列表

```html
this is a list

1. list item
2. list item
3. list item
```

列表嵌套

```html
this is a list

  - list item

      + sub item
      + sub item

  * list item

    1. list item
    2. list item
    3. list item

  + list item
```

表格

```html
th|th|th|th
:-:|:-:|:-:|:-:
td|td|td|td
td|td|td|td
td|td|td|td
```

可以使用 “ : ” 设置文字居左、居右显示

代码块

  单行 `console.log('this is a line code');`

  ```js
  function test () {
    console.log('test');
  }
  ```

  ```css
  #app {
    width: 100%;
    height: 700px;
    background-color: #000;
  }
  ```

  ```html
  <div class="box">
    <h1>This is a title</h1>
    <p>This is content</p>
  </div>
  ```

流程图  ``` flow content ```

```html
cond1=>condition: 修改源码后闭源？
cond2=>condition: 版权说明？
cond3=>condition: 商用后用作者名字宣传？
cond4=>condition: 新增代码采用同样许可？
cond5=>condition: 修改源码提供文档说明？

apache=>end: Apache
mit=>end: MIT
isc_bsd=>end: ISC、BSD
gpl=>end: GPL
mozilla=>end: Mozilla
lgpl=>end: LGPL

cond1(yes)->cond2
cond1(no)->cond4

cond2(yes)->apache
cond2(no)->cond3

cond3(yes)->mit
cond3(no)->isc_bsd

cond4(yes)->gpl
cond4(no)->cond5

cond5(yes)->mozilla
cond5(no)->lgpl
```
