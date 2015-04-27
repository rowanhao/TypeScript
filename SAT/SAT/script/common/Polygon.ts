


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
        this.type = "polygon";
    }

    IsSelected(px: number, py: number) {
        if (this.judgePointIn(px, py)) {
            this.flag_select = true;
        }
    }

    movexy(px: number, py: number) {
        for (var i = 0; i < this.point.length; i++) {
            this.point[i].x += px;
            this.point[i].y += py;
        }
    }

    move(step: number = 1) {
        for (var i = 0; i < this.point.length; i++) {
            this.point[i].move(this.direction, step);
        }
    }

    draw(canvas: CanvasRenderingContext2D) {
        canvas.lineWidth = 1;
        canvas.strokeStyle = this.color;
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

    //使用回转数法判断点是否在多边形的内部
    private judgePointIn(px: number, py: number): boolean {
        var sum: number = 0;
        for (var i = 0, l = this.point.length, j = l - 1; i < l; j = i, i++) {
            var sx = this.point[i].x,
                sy = this.point[i].y,
                tx = this.point[j].x,
                ty = this.point[j].y
            // 点与多边形顶点重合或在多边形的边上
            if ((sx - px) * (px - tx) >= 0 && (sy - py) * (py - ty) >= 0 && (px - sx) * (ty - sy) === (py - sy) * (tx - sx)) {
                return true;
            }

            // 点与相邻顶点连线的夹角
            var angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px);
            // 确保夹角不超出取值范围（-π 到 π）
            if (angle >= Math.PI) {
                angle = angle - Math.PI * 2;
            }
            else if (angle <= -Math.PI) {
                angle = angle + Math.PI * 2;
            }
            sum += angle;
        }

        // 计算回转数并判断点和多边形的几何关系
        return Math.round(sum / Math.PI) == 0 ? false : true;
    }
}