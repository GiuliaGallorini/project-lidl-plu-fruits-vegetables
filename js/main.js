const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// // To test if the files are connected
// ctx.fillRect(500, 300, 50, 50);

// Constants
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const FRUIT_AND_VEG_SPEED = 5;
const FRAMES_BETWEEN_FRUIT_AND_VEG = 180;

// Global variables
let frame = 0; // The frame counter
let player = new Player();
let fruitAndVegs = [];
let bg = new Background();

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

  bg.draw(ctx);

  player.draw(ctx);

  // Draw all fruitAndVegs
  for (let i = 0; i < fruitAndVegs.length; i++) {
    fruitAndVegs[i].draw(ctx);
  }
}

// updateEverything update variables
// It shouldn't draw on the canvas
function updateEverything() {
  frame++;

  bg.update();

  // Create new FruitAndVeg every FRAMES_BETWEEN_FRUIT_AND_VEG frames
  if (frame % FRAMES_BETWEEN_FRUIT_AND_VEG === 0) {
    fruitAndVegs.push(new FruitAndVeg());
  }

  player.update();

  // Update all fruitAndVegs and check for collision
  for (let i = fruitAndVegs.length - 1; i >= 0; i--) {
    fruitAndVegs[i].update();

    if (checkCollision(fruitAndVegs[i])) {
      player.score--; // The score decrease -1
      fruitAndVegs.splice(i, 1);
    }

    // // I DO NOT NEED A COLLISION LIKE THIS!!!
    // if (checkCollision(player, fruitAndVegs[i])) {
    //   player.score += fruitAndVegs[i].score;
    //   fruitAndVegs.splice(i, 1);
    // }

    function checkCollision(fruitAndVegs) {
      if (fruitAndVegs.x === 0) return true;
    }
  }

  removeUselessFruitAndVegs();
}

function removeFruitAndVegsWithPlu(typedNumber) {
  for (let i = fruitAndVegs.length - 1; i >= 0; i--) {
    if (fruitAndVegs[i].item.missingPlu === typedNumber) {
      fruitAndVegs.splice(i, 1);
      player.score += 2; // The score increase +2
    }
  }
}

// // I DO NOT NEED A FUNCTION DISTANCE!!!
// function distance(a, b) {
//   return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
// }

// // I DO NOT NEED A COLLISION LIKE THIS!!!
// // Return true when player and fruitAndVeg are colliding
// function checkCollision(player, fruitAndVeg) {
//   return distance(player, fruitAndVeg) < player.radius + fruitAndVeg.radius;
// }

function removeUselessFruitAndVegs() {
  // TODO: change the code to decrease the score when an element is destroyed
  fruitAndVegs = fruitAndVegs.filter(fruitAndVeg => {
    return fruitAndVeg.x + fruitAndVeg.radius > 0;
  });
}

// Listen for key events
window.onkeydown = e => {
  if (player.typedNumber.length < 3 && "0" <= e.key && e.key <= "9") {
    player.typedNumber += e.key;
  }
  if (e.key === "Backspace") {
    player.typedNumber = player.typedNumber.substr(
      0,
      player.typedNumber.length - 1
    );
  }
  if (e.key === "Enter") {
    removeFruitAndVegsWithPlu(player.typedNumber);
    player.typedNumber = "";
  }
};

// Listen for button events (cd. INPUT MASK)
document.querySelectorAll(".digits button").forEach($button => {
  $button.onclick = () => {
    let content = $button.innerHTML;
    console.log(content);
    // // TODO: remove the next line and write the code so it works also for "Back" and "Enter"
    if (content === "Enter") {
      removeFruitAndVegsWithPlu(player.typedNumber);
      player.typedNumber = "";
    } else if (content === "Back") {
      player.typedNumber = player.typedNumber.substr( 0, player.typedNumber.length - 1);
    } else {
      player.typedNumber += content;
    }
  }
})

// document.getElementsByClassName("btn-enter").replaceWith( removeFruitAndVegsWithPlu(player.typedNumber))
// player.typedNumber = "";

// ACCESSING THE DOM OBJECT
// let $button = document.querySelectorAll(".digits button")

// .querySelectorAll - give me an array

// the .forEach method iterates through all the elements of an array, and FOR EACH element in the array, it will call another function, passing in it each element, one by one.

// ONCLICK EVENT
// Execute a JS function when a button is clicked, the onclick event occurs when the user clicks on an element
