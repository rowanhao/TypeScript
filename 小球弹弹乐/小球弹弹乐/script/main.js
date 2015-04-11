var heros = new Array();
var ps = new Array();
var ctx;
var canvas;
var handle = 0;
var c_width;
var c_height;
var fps;
var graphC = new GraphConstructor;

//var coll: boolean[][] = new Array();
window.onload = function () {
    main();
    return;
};

window.onclick = function (e) {
    //createHero(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    createPolygon(4, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
};

function createHero(xx, yy) {
    if (typeof xx === "undefined") { xx = -1; }
    if (typeof yy === "undefined") { yy = -1; }
    if (xx < -1 || xx > c_width)
        return;
    if (yy < -1 || yy > c_height)
        return;
    var sp = Number(document.getElementById("Circlespeed").value);
    var r = Number(document.getElementById("Circler").value);
    var setX = Math.random();
    var setY = Math.sqrt(1.0 - setX * setX);
    if (Random.range(0, 1) == 0)
        setX = -setX;
    if (Random.range(0, 1) == 0)
        setY = -setY;
    if (sp == -1)
        sp = Random.range(1, 5);
    if (r == -1)
        r = Random.range(10, 50);
    var x = xx < 0 ? Random.range(r, c_width - r) : xx;
    var y = yy < 0 ? Random.range(r, c_height - r) : yy;
    var hero = new Circle(x, y, r, new Vector2(setX * sp, setY * sp));
    heros.push(hero);
}

function createCircle() {
    var num = Number(document.getElementById("Circlenumber").value);

    for (var i = 0; i < num; i++)
        createHero(-1, -1);
}

function cancelCircle() {
    var num;
    num = Number(document.getElementById("Circlenumber").value);
    for (var i = 0; i < num; i++) {
        if (heros.length == 0)
            break;
        heros.pop();
    }
}

function createPolygon(num, x, y) {
    var polygon = graphC.createPolygen(num, x, y);
    ps.push(polygon);
}

function cancelPolygon() {
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
        hero.x = Math.max(Math.min(c_width - hero.r, hero.x), hero.r);
        hero.y = Math.max(Math.min(c_height - hero.r, hero.y), hero.r);
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
    fps++;
    collision();
    ctx.clearRect(0, 0, c_width, c_height);
    heros.forEach(function (v, i, a) {
        return v.draw(ctx);
    });
    ps.forEach(function (v, i, a) {
        return v.draw(ctx);
    });
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ff0000";
    ctx.font = "20px Arial lighter";
    ;
    ctx.strokeText("总帧数：" + fps, 0, 40);
    ctx.strokeText("共有球体：" + heros.length, 0, 80);
    heros.forEach(function (v, i, a) {
        return v.move();
    });
    handle = window.requestAnimationFrame(loop);
}
function main() {
    fps = 0;
    canvas = document.getElementById('gameCanvas');
    c_height = canvas.height;
    c_width = canvas.width;
    ctx = canvas.getContext("2d");
    createHero();
    loop();
}
//# sourceMappingURL=main.js.map
