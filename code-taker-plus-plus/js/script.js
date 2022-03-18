"use strict";

let secretAnswer = "Theremin";
let classChangeDuration = 500;

$(`#solved-dialog`).dialog({
  autoOpen: false,
  buttons: {
    "I know.": function closeDialog() {
      $(this).dialog(`close`);
    },
  },
});

$(`.secret`).one(`mouseover`, function foundLetter(event) {
  $(this).addClass(`found`, classChangeDuration);
  $(this).draggable({
    helper: `clone`,
  });
});

$(`#answer`).droppable({
  drop: function dropLetter(event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`);
    //Check if they get it
    if ($(this).text() === secretAnswer) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
