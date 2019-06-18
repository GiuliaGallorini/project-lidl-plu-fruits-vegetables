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

    ctx.fillStyle = "rgb(19, 64, 108)";
    ctx.lineWidth = 3;

    // Draw the rectangle with typedNumber
    // ctx.fillRect(this.x, this.y, this.w, this.h); // original rectangle
    
    // Draw bigger rounded rectangle
    ctx.strokeStyle = "#465362"; // dark grey border line
    ctx.fillStyle = "#465362"; // dark grey border
    roundRect(ctx, this.x, this.y-20, this.w+20, this.h+20, 20, true);
    // Draw smaller rounded rectangle
    ctx.strokeStyle = "#011936"; // dark blue display line
    ctx.fillStyle = "#011936"; // dark blue display
    roundRect(ctx, this.x+10, this.y-10, this.w, this.h, 20, true);
    
    // Text typed by Player
    ctx.font = "80px Courier";
    ctx.fillStyle = "#C2EABD"; // tea green
    ctx.fillText(this.typedNumber, this.x + 80, this.y + 65);

    // Score
    // Draw bigger rounded rectangle
    ctx.strokeStyle = "#ED254E"; // red border line
    ctx.fillStyle = "#ED254E"; // red border
    roundRect(ctx, 680, 480, 320, 120, 20, true);
    // Draw smaller rounded rectangle
    ctx.strokeStyle = "#F9DC5C"; // yellow display line
    ctx.fillStyle = "#F9DC5C"; // yellow display
    roundRect(ctx, 690, 490, 300, 100, 20, true);

    // Text score
    ctx.fillStyle = "#ED254E";
    ctx.font = "40px Courier";
    ctx.fillText("SCORE: " + player.score, CANVAS_WIDTH - 260, 550);

    ctx.restore();
  }
  update() {}
}

// Function to draw a rounded rectangle
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}