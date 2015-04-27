

function createPolygonHero(num: number, x: number, y: number) {
   // if (x < 0 || y < 0) return;
   // if (x > c_width || y > c_height) return;
    if (x == -1 || y == -1) {
        x = Random.range(20, c_width - 20);
        y = Random.range(20, c_height - 20);
    }
    var polygon = graphC.createPolygen(num, x, y, 20);
    polygons.push(polygon);
}

function createPolygon() {
    var num = Number(document.getElementById("Polygonnumber").value);
    var sp = Number(document.getElementById("Polygonspeed").value);
    //速度暂时不做
    for (var i = 0; i < num; i++)createPolygonHero(5, -1, -1);
}

function cancelPolygon() {
    var num: number = Number(document.getElementById("Polygonnumber").value);
    for (var i = 0; i < num; i++) {
        if (polygons.length == 0) break;
        polygons.pop();
    }
}
