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

### 条件类型

条件类型的语法类似于我们平时常用的三元表达式，它的基本语法如下

```
TypeA extends TypeB ? Result1 : Result2
```

条件类型中使用 extends 判断类型的兼容性，而非判断类型的全等性。

在类型层面中，对于能够进行赋值操作的两个变量，我们**并不需要它们的类型完全相等，只需要具有兼容性**，而两个完全相同的类型，其 extends 自然也是成立的。

条件类型绝大部分场景下会和泛型一起使用：

```typescript
type LiteralType<T> = T extends string ? 'string' : 'other'

type Res1 = LiteralType<'heora'> // "string"
type Res2 = LiteralType<24> // "other"
```

同三元表达式可以嵌套一样，条件类型中也常见多层嵌套

```typescript
export type LiteralType<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends null
  ? 'null'
  : T extends undefined
  ? 'undefined'
  : never

type Res1 = LiteralType<'heora'> // "string"
type Res2 = LiteralType<24> // "number"
```

条件类型可以用来对复杂的类型进行比较

```typescript
type Func = (...args: any[]) => any

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!'

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>
```

上面讲到的这些条件类型，本质上就是在泛型基于调用填充类型信息的基础上，新增了**基于类型信息的条件判断**。

### infer 关键字

TypeScript 中支持通过 infer 关键字来**在条件类型中提取类型的某一部分信息**

```typescript
type Func = (...args: any[]) => any

type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
  ? R
  : never
```

当传入的类型参数满足 `T extends (...args: any[] ) => infer R` 这样一个结构，返回 `infer R `位置的值，即 R。否则，返回 never。

`infer`是 `inference` 的缩写，意为推断，如 `infer R` 中 `R` 就表示 **待推断的类型**。 `infer` 只能在条件类型中使用，因为我们实际上仍然需要**类型结构是一致的**，比如上例中类型信息需要是一个函数类型结构，我们才能提取出它的返回值类型。如果连函数类型都不是，那我只会给你一个 never 。

这里的**类型结构**当然并不局限于函数类型结构，还可以是数组：

```typescript
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T

type SwapResult1 = Swap<[1, 2]> // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]> // 不符合结构，没有发生替换，仍是 [1, 2, 3]
```

由于我们声明的结构是一个仅有两个元素的元组，因此三个元素的元组就被认为是不符合类型结构了。

我们可以使用 rest 操作符来处理任意长度的情况：

```typescript
// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
  infer start,
  ...any[],
  infer end
]
  ? [start, end]
  : T

// 调换首尾两个
type SwapStartAndEnd<T extends any[]> = T extends [
  infer start,
  ...infer args,
  infer end
]
  ? [end, ...args, start]
  : T

// 调换开头两个
type SwapFirstTwo<T extends any[]> = T extends [
  infer start1,
  infer start2,
  ...infer args
]
  ? [start2, start1, ...args]
  : T
```

infer 可以和 rest 操作符一样同时提取一组不定长的类型。上面的输入输出仍然都是数组，实际上我们完全可以进行结构层面的转换。

比如从数组到联合类型：

```typescript
type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never

type ArrayItemTypeResult1 = ArrayItemType<[]> // never
type ArrayItemTypeResult2 = ArrayItemType<string[]> // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]> // string | number
```

除了数组，infer 结构也可以是接口：

```typescript
// 提取对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never

type PropTypeResult1 = PropType<{ name: string }, 'name'> // string
type PropTypeResult2 = PropType<{ name: string; age: number }, 'name' | 'age'> // string | number
```

```typescript
// 反转键名与键值
type ReverseKeyValue<T extends Record<string, unknown>> = T extends Record<
  infer K,
  infer V
>
  ? Record<V & string, K>
  : never

type ReverseKeyValueResult1 = ReverseKeyValue<{ key: 'value' }> // { "value": "key" }
```

infer 结构还可以是 Promise 结构

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? V : T

