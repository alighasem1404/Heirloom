// inventorySystem.js
export const inventorySystem = (() => {
    let items = []; // Item definitions (loaded from items.json)
    const inventories = {
        player: { capacity: 50, availableCapacity: 50, items: {} }, // Player's inventory
        village: { capacity: 100, availableCapacity: 100, items: {} } // Village's inventory
    };

    // Item locations
    const itemLocations = ["warehouse", "ground", "equipped", "in_building"];

    // Load items from items.json
    async function loadItems() {
        try {
            const response = await fetch('data/items.json');
            items = await response.json();
            console.log("Items loaded successfully:", items);
            initializeInventories();
        } catch (error) {
            console.error("Failed to load items:", error);
        }
    }

    // Initialize inventories
    function initializeInventories() {
        for (const inventoryType in inventories) {
            inventories[inventoryType].items = {};
            items.forEach(item => {
                inventories[inventoryType].items[item.id] = {
                    quantity: 0,
                    durability: item.durability,
                    location: "warehouse" // Default location
                };
            });
            inventories[inventoryType].availableCapacity = inventories[inventoryType].capacity;
        }
    }

    // Add or remove items from an inventory
    function changeItemQuantity(inventoryType, itemId, amount, location = "warehouse") {
        const inventory = inventories[inventoryType];
        if (!inventory.items[itemId]) {
            console.error("Item not found in inventory:", itemId);
            return;
        }

        // Check if the inventory has enough capacity
        const currentQuantity = inventory.items[itemId].quantity;
        const newQuantity = currentQuantity + amount;

        if (newQuantity < 0) {
            console.error("Cannot remove more items than available.");
            return;
        }

        // Handle overflow (place excess items on the ground)
        if (newQuantity > inventory.capacity) {
            const overflow = newQuantity - inventory.capacity;
            inventory.items[itemId].quantity = inventory.capacity;
            inventory.availableCapacity = 0;
            console.log(`${overflow} ${itemId} placed on the ground due to inventory overflow.`);
            // Optionally, create a new entry for ground items
        } else {
            inventory.items[itemId].quantity = newQuantity;
            inventory.availableCapacity = inventory.capacity - newQuantity;
        }

        // Update item location
        inventory.items[itemId].location = location;

        console.log(`${itemId} quantity updated in ${inventoryType} inventory:`, inventory.items[itemId].quantity);
        updateHybridResources(); // Recalculate hybrid resources
    }

    // Degrade an item's durability based on its location
    function degradeItem(inventoryType, itemId, amount) {
        const item = inventories[inventoryType].items[itemId];
        if (!item || item.durability === null) {
            console.error("Item not found or does not have durability:", itemId);
            return;
        }

        // Adjust degradation rate based on location
        let degradationRate = 1; // Default rate
        switch (item.location) {
            case "ground":
                degradationRate = 2; // Items on the ground degrade faster
                break;
            case "in_building":
                degradationRate = 0.5; // Items in buildings degrade slower
                break;
        }

        item.durability -= amount * degradationRate;
        if (item.durability <= 0) {
            console.log(`${itemId} has broken in ${inventoryType} inventory!`);
            item.quantity = 0; // Remove the item if durability reaches 0
        }
        updateHybridResources(); // Recalculate hybrid resources
    }

    // Update hybrid resources in the Resource System
    function updateHybridResources() {
        // Calculate hybrid resources based on village inventory
        const food = inventories.village.items["meat"].quantity;
        const water = inventories.village.items["water_barrel"].quantity;
        const clothing = 0; // Example: Add logic for clothing

        // Call the Resource System to update hybrid resources
        resourceSystem.calculateHybridResources(food, water, clothing);
    }

    // Load items and initialize inventories when the module is created
    loadItems();

    // Public API
    return {
        initializeInventories,
        changeItemQuantity,
        degradeItem,
        getInventory: (inventoryType) => inventories[inventoryType],
        updateHybridResources
    };
})();