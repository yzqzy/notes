import { Map as ImmutableMap } from 'immutable'
import { Store, Meta } from './dsl.types'

class FormDSL {
  private store: Store = ImmutableMap()
  private meta: Meta

  constructor(meta: Meta) {
    this.meta = meta
  }

  initStore() {}
}
