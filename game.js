import { createStars } from './stars.js';
import { textNodes } from './data.js';

let state = {}; // Current state of the game
let playerName = "";
let typingSpeed = 50; // Speed of the typewriter effect
const textElement = document.getElementById("text"); // Cached element for displaying text
const optionButtonsElement = document.querySelector("#option-buttons"); // Cached element for option buttons
const resetButton = document.getElementById("reset-game"); // Cached reset button

// Initialize the game and UI on page load
document.addEventListener('DOMContentLoaded', () => {
    createStars(50); // Create stars for background
    loadPlayerName(); // Load the player's name from localStorage
    resetButton.addEventListener("click", startGame); // Event listener for the reset button
});

// Load player's name from localStorage if previously saved
function loadPlayerName() {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
        playerName = savedName;
        document.querySelector("#player-name").value = savedName; // Set input value to saved name
    }
}

// Start the game
function startGame() {
    state = {}; // Reset game state
    showTextNode(1); // Show the first text node
    resetButton.style.display = "none"; // Hide the reset button initially
}

// Create a typewriter effect for text
function typeWriter(text, i = 0) {
    if (i < text.length) {
        textElement.innerHTML += text.charAt(i); // Add one character at a time
        setTimeout(() => typeWriter(text, i + 1), typingSpeed); // Set delay based on typingSpeed
    } else {
        enableOptionButtons(); // Once typing is done, show the buttons
    }
}

// Modify the textNode rendering to include typewriter effect
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
    const formattedText = textNode.text.replace("{playerName}", playerName); // Use player's name

    textElement.innerHTML = ""; // Clear the previous text
    disableOptionButtons(); // Disable buttons until text finishes typing

    typeWriter(formattedText); // Start typing the text

    // Clear old options while the text is being typed
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    const fragment = document.createDocumentFragment(); // Create a DocumentFragment

    // Iterate over the options array of the current textNode and create buttons
    textNode.options.forEach((option) => {
        if (showOption(option)) {
            const button = document.createElement("button"); // Create a button for the option
            button.innerText = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option)); // Add event listener to the button

            // Disable button after it’s clicked
            button.setAttribute("data-selected", "false");
            button.addEventListener("click", () => button.setAttribute("data-selected", "true"));

            fragment.appendChild(button); // Append buttons to fragment
        }
    });

    optionButtonsElement.appendChild(fragment); // Append the button fragment to the DOM
}

// Disable option buttons during typing
function disableOptionButtons() {
    optionButtonsElement.style.display = "none"; // Hide buttons during typing
}

// Enable option buttons after typing is done
function enableOptionButtons() {
    optionButtonsElement.style.display = "block"; // Show buttons once text is typed
}

// Determine if the option should be shown based on game state
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

// Handle option selection and navigate to the next text node
function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return endGame(); // Call the endGame function to handle restart
    }
    state = Object.assign(state, option.setState); // Merge state
    showTextNode(nextTextNodeId); // Show the next text node
}

// End the game and show a message
function endGame() {
    textElement.innerText = `Thank you for playing, ${playerName}! Would you like to play again?`;
    resetButton.style.display = "block"; // Show reset button to restart
    alert("Game over!"); // Show an alert when the game ends
}
