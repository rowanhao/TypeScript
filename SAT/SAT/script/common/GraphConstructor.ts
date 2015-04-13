


class GraphConstructor {

    public createPolygen(num: number, x: number, y: number): Polygon {
        var dir = new Vector2(0, 0);
        var po: Point[] = new Array();
        po.push(new Point(x, y));
        po.push(new Point(x + 10, 0));
        po.push(new Point(x + 10, y + 10));
        if (num == 3) return new Polygon(po, dir);
        po.push(new Point(x + 5, y + 15));
        if (num == 4) return new Polygon(po, dir);
        po.push(new Point(x, y + 10));
        if (num == 5) return new Polygon(po, dir); 
    }
    public createCircle(num:number,speed:number) {

    }
}