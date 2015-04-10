//向量
var Vector2 = (function () {
    function Vector2(x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };

    Vector2.prototype.toString = function () {
        return "Vector2(" + this.x + " , " + this.y + ")\n";
    };

    Object.defineProperty(Vector2.prototype, "length2", {
        get: function () {
            if (this.x == 0 && this.y == 0)
                return 0;
            return this.x * this.x + this.y * this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "length", {
        get: function () {
            return Math.sqrt(this.length2);
        },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.clone = function () {
        return new Vector2(this.x, this.y);
    };
    Vector2.prototype.ceil = function () {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    };
    Vector2.prototype.floor = function () {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    };
    Vector2.prototype.copy = function (rhs) {
        this.set(rhs.x, rhs.y);
    };
    Vector2.prototype.equal = function (rhs) {
        return (this.y == rhs.y && this.x == rhs.x);
    };

    //判断a，b两个数的符号是否相同
    Vector2.prototype.abEqual = function (a, b) {
        if (a < 0 && b < 0)
            return true;
        if (a > 0 && b > 0)
            return true;
        if (Math.abs(a - b) < 0.00000001)
            return true;
        return false;
    };

    //判断两个向量是否同向
    Vector2.prototype.faceEqual = function (rhs) {
        if (this.abEqual(rhs.x, this.x) && this.abEqual(rhs.y, this.y))
            return true;
        return false;
    };
    Vector2.prototype.less = function (rhs) {
        return (this.y < rhs.y || (this.y == rhs.y && this.x < rhs.x));
    };
    Vector2.prototype.add = function (rhs) {
        this.x += rhs.x;
        this.y += rhs.y;
        return this;
    };
    Vector2.prototype.minus = function (rhs) {
        this.x -= rhs.x;
        this.y -= rhs.y;
        return this;
    };
    Vector2.prototype.scale = function (scale) {
        this.x *= scale;
        this.y *= scale;
        return this;
    };

    //当前向量对dir向量的投影向量
    Vector2.prototype.face = function (dir) {
        var ndir = dir.clone();
        ndir.normalize();
        var cos = ndir.x;
        var sin = ndir.y;
        var x = this.x;
        var y = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    };
    Vector2.prototype.rotate = function (radian, clockwise) {
        if (typeof clockwise === "undefined") { clockwise = true; }
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        var x = this.x;
        var y = this.y;
        if (clockwise) {
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
        } else {
            this.x = x * cos + y * sin;
            this.y = y * cos - x * sin;
        }
        return this;
    };
    Vector2.prototype.rotate2 = function (x, y, sin, cos, reverse) {
        var result = new Vector2(0, 0);
        if (reverse) {
            result.x = x * cos + y * sin;
            result.y = y * cos - x * sin;
        } else {
            result.x = x * cos - y * sin;
            result.y = y * cos + x * sin;
        }
        return result;
    };
    Vector2.prototype.dot = function (rhs) {
        return this.x * rhs.x + this.y * rhs.y;
    };
    Vector2.prototype.cross = function (rhs) {
        return this.x * rhs.y - this.y * rhs.x;
    };
    Object.defineProperty(Vector2.prototype, "facing", {
        get: function () {
            var nthis = this.clone();
            nthis.normalize();
            var radian = Math.acos(nthis.x);
            return nthis.y < 0 ? -radian : radian;
        },
        enumerable: true,
        configurable: true
    });

    Vector2.prototype.normalize = function () {
        var l = this.length;
        if (l != 0) {
            l = 1.0 / l;
            return this.scale(l);
        }
        return this;
    };

    Vector2.prototype.perp = function () {
        return new Vector2(-this.x, this.y);
    };
    Vector2.East = new Vector2(1, 0);
    Vector2.South = new Vector2(0, 1);
    Vector2.West = new Vector2(-1, 0);
    Vector2.North = new Vector2(0, -1);
    return Vector2;
})();
;

//随机数
var Random = (function () {
    function Random() {
    }
    Random.range = function (min, max) {
        if (typeof max === "undefined") { max = 0; }
        if (min == max)
            return min;

        //swap
        if (min > max) {
            var tmp = max;
            max = min;
            min = tmp;
        }
        return min + Math.round(Math.random() * (max - min));
    };

    Random.color = function () {
        return "#" + Random.range(0, 255).toString(16) + Random.range(0, 255).toString(16) + Random.range(0, 255).toString(16);
    };
    return Random;
})();
;

//点
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

    Point.prototype.poject = function (ax) {
        return 0;
    };
    return Point;
})();
;

//线段
var Segment = (function () {
    function Segment(ll, rr) {
        this.left = ll;
        this.right = rr;
    }
    return Segment;
})();
;

//直线
var Line = (function () {
    function Line(A, B, C) {
        this.a = A;
        this.b = B;
        this.c = C;
    }
    return Line;
})();
;
//# sourceMappingURL=math.js.map
