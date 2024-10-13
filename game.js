import { textNodes } from './data.js';
import { initUIRefs } from './ui.js';

let state = {};
let playerName = "";
let typingSpeed = 50; // Speed of the typewriter effect

const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");
const resetButton = document.getElementById("reset-game");
const playerForm = document.getElementById("player-form");
const playerNameInput = document.getElementById("player-name");

playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    playerName = playerNameInput.value;
    localStorage.setItem("playerName", playerName);
    playerForm.style.display = "none";
    textElement.style.display = "block";
    optionButtonsElement.style.display = "grid";
    startGame();
});

function startGame() {
    state = {};
    showTextNode(1);
    resetButton.style.display = "none";
}
function typeWriter(text, i = 0) {
    if (i < text.length) {
        textElement.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), typingSpeed);
    } else {
        enableOptionButtons();
    }
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
    const formattedText = textNode.text.replace("{playerName}", playerName);
    textElement.innerHTML = "";
    disableOptionButtons();
    typeWriter(formattedText);
    optionButtonsElement.innerHTML = "";
    
    textNode.options.forEach((option) => {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function disableOptionButtons() {
    optionButtonsElement.style.display = "none";
}

function enableOptionButtons() {
    optionButtonsElement.style.display = "block";
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        endGame();
    } else {
        state = Object.assign(state, option.setState);
        showTextNode(nextTextNodeId);
    }
}

function endGame() {
    textElement.innerText = `Thank you for playing, ${playerName}! Would you like to play again?`;
    resetButton.style.display = "block";
    resetButton.addEventListener("click", startGame);
}

export function initializeGame() {
    initUIRefs(textElement, optionButtonsElement, resetButton);
}

