
var heros: Circle[] = new Array();
var ps: Polygon[] = new Array();
var ctx: CanvasRenderingContext2D;
var canvas: HTMLCanvasElement;
var handle = 0;
var c_width;
var c_height;
var fps;
var graphC: GraphConstructor = new GraphConstructor;
//var coll: boolean[][] = new Array();
window.onload = () => {
    main();
    return;
}

window.onclick = function (e) {
    //createHero(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    createPolygon(4, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function createPolygon(num: number, x: number, y: number) {
    var polygon = graphC.createPolygen(num, x, y);
    ps.push(polygon);
}

function cancelPolygon() {

}