import { Map as ImmutableMap } from 'immutable'
import { Store, Meta, FormItemMeta } from './dsl.types'

export class FormItem {
  private meta: FormItemMeta
  private form: FormComponent
  private children: Array<FormItem>

  constructor(meta: FormItemMeta, form: FormComponent) {
    this.meta = meta
    this.form = form
    this.children = []

    this.meta.items?.forEach(item => {
      this.children.push(new FormItem(item, form))
    })
  }

  public getValue() {
    const val = this.form.getValue(this.meta.path!)

    if (typeof val === 'undefined') {
      return this.meta.default
    }

    return val
  }

  public setValue(value: any) {
    this.form.setValue(this.meta.path!, value)
  }

  public getType() {
    return this.meta.type
  }

  public getCond() {
    return () => {
      return this.meta.cond!(this.form.getContext())
    }
  }

  public getChildren() {
    return this.children
  }

  public updateStoreByDefault() {
    if (typeof this.meta.default !== 'undefined') {
      this.setValue(this.meta.default)
    }

    for (let child of this.getChildren()) {
      child.updateStoreByDefault()
    }
  }
}

export class FormComponent {
  private meta: Meta
  private form: FormItem
  private store: Store
  private context?: any

  constructor(meta: Meta, context?: any) {
    this.meta = meta
    this.form = new FormItem(meta.form, this)
    this.store = this.initStore()
    this.context = context
    this.updateDefaultValues()
  }

  public getValue(path: Array<string | number>) {
    return this.store.getIn(path)
  }

  public setValue(path: Array<string | number>, value: any) {
    this.store = this.store.setIn(path, value)
  }

  public getRoot() {
    return this.form
  }

  public getContext() {
    return this.context
  }

  public getData() {
    return this.store.toJS()
  }

  public setData(data: any) {
    // this.store = fromJS(data) as
  }

  private initStore() {
    const store = ImmutableMap<string, Store>()
    return store
  }

  private updateDefaultValues() {
    this.form.updateStoreByDefault()
  }
}
