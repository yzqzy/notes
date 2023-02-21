let obj: any = { x: 0 }
// any 屏蔽了所有类型检查，相当于你对程序的理解是高于 TS，不需要检查

obj.foo()
obj()
obj.bar = 100
obj = 'hello'
const n: number = obj
