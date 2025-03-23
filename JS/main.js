// main.js
import { timeSystem } from './timeSystem.js';
import { resourceSystem } from './resourceSystem.js';

// Wait for the DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded."); // Debugging

    // Event listener for the "Next Phase" button
    document.getElementById("nextPhaseButton").addEventListener("click", () => {
        console.log("Next Phase button clicked."); // Debugging
        timeSystem.advanceTime();

        // Example: Consume resources when advancing time
        resourceSystem.itemChange("water_barrel", 1, "remove"); // Consume 1 water barrel
        resourceSystem.itemChange("meat", 2, "remove"); // Consume 2 meat
    });

    // Example: Add initial resources
    resourceSystem.essentialResourceChange("gold", 100, "add");
    resourceSystem.itemChange("meat", 10, "add");
    resourceSystem.itemChange("water_barrel", 5, "add");
});