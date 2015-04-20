

function createPolygonHero(num: number, x: number, y: number) {
    if (x < 0 || y < 0) return;
    if (x > c_width || y > c_height) return;
    var polygon = graphC.createPolygen(num, x, y, 20);
    heros.push(polygon);
}
