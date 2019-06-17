const arrayFruitsAndVegs = [
    {name: "apple", emoji: "🍎", missingPlu: "200"},
    {name: "banana", emoji: "🍌", missingPlu: "210"},
    {name: "carrot", emoji: "🥕", missingPlu: "300"},
    {name: "broccoli", emoji: "🥦", missingPlu: "310"},
];

// arrayFruitsAndVegs[0] => {name: "apple", missingPlu: "200"}
// arrayFruitsAndVegs[0].name => "apple"


function randomFruitAndVeg (array) {
    let randomIndex = Math.floor(Math.random()* arrayFruitsAndVegs.length)
    return array[randomIndex]
}
