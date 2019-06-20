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
let page = "home"; // Possible values: "home", "play", "instructions", "game-over", "you-won"
let showInfo = false;
let showInfoCounter = 0;
let nbOfItems; // The value will be added later
let speed; // The value will be added later

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
  ctx.fillStyle = "rgb(24, 82, 34, 0.3)"; // color of the background of the canvas
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#fefafa"; // color of the written
  ctx.textAlign = "center";
  ctx.font = "80px Permanent Marker";
  ctx.fillText("PLU FRUITS & VEGS", CANVAS_WIDTH / 2, 250);
  ctx.font = "50px Permanent Marker";
  ctx.fillText("< Click to start >", CANVAS_WIDTH / 2, 400);
  ctx.restore();
}

function drawInstructions(ctx) {
  ctx.save();
  ctx.fillStyle = "rgb(24, 82, 34, 0.3)"; // color of the background of the canvas
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#fefafa"; // color of the written
  ctx.textAlign = "center";
  ctx.font = "80px Permanent Marker";
  ctx.fillText("Instructions", CANVAS_WIDTH / 2, 100);
  ctx.font = "30px Roboto";
  ctx.fillText("Each variety of fruit and vegetable corresponds to a PLU code.", CANVAS_WIDTH/2, 200, 900);
  ctx.fillText("Press <spacebar> or <i> to learn the corresponding PLU.", CANVAS_WIDTH/2, 250, 900);
  ctx.fillText("Digit the right PLU code and press <enter> to submit,", CANVAS_WIDTH/2, 300, 900);
  ctx.fillText("or press <back> to cancel.", CANVAS_WIDTH/2, 350, 900);
  ctx.fillText("Improve the level to test your knowledge!", CANVAS_WIDTH/2, 400, 900);
  ctx.fillText("Have fun!", CANVAS_WIDTH/2, 450, 900);
  ctx.font = "40px Permanent Marker";
  ctx.fillText("< Click to play >", CANVAS_WIDTH/2, 550, 900);
  ctx.restore();
}

function drawGameOver(ctx) {
  ctx.save();
  ctx.fillStyle = "rgb(24, 82, 34, 0.3)"; // color of the background of the canvas
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "#fefafa";
  ctx.textAlign = "center";
  ctx.font = "100px Permanent Marker";
  ctx.fillText("Game over!", CANVAS_WIDTH / 2, 300);
  ctx.font = "50px Permanent Marker";
  ctx.fillText("< Click to restart >", CANVAS_WIDTH / 2, 500);
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
  ctx.fillStyle = "rgb(24, 82, 34, 0.3)"; // color of the background of the canvas
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "80px Permanent Marker";
  ctx.fillText("You won!", CANVAS_WIDTH / 2, 150);
  ctx.font = "50px Roboto";
  ctx.fillText(`Your score is ${player.score}.`, CANVAS_WIDTH / 2, 250);
  // if showInfoCounter > 1  
  ctx.fillText(`You asked for help ${showInfoCounter} times.`, CANVAS_WIDTH / 2, 350);
  // if showInfoCounter === 0 
  // ctx.fillText(`You never asked for help!!!`, CANVAS_WIDTH / 2, 350);
  // if showInfoCounter === 1
  // ctx.fillText(`You asked for help only once!`, CANVAS_WIDTH / 2, 350);
  ctx.font = "50px Permanent Marker";
  ctx.fillText("< Click to play again >", CANVAS_WIDTH / 2, 450);
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
    page = "game-over"; // To define WHEN YOU LOSE
  }
  if (player.score >= 6) {
    page = "you-won"; // To define WHEN YOU WIN
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
