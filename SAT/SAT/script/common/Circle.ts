

class Circle extends Shape {
    x: number;
    y: number;
    r: number;
    color: string;
    eps: number;

    constructor(xx: number, yy: number, rr: number, dir: Vector2) {
        this.x = xx;
        this.y = yy;
        this.r = rr;
        this.init();
        this.type = "circle"
        super(dir);
    }

    init() {
        this.color = Random.color();
        this.eps = 0.0000000001
    }

    move(step: number = 1) {
        if (Math.abs(step) > this.eps && this.direction.length2 > this.eps) {
            this.x += this.direction.x * step;
            this.y += this.direction.y * step;
        }
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.fillStyle = this.color;
        //canvas.strokeStyle = this.color;
        canvas.lineWidth = 5;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        //canvas.stroke();
        canvas.closePath();
        canvas.fill();
    }
}