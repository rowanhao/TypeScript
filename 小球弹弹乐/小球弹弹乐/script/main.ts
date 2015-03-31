
var heros: Circle[] = new Array();
var ctx: CanvasRenderingContext2D;
var canvas: HTMLCanvasElement;
var handle = 0;
var c_width;
var c_height;
//var coll: boolean[][] = new Array();
window.onload = () => {
    main();
    return;
}

window.onclick = function (e) {
    createHero(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function createHero(xx: number = -1, yy: number = -1) {
    if (xx < -1 || xx > c_width) return;
    if (yy < -1 || yy > c_height) return;
    var r = Random.range(10, 50);

    var setX = Math.random();
    var setY = Math.sqrt(1.0 - setX * setX);
    if (Random.range(0, 1) == 0) setX = -setX;
    if (Random.range(0, 1) == 0) setY = -setY;
    var sp = Random.range(10, 10);
    var x = xx < 0 ? Random.range(r, c_width - r) : xx;
    var y = yy < 0 ? Random.range(r, c_height - r) : yy;
    var hero = new Circle(x, y, r, new Vector2(setX * sp, setY * sp));
    //coll.push([]);
    heros.push(hero);
    //for (var i = 0; i < heros.length - 1; i++) {
    //    coll[i].push(false);
    //}
    //for (var i = 0; i < heros.length; i++) {
    //    coll[heros.length - 1].push(false);
    //}
}

function collision() {

    for (var i = 0; i < heros.length; i++) {
        var hero = heros[i];
        if (hero.x - hero.r <= 0 || hero.x + hero.r >= c_width) {
            hero.direction.x = -hero.direction.x;
        }
        if (hero.y - hero.r <= 0 || hero.y + hero.r >= c_height) {
            hero.direction.y = -hero.direction.y;
        }
        for (var j = i + 1; j < heros.length; j++) {
            var hero2 = heros[j];
            var cha = Cir2Cir(hero, hero2);
            if (cha >= 0) {
                hero.move(-(cha * 0.5) / hero.direction.length);
                hero2.move(-(cha * 0.5) / hero2.direction.length);
                var aCollision = new Cir2(hero, hero2);
                aCollision.collision();
                hero = aCollision.a;
                hero2 = aCollision.b;
            }
        }
    }
}

function loop() {
    collision();
    ctx.clearRect(0, 0, c_width, c_height);
    heros.forEach((v, i, a) => v.draw(ctx));
    heros.forEach((v, i, a) => v.move());
    handle = window.requestAnimationFrame(loop);
}
function main() {

    var content = document.getElementById('content');
    canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    c_height = canvas.height;
    c_width = canvas.width;
    ctx = canvas.getContext("2d");
    createHero();
    loop();
}
