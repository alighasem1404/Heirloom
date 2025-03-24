import { UIManager } from './UIManager.js';

export const mapSystem = (() => {
    // Private state
    let currentMap = null;
    let buildings = new Map(); // slotId → { building, domElement }
    let isInBuildingView = false;

    // DOM Elements
    const mapContainer = document.getElementById('map-view');
    const buildingContainer = document.getElementById('building-interior-view');

    // Public API
    return {
        async loadMap(mapId) {
            const response = await fetch(`./data/map.json`);
            currentMap = await response.json();
            this.renderMap();
        },

        renderMap() {
            mapContainer.innerHTML = '';
            Object.entries(currentMap.slots).forEach(([slotId, slot]) => {
                const slotElement = document.createElement('div');
                slotElement.className = 'map-slot';
                slotElement.style.left = `${slot.x}px`;
                slotElement.style.top = `${slot.y}px`;
                slotElement.dataset.slotId = slotId;

                // Show building if exists
                if (buildings.has(slotId)) {
                    const building = buildings.get(slotId);
                    slotElement.innerHTML = `
                        <div class="building" data-building-id="${building.id}">
                            ${building.name} (Lv.${building.currentLevel})
                        </div>
                    `;
                }

                // Click handler
                slotElement.addEventListener('click', (e) => {
                    if (isInBuildingView) return;
                    this.handleSlotClick(slotId, e.target.closest('.building'));
                });

                mapContainer.appendChild(slotElement);
            });
        },

        handleSlotClick(slotId, buildingElement) {
            if (!buildings.has(slotId)) {
                // Show build menu
                UIManager.showBuildMenu(slotId, currentMap.slots[slotId].allowedBuildings);
            } else {
                // Enter building
                this.enterBuilding(slotId);
            }
        },

        placeBuilding(slotId, buildingId) {
            const building = BuildingSystem.createBuilding(buildingId);
            buildings.set(slotId, building);
            this.renderMap(); // Re-render after placement
        },

        enterBuilding(slotId) {
            const building = buildings.get(slotId);
            isInBuildingView = true;
            
            // Switch to building view
            mapContainer.style.display = 'none';
            buildingContainer.style.display = 'block';
            buildingContainer.innerHTML = `
                <h2>${building.name}</h2>
                <button id="exit-building">Exit</button>
                <!-- Building-specific UI goes here -->
            `;

            document.getElementById('exit-building').addEventListener('click', () => {
                this.exitBuilding();
            });
        },

        exitBuilding() {
            isInBuildingView = false;
            buildingContainer.style.display = 'none';
            mapContainer.style.display = 'block';
        }
    };
})();