console.log("JS connected...");

// Sound Imports
const sound1 = document.querySelector("#hit-sound-1");
const sound2 = document.querySelector("#hit-sound-2");
const sound3 = document.querySelector("#hit-sound-3");
const sound4 = document.querySelector("#hit-sound-4");
const sound5 = document.querySelector("#hit-sound-5");
const sound6 = document.querySelector("#hit-sound-6");
const sound7 = document.querySelector("#hit-sound-7");
const sound8 = document.querySelector("#hit-sound-8");
const rabble = document.querySelector("#rabble");

const hitSoundsArray = [
  sound1,
  sound2,
  sound3,
  sound4,
  sound5,
  sound6,
  sound7,
  sound8,
];

// Page Element Selectors
const upgradeContainer = document.querySelector("#upgrades-container");
const clickableImage = document.querySelector("#clickable-image");
const scoreContainer = document.querySelector("#score-container");
const gameTimeContainer = document.querySelector("#game-time");
const outerCountdownBar = document.querySelector("#countdown-bar");
const innerCountdownBar = document.querySelector("#inner-bar");
const reducerContainer = document.querySelector("#reducer-container");
const multiplierContainer = document.querySelector("#multiplier-container");
const muteContainer = document.querySelector("#mute-container");
const gameResetBtn = document.querySelector("#btn-restart");
const gameOver = document.querySelector("#game-over");
const highScoreBtn = document.querySelector("#btn-high-score");
const highScorePage = document.querySelector("#high-score-page");
const highScoresContainer = document.querySelector("#high-scores-container");

// Declaring a starting object structure
let userObject = {
  currentScore: 1,
  multiplier: 1,
  muteState: true,
  gameState: "david-cameron",
};

// Initial Variables
let gameTime = 100;
let gameState = userObject.gameState;
let currentScore = userObject.currentScore;
let multiplierValue = userObject.multiplier;
let muteState = userObject.muteState;
let scoreHistory = userObject.scoreHistory;
const timestamp = new Date().getTime();

// Handling the mute functionality
function muteButtonHandler() {
  if (!muteState) {
    muteContainer.classList.remove("muted");
    muteContainer.classList.add("unmuted");
    muteState = true;
  } else {
    muteContainer.classList.remove("unmuted");
    muteContainer.classList.add("muted");
    muteState = false;
  }
}
muteContainer.addEventListener("click", muteButtonHandler);

// A button to reset the game
gameResetBtn.addEventListener("click", () => {
  window.location.reload();
});

// Open the high score menu
highScoreBtn.addEventListener("click", () => {
  highScorePage.classList.toggle("high-score-overlay");
});

// Images to use for multipliers section
const politicianNames = [
  "david-cameron",
  "keir-starmer",
  "rishi-sunak",
  "michael-gove",
  "nigel-farage",
  "theresa-may",
];

// Utility Function  - Generate random values
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get a random sound from the sounds array
function playSound() {
  let i = getRandomNumber(0, hitSoundsArray.length);
  hitSoundsArray[i].play();
}

// Click event listener
clickableImage.addEventListener("click", () => {
  // Play random sounds
  if (muteState) {
    playSound();
  }
  // Work out current score
  currentScore = currentScore + multiplierValue;
  // Update ui with score
  scoreContainer.innerHTML = `Score: ${currentScore}`;
  // Randomly rotate the head on click
  const randomRotation = getRandomNumber(-20, 20);
  clickableImage.style.transform = `rotate(${randomRotation}deg)`;
  //Reset the transform rotate after 1 sec.
  setTimeout(() => {
    clickableImage.style.transform = "rotate(0deg)";
  }, 1000);
  //scale the image on click
  clickableImage.classList.add("scaleIt");

  // A handler function for the animationend event
  function handleAnimationEnd() {
    clickableImage.classList.remove("scaleIt");
    clickableImage.removeEventListener("animationend", handleAnimationEnd);
  }

  // Attach the event listener
  clickableImage.addEventListener("animationend", handleAnimationEnd, {
    once: true,
  });
});

// High Score Update
function loadHighScores() {
  // Check if there's data in local storage
  const storedScores = localStorage.getItem("highScores");
  let scores;
  if (storedScores) {
    scores = JSON.parse(storedScores);
  } else {
    scores = [];
  }

  // Clear existing scores from the display
  highScoresContainer.innerHTML = "";

  // Populate the high scores
  scores.forEach((score) => {
    addHighScore(score);
  });
}

