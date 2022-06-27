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


interface Function {
  
}
