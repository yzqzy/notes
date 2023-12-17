// const startDebug = () => {
//   debugger
// }

// let i = 0
// while (i < 10) {
//   startDebug()
//   console.log(`i ${i++}`)
// }

// ---------------------------------------------=

console.log(eval + '')
// 'function eval() { [native code] }'

// 重写 eval
window._origin_eval = window.eval

function $eval(src) {
  console.log(
    `==== eveal begin: length=${src.length}, caller=~${$eval.caller && $eval.caller.name} ====`
  )
  console.log(`injected ${document.location}`)
  console.log(src)
  console.log(`==== eval end ====`)

  return window._origin_eval(src)
}

Object.defineProperty(window, 'eval', { value: $eval })

console.log(eval + '')
// 'function $eval(src) {\n  console.log(\n    `==== eveal begin: length=${src.length}, caller=~${$eval.caller && $eval.caller.name} ====`\n  )\n  console.log(`injected ${document.location}`)\n  console.log(src)\n  console.log(`==== eval end ====`)\n\n  return window._origin_eval(src)\n}'

$eval.toString = function () {
  return 'function eval() { [native code] }'
}

console.log(eval + '')
// 'function eval() { [native code] }'

// ---------------------------------------------=