type PromiseValueResult1 = PromiseValue<Promise<number>> // number
type PromiseValueResult2 = PromiseValue<number> // number
```

就像条件类型可以嵌套一样，infer 关键字也经常被使用在嵌套的场景中，包括对类型结构深层信息地提取，以及对提取到类型信息的筛选等。比如上面的 PromiseValue，如果传入了一个嵌套的 Promise 类型就失效了：

```typescript
type PromiseValueResult3 = PromiseValue<Promise<Promise<boolean>>> // Promise<boolean>
```

这种时候我们就需要进行嵌套地提取：

```typescript
type PromiseValue<T> = T extends Promise<infer V>
  ? V extends Promise<infer N>
    ? N
    : V
  : T
```

这时可以使用递归来处理任意嵌套深度：

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T
```

条件类型在泛型的基础上支持了基于类型信息的动态条件判断，但无法直接消费填充类型信息，而 infer 关键字则为它补上了这一部分的能力，让我们可以进行更多奇妙的类型操作。

### 分布式条件类型

**分布式条件类型（Distributive Conditional Type），也称条件类型的分布式特性**，是条件类型在满足一定情况下会执行的逻辑。

```typescript
type Condition<T> = T extends 1 | 2 | 3 ? T : never

// 1 | 2 | 3
type Res1 = Condition<1 | 2 | 3 | 4 | 5>

// never
type Res2 = 1 | 2 | 3 | 4 | 5 extends 1 | 2 | 3 ? 1 | 2 | 3 | 4 | 5 : never
```

这个例子在某些地方似乎和我们学习的知识并不一样？

仔细观察这两个类型别名的差异你会发现，唯一的差异就是在 Res1 中，进行判断的联合类型被作为泛型参数传入给另一个独立的类型别名，而 Res2 中直接对这两者进行判断。

记住第一个差异：**是否通过泛型参数传入**。我们再看一个例子：

```typescript
type Naked<T> = T extends boolean ? 'Y' : 'N'
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N'

// "N" | "Y"
type Res3 = Naked<number | boolean>

// "N"
type Res4 = Wrapped<number | boolean>
```

现在我们都是通过泛型参数传入了，但是第一个还是个联合类型。第二组的成员有可能是数字类型，显然不兼容于 `[boolean]`。

仔细观察这两个例子你会发现，它们唯一的差异是条件类型中的**泛型参数是否被数组包裹**了。

同时，你会发现在 Res3 的判断中，其联合类型的两个分支，恰好对应于分别使用 number 和 boolean 去作为条件类型判断时的结果。

把上面的线索理一下，其实我们就大致得到了条件类型分布式起作用的条件。

首先，你的类型参数需要是一个联合类型 。其次，类型参数需要通过泛型参数的方式传入，而不能直接在外部进行判断（如 Res2 中）。最后，条件类型中的泛型参数不能被包裹。

条件类型分布式特性会产生的效果也很明显了，即将这个联合类型拆开来，每个分支分别进行一次条件类型判断，再将最后的结果合并起来。官方解释：

> **对于属于裸类型参数的检查类型，条件类型会在实例化时期自动分发到联合类型上。**（***Conditional types in which the checked type is a naked type parameter are called distributive conditional types. Distributive conditional types are automatically distributed over union types during instantiation.***）

这里的自动分发，我们可以这么理解：

```typescript
type Naked<T> = T extends boolean ? 'Y' : 'N'

// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
// "N" | "Y"
type Res3 = Naked<number | boolean>
```

这里的裸类型参数，其实指的就是泛型参数是否完全裸露，我们上面使用数组包裹泛型参数只是其中一种方式，还可以这么做：

```typescript
type NoDistribute<T> = T & {}

type Wrapped<T> = NoDistribute<T> extends [boolean] ? 'Y' : 'N'
```

需要注意的是，我们并不是只会通过裸露泛型参数，来确保分布式特性能够发生。
在某些情况下，我们也会需要包裹泛型参数来禁用掉分布式特性。

