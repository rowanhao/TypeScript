

class Shape {
    direction: Vector2;
    flag_select: boolean;
    type: String = "shape";
    constructor(dir: Vector2 = new Vector2(0, 1)) {
        this.direction = dir;
        this.flag_select = false;
    }
    draw(canvas: CanvasRenderingContext2D) { }
    move(step: number = 1) { }
}