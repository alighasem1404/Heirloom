// Initialize

// main.js
import { timeSystem } from './timeSystem.js';
import { inventorySystem } from './inventorySystem.js';
import { resourceSystem } from './resourceSystem.js';
import { consumptionSystem } from './consumptionSystem.js';
import { BuildingSystem } from './buildingSystem.js';
import { mapSystem } from './mapSystem.js';
import { UIManager } from './UIManager.js';

// Wait for the DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded."); // Debugging
    // initialize the systems
    resourceSystem.updateUI();
    consumptionSystem.initialize();
    inventorySystem.initializeInventories();


    // Event listener for the "Next Phase" button
    document.getElementById("nextPhaseButton").addEventListener("click", () => {
        console.log("Next Phase button clicked."); // Debugging
        timeSystem.advanceTime();
        
    });



    // Example: Add initial gold
    // resourceSystem.essentialResourceChange("gold", 100, "add");
});

document.addEventListener('DOMContentLoaded', async () => {
    await mapSystem.loadMap('village');
    
    
});