最常见的场景也许还是联合类型的判断，即我们不希望进行联合类型成员的分布判断，而是希望直接判断这两个联合类型的兼容性判断，就像在最初的 Res2 中那样：

```typescript
type CompareUnion<T, U> = [T] extends [U] ? true : false

type CompareRes1 = CompareUnion<1 | 2, 1 | 2 | 3> // true
type CompareRes2 = CompareUnion<1 | 2, 1> // false
```

通过将参数与条件都包裹起来的方式，我们对联合类型的比较就变成了数组成员类型的比较，在此时就会严格遵守类型层级一文中联合类型的类型判断。

另外一种情况则是，当我们想判断一个类型是否为 never 时，也可以通过类似的手段：

```typescript
type IsNever<T> = T extends never ? true : false

type IsNeverRes1 = IsNever<never> // never
type IsNeverRes2 = IsNever<'heora'> // false
```

```typescript
type IsNever<T> = [T] extends [never] ? true : false

type IsNeverRes1 = IsNever<never> // true
type IsNeverRes2 = IsNever<'heora'> // false
```

这里的原因并不是因为分布式条件类型。当条件类型的判断参数为 any，会直接返回条件类型两个结果的联合类型。在这里其实类似，当通过泛型传入的参数为 never，则会直接返回 never。

这里的 never 与 any 的情况并不完全相同，any 在直接**作为判断参数时**、**作为泛型参数时**都会产生这一效果：

```typescript
// 直接使用，返回联合类型
type Tmp1 = any extends string ? 1 : 2 // 1 | 2

type Tmp2<T> = T extends string ? 1 : 2
// 通过泛型参数传入，同样返回联合类型
type Tmp2Res = Tmp2<any> // 1 | 2

// 如果判断条件是 any，那么仍然会进行判断
type Special1 = any extends any ? 1 : 2 // 1

type Special2<T> = T extends any ? 1 : 2
type Special2Res = Special2<any> // 1
```

 never 仅在作为泛型参数时才会产生：

```typescript
// 直接使用，仍然会进行判断
type Tmp3 = never extends string ? 1 : 2 // 1

type Tmp4<T> = T extends string ? 1 : 2
// 通过泛型参数传入，会跳过判断
type Tmp4Res = Tmp4<never> // never

// 如果判断条件是 never，还是仅在作为泛型参数时才跳过判断
type Special3 = never extends never ? 1 : 2 // 1

type Special4<T> = T extends never ? 1 : 2
type Special4Res = Special4<never> // never
```

这里的 any、never 两种情况都不会实际地执行条件类型，我们通过包裹的方式可以让他能够去执行判断。

通过使用分布式条件类型，我们能轻易地进行集合之间的运算，比如交集：

```typescript
type Intersection<A, B> = A extends B ? A : never

type IntersectionRes = Intersection<1 | 2 | 3, 2 | 3 | 4> // 2 | 3
```

当联合类型的组成是一个对象的属性名（`keyof IObject`），此时对这样的两个类型集合进行处理，得到属性名的交集，那我们就可以在此基础上获得两个对象类型结构的交集。

除此以外，还有许多相对复杂的场景可以降维到类型集合，即联合类型的层面，然后我们就可以使用分布式条件类型进行各种处理。

### IsAny、IsUnknown

```typescript
type IsNever<T> = [T] extends [never] ? true : false
```

```typescript
type IsAny<T> = 0 extends 1 & T ? true : false
```

作为代表任意类型的 any ，如果交叉类型的其中一个成员是 any，此时最终类型必然是 any 。

```typescript
type IsUnknown<T> = IsNever<T> extends false
  ? T extends unknown
    ? unknown extends T
      ? IsAny<T> extends false
        ? true
        : false
      : false
    : false
  : false
```

首先过滤掉 never 类型，然后对于 `T extends unknown` 和 `unknown extends T`，只有 any 和 unknown 类型能够同时符合，再过滤掉 any，那肯定就只剩下 unknown 类型。

