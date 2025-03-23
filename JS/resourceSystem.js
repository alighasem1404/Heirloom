// resourceSystem.js
export const resourceSystem = (() => {
    // Essential resources
    const resources = {
        gold: 0, // Essential resource
        reputation: 0, // Essential resource
        magicPoints: 0 // Essential resource
    };

    // Hybrid resources
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
    function calculateHybridResources(food, water, clothing) {
        hybridResources.food = food;
        hybridResources.water = water;
        hybridResources.clothing = clothing;
        console.log("Hybrid resources updated:", hybridResources);
        updateUI(); // Refresh the UI to reflect changes
    }

    // 3. Update UI
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

    // Public API
    return {
        essentialResourceChange,
        calculateHybridResources,
        updateUI,
        getResources: () => resources,
        getHybridResources: () => hybridResources
    };
})();