
var heros: Circle[] = new Array();
var ctx: CanvasRenderingContext2D;
var handle = 0;
var c_width;
var c_height;
window.onload = () => {
    main();
    return;
}


window.onclick = function(e) {
    createHero(e.clientX, e.clientY);
}

function createHero(xx: number = -1, yy: number = -1) {
    var r = Random.range(10, 50);
    var setX = Random.range(0, 100);
    var setY = Math.sqrt(10000 - setX * setX);
    if (Random.range(0, 1) == 0) setX = -setX;
    if (Random.range(0, 1) == 0) setY = -setY;
    var sp = Random.range(1, 5);
    var x = xx < 0 ? Random.range(r, c_width - r) : xx;
    var y = yy < 0 ? Random.range(r, c_height - r) : yy;
    var hero = new Circle(x, y, r, new Vector2(setX, setY), sp);
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
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('gameCanvas');
    c_height = canvas.height;
    c_width = canvas.width;
    ctx = canvas.getContext("2d");
    createHero();
    loop();
}
