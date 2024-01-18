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
const clickerImage = document.querySelector("#clickable-image");
const scoreContainer = document.querySelector("#score-container");
const innerCountdownBar = document.querySelector("#inner-bar");

// Append upgrade images
// Utility function
function createImageNode(imageLocation) {
  let img = document.createElement("img");
  img.src = `${imageLocation}`;
  img.style.margin = ".5em";
  return img;
}
// Image array loop
upgradeImages.forEach((img, count) => {
  upgradeContainer.appendChild(createImageNode(img));
  count = count * 100;
  // this.img.style(filter);
});
clickerImage.addEventListener("click", () => {
  timeRemaining = timeRemaining + 1;
  clickerImage.classList.add("scaleIt");
  addEventListener(
    "animationend",
    () => {
      clickerImage.classList.remove("scaleIt");
    },
    { once: true }
  );
});
// clickerImage.addEventListener("animationend", function () {
//   this.classList.remove("scaleIt");
// });

// Score Updater..
let timeRemaining = 100;

setInterval(() => {
  timeRemaining = timeRemaining - 1;
  innerCountdownBar.innerHTML = `<p>${timeRemaining}</p>`;
  console.log(timeRemaining);
}, 1000);

// If score is above level do this..
// - Update image
// - Swap old image
// - colourise/reveal upgrades

// Store history in localstorage
