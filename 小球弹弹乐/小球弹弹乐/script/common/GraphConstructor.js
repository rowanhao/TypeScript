var GraphConstructor = (function () {
    function GraphConstructor() {
    }
    GraphConstructor.prototype.createPolygen = function (num, x, y) {
        var dir = new Vector2(0, 0);
        var po = new Array();
        po.push(new Point(x, y));
        po.push(new Point(x + 10, 0));
        po.push(new Point(x + 10, y + 10));
        if (num == 3)
            return new Polygon(po, dir);
        po.push(new Point(x + 5, y + 15));
        if (num == 4)
            return new Polygon(po, dir);
        po.push(new Point(x, y + 10));
        if (num == 5)
            return new Polygon(po, dir);
    };
    GraphConstructor.prototype.createCircle = function (num, speed) {
    };
    return GraphConstructor;
})();
//# sourceMappingURL=GraphConstructor.js.map
