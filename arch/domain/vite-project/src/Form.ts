import { Map as ImmutableMap } from 'immutable'
import { Store, Meta, FormItemMeta } from './dsl.types'

export class FormItem {
  private meta: FormItemMeta
  private form: Form
  private children: Array<FormItem>

  constructor(meta: FormItemMeta, form: Form) {
    this.meta = meta
    this.form = form
    this.children = []

    this.meta.items?.forEach(item => {
      this.children.push(new FormItem(item, form))
    })
  }

  public getValue() {
    const val = this.form.getValue(this.meta.path)

    if (typeof val === 'undefined') {
      return this.meta.default
    }

    return val
  }

  public setValue(value: any) {
    this.form.setValue(this.meta.path, value)
  }

  public getType() {
    return this.meta.type
  }
}

export class Form {
  private store: Store = ImmutableMap()
  private meta: Meta
  private form: FormItem

  constructor(meta: Meta) {
    this.meta = meta
    this.form = new FormItem(meta.form, this)
  }

  public getValue(path: Array<string | number>) {
    return this.store.getIn(path)
  }

  public setValue(path: Array<string | number>, value: any) {
    this.store = this.store.setIn(path, value)
  }

  initStore() {}
}
