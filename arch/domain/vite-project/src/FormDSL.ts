import { Map as ImmutableMap } from 'immutable'
import { Store, Meta, FormItemMeta } from './dsl.types'

class FormItem {
  private meta: FormItemMeta
  private value: any
  private children: Array<FormItem>

  constructor(meta: FormItemMeta, store: Store) {
    this.meta = meta
    this.value = meta.default || store.getIn(meta.path)
    this.children = []

    this.meta.items?.forEach(item => {
      this.children.push(new FormItem(item, store))
    })
  }

  public getValue() {
    return this.value
  }
}

class FormDSL {
  private store: Store = ImmutableMap()
  private meta: Meta

  constructor(meta: Meta) {
    this.meta = meta

    for (let item of meta.form.items) {
      this
    }
  }

  initStore() {}
}
