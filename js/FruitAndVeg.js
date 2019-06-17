class FruitAndVeg {
    constructor() {
      this.radius = 40;
      this.x = CANVAS_WIDTH
      this.y = this.radius + Math.floor((CANVAS_HEIGHT - 2 * this.radius) * Math.random());
      this.vx = FRUIT_AND_VEG_SPEED; // Velocity x
      this.score = 0;
      this.item = randomFruitAndVeg(arrayFruitsAndVegs).emoji;
    }
    
    draw(ctx) {
      ctx.save(); // Save the current context state
  
    ctx.fillStyle = "green";
    ctx.lineWidth = 5;
  
      // Draw the circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    
  
      // Draw the text
      ctx.fillStyle = "black";
      ctx.font = this.radius + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.item, this.x, this.y + 3);
  
      ctx.restore(); // Restore the context state from the begining
    }
    update() {
      this.x -= this.vx;
    }
  }