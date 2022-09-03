# TypeScript 进阶指南

## 原始类型与对象类型

在 JavaScript 中，null 与 undefined 分别表示“**这里有值，但是个空值**”和“**这里没有值**”。

在 TypeScript 中，null 与 undefined 类型都是**有具体意义的类型**。



在 TypeScript 中，void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值。



使用元组能帮助我们进一步提升**数组结构的严谨性**，包括基于位置的类型标注、避免出现越界访问等等。

```typescript
const arr7: [name: string, age: number, male?: boolean] = ['heora', 24, true]

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
    return foo * 24
  }
}

const res1 = func(24) // number
const res2 = func(24, true) // string
const res3 = func(24, false) // number
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

TypeScript 中提供了一个内置类型 any ，表示任意类型，我们就可以使用 any 作为参数的类型：

```typescript
type log = (message?: any, ...optionalParams: any[]) => void
```

一个被标记为 any 类型的参数可以接受任意类型的值。

any 类型的变量几乎无所不能，它可以在声明后再次接受任意类型的值，同时可以被赋值给任意其它类型的变量。

* 如果是类型不兼容报错导致你使用 any，考虑用类型断言替代
* 如果是类型太复杂导致你不想全部声明而使用 any，考虑将这一处的类型去断言为你需要的最简类型
* 如果你是想表达一个未知类型，更合理的方式是使用 unknown

unknown 类型和 any 类型有些类似，一个 unknown 类型的变量可以再次赋值为任意其它类型，但只能赋值给 any 与 unknown 类型的变量。



never 类型被称为 **Bottom Type**，是**整个类型系统层级中最底层的类型**。和 null、undefined 一样，它是所有类型的子类型，但只有 never 类型的变量能够赋值给另一个 never 类型变量。


**类型断言**能够显式告知类型检查程序当前这个变量的类型，可以进行类型分析地修正、类型。

```typescript
let unknownVar: unknown

;(unknownVar as { foo: () => {} }).foo()
```


如果在使用类型断言时，原类型与断言类型之间差异过大，就要使用**双重断言**。

```typescript
const str: string = 'heora'

;(str as unknown as { handler: () => {} }).handler()

;(<{ handler: () => {} }>(<unknown>str)).handler()
```

> 使用 <> 也可以用来表示断言，不过虽然书写更简洁，但是在 TSX 中尖括号断言并不能很好地被分析出来。

**非空断言**其实是类型断言的简化，它使用 `!` 语法（剔除了 null 和 undefined 类型）。

```typescript
declare const foo: {
  func?: () => {
    prop?: number | null
  }
}

foo.func!().prop!.toFixed()

// 类似可选链用法
foo.func?.().prop?.toFixed()
```

非空断言的常见场景有很多，例如：

```typescript
const element = document.querySelector('#id')!

const target = [1, 2, 3, 24].find(item => item === 24)!     
```



**类型层级**

any 与 unknown 属于 **Top Type**，表现在它们包含了所有可能的类型。
never 属于 **Bottom Type**，表现在它是一个虚无的、不存在的类型。

类型层级关系

* 最顶级的类型，any 与 unknown
* 特殊的 Object ，它也包含了所有的类型
* String、Boolean、Number装箱类型
* 原始类型与对象类型
* 字面量类型，即更精确的原始类型与对象类型
  * null 和 undefined 并不是字面量类型的子类型
* 最底层的 never

> 这个层级链并不完全，还有联合类型、交叉类型、函数类型的情况

类型断言的工作原理也和类型层级有关，在判断断言是否成立，即差异是否能接受时，实际上判断的即是这两个类型是否能够找到一个公共的父类型。如果找不到具有意义的公共父类型呢，这个时候就需要使用 **Top Type** ，我们把它先断言到 **Top Type**，那么就拥有了公共父类型 **Top Type**，再断言到具体的类型。

```typescript
const str: string = 'heora'

;(str as string | { handler: () => {} } as { handler: () => {} }).handler()
```

## 类型工具

按照使用方式来划分，类型工具可以分成三类：**操作符、关键字与专用语法**。

按照使用目的来划分，类型工具可以分为 **类型创建** 与 **类型安全保护** 两类。

### 类型别名

类型别名可以说是 TypeScript 类型编程中最重要的一个功能，从一个简单的函数类型别名，到让你眼花缭乱的类型体操，都离不开类型别名。

```typescript
type A = string

