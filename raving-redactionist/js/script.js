"use strict";

let r = undefined;

$(`.top-secret`).on(`click`, redact);
setInterval(revelation, 500);

function redact(event) {
  $(this).removeClass(`revealed`);
  $(this).addClass(`redacted`);
}

function revelation() {
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal() {
  r = Math.random();
  if (r < 0.1) {
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
