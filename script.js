// script.js
import { initUIRefs } from './ui.js';
import { startGame } from './game.js';
import { createStars } from './stars.js';

let playerName = "";
const playerNameInput = document.getElementById("player-name");

// Call createStars function when the window loads
window.addEventListener("load", () => {
  createStars(50); // Adjust the number of stars as needed
  const savedName = localStorage.getItem("playerName");
  if (savedName) {
    playerName = savedName;
    playerNameInput.value = savedName; // Set input value if a name was saved
  }
});