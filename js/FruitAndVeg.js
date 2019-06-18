class FruitAndVeg {
  constructor() {
    this.radius = 40;
    this.x = CANVAS_WIDTH + this.radius;

    let possibleYs = [150, 250, 350]
    this.y = possibleYs[Math.floor(possibleYs.length * Math.random())]
    this.score = 0;
    this.item = randomFruitAndVeg(arrayFruitsAndVegs);
  }

  draw(ctx) {
    ctx.save(); // Save the current context state

    ctx.fillStyle = "rgb(128, 226, 108, 0.5)";
    ctx.lineWidth = 1;

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
    ctx.fillText(this.item.emoji, this.x, this.y + 3);

    // TODO: use drawImage()

    ctx.restore(); // Restore the context state from the begining
  }
  update() {
    this.x -= speed;
  }
}
