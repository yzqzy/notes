console.log('-- class start --')

{
  // 类的成员修饰符
  // public 公有成员，类的所有属性默认都是 public，也可以显示声明
  // private 私有成员，私有成员只能在类本身调用，不能被类的实例调用，也不能被子类调用
  // - 如果用 private 修饰 constructor，意味着这个类既不能被实例化也不能被继承
  // protected 受保护成员，只能在类或者子类中访问，不能在类的实例中访问
  // - 如果用 protected 修饰 constructor，意味着这个类不能被实例化，只能被继承， 可以用来声明基类
  // readonly 只读属性，只读属性不可以被更改，同样，只读属性必须初始化
  class Dog {
    public name: string
    readonly legs: number = 4
    // 类的静态成员只能通过类名调用
    static food: string = 'bones'
    
    constructor (name: string) {
      this.name = name
    }
    
    run () {}

    private print () {}
    protected pro () {}
  }
  // 无论 ES6 还是 TS 中，类成员的属性都是实例属性，不是原型属性，类成员的方法都是原型方法
  // 与 ES6 不同的是，实例必须存在初始值或在构造函数中被初始化
  const dog = new Dog('dog')
  console.log(dog)

  // 类的继承
  class Husky extends Dog {
    color: string

    // 除了类的成员可以添加修饰符之外，构造函数的参数也可以添加修饰符
    // 它可以将参数自动变为实例属性，我们可以省略在类中的定义，看起来会更加简洁
    constructor (name: string, color: string, public sex: string) {
      super(name)
      this.color = color
      this.sex = sex
    }
  }
}


{
  // 抽象类
  // 抽象类可以抽离出一些事物的共性，有利于代码复用和扩展
  // 抽象类可以实现多态
  // 多态指在父类中定义抽象方法，可以在多个子类中对抽象方法有不同的实现，可以在程序运行时根据不同的实现执行不同的操作，这样就实现了运行时的绑定
  abstract class Animal {
    eat () {
      console.log('eat')
    }

    // 抽象方法，不实现方法
    // 使用抽象方法，可以明确知道子类可以有其他的实现，不需要在父类中实现
    abstract sleep (): void
  } 

  // 抽象类不能被实例化
  // const animal = new Animal() // Cannot create an instance of an abstract class.

  class Dog extends Animal {
    constructor (public name: string) {
      super()
      this.name = name
    }

    run () {}

    sleep () {
      console.log('sleep')
    }
  }
  const dog = new Dog('wangwang')
  dog.eat()

  class Cat extends Animal {
    sleep () {
      console.log('cat sleep')
    }
  }
  const cat = new Cat()
  cat.sleep()

  // 多态运行示例
  const animals: Animal[] = [dog, cat]
  animals.forEach(cur => {
    cur.sleep()
  })


  // 类的成员方法可以直接返回一个 this，可以很方便的实现链式调用
  class WorkFlow {
    step1 () {
      return this
    }
    setp2 () {
      return this
    }
  }
  new WorkFlow().step1().setp2()

  // 继承时 this 类型也可以表现出多态，这里的多态指 this 既可以是父类型，也可以是子类型
  class MyFlow extends WorkFlow {
    next () {
      return this
    }
  }
  new MyFlow().next().step1().next()
}

console.log('-- class end --')
