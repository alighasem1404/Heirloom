// consumptionSystem.js
import { timeSystem } from './timeSystem.js';
import { inventorySystem } from './inventorySystem.js';
import { resourceSystem } from './resourceSystem.js';

export const consumptionSystem = (() => {
    // Daily consumption rates
    const dailyConsumption = {
        food: 2, // 2 units of food consumed per day
        water: 1 // 1 unit of water consumed per day
    };
    // Weekly consumption list
    const weeklyConsumption = {
           clothing: 3 // 3 units of clothing consumed per week
    };
    // Durability degradation rates
    const durabilityDegradation = {
        warehouse: 0.5, // Items in the warehouse degrade slower
        ground: 2, // Items on the ground degrade faster
        equipped: 1, // Equipped items degrade at a normal rate
        in_building: 0.5 // Items in buildings degrade slower
    };

    // Initialize the system
    function initialize() {
        // Listen for "day passed" events
        timeSystem.on("dayPassed", () => {
            consumeResources();
            degradeItems();
        });
    }

    // Consume resources daily
    function consumeResources() {
        // Consume food and water
        inventorySystem.changeItemQuantity("village", "meat", -dailyConsumption.food);
        inventorySystem.changeItemQuantity("village", "water_barrel", -dailyConsumption.water);

        // Check for critical resource levels
        if (resourceSystem.getHybridResources().food <= 0) {
            triggerEvent("starvation");
        }
        if (resourceSystem.getHybridResources().water <= 0) {
            triggerEvent("dehydration");
        }
    }

    // Degrade items over time
    function degradeItems() {
        const villageInventory = inventorySystem.getInventory("village");
        for (const itemId in villageInventory.items) {
            const item = villageInventory.items[itemId];
            if (item.durability !== null) {
                const degradationRate = durabilityDegradation[item.location] || 1;
                inventorySystem.degradeItem("village", itemId, degradationRate);
            }
        }
    }

    // Trigger events
    function triggerEvent(eventType) {
        console.log(`Event triggered: ${eventType}`);
        // Add logic to handle the event (e.g., reduce villager health)
    }


    // Get daily consumption rates
    function getDailyConsumption(resourceType) {
        return dailyConsumption[resourceType] || null;
    }

    // Set daily consumption rates
    function setDailyConsumption(resourceType, amount) {
        dailyConsumption[resourceType] = amount;
    }

    // Get weekly consumption rates
    function getWeeklyConsumption(resourceType) {
        return weeklyConsumption[resourceType] || null;
    }

    // Set weekly consumption rates
    function setWeeklyConsumption(resourceType, amount) {
        weeklyConsumption[resourceType] = amount;
    }



    // Public API
    return {
        initialize,
        consumeResources,
        degradeItems,
        getDailyConsumption,
        setDailyConsumption
    };
})();