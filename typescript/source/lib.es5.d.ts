// https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts

/////////////////////////////
/// ECMAScript APIs
/////////////////////////////

declare var NaN: number

interface Symbol {
  // 返回对象的字符串表示
  toString(): string;
  // 返回指定对象的原始值
  valueOf(): symbol;
}


interface Number {
  // 返回对象的字符串表示
  toString(radix?: number): string;

  // 使用定点表示法来格式化一个数值
  toFixed(fractionDigits?: number): string;

  // 以指数表示法返回该数值字符串表示形式
  toExponential(fractionDigits?: number): string;

  // 以指定的精度返回该数值对象的字符串表示
  toPrecision(precision?: number): string;

// 返回指定对象的原始值
  valueOf(): boolean;
}
interface NumberConstructor {
  new(value?: any): Number;
  (value?: any): number;
  readonly prototype: Number;

  // JavaScript 中的最大数字。约等于 1.79e+308
  readonly MAX_VALUE: number;
  // JavaScript 中的最小正值。约等于 5.00E-324
  readonly MIN_VALUE: number;

  // 一个不是数字的值
  // 在全等比较中，NaN 不等于任何值，包括其本身。测试是否等于 NaN，可以使用 isNaN 函数。
  readonly NaN: number;

  // 表示负无穷大
  readonly NEGATIVE_INFINITY: number;
  // 表示正无穷大
  readonly POSITIVE_INFINITY: number;
}
declare var Number: NumberConstructor;


interface String {
  // 返回字符串的字符串表示形式
  toString(): any;

  // 在指定索引处返回字符
  charAt(pos: number): string;
  // 在指定索引处返回字符的 Unicode 值
  charCodeAt(index: number): string;

  // 返回包含两个或多个字符串链接字符串
  concat(...string: string[]): string;

  // 返回指定字符串第一次出现的位置
  indexOf(searchString: string, position?: number): number;
  // 返回指定字符串最后一次出现的位置
  lastIndexOf(searchString: string, position?: number): number;

  // 确定当前位置中的两个字符串是否相等
  localeCompare(that: string): number;

  // 将字符串与正则表达式匹配，返回包含该搜索结果的数组
  match(regexp: string | RegExp): RegExpMatchArray | null;
  // 使用正则表达式或字符串替换目标字符串的文本
  replace(searchValue: string | RegExp, replaceValue: string): string;
  replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;

  // 使用正则表达式或字符串寻找第一个匹配的字符
  search(regexp: string | RegExp): number;

  // 提取某个字符串，并返回新字符串，且不改动原字符串
  slice(start?: number, end?: number): string;

  // 使用指定的分隔符将字符串分割为子字符串，并以数组的形式返回
  split(separator: string | RegExp, limit?: number): string[];

  // 返回字符串中指定范围的字符串
  substring(start: number, end?: number): string;

  // 将字符串中的所有字母字符转换为小写
  toLowerCase(): string;
  // 考虑当前主机的语言环境，将所有字母字符转换为小写
  toLocaleLowerCase(): string;
  // 将字符串中的所有字母字符转换为大写
  toUpperCase(): string;
  // 考虑当前主机的语言环境，将所有字母字符转换为大写
  toLocaleUpperCase(): string;

  // 从一个字符串的两端删除空白字符
  // 这里的空白字符是指所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR 等）
  trim(): string; 

  // 返回字符串对象的长度
  readonly length: number;

  // IE 拓展
  // 返回一个字符串中从指定位置开始到指定字符数的字符
  // 它并非 JavaScript 核心语言的一部分，未来将可能会被移除掉。
  substr(form: number, length?: number): string;

  // 返回指定对象的原始值
  valueOf(): string;

  readonly [index: number]: string
}
interface StringConstructor {
  new(value?: any): String;
  (value?: any): string;
  readonly prototype: String;
  fromCharCode(...codes: number[]): string
}
declare var String: StringConstructor;


interface Boolean {
  // 返回指定对象的原始值
  valueOf(): boolean;
}
interface BooleanConstructor {
  new(value?: any): Boolean;
  <T>(value?: T): boolean;
  readonly prototype: Boolean;
}
declare var Boolean: BooleanConstructor;


