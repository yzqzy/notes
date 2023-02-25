// class BedMaker<t> {
//   make() {}
// }

// const A = new BedMaker<红木>()
// const B = new BedMaker<桃木>()

// ---------------------------

// class 红木 implements IMakedBed {
//   makeBed() { ... }
// }

// ----------

// class GenericNumber<NumType> {
//   zeroValue: NumType
//   add: (x: NumType, y: NumType) => NumType
// }

// let myGenericNumber = new GenericNumber<number>()
// myGenericNumber.zeroValue = 0
// myGenericNumber.add = function (x, y) {
//   return x + y
// }

// let stringNumeric = new GenericNumber<string>()
// stringNumeric.zeroValue = ''
// stringNumeric.add = function (x, y) {
//   return x + y
// }

// ---------------

// class GenericNumber<T> {
//   private zeroValue: T

//   constructor(v: T) {
//     this.zeroValue = v
//   }

//   public add(x: T, y: T) {
//     return x + y
//   }
// }

// ----------

// function loggingIdentity<Type>(arg: Type): Type {
//   console.log(arg.length)
//   // 类型“Type”上不存在属性“length”。
//   return arg
// }

// interface Lengthwise {
//   length: number
// }

// function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
//   console.log(arg.length)
//   return arg
// }

// type Point = { x: number; y: number }
// type P = keyof Point // x | y

// ----------

// function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
//   return obj[key]
// }

// const x = { a: 1, b: 2, c: 3, d: 4 }

// getProperty(x, 'a')
// getProperty(x, 'm') // 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数

// const a = { x: 1, y: 2 }
// a.z = 3 // Error

// ----------

// function create<Type>(c: { new (): Type }): Type {
//   return new c()
// }

// create(Foo) // Foo 的实例

class BeeKeeper {
  hasMask: boolean = true
}

class ZooKeeper {
  nametag: string = 'Mike'
}

class Animal {
  numLegs: number = 4
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper()
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper()
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c()
}

createInstance(Lion).keeper.nametag
createInstance(Bee).keeper.hasMask
