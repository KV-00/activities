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

let gameState = "start";

function preload() {
gradient = loadImage(`assets/images/gradient.png`);

  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage =  loadImage(`assets/images/animal${i}.png`);
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
}

function sceneManager() {

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
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }
}

function draw() {
  drawGradient();
  sceneManager();
}


function drawGradient(x, y) {
  image(gradient, 0, 0, width, height);
  push();
  let bgcolor = color (r, g, b);
  bgcolor.setAlpha(1000);
  fill(bgcolor);
  blendMode(SCREEN);
  rect(0, 0, width, height);
  pop();
}

function mousePressed() {
  if (gameState = "start") {
      gameState = "play";
  }
  if (gameState = "play") {

  sausageDog.mousePressed();

  for (let i = 0; i < animals.length; i++) {
    animals[i].mousePressed();
    }
  }
}
