import a = require('./amd')

;(() => {
  const hello: string = 'hello world'
  
  document.querySelectorAll('.app')[0].innerHTML = hello
})();


class A {}
class B extends A {}

const arr = [1, 2, 3]
const arr2 = [4, ...arr]
