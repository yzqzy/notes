var Shape;
(function (Shape) {
    function square(x) {
        return x * x;
    }
    Shape.square = square;
})(Shape || (Shape = {}));
console.log('-- name space start --');
console.log(Shape.circle(1));
console.log(Shape.square(1));
var cicle = Shape.circle; // 与模块中的 import 没有任何关系，然后我们就可以直接执行 SQL 函数
console.log(cicle(3));
console.log('-- name space end --');
