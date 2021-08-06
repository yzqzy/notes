class Person {
  public name: string;
  private age: number;
  protected readonly gender: boolean; // 只读，不可修改

  constructor (name: string, age: number) {
    this.name = name;
    this.age = age;
    this.gender = true;
  }

  say (msg: string) {
    console.log(`I am ${this.name}, ${msg}`);
  }
}

const tom = new Person('tom', 23);