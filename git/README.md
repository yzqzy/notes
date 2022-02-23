# Git

## 一、Git 基础

### 基础配置

#### 配置 user.name 和 user.email

```js
git config --global user.name 'your_name'
git config --global user.email 'your_email'
```

#### config 的三个作用域

缺省等同于 local

```js
git config --local // local 只对某个仓库有效
git config --global // global 只对当前用户所在仓库有效
git config --system // system 对系统所有登录的用户有效
```

#### 显示 config 的配置，加 --list

```js
git config --list --local
git config --list --global
git config --list --system
```



### 创建 git 仓库

#### 已存在项目

```js
cd [your_project]
git init
```

#### 新建项目

```js
git init [your_project]
```



### 提交信息

```js
git commit -m "init"
```

```js
git add [file_name]
```

```js
git log 
```



### 文件重命名

#### 基础操作

```js
mv readme readme.md 
```

```js
git status

git add readme.md
git rm readme

git status
```

#### 简化操作

```js
git reset --hard // 清理暂存区所有工作信息
```

```js
git mv readme readme.md // 等同于上述操作，简化操作
```

```js
git commit -m "perf: move reame to readme.md"
```



### 查看版本演变历史 

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



### 图形界面工具

```js
gitk // 弹出 git 自带的图形化工具

gitk --all // 查看所有信息
```



<img src="./images/gitk.png" style="zoom: 60%" />



### .git 目录

#### HEAD

文本文件，指向当前分支。

```js
ref: refs/heads/master
```



#### config

```js
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = git@github.com:iheora/notes.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[gui]
	wmstate = normal
	geometry = 1061x563+96+96 233 255
```



#### refs

refs/tags      针对重要版本，可以打标签

refs/heads   本地分支文件夹

refs/remotes  远程分支文件夹



> git cat-file -t   查看对象类型
> git cat-file -p  查看对象内容
> git cat-file -s   查看对象大小



```js
cd refs/heads

cat .\master // aa4854071ab2fec2a08c9fcc58dfe939b09d6e9a

git cat-file -t aa4854071ab2fec2a08c9fcc58dfe939b09d6e9a // commit 类型

git branch -av // * master aa48540 [ahead 1] docs: update
```

master 指针指向 commit 。master 后 存在一个 hash 值，如果 hash 值足够标识唯一性，会截断进行显示。

tag 包含的是 git 对象，指向 commit。



#### objects

objects 是 git 文件系统核心内容，存在多个目录。



 **2个字符的文件夹，以 e8 为例。下面存在多个文件。**

-- 0b9ebd39f834f536c1aaa96df56074ad5481ae
-- 3b4ce5e9a33e0b41fe922d28093460085fe12d

```js
// 拼接规则：e8 + 文件名

git cat-file -t e83b4ce5e9a33e0b41fe922d28093460085fe12d 
// blob 可能存在多种文件类型 blob（文件对象），commit，tree 等，

git cat-file -p e83b4ce5e9a33e0b41fe922d28093460085fe12d // 查看文件内容
```



**pack 目录**

git 会做打包处理。


### commit、tree 和 blob 关系

git commit，commit 对象，一个 commit 肯定会对应一棵树（tree）。

树相当于一个快照，存储当时 git 操作的所有信息。

```js
tree
-- tree
-- blob
-- blod
-- tree  // styles


tree // styles
-- blob // logo.png，对应 blob 二进制文件
```

blob 对应一个文件。只要文件内容相同，git 都将之视为一个 blob。可以节约内存空间。
git 文件和文件名没有关系，会根据文件内容生成 blob。

> commit 可以被看做是 tree 的根节点。

> 文件生成 blob 对象后，再对文件进行修改，git 会把松散的 blob 做整理，把内容相近的 blob 做增量存储。



### 数一数 tree 的个数

新建的 Git 仓库，有且仅有 1 个 commit，仅包含 /doc/readme，请问内部含有多少个 tree，多少个 blob？

