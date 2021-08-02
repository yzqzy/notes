function test () {
  var a = 0;

  setInterval(function () {
    console.log(++a);
  }, 1000)
}