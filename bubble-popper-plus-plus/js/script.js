"use strict";

// Have sheep stop adding to boop count once they run away

// Have the player start the game by touching the start message

// Have more sheeps spawn in once all sheep are off the field

// Have sheep's angles work correctly

// The user's webcam
let video = undefined;
// The Handpose model
let handpose = undefined;
// The current set of predictions
let predictions = [];
// The bubble
let bubble = undefined;
let sheepsBooped = 0;
// Sprites
let sheep;
let bg;
// Sounds
let bleet;
let bgmusic;

let gameState = "start";

function preload() {
  sheep = loadImage(`assets/images/sheep0.png`);
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

  // Our bubble
  bubble = {
    scared: false,
    x: width / 2,
    y: height / 2,
    size: 100,
    vx: random(1, -1),
    vy: random(1, -1),
    r: 25,
    angle: 0,
    vxRunning: random(10, -10),
    vyRunning: random(10, -10),
  };
}

function draw() {
  image(bg, 0, 0, width, height);

  if (predictions.length > 0) {
    let hand = predictions[0];
    let index = hand.annotations.indexFinger;
    let tip = index[3];
    let base = index[0];
    let tipX = tip[0];
    let tipY = tip[1];
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

    // Check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.scared = true;
      bubble.touch = true;
      bubble.x += random(1);
      bubble.y += random(1);
      sheepsBooped += 1;
      bleet.play();
    }
  }

  // Sheep sprite
  push();
  imageMode(CENTER);
  image(sheep, bubble.x, bubble.y);
  rotate(bubble.angle);
  pop();

  // Start text
  if (gameState == "start") {
    textStyle(BOLD);
    textSize(48);
    fill(255, 255, 255);
    text("SHEEP BOOPER PRO", width / 10, height / 2);

    textStyle(BOLD);
    textSize(24);
    fill(255, 255, 255);
    text("*BOOP* HERE TO BEGIN!", width / 4, height / 1.5);
  }

  if (gameState == "play") {
    // Bubbles popped text
    push();
    textStyle(BOLD);
    textSize(16);
    fill(255, 255, 255);
    text(`SHEEPS BOOPED: ${sheepsBooped}`, width / 50, height / 1.05);
    pop();

    // Sheep scaring
    if (bubble.scared === true) {
      bubble.vx = bubble.vxRunning;
      bubble.vy = bubble.vyRunning;
    }

    // Move the bubble
    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    //Bouncing
    if (
      (bubble.x > width - bubble.r && !bubble.touch) ||
      (bubble.x < bubble.r && !bubble.touch)
    ) {
      bubble.vx = -bubble.vx;
    }
    if (
      (bubble.y > height - bubble.r && !bubble.touch) ||
      (bubble.y < bubble.r && !bubble.touch)
    ) {
      bubble.vy = -bubble.vy;
    }

    // Facing direction of movement
    if (bubble.vx > 0) {
      bubble.angle = atan2(bubble.vy, bubble.vx);
    }
    if (bubble.vx < 0) {
      bubble.angle = atan2(bubble.vy, bubble.vx);
    }
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

function playScreen() {}

function startScreen() {
  rect(width / 2, height / 2, 100, 100);
  preload();
}

function mousePressed() {
  gameState = "play";
}
