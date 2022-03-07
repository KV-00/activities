"use strict";

// The user's webcam
let video = undefined;
// The Handpose model
let handpose = undefined;
// The current set of predictions
let predictions = [];
// The knight
let NUM_KNIGHT = 1;
let knights = [];
let knight = undefined;
let knightsSlashed = 0;
let slashedKnights = NUM_KNIGHT;
// Sprites
let bg;
let knightImage = undefined;
let title;
let sword;
let wrong;
// Sounds
let NUM_SCREAMS = 5;
let screams = [];
let bgmusic;
// Font
let font;

let tipX = 0;
let tipY = 0;

let gameState = "start";

function preload() {
  knightImage = loadImage(`assets/images/knight.png`);
  bg = loadImage(`assets/images/bg.png`);
  title = loadImage(`assets/images/title.png`);
  sword = loadImage(`assets/images/sword.png`);
  wrong = loadImage(`assets/images/X.png`);

  for (let i = 0; i < NUM_SCREAMS; i++) {
    let scream = loadSound(`assets/sounds/scream${i}.mp3`);
    screams.push(scream);
  }

  bgmusic = loadSound(`assets/sounds/bgmusic.mp3`);
  font = loadFont("assets/fonts/Mindfulness.otf");
}

function setup() {
  createCanvas(640, 480);

  setupKnight();

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
  image(title, width / 7, height / 8);

  handleSword();

  startButton();
}

function startButton() {
  textSize(48);
  fill(0, 0, 0);
  textFont(font);
  text("*SLASH* HERE TO BEGIN!", width / 4, height / 1.2);

  if (
    tipX > width / 4 &&
    tipX < width / 4 + 292 &&
    tipY > height / 1.2 &&
    tipY < height / 1.2 + 20
  ) {
    gameState = `play`;
  }
}

function playScreen() {
  handleSword();

  for (let i = 0; i < knights.length; i++) {
    knights[i].update();
  }

  // Check slashing
  slash();
  // Adding in knight
  setTimeout(addKnight, 3000);
  // knights booped text -> function
  displayUI();
}

function slash() {
  for (let i = 0; i < knights.length; i++) {
    let d = dist(tipX, tipY, knights[i].x, knights[i].y);
    if (d < knights[i].size / 2 && knights[i].touch === false) {
      console.log("BOOP");
      knights[i].scared = true;
      knights[i].touch = true;
      knights[i].x += random(1);
      knights[i].y += random(1);
      knightsSlashed += 1;
      slashedKnights -= 1;
      let scream = random(screams);
      scream.play();
    }
  }
}

function addKnight() {
  if (slashedKnights === 0) {
    NUM_KNIGHT += 1;
    slashedKnights = NUM_KNIGHT;
    setupKnight();
  }
}

function setupKnight() {
  for (let i = 0; i < NUM_KNIGHT; i++) {
    let x = random(width);
    let y = height;
    let knight = new Knight(x, y, knightImage);
    knights.push(knight);
  }
}

function handleSword() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    tipX = tip[0];
    tipY = tip[1];
    let baseX = base[0];
    let baseY = base[1];

    // Sword
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
    image(sword, tipX, tipY);
    pop();
  }
}

function romanize(num) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = "",
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

function displayUI() {
  push();
  textSize(32);
  fill(255, 255, 255);
  textFont(font);
  text(`SCORE: ${romanize(knightsSlashed)}`, width / 1.2, height / 20);
  pop();
}

function mousePressed() {
  slash();
  gameState = `play`;
}
