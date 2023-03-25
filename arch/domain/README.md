# 三、基本工具链和功能

## 实现 call 和 aplly

```typescript
function add(x: number, y: number) {
  return this.z + x + y
}

add._call({ z: 100 }, 1, 2) // 103
add._apply({ z: 100 }, [1, 2]) // 103
```

```tsx
function foo() {
  console.log('foo')
}

Function.prototype._call = function (thisArgs: any, args: Array<any>) {
  const symbol = Symbol('call') // 不会覆盖原有属性
  thisArgs[symbol] = foo
  const ans = thisArgs[symbol](...args)
  delete thisArgs[symbol]
  return ans
}

foo._call({ x: 1 })
```

## 表单设计

表单的作用是收集用户的输入，在前端领域非常常见。特别是用 DSL 的方式设计表单，这是一个通用的技巧。

### 什么是 DSL

DSL（领域专有语言）。DSL 的表单设计，就是用专门设计表单的语言，来设计表单。

什么是专门设计表单的语言？

### 表单的通用设计

作为标准的表单设计，可以考虑下面的模型。
