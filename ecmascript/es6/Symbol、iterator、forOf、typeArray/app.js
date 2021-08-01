function foo () {
  return function () {
    return function () {
      return function () {
        console.log('id：', this.id);
      }
    }
  }
}
var f = foo.call({ id: 1 });  
var t1 = f.call({ id: 2 })()(); // id: undefined
var t2 = f().call({ id: 3 })(); // id: undefined
var t3 = f()().call({ id: 4 }); // id: 4

