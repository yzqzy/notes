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

class GenericNumber<T> {
  private zeroValue: T

  constructor(v: T) {
    this.zeroValue = v
  }

  public add(x: T, y: T) {
    return x + y
  }
}
