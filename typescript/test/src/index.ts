function say (word: string) {
  console.log(word)
}

say('hello world');

// 类
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


// 函数重载
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


// 类型谓词
function isString(s: unknown): s is string { // 类型谓词
  return typeof s === 'string';
}
function isNumber(n: number) {
  return typeof n === 'number';
}

function operator(x: unknown) {
  if(isString(x)) { // ok x 类型缩小为 string

  }
//   if (isNumber(x)) { // ts(2345) unknown 不能赋值给 number

//   }
}


// 函数类型
interface ProgramLanguage {
  name: string;
  age: () => number;
}
type StudyLanguageType = (language: ProgramLanguage) => void
let StudyInterface: StudyLanguageType = language => console.log(`${language.name} ${language.age()}`);



// 联合类型
function formatUnit(size: number | string, unit: 'px' | 'em' | 'rem' | '%' = 'px') { }
formatUnit(1, 'em'); // ok
formatUnit('1px', 'rem'); // ok

type ModernUnit = 'vh' | 'vw';
type Unit = 'px' | 'em' | 'rem';
type MessedUp = ModernUnit | Unit; // 类型是 'vh' | 'vw' | 'px' | 'em' | 'rem'



// 交叉类型，将多个类型合并为一个类型
type Useless = string & number;


// 合并接口类型
type IntersectionType = { id: number; name: string; } & { age: number };
const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age: 18
}


// 合并联合类型（取交集）
type UnionA = 'px' | 'em' | 'rem' | '%';
type UnionB = 'vh' | 'em' | 'rem' | 'pt';
type IntersectionUnion = UnionA & UnionB;
const intersectionA: IntersectionUnion = 'em'; // ok
const intersectionB: IntersectionUnion = 'rem'; // ok


// 枚举类型
enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}  



// 泛型
function reflect<P>(param: P) {
  return param;
}
const reflectStr = reflect<string>('string'); // str 类型是 string
const reflectNum = reflect<number>(1); // num 类型 number
// useState
function useState<S>(state: S, initialValue?: S) {
  return [state, (s: S) => void 0] as unknown as [S, (s: S) => void];
}
// 泛型约束
function reflectSpecified<P extends number | string | boolean>(param: P):P {
  return param;
}
reflectSpecified('string'); // ok
reflectSpecified(1); // ok
reflectSpecified(true); // ok
// 泛型入参约束
interface ReduxModelSpecified<State extends { id: number; name: string }> {
  state: State
}
type ComputedReduxModel1 = ReduxModelSpecified<{ id: number; name: string; }>; // ok
type ComputedReduxModel2 = ReduxModelSpecified<{ id: number; name: string; age: number; }>; // ok
// 多泛型入参约束
interface ObjSetter {
  <O extends {}, K extends keyof O, V extends O[K]>(obj: O, key: K, value: V): V; 
}
const setValueOfObj: ObjSetter = (obj, key, value) => (obj[key] = value);
setValueOfObj({ id: 1, name: 'name' }, 'id', 2); // ok
setValueOfObj({ id: 1, name: 'name' }, 'name', 'new name'); // ok
// 泛型入参指定默认值
interface ReduxModelSpecified2<State = { id: number; name: string }> {
  state: State
}
type ComputedReduxModel5 = ReduxModelSpecified2; // ok
type ComputedReduxModel6 = ReduxModelSpecified2<{ id: number; name: string; }>; // ok
// 泛型入参约束和默认值组合使用
interface ReduxModelMixed<State extends {} = { id: number; name: string }> {
  state: State
}