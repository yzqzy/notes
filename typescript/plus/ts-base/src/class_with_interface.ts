console.log('-- class_with_interface start --')

{ 
  interface Human {
    // 接口不能约束类的构造函数
    // new (name: string): void
    name: string
    eat(): void
  }

  // 类实现接口必须实现接口中所有的属性和方法
  // 接口只能约束类的公有成员
  class Asian implements Human {
    constructor(public name: string) {
      this.name = name
    }

    eat() {}

    sleep() {}
  }

  // 接口继承接口
  // 接口可以像类一样，相互继承，并且一个接口可以继承多个接口
  interface Man extends Human {
    run(): void
  }
  interface Child {
    cry(): void
  }
  interface Boy extends Man,Child {}
  // 接口的继承可以抽离出可重用的接口，也可以将多个接口合并成一个接口
  const boy: Boy = {
    name: '',
    run() {},
    eat() {},
    cry() {}
  }


  // 接口继承类
  class Auto {
    state = 1
    // private state2 = 0 // Class 'C' incorrectly implements interface 'AutoInterface'.
  }
  interface AutoInterface extends Auto {}

  class C implements AutoInterface {
    state: number = 1
  }
  // 接口在抽离类成员时，不仅抽离了公共成员，而且抽离私有成员和受保护成员
  class Bus extends Auto implements AutoInterface {
    
  }  
}

console.log('-- class_with_interface end --')
