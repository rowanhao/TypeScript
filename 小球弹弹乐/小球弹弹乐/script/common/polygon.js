var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Point = (function () {
    function Point(xx, yy) {
        this.x = xx;
        this.y = yy;
    }
    Point.prototype.move = function (dir, step) {
        if (typeof step === "undefined") { step = 1; }
        this.x += dir.x * step;
        this.y += dir.x * step;
    };
    return Point;
})();

//多边形类
var Polygon = (function (_super) {
    __extends(Polygon, _super);
    function Polygon(po, dir) {
        this.point = po;
        this.color = Random.color();
        _super.call(this, dir);
    }
    Polygon.prototype.move = function (step) {
        if (typeof step === "undefined") { step = 1; }
        for (var i = 0; i < this.point.length; i++) {
            this.point[i].move(this.direction, step);
        }
    };

    Polygon.prototype.draw = function (canvas) {
        canvas.fillStyle = this.color;
        canvas.beginPath();
        for (var i = 0; i < this.point.length; i++) {
            canvas.moveTo(this.point[i].x, this.point[i].y);
            if (i != this.point.length - 1) {
                canvas.lineTo(this.point[i + 1].x, this.point[i + 1].y);
            } else {
                canvas.lineTo(this.point[0].x, this.point[0].y);
            }
        }
        canvas.closePath();
        canvas.fill();
    };
    return Polygon;
})(CollisionShape);
//# sourceMappingURL=polygon.js.map
