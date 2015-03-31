

function Cir2Cir(a: Circle, b: Circle):number {
    var len = new Vector2(a.x - b.x, a.y - b.y);
    return (a.r + b.r) - len.length;
}