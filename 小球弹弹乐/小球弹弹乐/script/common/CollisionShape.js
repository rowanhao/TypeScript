var CollisionShape = (function () {
    function CollisionShape(dir) {
        if (typeof dir === "undefined") { dir = new Vector2(0, 1); }
        this.direction = dir;
    }
    CollisionShape.prototype.draw = function (canvas) {
    };
    CollisionShape.prototype.move = function (step) {
        if (typeof step === "undefined") { step = 1; }
    };
    return CollisionShape;
})();
//# sourceMappingURL=CollisionShape.js.map
