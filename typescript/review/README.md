# TypeScript 进阶指南

## 原始类型与对象类型

在 JavaScript 中，null 与 undefined 分别表示“**这里有值，但是个空值**”和“**这里没有值**”。

在 TypeScript 中，null 与 undefined 类型都是**有具体意义的类型**。



在 TypeScript 中，void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值。



使用元组能帮助我们进一步提升**数组结构的严谨性**，包括基于位置的类型标注、避免出现越界访问等等。

```typescript
const arr7: [name: string, age: number, male?: boolean] = ['heora', 599, true]

const arr1: string[] = []
const [ele1, ele2, ...rest] = arr1
```



推荐使用 interface 描述**对象、类的结构**。使用类型别名用来**将一个函数签名、一组联合类型、一个工具类型等等抽离成一个完整独立的类型**。大部分场景下接口结构都可以被类型别名所取代，因此，只要你觉得统一使用类型别名让你觉得更整齐，也没什么问题。



`Object`、`object`、`{}`

* 在任何时候都**不要使用** Object 以及类似的装箱类型。
* 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。
  * 使用 `Record<string, unknown>` 或 `Record<string, any>` 表示对象
  * 使用 `unknown[]` 或 `any[]` 表示数组
  * 使用 `(...args: any[]) => any`表示函数
* 避免使用`{}`



**unique symbol**

Symbol 在 JavaScript 中代表着一个唯一的值类型，它类似于字符串类型，可以作为对象的属性名，并用于避免错误修改 对象 / Class 内部属性的情况。

在 TypeScript 中，symbol 类型并不具有这一特性，一百个具有 symbol 类型的对象，它们的 symbol 类型指的都是 TypeScript 中的同一个类型。

TypeScript 中支持unique symbol 一类型声明，它是 symbol 类型的子类型，每一个 unique symbol 类型都是独一无二的。

```typescript
const symbolFoo: symbol = Symbol('heora')
const symbolBar: symbol = symbolFoo

const uniqueSymbolFoo: unique symbol = Symbol('heora')
// 类型不兼容
const uniqueSymbolBar: unique symbol = uniqueSymbolFoo
```



在 JavaScript 中，我们可以用 `Symbol.for` 方法来复用已创建的 Symbol，如 `Symbol.for("heora")` 会首先查找全局是否已经有使用 `heora` 作为 key 的 Symbol 注册，如果有，则返回这个 Symbol，否则才会创建新的 Symbol 。

在 TypeScript 中，如果要引用已创建的 unique symbol 类型，则需要使用类型查询操作符 typeof ：

```typescript
declare const uniqueSymbolFoo: unique symbol;
const uniqueSymbolBaz: typeof uniqueSymbolFoo = uniqueSymbolFoo
```

## 字面量类型与枚举

字面量类型主要包括**字符串字面量类型**、**数字字面量类型**、**布尔字面量类型**和**对象字面量类型**，它们可以直接作为类型标注。

单独使用字面量类型比较少见，因为单个字面量类型并没有什么实际意义。
它通常和联合类型一起使用，表达一组字面量类型：

```typescript
interface Res {
  code: 10000 | 10001 | 50000
  status: 'success' | 'failure'
  data: any
}
```

**无论是原始类型还是对象类型的字面量类型，它们的本质都是类型而不是值**。它们在编译时同样会被擦除，同时也是被存储在内存中的类型空间而非值空间。



联合类型代表**一组类型的可用集合**，只要最终赋值的类型属于联合类型的成员之一，就可以认为符合这个联合类型。

```typescript
type Code = 10000 | 10001 | 50000

type Status = "success" | "failure"
```

- 对于联合类型中的函数类型，需要使用括号`()`包裹起来
- 函数类型并不存在字面量类型，因此这里的 `(() => {})` 就是一个合法的函数类型
- 你可以在联合类型中进一步嵌套联合类型，但这些嵌套的联合类型最终都会被展平到第一级中

```typescript
interface Tmp {
  user:
    | {
        vip: true
        expires: string
      }
    | {
        vip: false
        promotion: string
      }
}

declare var tmp: Tmp

if (tmp.user.vip) {
  console.log(tmp.user.expires)
}
```



