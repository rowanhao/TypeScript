var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(xx, yy, rr, dir) {
        this.x = xx;
        this.y = yy;
        this.r = rr;
        this.color = Random.color();
        this.eps = 0.0000000001;
        _super.call(this, dir);
    }
    Circle.prototype.move = function (step) {
        if (typeof step === "undefined") { step = 1; }
        if (Math.abs(step) > this.eps && this.direction.length2 > this.eps) {
            this.x += this.direction.x * step;
            this.y += this.direction.y * step;
        }
    };

    Circle.prototype.draw = function (canvas) {
        canvas.fillStyle = this.color;

        //canvas.strokeStyle = this.color;
        canvas.lineWidth = 5;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);

        //canvas.stroke();
        canvas.closePath();
        canvas.fill();
    };
    return Circle;
})(CollisionShape);
//# sourceMappingURL=Circle.js.map
