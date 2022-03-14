"use strict";

let r = undefined;
let frequency = 0.001;
let score = 0;
let lives = 5;

let overStayed = setInterval(Appearance, 500);

document.getElementById("score").innerHTML = score;
document.getElementById("lives").innerHTML = lives;

function bonk(event) {
  $(this).removeClass(`appear`);
  $(this).addClass(`empty`);
  $(this).off(`click`);
  $(this).html(`___`);

  frequency *= 1.01;
  score += 1;

  document.getElementById("score").innerHTML = score;
}

function Appearance() {
  console.log("Interval is still going");
  $(`.empty`).each(attemptAppear);
}

function attemptAppear() {
  r = Math.random();
  if (r < frequency) {
    $(this).removeClass(`empty`);
    $(this).addClass(`appear`);
    $(this).on(`click`, bonk);

    $(this).html(`ʕ•ᴥ•ʔ`);
    let self = $(this);

    setTimeout(function () {
      if (self.hasClass(`appear`)) {
        self.off(`click`);
        self.addClass(`overStay`);

        if (lives > 1) {
          lives -= 1;
          document.getElementById("lives").innerHTML = lives;
        } else if (lives > 0) {
          $(`.hole`).off(`click`);
          $(`.hole`).addClass(`overStay`);
          clearInterval(overStayed);
          lives -= 1;
          document.getElementById("lives").innerHTML = lives;
        }
      }
    }, 5000);
  }
}
