


//多边形类
class Polygon extends CollisionShape {
    point: Point[];
    color: string;
    axes: Line[];//分离轴

    constructor(po: Point[], dir: Vector2) {
        this.point = po;
        this.color = Random.color();
        this.getAxes();
        super(dir);
    }
    
    move(step: number = 1) {
        for (var i = 0; i < this.point.length; i++) {
            this.point[i].move(this.direction, step);
        }
    }

    draw(canvas: CanvasRenderingContext2D) {
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
    }

    project(ax: Vector2): Segment {
        var left, right, mid;
        for (var i = 0; i < this.point.length; i++) {
            mid = this.point[i];
        }
        return new Segment(left, right);
    }

    //得到分离轴
    private getAxes() {
        for (var i = 0; i < this.point.length; i++) {
            var a = this.point[i];
            var b = this.point[(i + 1) % this.point.length];
            var line = new Vector2(b.x - a.x, b.y - a.y);
            this.axes.push(line.perp());
        }
    }

}