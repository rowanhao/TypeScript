
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
    var r = Random.range(10, 100);

    var setX = Math.random();
    var setY = Math.sqrt(1.0 - setX * setX);
    if (Random.range(0, 1) == 0) setX = -setX;
    if (Random.range(0, 1) == 0) setY = -setY;
    var sp = Random.range(5, 5);
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
                //if (coll[i][j] == true) continue;
                var m1 = hero.r * hero.r * hero.r * 4 / 3;
                var m2 = hero2.r * hero2.r * hero2.r * 4 / 3;

                var energyBefor = hero.direction.length * m1 + hero2.direction.length * m2;

                //相撞之后的处理规则：
                //两个圆球相撞后，会根据两个圆球的质量，即r*r*r的大小来分配力量
                var fa: Vector2 = hero.direction;
                var fb: Vector2 = hero2.direction;
                var ab: Vector2 = new Vector2(hero2.x - hero.x, hero2.y - hero.y);
                var ba: Vector2 = new Vector2(hero.x - hero2.x, hero.y - hero2.y);
                //fa对ab向量的投影
                var aleft: Vector2 = fa.clone().face(ab);
                var bleft: Vector2 = fb.clone().face(ba);
                //fa对ab法向量的投影
                var alast: Vector2 = fa.clone().minus(aleft);
                var blast: Vector2 = fb.clone().minus(bleft);

                var v1 = fa.length;
                var v2 = fb.length;

                var vv1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
                var vv2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);

                var aa = ba.clone().normalize().scale(vv1).add(alast);
                var bb = ab.clone().normalize().scale(vv2).add(blast);

                var energyAfter = m1 * aa.length + m2 * bb.length;

                aa.scale(energyBefor / energyAfter);
                bb.scale(energyBefor / energyAfter);

                hero.direction = aa;
                hero2.direction = bb;
            //    coll[i][j] = true;
            //} else {
            //    coll[i][j] = false;
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
