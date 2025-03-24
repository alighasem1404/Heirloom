// resourceSystem.js

// Import the consumptionSystem module
import { consumptionSystem } from './consumptionSystem.js';

export const resourceSystem = (() => {
    // Essential resources
    const resources = {
        gold: 103, // Essential resource
        reputation: 10, // Essential resource
        magicPoints: 20, // Essential resource
        entertainment: 0 // Moved to essential resources
    };

    // Hybrid resources
    const hybridResources = {
        food: 0, // Derived from items like meat
        water: 0, // Derived from items like water barrels
        clothing: 0, // Derived from items like clothes
        weapon: 0 // Derived from items like weapons
    };

    // Public Functions

    // 1. Essential Resource Change
    function essentialResourceChange(resourceType, amount, action) {
        if (!resources.hasOwnProperty(resourceType)) {
            console.error("Invalid resource type:", resourceType);
            return;
        }

        switch (action) {
            case "add":
                resources[resourceType] += amount;
                break;
            case "remove":
                resources[resourceType] -= amount;
                break;
            default:
                console.error("Invalid action:", action);
        }
        updateUI(); // Refresh the UI to reflect changes
    }

    // 2. Calculate Hybrid Resources
    function calculateHybridResources(food, water, clothing, weapon) {
        hybridResources.food = food;
        hybridResources.water = water;
        hybridResources.clothing = clothing;
        hybridResources.weapon = weapon;
        console.log("Hybrid resources updated:", hybridResources);
        updateUI(); // Refresh the UI to reflect changes
    }




    // 3. Update UI
    function updateUI() {
        const goldAmount = document.getElementById("goldAmount");
        if (goldAmount) {
            goldAmount.innerHTML = `Gold: ${resources.gold}`;
            console.log("UI updated.", goldAmount); // Debugging
        } else {
            console.error("goldAmount element not found!"); // Debugging
        }

        const reputationAmount = document.getElementById("reputationAmount");
        if (reputationAmount) {
            reputationAmount.innerHTML = `Reputation: ${resources.reputation}`;
            console.log("UI updated.", reputationAmount); // Debugging
        } else {
            console.error("reputationAmount element not found!"); // Debugging
        }

        const magicPointsAmount = document.getElementById("magicPointsAmount");
        if (magicPointsAmount) {
            magicPointsAmount.innerHTML = `Magic Points: ${resources.magicPoints}`;
            console.log("UI updated.", magicPointsAmount); // Debugging
        } else {
            console.error("magicPointsAmount element not found!"); // Debugging
        }

        const entertainmentAmount = document.getElementById("entertainmentAmount");
        if (entertainmentAmount) {
            entertainmentAmount.innerHTML = `Entertainment: ${resources.entertainment}`;
            console.log("UI updated.", entertainmentAmount); // Debugging
        } else {
            console.error("entertainmentAmount element not found!"); // Debugging
        }

        const foodAmount = document.getElementById("foodAmount");
        const foodDailyConsumption = consumptionSystem.getDailyConsumption("food");
        if (foodAmount) {
            foodAmount.innerHTML = `Food: ${hybridResources.food} (${foodDailyConsumption})`; 
            console.log("UI updated.", foodAmount); // Debugging
        } else {
            console.error("foodAmount element not found!"); // Debugging
        }

        const waterAmount = document.getElementById("waterAmount");
        const waterDailyConsumption = consumptionSystem.getDailyConsumption("water");
        if (waterAmount) {
            waterAmount.innerHTML = `Water: ${hybridResources.water} (${waterDailyConsumption})`;
            console.log("UI updated.", waterAmount); // Debugging
        } else {
            console.error("waterAmount element not found!"); // Debugging
        }

        const clothingAmount = document.getElementById("clothingAmount");
        if (clothingAmount) {
            clothingAmount.innerHTML = `Clothing: ${hybridResources.clothing}`;
            console.log("UI updated.", clothingAmount); // Debugging
        } else {
            console.error("clothingAmount element not found!"); // Debugging
        }

        const weaponAmount = document.getElementById("weaponAmount");
        if (weaponAmount) {
            weaponAmount.innerHTML = `Weapon: ${hybridResources.weapon}`;
            console.log("UI updated.", weaponAmount); // Debugging
        } else {
            console.error("weaponAmount element not found!"); // Debugging
        }
    }

    // Public API
    return {
        essentialResourceChange,
        calculateHybridResources,
        updateUI,
        getResources: () => resources,
        getHybridResources: () => hybridResources
    };
})();