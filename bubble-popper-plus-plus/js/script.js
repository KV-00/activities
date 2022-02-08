"use strict";

// The user's webcam
let video = undefined;
// The Handpose model
let handpose = undefined;
// The current set of predictions
let predictions = [];
// The bubble
let bubble = undefined;
let bubblesPopped = 0;

let sheep;

function preload() {}

function setup() {
  createCanvas(640, 480);

  sheep = loadImage(`assets/images/sheep0.png`);

  // Access user's webcam
  //video = createCapture(VIDEO);
  //video.hide();

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
    vxRunning: random(40, 50),
    vyRunning: random(40, 50),
  };
}

function draw() {
  background(0, 255, 0);

  // Bubbles popped text
  push();
  textStyle(BOLD);
  textSize(16);
  fill(255, 255, 255);
  text(`BUBBLES POPPED: ${bubblesPopped}`, width / 50, height / 1.05);
  pop();

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
    fill(255, 0, 0);
    ellipse(baseX, baseY, 20);
    pop();
    // Check bubble popping
    let d = dist(tipX, tipY, bubble.x, bubble.y);
    if (d < bubble.size / 2) {
      bubble.scared = true;
      bubble.touch = true;
      bubble.x += random(1);
      bubble.y += random(1);
      bubblesPopped += 1;
    }
  }

  if (bubble.vx > 0) {
    bubble.angle = atan2(bubble.vy, bubble.vx);
  }
  if (bubble.vx < 0) {
    bubble.angle = atan2(bubble.vy, bubble.vx);
  }

  if (bubble.scared === true) {
    bubble.vx = bubble.vxRunning;
    bubble.vy = bubble.vyRunning;
  }

  // Move the bubble
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;

  //Bouncing
  if (bubble.x > width - bubble.r || bubble.x < bubble.r) {
    bubble.vx = -bubble.vx;
  }
  if (bubble.y > height - bubble.r || bubble.y < bubble.r) {
    bubble.vy = -bubble.vy;
  }

  if (bubble.y < 0) {
    bubble.x = random(width);
    bubble.y = height;
  }

  push();
  imageMode(CENTER);
  image(sheep, bubble.x, bubble.y);
  rotate(sheep.angle);
  pop();
}
