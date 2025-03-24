// timeSystem.js
export const timeSystem = (() => {
    // Time object to track days, weeks, months, seasons, and phases
    const time = {
        day: 1,
        week: 1,
        month: 1,
        year: 1, // Initialize year
        season: "Spring", // Example initial season
        phase: "Morning"
    };

    const eventListeners = {
        dayPassed: [],
        seasonChanged: []
    };
    // Time settings (customizable ratios)
    const timeSettings = {
        weeksPerMonth: 1, // Example: 4 weeks per month
        monthsPerYear: 4, // Example: 12 months per year
        monthsPerSeason: 1 // Example: 3 months per season (optional)
    };

    // Phases and seasons arrays
    const phases = ["Morning", "Afternoon", "Evening", "Night"];
    const seasons = ["Spring", "Summer", "Autumn", "Winter"];
    
    const phaseImages = {
        Morning: "Image/24px/sunrise.png",
        Afternoon: "Image/24px/sun.png",
        Evening: "Image/24px/sunset.png",
        Night: "Image/24px/fog-night.png"
    };
  
    // Function to advance time
    function advanceTime() {
        console.log("Advancing time..."); // Debugging
        // Move to the next phase
        time.phase = getNextPhase(time.phase);

        // If it's night, increment the day and check for week/month/season changes
        if (time.phase === "Morning") {
            time.day++; // Increment day
        
            // Check if day exceeds 7
            if (time.day > 7) {
                time.day = 1; // Reset day
                time.week++; // Increment week
            }
        
            // Check if week exceeds weeks per month
            if (time.week > timeSettings.weeksPerMonth) {
                time.week = 1; // Reset week
                time.month++; // Increment month
        
                // Check if month exceeds months per year
                if (time.month > timeSettings.monthsPerYear) {
                    time.month = 1; // Reset month
                    time.year++; // Increment year
                }
        
                // Check if season needs to change (only when the month changes)
                if ((time.month - 1) % timeSettings.monthsPerSeason === 0) {
                    time.season = getNextSeason(time.season); // Update season
                    triggerEvent("seasonChanged"); // Trigger "season changed" event

                }
            }
        }

        // Update visuals and check for events
        updateVisuals();
        checkForEvents();
        updateSessionTracker();
    }

    // Helper function to get the next phase
    function getNextPhase(currentPhase) {
        const nextIndex = (phases.indexOf(currentPhase) + 1) % phases.length;
        return phases[nextIndex];
    }

    // Helper function to get the next season
    function getNextSeason(currentSeason) {
        const currentIndex = seasons.indexOf(currentSeason);
        return seasons[(currentIndex + 1) % seasons.length]; // Get next season
    }

    // Function to update visuals based on the current session
    function updateSessionVisuals() {
        console.log("Updating session visuals..."); // Debugging
        const theme = document.querySelector(".container");
        if (theme) {
            theme.classList.remove("spring", "summer", "autumn", "winter");
            theme.classList.add(time.season.toLowerCase());
        } else {
            console.error("Container element not found!"); // Debugging
        }
    }

    // Function to update visuals based on the current phase
    function updateVisuals() {
        console.log("Updating visuals..."); // Debugging
        const timeDisplay = document.getElementById("timeDisplay");
        if (timeDisplay) {
            timeDisplay.innerHTML = `<span class="sessionText">${time.season}</span><br>Day: ${time.day}, Week: ${time.week}, Month: ${time.month} , Year: ${time.year}<br><span class="phaseText">${time.phase}</span><img src="${phaseImages[time.phase]}" alt="${time.phase}">`;
        } else {
            console.error("timeDisplay element not found!"); // Debugging
        }
    }

    // Function to check for time-based events
    function checkForEvents() {
        console.log("Checking for events..."); // Debugging
        const events = [
            { day: 10, type: "Festival" },
            { season: "Winter", week: 2, type: "Snowstorm" }
        ];

        events.forEach(event => {
            if (event.day === time.day || (event.season === time.season && event.week === time.week)) {
                triggerEvent(event.type);
            }
        });
    }

    // Function to trigger an event
    function triggerEvent(eventType) {
        if (eventListeners[eventType]) {
            eventListeners[eventType].forEach(callback => callback());
        }
    }

    // Function to add event listeners
    function on(eventType, callback) {
        if (eventListeners[eventType]) {
            eventListeners[eventType].push(callback);
        } else {
            console.error("Invalid event type:", eventType);
        }
    }

    // Example of what happens when dayPassed is triggered
    on("dayPassed", () => {
        console.log("A new day has passed!");
        // Add any additional functionality here
    });

    // Function to update the session tracker
    function updateSessionTracker() {
        console.log("Updating session tracker..."); // Debugging
        const sessionTracker = document.getElementById("sessionTracker");
        if (sessionTracker) {
            sessionTracker.innerText = `Days Survived: ${time.day}`;
        } else {
            console.error("sessionTracker element not found!"); // Debugging
        }
    }

    // Initialize visuals when the module is created
    updateSessionVisuals();
    updateVisuals();

    // Public API
    return {
        advanceTime,
        on,
        getCurrentTime: () => time
    };
})();