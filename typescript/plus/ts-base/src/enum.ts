console.log('-- enum start --')

// 数字枚举
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}
console.log(Role.Reporter);
console.log(Role);
// 枚举会被编译成一个对象，既可以用名称索引，也可以用值来索引
// {0: 'Reporter', 1: 'Developer', 2: 'Maintainer', 3: 'Owner', 4: 'Guest', Reporter: 0, Developer: 1, Maintainer: 2, Owner: 3, Guest: 4}
// 我们可以用 ts playground 来查看其实现，https://www.typescriptlang.org/play。
// "use strict";
// var Role;
// (function (Role) {
//     Role[Role["Reporter"] = 0] = "Reporter";
//     Role[Role["Developer"] = 1] = "Developer";
//     Role[Role["Maintainer"] = 2] = "Maintainer";
//     Role[Role["Owner"] = 3] = "Owner";
//     Role[Role["Guest"] = 4] = "Guest";
// })(Role || (Role = {}));
// 上面这种代码实现方式叫做反向映射，这就是枚举的实现原理。

// 字符串枚举
enum Message {
  Success = 'success',
  Fail = 'fail'
}
// 字符串枚举不可以反向映射
// "use strict";
// var Message;
// (function (Message) {
//     Message["Success"] = "success";
//     Message["Fail"] = "fail";
// })(Message || (Message = {}));

// 异构枚举
// 不推荐使用，容易引起混淆
enum Answer {
  N,
  Y = 'yes'
}
// "use strict";
// var Answer;
// (function (Answer) {
//     Answer[Answer["N"] = 0] = "N";
//     Answer["Y"] = "yes";
// })(Answer || (Answer = {}));

// 枚举成员
// 枚举成员的值是一个只读类型，定义后无法修改
// Role.Reporter = 2 // 'Reporter' because it is a read-only property.
// 枚举成员分为两类：
//  一类是常量枚举（const enum），它会在编译的时候计算出结果，然后以常量的形式出现在运行时环境
//  一类是计算枚举（computed enum），是一些非常量的表达式 ，这些类型的值不会再编译时计算，而是会保留到程序的执行阶段
enum Char {
  // const 
  a, // 1. 无初始值
  b = Char.a, // 2. 已有常量的引用
  c = 1 + 3, // 3. 常量表达式
  // computed
  d = Math.random(),
  e = '123'.length,
  // f //  Enum member must have initializer.  computed enum 后面的成员必须赋初始值
}
// "use strict";
// var Char;
// (function (Char) {
//     // const 
//     Char[Char["a"] = 0] = "a";
//     Char[Char["b"] = 0] = "b";
//     Char[Char["c"] = 4] = "c";
//     // computed
//     Char[Char["d"] = Math.random()] = "d";
//     Char[Char["e"] = '123'.length] = "e";
// })(Char || (Char = {}));

// 常量枚举
// const 关键字声明的枚举就是常量枚举，常量枚举会在编译阶段被移除
// "use strict"; 编译后没有任何代码，也不存在反向映射，因为已经被移除掉
const enum Month {
  Jan,
  Feb,
  Mar
}
// 当我们不需要一个对象，而需要对象的值时，可以使用常量枚举，这样会减少编译后的代码
let month = [Month.Jan, Month.Feb]
// "use strict";
// let month = [0 /* Jan */, 1 /* Feb */];
// 编译后，枚举会直接被替换成常量，这样在编译后代码就会变得非常简洁

// 枚举类型
// 某些情况下，枚举和枚举成员都可以作为一种单独的类型存在
enum E { a, b }
enum F { a = 0, b = 1 }
enum G { a = 'apple', b = 'banana' }

let e: E = 3
let f: F = 3
// e == f //  This condition will always return 'false' since the types 'E' and 'F' have no overlap. 两种不同类型的枚举是不可以比较的

let e1: E.a
let e2: E.b
let e3: E.a
// e1 === e2 // 不可以比较
// e1 === e3 // 相同类型可以进行比较

let g1: G
let g2: G.a
// 字符串类型枚举只能是枚举成员的类型

console.log('-- enum end --')


enum Test {
  A = 'a',
  B = 'b',
  C = 'c'
}

type TestValue = keyof Record<Test, string>

function getKey (value: string) {
  let key: keyof typeof Test

  for (key in Test) {
    if (value === Test[key]) return key
  }

  return null
}