枚举和对象的重要差异在于，**对象是单向映射的**，我们只能从键映射到键值。
而**枚举是双向映射的**，即你可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```typescript
enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo // 0
const fooKey = Items[0] // "Foo"
```

```js
// 枚举编译产物

"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz";
})(Items || (Items = {}));

// 这种代码实现方式叫做反向映射，这就是枚举的实现原理。
```

仅有值为数字的枚举成员才能够进行这样的双向枚举，**字符串枚举成员仍然只会进行单次映射**：

```js
enum Items {
  Foo,
  Bar = "BarValue",
  Baz = "BazValue"
}

;('use strict')
var Items
;(function (Items) {
  Items[(Items['Foo'] = 0)] = 'Foo'
  Items['Bar'] = 'BarValue'
  Items['Baz'] = 'BazValue'
})(Items || (Items = {}))
```



常量枚举普通枚举的差异主要在访问性与编译产物。对于常量枚举，你**只能通过枚举成员访问枚举值**（而不能通过值访问成员）。同时，在编译产物中并不会存在一个额外的辅助对象（如上面的 Items 对象），对枚举成员的访问会被**直接内联替换为枚举的值**。

```js
const enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0

// =>

const fooValue = 0 /* Foo */; // 0
```



**类型控制流分析中的字面量类型**

除了手动声明字面量类型以外，TypeScript 也会在某些情况下将变量类型推导为字面量类型，看这个例子：

```typescript
let identifier = "heora" // let identifier: string
const identifier2 = 'heora' // const identifier2: "heora"
```

使用 const 声明的变量，其类型会从值推导出最精确的字面量类型。对象类型则只会推导至符合其属性结构的接口，不会使用字面量类型：

```typescript
const info = {
  name: 'heora',
  age: 24,
  profile: {
    job: 'fe'
  }
}
// const info: {
//   name: string;
//   age: number;
//   profile: {
//       job: string;
//   };
// }
```

使用 let 声明的变量是可以再次赋值的，在 TypeScript 中要求赋值类型始终与原类型一致。因此对于 let 声明，**只需要推导至这个值从属的类型即可**。而 const 声明的原始类型变量将不再可变，因此类型可以直接一步到位收窄到最精确的字面量类型，但对象类型变量仍可变。

## 函数重载与面向对象

### 函数重载

我们也可以像对变量进行类型标注那样，对 `foo` 这个变量进行类型声明：

```typescript
const foo: (name: string) => number = name => {
  return name.length
}
```

`(name: string) => number` 在这里的含义是 TypeScript 中的**函数类型签名**。

不过当函数类型声明混合箭头函数声明时，代码的可读性会非常差。一般不推荐这么使用，要么**直接在函数中进行参数和返回值的类型声明**，要么**使用类型别名将函数声明抽离出来**：

```typescript
type FuncFoo = (name: string) => number

const foo: FuncFoo = name => {
  return name.length
}
```

如果只是为了描述这个函数的类型结构，我们还可以使用 interface 来进行函数声明：

```typescript
interface FuncFooStruct {
  (name: string): number
}
```

这时的 interface 被称为 **Callable Interface**。




在 TypeScript 中，一个没有返回值（即没有调用 return 语句）的函数，其返回类型应当被标记为 void 而不是 undefined，即使它实际的值是 undefined。

```typescript
function foo(): void {}

// 调用了 return 语句，但没有返回值
function bar(): void {
  return
}
```

**在 TypeScript 中，undefined 类型是一个实际的、有意义的类型值，而 void 才代表着空的、没有意义的类型值。** 

因此在我们没有实际返回值时，使用 void 类型能更好地说明这个函数**没有进行返回操作**。

在上面的第二个例子中，更好的方式是使用 undefined。

```typescript
function bar(): undefined {
  return
}
```



我们可以使用 TypeScript 提供的**函数重载签名（Overload Signature）**实现这样的效果：

```typescript
function func(foo: number, bar: true): string
function func(foo: number, bar?: false): number
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo)
  } else {
    return foo * 599
  }
}

const res1 = func(599) // number
const res2 = func(599, true) // string
const res3 = func(599, false) // number
```

