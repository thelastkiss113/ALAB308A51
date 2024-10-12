const textElement = document.getElementById("text"); // 1. Cache at least one element using selectElementById.
const optionButtonsElement = document.querySelector("#option-buttons"); // 1. Cache at least one element using querySelector or querySelectorAll.
const playerForm = document.getElementById("player-form"); // form for player's name - Include at least one form and/or input with HTML attribute validation.
const playerNameInput = document.querySelector("#player-name"); // grab player's name and store local storage.
const resetButton = document.getElementById("reset-game"); // reset the game.

let state = {}; //current state of the game
let playerName = "";
let typingSpeed = 50; // Speed of the typewriter effect.

// 1. cache -- textElement, playerForm, playerNameInput, resetButton = by getElementById.
// 2. querySelector('#option-buttons') & querySelector('#player-name') = Cache at least one element using querySelector or querySelectorAll.

// Show the form initially, then start the game once the form is submitted.
playerForm.addEventListener("submit", (event) => {
  // 11. Register at least two different event listeners and create the associated event handler functions.
  event.preventDefault();

  // 14. Include DOM event-based validation.
  // Get the player's name and store it in localStorage.
  playerName = playerNameInput.value;
  localStorage.setItem("playerName", playerName);

  // Hide the form and show the game UI.
  // 9. Modify the style or CSS classes of an element:
  playerForm.style.display = "none";
  textElement.style.display = "block";
  optionButtonsElement.style.display = "grid"; // Show the option buttons only after the name is submitted.

  startGame(); // Start the game.
});

function startGame() {
  state = {}; // Reset game state.
  showTextNode(1);
  resetButton.style.display = "none"; // Hide the reset button initially.
}

// Create a typewriter effect for text.
function typeWriter(text, i = 0) {
  if (i < text.length) {
    textElement.innerHTML += text.charAt(i); // Add one character at a time.
    setTimeout(() => typeWriter(text, i + 1), typingSpeed); // Set delay based on typingSpeed.
  } else {
    enableOptionButtons(); // Once typing is done, show the buttons.
  }
}

// Modify the textNode rendering to include typewriter effect.
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  const formattedText = textNode.text.replace("{playerName}", playerName); // Use player's name.

  textElement.innerHTML = ""; // Clear the previous text.
  disableOptionButtons(); // Disable buttons until text finishes typing.

  typeWriter(formattedText); // Start typing the text.

  // Clear old options while the text is being typed.
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  // Use the DocumentFragment interface.
  const fragment = document.createDocumentFragment();

  // Iterate over the options array of the current textNode and create buttons.
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button"); // 5. Create at least one element using createElement.
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option)); // Add event listener to the button.

      // Disable button after it’s clicked.
      button.setAttribute("data-selected", "false");
      button.addEventListener("click", () => button.setAttribute("data-selected", "true"));

      fragment.appendChild(button); // Append buttons to fragment.
    }
  });

  optionButtonsElement.appendChild(fragment); // Append the button fragment to the DOM.
}

function disableOptionButtons() {
  optionButtonsElement.style.display = "none"; // Hide buttons during typing.
}

function enableOptionButtons() {
  optionButtonsElement.style.display = "block"; // Show buttons once text is typed.
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return endGame(); // Call the endGame function to handle restart.
  }
  state = Object.assign(state, option.setState); // Merge state.
  showTextNode(nextTextNodeId);
}

function endGame() {
  textElement.innerText = `Thank you for playing, ${playerName}! Would you like to play again?`;
  resetButton.style.display = "block"; // Show reset button to restart.
  resetButton.addEventListener("click", startGame);
  alert("Game over!"); // BOM method to show an alert when the game ends.
}


// Load player's name from localStorage BOM if previously saved.
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("playerName");
  if (savedName) {
    playerName = savedName;
    playerNameInput.value = savedName;
  }
});

//* * * * Stars * * * 
function createStars(numStars) {
    const starContainer = document.body;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        starContainer.appendChild(star);
    }
}

createStars(50);