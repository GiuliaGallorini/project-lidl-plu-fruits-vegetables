// Player should be a frame where to type the three-digits number corresponding to the item.

class Player {
    constructor() {
      this.x = 0;
      this.y = 500;
      this.w = 300;
      this.h = 100;
      this.score = 0;
    }
    draw(ctx) {
      ctx.save();


      ctx.fillStyle = "rgb(10, 30, 104, 0.7)";
      ctx.lineWidth = 3;
  
      // Draw the rectangle
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.w, this.h);
      ctx.fill();
      ctx.stroke();
  
      ctx.restore();
    }
    update() {}
  }