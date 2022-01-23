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

  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  let x = random(50, width - 50);
  let y = random(50, height - 50);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}

function draw() {
  drawGradient();

  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
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
  sausageDog.mousePressed();

  for (let i = 0; i < animals.length; i++) {
    animals[i].mousePressed();
  }
}
