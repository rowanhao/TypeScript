


//多边形类
class Polygon extends Shape {
    point: Point[];
    color: string;
    axes: Vector2[] = new Array();//分离轴

    constructor(po: Point[], dir: Vector2) {
        super(dir);
        this.point = po;
        this.color = Random.color();
        this.getAxes();
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
        canvas.stroke();
        canvas.closePath();
        canvas.fill();
    }

    project(ax: Vector2): Segment {
        var left, right, mid;
        for (var i = 0; i < this.point.length; i++) {
            var px = new Vector2(this.point[i].x, this.point[i].y);
            mid = ax.dot(px);
            if (i == 0) left = right = mid;
            if (mid < left) left = mid;
            if (mid > right) right = mid;
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