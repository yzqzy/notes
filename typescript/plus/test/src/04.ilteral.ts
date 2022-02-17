/** 类型推断 start */
{
  let str: string = 'this is string';
  let num: number = 1;
  let bool: boolean = true;
}
{
  const str: string = 'this is string';
  const num: number = 1;
  const bool: boolean = true;
}
// => 
{
  let str = 'this is string'; // 等价
  let num = 1; // 等价
  let bool = true; // 等价
}
{
  const str = 'this is string'; // 不等价
  const num = 1; // 不等价
  const bool = true; // 不等价
}


{

  // 根据参数的类型，推断出返回值的类型也是
  function add1(a: number, b: number) {
    return a + b;
  }
  const x1= add1(1, 1); // 推断出 x1 的类型也是 number

  // 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字
  function add2(a: number, b = 1) {
    return a + b;
  }
  const x2 = add2(1);
  // const x3 = add2(1, '1'); // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number | undefined
}
/** 类型推断 end */


/** 上下文推断 start */
{
  type Adder = (a: number, b: number) => number;

  const add: Adder = (a, b) => {
    return a + b;
  }

  const x1 = add(1, 1); // 推断出 x1 类型是 number
  // const x2 = add(1, '1');  // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number
}
/** 上下文推断 end */


/** 字面量类型 start */
// TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型

{
  let specifiedStr: 'this is string' = 'this is string';
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true;
}


{
  // 字面量类型是集合类型的子类型，它是集合类型的一种更具体的表达

  let specifiedStr: 'this is string' = 'this is string';
  let str: string = 'any string';
  // specifiedStr = str; // ts(2322) 类型 '"string"' 不能赋值给类型 'this is string'
  str = specifiedStr; // ok 
}

/** 字面量类型 end */


/** Literal Widening 字面类型拓宽 start */
{

  let str = 'this is string'; // 类型是 string
  let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;

  const specifiedStr = 'this is string'; // 类型是 'this is string'

  let str2 = specifiedStr; // 类型是 'string'
  let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;
}

{
  const specifiedStr: 'this is string' = 'this is string'; // 类型是 '"this is string"'
  let str2 = specifiedStr; // 即便使用 let 定义，类型是 'this is string'
}
/** Literal Widening 字面类型拓宽 end */


/** Type Widening 类型拓宽 start */
{
  let x = null; // 类型拓宽成 any
  let y = undefined; // 类型拓宽成 any

  const z = null; // 类型是 null

  let anyFun = (param = null) => param; // 形参类型是 null
  let z2 = z; // 类型是 null
  let x2 = x; // 类型是 null
  let y2 = y; // 类型是 undefined
}
/** Type Widening 类型拓宽 end */


/** Type Narrowing  类型缩小 start */
{
  // 类型守卫缩小类型
  let func = (anything: any) => {
    if (typeof anything === 'string') {
      return anything; // 类型是 string 
    } else if (typeof anything === 'number') {
      return anything; // 类型是 number
    }
    return null;
  }
}
{
  // 类型守卫缩小类型
  let func = (anything: string | number) => {
    if (typeof anything === 'string') {
      return anything; // 类型是 string 
    } else {
      return anything; // 类型是 number
    }
  };
}
/** Type Narrowing  类型缩小 end */


// let 声明的简单类型字面量会拓宽类型，const 声明的简单类型字面量会收窄，const 声明的对象变量会自动推断对应的类型，可以用as const 收窄，让每一个key都是固定类型
// 对象 as const，会让对象的每个属性变成只读（readonly）。
// 在 TypeScript 类型层面，条件判断顺带的会触发类型缩小。