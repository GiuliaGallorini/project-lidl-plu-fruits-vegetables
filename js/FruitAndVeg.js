class FruitAndVeg {
  constructor() {
    this.radius = 70;
    this.x = CANVAS_WIDTH + this.radius;

    let possibleYs = [150, 250, 350]
    this.y = possibleYs[Math.floor(possibleYs.length * Math.random())]
    this.score = 0;
    this.item = randomFruitAndVeg(arrayFruitsAndVegs);
  }

  draw(ctx) {
    ctx.save(); // Save the current context state

    ctx.fillStyle = "rgb(128, 226, 108, 0.1)"; // circle should disappear!!!
    // ctx.lineWidth = 1;

    // Draw the circle
    if (DEBUG) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }

    // Draw the text and image
    ctx.fillStyle = "black";
    ctx.font = this.radius + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.drawImage(this.item.image, this.x - this.radius, this.y -this.radius, 2*this.radius, 2*this.radius);
    // Text disabled in order to display the image
    // ctx.fillText(this.item.emoji, this.x, this.y + 3);
    
    // When we have the value showInfo, draw the PLU 
    if (showInfo) {
      ctx.fillStyle = "black"
      ctx.globalAlpha = 0.4
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.globalAlpha = 1
      ctx.fillStyle = "white"
      ctx.fillText(this.item.missingPlu, this.x, this.y + 3)
    }
    ctx.restore(); // Restore the context state from the beginning
  }
  update() {
    this.x -= speed;
  }
}
