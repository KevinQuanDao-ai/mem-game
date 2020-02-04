var gamePattern = [];
var userClickedPattern = [];
var level = -1;
var gameStarted = false;


$(document).keypress(function() {
  if (gameStarted === false) {
    gameStarted = true;
    nextSequence();
  }
})

function playSound(pattern) {
  var audio = new Audio('sounds/' + pattern + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed")
  }, 100);
}

$(".btn").click(function() {
  if (gameStarted === true) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (gamePattern.length === userClickedPattern.length) {
      if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
        nextSequence();
      } else {
        playSound("wrong");
        $("h1").text("Fail try again by pressing any key");
        gameStarted = false;
        level = -1;
        gamePattern = [];
      }
    }
  }
})


function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var buttonColours = ["red", "blue", "green", "yellow"];
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}
