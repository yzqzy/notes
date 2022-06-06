declare function moduleLib(options: Options): void

interface Options {
  [key: string]: any
}

declare namespace moduleLib {
  // export const version: string // export 关键字加或不加都可以
  const version: string
  function doSomething(): void
}

export = moduleLib // 兼容性比较好
