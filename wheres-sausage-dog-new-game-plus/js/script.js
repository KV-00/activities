"use strict";

const NUM_ANIMAL_IMAGES = 5;
const NUM_ANIMALS = 10;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

let dim;

function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage =  loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  dim = width*2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  background(0);
  for (let x = width/2; x <= width; x += dim) {
    drawGradient(x, height / 2);
  }

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
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
}

function drawGradient(x, y) {
  let radius = dim / 2;
  let h = random(0, 360);
  for (let r = radius; r > 0; --r) {
    fill(h, 90, 90);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}

function mousePressed() {
  sausageDog.mousePressed();

  for (let i = 0; i < animals.length; i++) {
    animals[i].mousePressed();
  }
}
