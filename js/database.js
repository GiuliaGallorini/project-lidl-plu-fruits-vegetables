const arrayFruitsAndVegs = [
  { name: "apple", emoji: "🍎", missingPlu: "200", image: createImage("./images/apple.png") },
  { name: "banana", emoji: "🍌", missingPlu: "210", image: createImage("./images/banana.png") },
  { name: "kiwi", emoji: "🥝", missingPlu: "220", image: createImage("./images/kiwi.png") },
  { name: "carrot", emoji: "🥕", missingPlu: "300", image: createImage("./images/carrot.png") },
  { name: "broccoli", emoji: "🥦", missingPlu: "310", image: createImage("./images/broccoli.png") },
  { name: "eggplant", emoji: "🍆", missingPlu: "320", image: createImage("./images/eggplant.png") },
];

function createImage(src) {
  let img = new Image();
  img.src = src;
  return img;
}

function randomFruitAndVeg(array) {
  let randomIndex = Math.floor(Math.random() * nbOfItems);
  return array[randomIndex];
}
