let errorMessage = document.getElementById('errorMessage');
let table = document.getElementById('table');

async function getPlayerInfo() {
    const username = document.getElementById('username').value;

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            const data = await fetchPlayerInfo(username);
            displayPlayerInfo(data);
            return; // exit
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
    errorMessage.style.display = 'none';

    if (table.classList.contains('down')) {
        table.classList.remove('down');
    }
    table.classList.add('up');

    document.body.style.overflow = '';

    document.getElementById('text').classList.add('hide');
    document.querySelector('.Search').classList.add('anim');

    document.getElementById('playerName').textContent = data.name;
    document.getElementById('playerId').textContent = data.id;
    document.getElementById('playerRank').textContent = data.rank;
    document.getElementById('playerLevel').textContent = data.level;
    // let i = data.status ? "Online" : "Offline";
    // document.getElementById('playerSession').textContent = i;
}

function displayError(message) {
    console.log(message);

    errorMessage.textContent = message;
    errorMessage.style.display = 'flex';

    if (table.classList.contains('up')) {
        table.classList.remove('up');
    }
    table.classList.add('down');

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
}
