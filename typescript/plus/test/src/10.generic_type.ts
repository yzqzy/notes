// 泛型指的是类型参数化，即将原来某种具体的类型进行参数化。
// 和定义函数参数一样，我们可以给泛型定义若干个类型参数，并在调用时给泛型传入明确的类型参数。
// 设计泛型的目的在于有效约束类型成员之间的关系，比如函数参数和返回值、类或者接口成员和方法之间的关系。

/** 泛型类型参数 start */
{
  // 泛型最常用的场景是用来约束函数参数的类型，我们可以给函数定义若干个被调用时才会传入明确类型的参数。

  function reflect<P>(param: P) {
    return param;
  }

  const reflectStr = reflect<string>('string'); // str 类型是 string
  const reflectNum = reflect<number>(1); // num 类型 number

  // 调用泛型函数时受泛型约束的参数有传值，泛型参数的入参可以从参数的类型中进行推断，而无须再显式指定类型（可缺省）
  const str = reflect('string'); // str 类型是 string
  const num = reflect(1); // num 类型 number

  // 泛型不仅可以约束函数整个参数的类型，还可以约束参数属性、成员的类型，比如参数的类型可以是数组、对象
  function reflectArray<P>(param: P[]) {
    return param;
  }
  const reflectArr = reflectArray([1, '1']); // reflectArr 是 (string | number)[]

  // 通过泛型，我们可以约束函数参数和返回值的类型关系，以 React  useState 为例
  function useState<S>(state: S, initialValue?: S) {
    return [state, (s: S) => void 0] as unknown as [S, (s: S) => void];
  }

  // 函数的泛型入参必须和参数/参数成员建立有效的约束关系才有实际意义。
  // 在下面示例中，我们定义了一个仅约束返回值类型的泛型，它是没有任何意义的
  function uselessGenerics<P>(): P {
    return void 0 as unknown as P;
  }

  // 我们可以给函数定义任何个数的泛型入参，如下代码所示：
  function reflectExtraParams<P, Q>(p1: P, p2: Q): [P, Q] {
    return [p1, p2];
  }
  // 上述代码中，我们定义了一个拥有两个泛型入参（P 和 Q）的函数 reflectExtraParams，并通过 P 和 Q 约束函数参数 p1、p2 和返回值的类型。
}
/** 泛型类型参数 end */

/** 泛型类 start */
{
  // 类的定义中，我们可以使用泛型用来约束构造函数、属性、方法的类型

  class Memory<S> {
    store: S;

    constructor(store: S) {
      this.store = store;
    }

    set(store: S) {
      this.store = store;
    }

    get() {
      return this.store;
    }
  }

  const numMemory = new Memory<number>(1); // <number> 可缺省
  const getNumMemory = numMemory.get(); // 类型是 number

  numMemory.set(2); // 只能写入 number 类型

  const strMemory = new Memory(''); // 缺省 <string>
  const getStrMemory = strMemory.get(); // 类型是 string

  strMemory.set('string'); // 只能写入 string 类型


  // 对于 React 开发者而言，组件也支持泛型，如下代码所示。
  // function GenericCom<P>(props: { prop1: string }) {
  //   return <></>;
  // };
  // <GenericCom<{ name: string; }> prop1="1" ... />
}
/** 泛型类 end */

/** 泛型类型 start */
{
  // 在 TypeScript 中，类型本身就可以被定义为拥有不明确的类型参数的泛型，并且可以接收明确类型作为入参，从而衍生出更具体的类型
  // 我们为变量 reflectFn 显式添加了泛型类型注解，并将 reflect 函数作为值赋给了它。
  const reflectFn: <P>(param: P) => P = reflect; // ok

  // 我们也可以把 reflectFn 的类型注解提取为一个能被复用的类型别名或者接口
  type ReflectFuncton = <P>(param: P) => P;

  interface IReflectFuncton {
    <P>(param: P): P
  }

  const reflectFn2: ReflectFuncton = reflect;
  const reflectFn3: IReflectFuncton = reflect;


  // 将类型入参的定义移动到类型别名或接口名称后，此时定义的一个接收具体类型入参后返回一个新类型的类型就是泛型类型
  // 定义了两个可以接收入参 P 的泛型类型（GenericReflectFunction 和 IGenericReflectFunction ）
  type GenericReflectFunction<P> = (param: P) => P;

  interface IGenericReflectFunction<P> {
    (param: P): P;
  }

  const reflectFn4: GenericReflectFunction<string> = reflect; // 具象化泛型
  const reflectFn5: IGenericReflectFunction<number> = reflect; // 具象化泛型
  const reflectFn3Return = reflectFn4('string'); // 入参和返回值都必须是 string 类型
  const reflectFn4Return = reflectFn5(1); //  入参和返回值都必须是 number 类型


  // 在泛型定义中，我们可以使用一些类型操作符进行运算表达，使得泛型可以根据入参的类型衍生出各异的类型
  // 我们定义了一个泛型，如果入参是 number | string 就会生成一个数组类型，否则就生成入参类型
  type StringOrNumberArray<E> = E extends string | number ? E[] : E;
  type StringArray = StringOrNumberArray<string>; // 类型是 string[]
  type NumberArray = StringOrNumberArray<number>; // 类型是 number[]
  type NeverGot = StringOrNumberArray<boolean>; // 类型是 boolean

  // 如果我们给上面这个泛型传入了一个 string | boolean 联合类型作为入参，将会得到什么类型呢
  // BooleanOrStringGot 和 WhatIsThis 这两个类型别名的类型不一样，这个就是所谓的分配条件类型（Distributive Conditional Types）。
  // 比如上边示例中的 string | boolean 入参，先被拆解成 string 和 boolean 这两个独立类型，再分别判断是否是 string | number 类型的子集。
  // 因为 string 是子集而 boolean 不是，所以最终我们得到的 WhatIsThis 的类型是 boolean | string[]
  // 能接受入参的泛型类型和函数一样，都可以对入参类型进行计算并返回新的类型，像是在做类型运算
  type BooleanOrString = string | boolean;
  type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 好像应该是 string | boolean ? 实际为 boolean | string[]
  type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean
  
  // 利用泛型，我们可以抽象封装出很多有用、复杂的类型约束。比如在 Redux Model 中约束 State 和 Reducers 的类型定义关系
  // 我们可以通过如下所示代码定义了一个既能接受 State 类型入参，
  // 又包含 state 和 reducers 这两个属性的接口类型泛型，并通过 State 入参约束了泛型的 state 属性和 reducers 属性下 action 索引属性的类型关系。
  interface ReduxModel<State> {
    state: State,
    reducers: {
      [action: string]: (state: State, action: any) => State
    }
  }

  // 根据实际需要，我们传入了一个具体的 State 类型具象化 ReduxModel，并约束了一个实际的 model
  type ModelInterface = { id: number; name: string };

  const model: ReduxModel<ModelInterface> = {
    state: { id: 1, name: '乾元' }, //  ok 类型必须是 ModelInterface
    reducers: {
      setId: (state, action: { payload: number }) => ({
        ...state,
        id: action.payload // ok must be number
      }),
      setName: (state, action: { payload: string }) => ({
        ...state,
        name: action.payload // ok must be string
      })
    }
  }

  // 枚举类型不支持泛型。
}
/** 泛型类型 end */

/** 泛型约束 start */

/** 泛型约束 end */

/** 泛型类型参数 start */
/** 泛型类型参数 end */

/** 泛型类型参数 start */
/** 泛型类型参数 end */
