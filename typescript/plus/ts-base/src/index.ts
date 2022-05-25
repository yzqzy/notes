require('./datatype');
require('./enum');
require('./interface');
require('./function');

;(() => {
  const hello: string = 'hello world'
  
  document.querySelectorAll('.app')[0].innerHTML = hello
})();
