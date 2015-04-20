


class GraphConstructor {

    public createPolygen(num: number, x: number, y: number, step: number = 10): Polygon {
        var dir = new Vector2(0, 0);
        var po: Point[] = new Array();
        po.push(new Point(x, y));
        po.push(new Point(x + step*2, y));
        po.push(new Point(x + step * 2, y + step * 2));
        if (num == 3) return new Polygon(po, dir);
        po.push(new Point(x , y + step * 2));
        if (num == 4) return new Polygon(po, dir);
        po.push(new Point(x - step, y + step));
        if (num == 5) return new Polygon(po, dir);
    }
    public createCircle(num:number,speed:number) {

    }
}