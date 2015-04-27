var polygons: Polygon[] = new Array();
var circles: Circle[] = new Array();
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
        for (var i = 0; i < polygons.length; i++) {
            polygons[i].IsSelected(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
        for (var i = 0; i < circles.length; i++) {
            circles[i].IsSelected(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }
        mouse_down_flag = true;
        mouse_x = e.clientX;
        mouse_y = e.clientY;
    }
}

window.onmouseup = function (e) {
    if (mouse_down_flag) {
        for (var i = 0; i < polygons.length; i++) {
            polygons[i].clearSelected()
        }
        for (var i = 0; i < circles.length; i++) {
            circles[i].clearSelected()
        }
        mouse_down_flag = false;
    }
}

window.onmousemove = function (e) {
    if (mouse_down_flag) {
        for (var i = 0; i < polygons.length; i++) {
            if (polygons[i].flag_select) {
                polygons[i].movexy(e.clientX - mouse_x, e.clientY - mouse_y);
            }
        }
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].flag_select) {
                circles[i].movexy(e.clientX - mouse_x, e.clientY - mouse_y);
            }
        }
        mouse_x = e.clientX;
        mouse_y = e.clientY;
    }
}



function collision():number {
    var ans: number = 0;
    for (var i = 0; i < polygons.length; i++) {
        var polygon: Polygon = polygons[i];
        for (var j = i + 1; j < polygons.length; j++) {
            var polygon2: Polygon = polygons[j];
            var cha = Polygon2Polygon(polygon, polygon2);
            if (cha == true) {
                ans++;
            }
        }
    }
    return ans;
}

function loop() {
    fps++;
    ctx.clearRect(0, 0, c_width, c_height);

    polygons.forEach((v, i, a) => v.draw(ctx));
    circles.forEach((v, i, a) => v.draw(ctx));

    var myDate = new Date();
    var startDate: number = myDate.getTime();
    var collisionFlag: String = collision().toString();
    myDate = new Date();
    var useTime: number = myDate.getTime() - startDate;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ff0000";
    ctx.font = "20px Arial lighter";;
    ctx.strokeText("总帧数：" + fps, 0, 40);
    ctx.strokeText("圆形数量：" + circles.length, 0, 80);
    ctx.strokeText("多边形数量：" + polygons.length, 0, 120);
    ctx.strokeText("目前碰撞对数：" + collisionFlag, 0, 160);
    ctx.strokeText("目前单次检测时间： " + useTime + " ms", 0, 200);

    polygons.forEach((v, i, a) => v.move());
    circles.forEach((v, i, a) => v.move());

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
