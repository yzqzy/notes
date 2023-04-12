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
