import { Map as ImmutableMap } from 'immutable'

export type Store = ImmutableMap<string, Store>

export type FormItem = {
  type: string
  path: Array<string | number>
}

export type Meta = {
  form: {
    items: Array<FormItem>
  }
}
