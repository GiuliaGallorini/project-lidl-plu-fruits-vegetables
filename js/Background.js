class Background {
  constructor() {
    this.x = CANVAS_WIDTH;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, CANVAS_WIDTH, 100);
    ctx.fillRect(0, 200, CANVAS_WIDTH, 100);
    ctx.fillRect(0, 400, CANVAS_WIDTH, 100);
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x, 0);
    ctx.lineTo(this.x, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 500, 0);
    ctx.lineTo(this.x + 500, 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x + 1000, 0);
    ctx.lineTo(this.x + 1000, 100);
    ctx.stroke();
    ctx.restore();
  }
  update() {
    this.x -= FRUIT_AND_VEG_SPEED;
  }
}
