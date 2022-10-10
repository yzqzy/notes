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

## 链式调用优化 - 责任链模式

责任链模式可以将待处理任务形成一个链条，根据不同的分支执行不同任务。

### 原始代码

```js
```