```js
git init watch_git_objects

cd watch_git_objects

mkdir doc

cd doc

echo "hello world" > readme

cd ..

find .git/objects -type -f // 空目录

git add doc

git status // 添加到暂存区，没有 commit

find .git/objects -type -f
// .git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
// 加入暂存区，git 会创建 blob 文件

git cat-file -t 3b18e512db // blob

git commit -m "add readme"

find .git/objects -type -f 
// .git/object/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad	blob
// .git/object/f5/5a12e98ffd80349f3499cc52a06b8afb93ec90  tree
// .git/object/25/0bfe7259457d05a1e29ced793fac74dc10e47f  commit
// .git/object/2c/5264370f2630da80ee38f412213d59657af6e8	tree
// 4 个
```

commit ，两个 tree 一个是 doc 目录，一个是 readme 文件，blob 是文件内容。

### 分离头指针情况的注意事项

detached HEAD。

```js
git checkout 415c5c8 // 切换分支的时候，切换成 commit
```


分离头指针的情况下，可以继续做开发，然后 commit，不会影响其他分支。

```js
提交 commit 时，git 会提示 HEAD detached at 415c5c8，即没有依赖分支做操作，只依赖 commit。

git commit -am "update" // 不经过暂存区，直接提交
```


分支头指针其实就是说正工作在一个没有分支的状态下，如果这时候切换其他分支而不保存，就会丢失已变更信息。

> 当你想做一些变更，只是尝试性的一些变更，如果发现效果不好，可以随时丢弃掉。
>
> 这时就可以使用分离头指针的现象，直接 checkout 切换到新的分支即可。

```js
gitk --all 

// 图形化工具不会显示任何关于分离头指针情况的信息记录
// git 眼中如果 commit 没和 branch 或者 tag 绑定，就是无效的提交信息，很可能会被 git 当作垃圾清理
// 可以根据切换分支时的提示，对 commit 记录建立新分支
```

### HEAD 和 branch

```js
git checkout -b fix_readme master // 基于 master 分支创建新分支并切换

git log -n1 // HEAD -> fix_readme
cat .git/HEAD // ref: refs/heads/fix_readme
```

HEAD 可以指代新分支的最后一次提交，也可以不和分支挂钩，和 commit 挂钩，即分离头指针的状态。

当分支切换时，HEAD 会指定新的分支。

HEAD 最终还是指向 commit，HEAD 指向分支的时候，分支里面的内容指向的还是 commit，即最后一次 commit。
不管是处于分离头状态，还是正常状态，HEAD 最后都会指向最新一次提交的 commit。

#### 比较 commit 差异

```js
git diff 3d4731 415c5c8 // 比较两个 commit
```

```js
git diff HEAD HEAD~1 // 比较当前及前一次提交
git diff HEAD HEAD^^ // 比较当前及 HEAD 的前两次提交

// ~ 和 ^ 两种用法都可以
```

## 二、Git 个人开发使用场景

### 删除不需要的分支

```js
gitk --all
```

```js
git branch -d [branch_name] // 删除本地分支
git branch -D [branch_name] // 强制删除本地分支
```

```js
git branch -a // 显示全部分支
git branch -v // 本地分支 详细信息
```

### 修改最新 commit 的 message

```js
git commit --amend // 允许修改最新 commit 的 message
```

### 修改旧的 commit 的 message

```js
git rebase -i [commit parent hash] 

git rebase -i 50234f8e848555b4995849e1c7564scd6b32b506d
// 团队协作时禁止使用，如果代码已经提交到远程分支，代码合并时会产生新的提交记录
```

```bash
pick bb4b896 docs: update words
pick 1ae4b2e perf: 二分查找的实现及特性
pick 6e3f289 perf: git 修改最新提交信息

# Rebase 50234f8..6e3f289 onto 50234f8 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.


->

r bb4b896 docs: update words
pick 1ae4b2e perf: 二分查找的实现及特性
pick 6e3f289 perf: git 修改最新提交信息
```

```bash
docs: update words

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Jan 17 08:00:10 2022 +0800
#
# interactive rebase in progress; onto 50234f8
# Last command done (1 command done):
#    reword bb4b896 docs: update words
# Next commands to do (4 remaining commands):
#    pick 1ae4b2e perf: 二分查找的实现及特性
#    pick 6e3f289 perf: git 修改最新提交信息
# You are currently editing a commit while rebasing branch 'master' on '50234f8'.
#
# Changes to be committed:
#       modified:   alg/training/README.md
#

->

docs: update word # 保存即可
```

