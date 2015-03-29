
var heros: Circle[] = new Array();
var ctx: CanvasRenderingContext2D;
var canvas: HTMLCanvasElement;
var handle = 0;
var c_width;
var c_height;

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
    var sp = Random.range(1, 5);
    var x = xx < 0 ? Random.range(r, c_width - r) : xx;
    var y = yy < 0 ? Random.range(r, c_height - r) : yy;
    var hero = new Circle(x, y, r, new Vector2(setX * sp, setY * sp));
    heros.push(hero);
}

function collision() {

    heros.forEach((hero, i, a) => {
        if (hero.x - hero.r <= 0 || hero.x + hero.r >= c_width) {
            hero.direction.x = -hero.direction.x;
        }

        if (hero.y - hero.r <= 0 || hero.y + hero.r >= c_height) {
            hero.direction.y = -hero.direction.y;
        }
        heros.forEach((hero2, i, a) => {
            if (Cir2Cir(hero, hero2)) {
                //相撞之后的处理规则：
                //两个圆球相撞后，会根据两个圆球的质量，即r*r的大小来分配力量
                var fa: Vector2 = hero.direction;
                var fb: Vector2 = hero2.direction;
                var ab: Vector2 = new Vector2(hero2.x - hero.x, hero2.y - hero.y);
                var ba: Vector2 = new Vector2(hero.x - hero2.x, hero.y - hero2.y);
                var aleft: Vector2 = fa;
                var bleft: Vector2 = fb;
                var alast: Vector2 = fa;
                var blast: Vector2 = fb;
                aleft.face(ab);
                bleft.face(ba);

                alast.minus(aleft);
                blast.minus(bleft);
                

            }
        })
    })
}

function loop() {
    ctx.clearRect(0, 0, c_width, c_height);
    heros.forEach((v, i, a) => v.draw(ctx));
    collision();
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
