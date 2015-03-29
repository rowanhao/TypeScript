

class Circle extends CollisionShape {
    x: number;
    y: number;
    r: number;
    color: string;

    constructor(xx: number, yy: number, rr: number, dir: Vector2){
        this.x = xx;
        this.y = yy;
        this.r = rr;
        this.color = Random.color();
        super(dir);
    }

    move() {
        this.x += this.direction.x;
        this.y += this.direction.y;
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
    }
}