type StatusCode = 200 | 301 | 400 | 500 | 502
type PossibleDataTypes = string | number | (() => unknown)

type Handler = (e: Event) => void
const clickHandler: Handler = e => {}
const moveHandler: Handler = e => {}
const dragHandler: Handler = e => {}

type ObjType = {
  name: string
  age: number
}
```

类型别名还能作为工具类型。**工具类同样基于类型别名，只是多了个泛型**。

> 类型别名一旦接受了泛型，我们就叫它工具类型。

```typescript
type MaybeArray<T> = T | T[]

function ensureArray<T>(input: MaybeArray<T>): T[] {
  return Array.isArray(input) ? input : [input]
}
```

### 联合类型、交叉类型

联合类型的符号是`|`，即只需要符合联合类型中的一个类型。

交叉类型的符号是`&`，即只**需要同时满足 A 与 B 两个类型**。

```typescript
interface NameStruct {
  name: string
}

interface AgeStruct {
  age: number
}

type ProfileStruct = NameStruct & AgeStruct

const profile: ProfileStruct = {
  name: 'heora',
  age: 24
}
```

联合类型组成的交叉类型，取联合类型的交集

```typescript
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2) // 1 | 2
type UnionIntersection2 = (string | number | symbol) & string // string
```

### 索引类型

**索引类型**指的不是某一个特定的类型工具，它包含三个部分：**索引签名类型**、**索引类型查询**与**索引类型访问**。

**它们都通过索引的形式来进行类型操作**，但索引签名类型是**声明**，后两者则是**读取**。

**1. 索引签名类型**

```typescript

interface AllStringTypes {
  [key: string]: string
}

type AllStringTypes = {
  [key: string]: string
}

interface AnyTypeHere {
  [key: string]: any
}
const foo: AnyTypeHere['heora'] = 'any value'
```

**2. 索引类型查询**

索引类型查询，即 keyof 操作符。它可以将对象中的所有键转换为对应字面量类型，然后再组合成联合类型。

>  keyof 的产物必定是一个联合类型

```typescript
interface Foo {
  heora: 1
  24: 2
}

type FooKeys = keyof Foo // 'heora' | 24
```

**3. 索引类型访问**

```typescript
interface Foo {
  propA: number
  propB: boolean
}

type PropAType = Foo['propA']
type PropBType = Foo['propB']
```

看起来这里就是普通的值访问，但实际上这里的`'propA'`和`'propB'`都是**字符串字面量类型**，**而不是一个 JavaScript 字符串值**。

索引类型查询的本质其实就是，**通过键的字面量类型（`'propA'`）访问这个键对应的键值类型（`number`）**

```typescript
interface Foo {
  propA: number
  propB: boolean
  propC: string
}

type PropTypeUnion = Foo[keyof Foo] //  string | number | boolean
```

使用字面量联合类型进行索引类型访问时，其结果就是将联合类型每个分支对应的类型进行访问后的结果，重新组装成联合类型。

**索引类型查询、索引类型访问通常会和映射类型一起搭配使用**，前两者负责访问键，而映射类型在其基础上访问键值类型。

### 映射类型

映射类型的主要作用即是**基于键名映射到键值类型**。

```typescript
type Stringify<T> = {
  [K in keyof T]: string
}
```

假设这个工具类型只会接受一个对象类型，使用 keyof 获得这个对象类型的键名组成字面量联合类型，然后通过映射类型（即这里的 in 关键字）将这个联合类型的每一个成员映射出来，并将其键值类型设置为 string。

```typescript
interface Foo {
  prop1: string
  prop2: number
  prop3: boolean
  prop4: () => void
}

type StringifiedFoo = Stringify<Foo>
// type StringifiedFoo = {
//   prop1: string;
//   prop2: string;
//   prop3: string;
//   prop4: string;
// }

// 等价于
interface StringifiedFoo {
  prop1: string
  prop2: string
  prop3: string
  prop4: string
}
```

我们应该很少会需要把一个接口的所有属性类型映射到 string，既然拿到了键，我们也可以获取值。

```typescript
type Clone<T> = {
  [K in keyof T]: T[K]
}

