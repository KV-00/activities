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

let lives = 3;

let restart = false;

let startTime = 0;
let timePassed = 0;
let timerRunning = false;

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
  } else if (gameState === "gameOver") {
    gameOver();
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
    tipX < width / 4 + 287 &&
    tipY > height / 1.2 &&
    tipY < height / 1.2 + 45
  ) {
    gameState = `play`;
  }
}

function gameOver() {
  textSize(128);
  fill(0, 0, 0);
  textFont(font);
  text("GAME OVER", width / 5, height / 2);
  if (restart === false) {
    setTimeout(function () {
      gameState = "start";
      lives = 3;
      knightsSlashed = 0;
      NUM_KNIGHT = 1;
      slashedKnights = NUM_KNIGHT;
      startTime = 0;
      timePassed = 0;
      setupKnight();
      restart = false;
    }, 3000);

    restart = true;
  }
}

function playScreen() {
  handleSword();

  displayLives();

  for (let i = 0; i < knights.length; i++) {
    knights[i].update();
  }

  // Check slashing
  slash();
  // Adding in knight
  knightDelay();
  // knights booped text -> function
  displayUI();
  // Lives
  manageLives();

  if (lives <= 0) {
    gameState = "gameOver";
  }
}

function displayLives() {
  if (lives < 1) {
    push();
    tint(255, 0, 0);
    image(wrong, width / 50, height / 50);
    image(wrong, width / 8, height / 50);
    image(wrong, width / 4.3, height / 50);
    pop();
  } else if (lives < 2) {
    push();
    tint(255, 0, 0);
    image(wrong, width / 50, height / 50);
    image(wrong, width / 8, height / 50);
    pop();
    image(wrong, width / 4.3, height / 50);
  } else if (lives < 3) {
    push();
    tint(255, 0, 0);
    image(wrong, width / 50, height / 50);
    pop();
    image(wrong, width / 8, height / 50);
    image(wrong, width / 4.3, height / 50);
  } else {
    image(wrong, width / 50, height / 50);
    image(wrong, width / 8, height / 50);
    image(wrong, width / 4.3, height / 50);
  }
}

function manageLives() {
  for (let i = 0; i < knights.length; i++) {
    if (knights[i].y > height) {
      knights.splice(i, 1);
      lives -= 1;
      slashedKnights -= 1;
      console.log(lives);
    }
  }
}

function knightDelay() {
  if (slashedKnights === 0 && timerRunning === false) {
    startTime = millis();
    timerRunning = true;
  }
  if (timerRunning === true) {
    timePassed = millis() - startTime;
    console.log(timePassed);
    if (timePassed >= 2000) {
      addKnight();
      timerRunning = false;
      timePassed = 0;
    }
  }
}

function slash() {
  for (let i = 0; i < knights.length; i++) {
    let d = dist(tipX, tipY, knights[i].x, knights[i].y);
    if (d < knights[i].size / 2 && knights[i].touch === false) {
      console.log("SLASH");
      knights[i].scared = true;
      knights[i].touch = true;
      //knights[i].x += random(1);
      //knights[i].y += random(1);
      knights.splice(i, 1);
      knightsSlashed += 1;
      slashedKnights -= 1;
      let scream = random(screams);
      scream.play();
    }
  }
}

function addKnight() {
  console.log("add");
  NUM_KNIGHT += 1;
  slashedKnights = NUM_KNIGHT;
  for (let i = 0; i < NUM_KNIGHT; i++) {
    setTimeout(setupKnight, 2000 * i);
  }
}

function setupKnight() {
  let x = random(width);
  let y = height;
  let knight = new Knight(x, y, knightImage);
  knights.push(knight);
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

    //Sword
    push();
    noStroke();
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
  textSize(48);
  fill(255, 255, 255);
  textFont(font);
  text(`SCORE: ${romanize(knightsSlashed)}`, width / 1.3, height / 10);
  pop();
}
