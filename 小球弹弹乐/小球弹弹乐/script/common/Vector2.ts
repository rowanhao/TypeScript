

class Vector2 {
    public static East: Vector2 = new Vector2(1, 0);
    public static South: Vector2 = new Vector2(0, 1);
    public static West: Vector2 = new Vector2(-1, 0);
    public static North: Vector2 = new Vector2(0, -1);

    constructor(public x: number = 0, public y: number = 0) {
    }

    set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;
        return this;
    }

    get length2(): number {
        if (this.x == 0 && this.y == 0)
            return 0;
        return this.x * this.x + this.y * this.y;
    }
    get length(): number {
        return Math.sqrt(this.length2);
    }
    public clone(): Vector2 {
        var a: Vector2;
        a.set(this.x, this.y);
        return a;
    }
    public ceil(): Vector2 {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }
    public floor(): Vector2 {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }
    public copy(rhs: Vector2): void {
        this.set(rhs.x, rhs.y);
    }
    public equal(rhs: Vector2): boolean {
        return (this.y == rhs.y && this.x == rhs.x);
    }
    public less(rhs: Vector2): boolean {
        return (this.y < rhs.y || (this.y == rhs.y && this.x < rhs.x));
    }
    public add(rhs: Vector2): Vector2 {
        this.x += rhs.x;
        this.y += rhs.y;
        return this;
    }
    public minus(rhs: Vector2): Vector2 {
        this.x -= rhs.x;
        this.y -= rhs.y;
        return this;
    }
    public scale(scale: number) {
        this.x *= scale;
        this.y *= scale;
        return this;
    }
    //当前向量对dir向量的投影向量
    public face(dir: Vector2): Vector2 {
        var ndir = dir.clone();
        ndir.normalize();
        var cos = ndir.x;
        var sin = ndir.y;
        var x: number = this.x;
        var y: number = this.y;
        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;
        return this;
    }
    public rotate(radian: number, clockwise: boolean = true): Vector2 {
        var cos = Math.cos(radian);
        var sin = Math.sin(radian);
        var x: number = this.x;
        var y: number = this.y;
        if (clockwise) {
            this.x = x * cos - y * sin;
            this.y = x * sin + y * cos;
        }
        else {
            this.x = x * cos + y * sin;
            this.y = y * cos - x * sin;
        }
        return this;
    }
    public dot(rhs: Vector2): number {
        return this.x * rhs.x + this.y * rhs.y;
    }
    public cross(rhs: Vector2): number {
        return this.x * rhs.y - this.y * rhs.x;
    }
    get facing(): number {
        var nthis = this.clone();
        nthis.normalize();
        var radian: number = Math.acos(nthis.x);
        return nthis.y < 0 ? -radian : radian;
    }

    public normalize(): Vector2 {
        var l = this.length;
        if (l != 0) {
            l = 1.0 / l;
            return this.scale(l);
        }
        return this;
    }
}