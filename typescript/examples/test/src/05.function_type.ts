{
  const add = (a: number, b: number): number => {
    return a + b;
  }
}

/** 废柴 void 唯一用处 start */
function fn1(): void { }
/** 废柴 void 唯一用处 end */

/** ts 箭头函数 start */
// TypeScript 函数类型中的=>用来表示函数的定义，其左侧是函数的参数类型，右侧是函数的返回值类型；而 ES6 中的=>是函数的实现。

type Adder = (a: number, b: number) => number; // TypeScript 函数类型定义
const add: Adder = (a, b) => a + b; // ES6 箭头函数

interface Entity {
  add: (a: number, b: number) => number;
  del(a: number, b: number): number;
}

const entity: Entity = {
  add: (a, b) => a + b,
  del(a, b) {
    return a - b;
  },
};
/** ts 箭头函数 end */


/** 可缺省和可推断的返回值类型 start */
function computeTypes (one: string, two: number) {
  const nums = [two];
  const strs = [one]

  return {
    nums,
    strs
  } // 返回 { nums: number[]; strs: string[] } 的类型 
}

// 函数返回值的类型推断结合泛型可以实现特别复杂的类型计算（本质是复杂的类型推断，这里称之为计算是为了表明其复杂性），
// 比如 Redux Model 中 State、Reducer、Effect 类型的关联。
/** 可缺省和可推断的返回值类型 end */


/** Generator 函数的返回值 start */
type AnyType = boolean;
type AnyReturnType = string;
type AnyNextType = number;

function *gen(): Generator<AnyType, AnyReturnType, AnyNextType> {
  const nextValue = yield true; // nextValue 类型是 number，yield 后必须是 boolean 类型
  return `${nextValue}`; // 必须返回 string 类型
}
/** Generator 函数的返回值 end */


/** 参数类型-可选参数和默认参数 start */
function log(x?: string) {
}

function log1(x: string | undefined) {
}

log();
log(undefined);

// log1(); // ts(2554) Expected 1 arguments, but got 0
log1(undefined);


// 函数的默认参数类型必须是参数类型的子类型
function log3(x: number | string = 'hello') {
  console.log(x);
}
/** 参数类型-可选参数和默认参数 end */


/** 参数类型-剩余参数 start */
function sum(...nums: (number | string)[]): number {
  return nums.reduce<number>((a, b) => a + Number(b), 0);
}

sum(1, '2', 3); // 6
/** 参数类型-剩余参数 end */


/** this start */
class Container {
  private val: number;

  constructor(val: number) {
    this.val = val;
  }

  map(cb: (x: number) => number): this {
    this.val = cb(this.val);
    return this;
  }

  log(): this {
    // console.log(this.val);
    return this;
  }
}

const instance = new Container(1)
  .map((x) => x + 1)
  .log() // => 2
  .map((x) => x * 3)
  .log(); // => 6  
/** this end */


/** 函数重载 start */
function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;

function convert(x: string | number | null): any {
    if (typeof x === 'string') {
      return Number(x);
    }
    if (typeof x === 'number') {
      return String(x);
    }
    return -1;
}

const x1 = convert('1'); // => number
const x2 = convert(1); // => string
const x3 = convert(null); // -1
/** 函数重载 end */


/** 类型谓词（is） start */
// {
//   function isString(s): s is string { // 类型谓词
//     return typeof s === 'string';
//   } 
    
//   function isNumber(n: number) {
//     return typeof n === 'number';
//   }
  
//   function operator(x: unknown) {
//     if(isString(x)) { // ok x 类型缩小为 string
//     }
  
//   //   if (isNumber(x)) { // ts(2345) unknown 不能赋值给 number
//   //   }
//   }
// }
/** 类型谓词（is） end */