> 变基操作实际上也使用分离头指针操作。

### 合并连续多个 commit

```js
git rebase -i [parent_commit]
```

使用 s，squash，meld into pervious commit。

```bash
pick 992e00c docs: update docs
pick d94225d perf: merge two update:
pick 442ccb0 perf: update

# Rebase 1d556bc..442ccb0 onto 1d556bc (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
```

=>

```bash
pick 992e00c docs: update docs
s d94225d perf: merge two update:
s 442ccb0 perf: update

# Rebase 1d556bc..442ccb0 onto 1d556bc (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified); use -c <commit> to reword the commit message
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

=> 

```bash
# This is a combination of 3 commits.
perf: git merge commit test
# This is the 1st commit message:

docs: update docs

# This is the commit message #2:

perf: merge two update:

perf: update

perf: update

# This is the commit message #3:

perf: update

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Jan 17 22:02:12 2022 +0800
#
# interactive rebase in progress; onto 1d556bc
# Last commands done (3 commands done):
#    squash d94225d perf: merge two update:
#    squash 442ccb0 perf: update
# No commands remaining.
# You are currently rebasing branch 'master' on '1d556bc'.
#
# Changes to be committed:
#       modified:   git/README.md
#
```

=>

```base
[detached HEAD c3657c8] perf: git merge commit test
 Date: Mon Jan 17 22:02:12 2022 +0800
 1 file changed, 39 insertions(+), 1 deletion(-)
Successfully rebased and updated refs/heads/master.
```

### 合并间隔的 commit

```js
git log --graph // 查看 Git 提交日志
```

```js
git rebase -i [commit_hash]	

// 如果是根 commit 不显示，可以自己添加 commit_hash，或者使用 git rebase -i --root
```

```js
pick [commit_hash] // 
pick [commit_hash]
s [commit_hash_123]

=>

pick [commit_hash]
s [commit_hash_123] // 可以自主移动位置
pick [commit_hash]
```

### 比较暂存区和 HEAD 文件差异

```js
git diff --cached
```

=>

```bash
diff --git a/git/README.md b/git/README.md
index fbb6644..ff14cc2 100644
--- a/git/README.md
+++ b/git/README.md
@@ -604,6 +604,37 @@ Successfully rebased and updated refs/heads/master.

 ### 合并间隔的 commit

+```js
+git log --graph // 查看 Git 提交日志
+```
+
+```js
+git rebase -i [commit_hash]    
+
+// 如果是根 commit 不显示，可以自己添加 commit_hash，或者使用 git rebase -i --root
+```
+
+```js
+pick [commit_hash] // 
+pick [commit_hash]
+s [commit_hash_123]
+
+=>
+
+pick [commit_hash]
+s [commit_hash_123] // 可以自主移动位置
+pick [commit_hash]
+```
+
+### 比较暂存区和 HEAD 文件差异
+
+```js
+git diff --cached // 比较暂存区和 HEAD
+```
```

### 比较工作区和暂存区文件差异

```js
git diff 
```

```bash
diff --git a/git/README.md b/git/README.md
index 17423f7..a146534 100644
--- a/git/README.md
+++ b/git/README.md
@@ -675,6 +675,7 @@ index fbb6644..ff14cc2 100644
 ### 比较工作区和暂存区文件差异

 ```js
+git diff
```



```js
git diff -- .\git\README.md // 可以指定文件进行对比
```

### 将暂存区恢复到 HEAD

> 应用场景：已经确定不想保留暂存区的变更，其次工作区还没有改好，这时又想把暂存区恢复到 HEAD。

```js
git reset HEAD // 重置暂存区内容

git reset --soft // 把 HEAD 指向的 commit 恢复到你指定的 commit，暂存区、工作区不变
git reset --hard // 把 HEAD，暂存区，工作区 都修改为 你指定的 commit 的时候的文件状态
git reset --mixed // 默认参数，把 HEAD，暂存区 修改为 你指定的 commit 的时候的文件状态，工作区保持不变 
```