TypeScript 中的重载更像是伪重载，**它只有一个具体实现，其重载体现在方法调用的签名上而非具体实现上**。



对于异步函数、Generator 函数、异步 Generator 函数的类型签名，其参数签名基本一致，而返回值类型则稍微有些区别：

```typescript
async function asyncFunc(): Promise<void> {}

function* genFunc(): Iterable<void> {}

async function* asyncGenFunc(): AsyncIterable<void> {}
```

### 类、抽象类

属性的类型标注类似于变量，而构造函数、方法、存取器的类型编标注类似于函数：

```typescript
class Foo {
  prop: string

  constructor(inputProp: string) {
    this.prop = inputProp
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  get propA(): string {
    return `${this.prop}+A`
  }

  set propA(value: string) {
    this.prop = `${value}+A`
  }
}
```

> setter 方法**不允许进行返回值的类型标注**，你可以理解为 setter 的返回值并不会被消费，它是一个只关注过程的函数。

类也可以通过**类声明**和**类表达式**的方式创建：

```typescript
const Foo = class {
  prop: string

  constructor(inputProp: string) {
    this.prop = inputProp
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }
}
```

在 TypeScript 中我们能够为 Class 成员添加这些修饰符：`public` / `private` / `protected` / `readonly`。
除 readonly 以外，其他三位都属于访问性修饰符，而 readonly 属于操作性修饰符。

- public：此类成员在**类、类的实例、子类**中都能被访问。
- private：此类成员仅能在**类的内部**被访问。
- protected：此类成员仅能在**类与子类中**被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即**不允许再访问受保护的成员**。

我们通过构造函数为类成员赋值的方式还是略显麻烦，需要声明类属性以及在构造函数中进行赋值。简单起见，我们可以**在构造函数中对参数应用访问性修饰符**：

```typescript
const Foo = class {
  constructor(public prop: string) {
    this.prop = prop
  }

  print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }
}
```

此时，参数会被直接作为类的成员（即实例的属性），免去后续的手动赋值。

在 TypeScript 中，你可以使用 static 关键字来标识一个成员为静态成员：

```typescript
class Foo {
  static staticHandler() { }

  public instanceHandler() { }
}
```

不同于实例成员，在类的内部静态成员无法通过 this 来访问，需要通过 `Foo.staticHandler` 这种形式进行访问。我们可以查看编译到 ES5 及以下 target 的 JavaScript 代码。

```js
var Foo = /** @class */ (function () {
  function Foo() {}
  Foo.staticHandler = function () {}
  Foo.prototype.instanceHandler = function () {}
  return Foo
})()
```

从中我们可以看到，**静态成员直接被挂载在函数体上**，而**实例成员挂载在原型上**，这就是二者的最重要差异：**静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）**。而原型对象上的实例成员则会**沿着原型链进行传递**，也就是能够被继承。



与 JavaScript 一样，TypeScript 中也使用 extends 关键字来实现继承：

```typescript
class Base {}

class Derived extends Base {}
```

对于这里的两个类，比较严谨的称呼是 **基类（Base）** 与 **派生类（Derived）**。



抽象类是对类结构与方法的抽象，简单来说，**一个抽象类描述了一个类中应当有哪些成员（属性、方法等）**，**一个抽象方法描述了这一方法在实际实现中的结构**。

抽象类使用 abstract 关键字声明：

```typescript
abstract class AbsFoo {
  abstract absProp: string
  abstract get absGetter(): string
  abstract absMethod(name: string): string
}
```

我们可以实现（implements）一个抽象类：

```typescript
class Foo implements AbsFoo {
  absProp: string = 'heora'

  get absGetter() {
    return 'heora'
  }

  absMethod(name: string) {
    return name
  }
}
```

此时，我们必须完全实现这个抽象类的每一个抽象成员。

对于抽象类，它的本质就是描述类的结构。我们也可以使用 interface 声明类的结构：

```typescript
interface FooStruct {
  absProp: string
  get absGetter(): string
  absMethod(input: string): string
}

class Foo implements FooStruct {
  absProp: string = 'heora'

  get absGetter() {
    return 'heora'
  }

  absMethod(name: string) {
    return name
  }
}
```

