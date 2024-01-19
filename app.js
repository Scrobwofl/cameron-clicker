console.log("JS connected...");

// Images to use for upgrades
const upgradeImages = [
  "./images/david-cameron.png",
  "./images/keir-starmer.png",
  "./images/rishi-sunak.png",
  "./images/michael-gove.png",
  "./images/nigel-farage.png",
  "./images/theresa-may.png",
];
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
const outerCountdownBar = document.querySelector("#inner-bar");
const innerCountdownBar = document.querySelector("#inner-bar");
const reducerContainer = document.querySelector("#reducer-container");
const multiplierContainer = document.querySelector("#multiplier-container");
const muteContainer = document.querySelector("#mute-container");
const gameResetBtn = document.querySelector("#btn-restart");
const gameOver = document.querySelector("#game-over");
const highScoreBtn = document.querySelector("#btn-high-score");
const highScorePage = document.querySelector("#high-score-page");

// Declaring a starting object structure
let userObject = {
  currentScore: 10,
  multiplier: 1,
  muteState: false,
  scoreHistory: [],
  gameState: "david-cameron",
};

// Initial Variables
let gameTime = 100000;
let gameState = userObject.gameState;
let currentScore = userObject.currentScore;
let multiplierValue = userObject.multiplier;
let muteState = userObject.muteState;
let scoreHistory = userObject.scoreHistory;

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

// Utility function - Image Appender
function createImageNode(imageLocation) {
  let img = document.createElement("img");
  img.src = `${imageLocation}`;
  img.style.margin = ".5em";
  return img;
}

// Upgrade images - array loop and append
upgradeImages.forEach((img, count) => {
  let faceValue = count * 1;
  let reducerValue = count * -1; // Assuming you'll use it elsewhere
  let newDiv = document.createElement("div");
  let p = document.createElement("p");

  // Append div to container
  upgradeContainer.appendChild(newDiv);

  // Append image to div
  newDiv.appendChild(createImageNode(img)).appendChild(p);

  // Set text content and append to div also

  p.textContent = `${faceValue}`;
});

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
  // Play random sound
  if (muteState) {
    playSound();
  }
  // Work out current score
  currentScore = currentScore + multiplierValue;
  // Update ui with score
  scoreContainer.innerHTML = `<p>Score: ${currentScore}</p>`;
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
function addHighScore(finalScore) {
  const p = document.createElement("p");
  const newItem = highScorePage.append(finalScore);
  const newItemStyled = newItem.style.classList("high-score-item");
  newItemStyled.append(`${finalScore}`);
  userObject.scoreHistory.push(finalScore);
}

// Game state evaluation functions
function bgImageCalc(character) {
  clickableImage.style.backgroundImage = `url(./images/${character}.png`;
}

function gameEvaluator(x) {
  if (!gameTime == 0) {
    if (x > 0 && x <= 49) {
    } else if (x >= 50 && x <= 199) {
      bgImageCalc("keir-starmer");
      multiplierValue = multiplierValue + 1;
    } else if (x >= 200 && x <= 299) {
      bgImageCalc("rishi-sunak");
      multiplierValue = multiplierValue + 2;
    } else if (x >= 300 && x <= 399) {
      bgImageCalc("michael-gove");
      multiplierValue = multiplierValue + 3;
    } else if (x >= 400 && x <= 499) {
      bgImageCalc("nigel-farage");
      multiplierValue = multiplierValue + 4;
    } else if (x >= 500) {
      bgImageCalc("theresa-may");
      multiplierValue = multiplierValue + 5;
    } else {
      rabble.play();
      clearInterval();
      alert(
        "You have faced a parliamentary defeat you weasal! Back to the shadow cabinet for you!"
      );
    }
  } else {
    // gameStateCalculator("game-over");
    gameOver.classList.add("game-over-overlay");
    rabble.play();
    clearInterval();
    addHighScore(x);
  }
}
// Timer Updater
setInterval(() => {
  gameTime = gameTime - 1;
  gameEvaluator(currentScore);
  gameTimeContainer.textContent = `${gameTime}`;
  innerCountdownBar.setAttribute("style", `width:${gameTime}%`);
  multiplierContainer.innerHTML = `<p>Public Apathy: ${multiplierValue}</p>`;
}, 1000);

// To Do
// ======
// Local Storage
