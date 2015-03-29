

class CollisionShape {
   direction: Vector2;
   constructor(dir: Vector2 = new Vector2(0, 1)) {
       this.direction = dir;
   }
   draw(canvas: CanvasRenderingContext2D) { }
   move() { }
}