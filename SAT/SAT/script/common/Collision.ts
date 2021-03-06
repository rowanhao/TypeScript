﻿
class Cir2{
    a: Circle;
    b: Circle;
    constructor(aa: Circle, bb: Circle) {
        this.a = aa;
        this.b = bb;
    }
    collision() {
        var dx: number = -this.a.x + this.b.x;
        var dy: number = -this.a.y + this.b.y;
        var angle: number = Math.atan2(dy, dx);
        var cos: number = Math.cos(angle);
        var sin: number = Math.sin(angle);
        var Amass = 3.0 / 4.0 * this.a.r * this.a.r * this.a.r;
        var Bmass = 3.0 / 4.0 * this.b.r * this.b.r * this.b.r;
        var pos0: Vector2 = new Vector2(0, 0);
        // 旋转 this.b 的速度 
        var pos1: Vector2 = pos0.rotate2(dx, dy, sin, cos, true);
        // 旋转 this.a 的速度 
        var vel0: Vector2 = pos0.rotate2(this.a.direction.x, this.a.direction.y, sin, cos, true);
        // 旋转 this.b 的速度 
        var vel1: Vector2 = pos0.rotate2(this.b.direction.x, this.b.direction.y, sin, cos, true);
        // 碰撞的作用力 
        var vxTotal: number = vel0.x - vel1.x;
        vel0.x = ((Amass - Bmass) * vel0.x + 2 * Bmass * vel1.x) / (Amass + Bmass);
        vel1.x = vxTotal + vel0.x;
        // 更新位置 
        var absV: number = Math.abs(vel0.x) + Math.abs(vel1.x);
        // 将位置旋转回来 
        var pos0F: Vector2 = pos0.rotate2(pos0.x, pos0.y, sin, cos, false);
        var pos1F: Vector2 = pos0.rotate2(pos1.x, pos1.y, sin, cos, false);
        // 将位置调整为屏幕的实际位置 
        this.b.x = this.a.x + pos1F.x;
        this.b.y = this.a.y + pos1F.y;
        this.a.x = this.a.x + pos0F.x;
        this.a.y = this.a.y + pos0F.y;
        // 将速度旋转回来 
        var vel0F: Vector2 = pos0.rotate2(vel0.x, vel0.y, sin, cos, false);
        var vel1F: Vector2 = pos0.rotate2(vel1.x, vel1.y, sin, cos, false);
        this.a.direction.x = vel0F.x;
        this.a.direction.y = vel0F.y;
        this.b.direction.x = vel1F.x;
        this.b.direction.y = vel1F.y;
    }
}

function Cir2Cir(a: Circle, b: Circle):number {
    var len = new Vector2(a.x - b.x, a.y - b.y);
    return (a.r + b.r) - len.length;
}

function Polygon2Polygon(a: Polygon, b: Polygon): boolean {

    var overlap = -1;
    var smallest: Vector2;

    for (var i = 0; i < a.axes.length; i++) {
        var axes = a.axes[i];
        var p1 = a.project(axes);
        var p2 = b.project(axes);
        if (!p1.overlap(p2)) {
            return false;
        }
    }

    for (var i = 0; i < b.axes.length; i++) {
        var axes = b.axes[i];
        var p1 = a.project(axes);
        var p2 = b.project(axes);
        if (!p1.overlap(p2)) {
            return false;
        }
    }
    return true;
}

function AABB(a: Polygon, b: Polygon): boolean {

    var ax1, ay1, ax2, ay2;
    var bx1, by1, bx2, by2;
    ax1 = ax2 = a.point[0].x;
    ay1 = ay2 = a.point[0].y;
    bx1 = bx2 = b.point[0].x;
    by1 = by2 = b.point[0].y;
    for (var i = 0; i < a.point.length; i++) {
        if (a.point[i].x < ax1) ax1 = a.point[i].x;
        if (a.point[i].x > ax2) ax2 = a.point[i].x;
        if (a.point[i].y < ay1) ay1 = a.point[i].y;
        if (a.point[i].y > ay2) ay2 = a.point[i].y;
    }

    for (var i = 0; i < b.point.length; i++) {
        if (b.point[i].x < bx1) bx1 = b.point[i].x;
        if (b.point[i].x > bx2) bx2 = b.point[i].x;
        if (b.point[i].y < by1) by1 = b.point[i].y;
        if (b.point[i].y > by2) by2 = b.point[i].y;
    }
    if (ax1 > bx2 || ax2 < bx1 || ay1 > by2 || ay2 < by1) return false;
    return true;
}