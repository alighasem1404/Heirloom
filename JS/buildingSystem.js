import { resourceSystem } from './resourceSystem.js';
import { timeSystem } from './timeSystem.js';

export const BuildingSystem = (() => {
    // Private building data (loaded from JSON)
    let buildingData;

    // Public Building Class
    class Building {
        constructor(id, name, levels) {
            this.id = id;
            this.name = name;
            this.levels = levels;
            this.currentLevel = 0;
        }

        build() {
            const levelData = this.levels[this.currentLevel];
            if (!levelData) throw new Error("Invalid building level");

            // Check and deduct resources
            for (const [resource, amount] of Object.entries(levelData.constructionCost)) {
                if (!resourceSystem.essentialResourceChange(resource, -amount, "consume")) {
                    throw new Error(`Not enough ${resource}`);
                }
            }
            this.currentLevel = 1;
            return true; // Success
        }

        // Check if the building can be upgraded
        canUpgrade() {
            const nextLevel = this.levels[this.currentLevel];
            if (!nextLevel) return false;

            return (
                nextLevel.upgradeCondition.day <= timeSystem.currentDay && // Check day condition
                Object.entries(nextLevel.constructionCost).every(
                    ([resource, amount]) => resources[resource] >= amount
                )
            );
        }

        upgrade() {
            if (!this.canUpgrade()) return false;

            const nextLevel = this.levels[this.currentLevel];
            for (const [resource, amount] of Object.entries(nextLevel.constructionCost)) {
                resourceChange(resource, -amount, "consume");
            }
            this.currentLevel++;
            return true;
        }
    }

    // Public Methods
    const loadBuildings = async () => {
        const response = await fetch('buildings.json');
        buildingData = await response.json();
    };

    const createBuilding = (buildingId) => {
        const def = buildingData.buildings.find(b => b.id === buildingId);
        if (!def) throw new Error(`Building ${buildingId} not found`);
        return new Building(def.id, def.name, def.levels);
    };

    return {
        loadBuildings,
        createBuilding,
        Building // Optional: Expose class directly if needed
    };
})();