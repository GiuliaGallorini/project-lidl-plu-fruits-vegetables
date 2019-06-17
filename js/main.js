const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// // To test if the files are connected
// ctx.fillRect(500, 300, 50, 50);

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const GRAVITY = 1;
const BOUNCING_SPEED = -25;
const FRUIT_AND_VEG_SPEED = 2;
const FRAMES_BETWEEN_FRUIT_AND_VEG = 120;
const DEBUG = false;

// Global variables
let frame = 0; // The frame counter
let player = new Player();
let fruitAndVegs = [];

function animation() {
  updateEverything();
  drawEverything(ctx);
  window.requestAnimationFrame(animation);
}
animation();

// drawEverything draws elements on the canvas
// It shouldn't modify any variable
function drawEverything(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  player.draw(ctx);

  // Draw all fruitAndVegs
  for (let i = 0; i < fruitAndVegs.length; i++) {
    fruitAndVegs[i].draw(ctx);
  }

  drawScore(ctx);
}

// updateEverything update variables
// It shouldn't draw on the canvas
function updateEverything() {
  frame++;

  // Create new FruitAndVeg every FRAMES_BETWEEN_FRUIT_AND_VEG frames
  if (frame % FRAMES_BETWEEN_FRUIT_AND_VEG === 0) {
    fruitAndVegs.push(new FruitAndVeg());
  }

  player.update();

  // Update all fruitAndVegs and check for collision
  for (let i = fruitAndVegs.length - 1; i >= 0; i--) {
    fruitAndVegs[i].update();
    if (checkCollision(player, fruitAndVegs[i])) {
      player.score += fruitAndVegs[i].score;
      fruitAndVegs.splice(i, 1);
    }
  }

  removeUselessFruitAndVegs();
}

function drawScore(ctx) {
  ctx.save();
  ctx.font = "40px Arial";
  ctx.fillText("Score: " + player.score, CANVAS_WIDTH - 220, 60);
  ctx.restore();
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

// Return true when player and fruitAndVeg are colliding
function checkCollision(player, fruitAndVeg) {
  return distance(player, fruitAndVeg) < player.radius + fruitAndVeg.radius;
}

function removeUselessFruitAndVegs() {
  fruitAndVegs = fruitAndVegs.filter(fruitAndVeg => {
    return fruitAndVeg.x - fruitAndVeg.radius - 20 < CANVAS_WIDTH;
  });
}

// Listen for key events
document.onkeydown = event => {
  console.log(event.keyCode);
  // left
  if (event.keyCode === 37) {
    player.vx = -10;
  }
  // right
  if (event.keyCode === 39) {
    player.vx = 10;
  }
};