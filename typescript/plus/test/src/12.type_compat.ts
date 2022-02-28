/** 特例 start */
// any 类型可以赋值给除了 never 之外的任意其他类型，反过来其他类型也可以赋值给 any。
// 也就是说 any 可以兼容除 never 之外所有的类型，同时也可以被所有的类型兼容（即 any 既是 bottom type，也是 top type）。
// Any is 魔鬼，我们一定要慎用、少用。

// never 的特性是可以赋值给任何其他类型，但反过来不能被其他任何类型（包括 any 在内）赋值（即 never 是 bottom type）。

// unknown 的特性和 never 的特性几乎反过来，即我们不能把 unknown 赋值给除了 any 之外任何其他类型，反过来其他类型都可以赋值给 unknown（即 unknown 是 top type）。

// void、null、undefined 这三大废材类型的兼容性也很特别，比如 void 类型仅可以赋值给 any 和 unknown 类型，
// 反过来仅 any、never、undefined 可以赋值给 void。

// enum 枚举类型，其中数字枚举和数字类型相互兼容
/** 特例 end */


/** 类型兼容性-子类型 start */
{
  // 从子类型的角度来看，所有的子类型与它的父类型都兼容

  const one = 1;
  let num: number = one; // ok

  interface IPar {
    name: string;
  }
  interface IChild extends IPar {
    id: number;
  }

  let Par: IPar;
  let Child: IChild = { name: '', id: 123 };

  Par = Child; // ok

  class CPar {
    cname = '';
  }
  class CChild extends CPar {
    cid = 1;
  }
  let ParInst: CPar;
  let ChildInst: CChild = { cname: '', cid: 0 };

  ParInst = ChildInst; // ok
  let mixedNum: 1 | 2 | 3 = one; // ok


  // 由子类型组成的联合类型也可以兼容它们父类型组成的联合类型
  let ICPar: IPar | CPar;
  let ICChild: IChild | CChild = { cid: 0, id: 0, name: '0' };

  ICPar = ICChild; // ok
}
/** 类型兼容性-子类型 end */


/** 类型兼容性-结构类型 start */
{
  // 类型兼容性的另一准则是结构类型，即如果两个类型的结构一致，则它们是互相兼容的。
  // 比如拥有相同类型的属性、方法的接口类型或类，则可以互相赋值。
  class C1 {
    name = '1';
  }

  class C2 {
    name = '2';
  }

  interface I1 {
    name: string;
  }

  interface I2 {
    name: string;
  }

  let InstC1: C1 = { name: '1' };
  let InstC2: C2 = { name: '1' };

  let O1: I1 = { name: '1' };
  let O2: I2 = { name: '1' };

  InstC1 = InstC2; // ok
  O1 = O2; // ok

  InstC1 = O1; // ok
  O2 = InstC2; // ok



  // 两个接口类型或者类，如果其中一个类型不仅拥有另外一个类型全部的属性和方法
  // 还包含其他的属性和方法（如同继承自另外一个类型的子类一样），那么前者是可以兼容后者的。
  {
    interface I1 {
      name: string;
    }
    interface I2 {
      id: number;
      name: string;
    }

    class C2 {
      id = 1;
      name = '1';
    }

    let O1: I1 = { name: '0' };
    let O2: I2 = { id: 0, name: '0' };
    let InstC2: C2 = { id: 1, name: '1' };

    O1 = O2;
    O1 = InstC2;

    // 一个对象字面量没有被变量接收时，它将处于一种 freshness 新鲜的状态。
    // 这时 TypeScript 会对对象字面量的赋值操作进行严格的类型检测，只有目标变量的类型与对象字面量的类型完全一致时，对象字面量才可以赋值给目标变量，否则会提示类型错误
    // O1 = {
    //   id: 2, // ts(2322)
    //   name: 'name'
    // };

    // 我们也可以通过使用变量接收对象字面量或使用类型断言解除 freshness
    let O3 = {
      id: 2,
      name: 'name'
    };
    O1 = O3; // ok
    O1 = {
      id: 2,
      name: 'name'
    } as I2; // ok
  }

  {
    // 在判断两个类是否兼容时，我们可以完全忽略其构造函数及静态属性和方法是否兼容，只需要比较类实例的属性和方法是否兼容即可。
    // 如果两个类包含私有、受保护的属性和方法，则仅当这些属性和方法源自同一个类，它们才兼容。

    {
      class C1 {
        name = '1';
        private id = 1;
        protected age = 30;
      }
      class C2 {
        name = '2';
        private id = 1;
        protected age = 30;
      }

      let InstC1: C1;
      let InstC2: C2;

      // InstC1 = InstC2; // ts(2322)
      // InstC2 = InstC1; // ts(2322)
    }
    {
      class CPar {
        private id = 1;
        protected age = 30;
      }
      class C1 extends CPar {
        constructor(inital: string) {
          super();
        }
        name = '1';
        static gender = 'man';
      }
      class C2 extends CPar {
        constructor(inital: number) {
          super();
        }
        name = '2';
        static gender = 'woman';
      }

      let InstC1: C1 = new C1('0');
      let InstC2: C2 = new C2(0);
      InstC1 = InstC2; // ok
      InstC2 = InstC1; // ok
    }
  }
}
/** 类型兼容性-结构类型 end */


/** 类型兼容性-可继承和可实现 start */
{
  // 类型兼容性还决定了接口类型和类是否可以通过 extends 继承另外一个接口类型或者类，以及类是否可以通过 implements 实现接口。
  {
    interface I1 {
      name: number;
    }

    // interface I2 extends I1 { // ts(2430)
    //   name: string;
    // }

    class C1 {
      name = '1';
      private id = 1;
    }

    // class C2 extends C1 { // ts(2415)
    //   name = '2';
    //   private id = 1;
    // }

    // class C3 implements I1 {
    //   name = ''; // ts(2416)
    // }
  }
}
/** 类型兼容性-可继承和可实现 end */


/** 泛型 start */
{
  // 泛型类型、泛型类的兼容性实际指的是将它们实例化为一个确切的类型后的兼容性。
  {
    interface I1<T> {
      id: number;
    }

    // 因为接口泛型 I1 的入参 T 是无用的，且实例化类型 I1<string> 和 I1<numer> 的结构一致，即类型兼容，所以对应的变量 O2 可以给变量 O1赋值。
    let O1: I1<string>;
    let O2: I1<number> = { id: 0 };
    O1 = O2; // ol

    // 对于未明确指定类型入参泛型的兼容性，例如函数泛型（实际上仅有函数泛型才可以在不需要实例化泛型的情况下赋值）
    // TypeScript 会把 any 类型作为所有未明确指定的入参类型实例化泛型，然后再检测其兼容性
    {
      let fun1 = <T>(p1: T): 1 => 1;
      let fun2 = <T>(p2: T): number => 2;

      fun2 = fun1; // ok？
    }
  }
}
/** 泛型 end */


/** 变型 start */
{
  // TypeScript 中的变型指的是根据类型之间的子类型关系推断基于它们构造的更复杂类型之间的子类型关系。
}
/** 变型 end */


/** 泛型 start */

/** 泛型 end */
