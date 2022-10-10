// const calculateBonus = function (salary, level) {
//   if (level === 'A') {
//     return salary * 4
//   }
//   if (level === 'B') {
//     return salary * 3
//   }
//   if (level === 'C') {
//     return salary * 2
//   }
//   if (level === 'D') {
//     return salary * 1
//   }
// }

// const strageyObj = {
//   A: salary => salary * 4,
//   B: salary => salary * 3,
//   C: salary => salary * 2,
//   d: salary => salary * 1
// }

// const calculateBonus = (salary, level) => strageyObj[level](salary)

// console.log(calculateBonus(10000, 'A'))

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

// const registerForm = document.getElementById('J-registerForm')

// registerForm.onsubmit = () => {
//   if (registerForm.username.value === '') {
//     console.log('用户名不能为空')
//     return false
//   }
//   if (registerForm.username.length < 6) {
//     console.log('用户名的长度不能小于6位')
//     return false
//   }
//   if (registerForm.password.length < 6) {
//     console.log('密码的长度不能小于6位')
//     return false
//   }
//   if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.mobile.value)) {
//     console.log('手机号码格式不正确')
//     return false
//   }

//   const { username, password, mobile } = registerForm

//   console.log(username.value, password.value, mobile.value)
// }

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

// class Validator {
//   constructor() {
//     this.cache = []
//   }

//   add(target, rules) {
//     rules.forEach(rule => {
//       const { errMsg } = rule

//       this.cache.push(() => {
//         const [strategy, ...otherArgs] = rule.strategy.split(':')
//         const args = [target.value, ...otherArgs, errMsg]

//         return strateies[strategy].apply(target, args)
//       })
//     })
//   }

//   start() {
//     return this.cache.map(item => item())
//   }
// }

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

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
