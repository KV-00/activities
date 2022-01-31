"use strict";

let gameState = "start";

const animals =  [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];

let bg;

let currentAnimal = ``;
let currentAnswer = ``;

let angle = 0;

function preload() {
  bg = loadImage(`assets/images/bg.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sceneManager();
}

function draw() {
  console.log(gameState);
  background(0);
  image(bg, 0, 0, width, height);

  angle += 0.002;

  if (gameState == "start") {
    textStyle(BOLD);
    textSize(128);
    fill (255, 255, 255);
    text("SLAMINA!", width / 2, height / 2);

    textSize(32);
    fill (200, 200, 200);
    textAlign(CENTER);
    rotate(angle);
    text("SAY *START* TO PLAY!", width / 2, height / 1.5);


  }

  if (gameState == "play") {
    push();
    let bgcolor = color(150, 50, 50);
    bgcolor.setAlpha(1000);
    fill(bgcolor);
    blendMode(MULTIPLY);
    rect(0, 0, width, height);
    pop();

    if (currentAnswer === currentAnimal) {
      fill (0, 255, 0);
    }
    else {
      fill (255, 0, 0);
    }
    text(currentAnswer, width / 2, height / 2);
  }


}

function sceneManager() {
  if (gameState == "start") {
      startScreen();
  }
  if (gameState == "play") {
      playScreen();
  }
}

function startScreen() {
  responsiveVoice.speak("Welcome to Slamina. Say start to begin the game");

  if (annyang) {
    if (gameState === "start"){
      let commands = {
        'start' : gameStart
      };
      annyang.addCommands(commands);
      annyang.start();
    }
  }
}

function playScreen() {
  if (annyang) {
    let commands = {
      'I think it is *animal' : guessAnimal
    };
    annyang.addCommands(commands);
    annyang.start();
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}

function gameStart() {
  gameState = "play";
  playScreen();
}

function mousePressed() {
  if (gameState === "play") {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal);
  }
  else {
    return;
  }
}

function guessAnimal(animal) {
    currentAnswer = animal.toLowerCase();
    console.log(currentAnswer);
}

//Reverses the provided string
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}
