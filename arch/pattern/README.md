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

```typescript
export class Rect {
  static of(left: number, top: number, width: number, height: number) {
    return new Rect(left, top, width, height)
  }
} 
```

例如 `React.crateElement`，它也相当于一个工厂方法。

```typescript
export default class Project {
  public static async create() {
    const crateor = new ProjectCreator()
    return await crateor.create()
  }
}
```

例如 ORM 框架 Sequelize 对于不同 dialect 的实现，也是工厂模式的一种。

适用场景：

* 隐藏被创建的类型；
* 构造函数较复杂；
* 构造函数较多。

## 观察者（Observer）

对象状态改变时通知其他对象。

```typescript
Vue.use(Vuex)

const store = new Vuex.store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

new Vue({
  el: '#app',
  store
})

methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

场景：

* 实现发布、订阅之间 1 对多的消息通知；
* 实现 Reactive Programming。

主动的、响应的：Proactive vs Reactive

命令式的程序有什么缺点？

* 组件间依赖比较强；
* 需要借助很多第三方代码去实现功能。

**每个组件都应该知道自己应该做什么。**

## 构造器（Builder）

将类型的创建构成抽象成各个部分。

例如，造车：

```
造车() {
	造发动机()
	造轮子()
	造内饰()
	...
}
```

例如 JSX 编写组件：

```tsx
<Page>
  <TitleBar />
  <Tabs>
  	<Tab title="首页" icon="">...</Tab>
    <Tab title="发现" icon="">...</Tab>
    <Tab title="个人中心" icon="">...</Tab>
  </Tabs>
</Page>
```

## 代理模式（Proxy）

将代理类作为原类的接口。通常代理类会在原类型的基础上做一些特别的事情。

例如 `vue reactivity` 实现。

```typescript
function createReactiveObject(
	target: Target,
  // ...
) {
	const proxy = new Proxy(
  	target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  ) 
}

// get track
// set trigger
```

**什么时候适合用代理模式？**

如果你想在原有的类型上增加一些功能和变通处理，但是又不希望用户意识到，这时就可以使用代理模式。

## 适配器模式（Adapter）

通过一层包装，让接口不同的类型拥有相同的用法。因此也称为包装模式（wrapper）。

让不同的组件拥有相同的设计接口，**抹平差异**，简化用户操作。用户不需要去理解多个概念，减少心智负担。

例如 `ant-design`  中的：

* onChange：
* defaultValue

例如 React SyntheticEvent。

[https://reactjs.org/docs/events.html#gatsby-focus-wrapper](https://reactjs.org/docs/events.html#gatsby-focus-wrapper)

## 外观模式（Facade）

将**多个复杂的功能**隐藏在统一的调用接口中。

例如 `vite dev`、`vite build` 。

内部功能实现很复杂，我们可以将内部功能按照用户的需要分类，做成门店，让用户使用，不需要关心内部实现逻辑。

