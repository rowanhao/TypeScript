var Shape = (function () {
    function Shape(dir) {
        if (typeof dir === "undefined") { dir = new Vector2(0, 1); }
        this.direction = dir;
    }
    Shape.prototype.draw = function (canvas) {
    };
    Shape.prototype.move = function (step) {
        if (typeof step === "undefined") { step = 1; }
    };
    return Shape;
})();
//# sourceMappingURL=Shape.js.map