```typescript
type IsUnknown<T> = unknown extends T
  ? IsAny<T> extends true
    ? false
    : true
  : false
```

利用 `unknown extends T` 时仅有 T 为 any 或 unknown 时成立这一点，我们可以直接将类型收窄到 any 与 unknown，然后在去掉 any 类型时，剩下的就是 unknown 类型。

## 内置工具类型

工具类型分类

* 属性修饰工具类型
  * 对属性的修饰，包括对象属性和数组元素的可选/必选、只读/可写。
* 结构工具类型
  * 对既有类型的裁剪、拼接、转换等，比如使用对一个对象类型裁剪得到一个新的对象类型，将联合类型结构转换到交叉类型结构。
* 集合工具类型
  * 对集合（即联合类型）的处理，即交集、并集、差集、补集。
* 模式匹配工具类型
  * 基于 infer 的模式匹配，即对一个既有类型特定位置类型的提取，比如提取函数类型签名中的返回值类型。
* 模板字符串工具类型
  * 模板字符串专属的工具类型，比如将一个对象类型中的所有属性名转换为大驼峰的形式。

### 属性修饰工具类型

这一部分的工具类型主要使用**属性修饰**、**映射类型**与**索引类型**。

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type Required<T> = {
  [P in keyof T]-?: T[P]
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

Partial 与 Required 可以认为是一对工具类型，它们的功能是相反的。

在实现上，它们的唯一差异是在索引类型签名处的可选修饰符，Partial 是 `?`，即标记属性为可选，而 Required 则是 `-?`，相当于在原本属性上如果有 `?` 这个标记，则移除它。

 TypeScript 中并没有提供 Readonly 的另一半工具类型，我们可以自己实现它。

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

现在我们了已经了解 Partial、Readonly 这一类属性修饰的工具类型，不妨想想它们是否能满足我们的需要？

假设场景逐渐开始变得复杂，比如以下这些情况：

* 现在的属性修饰是浅层的，如果我想将**嵌套在里面的对象类型**也进行修饰，需要怎么改进？
* 现在的属性修饰是全量的，如果我只想**修饰部分属性**呢？这里的部分属性，可能是**基于传入已知的键名**来确定（比如属性a、b），也可能是**基于属性类型**来确定(比如所有函数类型的值)？

### 结构工具类型

这一部分的工具类型主要使用**条件类型**以及**映射类型**、**索引类型**。

结构工具类型可以分为两类，**结构声明**和**结构处理**。

结构声明工具类型即快速声明一个结构，比如内置类型中的 Record：

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

其中，`K extends keyof any` 即为键的类型，这里使用 `extends keyof any` 标明，传入的 K 可以是单个类型，也可以是联合类型，而 T 即为属性的类型。

```typescript
// 键名均为字符串，键值类型未知
type Record1 = Record<string, unknown>
// 键名均为字符串，键值类型任意
type Record2 = Record<string, any>
// 键名为字符串或数字，键值类型任意
type Record3 = Record<string | number, any>
```

其中，`Record<string, unknown>` 和 `Record<string, any>` 是日常使用较多的形式，通常我们使用这两者来代替 object 。


在一些工具类库源码中其实还存在类似的结构声明工具类型，如：

```typescript
type Dictionary<T> = {
  [index: string]: T
}

type NumericDictionary<T> = {
  [index: number]: T
}
```

Dictionary （字典）结构只需要一个作为属性类型的泛型参数即可。




对于结构处理工具类型，在 TypeScript 中主要是 Pick、Omit 。

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

首先来看 Pick，它接受两个泛型参数，T 即是我们会进行结构处理的原类型（一般是对象类型），而 K 则被约束为 T 类型的键名联合类型。

```typescript
interface Foo {
  name: string
  age: number
  job: string
}

type PickedFoo = Pick<Foo, 'age' | 'job'>
```

然后 Pick 会将传入的联合类型作为需要保留的属性，使用这一联合类型配合映射类型，即上面的例子等价于：

```typescript
type Pick<T> = {
  [P in 'name' | 'age']: T[P]
}
```

联合类型的成员会被依次映射，并通过索引类型访问来获取到它们原本的类型。

**Pick 是保留这些传入的键**，比如从一个庞大的结构中选择少数字段保留，需要的是这些少数字段，而 **Omit 则是移除这些传入的键**，也就是从一个庞大的结构中剔除少数字段，需要的是剩余的多数部分。

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

Omit 是基于 Pick 实现的，这也是 TypeScript 中成对工具类型的另一种实现方式。

上面的 Partial 与 Required 使用类似的结构，**在关键位置使用一个相反操作来实现反向**，而这里的 Omit 类型则是基于 Pick 类型实现，也就是**反向工具类型基于正向工具类型实现**。


**思考**

* Pick 和 Omit 是基于键名的，如果我们需要**基于键值类型**呢？比如仅对函数类型的属性？

* 除了将一个对象结构拆分为多个子结构外，对这些子结构的**互斥处理**也是结构工具类型需要解决的问题之一。

  * 互斥处理指的是，假设你的对象存在三个属性 A、B、C ，其中 A 与 C 互斥，即 A 存在时不允许 C 存在。而 A 与 B 绑定，即 A 存在时 B 也必须存在，A 不存在时 B 也不允许存在。此时应该如何实现？

  

Pick 会约束第二个参数的联合类型来自于对象属性，而 Omit 并没有这么要求。

```typescript
type Omit1<T, K> = Pick<T, Exclude<keyof T, K>>
type Omit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// 这里就不能用严格 Omit 了
declare function combineSpread<T1, T2>(
  obj: T1,
  otherObj: T2,
  rest: Omit1<T1, keyof T2>
): void

type Point3d = { x: number; y: number; z: number }

declare const p1: Point3d

// 能够检测出错误，rest 中缺少了 y
combineSpread(p1, { x: 10 }, { z: 2 })
```

这里我们使用 `keyof Obj2` 去剔除 Obj1，此时如果声明约束反而不符合预期。

### 集合工具类型

这一部分的工具类型主要使用条件类型、条件类型分布式特性。

内置工具类型中提供了交集与差集的实现：

```typescript
type Extract<T, U> = T extends U ? T : never

type Exclude<T, U> = T extends U ? never : T
```

当 T、U 都是联合类型（视为一个集合）时，T 的成员会依次被拿出来进行 `extends U ? T1 : T2 `的计算，然后将最终的结果再合并成联合类型。

比如对于交集 Extract ，其运行逻辑是这样的：

```typescript
type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4> // 1 | 2

type _AExtractB =
  | (1 extends 1 | 2 | 4 ? 1 : never) // 1
  | (2 extends 1 | 2 | 4 ? 2 : never) // 2
  | (3 extends 1 | 2 | 4 ? 3 : never) // never
```

差集 Exclude 也是类似，但需要注意的是，差集存在相对的概念，即 A 相对于 B 的差集与 B 相对于 A 的差集并不一定相同，而交集则一定相同。

```typescript
type SetA = 1 | 2 | 3 | 5
type SetB = 0 | 1 | 2 | 4

type AExcludeB = Exclude<SetA, SetB> // 3 | 5
type BExcludeA = Exclude<SetB, SetA> // 0 | 4

type _AExcludeB =
  | (1 extends 0 | 1 | 2 | 4 ? never : 1) // never
  | (2 extends 0 | 1 | 2 | 4 ? never : 2) // never
  | (3 extends 0 | 1 | 2 | 4 ? never : 3) // 3
  | (5 extends 0 | 1 | 2 | 4 ? never : 5) // 5

type _BExcludeA =
  | (0 extends 1 | 2 | 3 | 5 ? never : 0) // 0
  | (1 extends 1 | 2 | 3 | 5 ? never : 1) // never
  | (2 extends 1 | 2 | 3 | 5 ? never : 2) // never
  | (4 extends 1 | 2 | 3 | 5 ? never : 4) // 4
```

除了差集和交集，我们也可以很容易实现并集与补集：

```typescript
// 并集
type Concurrence<A, B> = A | B

// 交集
type Intersection<A, B> = A extends B ? A : never

// 差集
type Difference<A, B> = A extends B ? never : A

// 补集
type Complement<A, B extends A> = Difference<A, B>
```

补集基于差集实现，我们只需要约束**集合 B 为集合 A 的子集**即可。

内置工具类型中还有一个场景比较明确的集合工具类型：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T

type _NonNullable<T> = Difference<T, null | undefined>
```

它的本质就是集合 T 相对于 `null | undefined` 的差集，因此我们可以用之前的差集来进行实现。

> 联合类型中会自动合并相同的元素，因此我们可以默认这里指的类型集合全部都是类似 Set 那样的结构，不存在重复元素。

**思考：**

* 目前为止我们的集合类型都停留在一维的层面，即联合类型之间的集合运算。如果现在我们要处理**对象类型结构的集合运算**呢？
* 在处理对象类型结构运算时，可能存在不同的需求，比如合并时，我们可能希望**保留原属性或替换原属性**，可能希望**替换原属性的同时并不追加新的属性**进来（即仅使用新的对象类型中的属性值覆盖原本对象类型中的同名属性值），此时要如何灵活地处理这些情况？

### 模式匹配工具类型

这一部分的工具类型主要使用**条件类型**与 **infer 关键字**。

 infer 其实代表了一种 **模式匹配（pattern matching）** 的思路，如正则表达式、Glob 中等都体现了这一概念。

首先是对函数类型签名的模式匹配：

```typescript
type FunctionType = (...args: any) => any

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any
```

根据 infer 的位置不同，我们就能够获取到不同位置的类型，在函数这里则是参数类型与返回值类型。

我们还可以更进一步，比如只匹配第一个参数类型：

```typescript
type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never

type FuncFoo = (arg: number) => void
type FuncBar = (...args: string[]) => void

type FooFirstParameter = FirstParameter<FuncFoo> // number
type BarFirstParameter = FirstParameter<FuncBar> // string
```

除了对函数类型进行模式匹配，内置工具类型中还有一组对 Class 进行模式匹配的工具类型：

```typescript
type ClassType = abstract new (...args: any) => any

type ConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never

type InstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any
```

Class 的通用类型签名可能看起来比较奇怪，但实际上它就是声明了可实例化（new）与可抽象（abstract）。

我们也可以使用接口来进行声明：

```typescript
interface ClassType<T = any> {
  new (...args: any[]): T
}
```

对 Class 的模式匹配思路类似于函数，或者说这是一个通用的思路，即基于放置位置的匹配。放在参数部分，那就是构造函数的参数类型，放在返回值部分，那当然就是 Class 的实例类型。

思考：

* infer 和条件类型的搭配看起来会有奇效，比如在哪些场景？比如随着条件类型的嵌套每个分支会提取不同位置的 infer ？
* infer 在某些特殊位置下应该如何处理？比如上面我们写了第一个参数类型，不妨试着来写写**最后一个参数类型**？

**infer 约束**

在某些时候，我们可能对 infer 提取的类型值有些要求，比如我只想要数组第一个为字符串的成员，如果第一个成员不是字符串，那我就不要了。

先写一个提取数组第一个成员的工具类型：

```typescript
type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P
  : never
```

加上对提取字符串的条件类型：

```typescript
type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P extends string
    ? P
    : never
  : never
```

试用一下：

```typescript
type Tmp1 = FirstArrayItemType<[24, 'heora']> // never
type Tmp2 = FirstArrayItemType<['heora', 599]> // 'heora'
type Tmp3 = FirstArrayItemType<['heora']> // 'heora'
```

这样可以满足需求。不过既然泛型可以声明约束，只允许传入特定的类型，那 infer 中能否也添加约束，只提取特定的类型？

TypeScript 4.7 就支持了 infer 约束功能来实现**对特定类型地提取**，比如上面的例子可以改写为这样：

```typescript
type FirstArrayItemType<T extends any[]> = T extends [
  infer P extends string,
  ...any[]
]
  ? P
  : never
```

实际上，infer + 约束的场景是非常常见的，尤其是在某些连续嵌套的情况下，一层层的 infer 提取再筛选会严重地影响代码的可读性，而 infer 约束这一功能无疑带来了更简洁直观的类型编程代码。

## 类型编程进阶

### 属性修饰进阶

对属性修饰工具类型的进阶主要分为这么几个方向：

* 深层的属性修饰；
* 基于已知属性的部分修饰，以及基于属性类型的部分修饰。

首先是深层属性修饰，我们在使用 infer 关键字首次接触到递归的工具类型。

```typescript
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T
```

我们只是在条件类型成立时，再次调用了这个工具类型，在某一次递归到条件类型不成立时，就会直接返回这个类型值。

对于 Partial、Required，其实我们也可以进行这样地处理：

```typescript
type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
```

```typescript
type DeepRequired<T extends object> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K]
}

