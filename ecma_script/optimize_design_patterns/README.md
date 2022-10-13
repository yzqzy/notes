# 设计模式实操

## if-else 优化 - 策略模式

`if-else` 优化可以考虑两个方向，策略模式和责任链模式。

### 简单案例

```js
const calculateBonus = function (salary, level) {
  if (level === 'A') {
    return salary * 4
  }
  if (level === 'B') {
    return salary * 3
  }
  if (level === 'C') {
    return salary * 2
  }
  if (level === 'D') {
    return salary * 1
  }
}

console.log(calculateBonus(10000, 'A')) // 40000
```

优化后：

```js
const strateyObj = {
  A: salary => salary * 4,
  B: salary => salary * 3,
  C: salary => salary * 2,
  d: salary => salary * 1
}

const calculateBonus = (salary, level) => strateyObj[level](salary)

console.log(calculateBonus(10000, 'A')) // 40000
```

### 真实场景

```html
<form action="htpp://www.baidu.com" id="J-registerForm" method="post">
  <p>
    <label>请输入用户名：</label>
    <input type="text" name="username" />
  </p>
  <p>
    <label>请输入密码：</label>
    <input type="text" name="password" />
  </p>
  <p>
    <label>请输入手机号码：</label>
    <input type="text" name="mobile" />
  </p>
  <button type="submit">提交</button>
</form>
```

#### 原始代码

 ```js
 const registerForm = document.getElementById('J-registerForm')
 
 registerForm.onsubmit = () => {
   if (registerForm.username.value === '') {
     console.log('用户名不能为空')
     return false
   }
   if (registerForm.username.length < 6) {
     console.log('用户名的长度不能小于6位')
     return false
   }
   if (registerForm.password.length < 6) {
     console.log('密码的长度不能小于6位')
     return false
   }
   if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.mobile.value)) {
     console.log('手机号码格式不正确')
     return false
   }
 
   const { username, password, mobile } = registerForm
 
   console.log(username.value, password.value, mobile.value)
 }
 ```

#### 优化 - 1

封装 `Validator` 类，负责订阅策略和执行策略。

```js
class Validator {
  constructor() {
    this.cache = []
  }

  add(target, rules) {
    rules.forEach(rule => {
      const { errMsg } = rule

      this.cache.push(() => {
        const [strategy, ...otherArgs] = rule.strategy.split(':')
        const args = [target.value, ...otherArgs, errMsg]

        return strateies[strategy].apply(target, args)
      })
    })
  }

  start() {
    return this.cache.map(item => item())
  }
}
```

定义策略对象和执行函数，只需要在 `onsubmit` 时调用函数即可。

```js
const registerForm = document.getElementById('J-registerForm')

const strateies = {
  isNotEmpty: (val, errMsg) => {
    if (val === '') return errMsg
    return val
  },
  minLength: (val, len, errMsg) => {
    if (val.length < len) return errMsg
    return val
  },
  mobileFormat: (val, errMsg) => {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(val)) return errMsg
    return val
  }
}

const validatorExecutor = () => {
  const { username, password, mobile } = registerForm

  const validator = new Validator()

  validator.add(username, [
    { strategy: 'isNotEmpty', errMsg: '用户名不能为空' },
    { strategy: 'minLength:6', errMsg: '用户名的长度不能小于6位' }
  ])
  validator.add(password, [{ strategy: 'minLength:6', errMsg: '密码的长度不能小于6位' }])
  validator.add(mobile, [{ strategy: 'mobileFormat', errMsg: '手机号码格式不正确' }])

  return validator.start()
}

registerForm.onsubmit = e => {
  e.preventDefault()

  const ans = validatorExecutor()

  console.log(ans)
}
```

#### 优化 - 2

我们可以对 `Validator` 进一步优化。

```js
class $Event {
  constructor() {
    this.subs = []
  }

  listen(key, fn) {
    if (!this.subs[key]) this.subs[key] = []
    this.subs[key].push(fn)
  }

  trigger() {
    const key = [].shift.call(arguments)
    const fns = this.subs[key]

    const ans = []

    fns.forEach(fn => {
      ans.push(fn.apply(this, arguments))
    })

    return ans
  }
}

class Validator extends $Event {
  add(target, rules) {
    rules.forEach(rule => {
      const { errMsg } = rule
      const [strategy, ...otherArgs] = rule.strategy.split(':')

      this.listen(strategy, () =>
        strateies[strategy].apply(target, [target.value, ...otherArgs, errMsg])
      )
    })
  }

  start() {
    return Object.keys(strateies).reduce(
      (prev, curr) => (
        prev.push({
          [curr]: this.trigger(curr)
        }),
        prev
      ),
      []
    )
  }
}
```

