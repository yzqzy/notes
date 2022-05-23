// 联合类型（Unions）用来表示变量、参数的类型不是单一原子类型，而可能是多种不同的类型的组合

/**  */
{
  function formatPX(size: unknown) {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    if (typeof size === 'string') {
      return `${parseInt(size) || 0}px`;
    }
    throw Error(` 仅支持 number 或者 string`);
  }
  
  formatPX(13);
  formatPX('13px');
}
/**  */

/** 联合类型 start */
{
  function formatUnit(size: number | string, unit: 'px' | 'em' | 'rem' | '%' = 'px') {}

  formatUnit(1, 'em'); // ok
  formatUnit('1px', 'rem'); // ok
  // formatUnit('1px', 'bem'); // ts(2345)
}
/** 联合类型 end */

/** 联合类型 复杂 start */
type ModernUnit = 'vh' | 'vw';
type Unit = 'px' | 'em' | 'rem';
type MessedUp = ModernUnit | Unit; // 类型是 'vh' | 'vw' | 'px' | 'em' | 'rem'
/** 联合类型 复杂 end */


/** 接口类型、联合类型 start */
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

const getPet: () => Bird | Fish = () => {
  return {
  } as Bird | Fish;
};

const Pet = getPet();

// Pet.layEggs(); // ok
// Pet.fly(); // ts(2339) 'Fish' 没有 'fly' 属性; 'Bird | Fish' 没有 'fly' 属性

// if (typeof Pet.fly === 'function') { // ts(2339)
//   Pet.fly(); // ts(2339)
// }

// 类型守卫判断需要使用 in 关键字，使用其他判断仍会报错
if ('fly' in Pet) {
  Pet.fly(); // ok
}
/** 接口类型、联合类型 end */


/** 交叉类型 Intersection Type start */
{
  type Useless = string & number; 
  // 无意义，把原始类型、字面量类型、函数类型等原子类型合并成交叉类型，是没有任何用处的，因为任何类型都不能满足同时属于多种原子类型
}
/** 交叉类型 Intersection Type end */


/** 合并接口类型 start */
// 联合类型真正的用武之地就是将多个接口类型合并成一个类型，从而实现等同接口继承的效果，也就是所谓的合并接口类型

{
  type IntersectionType = { id: number; name: string; } & { age: number };

  const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
  }


  // 同名属性类型直接报错且同名属性的类型不兼容，合并后，name 属性的类型就是 number 和 string 两个原子类型的交叉类型，即 never
  // type IntersectionTypeConfict = { id: number; name: string; } & { age: number; name: number; };

  // const mixedConflict: IntersectionTypeConfict = {
  //   id: 1,
  //   // name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
  //   age: 2
  // };
}
/** 合并接口类型 end */


/** 合并联合类型 start */
{
  // 我们可以合并联合类型为一个交叉类型，这个交叉类型需要同时满足不同的联合类型限制，也就是提取了所有联合类型的相同类型成员。这里，我们也可以将合并联合类型理解为求交集。

  type UnionA = 'px' | 'em' | 'rem' | '%';
  type UnionB = 'vh' | 'em' | 'rem' | 'pt';
  type IntersectionUnion = UnionA & UnionB;

  const intersectionA: IntersectionUnion = 'em'; // ok
  const intersectionB: IntersectionUnion = 'rem'; // ok
  // const intersectionC: IntersectionUnion = 'px'; // ts(2322)
  // const intersectionD: IntersectionUnion = 'pt'; // ts(2322)


  type UnionC = 'em' | 'rem';
  type UnionD = 'px' | 'pt';
  type IntersectionUnionE = UnionC & UnionD;

  // 如果多个联合类型中没有相同的类型成员，交叉出来的类型就是 never
  // const intersectionE: IntersectionUnionE = 'any' as any; // ts(2322) 不能赋予 'never' 类型
}
/** 合并联合类型 end */


/** 类型缩减 start */
{
  // 将 string 原始类型和“string字面量类型”组合成联合类型，效果就是类型缩减成 string

  type URStr = 'string' | string; // 类型是 string
  type URNum = 2 | number; // 类型是 number
  type URBoolen = true | boolean; // 类型是 boolean

  enum EnumUR {
    ONE,
    TWO
  }

  type URE = EnumUR.ONE | EnumUR; // 类型是 EnumUR

  // TS 把字面量类型、枚举成员类型缩减掉，只保留原始类型、枚举类型等父类型，这是合理的“优化”

  // 但是下面这个缩减，却极大地削弱了 IDE 自动提示的能力
  type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string; // 类型缩减成 string

  // 我们希望 IDE 能自动提示显示注解的字符串字面量，但是因为类型被缩减成 string，所有的字符串字面量 black、red 等都无法自动提示出来
  // TypeScript 官方其实还提供了一个黑魔法，它可以让类型缩减被控制
  type BorderColor2 = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string & {}; // 字面类型都被保留


  // 当联合类型的成员是接口类型，如果满足其中一个接口的属性是另外一个接口属性的子集，这个属性也会类型缩减
  type UnionInterce = {
      age: '1';
  } | ({
    age: '1' | '2';
    [key: string]: string;
  });

  // 定义如下 age 属性是数字类型，而其他不确定的属性是字符串类型的数据结构的对象
  // never 有一个特性是它是所有类型的子类型，自然也是 number 和 string 的子类型
  type UnionInterce2 = | {
    age: number;
  } | ({
    age: never;
    [key: string]: string;
  });
  const O: UnionInterce2 = {
    age: 2,
    string: 'string'
  };
}
/** 类型缩减 end */

// 联合和交叉类型赋予了 TypeScript 类型最基本的“编程”（运算）能力，学习和掌握联合和交叉类型后，可以培养我们抽离、复用公共类型的意识和能力
// A & B 本质上就是说类型既符合 A 也符合 B，所以如果 A、B 是接口类型，就等于是把他们合并为一个接口类型（类比求并集）；但是如果 A、B 是联合类型，则会得到他们公共成员类型（类比求交集）
// 