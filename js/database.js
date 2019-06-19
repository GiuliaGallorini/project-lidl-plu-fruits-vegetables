const arrayFruitsAndVegs = [
  { name: "apple", emoji: "🍎", missingPlu: "200", image: createImage("./images/items/apple.png") },
  { name: "banana", emoji: "🍌", missingPlu: "210", image: createImage("./images/items/banana.png") },
  { name: "kiwi", emoji: "🥝", missingPlu: "220", image: createImage("./images/items/kiwi.png") },
  { name: "carrot", emoji: "🥕", missingPlu: "300", image: createImage("./images/items/carrot.png") },
  { name: "broccoli", emoji: "🥦", missingPlu: "310", image: createImage("./images/items/broccoli.png") },
  { name: "eggplant", emoji: "🍆", missingPlu: "320", image: createImage("./images/items/eggplant.png") },
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
