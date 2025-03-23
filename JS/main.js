// main.js
import { timeSystem } from './timeSystem.js';
import { inventorySystem } from './inventorySystem.js';
import { resourceSystem } from './resourceSystem.js';

// Wait for the DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded."); // Debugging

    // Event listener for the "Next Phase" button
    document.getElementById("nextPhaseButton").addEventListener("click", () => {
        console.log("Next Phase button clicked."); // Debugging
        timeSystem.advanceTime();

        // Consume resources when advancing time
        
    });



    // Example: Add initial gold
    resourceSystem.essentialResourceChange("gold", 100, "add");
});