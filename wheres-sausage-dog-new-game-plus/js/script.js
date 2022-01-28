"use strict";

const NUM_ANIMAL_IMAGES = 5;
const NUM_ANIMALS = 50;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

let gradient;
let r;
let g;
let b;
let a;
let ir;

<<<<<<< Updated upstream
let gameState = "start";
=======
//
let scene = "start";
//
>>>>>>> Stashed changes

function preload() {
  gradient = loadImage(`assets/images/gradient.png`);

  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  r = random(10, 200);
  g = random(10, 200);
  b = random(10, 200);
  a = random(50, 100);

  setupAnimals();
<<<<<<< Updated upstream
  setupSausage();

}

function startScreen() {
  rect(width / 2, height / 2, 100, 100);
}

function playScreen() {
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
=======
  setupSausageDog();
}

function startScreen() {

  rect(width / 2, height / 2, 100, 100);

  sausageDog.found = false;
  sausageDog.time = 0;

>>>>>>> Stashed changes
}

function sceneManager() {

<<<<<<< Updated upstream
  if (gameState = "start") {
      startScreen();
  }
  if (gameState = "play") {
      playScreen();
  }
}

function setupSausage(){
  let x = random(50, width - 50);
  let y = random(50, height - 50);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function setupAnimals(){
=======
  if (scene === "start") {

    startScreen();

  } else if (scene === "play") {

    playScreen();
  }

}

function playScreen() {

  drawGradient();

  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
}

function setupAnimals() {

>>>>>>> Stashed changes
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
<<<<<<< Updated upstream
}

function draw() {
  drawGradient();
  sceneManager();
=======
}

function setupSausageDog() {

  let x = random(50, width - 50);
  let y = random(50, height - 50);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  background(0);

  sceneManager();

  console.log(sausageDog.time);
  console.log(sausageDog.found);
>>>>>>> Stashed changes
}


function drawGradient(x, y) {
  image(gradient, 0, 0, width, height);
  push();
  let bgcolor = color(r, g, b);
  bgcolor.setAlpha(1000);
  fill(bgcolor);
  blendMode(SCREEN);
  rect(0, 0, width, height);
  pop();
}

function mousePressed() {
<<<<<<< Updated upstream
  if (gameState = "start") {
      gameState = "play";
  }
  if (gameState = "play") {

  sausageDog.mousePressed();

  for (let i = 0; i < animals.length; i++) {
    animals[i].mousePressed();
=======

  if (scene === "start") {

    setupSausageDog();
    scene = "play";
  } else if (scene === "play") {

    sausageDog.mousePressed();

    for (let i = 0; i < animals.length; i++) {
      animals[i].mousePressed();
>>>>>>> Stashed changes
    }
  }


}
