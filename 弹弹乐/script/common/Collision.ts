

function Cir2Cir(a: Circle, b: Circle):boolean {
    var len = new Vector2(a.x - b.x, a.y - b.y);
    if (len.length2 <= (a.r + b.r) * (a.r + b.r)){
        return true;
    } else {
        return false;
    }
}