{
  type Point = { x: number; y: number }
  type P = keyof Point // "x" | "y"

  type Arrayish = { [n: number]: unknown }
  type A = keyof Arrayish // number

  type Mapish = { [k: string]: boolean }
  type M = keyof Mapish // string | number
}

{
  console.log(typeof 'xxx') // string

  let s = 'hello'
  let n: typeof s // string
}

{
  interface Todo {
    title: string
    description: string
  }

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return {
      ...todo,
      ...fieldsToUpdate
    }
  }

  const todo1 = {
    title: 'organize desk',
    description: 'clear clutter'
  }
  const todo2 = updateTodo(todo1, {
    description: 'throw out trash'
  })

  // ------------

  type Partial<T> = {
    [P in keyof T]?: T[P]
  }
}

{
  interface Props {
    a?: number
    b?: number
  }

  const obj: Props = { a: 5 }
  // const obj2: Required<Props> = { a: 5 }
  // 类型 "{ a: number; }" 中缺少属性 "b"，但类型 "Required<Props>" 中需要该属性。

  type Required<T> = {
    [P in keyof T]-?: T[P]
  }
}

{
  interface Todo {
    title: string
  }

  const todo: Readonly<Todo> = {
    title: 'Delete inactive users'
  }

  // todo.title = 'Hello'
  // 无法为“title”赋值，因为它是只读属性。

  type Readonly<T> = {
    readonly [P in keyof T]: T[P]
  }
}

{
  interface CatInfo {
    age: number
    breed: string
  }

  type CateName = 'miffy' | 'boris' | 'mordred'

  const cats: Record<CateName, CatInfo> = {
    miffy: { age: 10, breed: 'persian' },
    boris: { age: 5, breed: 'Maine Coon' },
    mordred: { age: 10, breed: 'Britsh Shorthair' }
  }

  type Record<K extends keyof any, T> = {
    [P in K]: T
  }
}

{
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = Pick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false
  }

  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }
}

{
  type T0 = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
  type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // 'c'
  type T2 = Exclude<string | number | (() => void), Function> // string | number

  type Exclude<T, U> = T extends U ? never : T
}

{
  interface Todo {
    title: string
    description: string
    completed: boolean
    createdAt: number
  }

  type TodoPreview = Omit<Todo, 'description'>
  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
    createdAt: 1681344482208
  }

  type TodoInfo = Omit<Todo, 'completed' | 'createdAt'>
  const todoInfo: TodoInfo = {
    title: 'Pick up kids',
    description: 'Kindergarten closes at 5pm'
  }

  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
}

{
  type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // 'a'
  type T1 = Extract<string | number | (() => void), Function> // () => void

  type Extract<T, U> = T extends U ? T : never
}

{
  type T0 = NonNullable<string | number | undefined> // string | number
  type T1 = NonNullable<string[] | null | undefined> // string[]

  type NonNullable<T> = T extends null | undefined ? never : T
}

{
  // declare function f1(args: { a: number; b: string }): void
  // type T0 = Parameters<() => string> // []
  // type T1 = Parameters<(s: string) => void> // [s: string]
  // type T2 = Parameters<<T>(args: T) => T> // [args: unknown]
  // type T3 = Parameters<typeof f1> // [args: { a:number; b: string }]
  // type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
}

{
  type T0 = ConstructorParameters<ErrorConstructor> // [message?: string | undefiend]
  type T1 = ConstructorParameters<FunctionConstructor> // string[]
  type T2 = ConstructorParameters<RegExpConstructor> // [pattern: string | RegExp, flags?: string | undefined]
  type T3 = ConstructorParameters<any> // unkown[]

  // type T4 = ConstructorParameters<Function>
  // 类型“Function”不满足约束“abstract new (...args: any) => any”。
  // 类型“Function”提供的内容与签名“new (...args: any): any”不匹配。

  type ConstructorParameters<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: infer P) => any ? P : never
}

{
  // declare function f1(): { a: number; b: string }
  // type T0 = ReturnType<() => string> // string
  // type T1 = ReturnType<(s: string) => void> // void
  // type T2 = ReturnType<<T>() => T> // unkown
  // type T3 = ReturnType<<T extends U, U extends number[]>() => T> // number[]
  // type T4 = ReturnType<typeof f1> // { a: number; b: string }
  // type T5 = ReturnType<any> // any
  // type T6 = ReturnType<never> // never
  // type T7 = ReturnType<string> // 类型“string”不满足约束“(...args: any) => any”。
  // type T8 = ReturnType<Function> // 类型“Function”不满足约束“(...args: any) => any”。
  // type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
}

{
  // class C {
  //   x = 0
  //   y = 0
  // }
  // type T0 = InstanceType<typeof C> // C
  // type T1 = InstanceType<any> // any
  // type T2 = InstanceType<never> // never
  // type T3 = InstanceType<string> // 类型“string”不满足约束“abstract new (...args: any) => any”。
  // type T4 = InstanceType<Function> // 类型“Function”不满足约束“abstract new (...args: any) => any”。
  // type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
  //   ...args: any
  // ) => infer R
  //   ? R
  //   : any
}

{
  // function toHex(this: Number) {
  //   return this.toString(16)
  // }
  // function numberToString(n: ThisParameterType<typeof toHex>) {
  //   return toHex.apply(n)
  // }
  // type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
}

{
  function toHex(this: Number) {
    return this.toString(16)
  }

  const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5)
  console.log(fiveToHex())

  type OmitThisParameter<T> = unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T
}

{
  interface ThisType<T> {}

  type ObjectDescriptor<D, M> = {
    data?: D
    methods: M & ThisType<D & M>
  }

  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {}
    let methods: object = desc.methods || {}
    return {
      ...data,
      ...methods
    } as D & M
  }

  let obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
      moveBy(dx: number, dy: number) {
        this.x += dx
        this.y += dy
      }
    }
  })

  obj.x = 10
  obj.y = 20
  obj.moveBy(5, 5)
}
