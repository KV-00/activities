"use strict";

// Have sheep stop adding to boop count once they run away

// Have more sheeps spawn in once all sheep are off the field

// The user's webcam
let video = undefined;
// The Handpose model
let handpose = undefined;
// The current set of predictions
let predictions = [];
// The sheep
let sheep = undefined;
let sheepsBooped = 0;
// Sprites
let bg;
let sheepImage = undefined;
// Sounds
let bleet;
let bgmusic;

let tipX = 0;
let tipY = 0;

let NUM_SHEEP = 2;

let gameState = "start";

function preload() {
  sheepImage = loadImage(`assets/images/sheep0.png`);
  bg = loadImage(`assets/images/bg.png`);
  bleet = loadSound(`assets/sounds/bleet.mp3`);
  bgmusic = loadSound(`assets/sounds/bgmusic.mp3`);
}

function setup() {
  createCanvas(640, 480);

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
  rect(width / 4, height / 1.5, 292, -24);

  textStyle(BOLD);
  textSize(24);
  fill(255, 255, 255);
  text("*BOOP* HERE TO BEGIN!", width / 4, height / 1.5);

  // Really it's better to make the position of this "button" as variables
  // rather than typing out the position explicitly like this!

  let d = dist(tipX, tipY, width / 4, height / 1.5);
  if (d < 100) {
    gameState = `play`;
  }
}

function playScreen() {
  handlePin();

  // Check sheep popping
  let d = dist(tipX, tipY, Sheep.x, Sheep.y);
  if (d < Sheep.size / 2 && !Sheep.scared) {
    Sheep.scared = true;
    Sheep.touch = true;
    Sheep.x += random(1);
    Sheep.y += random(1);
    sheepsBooped += 1;
    bleet.play();
  }

  // sheeps popped text -> function
  displayUI();
  // show sheep
  setupSheep();
}

function setupSheep() {
  for (let i = 0; i < NUM_SHEEP; i++) {
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    sheep = new Sheep(x, y, sheepImage);
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
