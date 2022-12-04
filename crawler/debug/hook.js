// const origin_stringify = JSON.stringify
// JSON.stringify = function (params) {
//   console.log('stringify', params)
//   return origin_stringify(params)
// }

// const origin_parse = JSON.parse
// JSON.parse = function (params) {
//   console.log('parse', params)
//   return origin_parse(params)
// }

// ---------------------------------------

// let origin_cookie = document.cookie
// Object.defineProperty(document, 'cookie', {
//   get() {
//     console.log('getter cookie')
//     return origin_cookie
//   },
//   set(value) {
//     console.log('setter cookie', value)

//     const cookie = value.split(';')[0]
//     const cookieArr = cookie.split('=')

//     let flag = false
//     let cache = origin_cookie.split('; ')

//     cache = cache.map(item => {
//       if (item.split('=')[0] === cookieArr[0]) {
//         flag = true
//         return cookie
//       }
//       return item
//     })

//     origin_cookie = cache.join('; ')
//     if (!flag) {
//       origin_cookie += cookie + '; '
//     }
//     this._value = value

//     return origin_cookie
//   }
// })

// ---------------------------------------

// function hook(key) {
//   const origin_window = window

//   Object.defineProperty(window, key, {
//     get() {
//       console.log('getter window', key)
//       return origin_window[key]
//     },
//     set(value) {
//       console.log('setter window', value)
//       origin_window.value = value
//     }
//   })
// }

// ---------------------------------------
\
// const origin_eval = window.eval
// function $eval(src) {
//   console.log(
//     `==== eveal begin: length=${src.length}, caller=~${$eval.caller && $eval.caller.name} ====`
//   )
//   console.log(`injected ${document.location}`)
//   console.log(src)
//   console.log(`==== eval end ====`)

//   return origin_eval(src)
// }

// $eval.toString = () => 'function eval() { [native code] }'
// Object.defineProperty(window, 'eval', { value: $eval })

// ---------------------------------------

// const origin_function = window.Function
// function $func() {
//   const args = [].slice.call(arguments, 0, -1).join(',')
//   const src = [].slice.call(arguments).at(-1)

//   console.log('function start')
//   console.log(src)
//   console.log('function end')

//   return origin_function.apply(this, arguments)
// }

// $func.toString = () => origin_function + ''
// Object.defineProperty(window, 'Function', { value: $func })

// ---------------------------------------

const origin_ws = WebSocket.prototype.send
WebSocket.prototype.send = function (data) {
  console.log('websocket', data)
  return origin_ws(data)
}
