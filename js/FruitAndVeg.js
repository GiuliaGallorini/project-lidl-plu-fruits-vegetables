class FruitAndVeg {
    constructor() {
      this.radius = 40;
      this.x =
        this.radius +
        Math.floor((CANVAS_WIDTH - 2 * this.radius + 1) * Math.random());
      this.y = -this.radius - 10;
      this.score = Math.floor(Math.random() * 201) - 100; // Random score between -100 and 100 (included)
      this.vy = FRUIT_AND_VEG_SPEED; // Velocity y
    }
    draw(ctx) {
      ctx.save(); // Save the current context state
  
      if (this.score < 0) ctx.fillStyle = "red";
      if (this.score === 0) ctx.fillStyle = "gold";
      if (this.score > 0) ctx.fillStyle = "green";
  
      ctx.lineWidth = 5;
  
      // Draw the circle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
  
      // Draw the text
      ctx.fillStyle = "white";
      ctx.font = this.radius + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.score, this.x, this.y + 3);
  
      ctx.restore(); // Restore the context state from the begining
    }
    update() {
      this.y += this.vy;
    }
  }