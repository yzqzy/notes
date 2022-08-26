# vscode

# vscode 代码规范

推荐安装插件

* Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code

* Live Server

* Material Icon Theme

* ESLint

* Prettier - Code formatter

* Vetur

  * 目前前端项目都是 vue 2 项目，推荐使用 vetur

  


可选插件：

* TypeScript Extension Pack
* EditorConfig for VS Code
* Vue Language Features (Volar)
  * 暂时不用安装，vue 3 项目推荐使用，到时候可以根据项目生成 workspace 文件，目前统一配置即可
* TypeScript Vue Plugin (Volar)



> 关于 workspace 可以查看[这篇文章](https://juejin.cn/post/7066032710778617892)
>
> 主要是根据项目类型和框架版本生成不同的 workspace 文件，然后团队统一配置。



<div><img src="./images/config.png" style="zoom: 90%" /></div>



项目通用配置：

```json
// settings.json

{
    "workbench.colorTheme": "Default Dark+",
    "workbench.iconTheme": "material-icon-theme",
    "editor.tabSize": 2,
    "editor.fontSize": 13, // allow customization
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur",
        // "editor.defaultFormatter": "Vue.volar",
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "minapp-vscode.disableAutoConfig": true,
    "files.associations": {
        "*.cjson": "jsonc",
        "*.wxss": "css",
        "*.wxs": "javascript"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    }
}
```



commit 规范可以由规范自己制定，社区都有成熟的包支持。

社区比较流行的是 angular 团队的 commit 规范。


commit message 格式如下：

```xml
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

> type 和 subject 必需，scope、body、footer 可选。

| type     | 描述                                               |
| -------- | -------------------------------------------------- |
| feat     | 新增feature                                        |
| fix      | 修复bug                                            |
| docs     | 修改文档，如readme.md                              |
| style    | 修改代码格式，不改变代码逻辑，如逗号、缩进、空格等 |
| refactor | 代码重构，没有新增功能或修复bug                    |
| perf     | 优化相关，如提升性能、用户体验等                   |
| test     | 测试用例，包括单元测试、集成测试                   |
| ci       | 修改 ci 配置文件或脚本，如 jenkins fastlame        |
| chore    | 修改构建脚本、或者增加依赖库、工具等               |
| revert   | 回滚之前的commit                                   |
