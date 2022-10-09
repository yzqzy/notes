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

const strageies = {
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

registerForm.onsubmit = e => {
  e.preventDefault()

  const { username, password, mobile } = registerForm

  ;[
    strageies['isNotEmpty'](username.value, '用户名不能为空'),
    strageies['minLength'](username.value, 6, '用户名的长度不能小于6位'),
    strageies['minLength'](password.value, 6, '密码的长度不能小于6位'),
    strageies['mobileFormat'](mobile.value, '手机号码格式不正确')
  ]

  console.log(username.value, password.value, mobile.value)
}