type ClonedFoo = Clone<Foo>
```

 `T[K]` 其实就是上面说到的索引类型访问，我们使用键的字面量类型访问到了键值的类型，这里就相当于克隆了一个接口。

 `K in ` 属于映射类型语法，`keyof T ` 属于 keyof 操作符，`[K in keyof T]` 的 `[]` 属于索引签名类型，`T[K]` 属于索引类型访问。



类型别名、联合类型、索引类型、映射类型创建新类型实现方式与的常见搭配：

| 类型工具     | 创建新类型的方式                                             | 常见搭配           |
| ------------ | ------------------------------------------------------------ | ------------------ |
| 类型别名     | 将一组类型/类型结构封装，作为一个新的类型                    | 联合类型、映射类型 |
| 工具类型     | 在类型别名的基础上，基于泛型去动态创建新类型                 | 基本所有类型工具   |
| 联合类型     | 创建一组类型集合，满足其中一个类型即满足这个联合类型（\|\|） | 类型别名、工具类型 |
| 交叉类型     | 创建一组类型集合，满足其中所有类型才满足映射联合类型（&&）   | 类型别名、工具类型 |
| 索引签名类型 | 声明一个拥有任意属性，键值类型一致的接口结构                 | 映射类型           |
| 索引类型查询 | 从一个接口结构，创建一个由其键名字符串字面量组成的联合类型   | 映射类型           |
| 索引类型访问 | 从一个接口结构，使用键名字符串字面量访问到对应的键值类型     | 类型别名、映射类型 |
| 映射类型     | 从一个联合类型依次映射到其内部的每一个类型                   | 工具类型           |

### 类型查询操作符

TypeScript 存在两种功能不同的 typeof 操作符。

一种 typeof 操作符就是 JavaScript 中，用于检查变量类型的 typeof 。

另一种是 TypeScipt 新增的用于类型查询的 typeof，即 **Type Query Operator**，这个 typeof 返回的是一个 TypeScript 类型。

TypeScript 的 typeof 返回的是一个 TypeScript 类型。

```typescript
const author = 'heora'

const authorObj = { name: 'heora' }

const nullVar = null
const undefinedVar = undefined

const func = (input: string) => {
  return input.length > 10
}