// declare type PropertyKey = string | number | symbol

interface PropertyDescriptor {
  configurable?: boolean;
  enumerable?: boolean;
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(val: any): void;
}
interface PropertyDescriptorMap {
  [s: string]: PropertyDescriptor
}

interface Object {
  // Object.prototype.constructor 的初始值是一个标准的内置对象构造函数
  constructor: Function;

  // 返回对象的字符串表示 
  toString(): string;
  // 返回对象的字符串表示 
  toLocalString(): string;
  // 返回指定对象的原始值
  valueOf(): Object;

  // 确定对象是否具有指定名称的属性
  hasOwnProperty(v: PropertyKey): boolean;
  // 确定对象是否存在于另一个对象的原型链中
  isPrototypeOf(v: Object): boolean;
  // 确定指定的属性是否可枚举
  propertyIsEnumerable(v: PropertyKey): boolean;
}
interface ObjectConstructor {
  new(value?: any): Object;
  (): any;
  (value: any): any;

  // 对象原型的引用
  readonly prototype: Object;

  // 返回对象的原型
  getPrototypeOf(o: any): any;
  // 获取指定对象的属性描述符
  getOwnPropertyDescriptor(o: any, p: PropertyKey): PropertyDescriptor | undefined;
  // 返回对象自己的属性名称
  getOwnPropertyNames(o: any): string[];

  // 创建具有指定原型或具有空原型的对象
  create(o: Object | null): any;
  // 创建具有指定原型或具有空原型的对象，并且可选地包含指定属性
  create(o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;

  // 给对象添加属性或修改现有属性
  defineProperty<T>(o: T, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any>): T;
  // 给对象添加单个/多个属性或修改现有属性
  defineProperties<T>(o: T, properties: PropertyDescriptorMap & ThisType<any>): T;

  // 防止修改现有属性和添加属性
  seal<T>(o: T): T;

  // 防止修改现有属性和值，并且防止添加属性
  freeze<T>(a: T[]): readonly T[];
  freeze<T extends Function>(f: T): T;
  freeze<T>(o: T): Readonly<T>;

  // 防止在对象中添加新属性
  preventExtensions<T>(o: T): T;

  // 如果无法在对象中修改现有属性，并且无法添加新属性，返回 true
  isSealed(o: any): boolean;
  // 如果无法在对象中修改现有属性和值，并且无法添加新属性，返回 true
  isFrozen(o: any): boolean;
  // 如果无法添加新属性，返回 true
  isExtensible(o: any): boolean;

  // 返回对象的可枚举字符串属性和方法的名称
  keys(o: object): string[];
}
declare var Object: ObjectConstructor;


interface ConcatArray<T> {
  readonly length: number;
  readonly [n: number]: T;
  join(separator?: string): string;
  slice(start?: number, end?: number): T[];
}
interface Array<T> {
  // 获取或设置数组的长度
  length: number;

  // 返回数组的字符串表示
  toString(): string;
  // 返回数组的字符串表
  // 数组中的元素将使用各自的 toLocaleString 方法转成字符串
  // 这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。
  toLocaleString(): string;

  // 从数组中删除最后一个元素并将其返回
  // 如果数组为空，返回 undefined，并且不修改数组
  pop(): T | undefined;

  // 在数组的末尾添加新元素，并返回数组长度
  push(...items: T[]): number;

  // 合并一个或多个数组
  // 此方法返回一个新数组，不修改原数组
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[]

  // 将数组的所有元素添加到字符串中，并使用指定的分隔符进行分割
  join(separator?: string): string;

  // 反转数组元素
  // 改变数组并返回数组引用
  reverse(): T | undefined;

  // 从数组中删除第一个元素并返回
  // 如果数组为空，返回 undefined，且不修改数组
  shift(): T | undefined;

  // 返回指定区间的拷贝数组
  slice(start?: number, end?: number): T[];

  // 原地排序
  sort(compareFn?: (a: T, b: T) => number): this;

  // 从数组中删除元素，在必要时将新元素插入并返回已删除元素
  splice(start: number, deleteCount: number, ...items: T[]): T[];