我们还可以使用 **Newable Interface** 来描述一个类的结构

```typescript
class Foo {}

interface FooStruct {
  new (): Foo
}

declare const NewableFoo: FooStruct

const foo = new NewableFoo()
```



**抽象类和接口**

抽象类是只为了类服务的，并且在运行时也会存在，而接口更多是服务对象类型的结构描述，并且在运行时就被擦除了。

抽象类就是为了描述一个类应该符合怎样的一个抽象结构，比如内部抽象方法的入参与返回值类型，它的本质是一个合法的类。从类型层面说明的话，抽象类是存在于值空间的类型描述与约束，而接口则只存在于类型空间。

### 私有构造函数

我们通常不会对类的构造函数进行访问性修饰

```typescript
class Foo {
  private constructor() {}
}
```

有些场景下私有构造函数确实有奇妙的用法，比如像我一样把类作为 utils 方法时，此时 Utils 类内部全部都是静态成员，我们也并不希望真的有人去实例化这个类。此时就可以使用私有构造函数来阻止它被错误地实例化：

```typescript
class Utils {
  public static identifier = 'heora'

  private constructor() {}

  public static makeUHappy() {}
}
```

或者在一个类希望把实例化逻辑通过方法来实现，而不是通过 new 的形式时，也可以使用私有构造函数来达成目的。

### SOLID 原则

SOLID 原则是面向对象编程中的基本原则，它包括以下这些五项基本原则。


S，**单一功能原则**，**一个类应该仅具有一种职责**，这也意味着只存在一种原因使得需要修改类的代码。如对于一个数据实体的操作，其读操作和写操作也应当被视为两种不同的职责，并被分配到两个类中。更进一步，对实体的业务逻辑和对实体的入库逻辑也都应该被拆分开来。

O，**开放封闭原则**，**一个类应该是可扩展但不可修改的**。

假设我们的业务中支持通过微信、支付宝登录，原本在一个 login 方法中进行 if else 判断，假设后面又新增了抖音登录、美团登录，难道要再加 else if 分支（或 switch case）吗？

```typescript
enum LoginType {
  WeChat,
  TaoBao,
  TikTok
  // ...
}

class Login {
  public static handler(type: LoginType) {
    if (type === LoginType.WeChat) {
    } else if (type === LoginType.TikTok) {
    } else if (type === LoginType.TaoBao) {
    } else {
      throw new Error('Invalid Login Type!')
    }
  }
}
```

基于开放封闭原则，我们应当将登录的基础逻辑抽离出来，不同的登录方式通过扩展这个基础类来实现自己的特殊逻辑。

```typescript
enum LoginType {
  WeChat,
  TaoBao,
  TikTok
  // ...
}

abstract class LoginHandler {
  abstract handler(): void
}

class WeChatLoginHandler implements LoginHandler {
  handler() {}
}

class TaoBaoLoginHandler implements LoginHandler {
  handler() {}
}

class TikTokLoginHandler implements LoginHandler {
  handler() {}
}

class Login {
  public static handlerMap: Record<LoginType, LoginHandler> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.TikTok]: new TikTokLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler()
  }
  public static handler(type: LoginType) {
    Login.handlerMap[type].handler()
  }
}
```

L，**里式替换原则**，**一个派生类可以在程序的任何一处对其基类进行替换**。这也就意味着，子类完全继承了父类的一切，对父类进行了功能地扩展（而非收窄）。

I，**接口分离原则**，**类的实现方应当只需要实现自己需要的那部分接口**。比如微信登录支持指纹识别，支付宝支持指纹识别和人脸识别，这个时候微信登录的实现类应该不需要实现人脸识别方法才对。这也就意味着我们提供的抽象类应当按照功能维度拆分成粒度更小的组成才对。

D，**依赖倒置原则**，这是实现开闭原则的基础，它的核心思想即是**对功能的实现应该依赖于抽象层**，即不同的逻辑通过实现不同的抽象类。还是登录的例子，我们的登录提供方法应该基于共同的登录抽象类实现（LoginHandler），最终调用方法也基于这个抽象类，而不是在一个高阶登录方法中去依赖多个低阶登录提供方。

## 内置类型



