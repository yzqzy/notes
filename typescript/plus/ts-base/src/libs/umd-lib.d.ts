declare namespace umdLib {
  const version: string
  function doSomething(): void
}

export as namespace umdLib // 专门为 umd 类库设置的语句
export = umdLib