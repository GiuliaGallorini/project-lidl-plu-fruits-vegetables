const arrayFruitsAndVegs = [
  { name: "apple-red", emoji: "🍎", missingPlu: "200", image: createImage("./images/items/fruits/apple-red.png") },
  { name: "banana", emoji: "🍌", missingPlu: "210", image: createImage("./images/items/fruits/banana.png") },
  { name: "kiwi", emoji: "🥝", missingPlu: "220", image: createImage("./images/items/fruits/kiwi.png") },
  { name: "avocado", emoji: "🥑", missingPlu: "230", image: createImage("./images/items/fruits/avocado.png") },
  { name: "cucumber", emoji: "🥒", missingPlu: "300", image: createImage("./images/items/vegetables/cucumber.png") },
  { name: "salad", emoji: "🥗", missingPlu: "310", image: createImage("./images/items/vegetables/salad.png") },
  { name: "chili-pepper", emoji: "🌶", missingPlu: "320", image: createImage("./images/items/vegetables/chili-pepper.png") },
  { name: "carrot", emoji: "🥕", missingPlu: "330", image: createImage("./images/items/vegetables/carrot.png") },
  { name: "coconut", emoji: "🥥", missingPlu: "240", image: createImage("./images/items/fruits/coconut.png") },
  { name: "lemon", emoji: "🍋", missingPlu: "250", image: createImage("./images/items/fruits/lemon.png") },
  { name: "orange", emoji: "🍊", missingPlu: "260", image: createImage("./images/items/fruits/orange.png") },
  { name: "pineapple", emoji: "🍍", missingPlu: "270", image: createImage("./images/items/fruits/pineapple1.png") },
  { name: "pepper-red", emoji: "❓", missingPlu: "340", image: createImage("./images/items/vegetables/pepper-red.png") },
  { name: "pepper-yellow", emoji: "❓", missingPlu: "344", image: createImage("./images/items/vegetables/pepper-yellow.png") },
  { name: "pepper-green", emoji: "❓", missingPlu: "345", image: createImage("./images/items/vegetables/pepper-green.png") },
  { name: "tomato", emoji: "🍅", missingPlu: "350", image: createImage("./images/items/vegetables/tomato.png") },
  { name: "mandarin", emoji: "🍊", missingPlu: "265", image: createImage("./images/items/fruits/mandarin.png") },
  { name: "walnut", emoji: "🌰", missingPlu: "290", image: createImage("./images/items/fruits/walnut.png") },
  { name: "pistachio", emoji: "🥜", missingPlu: "295", image: createImage("./images/items/fruits/pistachio.png") },
  { name: "apple-golden", emoji: "🍏", missingPlu: "205", image: createImage("./images/items/fruits/apple-golden.png") },
  { name: "tomato-cherry", emoji: "🍅", missingPlu: "355", image: createImage("./images/items/vegetables/tomato-cherry.png") },
  { name: "radish", emoji: "❓", missingPlu: "360", image: createImage("./images/items/vegetables/radish.png") },
  { name: "broccoli", emoji: "🥦", missingPlu: "370", image: createImage("./images/items/vegetables/broccoli.png") },
  { name: "potato", emoji: "🥔", missingPlu: "380", image: createImage("./images/items/vegetables/potato.png") },
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
