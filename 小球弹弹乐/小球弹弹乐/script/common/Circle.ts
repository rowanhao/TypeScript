

class Circle extends CollisionShape {
    x: number;
    y: number;
    r: number;
    big_x: number;
    big_y: number;
    color: string;
    constructor(xx: number, yy: number, rr: number, dir: Vector2, sp: number){
        this.x = xx;
        this.y = yy;
        this.r = rr;
        this.big_x= xx * 100;
        this.big_y = yy * 100;
        this.color = "#" + Random.range(0, 255).toString(16) + Random.range(0, 255).toString(16)
                         + Random.range(0, 255).toString(16);
        super(dir,sp);
    }

    comp() {
        this.x = this.big_x / 100;
        this.y = this.big_y / 100;
    }

    move() {
        this.big_x += this.speed * this.direction.x;
        this.big_y += this.speed * this.direction.y;
        this.comp();
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fill();
    }
}