const $canvas = document.querySelector("canvas");
const $selectLevel = document.querySelector("select[name=level]");
const $nbOfItems = document.querySelector(".nbOfItems");
const $speed = document.querySelector(".speed");
const ctx = $canvas.getContext("2d");

// Constants
const CANVAS_WIDTH = $canvas.width;
const CANVAS_HEIGHT = $canvas.height;
const FRAMES_BETWEEN_FRUIT_AND_VEG = 180;
const DEBUG = false;

// Global variables
let frame = 0; // The frame counter
let player = new Player();
let fruitAndVegs = [];
let bg = new Background();
let page = "home"; // Possible values: "home", "play", "instructions", "game-over"
let showInfo = false;
let showInfoCounter = 0;
let nbOfItems; // could it be zero?
let speed; // could it be zero?

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

  if (page === "home") {
    drawHome(ctx);
  }
  if (page === "instructions") {
    drawInstructions(ctx);
  }
  if (page === "play") {
    bg.draw(ctx);

    player.draw(ctx);

    // Draw all fruitAndVegs
    for (let i = 0; i < fruitAndVegs.length; i++) {
      fruitAndVegs[i].draw(ctx);
    }
  }
  if (page === "game-over") {
    drawGameOver(ctx);
  }
  if (page === "you-won") {
    drawYouWon(ctx);
  }
}

function drawHome(ctx) {
  ctx.save();
  ctx.fillStyle = "rgb(229, 213, 202, 0.1)"; // color of the background of the canvas
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#1b1727"; // color of the written
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillText("Game!", CANVAS_WIDTH / 2, 200);
  ctx.fillText("Click to start", CANVAS_WIDTH / 2, 300);
  ctx.restore();
}

function drawInstructions(ctx) {
  ctx.save();
  ctx.fillStyle = "rgb(229, 213, 202, 0.1)"; // color of the background of the canvas
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#1b1727"; // color of the written
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillText("Instructions", CANVAS_WIDTH / 2, 200);
  ctx.fillText("Click to play", CANVAS_WIDTH / 2, 300);
  ctx.restore();
}

function drawGameOver(ctx) {
  ctx.save();
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillText("Game over!", CANVAS_WIDTH / 2, 200);
  ctx.fillText("Click to restart", CANVAS_WIDTH / 2, 300);
  ctx.restore();
}

function drawInfo() {
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillText("Informations", CANVAS_WIDTH / 2, 100);
  ctx.textAlign = "left";
  ctx.fillText("Apple = 200", 50, 200);
  ctx.fillText("Banana = 210", 50, 250);
  ctx.restore();
}

function drawYouWon() {
  ctx.save();
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillText("You won!", CANVAS_WIDTH / 2, 150);
  ctx.fillText(`Your score is ${player.score}`, CANVAS_WIDTH / 2, 250);
  ctx.fillText(`You asked for help only ${showInfoCounter} times`, CANVAS_WIDTH / 2, 350);
  ctx.fillText("Click to play again", CANVAS_WIDTH / 2, 450);
  ctx.restore();
}

// updateEverything update variables
// It shouldn't draw on the canvas
function updateEverything() {
  if (page === "play") {
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
    }
  }
  if (player.score <= -5) {
    page = "game-over";
  }
  if (player.score >= 6) {
    page = "you-won";
  }
}

function checkCollision(fruitAndVegs) {
  return fruitAndVegs.x + fruitAndVegs.radius < 0;
}

function removeFruitAndVegsWithPlu(typedNumber) {
  for (let i = fruitAndVegs.length - 1; i >= 0; i--) {
    if (fruitAndVegs[i].item.missingPlu === typedNumber) {
      fruitAndVegs.splice(i, 1);
      player.score += 2; // The score increase +2
    }
  }
}

function changeLevel(level) {
  if (level === 1) {
    nbOfItems = 2;
    speed = 2;
  } else if (level === 2) {
    nbOfItems = 4;
    speed = 3;
  } else {
    nbOfItems = 6;
    speed = 4;
  }

  $nbOfItems.innerText = nbOfItems;
  $speed.innerText = speed;
}
changeLevel(1); // => To use by default level 1

function startGame() {
  page = "play";
  frame = 0; // The frame counter
  player = new Player();
  fruitAndVegs = [];
  showInfo = false;
  showInfoCounter = 0;
}

// Listen for key events
window.onkeydown = e => {
  if (
    !showInfo &&
    player.typedNumber.length < 3 &&
    "0" <= e.key &&
    e.key <= "9"
  ) {
    player.typedNumber += e.key;
  }
  if (!showInfo && e.key === "Backspace") {
    player.typedNumber = player.typedNumber.substr(
      0,
      player.typedNumber.length - 1
    );
  }
  if (!showInfo && e.key === "Enter") {
    removeFruitAndVegsWithPlu(player.typedNumber);
    player.typedNumber = "";
  }
  if (e.key === "i" || e.key === " ") {
    showInfo = !showInfo;
    if (showInfo) showInfoCounter++;
  }
};

// Listen for button events (cd. INPUT MASK)
document.querySelectorAll(".digits button").forEach($button => {
  $button.onclick = () => {
    if (!showInfo) {
      let content = $button.innerHTML;
      console.log(content);
      if (content === "Enter") {
        removeFruitAndVegsWithPlu(player.typedNumber);
        player.typedNumber = "";
      } else if (content === "Back") {
        player.typedNumber = player.typedNumber.substr(
          0,
          player.typedNumber.length - 1
        );
      } else {
        player.typedNumber += content;
      }
    }
  };
});

document.querySelector(".digits button.show-info").onclick = $button => {
  showInfo = !showInfo;
  if (showInfo) showInfoCounter++;
};

$canvas.onclick = () => {
  if (page === "home") {
    page = "instructions";
  } else if (page === "instructions") {
    startGame();
  } else if (page === "game-over") {
    startGame();
  } else if (page === "you-won") {
    startGame();
  }
};

$selectLevel.onchange = () => {
  changeLevel(Number($selectLevel.value));
};
