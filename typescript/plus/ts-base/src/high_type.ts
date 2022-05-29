console.log('-- high_type start --')

{
  // 交叉类型和联合类型

  // 交叉类型指将多个类型合并为一个类型，新的类型具有所有类型的特性，交叉类型特别适合对象混用的场景
  interface DogInterface {
    run(): void
  }
  interface CatInterface {
    jump(): void
  }
  // 交叉类型取所有类型的并集
  const pet: DogInterface & CatInterface = {
    run() {},
    jump() {}
  }
  
  // 联合类型指声明的类型并不确定，可以为多个类型中的一个，
  const a: number | string = 1
  // 有时候我们不仅需要限制变量类型，还需要限定取值在某个范围内，这时就需要使用字面量类型
  const b: 'a' | 'b' | 'c' = 'b'
  // 字面量类型不仅可以是字符串，还可以是数字
  const c: 1 | 2 | 3 = 3
  class Dog implements DogInterface {
    run() { }
    eat() { }
  }
  class Cat implements CatInterface {
    jump() { }
    eat() { }
  }
  enum Master { Boy, Girl }
  function getPet(master: Master) {
    let pet = master === Master.Boy ? new Dog() : new Cat()
    // 如果一个对象是联合类型，那么在类型未确定的情况下，只能访问所有类型的共有成员
    // 联合类型从字面上来看，是取所有类型的并集，实际上只能取类成员的交集
    pet.eat()

    return pet
  }

  // 可区分的联合类型
  // 这种模式本质上是结合了联合类型和字面量类型的一种类型保护方法
  // 核心思想是一个类型如果是多个类型的联合类型，并且每个类型之间存储公共的属性，那么我们就可以凭借这个公共属性，创建类型保护区块
  interface Square {
    kind: "square";
    size: number
  }
  interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
  }
  interface Circle {
    kind: 'circle',
    r: number
  }
  type Shape = Square | Rectangle
  // 这种模式的核心就是利用两种模式的公有属性来创建不同的类型保护区块
  function area(s: Shape) {
    switch (s.kind) {
      case "square":
        return s.size * s.size
      case "rectangle":
        return s.height * s.width
    }
  }
  // 如果我们向 Shape 追加一个类型，会发现它并不会报错
  // 这时我们可以指定返回值类型对 area2 函数进行约束，这时就必须实现 Circle 的逻辑
  type Shape2 = Square | Rectangle | Circle
  function area2(s: Shape2): number {
    switch (s.kind) {
      case "square":
        return s.size * s.size
      case "rectangle":
        return s.height * s.width
      case "circle":
        return 2 * Math.PI * s.r
    }
  }
}

{
  // 索引类型
  const obj = {
    a: 1,
    b: 2,
    c: 3
  }
  function getValues(obj: any, keys: string[]) {
    return keys.map(key => obj[key])
  }
  console.log(getValues(obj, ['a', 'b']))
  console.log(getValues(obj, ['e', 'f']))
  // 如何使用 ts 对上述模式进行约束？

  // keyof T
  interface Obj {
    a: number;
    b: string;
  }
  let key: keyof Obj
  
  // T[K]
  let value: Obj['a']

  {
    function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
      return keys.map(key => obj[key])
    }
    console.log(getValues(obj, ['a', 'b']))
    // console.log(getValues(obj, ['e', 'f'])) //  Type '"f"' is not assignable to type '"a" | "b" | "c"'.
  }
}

{
  // 映射类型
  interface Obj {
    a: string;
    b: number;
    c: boolean;
  }

  type ReadOnlyObj = Readonly<Obj>
  // type ReadOnlyObj = {
  //   readonly a: string;
  //   readonly b: number;
  //   readonly c: boolean;
  // }

  type PartialObj = Partial<Obj>
  // type PartialObj = {
  //  a?: string | undefined;
  //  b?: number | undefined;
  //  c?: boolean | undefined;
  // }

  type PickObject = Pick<Obj, 'a' | 'b'> 
  // type PickObject = {
  //   a: string;
  //   b: number;
  // }

  type RecordObj = Record<'x' | 'y', Obj>
  // type RecordObj = {
  //   x: Obj;
  //   y: Obj;
  // }
  
}

console.log('-- high_type end --')
