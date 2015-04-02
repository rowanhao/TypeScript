var Cir2 = (function () {
    function Cir2(aa, bb) {
        this.a = aa;
        this.b = bb;
    }
    Cir2.prototype.collision = function () {
        var dx = -this.a.x + this.b.x;
        var dy = -this.a.y + this.b.y;
        var angle = Math.atan2(dy, dx);
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var Amass = 3.0 / 4.0 * this.a.r * this.a.r * this.a.r;
        var Bmass = 3.0 / 4.0 * this.b.r * this.b.r * this.b.r;
        var pos0 = new Vector2(0, 0);

        // 旋转 this.b 的速度
        var pos1 = pos0.rotate2(dx, dy, sin, cos, true);

        // 旋转 this.a 的速度
        var vel0 = pos0.rotate2(this.a.direction.x, this.a.direction.y, sin, cos, true);

        // 旋转 this.b 的速度
        var vel1 = pos0.rotate2(this.b.direction.x, this.b.direction.y, sin, cos, true);

        // 碰撞的作用力
        var vxTotal = vel0.x - vel1.x;
        vel0.x = ((Amass - Bmass) * vel0.x + 2 * Bmass * vel1.x) / (Amass + Bmass);
        vel1.x = vxTotal + vel0.x;

        // 更新位置
        var absV = Math.abs(vel0.x) + Math.abs(vel1.x);

        // 将位置旋转回来
        var pos0F = pos0.rotate2(pos0.x, pos0.y, sin, cos, false);
        var pos1F = pos0.rotate2(pos1.x, pos1.y, sin, cos, false);

        // 将位置调整为屏幕的实际位置
        this.b.x = this.a.x + pos1F.x;
        this.b.y = this.a.y + pos1F.y;
        this.a.x = this.a.x + pos0F.x;
        this.a.y = this.a.y + pos0F.y;

        // 将速度旋转回来
        var vel0F = pos0.rotate2(vel0.x, vel0.y, sin, cos, false);
        var vel1F = pos0.rotate2(vel1.x, vel1.y, sin, cos, false);
        this.a.direction.x = vel0F.x;
        this.a.direction.y = vel0F.y;
        this.b.direction.x = vel1F.x;
        this.b.direction.y = vel1F.y;
    };
    return Cir2;
})();

function Cir2Cir(a, b) {
    var len = new Vector2(a.x - b.x, a.y - b.y);
    return (a.r + b.r) - len.length;
}
//# sourceMappingURL=Collision.js.map
