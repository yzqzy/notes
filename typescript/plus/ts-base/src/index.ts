require('./datatype')
require('./enum')
require('./interface')
require('./function')
require('./class')
require('./class_with_interface')
require('./generics')
require('./type_check')
require('./high_type')
require('./merge')
require('./libs/index')

import './es6/c'

;(() => {
  const hello: string = 'hello world'
  
  document.querySelectorAll('.app')[0].innerHTML = hello
})();
