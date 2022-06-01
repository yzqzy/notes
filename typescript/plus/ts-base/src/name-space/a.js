var Shape;
(function (Shape) {
    var pi = Math.PI;
    function circle(r) {
        return pi * r * 2;
    }
    Shape.circle = circle;
})(Shape || (Shape = {}));
