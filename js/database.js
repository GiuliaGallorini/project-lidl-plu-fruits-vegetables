const arrayFruitsAndVegs = [
  { name: "apple", emoji: "🍎", missingPlu: "200", image: createImage("images/apple.png") },
  { name: "banana", emoji: "🍌", missingPlu: "210", image: createImage("images/banana.png") },
  { name: "carrot", emoji: "🥕", missingPlu: "300" },
  { name: "broccoli", emoji: "🥦", missingPlu: "310" }
];

function createImage(src) {
  let img = new Image();
  img.src = src;
  return img;
}

// arrayFruitsAndVegs[0] => {name: "apple", missingPlu: "200"}
// arrayFruitsAndVegs[0].name => "apple"

function randomFruitAndVeg(array) {
  let randomIndex = Math.floor(Math.random() * arrayFruitsAndVegs.length);
  return array[randomIndex];
}
