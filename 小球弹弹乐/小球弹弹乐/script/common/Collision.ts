
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
 
        //以ballA中心为旋转中心反向旋转
        var xA: number = 0;//ballA自身为旋转中心，所以自身旋转后的相对坐标都是0
        var yA: number = 0;

        var xB: number = dx * cos + dy * sin;
        var yB: number = dy * cos - dx * sin;

        var ballA = this.a.direction;
        var ballB = this.b.direction;
        //先(反向)旋转二球相对(ballA的)速度
        var vxA = ballA.x * cos + ballA.y * sin;
        var vyA = ballA.y * cos - ballA.x * sin;
        var vxB = ballB.x * cos + ballB.y * sin;
        var vyB = ballB.y * cos - ballB.x * sin;
 
        //旋转后的vx速度处理运量守恒
        var Amass = 3.0 / 4.0 * this.a.r * this.a.r * this.a.r;
        var Bmass = 3.0 / 4.0 * this.b.r * this.b.r * this.b.r;
        var vdx = vxA - vxB;
        var vxAFinal = ((Amass - Bmass) * vxA + 2 * Bmass * vxB) / (Amass + Bmass);
        var vxBFinal = vxAFinal + vdx;
 
        //相对位置处理
        xA += vxAFinal;
        xB += vxBFinal;
 
        //处理完了,再旋转回去
        //先处理坐标位置
        var xAFinal: number = xA * cos - yA * sin;
        var yAFinal: number = yA * cos + xA * sin;
        var xBFinal: number = xB * cos - yB * sin;
        var yBFinal: number = yB * cos + xB * sin;
 
        //处理最终的位置变化
        this.b.x = this.a.x + xBFinal;
        this.b.y = this.a.y + yBFinal;
        this.a.x += xAFinal;
        this.a.y += yAFinal;
 
        //再处理速度
        this.a.direction.x = vxAFinal * cos - vyA * sin;
        this.a.direction.y = vyA * cos + vxAFinal * sin;
        this.b.direction.x = vxBFinal * cos - vyB * sin;
        this.b.direction.y = vyB * cos + vxBFinal * sin;
    }
}

function Cir2Cir(a: Circle, b: Circle):number {
    var len = new Vector2(a.x - b.x, a.y - b.y);
    return (a.r + b.r) - len.length;
}
