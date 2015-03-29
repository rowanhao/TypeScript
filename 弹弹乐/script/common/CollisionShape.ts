

class CollisionShape {
   direction: Vector2;
   speed: number;
   constructor(dir: Vector2 = new Vector2(0, 1), sp: number = 1) {
       this.direction = dir;
       this.speed = sp;
   }
   draw(canvas: CanvasRenderingContext2D) { }
   move() { }
}