{
  // 相对于其他类型，enum 也是一种比较特殊的类型，因为它兼具值和类型于一体
  enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  }

  // typescript 转义

  // var Day = void 0;

  // (function (Day) {
  //     Day[Day["SUNDAY"] = 0] = "SUNDAY";

  //     Day[Day["MONDAY"] = 1] = "MONDAY";

  //     Day[Day["TUESDAY"] = 2] = "TUESDAY";

  //     Day[Day["WEDNESDAY"] = 3] = "WEDNESDAY";

  //     Day[Day["THURSDAY"] = 4] = "THURSDAY";

  //     Day[Day["FRIDAY"] = 5] = "FRIDAY";

  //     Day[Day["SATURDAY"] = 6] = "SATURDAY";
  // })(Day || (Day = {}));

  function work (d: Day) {
    switch (d) {
      case Day.SUNDAY:
      case Day.SATURDAY:
        return 'take a rest';
      case Day.MONDAY:
      case Day.TUESDAY:
      case Day.WEDNESDAY:
      case Day.THURSDAY:
      case Day.FRIDAY:
        return 'work hard';
    }
  }

  console.log(work(Day.SUNDAY));
}

// 常见的枚举类型：数字类型、字符串类型、异构类型、常量成员和计算（值）成员、枚举成员类型和联合枚举、常量枚举、外部枚举。

/** 数字枚举 start */
{
  enum Day {
    SUNDAY = 1,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
  }
}
/** 数字枚举 end */


/** 字符串枚举 start */
{
  enum Day {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
  }
}
/** 字符串枚举 end */


/** 异构枚举（Heterogeneous enums） start */
{
  // TypeScript 支持枚举类型同时拥有数字和字符类型的成员，这样的枚举被称之为异构枚举。异构枚举也被认为是很“鸡肋”的类型。
  // 意义不大，没有应用场景

  enum Day {
    SUNDAY = 'SUNDAY',
    MONDAY = 2,
  }
}
/** 异构枚举（Heterogeneous enums） end */


/** 枚举成员类型和联合枚举 start */
{
  // 枚举成员和枚举类型之间的关系分两种情况：
  // 1. 如果枚举的成员同时包含字面量和非字面量枚举值，枚举成员的类型就是枚举本身（枚举类型本身也是本身的子类型）
  // 2. 如果枚举成员全部是字面量枚举值，则所有枚举成员既是值又是类型

  enum Day {
    SUNDAY,
    MONDAY,
  }
  enum MyDay {
    SUNDAY,
    MONDAY = Day.MONDAY
  }

  const mondayIsDay: Day.MONDAY = Day.MONDAY; // ok: 字面量枚举成员既是值，也是类型
  const mondayIsSunday = MyDay.SUNDAY; // ok: 类型是 MyDay，MyDay.SUNDAY 仅仅是值
  // const mondayIsMyDay2: MyDay.MONDAY = MyDay.MONDAY; // ts(2535)，MyDay 包含非字面量值成员，所以 MyDay.MONDAY 不能作为类型

  enum Day2 {
    MONDAY
  }

  const mondayIsDay1: Day2 = Day2.MONDAY; // ok
  const mondayIsDay2: Day2.MONDAY = mondayIsDay1 as Day2; // ok


  // 类型缩小
  enum Day3 {
    SUNDAY,
    MONDAY,
  }

  let SUNDAY = Day3.SUNDAY; // 类型是 Day

  const SUNDAY2 = Day3.SUNDAY; // 类型 Day.SUNDAY

  const work = (x: Day3) => {
    if (x === Day3.SUNDAY) {
      x; // 类型缩小为 Day.SUNDAY
    }
  }
}
/** 枚举成员类型和联合枚举 end */


/** 常量枚举（const enums） start */
{
  // 枚举的作用在于定义被命名的常量集合，而 TypeScript 提供了一些途径让枚举更加易用，比如常量枚举
  // 我们可以通过添加 const 修饰符定义常量枚举，常量枚举定义转译为 JavaScript 之后会被移除，
  // 并在使用常量枚举成员的地方被替换为相应的内联值，因此常量枚举的成员都必须是常量成员（字面量 + 转译阶段可计算值的表达式）

  const enum Day {
    SUNDAY,
    MONDAY
  }

  const work = (d: Day) => {
    switch (d) {
      case Day.SUNDAY:
        return 'take a rest';
      case Day.MONDAY:
        return 'work hard';
    }
  }
}
/** 常量枚举（const enums） end */


/** 外部枚举（Ambient enums） start */
{
  // 在 TypeScript 中，我们可以通过 declare 描述一个在其他地方已经定义过的变量

  // declare enum Day {
  //   SUNDAY,
  //   MONDAY,
  // }
  
  // const work = (x: Day) => {
  //   if (x === Day.SUNDAY) {
  //     x; // 类型是 Day
  //   }
  // }

  // 外部枚举和常规枚举的差异在于以下几点：
  // 1. 在外部枚举中，如果没有指定初始值的成员都被当作计算（值）成员，这跟常规枚举恰好相反；
  // 2. 即便外部枚举只包含字面量成员，这些成员的类型也不会是字面量成员类型，自然完全不具备字面量类型的各种特性。
}
/** 外部枚举（Ambient enums） end */

// 使用常量枚举管理相关的常量，能提高代码的可读性和易维护性；
// 不要使用其他任何类型替换所使用的枚举成员；
