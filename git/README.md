# Git

## 最小配置

**配置 user.name 和 user.email**

```js
git config --global user.name 'your_name'
git config --global user.email 'your_email'
```

**config 的三个作用域**

缺省等同于 local

```js
git config --local // local 只对某个仓库有效
git config --global // global 只对当前用户所在仓库有效
git config --system // system 对系统所有登录的用户有效
```

**显示 config 的配置，加 --list**

```js
git config --list --local
git config --list --global
git config --list --system
```



## 创建 git 仓库

**已存在项目**

```js
cd [your_project]
git init
```

**新建项目**

```js
git init [your_project]
```



## 提交信息

```js
git commit -m "init"
```

```js
git add [file_name]
```

```js
git log 
```



## 文件重命名

```js
mv readme readme.md 
```

```js
git status

git add readme.md
git rm readme

git status
```

**简化操作**

```js
git reset --hard // 清理暂存区所有工作信息
```

```js
git mv readme readme.md // 等同于上述操作，简化操作
```

```js
git commit -m "perf: move reame to readme.md"
```



## 查看版本演变历史 

```js
git log
```

```js
git log --oneline // 查看只包含提交信息的记录（一行简洁方式）
```

```js
git log -n4	--oneline // 最近的 n 次
```

```js
git branch -v // 查看本地分支
```

```js
git log --all // 查看所有分支的日志信息
```

```js
git log --all --graph // 图形化的日志信息
```



```js
git log --oneline --all -n4 // 所有分支最近的 4 次提交记录
```

```js
git log --oneline --all -n4 --graph // 所有分支最近的 4 次图形化提交记录
```



```js
git help --web log // 查看 web 界面的 git log文档
```

## 图形界面工具

