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
console.log('-- name space end --');
