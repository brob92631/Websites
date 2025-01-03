const API_URL = "https://api.brawlstars.com/v1";
const API_TOKEN = "YOUR_API_KEY"; // Replace with your actual Brawl Stars API Key.

document.getElementById("fetchStats").addEventListener("click", fetchPlayerStats);

function fetchPlayerStats() {
    const tagInput = document.getElementById("playerTag");
    const playerTag = tagInput.value.toUpperCase().replace(/\s+/g, "");

    if (!playerTag.startsWith("#") || playerTag.length < 6) {
        showError("Invalid Player Tag! Make sure it starts with '#' and is valid.");
        return;
    }

    const sanitizedTag = playerTag.replace("#", "%23"); // API requires %23 for #

    fetch(`${API_URL}/players/${sanitizedTag}`, {
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Player not found! Check your tag.");
            }
            return response.json();
        })
        .then(data => {
            displayStats(data);
        })
        .catch(err => {
            showError(err.message);
        });
}

function displayStats(data) {
    const statsContainer = document.getElementById("statsContainer");
    statsContainer.innerHTML = `
        <h2>Player: ${data.name} (${data.tag})</h2>
        <div class="stat-item"><span>Trophies:</span> <span>${data.trophies}</span></div>
        <div class="stat-item"><span>Highest Trophies:</span> <span>${data.highestTrophies}</span></div>
        <div class="stat-item"><span>Level:</span> <span>${data.expLevel}</span></div>
        <div class="stat-item"><span>Club:</span> <span>${data.club?.name || "No Club"}</span></div>
    `;
    statsContainer.style.display = "block";
    hideError();
}

function showError(message) {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = message;
}

function hideError() {
    const errorDiv = document.getElementById("errorMessage");
    errorDiv.textContent = "";
}
