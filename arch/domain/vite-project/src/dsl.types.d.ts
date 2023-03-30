import { Map as ImmutableMap } from 'immutable'

export type Store = ImmutableMap<string, Store>

export type FormItemMeta = {
  type: string
  path: Array<string | number>
  default: any
  items?: Array<FormItemMeta>
}

export type Meta = {
  form: {
    items: Array<FormItemMeta>
  }
}
