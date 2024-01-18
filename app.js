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

// Page Element Selectors
const upgradeContainer = document.querySelector("#upgrades-container");
const clickableImage = document.querySelector("#clickable-image");
const scoreContainer = document.querySelector("#score-container");
const innerCountdownBar = document.querySelector("#inner-bar");
const reducerContainer = document.querySelector("#reducer-container");
const multiplierContainer = document.querySelector("#multiplier-container");

// if (localStorage) {
//   let initialScore = 100;
// }

// Utility function - Image Appender
function createImageNode(imageLocation) {
  let img = document.createElement("img");
  img.src = `${imageLocation}`;
  img.style.margin = ".5em";
  return img;
}

// Upgrade image array loop through
upgradeImages.forEach((img, count) => {
  upgradeContainer.appendChild(createImageNode(img));
  count = count * 100;
});

// Declaring a starting object structure
let userObject = {
  gameTime: 1000,
  currentScore: 10,
  reducerValue: 1,
  multiplier: 1,
};

// Initial Variables
let gameTime = userObject.gameTime;
let currentScore = userObject.currentScore;
let reducerValue = userObject.reducerValue;
let multiplierValue = userObject.multiplier;

// Click event listener
clickableImage.addEventListener("click", () => {
  currentScore = currentScore + multiplierValue;
  clickableImage.classList.add("scaleIt");
  addEventListener(
    "animationend",
    () => {
      clickableImage.classList.remove("scaleIt");
    },
    { once: true }
  );
});

// for (let i= 0; currentScore)

// function scoreEvaluator(x) {
//   if (x > 0 && x <= 99) {
//     reducerValue = reducerValue * 1;
//     multiplierValue = multiplierValue * 1;
//   } else if (x >= 100 && x <= 199) {
//     reducerValue = reducerValue * 2;
//     multiplierValue = multiplierValue + 1;
//   } else if (x >= 200 && x <= 299) {
//     reducerValue = reducerValue * 2;
//     multiplierValue = multiplierValue + 1;
//   } else if (x >= 300 && x <= 399) {
//     reducerValue = reducerValue * 2;
//     multiplierValue = multiplierValue + 1;
//   } else if (x >= 400 && x <= 499) {
//     reducerValue = reducerValue * 2;
//     multiplierValue = multiplierValue + 1;
//   } else if (x >= 500 && x <= 599) {
//     reducerValue = reducerValue * 2;
//     multiplierValue = multiplierValue + 1;
//   } else if (x >= 600) {
//     alert("You won the public vote!");
//   } else if (x <= 0) {
//     alert("You have faced a parliamentary defeat you weasal!");
//   }
// }

function gameEvaluator(x) {
  if (x == 0) {
    alert("You have faced a parliamentary defeat you weasal!");
  }
}

// Game Countdown
setTimer(() => {
  currentScore = currentScore - reducerValue;
  gameTime = gameTime - 1;
}, 10000);

// Timer Updater
setInterval(() => {
  gameEvaluator(currentScore);
  innerCountdownBar.innerHTML = `<p>${currentScore}</p>`;
  reducerContainer.innerHTML = `<p>Crowd Anger: ${reducerValue}</p>`;
  multiplierContainer.innerHTML = `<p>Public Apathy: ${multiplierValue}</p>`;
  console.log(timeRemaining);
}, 1000);
// If score is above level do this..
// - Update image
// - Swap old image
// - colourise/reveal upgrades

// Store history in localstorage
