interface Person {
  name: string;
  age: number,
  sex: 'male' | 'wolf'
}

type Person2 = Required<Person>
const person: Person2 = {
  name: '123',
  age: 23,
  sex: 'male'
}

type Person3 = Pick<Person, 'name' | 'sex'>

type Person4 = Record<'sex' | 'male', string>
type Person5 = Record<'heora' | 'yuleuo', Person>

type Person6 = Exclude<Person3, Person> // 使用对象无意义
type Person7 = Exclude<keyof Person, keyof Person3> // type Person7 = "age"
type Test1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // type Test1 = "c"

type Test2 = Extract<'a' | 'b' | 'c', 'a' | 'b'> // type Test2 = "a" | "b"

type Person8 = Omit<Person, 'name' | 'age'>
// type Person8 = {
//     sex: 'male' | 'wolf';
// }

type Test3 = NonNullable<string | number | null | undefined> // type Test3 = string | number

function parametersFunc(a: string, b: number, c: boolean) {
  return a || b || c;
}
type Test4 = Parameters<typeof parametersFunc> // type Test4 = [a: string, b: number, c: boolean]

class Dog {
  constructor(public name: string, public age: number) {
    this.name = name
    this.age = age
  }
}
type Test5 = ConstructorParameters<typeof Dog> // type Test5 = [name: string, age: number]

type Test6 = ReturnType<typeof parametersFunc> // type Test6 = string | number | boolean

type Test7 = InstanceType<typeof Dog> // type Test7 = Dog
type Test8 = InstanceType<typeof Boolean> // type Test8 = Boolean


type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting> // type ShoutyGreeting = "HELLO, WORLD"
type QuietGreeting = Lowercase<Greeting> // type QuietGreeting = "hello, world"

type LowercaseGreeting = "hello, world";
type Greeting1 = Capitalize<LowercaseGreeting>; // type Greeting1 = "Hello, world"

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>; // type UncomfortableGreeting = "hELLO WORLD"