### 将工作区恢复为暂存区

```js
git checkout ./
```

> Git 2.23 之后用 git switch 和 git restore 来替代 git checkout 功能。
> git switch 替换 git checkout 切换分支的功能，git restore 替换对工作区文件进行恢复的功能。

### 取消暂存区部分文件更改

```js
git reset HEAD ./styles/style.css
```

### 消除最近的几次提交

```js
git reset --hard [commit_hash] // 强制回退
```

### 比较不同提交文件差异

```bash
# 比较 master、develop 分支 README 文件的差异
git diff master develop ./README.md
```

```bash
# 比较不同提交记录文件的差异，可以指定不同分支的 commit
git diff [commit_hash] [commit_hash]
```

> master、develop 其实也是一种 commit，指向最近的一次提交。

### 正确删除文件的方法

```bash
git rm ./README.md
```

### 开发中临时加塞紧急任务

```bash
# 保存当前工作区和暂存区内容，此时工作区和暂存区会恢复到 HEAD
git stash 

# 查看栈中的存储列表
git stash list

# 弹出保存内容，不移除栈中信息
git stash apply

# 弹出保存内容，移除栈中信息
git stash pop
```

### 指定不需要 Git 管理文件

.gitignore 

```bash
# 不管理 js 及其子目录
*.js

# 不管理 js 子目录
*.js/ 
```

> 提交 commit 后，想再忽略一些已经提交的文件，可以这样处理：
> 把想忽略的文件添加到 .gitignore ；然后通过 `git rm -- cached name_of_file`  的方式删除掉 git 仓库里面无需跟踪的文件。

### 将 git 仓库备份到本地

```bash
# 备份仓库（哑协议，不存在进度条）
git clone --bare xxxxxxx/.git test.git

# 备份仓库（智能协议，存在进度条）
git clone --bare file:///xxxxxxx/.git test2.git
```

```bash
# 将本仓库推送到备份仓库
git remote add test2 file:///xxxxxxx/.test2.git 
git push --set-upstream test2
```

> --bare 克隆裸仓库。
> 备份仓库只克隆版本库(.git)就可以了，节约空间,如果以后想恢复备份的仓库，用版本库就可以恢复出工作目录。

## 三、Git 多人协作使用场景

### 多人单分支

#### 多人修改不同文件

```bash
git clone [ssh_url] [project_name] # 克隆远端仓库，本地创建指定项目名称
```

```bash
git config --local user.name "heora" # 设置本地用户名称
git config --local user.email "yueluo.yang@qq.com" # 设置本地邮箱地址
git config --local --list # 查看本地配置
```

```bash
git fetch # 拉取远端分支
```

```bash
git branch -av # 查看所有分支
```

```bash
git merge [remote_branch] # 合并远端分支

or

git pull # 拉取远端分支内容
```

#### 多人修改同文件不同区域

```bash
git pull # 同步远端代码
```

or

```bash
git fetch # 拉取远端分支
git merge # 合并远端分支
```

#### 多人修改同文件同区域

```bash
git pull # 同步远端代码，发生内容冲突

vim index.html # 根据提示直接打开文件进行修改，这里假设是 index.html

git status # 查看 merge 是否完成

git commit # 如果确实已经合并完毕
or
git merge --abort # 如果不想 merge，重新退回，这时可以丢弃 merge 的代码
```

#### 同时变更文件内容和文件内容

```bash
git pull # git 可以感知到文件名变化，直接合并，可以很智能的处理
```

#### 同一文件改成不同文件

```bash
git pull # 本地文件名已修改，线上也被修改，拉取代码时会发生冲突

git status # 查看 git 状态及提示信息，根据提示进行操作
```

### 集成分支使用禁忌

#### git push -f

强制提交，会覆盖线上已有内容。

```bash
git push -f # git push --force
```

gitlab、github 都提供了禁止使用这条命令的机制。（非必要比建议使用）

#### git rebase

变基会修改历史记录，可能会覆盖其他成员的劳动成果（心怀不轨），会导致其他成员的代码提交报错（指针前移的情况）。

```bash
git reabse
```

## 四、Git 与 Github

### Github 初识