表单提交时打印结果如下：

```json
[
  {
    "isNotEmpty": [
      "用户名不能为空"
    ]
  },
  {
    "minLength": [
      "用户名的长度不能小于6位",
      "密码的长度不能小于6位"
    ]
  },
  {
    "mobileFormat": [
      "手机号码格式不正确"
    ]
  }
]
```

[代码地址](https://github.com/yw0525/notes/blob/master/ecma_script/optimize_design_patterns/strategy/index.js)

## 链式调用优化 - 责任链模式

责任链模式可以将待处理任务形成一个链条，根据不同的分支执行不同任务。

### 原始代码

```js
const order = (orderType, isPay, count) => {
  if (orderType === 1) {
    // 充值 500
    if (isPay) {
      // 充值成功，100% 中奖
      console.log('恭喜中奖 100 优惠券')
    } else {
      if (count > 0) {
        console.log('恭喜中奖 10 优惠券')
      } else {
        console.log('很遗憾没有优惠券')
      }
    }
  } else if (orderType === 2) {
    // 充值 200
    if (isPay) {
      // 充值成功，100% 中奖
      console.log('恭喜中奖 20 优惠券')
    } else {
      if (count > 0) {
        console.log('恭喜中奖 10 优惠券')
      } else {
        console.log('很遗憾没有优惠券')
      }
    }
  } else if (orderType === 3) {
    if (count > 0) {
      console.log('恭喜中奖 10 优惠券')
    } else {
      console.log('很遗憾没有优惠券')
    }
  }
}
```

### 优化 - 1

```js
const order500 = (orderType, isPay, count) => {
  if (orderType === 1 && isPay) {
    console.log('恭喜中奖 100 优惠券')
  } else {
    order200(orderType, isPay, count)
  }
}

const order200 = (orderType, isPay, count) => {
  if (orderType === 2 && isPay) {
    console.log('恭喜中奖 20 优惠券')
  } else {
    orderNormal(orderType, isPay, count)
  }
}

const orderNormal = (orderType, isPay, count) => {
  if (count > 0) {
    console.log('恭喜中奖 10 优惠券')
  } else {
    console.log('很遗憾没有优惠券')
  }
}
```

这种方式其实也不是特别好，当我们增加一个 `order100` 函数，需要改动 `order200` 函数的逻辑。

### 优化 - 2

```js
const order500 = (orderType, isPay, count) => {
  if (orderType === 1 && isPay) {
    console.log('恭喜中奖 100 优惠券')
  } else {
    return 'next'
  }
}

const order200 = (orderType, isPay, count) => {
  if (orderType === 2 && isPay) {
    console.log('恭喜中奖 40 优惠券')
  } else {
    return 'next'
  }
}

const orderNormal = (orderType, isPay, count) => {
  if (count > 0) {
    console.log('恭喜中奖 10 优惠券')
  } else {
    console.log('很遗憾没有优惠券')
  }
}

class Chain {
  constructor(fn) {
    this.fn = fn
    this.next = null
  }

  setNext(nextChain) {
    this.next = nextChain
  }

  run() {
    const ans = this.fn.apply(this, arguments)

    if (ans === 'next' && this.next) {
      return this.next.run.apply(this.next, arguments)
    }

    return ans
  }
}

const chainOrder500 = new Chain(order500)
const chainOrder200 = new Chain(order200)
const chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNext(chainOrder200)
chainOrder200.setNext(chainOrderNormal)

chainOrder500.run(2, true, 500)
```

虽然代码看起来清晰很多，但是增加很多额外操作，比较繁琐。

### 优化 - 3

```js
const order500 = (orderType, isPay, count) => {
  if (orderType === 1 && isPay) {
    console.log('恭喜中奖 100 优惠券')
  } else {
    return 'next'
  }
}

const order200 = (orderType, isPay, count) => {
  if (orderType === 2 && isPay) {
    console.log('恭喜中奖 40 优惠券')
  } else {
    return 'next'
  }
}

const orderNormal = (orderType, isPay, count) => {
  if (count > 0) {
    console.log('恭喜中奖 10 优惠券')
  } else {
    console.log('很遗憾没有优惠券')
  }
}

Function.prototype.after = function (fn) {
  const _this = this

  return function () {
    const ans = _this.apply(this, arguments)

    if (ans === 'next') {
      return fn.apply(this, arguments)
    }

    return ans
  }
}

const order = order500.after(order200).after(orderNormal)

order(2, true, 0)
```

我们可以使用 `aop` 的方式建立函数之间的调用关系，实现完整的责任链。

[代码地址](https://github.com/yw0525/notes/blob/master/ecma_script/optimize_design_patterns/chain/index.js)

## 状态机优化 - 状态模式

### 原始代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>state pattern</title>
</head>
<body>

   <button id="J-btn">开关</button>

   <script src="./index.js"></script>
  
</body>
</html>
```

```js
class Light {
  constructor() {
    this.state = 'off'
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    if (this.state === 'off') {
      console.log('弱光')
      this.state = 'weak'
      return
    }

    if (this.state === 'weak') {
      console.log('强光')
      this.state = 'strong'
      return
    }

    if (this.state === 'strong') {
      console.log('关灯')
      this.state = 'off'
    }
  }
}

new Light().init()
```

这种实现看似没有问题，但是随着业务拓展，复杂度会上升。当新增状态时，需要修改大量代码。

* 耦合程度很高，需要解耦；
* 字符串记录业务状态，容易写错，不够友好；
* 切换状态不明显；
* context 会无线膨胀。


设计原则（solid）

* 单一职责原则
  * 一个函数只做一件事情，小而美
* 开闭原则
  * 对拓展开放，对修改关闭
  * 尽量少修改原有代码
* 里氏替换原则
  * 子类一定可以替代父类
* 接口隔离原则
* 依赖倒置原则

前端开发中，我们仅需要关心单一职责原则和开闭原则。

### 优化 - 1

状态模式是面向对象的设计模式。

面向对象即万物皆对象，基于类的方式进行程序设计。

```js
class OffLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log('弱光')
    this.light.setState(this.light.weakLightState)
  }
}
class WeakLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log('强光')
    this.light.setState(this.light.strongLightState)
  }
}
class StrongLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log('关灯')
    this.light.setState(this.light.offLightState)
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this)
    this.weakLightState = new WeakLightState(this)
    this.strongLightState = new StrongLightState(this)

    this.currentState = this.offLightState
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    this.currentState.buttonWasPressed()
  }

  setState(newState) {
    this.currentState = newState
  }
}

