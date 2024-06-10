async function getPlayerInfo() {
    const username = document.getElementById('username').value;

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            const data = await fetchPlayerInfo(username);
            displayPlayerInfo(data);
            return; // Успешный запрос, выход из функции
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);

            if (attempts === maxAttempts) {
                displayError(`Failed after ${maxAttempts} attempts: ${error.message}`);
            }
        }
    }
}

async function fetchPlayerInfo(username) {
    const response = await fetch('/getPlayerInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return response.json();
}

function displayPlayerInfo(data) {
    document.getElementById('playerName').textContent = `Player Name: ${data.name}`;
    document.getElementById('playerId').textContent = `Player ID: ${data.id}`;
    document.getElementById('playerRank').textContent = `Player Rank: ${data.rank}`;
    document.getElementById('playerLevel').textContent = `Player Level: ${data.level}`;
}

function displayError(message) {
    console.log(message);
}
