declare const jQuery: (param: string) => void;

declare let foo: number;
declare const foo2: number = 2;

declare function greet (greeting: string): void;

// 命名空间
declare namespace mylib {
  function makeGreet (greeting: number): void;
  let numberOfGreeting: number;

  namespace fn {
    function test(s: string): void;
    let test1: string;
  }
}

// 函数重载
declare function getWidget(n: number): number;
declare function getWidget(s: string): string[];

// 可重用的类型接口
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}
declare function greetFn(setting: GreetingSettings): void;

// 类型
type GreetingLike = string | (() => string) | GreetingSettings;
declare function greetLike (g: GreetingLike): void;

// 类
declare class Greeter {
  constructor(geeeting: string) { }

  grerting: string;
  showGreeting(): void;
}

