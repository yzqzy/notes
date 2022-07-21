
// showName()
// console.log(myname)
// var myname = 'heora'
// function showName() {
//   console.log('函数showName被执行')
// }


// // 变量提升部分
// var myname = undefined
// function showName() {

// }
// // 可执行代码部分
// showName()
// console.log(myname)
// myname = 'heora'


// function showName() {
//     console.log('heora')
// }
// showName()
// function showName() {
//     console.log('yueluo')
// }
// showName()


// showName()
// var showName = function() {
//   console.log(2)
// }
// function showName() {
//   console.log(1)
// }


// var a = 2
// function add() {
//   var b = 10
//   return a + b
// }
// add()

// var a = 2
// function add(b, c){
//   // console.trace()
//   return b + c
// }
// function addAll(b, c){
//   var d = 10
//   result = add(b, c)
//   return  a + result + d
// }
// addAll(3, 6)

// function division(a, b) {
//   return division(a, b)
// }
// division(1, 2)


// var myname = 'heora'
// function showName() {
//   console.log(myname)
//   if (0) {
//     var myname = 'yueluo'
//   }
//   console.log(myname)
// }
// showName()


// function foo() {
//   for (var i = 0; i < 7; i++) {}
//   console.log(i)
// }
// foo()


// let x = 5
// const y = 6
// x = 7
// y = 9 // TypeError: Assignment to constant variable.


// function varTest() {
//   var x = 1
//   if (true) {
//     let x = 2
//     console.log(x) // 2
//   }
//   console.log(x) // 1
// }
// varTest()


// function foo(){
//   var a = 1
//   let b = 2
//   {
//     let b = 3
//     var c = 4
//     let d = 5
//     console.log(a)
//     console.log(b)
//   }
//   console.log(b)
//   console.log(c)
// }   
// foo()


// let myname= 'heora'
// {
//   console.log(myname) 
//   let myname= 'yueluo'
// }


// function bar() {
//   console.log(myName)
// }
// function foo() {
//   var myName = 'heora'
//   bar()
// }
// var myName = 'yueluo'
// foo()


// function bar() {
//   var myName = 'heora'
//   let test1 = 100
//   if (1) {
//     let myName = 'chrome browser'
//     console.log(test)
//   }
// }
// function foo() {
//   var myName = 'yueluo'
//   let test = 2
//   {
//     let test = 3
//     bar()
//   }
// }
// var myName = '月落'
// let myAge = 10
// let test = 1
// foo()


// function foo() {
//   let myName = 'heora'
//   let test1 = 1
//   let test2 = 2
//   var innerBar = {
//     getName: function() {
//       console.log(test1)
//       return myName
//     },
//     setName: function(newName) {
//       myName = newName
//     }
//   }
//   return innerBar
// }
// var bar = foo()
// bar.setName('yueluo')
// bar.getName()
// console.log(bar.getName())


// var bar = {
//   myName:"www.yueluo.club",
//   printName: function () {
//     console.log(myName)
//   }    
// }
// function foo() {
//   let myName = "heora"
//   return bar.printName
// }
// let myName = "yueluo"
// let _printName = foo()
// _printName()
// bar.printName()


// var bar = {
//   myName:"www.yueluo.club",
//   printName: function () {
//     console.log(this.myName)
//   }    
// }
// function foo() {
//   let myName = "heora"
//   return bar.printName
// }
// let myName = "yueluo"
// let _printName = foo()
// _printName()
// bar.printName()


// function foo() {
//   console.log(this)
// }
// foo()


// let bar = {
//   myName: 'heora',
//   test1: 1
// }
// function foo() {
//   this.myName = 'yueluo'
// }
// foo.call(bar)
// console.log(bar) // { myName: 'yueluo', test1: 1 }
// console.log(myName) // ReferenceError: myName is not defined


// var myObj = {
//   name: 'heora',
//   showThis: function() {
//     console.log(this)
//   }
// }
// myObj.showThis()


// var myObj = {
//   name: 'heora',
//   showThis: function() {
//     this.name = 'yueluo'
//     console.log(this)
//   }
// }
// var foo = myObj.showThis
// foo()


// function CreateObj() {
//   this.name = 'heora'
// }
// var myObj = new CreateObj()


// var myObj = {
//   name : "heora", 
//   showThis: function() {
//     console.log(this)
//     var bar = () => {
//       this.name = 'yueluo'
//       console.log(this)
//     }
//     bar()
//   }
// }
// myObj.showThis()
// console.log(myObj.name)


// function foo() {
//   var a = 1
//   var b = a
//   a = 2
//   console.log(a)
//   console.log(b)
// }
// foo()
// function foo() {
//   var a = { name: 'heora' }
//   var b = a
//   a.name = 'yueluo'
//   console.log(a)
//   console.log(b)
// }
// foo()


// function foo() {
//   var myName = "heora"
//   var test1 = 1
//   var test2 = 2
//   var innerBar = { 
//     setName:function(newName){
//       myName = newName
//     },
//     getName:function(){
//       console.log(test1)
//       return myName
//     }
//   }
//   return innerBar
// }
// var bar = foo()
// bar.setName("yueluo")
// bar.getName()
// console.log(bar.getName())


