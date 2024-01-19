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

// Utility function - Image Appender
function createImageNode(imageLocation) {
  let img = document.createElement("img");
  img.src = `${imageLocation}`;
  img.style.margin = ".5em";
  return img;
}

// Upgrade images - array loop and append
upgradeImages.forEach((img, count) => {
  upgradeContainer.appendChild(createImageNode(img));
  // count = count * 100;
});

// Declaring a starting object structure
let userObject = {
  currentScore: 10,
  multiplier: 1,
};

// Initial Variables
let gameTime = 100;
let currentScore = userObject.currentScore;
let multiplierValue = userObject.multiplier;

// Utility Function to generate random values
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Play a random sound from the
function playSound() {
  let i = getRandomNumber(0, hitSoundsArray.length);
  hitSoundsArray[i].play();
}

// Click event listener
clickableImage.addEventListener("click", () => {
  // Play random sound
  playSound();
  currentScore = currentScore + multiplierValue;
  scoreContainer.innerHTML = `<p>Score: ${currentScore}</p>`;

  // Randomly rotate the head on click
  const randomRotation = getRandomNumber(-20, 20);
  clickableImage.style.transform = `rotate(${randomRotation}deg)`;

  //Reset the transform rotate after 1 sec.
  setTimeout(() => {
    clickableImage.style.transform = "rotate(0deg)";
  }, 1000);

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
// for (let i= 0; currentScore)
let gameState = "david-cameron";

function gameStateCalculator(gameState) {
  clickableImage.style.backgroundImage = `url(./images/${gameState}.png`;
}
// function gameState() {}

function gameEvaluator(x) {
  if (!gameTime == 0) {
    if (x > 0 && x <= 49) {
    } else if (x >= 50 && x <= 199) {
      gameStateCalculator("keir-starmer");
    } else if (x >= 200 && x <= 299) {
      gameStateCalculator("rishi-sunak");
    } else if (x >= 300 && x <= 399) {
      gameStateCalculator("michael-gove");
    } else if (x >= 400 && x <= 499) {
      gameStateCalculator("nigel-farage");
    } else if (x >= 500 && x <= 599) {
      gameStateCalculator("theresa-may");
    } else if (x <= 0) {
      gameStateCalculator("game-over");
      rabble.play();
      alert(
        "You have faced a parliamentary defeat you weasal! Back to the shadow cabinet for you!"
      );
    }
  } else {
    gameStateCalculator("game-over");
    rabble.play();
    alert("Your time is up!");
  }

  // Timer Updater
  setInterval(() => {
    gameEvaluator(currentScore);
    console.log(currentScore);
    gameTime = gameTime - 1;
    gameTimeContainer.textContent = `${gameTime}`;
    innerCountdownBar.setAttribute("style", `width:${gameTime}%`);
    multiplierContainer.innerHTML = `<p>Public Apathy: ${multiplierValue}</p>`;
  }, 1000);
}

// To Do
// ======
// Local Storage
// Scoreboard
//