GIt 通过引入 fork 概念使得开源项目的合作变得容易，但是 Git 仍有局限性。
Git 无法帮助开发人员寻找开源项目，许多程序员开发了优秀的开源项目，也很难被别人发现。

#### Github 核心功能

* Code Review
  * comment
* Project management 项目管理
  * issue
  * cards board
* Integrations 项目集成
  * provided by a third companies
* Team management 团队管理
* Social coding 开源
  * follow projects
  * explore your intersets
  * share your achievement
* Documentation 文档、静态站点、wikis
  * Github Pages
  * Wikis 说明手册
* Code hosting
  * 代码托管

#### 高效搜索项目

Advanced search 高级搜索。

https://github.com/search?q=&type=Repositories



<img src="./images/github_search.png" style="zoom: 40%" />



假设搜索 Git 相关内容：

```js
// 如果直接输入名称关键字，查询的只是仓库名称和描述信息。

git 学习资料
```

```js
// 可以指定查询范围

git 学习资料 in:readme
git 学习资料 in:readme stars:>1000
```


根据高级搜索面板可以自己组合关键字。

> Github 支持 code 和 repository options 同时搜索

#### 如何保证开源项目质量

Pull Request，可以给开源项目提交申请，也可以审查别人的申请。

Code Review。

#### 为何需要组织类型的仓库

settings - organizations，可以创建组织。

存在以下功能：

* Repositories
* People manage
* Teams：对仓库进行精细化的管控
* Projects
* Settings

可以对团队成员进行权限管控，组织成员可以看到所有仓库（无权限时）以及所有团队，可以自主申请加入团队。

### Github 与 Git 简单同步

#### 配置 SSH 公私钥

 ```bash
 ssh-keygen -t rsa -b 4096 -C "your_email@example.com" # 一直回车即可
 ```

```bash
cat ~/.ssh/id_rsa.pub # 查看公钥，粘贴到 Github（SSH and GPG Keys）
```

#### 本地仓库同步到 Github

create repository，将本地代码同步到远端仓库。



首次创建仓库

```bash
git remote add [custom_name] [remote_ssh_url]	# 添加远程仓库地址
git remote -v # 查看远端地址

git pull # 如果远端仓库已存在内容，需要先拉取代码	git pull => git fetch + merge

git push --set-upstream origin master
```



拉取分支合并

```bash
git remote -v # 查看远程版本库信息
git remote add githup <url> # 添加githup远程版本库
git fetch githup # 拉取远程版本库
git merge -h # 查看合并帮助信息
git merge --allow-unrelated-histories githup/master # 合并githup上的master分支（两分支不是父子关系，所以合并需要添加 --allow-unrelated-histories）
git push githup # 推送同步到githup仓库
```



rebase 情况，不使用 merge

```bash
1）先把远端的分支 fetch到本地，然后，再执行 rebase
2）直接 git pull --rebase
```

### Github 团队协作

#### 创建团队项目

Create a new repository - Owner（select organization）- private type  ，其他选择可以任意。


settings - Collaborators & teams，角色权限控制，可以建一个组织进行测试。

#### 选择适合团队的工作流

**需要考虑的因素**

* 团队人员的组成
* 研发设计能力
* 输出产品的特征
* 项目难易程度

**主干开发**

适用于开发团队系统设计和开发能力强。有一套有效的特性切换的实施机制，保证上线后无需修改代码就能修改系统行为。
适用于组件开发的团队，成员能力强，人员少，沟通顺畅。用户升级组件成本低的环境。

适用范围比较少。

**Git Flow**

适用于不具备主干开发能力。有预定的发布周期，需要执行严格的发布流程。


<img src="./images/git_flow.png" style="zoom: 80%" />

**Github Flow**

适用于不具备主干开发能力。随时集成随时发布：分支集成时经过代码评审和自动化测试，就可以立即发布。



<img src="./images/github_flow.png" />

**Gitlab Flow**

适用于不具备主干开发能力。无法控制准确的发布时间，但又要求不停地集成。


<img src="./images/gitlab_flow.png" />

#### 选择合适的分支集成策略



#### 启用 issue 跟踪需求和任务



## 五、Gitlab 实践

