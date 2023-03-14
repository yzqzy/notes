# design pattern

## 设计模式

设计模式是解决方案，是对软件设计方案中普遍存在的问题提出的解决方案。


**算法是不是设计模式？**

算法不是设计模式。
算法解决的是计算问题，不是解决设计上的问题。设计模式通常讨论的是对象间的关系、程序的组织形式等设计问题。

**面向对象是不是设计模式？**

面向对象是设计模式。

**函数式编程是不是设计模式？**

函数式编程是设计模式。


面向对象和函数式概念包含的范围很大，不大适合做太具体的设计模式探讨。
或者说，OOP 和 FP 是两类设计模式的集合，是编程范式。

## 前端设计模式

对前端普遍问题的解法。

前端中会用到传统的设计模式：

* 工厂（Factory）
* 单例（Signleton）
* 观察者（Observer）
* 构造器（Builder）
* 代理模式（Proxy）
* 外观模式（Facade）
* 适配器（Adapter）
* 装饰器（Decorator）
* 迭代器（Generator）

还有一些偏前端的：

* 组件化（Component）
* Restful
* 单项数据流
* Immutable
* 插件
* DSL（元数据）

## 单例（singleton）

确保一个类只有一个实例。例如 `document.window` 。

常见用法：

```tsx
class ComponentsLoader {
  private static inst: ComponentsLoader = new ComponentsLoader()

  static get() {
    return ComponentsLoader.inst
  }
}

class IDGen {
  private constructor() {}
  
  static inst = new IDGen()
  
  get() { return inst }
}
```

隐含单例的逻辑：

```typescript
const editor = useContext(RednerContext)
```

设计模式关注的是设计目标，并不是对设计实现的强制约束。闭包也可以实现单例，例如：

```typescript
const singleton = () => {
  const obj = new ...
  return () => {
    ...
  }
}
```

**理解设计模式，灵活使用设计模式。**

总结：

* 可以用于配置类、组件上下文中共用的类等；
* 用于对繁重资源的管理（例如数据库连接池）。

## 工厂（Factory）

将类型的构造函数隐藏在创建类型的方法之下。

`React.crateElement`

```typescript
```

