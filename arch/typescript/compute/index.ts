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
}
