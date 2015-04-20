
function createCircleHero(xx: number = -1, yy: number = -1) {
    if (xx < -1 || xx > c_width) return;
    if (yy < -1 || yy > c_height) return;
    var sp: number;
    var r: number;
    // var sp = Number(document.getElementById("Circlespeed").value);
    // var r = Number(document.getElementById("Circler").value);
    var setX = Math.random();
    var setY = Math.sqrt(1.0 - setX * setX);
    if (Random.range(0, 1) == 0) setX = -setX;
    if (Random.range(0, 1) == 0) setY = -setY;
    if (sp == -1) sp = Random.range(1, 5); 
    if (r == -1) r = Random.range(10, 50);
    var x = xx < 0 ? Random.range(r, c_width - r) : xx;
    var y = yy < 0 ? Random.range(r, c_height - r) : yy;
    var hero = new Circle(x, y, r, new Vector2(setX * sp, setY * sp));
   // heros.push(hero);
}

function createCircle() {
    var num: number;
   // num = Number(document.getElementById("Circlenumber").value);
    //console.log(num, sp);
    for (var i = 0; i < num; i++)createCircleHero(-1, -1);
}