// JavaScript 作为一种动态语言，意味着其中的参数、值可以是多态（多种类型）。
// 因此，我们需要区别对待每一种状态，以此确保对参数、值的操作合法。

/** 类型守卫 start */
{
  // typeof、Array.isArray 条件判断就是类型守卫
  // 类型守卫的作用在于触发类型缩小。
  const convertToUpperCase = (strOrArray: string | string[]) => {
    if (typeof strOrArray === 'string') {
      return strOrArray.toUpperCase();
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map(item => item.toUpperCase());
    }
  }
}
/** 类型守卫 end */


/** 区分联合类型 start */
{
  // 类型守卫还可以用来区分类型集合中的不同成员
  // 类型集合一般包括联合类型和枚举类型
  // 常用的类型守卫包括switch、字面量恒等、typeof、instanceof、in 和自定义类型守卫这几种

  // switch
  {
    const convert = (c: 'a' | 1) => {
      switch (c) {
        case 1:
          return c.toFixed(); // c is 1
        case 'a':
          return c.toLowerCase(); // c is 'a'
      }
    }
    const feat = (c: { animal: 'panda'; name: 'China' } | { feat: 'video'; name: 'Japan' }) => {
      switch (c.name) {
        case 'China':
          return c.animal; // c is "{ animal: 'panda'; name: 'China' }"
        case 'Japan':
          return c.feat; // c is "{ feat: 'video'; name: 'Japan' }"
      }
    };
  }

  // 字面量恒等
  {
    // switch 适用的场景往往也可以直接使用字面量恒等比较进行替换

    const convert = (c: 'a' | 1) => {
      if (c === 1) {
        return c.toFixed(); // c is 1
      } else if (c === 'a') {
        return c.toLowerCase(); // c is 'a'
      }
    }
  }

  // typeof
  {
    // 联合类型的成员不可枚举，比如说是字符串、数字等原子类型组成的集合，这个时候就需要使用 typeof
    const convert = (c: 'a' | 1) => {
      if (typeof c === 'number') {
        return c.toFixed(); // c is 1
      } else if (typeof c === 'string') {
          return c.toLowerCase(); // c is 'a'
      }
    }
  }

  // instanceof
  {
    class Dog {
      wang = 'wangwang';
    }

    class Cat {
      miao = 'miaomiao';
    }

    const getName = (animal: Dog | Cat) => {
      if (animal instanceof Dog) {
        return animal.wang;
      } else if (animal instanceof Cat) {
        return animal.miao;
      }
    }
  }

  // in
  {
    interface Dog {
      wang: string;
    }

    interface Cat {
      miao: string;
    }

    const getName = (animal: Dog | Cat) => {
      // if (typeof animal.wang == 'string') { // ts(2339)
      //   return animal.wang; // ts(2339)
      // } else if (animal.miao) { // ts(2339)
      //   return animal.miao; // ts(2339)
      // }

      if ('wang' in animal) { // ok
        return animal.wang; // ok
      } else if ('miao' in animal) { // ok
        return animal.miao; // ok
      }
    }
  }

  // 自定义类型守卫
  {
    interface Dog {
      wang: string;
    }

    interface Cat {
      miao: string;
    }

    const isDog = function (animal: Dog | Cat): animal is Dog {
      return 'wang' in animal;
    }

    const getName = (animal: Dog | Cat) => {
      if (isDog(animal)) {
        return animal.wang;
      }
    }
  }
}
/** 区分联合类型 end */

/** 区别枚举类型 start */
{
  // 枚举类型是命名常量的集合，所以我们也需要使用类型守卫区分枚举类型的成员

  // 枚举和其他任何枚举、类型都不可比较，除了数字枚举可以与数字类型比较之外
  // 数字枚举极其不稳定

  enum A {
    one,
    two
  }

  enum B {
    one,
    two
  }

  const cpWithNumber = (param: A) => {
    if (param === 1) { // bad
      return param;
    }
  }

  const cpWithOtherEnum = (param: A) => {
    if (param === B.two as unknown as A) { // ALERT bad
      return param;
    }
  }

  const cpWithSelf = (param: A) => {
    if (param === A.two) { // good
      return param;
    }
  }
}
/** 区别枚举类型 end */


/** 失效的类型守卫 start */
// ts 4.3.5 不会出现失效类型守卫的问题
// 失效的类型守卫指的是某些类型守卫应用在泛型函数中时不能缩小类型，即失效了
{
  interface Dog {
    wang: string;
  }

  interface Cat {
    miao: string;
  }

  const isDog = function (animal: Dog | Cat): animal is Dog {
    return 'wang' in animal;
  }

  {
    const getName = <T extends Dog | Cat>(animal: T) => {
      if ('wang' in animal) {
        return animal.wang; // ts(2339)
      }
      return animal.miao; // ts(2339)
    };
  }

  {
    const getName = <T extends Dog | Cat>(animal: T) => {
      if (isDog(animal)) { // instanceOf 亦可
        return animal.wang; // ok
      }
      return animal.miao; // ts(2339)
    };
  }

  {
    const getName = <T extends Dog | Cat>(animal: T) => {
      if (isDog(animal)) { // instanceOf 亦可
        return animal.wang; // ok
      }
      return (animal as Cat).miao; // ts(2339)
    };
  }
}
/** 失效的类型守卫 start */


