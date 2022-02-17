const arrayOfNumber: number[] = [1, 2, 3];
const arrayOfString: string[] = ['x', 'y', 'z'];
const arrayOfNumber2: Array<number> = [1, 2, 3];
const arrayOfString2: Array<string> = ['x', 'y', 'z'];


let anything: any = {};
anything = 1; // 不会提示错误
anything = 'x'; // 不会提示错误

const num: number = anything; // 不会提示错误
const str: string = anything; // 不会提示错误


// 与 any 不同的是，unknown 在类型上更安全，所有的类型缩小手段对 unknown 都有效
let result: unknown;

if (typeof result === 'number') {
  result.toFixed();
}


const undeclared: undefined = undefined; // 鸡肋
const nullable: null = null; // 鸡肋


// 函数因为永远不会有返回值，所以它的返回值类型就是 never
function ThrowError(msg: string): never {
  throw Error(msg);
}

function InfiniteLoop(): never {
  while (true) {}
}


const props: {
  id: number,
  name?: never
} = {
  id: 1
}
// props.name = null; // ts(2322)) is not assignable to type 'undefined'.
// props.name = 'str'; // ts(2322) is not assignable to type 'undefined'.
// props.name = 1; // ts(2322) is not assignable to type 'undefined'.


// 类型断言
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan: number = arrayNumber.find(num => num > 2) as number;
const greaterThan2: number = <number>arrayNumber.find(num => num > 2);

// 常量断言
let str1 = 'str' as const;
const readOnlyArr = [0, 1] as const;


// 类型守卫
let mayNullOrUndefinedOrString: null | undefined | string;
if (typeof mayNullOrUndefinedOrString === 'string') {
  mayNullOrUndefinedOrString.toString(); // ok
}