type Str = typeof author // "heora"
type Obj = typeof authorObj // { name: string; }
type Null = typeof nullVar // null
type Undefined = typeof undefined // undefined
type Func = typeof func // (input: string) => boolean
```

我们不仅可以直接在类型标注中使用 typeof，还能在工具类型中使用 typeof。

```typescript
const func = (input: string) => {
  return input.length > 10
}
// const func: (input: string) => boolean
const func2: typeof func = (name: string) => {
  return name === 'heora'
}
```

绝大部分情况下，typeof 返回的类型就是当你把鼠标悬浮在变量名上时出现的推导后的类型，并且是**最窄的推导程度（即到字面量类型的级别**

在逻辑代码中使用的 typeof 是 JavaScript 中的 typeof，类型代码（如类型标注、类型别名中等）中的是类型查询的 typeof 。

### 类型守卫

TypeScript 中提供了非常强大的类型推导能力，它会随着你的代码逻辑不断尝试收窄类型，这一能力称之为**类型的控制流分析**。

```typescript
function foo(input: string | number) {
  if (typeof input === 'string') {
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

我们通过 if 条件中的表达式进行了**类型保护**，即告知了流过这里的分析程序每个 if 语句代码块中变量会是何类型。这即是编程语言的类型能力中最重要的一部分：**与实际逻辑紧密关联的类型**。




```typescript
function isString(input: unknown): boolean {
  return typeof input === 'string'
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('yueluo', 'heora')
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

if 条件中的表达式被提取出来，理想情况下，如果 isString 返回了 true，那 input 肯定也是 string 类型。

ts 类型控制流分析做不到跨函数上下文来进行类型的信息收集，为了解决这一类型控制流分析的能力不足， TypeScript 引入了 **is 关键字**来显式地提供类型信息。

```typescript
function isString(input: unknown): input is string {
  return typeof input === 'string'
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“string | number”上不存在属性“replace”。
    input.replace('yueluo', 'heora')
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

**isString 函数称为类型守卫**，在它的返回值中，我们不再使用 boolean 作为类型标注，而是使用 `input is string`：

* input 是函数的参数
* `is string`，即 **is 关键字 + 预期类型**，即如果这个函数成功返回为 true，那么 is 关键字前这个入参的类型，就会**被这个类型守卫调用方后续的类型控制流分析收集到**。

类型守卫函数中并不会对判断逻辑和实际类型的关联进行检查：

```typescript
function isString(input: unknown): input is number {
  return typeof input === 'string'
}

function foo(input: string | number) {
  if (isString(input)) {
    // 类型“number”上不存在属性“replace”
    input.replace('yueluo', 'heora')
  }
  if (typeof input === 'number') {
  }
  // ...
}
```

**类型守卫有些类似于类型断言，你指定什么类型，它就是什么类型。**



[`in` 操作符](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Fin) 并不是 TypeScript 中新增的概念，而是 JavaScript 中已有的部分，它可以通过 `key in object` 的方式来判断 key 是否存在于 object 或其原型链上。

```typescript
interface Foo {
  foo: string
  fooOnly: boolean
  shared: number
}

interface Bar {
  bar: string
  barOnly: boolean
  shared: number
}

function handle(input: Foo | Bar) {
  if ('foo' in input) {
    input.fooOnly
  } else {
    input.barOnly
  }
}
```

JavaScript 中还存在一个功能类似于 typeof 与 in 的操作符：[instanceof](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FOperators%2Finstanceof)，它判断的是原型级别的关系。同样的，instanceof 也可以用来进行类型保护：

```typescript
class FooBase {}

class BarBase {}

class Foo extends FooBase {
  fooOnly() {}
}
class Bar extends BarBase {
  barOnly() {}
}

function handle(input: Foo | Bar) {
  if (input instanceof FooBase) {
    input.fooOnly()
  } else {
    input.barOnly()
  }
}
```



**类型断言守卫**

**断言守卫和类型守卫最大的不同点在于，在判断条件不通过时，断言守卫需要抛出一个错误，类型守卫只需要剔除掉预期的类型。**

```typescript
let usernmae: any = 'heora'

function assertIsNumber(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new Error('Not a number!')
  }
}

assertIsNumber(usernmae)

// number 类型！
usernmae.toFixed()
```

## 泛型

### 类型别名中的泛型

类型别名中的泛型大多是用来进行工具类型封装。

```typescript
type Stringify<T> = {
  [K in keyof T]: string
}

type Clone<T> = {
  [K in keyof T]: T[K]
}
```

Stringify 会将一个对象类型的所有属性类型置为 string ，Clone 则会进行类型的完全复制。

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

> Constructs a type with all properties of `Type` set to optional. 

类型别名与泛型的结合中，除了映射类型、索引类型等类型工具以外，还有一个非常重要的工具：条件类型。

```typescript
type IsEqual<T> = T extends true ? 1 : 2

type A = IsEqual<true> // 1
type B = IsEqual<false> // 2
type C = IsEqual<'heora'> // 2
```

在条件类型参与的情况下，通常泛型会被作为条件类型中的判断条件（`T extends Condition`，或者 `Type extends T`）以及返回值（即 `:` 两端的值），这也是我们筛选类型需要依赖的能力之一。



**泛型约束与默认值**

像函数可以声明一个参数的默认值一样，泛型同样有着默认值的设定

```typescript
type Factory<T = boolean> = T | number | string
```

除了声明默认值以外，泛型还能做到一样函数参数做不到的事：**泛型约束**。

我们可以使用 `extends` 关键字来约束传入的泛型参数必须符合要求。

```typescript
type ResStatus<ResCode extends number> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure'

type Res1 = ResStatus<10000> // "success"
type Res2 = ResStatus<20000> // "failure"

type Res3 = ResStatus<'10000'> // 类型“string”不满足约束“number”。
```

如果我们想让这个类型别名可以无需显式传入泛型参数也能调用，还可以为这个泛型参数声明一个默认值：

```typescript
type ResStatus<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 10001
  | 10002
  ? 'success'
  : 'failure'

type Res4 = ResStatus // "success"
```



**多泛型关联**

我们不仅可以同时传入多个泛型参数，还可以让这几个泛型参数之间也存在联系。

```typescript
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult

//  "passed!"
type Result1 = Conditional<'heora', string, 'passed!', 'rejected!'>

// "rejected!"
type Result2 = Conditional<'heora', boolean, 'passed!', 'rejected!'>
```

**多泛型参数其实就像接受更多参数的函数，其内部的运行逻辑（类型操作）会更加抽象，表现在参数（泛型参数）需要进行的逻辑运算（类型操作）会更加复杂。**

### 对象类型中的泛型

泛型提供了对类型结构的复用能力，我们可以在对象类型结构中使用泛型。

```typescript
interface IRes<TData = unknown> {
  code: number
  error?: string
  data: TData
}
```

```typescript
interface UserProfileRes {
  name: string
  homepage: string
  avatar: string
}

function fetchUserProfile(): Promise<IRes<UserProfileRes>> {}

type StatusSucceed = boolean
function handleOperation(): Promise<IRes<StatusSucceed>> {}
```

泛型嵌套的场景也非常常用，比如对存在分页结构的数据，我们也可以将其分页的响应结构抽离出来

```typescript
interface IPaginationRes<TItem = unknown> {
  data: TItem[]
  page: number
  totalCount: number
  hasNextPage: boolean
}

function fetchUserProfileList(): Promise<
  IRes<IPaginationRes<IUserProfileRes>>
> {}
```

### 函数中的泛型

```typescript
function handle<T>(input: T): T {
  return input
}

const author = 'heora'
const authorAge = 24

handle(author) // 填充为字面量类型 "heora"
handle(authorAge) // 填充为基础类型 number
```

```typescript
function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start]
}

const swapped1 = swap(['heora', 24])
const swapped2 = swap([null, 24])
const swapped3 = swap([{ name: 'heora' }, {}])
```



函数的泛型参数也会被内部的逻辑消费，如：

```typescript
function handle<T>(payload: T): Promise<[T]> {
  return new Promise<[T]>((resolve, reject) => {
    resolve([payload])
  })
}
```

对于箭头函数的泛型，其书写方式是这样的：

```typescript
const handle = <T>(input: T): T => input
```

在 tsx 文件中泛型的尖括号可能会造成报错，编译器无法识别这是一个组件还是一个泛型，此时你可以让它长得更像泛型一些

```typescript
const handle = <T extends unknown>(input: T): T => input
```

### Class 中的泛型

Class 中的泛型和函数中的泛型非常类似，只不过函数中泛型参数的消费方是参数和返回值类型，Class 中的泛型消费方则是属性、方法、乃至装饰器等。

```typescript
class Queue<TElement> {
  private _list: TElement[]

  constructor(initial: TElement[]) {
    this._list = initial
  }

  enqueue<TType extends TElement>(ele: TType): TElement[] {
    this._list.push(ele)
    return this._list
  }

  enqueueWithUnknownType<TType>(element: TType): (TElement | TType)[] {
    return [...this._list, element]
  }

  dequeue(): TElement[] {
    this._list.shift()
    return this._list
  }
}
```

## 类型系统

### 结构化类型系统（鸭子类型）

```typescript
class Cat {
  eat() {}
}

class Dog {
  eat() {}
}

function feedCat(cat: Cat) {}

feedCat(new Dog())
```

Cat 与 Dog 类型上的方法是一致的，所以它们虽然是两个名字不同的类型，但仍然被视为结构一致，这就是结构化类型系统的特性。

结构类型的别称**鸭子类型（Duck Typing）**，，这个名字来源于**鸭子测试（Duck Test）**。其核心理念是，**如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子**。

 面向对象编程中的里氏替换原则也提到了鸭子测试：***如果它看起来像鸭子，叫起来也像鸭子，但是却需要电池才能工作，那么你的抽象很可能出错了。***



在比较对象类型的属性时，会采用结构化类型系统进行判断。对结构中的函数类型（即方法）进行比较时，同样存在类型的兼容性比较：

```typescript
class Cat {
  eat(): boolean {
    return true
  }
}

class Dog {
  eat(): number {
    return 24
  }
}

function feedCat(cat: Cat) {}

// 报错！
feedCat(new Dog())
```

这就是结构化类型系统的核心理念，即基于类型结构进行判断类型兼容性。

除了**基于类型结构进行兼容性判断的结构化类型系统**以外，还有一种**基于类型名进行兼容性判断的类型系统**，标称类型系统。

### 标称类型系统

标称类型系统（**Nominal Typing System**）要求，两个可兼容的类型，**其名称必须是完全一致的**，比如以下代码：

```typescript
type USD = number
type CNY = number

const CNYCount: CNY = 200
const USDCount: USD = 200

function addCNY(source: CNY, input: CNY) {
  return source + input
}

addCNY(CNYCount, USDCount)
```

在结构化类型系统中，USD 与 CNY （分别代表美元单位与人民币单位）被认为是两个完全一致的类型，因此在 `addCNY` 函数中可以传入 USD 类型的变量。但是人民币与美元这两个单位实际的意义并不一致，怎么能进行相加？

在标称类型系统中，CNY 与 USD 被认为是两个完全不同的类型，因此能够避免这一情况发生。

上面我们可以通过类型的结构，来让结构化类型系统认为两个类型具有父子类型关系，而对于标称类型系统，父子类型关系只能通过显式的继承来实现，称为**标称子类型（Nominal Subtyping）**。

```typescript
class Cat {}
// 实现一只短毛猫！
class ShorthairCat extends Cat {}
```

C++、Java、Rust 等语言中都主要使用标称类型系统。那么，我们是否可以在 TypeScript 中模拟出标称类型系统？

### 模拟标称类型系统

**类型的重要意义之一是限制了数据的可用操作与实际意义**。

这往往是通过类型附带的**额外信息**来实现的（类似于元数据），要在 TypeScript 中实现，其实我们也只需要为类型额外附加元数据即可，比如 CNY 与 USD，我们分别附加上它们的单位信息即可，但同时又需要保留原本的信息（即原本的 number 类型）。

我们可以通过交叉类型的方式来实现信息的附加：

```typescript
declare class TagProtector<T extends string> {
  protected __tag__: T
}

type Nominal<T, U extends string> = T & TagProtector<U>
```

我们使用 TagProtector 声明了一个具有 `protected` 属性的类，使用它来携带额外的信息，并和原本的类型合并到一起，就得到了 Nominal 工具类型。

```typescript
type CNY = Nominal<number, 'CNY'>

type USD = Nominal<number, 'USD'>

const CNYCount = 100 as CNY

const USDCount = 100 as USD

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY
}

addCNY(CNYCount, CNYCount)

// 报错了！
addCNY(CNYCount, USDCount)
```

这一实现方式本质上只在类型层面做了数据的处理，在运行时无法进行进一步的限制。我们还可以从逻辑层面入手进一步确保安全性：

```typescript
class CNY {
  private __tag!: void;
  constructor(public value: number) {}
}
class USD {
  private __tag!: void;
  constructor(public value: number) {}
}
```

相应的，现在使用方式也要进行变化：

```typescript
const CNYCount = new CNY(100)
const USDCount = new USD(100)

function addCNY(source: CNY, input: CNY) {
  return source.value + input.value
}

addCNY(CNYCount, CNYCount)
// 报错了！
addCNY(CNYCount, USDCount)
```

通过这种方式，我们可以在运行时添加更多的检查逻辑，同时在类型层面也得到了保障。

这两种方式的本质都是通过非公开（即 `private` / `protected` ）的额外属性实现了类型信息的附加，从而使得结构化类型系统将结构一致的两个类型也视为不兼容的。

在 TypeScript 中我们可以通过类型或者逻辑的方式来模拟标称类型，这两种方式其实并没有非常明显的优劣之分，基于类型实现更加轻量，你的代码逻辑不会受到影响，但难以进行额外的逻辑检查工作。而使用逻辑实现稍显繁琐，但你能够进行更进一步或更细致的约束。

### 类型、类型系统与类型检查

对于类型、类型系统、类型检查，你可以认为它们是不同的概念。

- 类型：限制了数据的可用操作、意义、允许的值的集合，总的来说就是**访问限制**与**赋值限制**。在 TypeScript 中即是原始类型、对象类型、函数类型、字面量类型等基础类型，以及类型别名、联合类型等经过类型编程后得到的类型。
- 类型系统：一组为变量、函数等结构分配、实施类型的规则，通过显式地指定或类型推导来分配类型。同时类型系统也定义了如何判断类型之间的兼容性：在 TypeScript 中即是结构化类型系统。
- 类型检查：确保**类型遵循类型系统下的类型兼容性**，对于静态类型语言，在**编译时**进行，而对于动态语言，则在**运行时**进行。TypeScript 就是在编译时进行类型检查的。

静态类型与动态类型指的是**类型检查发生的时机**，并不等于这门语言的类型能力。比如 JavaScript 实际上是动态类型语言，它的类型检查发生在运行时。

另外一个静态类型与动态类型的重要区别体现在变量赋值时，如在 TypeScript 中无法给一个声明为 number 的变量使用字符串赋值，因为这个变量在声明时的类型就已经确定了。而在 JavaScript 中则没有这样的限制，你可以随时切换一个变量的类型。

## 类型系统层级

类型层级实际上指的是，**TypeScript 中所有类型的兼容关系，从最上面一层的 any 类型，到最底层的 never 类型。**

### 类型兼容性

使用条件类型来判断类型兼容性

```typescript
type Result = 'heora' extends string ? 1 : 2
```

通过赋值来进行兼容性检查

```typescript
declare let source: string

declare let anyType: any
declare let neverType: never

anyType = source

// 不能将类型“string”分配给类型“never”。
neverType = source
```

### 原始类型

```typescript
type Result1 = 'heora' extends string ? 1 : 2 // 1
type Result2 = 1 extends number ? 1 : 2 // 1
type Result3 = true extends boolean ? 1 : 2 // 1
type Result4 = { name: string } extends object ? 1 : 2 // 1
type Result5 = { name: 'heora' } extends object ? 1 : 2 // 1
type Result6 = [] extends object ? 1 : 2 // 1
```

一个基础类型和它们对应的字面量类型必定存在父子类型关系。

object 代表**所有非原始类型的类型，即数组、对象与函数类型**，`[]`这个字面量类型也可以被认为是 object 的字面量类型。

**字面量类型 < 对应的原始类型**。

### 向上探索

#### 联合类型

在联合类型中，只需要符合其中一个类型，我们就可以认为实现了这个联合类型：

```typescript
type Result7 = 1 extends 1 | 2 | 3 ? 1 : 2 // 1
type Result8 = 'he' extends 'heo' | 'heora' | 'he' ? 1 : 2 // 1
type Result9 = true extends true | false ? 1 : 2 // 1
type Result10 = string extends string | false | number ? 1 : 2 // 1
```

**字面量类型 < 包含此字面量类型的联合类型，原始类型 < 包含此原始类型的联合类型**

```typescript
type Result11 = 'heora' | 'yueluo' extends string ? 1 : 2 // 1
type Result12 = {} | (() => void) | [] extends object ? 1 : 2 // 1
```

**同一基础类型的字面量联合类型 < 此基础类型**

最终结论：**字面量类型 < 包含此字面量类型的联合类型（同一基础类型） < 对应的原始类型**

#### 装箱类型

```typescript
type Result14 = string extends String ? 1 : 2 // 1
type Result15 = String extends {} ? 1 : 2 // 1
type Result16 = {} extends object ? 1 : 2 // 1
type Result18 = object extends Object ? 1 : 2 // 1
```

**在结构化类型系统的比较下，String 会被认为是 `{}` 的子类型**。

这里从 `string < {} < object` 看起来构建了一个类型链，但实际上 `string extends object` 并不成立：

```typescript
type Temp = string extends object ? 1 : 2 // 2
```

由于结构化类型系统这一特性的存在，我们能得到一些看起来矛盾的结论：

```typescript
type Result16 = {} extends object ? 1 : 2 // 1
type Result18 = object extends {} ? 1 : 2 // 1

type Result17 = object extends Object ? 1 : 2 // 1
type Result20 = Object extends object ? 1 : 2 // 1

type Result19 = Object extends {} ? 1 : 2 // 1
type Result21 = {} extends Object ? 1 : 2 // 1
```

这里的 `{} extends `和 `extends {}` 实际上是两种完全不同的比较方式。

`{} extends object` 和 `{} extends Object` 意味着， `{}` 是 object 和 Object 的字面量类型，是从**类型信息的层面**出发的，即**字面量类型在基础类型之上提供了更详细的类型信息**。

`object extends {}` 和 `Object extends {}` 则是从**结构化类型系统的比较**出发的，即 `{}` 作为一个一无所有的空对象，几乎可以被视作是所有类型的基类。

`object extends Object` 和 `Object extends object` 这两者的情况就要特殊一些，它们是因为“系统设定”的问题，Object 包含了所有除 Top Type 以外的类型（基础类型、函数类型等），object 包含了所有非原始类型的类型，即数组、对象与函数类型。

类型信息层面出发，结论为：**原始类型 < 原始类型对应的装箱类型 < Object 类型。**

#### Top Type

any 与 unknown 是系统中设定为 Top Type 的两个类型。Object 类型自然会是 any 与 unknown 类型的子类型。

```typescript
type Result22 = Object extends any ? 1 : 2 // 1
type Result23 = Object extends unknown ? 1 : 2 // 1
```

```typescript
type Result24 = any extends Object ? 1 : 2 // 1 | 2
type Result25 = unknown extends Object ? 1 : 2 // 2
```

```typescript
type Result26 = any extends 'heora' ? 1 : 2 // 1 | 2
type Result27 = any extends string ? 1 : 2 // 1 | 2
type Result28 = any extends {} ? 1 : 2 // 1 | 2
type Result29 = any extends never ? 1 : 2 // 1 | 2
```

any 代表了任何可能的类型，当我们使用 `any extends` 时，它包含了“**让条件成立的一部分**”，以及“**让条件不成立的一部分**”。

在 TypeScript 内部代码的条件类型处理中，如果接受判断的是 any，那么会直接**返回条件类型结果组成的联合类型**。

any 类型和 unknown 类型的比较也是互相成立

```typescript
type Result31 = any extends unknown ? 1 : 2 // 1
type Result32 = unknown extends any ? 1 : 2 // 1
```

结论为：**Object < any / unknown**。

### 向下探索

#### never

never 类型是任何类型的子类型，当然也包括字面量类型：

```typescript
type Result33 = never extends 'heora' ? 1 : 2 // 1
type Result34 = undefined extends 'heora' ? 1 : 2 // 2
type Result35 = null extends 'heora' ? 1 : 2 // 2
type Result36 = void extends 'heora' ? 1 : 2 // 2
```

在 TypeScript 中，void、undefined、null 都是**切实存在、有实际意义的类型**。

结论：**never < 字面量类型**。

### 类型层级链

结合我们上面得到的结论，可以书写出这样一条类型层级链：

```typescript
// 8
type TypeChain = never extends 'heora'
  ? 'heora' extends 'heora' | '24'
    ? 'heora' | '24' extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0
```

其返回的结果为 8 ，也就意味着所有条件均成立。

结合上面的结构化类型系统与类型系统设定，我们还可以构造出一条更长的类型层级链：

```typescript

type VerboseTypeChain = never extends 'heora'
  ? 'heora' extends 'heora' | 'yueluo'
    ? 'heora' | 'yueluo' extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8
```

结果仍然为 8 。

### 其他比较场景

对于基类和派生类，通常情况下**派生类会完全保留基类的结构**，而只是自己新增新的属性与方法。在结构化类型的比较下，其类型自然会存在子类型关系。更何况派生类本身就是 extends 基类得到的。

对于联合类型地类型层级比较，我们只需要比较**一个联合类型是否可被视为另一个联合类型的子集**，即**这个联合类型中所有成员在另一个联合类型中都能找到**。

```typescript
type Result36 = 1 | 2 | 3 extends 1 | 2 | 3 | 4 ? 1 : 2 // 1
type Result37 = 2 | 4 extends 1 | 2 | 3 | 4 ? 1 : 2 // 1
type Result38 = 1 | 2 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2 // 2
type Result39 = 1 | 5 extends 1 | 2 | 3 | 4 ? 1 : 2 // 2
```

数组和元组是一个比较特殊的部分

```typescript
type Result40 = [number, number] extends number[] ? 1 : 2 // 1
type Result41 = [number, string] extends number[] ? 1 : 2 // 2
type Result42 = [number, string] extends (number | string)[] ? 1 : 2 // 1
type Result43 = [] extends number[] ? 1 : 2 // 1
type Result44 = [] extends unknown[] ? 1 : 2 // 1
type Result45 = number[] extends (number | string)[] ? 1 : 2 // 1
type Result46 = any[] extends number[] ? 1 : 2 // 1
type Result47 = unknown[] extends number[] ? 1 : 2 // 2
type Result48 = never[] extends number[] ? 1 : 2 // 1
```

* 40，这个元组类型可以确定其内部成员全部为 number 类型，因此是 `number[]` 的子类型。 41 中混入了别的类型元素，因此认为不成立。
* 42 混入了别的类型，但其判断条件为 `(number | string)[]` ，即其成员需要为 number 或 string 类型。
* 43 的成员是未确定的，等价于 `never[] extends number[]`，44 同理。
* 45 类似于41，即可能存在的元素类型是符合要求的。
* 46、47，unknown 可以再次赋值为任意其它类型，但只能赋值给 any 与 unknown 类型的变量。
* 8，类似于 43、44，由于 never 类型本就位于最下方，这里显然成立。`never[]` 类型的数组也就无法再填充值了。

<img src="./images/type_level.png" />

## 条件类型与 infer