new Light().init()
```

截至目前位置，代码其实依旧比较繁琐，我们可以进一步优化。

### 优化 - 2

```js
class State {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    throw new Error('抽象类不允许使用')
  }
}

class OffLightState extends State {
  buttonWasPressed() {
    console.log('弱光')
    this.light.setState(this.light.weakLightState)
  }
}
class WeakLightState extends State {
  buttonWasPressed() {
    console.log('强光')
    this.light.setState(this.light.strongLightState)
  }
}
class StrongLightState extends State {
  buttonWasPressed() {
    console.log('关灯')
    this.light.setState(this.light.offLightState)
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this)
    this.weakLightState = new WeakLightState(this)
    this.strongLightState = new StrongLightState(this)

    this.currentState = this.offLightState
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    this.currentState.buttonWasPressed()
  }

  setState(newState) {
    this.currentState = newState
  }
}

new Light().init()
```

可以利用抽象类的概念去优化代码。

### 优化 - 3

其实我们还可以去掉类，目前多个状态需要实例化多次，编写起来也比较繁琐。

```js
const FSM = {
  off: {
    buttonWasPressed() {
      console.log('弱光')
      this.currentState = FSM.weak
    }
  },
  weak: {
    buttonWasPressed() {
      console.log('强光')
      this.currentState = FSM.strong
    }
  },
  strong: {
    buttonWasPressed() {
      console.log('关灯')
      this.currentState = FSM.off
    }
  }
}

class Light {
  constructor() {
    this.currentState = FSM.off
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    this.currentState.buttonWasPressed.call(this)
  }
}

new Light().init()
```

这种优化方式虽然不是面向对象的写法，但思想上是一致的。

```js
const FSM = {
  off: {
    buttonWasPressed() {
      console.log('弱光')
      this.setState(FSM.weak)
    }
  },
  weak: {
    buttonWasPressed() {
      console.log('强光')
      this.setState(FSM.strong)
    }
  },
  strong: {
    buttonWasPressed() {
      console.log('关灯')
      this.setState(FSM.off)
    }
  }
}

class Light {
  constructor() {
    this.currentState = FSM.off
    this.oBtn = document.getElementById('J-btn')
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    this.oBtn.addEventListener('click', this.buttonWasPressed.bind(this), false)
  }

  buttonWasPressed() {
    this.currentState.buttonWasPressed.call(this)
  }

  setState(newState) {
    this.currentState = newState
  }
}

new Light().init()
```

[代码地址](https://github.com/yw0525/notes/blob/master/ecma_script/optimize_design_patterns/state/index.js)



