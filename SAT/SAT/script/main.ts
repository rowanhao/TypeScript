
var heros: Polygon[] = new Array();
var ctx: CanvasRenderingContext2D;
var canvas: HTMLCanvasElement;
var handle = 0;
var c_width;
var c_height;
var fps;
var graphC: GraphConstructor = new GraphConstructor;
var mouse_down_flag: boolean = false;
var mouse_x: number;
var mouse_y: number;
//var coll: boolean[][] = new Array();
window.onload = () => {
    main();
    return;
}

window.onmousedown = function (e) {
    var a = document.getElementsByName("select")
    if (a.item(0).checked == true) {
        createPolygonHero(5, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
    else{
        for (var i = 0; i < heros.length; i++) {
            heros[i].IsSelected(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
        mouse_down_flag = true;
        mouse_x = e.clientX;
        mouse_y = e.clientY;
    }
}

window.onmouseup = function (e) {
    if (mouse_down_flag) {
        for (var i = 0; i < heros.length; i++) {
            heros[i].clearSelected()
        }
        mouse_down_flag = false;
    }
}

window.onmousemove = function (e) {
    if (mouse_down_flag) {
        for (var i = 0; i < heros.length; i++) {
            if (heros[i].flag_select) {
                heros[i].movexy(e.clientX - mouse_x, e.clientY - mouse_y);
            }
        }
        mouse_x = e.clientX;
        mouse_y = e.clientY;
    }
}

function cancelCircle() {
    var num: number;
   // num = Number(document.getElementById("Circlenumber").value);
    for (var i = 0; i < num; i++) {
        if (heros.length == 0) break;
        heros.pop();
    }
}


function collision():String {

    for (var i = 0; i < heros.length; i++) {
        var hero: Polygon = heros[i];
        for (var j = i + 1; j < heros.length; j++) {
            var hero2: Polygon = heros[j];
            var cha = AABB(hero, hero2);
            if (cha == true) {
                return "true";
            }
        }
    }
    return "false";
}

function loop() {
    fps++;
    ctx.clearRect(0, 0, c_width, c_height);
    heros.forEach((v, i, a) => v.draw(ctx));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ff0000";
    ctx.font = "20px Arial lighter";;
    ctx.strokeText("总帧数：" + fps, 0, 40);
    ctx.strokeText("目前碰撞状态：" + collision(), 0, 80);
    heros.forEach((v, i, a) => v.move());
    handle = window.requestAnimationFrame(loop);
}
function main() {
    fps = 0;
    canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    c_height = canvas.height;
    c_width = canvas.width;
    ctx = canvas.getContext("2d");
    loop();
}
