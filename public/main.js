let errorMessage = document.getElementById('errorMessage');
let resultsPanel = document.getElementById('playerResults');

document.getElementById('username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getPlayerInfo();
    }
});

async function getPlayerInfo() {
    const username = document.getElementById('username').value;

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            const data = await fetchPlayerInfo(username);
            displayPlayerInfo(data);
            return;
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);

            if (attempts === maxAttempts) {
                displayError(error.message);
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
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    if (resultsPanel.classList.contains('down')) {
        resultsPanel.classList.remove('down');
    }
    resultsPanel.classList.add('up');

    document.body.style.overflow = '';

    document.querySelector('.hero').classList.add('hide');
    document.querySelector('.Search').classList.add('anim');

    document.getElementById('playerName').textContent = data.name;
    document.getElementById('playerId').textContent = data.id;
    document.getElementById('playerRank').textContent = data.rank;
    document.getElementById('playerLevel').textContent = data.level;

    const sessionEl = document.getElementById('playerSession');
    const online = Boolean(data.status && data.status.online);
    sessionEl.textContent = online ? 'Online' : 'Offline';
    sessionEl.classList.remove('online', 'offline');
    sessionEl.classList.add(online ? 'online' : 'offline');

    const countEl = document.getElementById('playersCount');
    const valueEl = countEl.querySelector('.live-value');
    if (valueEl) {
        valueEl.textContent = String(data.playersCount);
    } else {
        countEl.textContent = `Players: ${data.playersCount}`;
    }
    countEl.classList.add('wakeup');
}

function displayError(message) {
    console.log(message);

    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    if (resultsPanel.classList.contains('up')) {
        resultsPanel.classList.remove('up');
    }
    resultsPanel.classList.add('down');

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
}