type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K]
}
```

在 [内置工具类型](https://www.yueluo.club/detail?articleId=6315dfc50066526da888d5a2) 的结构工具类型中，存在一个从联合类型中剔除 `null | undefined` 的工具类型 NonNullable：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T
```

我们也可以像访问性修饰工具类型那样，实现一个 DeepNonNullable 来递归剔除所有属性的 null 与 undefined：

```typescript
type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>
}
```



搞定递归属性修饰，接着就是**基于已知属性进行部分修饰了**。这其实也很简单。

如果我们要让一个对象的三个已知属性为可选的，那只要把这个对象拆成 A、B 两个对象结构，分别由三个属性和其他属性组成。然后让对象 A 的属性全部变为可选的，和另外一个对象 B 组合起来就可以了。

* 拆分对象结构，即**结构工具类型**，Pick 与 Omit；
* 三个属性的对象全部变为可选，即属性修饰，或者使用递归属性修饰；
* 组合两个对象类型，得到一个同时符合这两个对象类型的新结构，即交叉类型。

分析出了需要用到的工具和方法，执行起来就简单多了。这也是使用最广泛的一种类型编程思路：**将复杂的工具类型，拆解为由基础工具类型、类型工具的组合**。

直接来看基于已知属性的部分修饰，MarkPropsAsOptional 会将一个对象的部分属性标记为可选：

