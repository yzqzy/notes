

# amo.js

## 面临问题

响应式 API 调研

* hook 机制
  * 抛弃 defineProperty、Proxy 代理，回归函数式编程
  * 发布订阅模式，自动收集依赖
  * 函数式编程
* 更新流程、异步处理
* 静态编译，抛弃虚拟 DOM

## 技术调研

[solid.js](https://www.solidjs.com/)，使用简单、高性能的响应式 API 构建用户界面。

[js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/current.html)

优点

* 类 react 语法
* 更新只需要更新状态代码快，不需要重新执行函数体
* 数据驱动视图
* 自动收集依赖，不需要显式声明依赖
* 函数式操作，无赋值语句
* 无虚拟 DOM，重编译轻运行
* 点对点更新

缺点

* 不支持异步处理
* props 不支持解构，会丢失代理特性

[源码分析](https://notes.yueluo.club/solid/index.html)

## 案例实现



## 参考文章

[如何评价前端框架 Solid?](https://www.zhihu.com/question/460278146)

[精读《SolidJS》](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/255.%E7%B2%BE%E8%AF%BB%E3%80%8ASolidJS%E3%80%8B.md)

[Introduction to Reactivity with SolidJS](https://www.youtube.com/watch?v=J70HXl1KhWE)

[React vs SolidJS, Fight!](https://www.youtube.com/watch?v=OqcHoLWyyIw)

