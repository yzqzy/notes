;(() => {
  // @ts-ignore
  function foo() {
    console.log('foo')
  }

  // @ts-ignore
  Function.prototype._call = function (thisArgs: any, args: Array<any>) {
    const symbol = Symbol('xxx')
    thisArgs[symbol] = foo
    thisArgs[symbol](...args)
  }

  // @ts-ignore
  foo._call({ x: 1 })
})()