  // 在数组开头插入新元素，并返回数组的新长度
  unshift(...items: T[]): number;

  // 返回数组中第一次出现目标值的索引，如果存在返回 -1
  indexOf(searchElement: T, fromIndex?: number): number;
  // 返回数组中最后一次出现目标值的索引，如果存在返回 -1
  lastIndexOf(searchElement: T, fromIndex?: number): number;

  // 确定数组中元素是否都通过被提供的函数测试
  every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;

  // 确定数组中是不是至少有一个元素通过被提供的函数测试
  some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;

  // 对数组中每个元素执行指定的操作
  forEach(callbackFn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;

  // 对数组中每个元素都执行定义的回调函数，并返回结果数组
  map<U>(callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];

  // 返回符合回调函数中指定条件的元素
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
  filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];

  // 对数组中的每个元素按序执行一个由您提供的 reducer 函数
  // 每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。
  reduce(callbackFn: (perviousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  reduce(callbackFn: (perviousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  reduce<U>(callbackFn: (perviousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

  // 接受一个函数作为累加器和数组的每个值（从右到左）将其减少为单个值。
  reduceRight(callbackFn: (perviousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
  reduceRight(callbackFn: (perviousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
  reduceRight<U>(callbackFn: (perviousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

  [n: number]: T;
}
interface ArrayConstructor {
  new(arrayLength?: number): any[];
  new <T>(arrayLength?: number): T[];
  new <T>(...items: T[]): T[];
  (arrayLength?: number): any[];
  <T>(arrayLength?: number): T[];
  <T>(...items: T[]): T[];
  isArray(arg: any): arg is any[];
  readonly prototype: any[];
}
declare var Array: ArrayConstructor;


interface Function {
  // 调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数
  apply(this: Function, thisArg: any, argArray?: any): any;
  // 使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数
  call(this: Function, thisArg: any, ...argArray: any[]): any;
  // 创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
  bind(this: Function, thisArg: any, ...argArray: any[]): any;

  // 返回函数的字符串表示形式
  toString(): any;

  prototype: any;
  readonly length: number;

  // 非标准条件
  arguments: any;
  caller: Function
}
interface FunctionConstructor {
  // 创建一个新的 Function
  new(...args: string[]): Function;
  (...args: string[]): Function;
  readonly prototype: Function;
}
declare var Function: FunctionConstructor;


interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2>;
}
interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2>;

  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<T | TResult>
}


// 使所有属性可选
type Partial<T> = {
  [P in keyof T]?: T[P]
}
// 使所有属性只读
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
// 选取一组属性，返回新类型
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
// 使所有属性必选
type Required<T> = {
  [P in keyof T]-?: T[P]
}

// 构造一组属性 K 的类型
type Record<K extends keyof any, T> = {
  [P in K]: T
}

// 从 T 中排除可以赋值给 U 的类型
type Exclude<T, U> = T extends U ? never : T
// 提取 T 中可以赋值给 U 的类型
type Extract<T, U> = T extends U ? T : never

// 除 K 类型外，构造具有 T 属性的类型
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
// 从 T 中剔除 null 和 undefined 类型
type NonNullable<T> = T extends null | undefined ? never : T

// 获取函数的参数类型组成的元组类型
type Parameters<T extends (...args: any) => any>
  = T extends (...args: infer P) => any ? P : never
// 获取构造器的函数类型组成的元组类型
type ConstructorParmeters<T extends abstract new (...args: any) => any>
  = T extends abstract new (...args: infer P) => any ? P : never

// 获取函数的返回类型
type ReturnType<T extends (...args: any) => any>
  = T extends (...args: any) => infer R ? R : any
// 获取构造函数的返回类型 
type InstanceType<T extends abstract new (...args: any) => any>
  = T extends abstract new (...args: any) => infer R ? R : any

// 将字符串字面量转换为大写
type UpperCase<S extends string> = intrinsic
// 将字符串字面量转换为小写
type Lowercase<S extends string> = intrinsic
// 将字符串第一个字符转换为大写
type Capitalize<S extends string> = intrinsic
// 将字符串第一个字符转换为小写
type Uncapitalize<S extends string> = intrinsic
