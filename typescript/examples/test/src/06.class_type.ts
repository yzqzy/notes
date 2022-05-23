{
  class Animal {
    type = "Animal";

    say(name: string) {
      console.log(`I'm ${name}!`);
    }
  }

  class Dog extends Animal {
    bark() {
      console.log("Woof! Woof!");
    }
  }

  const dog = new Dog();

  dog.bark(); // => 'Woof! Woof!'
  dog.say("Q"); // => I'm Q!
  console.log(dog.type); // => Animal
}

/** 抽象类 start */
{
  abstract class Adder {
    abstract x: number;
    abstract y: number;
    abstract add(): number;

    displayName = "Adder";

    addTwice(): number {
      return (this.x + this.y) * 2;
    }
  }

  class NumAdder extends Adder {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      super();
      this.x = x;
      this.y = y;
    }

    add(): number {
      return this.x + this.y;
    }
  }

  const numAdder = new NumAdder(1, 2);

  console.log(numAdder.displayName); // => "Adder"
  console.log(numAdder.add()); // => 3
  console.log(numAdder.addTwice()); // => 6
}
/** 抽象类 end */

/** 接口抽象类 start */
// 接口与使用抽象类相比，区别在于接口只能定义类成员的类型

interface IAdder {
  x: number;
  y: number;
  add: () => number;
}

class NumAdder implements IAdder {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add() {
    return this.x + this.y;
  }

  addTwice() {
    return (this.x + this.y) * 2;
  }
}
/** 接口抽象类 end */
