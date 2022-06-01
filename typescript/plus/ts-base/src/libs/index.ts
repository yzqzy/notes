console.log('-- declare end --')

import $ from 'jquery' // Could not find a declaration file for module 'jquery'.

$('.app').css('color', 'red')

globalLib({ x: 1 }) // TS2304: Cannot find name 'globalLib'.

globalLib.doSomething()

console.log('-- declare end --')
