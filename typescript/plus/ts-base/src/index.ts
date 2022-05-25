require('./datatype')
require('./enum')
require('./interface')
require('./function')
require('./class')

;(() => {
  const hello: string = 'hello world'
  
  document.querySelectorAll('.app')[0].innerHTML = hello
})();
