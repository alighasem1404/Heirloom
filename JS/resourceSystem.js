// resourceSystem.js
import { inventorySystem } from './inventorySystem.js';

export const resourceSystem = (() => {
    // Essential resources
    const resources = {
        gold: 0, // Essential resource
        reputation: 0, // Essential resource
        magicPoints: 0 // Essential resource
    };

    // Hybrid resources (calculated based on village inventory)
    const hybridResources = {
        food: 0, // Derived from items like meat
        water: 0, // Derived from items like water barrels
        clothing: 0 // Derived from items like clothes
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
    function calculateHybridResources() {
        hybridResources.food = inventorySystem.getItemQuantity("village", "meat");
        hybridResources.water = inventorySystem.getItemQuantity("village", "water_barrel");
        hybridResources.clothing = 0; // Example: Add logic for clothing
        console.log("Hybrid resources updated:", hybridResources);
        updateUI(); // Refresh the UI to reflect changes
    }

    // 3. Trade Function
    function trade(itemId, amount, price) {
        // Remove the item from the village inventory
        inventorySystem.changeItemQuantity("village", itemId, -amount);

        // Add gold to essential resources
        essentialResourceChange("gold", price, "add");
    }

    // 4. Consume Resources
    function consumeResources() {
        // Example: Consume food and water daily
        inventorySystem.changeItemQuantity("village", "meat", -2); // Consume 2 meat
        inventorySystem.changeItemQuantity("village", "water_barrel", -1); // Consume 1 water barrel

        // Recalculate hybrid resources
        calculateHybridResources();
    }

    // 5. Update UI
    function updateUI() {
        console.log("--- Essential Resources ---");
        console.log("Gold:", resources.gold);
        console.log("Reputation:", resources.reputation);
        console.log("Magic Points:", resources.magicPoints);

        console.log("--- Hybrid Resources ---");
        console.log("Food:", hybridResources.food);
        console.log("Water:", hybridResources.water);
        console.log("Clothing:", hybridResources.clothing);
    }

    // Initialize hybrid resources
    calculateHybridResources();

    // Public API
    return {
        essentialResourceChange,
        calculateHybridResources,
        trade,
        consumeResources,
        updateUI,
        getResources: () => resources,
        getHybridResources: () => hybridResources
    };
})();