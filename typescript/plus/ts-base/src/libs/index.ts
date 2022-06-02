console.log('-- declare end --')

import $ from 'jquery' // Could not find a declaration file for module 'jquery'.

$('.app').css('color', 'red')

globalLib({ x: 1 }) // TS2304: Cannot find name 'globalLib'.
globalLib.doSomething()

import moduleLib from './module-lib'
moduleLib.doSomething()

import umdLib from './umd-lib'
umdLib.doSomething()


import moment from 'moment'
moment.myFunction = () => {}
declare module 'moment' {
  export function myFunction(): void
}


declare global {
  namespace globalLib {
    function doAnything(): void
  }
}
globalLib.doAnything = () => {}

console.log('-- declare end --')
