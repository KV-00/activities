"use strict";

// The user's webcam
let video = undefined;
// The Handpose model
let handpose = undefined;
// The current set of predictions
let predictions = [];
// The sheep
let NUM_SHEEP = 1;
let NUM_SHEEP_IMAGES = 1;
let sheeps = [];
let sheep = undefined;
let sheepsBooped = 0;
let scaredSheep = NUM_SHEEP;
// Sprites
let bg;
let sheepImages = [];
let sheepImage = undefined;
// Sounds
let bleet;
let bgmusic;

let tipX = 0;
let tipY = 0;

let gameState = "start";

function preload() {
  for (let i = 0; i < NUM_SHEEP_IMAGES; i++) {
    let sheepImage = loadImage(`assets/images/sheep${i}.png`);
    sheepImages.push(sheepImage);
  }

  bg = loadImage(`assets/images/bg.png`);
  bleet = loadSound(`assets/sounds/bleet.mp3`);
  bgmusic = loadSound(`assets/sounds/bgmusic.mp3`);
}

function setup() {
  createCanvas(640, 480);

  setupSheep();

  bgmusic.play();

  // Access user's webcam
  video = createCapture(VIDEO);
  video.hide();

  // Load the handpose model
  handpose = ml5.handpose(
    video,
    {
      flipHorizontal: true,
    },
    function () {
      console.log(`Model loaded.`);
    }
  );

  // Listen for predictions
  handpose.on(`predict`, function (results) {
    //console.log(results);
    predictions = results;
  });
}

function draw() {
  image(bg, 0, 0, width, height);

  if (gameState === `start`) {
    startScreen();
  } else if (gameState === `play`) {
    playScreen();
  }
}

function startScreen() {
  handlePin();

  textStyle(BOLD);
  textSize(48);
  fill(255, 255, 255);
  text("SHEEP BOOPER PRO", width / 10, height / 2);

  fill(0);
  let hitbox = rect(width / 4, height / 1.5, 292, -20);

  textStyle(BOLD);
  textSize(24);
  fill(255, 255, 255);
  text("*BOOP* HERE TO BEGIN!", width / 4, height / 1.5);

  let d = dist(tipX, tipY, width / 2, height / 1.5);
  if (d < 100) {
    gameState = `play`;
  }
}

function playScreen() {
  handlePin();

  for (let i = 0; i < sheeps.length; i++) {
    sheeps[i].update();
  }

  // Check sheep booping
  let d = dist(tipX, tipY, Sheep.x, Sheep.y);
  if (d < Sheep.size / 2) {
    Sheep.scared = true;
    Sheep.touch = true;
    Sheep.x += random(1);
    Sheep.y += random(1);
    sheepsBooped += 1;
    scaredSheep -= 1;
    bleet.play();
  }

  // Adding in sheep
  setTimeout(addSheep, 3000);
  // sheeps booped text -> function
  displayUI();
}

function addSheep() {
  if (scaredSheep === 0) {
    NUM_SHEEP += 1;
    scaredSheep = NUM_SHEEP;
    setupSheep();
  }
}

function setupSheep() {
  for (let i = 0; i < NUM_SHEEP; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    let sheepImage = random(sheepImages);
    let sheep = new Sheep(x, y, sheepImage);
    sheeps.push(sheep);
  }
}

function handlePin() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    tipX = tip[0];
    tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    // Pin body
    push();
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

    //Pin head
    push();
    noStroke();
    fill(255, 255, 255);
    ellipse(tipX, tipY, 20);
    pop();
  }
}

function displayUI() {
  push();
  textStyle(BOLD);
  textSize(16);
  fill(255, 255, 255);
  text(`SHEEPS BOOPED: ${sheepsBooped}`, width / 50, height / 1.05);
  pop();
}

function mousePressed() {
  gameState = "play";
  scaredSheep -= 1;
}
