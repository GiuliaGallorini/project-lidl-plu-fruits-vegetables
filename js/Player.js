// Player should be a frame where to type the three-digits number corresponding to the item.

class Player {
  constructor() {
    this.x = 0;
    this.y = 500;
    this.w = 300;
    this.h = 100;
    this.score = 0;
    this.typedNumber = "";
    
  }
  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "rgb(10, 30, 104, 0.7)";
    ctx.lineWidth = 3;

    // Draw the rectangle with typedNumber
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.font = "80px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.typedNumber, this.x + 80, this.y + 80);

    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("Score: " + player.score, CANVAS_WIDTH - 220, 550);

    ctx.restore();
  }
  update() {}
}