```typescript
type MarkPropsAsOptional<
  T extends object,
  K extends keyof T = keyof T
> = Partial<Pick<T, K>> & Omit<T, K>
```

T 为需要处理的对象类型，而 K 为需要标记为可选的属性。由于此时 K 必须为 T 内部的属性，因此我们将其约束为 keyof T，即对象属性组成的字面量联合类型。同时为了让它能够直接代替掉 Partial，我们为其指定默认值也为 keyof T，这样在不传入第二个泛型参数时，它的表现就和 Partial 一致，即全量的属性可选。

`Partial<Pick<T, K>>` 为需要标记为可选的属性组成的对象子结构，`Omit<T, K>` 则为不需要处理的部分，使用交叉类型将其组合即可。

```typescript
// testing
type Flatten<T> = { [K in keyof T]: T[K] }
type MarkPropsAsOptionalWithFlattern<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<MarkPropsAsOptional<T, K>>

type MarkPropsAsOptionalStruct = MarkPropsAsOptionalWithFlattern<
  {
    foo: string
    bar: number
    baz: boolean
  },
  'bar'
>
// type MarkPropsAsOptionalStruct = {
//   bar?: number | undefined;
//   foo: string;
//   baz: boolean;
// }
```

> 你也可以使用 `DeepPartial<Pick<T, K>>`，来把这些属性标记为深层的可选状态







