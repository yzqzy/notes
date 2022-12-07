const obfuscator = require('javascript-obfuscator')

const code = `
  const x  = 'l' + 1
  console.log('x', x)
`

// const options = {
//   compact: true, // 是否压缩成一行
//   controlFlowFlattening: true // 控制流平坦化
// }

// const options = {
//   compact: true, // 是否压缩成一行
//   identifierNamesGenerator: 'mangled' // 普通混淆
// }

// 字符串混淆
// const options = {
//   stringArray: true,
//   rotateStringArray: true,
//   stringArrayEncoding: ['base64'], // none, base64, rc4
//   stringArrayThreshold: 1
// }
// const options = {
//   compact: false,
//   unicodeEscaoeSequence: true
// }

// 自我保护
const options = {
  selfDefending: true
}

const obfuscate = (code, options) => obfuscator.obfuscate(code, options).getObfuscatedCode()
console.log(obfuscate(code, options))

// function _0x6a5a(_0x57ebb1,_0x288f15){const _0x57a170=_0x3833();return _0x6a5a=function(_0x2482c9,_0x25f644){_0x2482c9=_0x2482c9-0x1ef;let _0x3833aa=_0x57a170[_0x2482c9];return _0x3833aa;},_0x6a5a(_0x57ebb1,_0x288f15);}const _0x252268=_0x6a5a;(function(_0x385891,_0x470326){const _0x193ce5=_0x6a5a,_0x3015bf=_0x385891();while(!![]){try{const _0x49f914=-parseInt(_0x193ce5(0x1fb))/0x1+-parseInt(_0x193ce5(0x1fc))/0x2*(parseInt(_0x193ce5(0x1ef))/0x3)+parseInt(_0x193ce5(0x1f3))/0x4+parseInt(_0x193ce5(0x1f2))/0x5*(parseInt(_0x193ce5(0x1f4))/0x6)+-parseInt(_0x193ce5(0x1f1))/0x7+parseInt(_0x193ce5(0x1f9))/0x8+-parseInt(_0x193ce5(0x1f0))/0x9*(parseInt(_0x193ce5(0x1f7))/0xa);if(_0x49f914===_0x470326)break;else _0x3015bf['push'](_0x3015bf['shift']());}catch(_0x5897ea){_0x3015bf['push'](_0x3015bf['shift']());}}}(_0x3833,0x86bac));const _0x25f644=(function(){let _0x8e8490=!![];return function(_0x19b5dc,_0x146e4a){const _0x16be9a=_0x8e8490?function(){const _0x556212=_0x6a5a;if(_0x146e4a){const _0x495ee9=_0x146e4a[_0x556212(0x1f5)](_0x19b5dc,arguments);return _0x146e4a=null,_0x495ee9;}}:function(){};return _0x8e8490=![],_0x16be9a;};}()),_0x2482c9=_0x25f644(this,function(){const _0x35d7d9=_0x6a5a;return _0x2482c9['toString']()[_0x35d7d9(0x1fa)](_0x35d7d9(0x1f6))[_0x35d7d9(0x1fd)]()[_0x35d7d9(0x1fe)](_0x2482c9)[_0x35d7d9(0x1fa)](_0x35d7d9(0x1f6));});_0x2482c9();function _0x3833(){const _0x3304a8=['5oGONaW','2118072PoiGNm','6069912QkkLzC','apply','(((.+)+)+)+$','236020nALghG','log','8703416GbJlym','search','697721FGPyIP','41456DmSEci','toString','constructor','51yNMskw','144UZjKrD','4546612XUZMRy'];_0x3833=function(){return _0x3304a8;};return _0x3833();}const x='l'+0x1;console[_0x252268(0x1f8)]('x',x);
