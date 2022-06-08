console.log(["1", "2", "3"].map(parseInt)); // [ 1, NaN, NaN ]

// console.log([typeof null, null instanceof Object]); // objet false

// console.log([3, 2, 1].reduce(Math.pow), [].reduce(Math.pow)) //  Reduce of empty array with no initial value
// @ts-ignore
console.log([[3].reduce(() => { }), [].reduce(() => { }, 3)]);

const val = "heora";
console.log("Value is" + (val === "heora") ? "Something" : "Nothing"); // Something
console.log(`Value is ${val === "heora" ? "Something" : "Nothing"}`); // Value is Something

// var name = "World!";

(function () {
  if (typeof name === "undefined") {
    var name = "Jack";
    console.log("Goobye " + name);
  } else {
    console.log("Hello" + name);
  }
})();
(function () {
  var name;

  if (typeof name === "undefined") {
    name = "Jack";
    console.log("Goobye " + name);
  } else {
    console.log("Hello" + name);
  }
})();

// var END = Math.pow(2, 53)
// var START = END - 100
// var count = 0

// for (var i = START; i <= END; i++) {
//   console.log(count)
//   count++
// }
// console.log(count)

console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);

var arr = [0, 1, 2];
arr[10] = 10;
console.log(arr.filter((x) => x === undefined)); // []

var one = 0.1;
var two = 0.2;
var six = 0.6;
var eight = 0.8;
console.log([two - one == one, eight - six == two]); // [true, false]

function showCase(value) {
  switch (value) {
    case "A":
      console.log("Case A");
      break;
    case "B":
      console.log("Case B");
      break;
    case "C":
      console.log("Case C");
      break;
    case "D":
      console.log("Case D");
      break;
    default:
      console.log("Do Not konw!");
  }
}
showCase(new String("A")); // Do Not konw!

function showCase2(value) {
  switch (value) {
    case "A":
      console.log("Case A");
      break;
    case "B":
      console.log("Case B");
      break;
    case undefined:
      console.log("undefined");
      break;
    default:
      console.log("Do Not konw!");
  }
}
showCase2(String("A")); // Case A

function isOdd(num) {
  return num % 2 == 1
}
function isEven(num) {
  return num % 2 == 0
}
function isSane(num) {
  return isEven(num) || isOdd(num)
}

var values = [7, 4, '13', -9, Infinity]
console.log(values.map(isSane)) // [ true, true, true, false, false ]

console.log(parseInt("3", 8)) // 3
console.log(parseInt("3", 2)) // NaN
console.log(parseInt("3", 0)) // 3


console.log(Array.isArray(Array.prototype)) // true


// var a = [0]
// if ([0]) {
//   console.log(a == true) // false
//   console.log(a == false) // true
// } else {
//   console.log('what?')
// }


console.log([] == []) // false
console.log([] == []) // false

// console.log('5' + 3) // 53
// console.log('5' - 3) // 2

console.log(1 + - + + + - + 1) // 2


var arr = Array(3)
arr[0] = 2
console.log(arr.map((elem) => '1')) // [ '1', <2 empty items> ]


function sideEffecting(arr) {
  arr[0] = arr[2]
}
function bar(a, b, c) {
  c = 10
  sideEffecting(arguments)
  return a + b + c
}
console.log(bar(1, 1, 1)) // 21

// var a = 111111111111111110000
// var b = 1111
// console.log(a + b) // 111111111111111110000

// var x = [].reverse
// x()


console.log(Number.MIN_VALUE > 0) // true


// console.log([1 < 2 < 3, 3 < 2 < 1]) // [true, true]


// console.log(2 == [[[2]]]) // true

 
// console.log(3.toString()) // error
// console.log(3..toString()) // 3
// console.log(3...toString()) //  error


// ;(function () {
//   var x = y = 1
// })();
// console.log(y) // 1
// // console.log(x) // x is not defin


var a = /123/
var b = /123/
console.log(a == b) // false
console.log(a === b) // false

console.log('--------------')


var a = [1, 1, 3]
var b = [1, 2, 3]
var c = [1, 2, 4]

console.log(a == b) // false
console.log(a === b) // false
console.log(a > c) // false
console.log(a < c) // true

console.log('--------------')

var a = {}
var b = Object.prototype

console.log(a.prototype === b) // false
console.log(Object.getPrototypeOf(a) == b) // true
console.log(a.__proto__ === b) // true

console.log('--------------')

function f() {}

var a = f.prototype
var b = Object.getPrototypeOf(f)

console.log(a === b) // false

console.log('--------------')

function Person() { }

var p = new Person()

var a = p.__proto__
var b = Object.getPrototypeOf(p)
var c = Person.prototype

console.log(a === b, a === c, b === c) // true true true

var d = Person.__proto__
var e = Object.getPrototypeOf(Person)
var f = Function.prototype

console.log(d === e, d === f, e === f) // true true true

console.log('--------------')

function foo() { }

var oldName = foo.name

foo.name = 'bar'

console.log(oldName, foo.name) // foo foo

console.log('--------------')

console.log("1 2 3".replace(/\d/g, parseInt)) // 1 NaN 3

console.log('--------------')

function f() { }

var parent = Object.getPrototypeOf(f)

console.log(f.name) // f
console.log(parent.name) // ''
console.log(typeof eval(f.name)) // function
console.log(typeof eval(parent.name)) // undefined

console.log('--------------')

var lowerCaseOnly = /^[a-z]+$/
console.log(lowerCaseOnly.test(null), lowerCaseOnly.test()) // true true

console.log('--------------')

console.log([, , ,].join(',')) // ,,

console.log('--------------')

var a = { class: 'Animal', name: "heora" }
console.log(a.class) // Animal

console.log('--------------')

var a = new Date("epoch")
console.log(a) // Invalid Date

console.log('--------------')

var a = Function.length
var b = new Function().length
console.log(a) // 1
console.log(b) // 0
console.log(a === b) // false

console.log('--------------')

var a = Date(0)
var b = new Date(0)
var c = new Date()

console.log([a === b, b === c, a === c]) // [ false, false, false ]

console.log('--------------')

var min = Math.min()
var max = Math.max()

console.log(min < max) // false

console.log('--------------')

function captureOne(re, str) {
  var match = re.exec(str)
  return match && match[1]
}

var numRe = /num=(\d+)/ig;
var wordRe = /word=(\w+)/i;

var a1 = captureOne(numRe, "num=1")
var a2 = captureOne(wordRe, "word=1")
var a3 = captureOne(numRe, "NUM=1")
var a4 = captureOne(wordRe, "WORD=1")

console.log([a1 === a2, a3 == a4]) // true false

console.log(a1) // 1
console.log(a2) // 1
console.log(a3) // null
console.log(a4) // 1

console.log('--------------')

var a = new Date('2022-06-08')
var b = new Date(2022, 06, 08)

console.log('--------------')

if ("http://giftwrapped.com/picture.jpg".match(".gif")) {
  console.log("a gif file");
} else {
  console.log("not a gif file");
}

console.log('--------------')

function foo(a) {
  var a
  return a
}
function bar(a) {
  var a = 'bye'
  return a
}
console.log([foo('hello'), bar('hello')]) // [ 'hello', 'bye' ]