function addHighScore(finalScore) {
  const p = document.createElement("p");
  p.classList.add("high-score-item");
  p.textContent = `${timestamp}: ${finalScore}`;
  highScoresContainer.appendChild(p);
}

function updateHighScores(newScore) {
  // Retrieve existing scores from local storage
  const storedScores = localStorage.getItem("highScores");
  let scores;
  if (storedScores) {
    scores = JSON.parse(storedScores);
  } else {
    scores = [];
  }

  // Add the new score and update local storage
  scores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(scores));

  // Update the displayed high scores
  loadHighScores();
}

// Calls loadHighScores immediately on page load
loadHighScores();

// Game state evaluation functions
function bgImageCalc(character) {
  clickableImage.style.backgroundImage = `url(./images/${character}.png`;
}

// Creating variables for images id's after the loop added them to ui from array
davidCameron = document.querySelector("#david-cameron");
keirStarmer = document.querySelector("#keir-starmer");
rishiSunak = document.querySelector("#rishi-sunak");
michaelGove = document.querySelector("#michael-gove");
nigelFarage = document.querySelector("#nigel-farage");
theresaMay = document.querySelector("#theresa-may");

function updateImageFilters() {
  // Add upgrade-active class based on gameState
  if (gameState === "david-cameron") {
    davidCameron.classList.remove("obscured");
  }
  if (gameState === "keir-starmer") {
    keirStarmer.classList.remove("obscured");
  }
  if (gameState === "rishi-sunak") {
    rishiSunak.classList.remove("obscured");
  }
  if (gameState === "michael-gove") {
    michaelGove.classList.remove("obscured");
  }
  if (gameState === "nigel-farage") {
    nigelFarage.classList.remove("obscured");
  }
  if (gameState == "theresa-may") {
    theresaMay.classList.remove("obscured");
  }
}

function evaluateMultiplier(gameState) {
  if (gameState === "david-cameron") {
    multiplierValue = 1;
    return multiplierValue;
  } else if (gameState === "keir-starmer") {
    multiplierValue = 2;
    return multiplierValue;
  } else if (gameState === "rishi-sunak") {
    multiplierValue = 3;
    return multiplierValue;
  } else if (gameState === "michael-gove") {
    multiplierValue = 4;
    return multiplierValue;
  } else if (gameState === "nigel-farage") {
    multiplierValue = 5;
    return multiplierValue;
  } else if (gameState === "theresa-may") {
    multiplierValue = 6;
    return multiplierValue;
  }
}

function gameEvaluator(score) {
  if (!gameTime == 0) {
    if (score > 0 && score <= 49) {
      gameState = "david-cameron";
      // davidCameron.classList.add("upgrade-active");
    } else if (score >= 100 && score <= 199) {
      gameState = "keir-starmer";
      // keirStarmer.classList.add("upgrade-active");
    } else if (score >= 200 && score <= 299) {
      gameState = "rishi-sunak";
      // rishiSunak.classList.add("upgrade-active");
    } else if (score >= 300 && score <= 499) {
      gameState = "michael-gove";
      // michaelGove.classList.add("upgrade-active");
    } else if (score >= 500 && score <= 999) {
      gameState = "nigel-farage";
      // nigelFarage.classList.add("upgrade-active");
    } else if (score >= 1000) {
      gameState = "theresa-may";
      // theresaMay.classList.add("upgrade-active");
    } else {
      if (muteState) {
        rabble.play();
      }
      clearInterval(mainInterval);
      alert(
        "You scored zero! You have faced a parliamentary defeat you weasal! Back to the shadow cabinet for you!"
      );
    }
  } else {
    const EOGScore = document.querySelector("#eog-points");
    gameOver.classList.add("game-over-overlay");
    if (muteState) {
      rabble.play();
    }
    clearInterval(mainInterval);
    EOGScore.innerHTML = `Your final score was: ${currentScore}`;
    addHighScore(score);
    updateHighScores(currentScore);
  }
  multiplierValue = evaluateMultiplier(gameState);
  updateImageFilters();
  bgImageCalc(gameState);
}

// Timer Updater
const mainInterval = setInterval(() => {
  gameTime = gameTime - 1;
  gameEvaluator(currentScore);
  gameTimeContainer.textContent = `${gameTime}`;
  innerCountdownBar.setAttribute("style", `width:${gameTime}%`);
  multiplierContainer.innerHTML = `Public Apathy: ${multiplierValue}`;
}, 1000);
